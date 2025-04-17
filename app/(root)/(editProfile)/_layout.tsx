
import { Ionicons } from '@expo/vector-icons';
import { router, Stack } from 'expo-router';
import { TouchableOpacity, Text } from 'react-native';

import '@/global.css'

export default function RootLayout() {
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
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="chevron-back-sharp" size={32} color={'black'} />
            </TouchableOpacity>
          )
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
              <Text className="text-blue-500 text-lg">Cancel</Text>
            </TouchableOpacity>
          )
        }}
      />
    </Stack>
  );
}
