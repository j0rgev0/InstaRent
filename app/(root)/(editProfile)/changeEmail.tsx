import {
  Alert,
  Keyboard,
  Platform,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { auth } from '@/lib/server/auth';
import { authClient } from '@/lib/auth-client';

import InputTextField from '@/components/InputTextField';
import '@/global.css';
import { router } from 'expo-router';

const ChangePasswordPage = () => {
  const { data: session } = authClient.useSession();

  const [loading, setLoading] = useState(false);
  const [newEmail, setNewEmail] = useState('');

  const handleSave = async () => {
    try {
      await authClient.changeEmail({
        newEmail: newEmail,
        callbackURL: '/dashboard'
      })
    } catch (e) {
      console.log('Error saving new password: ' + e)
      Alert.alert('Error', '' + e)
    }
  }

  return (
    <TouchableWithoutFeedback
      onPress={Platform.OS !== 'web' ? Keyboard.dismiss : undefined}
      accessible={false}>
      <View className="h-full space-y-4 bg-white p-4">
        <InputTextField
          editable={!loading}
          subtitle="New Email"
          placeholder="Enter your new Email"
          iconName="mail-outline"
          value={newEmail}
          onChangeText={setNewEmail}
        />
      <View className="py-4">
        <TouchableOpacity className="rounded-md bg-darkBlue p-4" onPress={handleSave}>
          <Text className="text-center text-lg text-white">Save</Text>
        </TouchableOpacity>
      </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ChangePasswordPage;
