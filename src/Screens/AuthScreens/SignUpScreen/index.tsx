import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import TextInput from '../../../Components/Input';
import Header from '../../../Components/Header';
import Button from '../../../Components/Button';
import { url } from '../../../constants/url';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import Container from '../../../Components/Container';
import Model from '../../../Components/model';
import { SignUpFormValidationErrors, SignUpFormValidationResult, SignUpFormValues } from '../../../utils/types';
import { validateForm } from '../../../utils/validation';

const SignUpScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const route = useRoute();
  const [hidePass, setHidePass] = useState(true);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [load, setLoad] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [validationErrors, setValidationErrors] = useState<SignUpFormValidationErrors>({});

  const storeUserData = async (userData: any) => {
    try {
      setLoad(false);
      await AsyncStorage.setItem('userData', JSON.stringify(userData));
      navigation.navigate('Verification');
    } catch (e) {
      console.log(e);
    }
  };

  const signupCall = async () => {
    const formValues: SignUpFormValues = {
      email,
      password,
      confirmPassword,
      role: route?.params?.role,
    };

    const { isValid, errors }: SignUpFormValidationResult = await validateForm(formValues);
    setValidationErrors(errors);

    if (isValid) {
      setLoad(true);
      fetch(`${url}/register`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValues),
      })
        .then((res) => res.json())
        .then((res2) => {
          setLoad(false);
          if (res2.message === 'success') {
            Toast.show({
              type: 'success',
              text1: 'OTP sent to your email',
            });
            storeUserData(res2);
          } else if (res2.message === 'Already Have An Account, Please SignIn!') {
            Toast.show({
              type: 'error',
              text1: res2?.message,
            });
            setIsModalVisible(true);
          } else {
            Toast.show({
              type: 'success',
              text1: res2?.message,
            });
          }
        })
        .catch(() => {
          setLoad(false);
          Toast.show({
            type: 'error',
            text1: 'You already have an account, please sign in.',
          });
        });
    }
  };

  const handleModelButtonClick = () => {
    setIsModalVisible(false);
    navigation.navigate('SignIn');
  };

  const handleOnModelCloseRequest = () => {
    setIsModalVisible(false);
  };

  return (
    <Container>
      <Header label={"Let's start here"} subLabel={'Fill in your details to begin'} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <TextInput
          label="E-mail"
          placeholder="xyz@gmail.com"
          value={email}
          onChangeText={setEmail}
          error={validationErrors.email}
        />
        <TextInput
          label="Password"
          placeholder="••••••••••"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={hidePass}
          error={validationErrors.password}
        />
        <TextInput
          onChangeText={setConfirmPassword}
          value={confirmPassword}
          label="Confirm Password"
          placeholder="••••••••••"
          secureTextEntry={hidePass}
          error={validationErrors.confirmPassword}
        />
      </ScrollView>
      <View style={{ paddingVertical: 20, height: '20%', justifyContent: 'center' }}>
        <Button
          loader={load}
          disabled={!email || !password || !confirmPassword}
          label={'NEXT'}
          onPress={signupCall}
        />
      </View>
      <Model visible={isModalVisible} onClick={handleModelButtonClick} onRequestClose={handleOnModelCloseRequest} />
    </Container>
  );
};

export default SignUpScreen;
