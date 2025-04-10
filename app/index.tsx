import Button from "@/components/Button";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { authClient } from "@/lib/auth-client";

import "@/global.css"

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
      <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator/>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View className="flex-1 p-4 gap-4">
        <View className="flex-1 items-center justify-center gap-4">
          <Button title="Sign In" onPress={() => router.replace("./(auth)/signin")} />
          <Button title="Sign Up" onPress={() => router.replace("./(auth)/signup")} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default IndexPage;
