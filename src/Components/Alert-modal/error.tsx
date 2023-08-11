import React from "react";
import { StyleSheet } from "react-native";
import Toast from "react-native-toast-message";

const ToastHandler = (message: string) => {
  return (
    <Toast
      style={{ ...styles.container }}
      text1Style={{ ...styles.message }}
      position="bottom"
      visibilityTime={4000} // Adjust as needed
      autoHide
      text1={message}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ff0000",
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  message: {
    color: "#fff",
    fontSize: 16,
  },
});

export default ToastHandler;
