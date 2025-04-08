import { StyleSheet, Text, View, Image, Button } from "react-native"
import React from "react"
import { authClient } from "@/lib/auth-client";
import { router } from "expo-router";


const ProfilePage = () => {
  const { data: session } = authClient.useSession()
  return (
    <View style={styles.container}>
      <Text>Hello {session?.user.name}</Text>
      <Text>Email: {session?.user.email}</Text>
      <Button title="Sign Out" onPress={() => authClient.signOut().then(() => router.replace("/"))} />
    </View>
  );
};

export default ProfilePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
})

