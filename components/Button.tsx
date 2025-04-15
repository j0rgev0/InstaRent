import { Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import React from 'react';

interface ButtonProps {
  title: string;
  loadingTitle?: string;
  loading?: boolean;
  onPress: () => void;
}

const Button = ({ title, loadingTitle = title, loading = false, onPress }: ButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.77}
      className="flex-row items-center justify-center gap-2 rounded-md bg-black p-4"
      onPress={onPress}
      disabled={loading}>
      {loading && <ActivityIndicator color={'white'} />}
      <Text className="text-lg font-bold text-white">{loading ? loadingTitle : title}</Text>
    </TouchableOpacity>
  );
};

export default Button;
