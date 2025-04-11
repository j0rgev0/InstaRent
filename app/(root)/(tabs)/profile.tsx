import { Text, View, TouchableOpacity } from "react-native"
import React from "react"
import { authClient } from "@/lib/auth-client";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import "@/global.css"

const ProfilePage = () => {
  const { data: session } = authClient.useSession()
  return (
    <View className="flex-1 bg-gray-50 pt-10">
      <View className="bg-white p-5 items-center border-b border-gray-200">
        <View className="w-32 h-32 rounded-full bg-gray-100 justify-center items-center mb-4">
          <Ionicons name="person-circle" size={100} color="#353949" />
        </View>
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
  );
};

export default ProfilePage;

