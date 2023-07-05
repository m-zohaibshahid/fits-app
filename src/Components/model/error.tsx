import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ErrorHandler = ({ error }: any) => {
  if (!error) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.message}>{error}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ff0000",
    padding: 10,
    marginBottom: 10,
  },
  message: {
    color: "#fff",
    fontSize: 16,
  },
});

export default ErrorHandler;
