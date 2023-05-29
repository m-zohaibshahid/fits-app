/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Pressable,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import Header from '../../../Components/Header';
import Button from '../../../Components/Button';
import {url} from '../../../constants/url';
import {useRoute} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {RFValue} from 'react-native-responsive-fontsize';

const VerificationScreen = ({navigation}) => {
  // Hooks
  const route: any = useRoute();
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const CELL_COUNT = 5;
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const [loadx, setLoadx] = useState(false);
  const [codetime, setCodeTime] = useState(true);
  const [time, setTime] = useState(0);
  const [canResend, setCanResend] = useState(false);
  const [loadxx, setLoadxx] = useState(false);
  const timerRef = React.useRef(time);

  // Functions
  const otpSent = () => {
    setCanResend(false);
    setTime(30);
    timerRef.current = 30;

    setTimeout(() => {
      setCanResend(true);
      setCodeTime(false);
    }, 30 * 1000);

    const timerId = setInterval(() => {
      timerRef.current -= 1;
      if (timerRef.current < 0) {
        clearInterval(timerId);
      } else {
        setTime(timerRef.current);
      }
    }, 1000);
    return () => {
      clearInterval(timerId);
    };
  };
  // Effect
  useEffect(() => {
    return otpSent();
  }, []);
  const getUserInfo = async () => {
    if (route.params === undefined) {
      const userData = await AsyncStorage.getItem('userData');
      let userDatax = JSON.parse(userData);
      setEmail(userDatax?.data?.email);
      setCode(userDatax?.email_message?.code);
    } else {
      setEmail(route?.params?.email);
      setCode(route?.params?.code);
    }
  };

  const storeData = async userToken => {
    try {
      await AsyncStorage.setItem('userToken', JSON.stringify(userToken));
      navigation.navigate('LoginNow');
    } catch (e) {
      console.log('error', e);
    }
  };

  const setUpdatedUserInfo = async () => {
    const userData = await AsyncStorage.getItem('userData');
    let userDatax = JSON.parse(userData);
    userDatax.data.emailVerified = true;
    if (userDatax.data.emailVerified === true) {
      await AsyncStorage.setItem('userData', JSON.stringify(userDatax));
      storeData('usertoken');
    }
  };
  const verifyCodeCall = async () => {
    setLoadx(true);
    await fetch(`${url}/code-verify`, {
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
    })
      .then(res => res.json())
      .then(res2 => {
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
      })
      .catch(err => {
        setLoadx(false);
        Toast.show({
          type: 'error',
          text1: 'Code has invalid.',
        });
        console.log(err);
      });
  };

  const resendCode = async () => {
    setLoadxx(true);
    await fetch(`${url}/resend-email`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
      }),
    })
      .then(res => res.json())
      .then(res2 => {
        setLoadxx(false);
        if (res2?.code) {
          Toast.show({
            type: 'success',
            text1: 'OTP sent to your email ,check your email',
          });
          setCode(res2?.code);
          setCodeTime(true);
          otpSent();
        } else {
          ToastAndroid.show(res2?.message, ToastAndroid.LONG);
        }
      })
      .catch(error => {
        setLoadxx(false);
        console.log(error);
      });
  };

  // Effects
  useEffect(() => {
    navigation.addListener('focus', () => {
      getUserInfo();
    });
  }, []);

  return (
    <View style={styles.mainContainer}>
      <Header
        label={'Verification'}
        subLabel={'Verification code has been sent to your email account'}
        navigation={navigation}
        doubleHeader={true}
      />
      <View style={{width: '90%', marginTop: 10, alignSelf: 'center'}}>
        <Text style={styles.secondText}>Please enter this code {code}</Text>
      </View>
      <View style={styles.main}>
        <View style={{width: '100%', marginTop: '15%', marginBottom: '10%'}}>
          <CodeField
            ref={ref}
            {...props}
            value={value}
            onChangeText={setValue}
            cellCount={CELL_COUNT}
            rootStyle={styles.codeFieldRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({index, symbol, isFocused}) => (
              <View style={{borderBottomWidth: 1}} key={index}>
                <Text
                  key={index}
                  style={[styles.cell, isFocused && styles.focusCell]}
                  onLayout={getCellOnLayoutHandler(index)}>
                  {symbol || (isFocused ? <Cursor /> : null)}
                </Text>
              </View>
            )}
          />
        </View>

        <Button
          navigation={navigation}
          label={'Next'}
          loader={loadx}
          disabled={value.length < 5}
          onPress={() => {
            if (!loadx) {
              verifyCodeCall();
            }
          }}
        />

        <View style={styles.footerviewmain}>
          <View style={{width: '65%', alignItems: 'flex-end'}}>
            <Text style={styles.donottext}>Didn’t get verification code?</Text>
          </View>
          <View style={{width: '35%'}}>
            {codetime ? (
              time !== 0 && (
                <Text
                  style={{
                    color: '#000',
                    alignSelf: 'center',
                    fontWeight: 'bold',
                    fontSize: RFValue(15),
                  }}>
                  00:{time}
                </Text>
              )
            ) : (
              <Pressable
                onPress={() => {
                  if (!loadxx) {
                    setValue('');
                    resendCode();
                  }
                }}>
                <Text style={styles.singuptext}>
                  {loadxx === true ? (
                    <ActivityIndicator
                      size="small"
                      color="#000"
                      style={{alignSelf: 'center'}}
                    />
                  ) : (
                    'Resend Email'
                  )}
                </Text>
              </Pressable>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

export default VerificationScreen;
