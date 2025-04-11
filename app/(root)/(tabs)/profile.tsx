import { Text, View, TouchableOpacity, Image, Alert } from "react-native"
import React, { useState } from "react"
import { authClient } from "@/lib/auth-client";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

import '@/global.css'

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
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        quality: 1,
        aspect: [1, 1]
      });

      if (!result.canceled) {
        const imageUri = result.assets[0].uri;
        setSelectedImage(imageUri);
        
        if (session) {
          session.user.image = imageUri;
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
            onPress={() => showImageOptions()}
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


