import React, { useState } from 'react';
import { TextInput as RNTextInput, View, StyleSheet, TextStyle, ViewStyle, Platform } from 'react-native';
import Typography from '../typography/text';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../../constants/Colors';
import { RFValue } from 'react-native-responsive-fontsize';

interface TextInputProps {
  keyboard?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  label: string;
  placeholder: string;
  placeholderTextColor?: string;
  secureTextEntry?: boolean;
  value: string;
  onChangeText: (text: string) => void;
  icon?: JSX.Element;
  iconColor?: string;
  style?: ViewStyle;
  inputStyle?: TextStyle;
  error?: string;
}

const TextInput: React.FC<TextInputProps> = ({
  keyboard = 'default',
  label,
  placeholder,
  placeholderTextColor = '#e2e2e2ae',
  secureTextEntry = false,
  value,
  onChangeText,
  style,
  inputStyle,
  error,
}) => {
  const [hidePass, setHidePass] = useState(true);

  return (
    <>
    <View style={[styles.inputMainView, !error ? styles.marginBottom : null, style]}>
      <Typography color="white" size="small" style={{ margin: 0, transform: [{ translateY: 5 }] }}>
        {label}
      </Typography>
      <View>
        <RNTextInput
          style={[styles.inputTypeStyle, inputStyle]}
          keyboardType={keyboard}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          secureTextEntry={secureTextEntry && hidePass}
          value={value}
          onChangeText={onChangeText}
          />
        {secureTextEntry && (
          <View style={styles.hideIconView}>
            <Ionicons
              name={hidePass ? 'eye-off' : 'eye'}
              onPress={() => setHidePass(!hidePass)}
              size={18}
              color={Colors.white}
              />
          </View>
        )}
      </View>
    </View>
    {error && <Typography style={styles.errorMessage} size={'small'} weight='700' color={'error'}>{error}</Typography>}
  </>
  );
};


const styles = StyleSheet.create({
  hideIconView: {
    position: 'absolute',
    bottom: 8,
    right: -2,
    width: '10%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputMainView: {
    width: '100%',
    backgroundColor: Colors.black,
    borderRadius: 12,
    marginTop: 5,
    justifyContent: 'center',
    alignSelf: 'center',
    paddingHorizontal: 12,
  },
  inputTypeStyle: {
    paddingRight: 40,
    height: 42,
    fontSize: RFValue(12, 580),
    fontWeight: '400',
    color: '#fff',
  },
  errorMessage: {
    marginBottom: 10,
  },
  marginBottom: {
    marginBottom: 10,
  },
});

export default TextInput;
