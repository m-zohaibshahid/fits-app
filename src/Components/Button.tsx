/* eslint-disable prettier/prettier */
import * as React from "react";
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, TouchableOpacityProps, ViewStyle } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import Colors from "../constants/Colors";
import Typography from "./typography/text";

const Button = ({ label, onPress, loader, disabled, style }: ButtonProps) => {
  return (
    <View style={[styles.MainResponsevieView, style]}>
      <TouchableOpacity
        disabled={disabled}
        activeOpacity={0.8}
        style={[disabled ? styles.diableBtn : styles.btn]}
        onPress={onPress}
      >
        {!loader ? <Typography style={styles.Textcreate}>{label}</Typography> : <ActivityIndicator size="small" color="#fff" />}
      </TouchableOpacity>
    </View>
  );
};

export default Button;

const styles = StyleSheet.create({
  btn: {
    width: "100%",
    height: 58,
    borderRadius: 12,
    color: Colors.infos,
    backgroundColor: Colors.bgRedBtn,
    alignItems: "center",
    justifyContent: "center",
  },
  diableBtn: {
    width: "100%",
    height: 58,
    borderRadius: 12,
    color: Colors.infos,
    backgroundColor: Colors.disabled,
    alignItems: "center",
    justifyContent: "center",
  },
  Textcreate: {
    color: Colors.white,
    fontSize: RFValue(14, 580),
    fontFamily: "Poppins-SemiBold",
    fontWeight: "bold",
    letterSpacing: 1,
  },
  MainResponsevieView: {
    width: "100%",
    alignItems: "center",
    paddingVertical: 10,
  },
});

interface ButtonProps extends TouchableOpacityProps {
  label: string;
  onPress: () => void;
  loader?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
}
