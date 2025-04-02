import React, { useState } from "react";
import { View, TextInput, Text, StyleSheet, TouchableOpacity, KeyboardType } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface InputTextFieldProps {
  subtitle?: string;
  iconName?: keyof typeof Ionicons.glyphMap;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  style?: object;
  editable?: boolean;
  keyboardType?: KeyboardType;
}

const InputTextField = ({
  subtitle,
  iconName,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  editable = true,
  style,
  keyboardType = "default",
}: InputTextFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={[styles.container, style]}>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      <View style={styles.inputContainer}>
        {iconName && <Ionicons name={iconName} size={24} color="black" style={styles.icon} />}
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={"gray"}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry && !showPassword}
          editable={editable}
          keyboardType={keyboardType}
        />
        {secureTextEntry && (
          <TouchableOpacity style={styles.eyeIcon} onPress={() => setShowPassword(!showPassword)}>
            <Ionicons name={showPassword ? "eye-off" : "eye"} size={24} color="gray" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  subtitle: {
    fontSize: 14,
    color: "black",
    marginBottom: 5,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 5,
    height: 50,
  },
  icon: {
    padding: 10,
  },
  input: {
    flex: 1,
    height: "100%",
    paddingHorizontal: 10,
  },
  eyeIcon: {
    padding: 10,
  },
});

export default InputTextField;
