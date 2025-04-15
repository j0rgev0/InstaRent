import { router, Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerTitle: '',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(editProfile)"
        options={{
          headerTitle: 'Edit profile',
          headerTitleAlign: 'center',
          headerShown: true,
        }}
      />
    </Stack>
  );
}
