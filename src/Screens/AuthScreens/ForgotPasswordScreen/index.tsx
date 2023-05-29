/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { Text, View, TextInput, ScrollView } from 'react-native';
import Header from '../../../Components/Header';
import Button from '../../../Components/Button';
import { url } from '../../../constants/url';
import styles from './styles';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { useNavigation } from '@react-navigation/native';

const ForgotPassword = () => {
  // Hooks
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [load, setLoad] = useState(false);

  const sendCode = async () => {
    if (email === '') {
      Toast.show({
        type: 'error',
        text1: 'Please enter your email'
      });
    } else if (!email.includes('@')) {
      Toast.show({
        type: 'error',
        text1: 'Please enter valid email'
      });
    } else {
      setLoad(true);
      await fetch(`${url}/email-send`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email
        })
      })
        .then((res) => res.json())
        .then((res2) => {
          setLoad(false);
          if (res2.message === 'send code successfully') {
            Toast.show({
              type: 'success',
              text1: res2?.message
            });
            NextScreen(res2.email, res2);
          } else {
            Toast.show({
              type: 'error',
              text1: res2?.message
            });
          }
        })
        .catch((error) => {
          setLoad(false);
          Toast.show({
            type: 'error'
          });
          console.log(error);
        });
    }
  };
  const NextScreen = (i: number, code: any) => {
    Toast.show({
      type: 'success',
      text1: 'Verification code has been sent to your email'
    });
    navigation.navigate('ForgotCode', {
      email: [email, code]
    });
  };
  return (
    <View style={styles.mainContainer}>
      <Header label={'Forgot Password'} navigation={navigation} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.mainBody}>
          <View style={{ width: '90%', alignSelf: 'center' }}>
            <Text style={styles.subTitle}>Please enter your email address so we {'\n'}can sand your verification code.</Text>
          </View>

          <View style={styles.inputMainView}>
            <View style={styles.inputTitleView}>
              <Text style={styles.inputTitleText}>E-mail</Text>
            </View>
            <View style={styles.inputTypeMainView}>
              <View style={styles.inputTypeView}>
                <TextInput
                  style={styles.inputTypeStyle}
                  // label="Email"
                  placeholder="Enter Email"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>
            </View>
          </View>

          <Button
            navigation={navigation}
            loader={load}
            label={'Send'}
            onPress={() => {
              if (!load) {
                sendCode();
              }
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default ForgotPassword;
