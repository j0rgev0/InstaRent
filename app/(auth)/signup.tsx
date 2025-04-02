import Button from "@/components/Button";
import InputTextField from "@/components/InputTextField";
import { Link } from "expo-router";
import { useState } from "react";
import { useRouter } from "expo-router";
import { authClient } from "@/lib/auth-client";
import { View, StyleSheet, Text, TouchableWithoutFeedback, Keyboard, Alert } from "react-native";

export default function SignUpPage() {
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSignUp = async () => {
    setLoading(true);
    const res = await authClient.signUp.email(
      {
        email,
        password,
        name,
      },
      {
        onError: (ctx) => {
          Alert.alert("Error", ctx.error.message);
          console.log(ctx);
        },
        onSuccess: () => {
          Alert.alert("Account created", "Successfully created an account for Expo Better Auth.", [
            {
              text: "Continue",
              onPress: () => router.replace("/(root)/(tabs)/home"),
            },
          ]);
        },
      }
    );
    console.log(res);
    setLoading(false);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Text style={styles.headerText}>Create a new account using a username, email and password.</Text>
        <InputTextField
          editable={!loading}
          subtitle="Username"
          placeholder="Create a username"
          iconName="mail-outline"
          value={name}
          onChangeText={setName}
        />
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
          placeholder="Create a password"
          iconName="lock-closed-outline"
          value={password}
          keyboardType="default"
          onChangeText={setPassword}
          secureTextEntry
        />
        <Button title="Sign Up" loadingTitle="Signing Up..." loading={loading} onPress={handleSignUp} />
        <Text style={styles.footerText}>
          Already have an account?{" "}
          <Link href={"/(auth)/signin"} replace>
            <Text style={{ color: "#037ced" }}>Sign In</Text>
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
