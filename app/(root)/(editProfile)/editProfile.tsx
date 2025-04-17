import {
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Image,
  Alert,
  StyleSheet,
  TextInput,
  Button,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { Link, router } from 'expo-router';


import { CLOUDINARY_CLOUD_NAME } from '@/utils/constants';
import InputTextField from '@/components/InputTextField';
import { authClient } from '@/lib/auth-client';
import { Ionicons } from '@expo/vector-icons';


import '@/global.css';

const EdituserPage = () => {
  const { data: session } = authClient.useSession();

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [name, setName] = useState(session?.user.name || '');
  const [email, setEmail] = useState(session?.user.email || '');
  // @ts-ignore
  const [username, setUsername] = useState(session?.user.username || '');

  const showImageOptions = () => {
    if (session?.user.image) {
      Alert.alert('Profile Image', 'What would you like to do?', [
        {
          text: 'Change Image',
          onPress: () => selectImage(),
          style: 'default',
        },
        {
          text: 'Delete Image',
          onPress: () => authClient.updateUser({ image: null }),
          style: 'default',
        },
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
      ]);
    } else {
      Alert.alert('Profile Image', 'What would you like to do?', [
        {
          text: 'Change Image',
          onPress: () => selectImage(),
          style: 'default',
        },
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
      ]);
    }
  }

  const selectImage = async () => {
    try {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
          return;
        }
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        quality: 0.8,
        aspect: [1, 1],
        base64: Platform.OS !== 'web',
        mediaTypes: 'images',
      });

      if (!result.canceled) {
        const imageUri = result.assets[0].uri;
        setSelectedImage(imageUri);

        if (session) {
          session.user.image = imageUri;

          try {
            console.log('Preparing upload to Cloudinary...');

            const xhr = new XMLHttpRequest();
            const formData = new FormData();

            const fileUri = result.assets[0].uri;
            const filename = fileUri.split('/').pop() || 'image.jpg';

            if (Platform.OS === 'web') {
              try {
                const response = await fetch(fileUri);
                const blob = await response.blob();
                formData.append('file', blob, filename);
              } catch (blobError) {
                console.error('Error creating blob from URI:', blobError);
                alert('Failed to process image. Please try a different image or format.');
                return;
              }
            } else {
              const localUri = Platform.OS === 'ios' ? fileUri.replace('file://', '') : fileUri;

              const file = {
                uri: localUri,
                name: filename,
                type: 'image/jpeg',
              };

              // @ts-ignore
              formData.append('file', file);
            }

            formData.append('upload_preset', 'profileImage');
            console.log('FormData prepared, sending to Cloudinary...');
            xhr.open(
              'POST',
              `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`
            );

            xhr.onload = async function () {
              if (xhr.status >= 200 && xhr.status < 300) {
                const response = JSON.parse(xhr.responseText);
                console.log('Upload successful!', response.url);

                if (response.url) {
                  await authClient.updateUser({ image: response.url });
                  console.log('User image updated in database');
                  session.user.image = response.url;
                }
              } else {
                console.error('Upload failed with status:', xhr.status, xhr.responseText);
                alert('Failed to upload image. Please try again.');
              }
            };

            xhr.onerror = function () {
              console.error('Network error during upload:', xhr.responseText);
              alert('Network error occurred. Please try again.');
            };

            xhr.send(formData);
          } catch (error) {
            console.error('Error uploading image to Cloudinary:', error);
            alert('Failed to upload image. Please try again.');
          }
        }
      }
    } catch (error) {
      console.error('Error picking image:', error);
    }
  }

  const verifyEmail = async () => {
    try {
      if (session?.user.emailVerified) return Alert.alert('Error','Email already verified');

      await authClient.sendVerificationEmail({
        email: email,
        callbackURL: '/',
      });
      Alert.alert('Email Verification', 'Verification email sent to: ' + email);
    } catch (e) {
      console.error('Error sending verification email:', e);
      Alert.alert('Error', '' + e);
    }
  }

  const handleSave = async () => {
    try {
      await authClient.updateUser({
        name: name,
        // @ts-ignore
        username: username,
      });
      alert('Profile updated successfully 🎉');
      router.back();
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    }
  };

  return (
    <ScrollView className="bg-white">
      <View className="items-center border-b border-gray-200 bg-white p-5">
        <TouchableOpacity
          className="mb-4 h-24 w-24 items-center justify-center rounded-full"
          onPress={() => {
            if (Platform.OS === 'web') {
              selectImage();
            } else {
              showImageOptions();
            }
          }}>
          {session?.user.image ? (
            <Image
              source={{ uri: session?.user.image as string }}
              className="h-full w-full rounded-full"
            />
          ) : (
            <Ionicons name="person-circle" size={90} color="#353949" />
          )}
        </TouchableOpacity>
        <Text
          className="text-center text-lg text-blue-500"
          onPress={() => {
            if (Platform.OS === 'web') {
              selectImage();
            } else {
              showImageOptions();
            }
          }}>
          Edit Picture
        </Text>
      </View>

      <View className="space-y-4 border-b border-gray-200 bg-white p-5">
        <InputTextField
          editable={!loading}
          subtitle="Username"
          placeholder={username}
          iconName="person-circle-outline"
          value={username}
          onChangeText={setUsername}
        />

        <InputTextField
          editable={!loading}
          subtitle="Name"
          iconName="person-outline"
          placeholder={name}
          value={name}
          onChangeText={setName}
        />
      </View>

      <View className="space-y-4 p-5">
        <TouchableOpacity className="px-2 pb-2" onPress={() => router.push('/changePassword')}>
          <Text className="text-lg text-blue-500">Change Password</Text>
        </TouchableOpacity>

        <TouchableOpacity className="px-2 pb-2" onPress={verifyEmail}>
          <Text className="text-lg text-blue-500">Verify Email</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="px-2 pb-2"
          onPress={() => {
            authClient.signOut().then(() => router.replace('/'));
          }}>
          <Text className="text-lg text-red-500">Logout</Text>
        </TouchableOpacity>

        <TouchableOpacity className="px-2 pb-2" onPress={() => {}}>
          <Text className="text-lg text-red-500">Delete Account</Text>
        </TouchableOpacity>

        <TouchableOpacity className="rounded-md bg-darkBlue p-4" onPress={handleSave}>
          <Text className="text-center text-lg text-white">Save</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default EdituserPage;