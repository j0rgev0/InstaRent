import { Ionicons } from '@expo/vector-icons';
import { router, Stack } from 'expo-router';
import { TouchableOpacity, Text } from 'react-native';
import { authClient } from '@/lib/auth-client';

import '@/global.css';

export default function RootLayout() {
  const { data: session } = authClient.useSession();

  return (
    <Stack>
      <Stack.Screen
        name="editProfile"
        options={{
          headerShown: true,
          presentation: 'card',
          headerTitleAlign: 'center',
          headerTitle: 'Edit profile',
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()} className="flex flex-row items-center w-16 h-8">
              <Ionicons name="chevron-back-sharp" size={32} color={'black'} />
              <Text className="text-lg text-black">{session?.user.name}</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="changePassword"
        options={{
          headerShown: true,
          presentation: 'modal',
          headerTitleAlign: 'center',
          headerTitle: 'Change Password',
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Text className="text-lg text-blue-500 px-4">Cancel</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="changeEmail"
        options={{
          headerShown: true,
          presentation: 'modal',
          headerTitleAlign: 'center',
          headerTitle: 'Change Email',
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Text className="text-lg text-blue-500 px-4">Cancel</Text>
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
}
