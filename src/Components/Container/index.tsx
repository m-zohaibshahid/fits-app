import React, { ReactNode } from "react";
import { Platform, SafeAreaView, StyleSheet, ViewStyle, ImageBackground } from "react-native";
import * as Images from "../../constants/Images";

interface Props {
  children: ReactNode;
  style?: ViewStyle;
  backgroundImage?: string;
}

const Container = ({ children, style, backgroundImage }: Props) => {
  const containerStyle = [styles.container, style];

  if (backgroundImage) {
    return (
      <ImageBackground source={{ uri: Images.welcomeBgImage }} style={containerStyle}>
        <SafeAreaView style={containerStyle}>{children}</SafeAreaView>
      </ImageBackground>
    );
  }

  return <SafeAreaView style={containerStyle}>{children}</SafeAreaView>;
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    flex: 1,
    paddingTop: Platform.OS === "ios" ? 40 : 0,
    paddingBottom: Platform.OS === "ios" ? 0 : 0,
    backgroundColor: "white",
  },
});

export default Container;
