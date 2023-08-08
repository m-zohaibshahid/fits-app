/* eslint-disable prettier/prettier */
import * as React from "react";
import { StyleSheet, ActivityIndicator, TouchableOpacityProps, ViewStyle, Pressable } from "react-native";
import Colors from "../constants/Colors";
import Typography from "./typography/text";

const Button = ({ label, onPress, variant = 'default', loader, disabled, style }: ButtonProps) => {
  return (
    <Pressable disabled={disabled} onPress={onPress} style={[variant === 'default' ? styles.MainResponsevieView: styles.smallButtonView, style, disabled && styles.diableBtn]}>
        {!loader ? <Typography color="white" size={variant === 'default' ? 'buttonText' : variant === 'medium' ? 'mediumButtonText' : 'small'} weight={variant === 'default' ? 'bold' : '600'}  style={styles.Textcreate}>{label}</Typography> : <ActivityIndicator size="small" color="#fff" />}
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  diableBtn: {
    color: Colors.infos,
    backgroundColor: Colors.disabled,
  },
  Textcreate: {
    letterSpacing: 1,
  },
  MainResponsevieView: {
    width: "100%",
    backgroundColor: Colors.bgRedBtn,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    color: Colors.infos,
    borderRadius: 12,
  },
  smallButtonView: {
    width: 120,
    backgroundColor: Colors.bgRedBtn,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    color: Colors.infos,
    borderRadius: 10,
  },
});

interface ButtonProps extends TouchableOpacityProps {
  label: string;
  variant?: 'default' | 'tini' | 'medium';
  onPress: () => void;
  loader?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
}
