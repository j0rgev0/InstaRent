import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="signin"
        options={{
          headerTitle: "Sign In",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="signup"
        options={{
          headerTitle: "Sign Up",
          headerTitleAlign: "center",
        }}
      />
    </Stack>
  );
}
