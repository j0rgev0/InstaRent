import { StyleSheet, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React from "react";

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
      style={[styles.container, { backgroundColor: loading ? "#777777" : "#000000" }]}
      onPress={onPress}
      disabled={loading}
    >
      {loading && <ActivityIndicator color={"white"} />}
      <Text style={styles.buttonText}>{loading ? loadingTitle : title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: 8,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
});
