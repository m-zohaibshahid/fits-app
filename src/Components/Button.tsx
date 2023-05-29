/* eslint-disable prettier/prettier */
import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import Colors from '../constants/Colors';

const Button = ({label, navigation, onPress, loader, disabled}: any) => {
  return (
    <View style={styles.MainResponsevieView}>
      <TouchableOpacity
        activeOpacity={0.8}
        style={[disabled ? styles.diableBtn : styles.btn]}
        onPress={() => {
          !disabled && onPress();
        }}>
        {!loader ? (
          <Text style={styles.Textcreate}>{label}</Text>
        ) : (
          <ActivityIndicator size="small" color="#fff" />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Button;

const styles = StyleSheet.create({
  btn: {
    width: '90%',
    height: 58,
    borderRadius: 12,
    color: Colors.infos,
    backgroundColor: Colors.bgRedBtn,
    alignItems: 'center',
    justifyContent: 'center',
  },
  diableBtn: {
    width: '90%',
    height: 58,
    borderRadius: 12,
    color: Colors.infos,
    backgroundColor: Colors.disabled,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Textcreate: {
    color: Colors.white,
    fontSize: RFValue(14, 580),
    fontFamily: 'Poppins-SemiBold',
  },
  MainResponsevieView: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 10,
  },
});
