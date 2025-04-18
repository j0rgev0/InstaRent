import { Redirect, Stack } from 'expo-router';
import { authClient } from '@/lib/auth-client';
import React from 'react';

export default function RootLayout() {
  const { data: session} = authClient.useSession();
  if (!session) return <Redirect href={'/'} />;

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
          headerShown: false,
        }}
      />
    </Stack>
  );
}
