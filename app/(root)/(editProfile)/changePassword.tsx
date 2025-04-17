import { Keyboard, Platform, Text, TouchableWithoutFeedback, View } from 'react-native';
import React, { useState } from 'react';
import { router } from 'expo-router';

import '@/global.css';
import InputTextField from '@/components/InputTextField';

const ChangePasswordPage = () => {
  const [loading, setLoading] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <TouchableWithoutFeedback
      onPress={Platform.OS !== 'web' ? Keyboard.dismiss : undefined}
      accessible={false}>
      <View className="space-y-4 bg-white h-full p-4">
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
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ChangePasswordPage;
