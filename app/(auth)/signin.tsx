import Button from "@/components/Button";
import InputTextField from "@/components/InputTextField";
import { Link } from "expo-router";
import { useState } from "react";
import { useRouter } from "expo-router";
import { authClient } from "@/lib/auth-client";
import { View, Text, TouchableWithoutFeedback, Keyboard, Alert } from "react-native";

import '@/global.css'

export default function SignInPage() {
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSignIn = async () => {
    setLoading(true);
    const res = await authClient.signIn.email(
      {
        email,
        password,
      },
      {
        onError: (ctx) => {
          Alert.alert("Error", ctx.error.message);
          console.log(ctx);
        },
        onSuccess: () => {
          router.replace("/(root)/(tabs)/profile");
        },
      }
    );
    console.log(res);
    setLoading(false);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View className="flex-1 bg-white justify-center">
        <View className="px-6 py-8">
          <View className="items-center mb-5">
            <Text className="text-2xl font-bold text-gray-800 mb-2">Welcome Back</Text>
            <Text className="text-gray-500 text-center">Sign in to continue to your account</Text>
          </View>

          <View className="space-y-4">
            <InputTextField
              editable={!loading}
              subtitle="Email"
              placeholder="Enter your email"
              iconName="mail-outline"
              value={email}
              keyboardType="email-address"
              onChangeText={setEmail}
            />
            <InputTextField
              editable={!loading}
              subtitle="Password"
              placeholder="Enter your password"
              iconName="lock-closed-outline"
              value={password}
              keyboardType="default"
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          <View className="mt-6">
            <Button 
              title="Sign In" 
              loadingTitle="Signing In..." 
              loading={loading} 
              onPress={handleSignIn}
            />
          </View>

          <View className="mt-6 flex-row justify-center">
            <Text className="text-gray-500">
              Don't have an account?{" "}
              <Link href={"/(auth)/signup"} replace>
                <Text className="text-blue-500 font-semibold">Sign Up</Text>
              </Link>
            </Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}