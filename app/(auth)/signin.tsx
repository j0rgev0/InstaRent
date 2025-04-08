import Button from "@/components/Button";
import InputTextField from "@/components/InputTextField";
import { Link } from "expo-router";
import { useState } from "react";
import { useRouter } from "expo-router";
import { authClient } from "@/lib/auth-client";
import { View, StyleSheet, Text, TouchableWithoutFeedback, Keyboard, Alert } from "react-native";

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
          router.replace("/(root)/(tabs)/home");
        },
      }
    );
    console.log(res);
    setLoading(false);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Text style={styles.headerText}>Sign in to your account using your email address and password.</Text>
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
        <Button title="Sign In" loadingTitle="Signing In..." loading={loading} onPress={handleSignIn} />
        <Text style={styles.footerText}>
          Don't have an account?{" "}
          <Link href={"/(auth)/signup"} replace>
            <Text style={{ color: "#037ced" }}>Sign Up</Text>
          </Link>{" "}
          instead.
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 20,
  },
  headerText: {
    fontSize: 16,
  },
  footerText: {
    textAlign: "center",
    color: "gray",
  },
});
