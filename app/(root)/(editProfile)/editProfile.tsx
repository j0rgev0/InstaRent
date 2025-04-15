import {
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Image,
  Alert,
  TextInput,
} from 'react-native';
import { authClient } from '@/lib/auth-client';
import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { CLOUDINARY_CLOUD_NAME } from '@/utils/constants';

import '@/global.css';

const EdituserPage = () => {
  const { data: session } = authClient.useSession();
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
  const [name, setName] = useState(session?.user.name || '');

  const showImageOptions = () => {
    Alert.alert('Profile Image', 'What would you like to do?', [
      {
        text: 'Change Image',
        onPress: () => selectImage(),
        style: 'default',
      },
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'destructive',
      },
    ]);
  };

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
  };

  return (
    <ScrollView className="bg-white">
      <View className="items-center border-b border-gray-200 bg-white p-5">
        <TouchableOpacity
          className="h-24 w-24 items-center justify-center rounded-full"
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
            <Ionicons name="person-circle" size={100} color="#1E3A8A" />
          )}
        </TouchableOpacity>
      </View>

      <View className="flex-row items-center justify-start border-b border-gray-200 bg-white p-5">
        <Text className="w-24 text-lg">Username</Text>
        <TextInput
          className="ml-2 flex-1 border-b border-gray-300 py-2 text-lg"
          maxLength={65}
          value={name}
          onChangeText={setName}
        />
      </View>
    </ScrollView>
  );
};

export default EdituserPage;
