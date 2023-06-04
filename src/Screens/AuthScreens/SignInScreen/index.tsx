/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { Text, View, Pressable, ScrollView, Modal, TextInput, Platform } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Header from '../../../Components/Header';
import Button from '../../../Components/Button';
import Colors from '../../../constants/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import styles from './styles';
import { useLoginUserMutation } from '../../../slice/FitsApi.slice';

import { StackScreenProps } from '@react-navigation/stack';
import { useDispatch } from 'react-redux';
import { setToken } from '../../../slice/token.slice';

type MyScreenProps = StackScreenProps<any, 'SignIn'>;

const SignInScreen = ({ navigation }: MyScreenProps) => {
  // Hooks
  const [hidePass, setHidePass] = useState(true);
  const [email, setEmail] = useState(''); //abbastrainer1@yopmail.com
  const [password, setPassword] = useState(''); //Abbas110@
  const [modalVisible, setModalVisible] = useState(false);
  const [loginUser, { data, isLoading, error }] = useLoginUserMutation();
  const dispatch = useDispatch();
  // Functions

  const OpneModule = () => {
    return setModalVisible(true);
  };

  const signInCall = async () => {
    if (!email.includes('@')) {
      Toast.show({
        type: 'error',
        text1: 'Please enter a valid email'
      });
    }

    const userLogin: any = await loginUser({
      email,
      password
    }).unwrap();

    if (userLogin?.login) {
      console.log('userLogin.data', userLogin.access_token);
      dispatch(setToken(userLogin.access_token));

      await AsyncStorage.setItem('userData', JSON.stringify(userLogin.data));
      await AsyncStorage.setItem('token', JSON.stringify(userLogin.access_token));
      navigation.navigate('CheckUser');
      Toast.show({
        type: 'success',
        text1: 'Login Successfully'
      });
    }
  };

  return (
    <View style={styles.mainContainer}>
      <Header label={'Welcome'} navigation={navigation} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.mainBody}>
          <View style={styles.inputMainView}>
            <View style={styles.inputTitleView}>
              <Text style={styles.inputTitleText}>E-mail</Text>
            </View>
            <View style={styles.inputTypeMainView}>
              <View style={styles.inputTypeView}>
                <TextInput
                  style={styles.inputTypeStyle}
                  // label="Email"
                  placeholderTextColor={'#afafafe3'}
                  placeholder="xyz@gmail.com"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>
            </View>
          </View>

          <View style={styles.inputMainView}>
            <View style={styles.inputTitleView}>
              <Text style={styles.inputTitleText}>Password</Text>
            </View>
            <View style={styles.inputTypeMainView}>
              <View style={styles.inputTypeView}>
                <TextInput
                  style={styles.inputTypeStyle}
                  // label="Password"
                  placeholder="**********"
                  placeholderTextColor={'#afafafe3'}
                  secureTextEntry={hidePass ? true : false}
                  value={password}
                  onChangeText={setPassword}
                />
              </View>
              <View style={styles.hideIconView}>
                <Ionicons name={hidePass ? 'eye-off' : 'eye'} onPress={() => setHidePass(!hidePass)} size={18} color={Colors.white} />
              </View>
            </View>
          </View>

          <View style={styles.forgotPasswordRect}>
            <View style={{ width: '48%', alignItems: 'flex-end' }}>
              <Pressable onPress={() => navigation.navigate('ForgotPassword')}>
                <Text style={styles.forgottext}>FORGOT PASSWORD ?</Text>
              </Pressable>
            </View>
          </View>

          <Button
            navigation={navigation}
            loader={isLoading}
            label={'Sign In'}
            disabled={!email || !password}
            onPress={() => {
              if (!isLoading) {
                signInCall();
              }
            }}
          />

          <View style={styles.termsTextRect}>
            <Text style={styles.signingtest}>
              By signing in I agree with <Text style={styles.underlinetext}>Terms of Use</Text> and <Text style={styles.underlinetext}>Privacy Policy</Text>
            </Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footerMainView}>
        <View style={{ width: '70%', alignItems: 'flex-end' }}>
          <Text style={styles.donottext}>Don’t have an account ?</Text>
        </View>
        <View style={{ width: '30%', marginLeft: 5 }}>
          <Pressable onPress={() => navigation.navigate('SelectStatusScreen')}>
            <Text style={styles.singuptext}>Sign up</Text>
          </Pressable>
        </View>
      </View>

      {/*Modal Start*/}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{ width: '90%', alignSelf: 'center' }}>
              <Text style={styles.vercodetext}>Your Email isn't verified. Please go to email verification screen...</Text>
            </View>

            <View
              style={{
                marginTop: Platform.OS === 'ios' ? 50 : 10,
                width: '100%'
              }}>
              <Button
                navigation={navigation}
                loader={isLoading}
                label={'Go'}
                onPress={() => {
                  if (!isLoading) {
                  }
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
      {/* Modal End*/}
    </View>
  );
};
export default SignInScreen;
