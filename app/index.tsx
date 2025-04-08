import Button from "@/components/Button";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, Text, View } from "react-native";
import { useEffect } from "react";
import { authClient } from "@/lib/auth-client";

const IndexPage = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (session) {
      // Redirige automáticamente si ya tiene sesión
      router.replace("/home"); // Cambia "/home" por tu pantalla principal protegida
    }
  }, [session]);

  if (isPending) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Cargando sesión...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={[styles.subContainer, { gap: 32 }]}>
          <Image
            source={require("@/assets/images/react-logo.png")}
            style={{ height: 250, width: 250 }}
            contentFit="cover"
          />
          <Text style={styles.headingText}>Better Auth</Text>
          <Text style={styles.subtitleText}>
            Example React Native Expo application demonstrating authentication flow using Better Auth.
          </Text>
        </View>
        <View style={[styles.subContainer, { justifyContent: "center", gap: 32 }]}>
          <Button title="Sign In" onPress={() => router.replace("./(auth)/signin")} />
          <Button title="Sign Up" onPress={() => router.replace("./(auth)/signup")} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default IndexPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: "center",
  },
  subContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
  headingText: {
    fontSize: 28,
    fontWeight: "700",
  },
  subtitleText: {
    fontSize: 20,
    textAlign: "center",
  },
});
