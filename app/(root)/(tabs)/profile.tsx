import { Text, View, TouchableOpacity, Image, Alert, Platform } from "react-native"
import React, { useState } from "react"
import { authClient } from "@/lib/auth-client";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from 'expo-file-system';

import '@/global.css'

const CLOUDINARY_CLOUD_NAME = 'dvcreogik'

const ProfilePage = () => {
  const { data: session } = authClient.useSession()

  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined)
  
  const showImageOptions = () => {
    Alert.alert(
      "Profile Image",
      "What would you like to do?",
      [
        {
          text: "Change Image",
          onPress: () => selectImage(),
          style: "default"
        },
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        }
      ]
    )
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
        mediaTypes: ImagePicker.MediaTypeOptions.Images
      })

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
                type: 'image/jpeg'
              };
              
              // @ts-ignore
              formData.append('file', file);
            }
            
            formData.append('upload_preset', 'profileImage')
            console.log('FormData prepared, sending to Cloudinary...');
            xhr.open('POST', `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`)

            xhr.onload = async function() {
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
            

            xhr.onerror = function() {
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

  if (!session) {
    return (
      <View className="flex-1 bg-gray-50 pt-10">
      <View className="bg-white p-5 items-center border-b border-gray-200">
        <View className="w-32 h-32 rounded-full bg-gray-100 justify-center items-center mb-4">
          <Ionicons name="person-circle" size={100} color="#353949" />
        </View>
      </View>
      
      <View className="flex-1 p-5">
        <TouchableOpacity 
          className="flex-row bg-darkBlue p-4 rounded-lg items-center justify-center mt-5"
          onPress={() => router.replace("/")}
        >
          <Ionicons name="log-in-outline" size={24} color="white" />
          <Text className="text-white text-base font-semibold ml-2">Log In</Text>
        </TouchableOpacity>
      </View>
    </View>
    )
  } else {
    return (
      <View className="flex-1 bg-gray-50 pt-10">
        <View className="bg-white p-5 items-center border-b border-gray-200">
          <TouchableOpacity 
            className="w-32 h-32 rounded-full bg-gray-100 justify-center items-center mb-4"
            onPress={() => {
              if (Platform.OS === 'web') {
                selectImage();
              } else {
                showImageOptions();
              }
            }}
          >
            {session?.user.image ? (
              <Image 
                source={{ uri: (session?.user.image) as string }} 
                className="w-full h-full rounded-full" 
              />
            ) : (
                <Ionicons name="person-circle" size={100} color="#353949" />
            )}
          </TouchableOpacity>
          <Text className="text-2xl font-bold text-gray-800 mb-2">{session?.user.name}</Text>
          <Text className="text-base text-gray-600">{session?.user.email}</Text>
        </View>
        
        <View className="flex-1 p-5">
          <TouchableOpacity 
            className="flex-row bg-darkBlue p-4 rounded-lg items-center justify-center mt-5"
            onPress={() => authClient.signOut().then(() => router.replace("/"))}
          >
            <Ionicons name="log-out-outline" size={24} color="white" />
            <Text className="text-white text-base font-semibold ml-2">Sign Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
};

export default ProfilePage;


