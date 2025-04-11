import Button from "@/components/Button";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { ActivityIndicator, Text, View } from "react-native";
import React, { useEffect } from "react";
import { authClient } from "@/lib/auth-client";

import '@/global.css'

const IndexPage = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (session) {
      router.replace("/profile")
    }
  }, [session]);

  if (isPending) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator/>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 p-6">
        <View className="flex-1 items-center justify-center gap-6">
          <Text className="text-3xl font-bold text-center mb-8">Welcome</Text>
          <View className="w-full max-w-xs gap-4">
            <View className="w-full">
              <Button 
                title="Sign In" 
                onPress={() => router.replace("./(auth)/signin")}
              />
            </View>
            <View className="w-full">
              <Button 
                title="Sign Up" 
                onPress={() => router.replace("./(auth)/signup")}
              />
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default IndexPage;
