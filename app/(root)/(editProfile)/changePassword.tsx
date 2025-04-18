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
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const handleSave = async () => {
    try {
      if (newPassword === confirmNewPassword) {
        const result = await authClient.changePassword({
          newPassword: newPassword,
          currentPassword: currentPassword,
          revokeOtherSessions: true
        })

        if (result.error) throw new Error(result.error.message)

        Alert.alert('Success', 'password changed')
        router.back()

      } else throw new Error('Password not match')
    } catch (e) {
      console.log('Error saving new password: ' + e)
      Alert.alert('Error', '' + e)
    }
  };

  return (
    <TouchableWithoutFeedback
      onPress={Platform.OS !== 'web' ? Keyboard.dismiss : undefined}
      accessible={false}>
      <View className="h-full space-y-4 bg-white p-4">
        <InputTextField
          editable={!loading}
          subtitle="Current Password"
          placeholder="Enter your current password"
          iconName="lock-closed-outline"
          secureTextEntry
          value={currentPassword}
          onChangeText={setCurrentPassword}
        />
        <InputTextField
          editable={!loading}
          subtitle="New Password"
          placeholder="Enter your new password"
          iconName="lock-closed-outline"
          secureTextEntry
          value={newPassword}
          onChangeText={setNewPassword}
        />
        <InputTextField
          editable={!loading}
          subtitle="Confirm New Password"
          placeholder="Confirm your new password"
          iconName="lock-closed-outline"
          secureTextEntry
          value={confirmNewPassword}
          onChangeText={setConfirmNewPassword}
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
