import React, { useState, useEffect } from 'react';
import { View, Pressable, StyleSheet, Platform, Modal, Dimensions } from 'react-native';
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';
import Button from '../Button';
import {  useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Typography from '../typography/text';
import { RFValue } from 'react-native-responsive-fontsize';
import Header from '../Header';
import { url } from '../../constants/url';
import Colors from '../../constants/Colors';

interface VerificationScreenProps {
  isVisible: boolean;
  onClose: () => void;
}

const VarificationModal: React.FC<VerificationScreenProps> = ({ isVisible, onClose }) => {
  // Hooks
  const navigation = useNavigation()
  const route = useRoute();
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const CELL_COUNT = 5;
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({ value, setValue });
  const [loadx, setLoadx] = useState(false);
  const [codetime, setCodeTime] = useState(true);
  const [time, setTime] = useState(0);
  const [canResend, setCanResend] = useState(false);
  const [loadxx, setLoadxx] = useState(false);

  // Functions
  const otpSent = () => {
    setCanResend(false);
    setTime(30);

    setTimeout(() => {
      setCanResend(true);
      setCodeTime(false);
    }, 30 * 1000);

    const timerId = setInterval(() => {
      setTime(prevTime => prevTime - 1);
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  };

  // Effect
  useEffect(() => {
    otpSent();
  }, []);

  const getUserInfo = async () => {
    const userData = await AsyncStorage.getItem('userData') as string;
    const userDatax = JSON.parse(userData) as unknown;
    setEmail(route.params?.email || userDatax?.data?.email);
    setCode(route.params?.code || userDatax?.email_message?.code);
  };

  const setUpdatedUserInfo = async () => {
    const userData = await AsyncStorage.getItem('userData') as string;
    const userDatax = JSON.parse(userData);
    userDatax.data.emailVerified = true;

    if (userDatax.data.emailVerified === true) {
      await AsyncStorage.setItem('userData', JSON.stringify(userDatax));
      navigation.navigate('LoginNow');
    }
  };

  const verifyCodeCall = async () => {
    setLoadx(true);

    try {
      const res = await fetch(`${url}/code-verify`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          code: value,
          type: 'verification',
        }),
      });
      const res2 = await res.json();

      setLoadx(false);

      if (res2?.message === 'verified') {
        setUpdatedUserInfo();
        Toast.show({
          type: 'success',
          text1: 'Verified',
        });
      } else if (res2?.message === 'token expired') {
        Toast.show({
          type: 'error',
          text1: 'Code has expired.',
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Something went Wrong!',
        });
      }
    } catch (err) {
      setLoadx(false);
      Toast.show({
        type: 'error',
        text1: 'Code has invalid.',
      });
      console.log(err);
    }
  };

  const resendCode = async () => {
    setLoadxx(true);

    try {
      const res = await fetch(`${url}/resend-email`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
        }),
      });
      const res2 = await res.json();

      setLoadxx(false);

      if (res2?.code) {
        Toast.show({
          type: 'success',
          text1: 'OTP sent to your email, check your email',
        });
        setCode(res2?.code);
        setCodeTime(true);
        otpSent();
      } else {
        ToastAndroid.show(res2?.message, ToastAndroid.LONG);
      }
    } catch (error) {
      setLoadxx(false);
      console.log(error);
    }
  };

  // Effects
  useEffect(() => {
    navigation.addListener('focus', () => {
      getUserInfo();
    });
  }, []);

  return (
    <Modal animationType='fade' transparent={true} visible={isVisible} onRequestClose={onClose}>
      <View  style={styles.bottomView}>
      <View  style={styles.modalContainer}>
        <Typography variant='heading' bottom={'mb5'} size={'heading1'} weight='800'>
          Verification
        </Typography>
        <Typography variant='heading' bottom={'mb3'} size={'heading4'} weight='400' color='grayTransparent'>
          Verification code has been sent to your email address
        </Typography>
        <Typography size={'heading3'}>Please enter this code - {code}</Typography>
        <View style={{ marginTop: 20, marginBottom: 38 }}>
          <CodeField
            ref={ref}
            {...props}
            value={value}
            onChangeText={setValue}
            cellCount={CELL_COUNT}
            rootStyle={styles.codeFieldRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({ index, symbol, isFocused }) => (
              <View style={{ borderBottomWidth: 1 }} key={index}>
                <Typography style={[styles.cell, isFocused && styles.focusCell]}>
                  {symbol || (isFocused && <Cursor />)}
                </Typography>
              </View>
            )}
          />
        </View>

        <Button
          label='Next'
          loader={false}
          disabled={value.length < 5}
          onPress={() => {
            if (!loadx) {
              verifyCodeCall();
            }
          }}
        />

        <View style={styles.footerviewmain}>
          <Pressable
            disabled={codetime}
            style={styles.bottomTextMainRect}
            onPress={() => {
              if (!loadxx) {
                setValue('');
                resendCode();
              }
            }}
          >
            <Typography>Didn’t get verification code?</Typography>
            <Typography style={{ marginLeft: 4 }} size='paragraph' color={codetime ? 'black' : 'redColor'}>
              {codetime ? `00:${time}` : '  Resend email'}
            </Typography> 
          </Pressable>
        </View>
      </View>
      </View>
    </Modal>
  );
};

export default VarificationModal;

const styles = StyleSheet.create({
  bottomView: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: Colors.transparentBlack,
  },
  modalContainer: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    paddingHorizontal: 24,
    paddingTop: 28,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 6.84,
    elevation: 9,
  },
  codeFieldRoot: {
    marginTop: Platform.OS === 'ios' ? 40 : 10,
    width: '75%',
    alignSelf: 'center',
  },
  cell: {
    width: 22,
    height: 22,
    lineHeight: 26,
    fontSize: RFValue(18, 580),
    margin: 10,
    textAlign: 'center',
    color: Colors.black,
  },
  focusCell: {
    borderColor: Colors.black,
  },
  footerviewmain: {
    width: '100%',
    marginTop: '10%',
    marginBottom: 20,
  },
  bottomTextMainRect: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
