import { Ionicons } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import { TouchableOpacity } from "react-native";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerTitle: "",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(editProfile)"
        options={{
          headerTitle: "Edit profile",
          headerTitleAlign: "center",
          headerShown: true,
        }}
      />
    </Stack>
  );
}