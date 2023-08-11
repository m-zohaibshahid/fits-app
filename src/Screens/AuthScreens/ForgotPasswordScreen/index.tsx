/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { Text, View, ScrollView, Alert } from 'react-native';
import Header from '../../../Components/Header';
import Button from '../../../Components/Button';
import { url } from '../../../constants/url';
import styles from './styles';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { useNavigation } from '@react-navigation/native';
import TextInput from '../../../Components/Input';
import Container from '../../../Components/Container';
import { useCodeVerifyMutation, useEmailSendMutation } from '../../../slice/FitsApi.slice';
import { errorToast, successToast } from '../../../utils/toast';
import Typography from '../../../Components/typography/text';

const ForgotPassword = ({navigation}: any) => {
  // Hooks
  const [email, setEmail] = useState('');
  const [receivedOtp, setReceivedOtp] = useState('');
  const [otp, setOtp] = useState('');
  const [emailSendMutateAsync, {isLoading}] = useEmailSendMutation()
  // const [mutateAsyncVarification] = useCodeVerifyMutation();
  
  const sendCode = async () => {
    const body = {email}
    const result = await emailSendMutateAsync(body)
    if (result.error) errorToast(result.error.data.message)
    if (result.data) {
      setReceivedOtp(result.data.data)
      successToast(result.data.message)
    }
  };

const handleVarification = async () => {
  if (receivedOtp === otp) {
    navigation.navigate('CreatePassword', {email});
  } else {
    errorToast('Invalid OTP')
  }
  // const body = {
    //   email: email,
    //   code: otp,
    //   type : "verification"
    // }

    // const result = await mutateAsyncVarification(body) as any
    // if (result?.data?.message === 'verified') {
    //   Alert.alert('varified')
    // }
    // if (!!result.error) Alert.alert(result.error.data.message)
  };
  

  return (
    <Container style={styles.mainContainer}>
      <Header label='Forgot Password' subLabel={!receivedOtp ? "Enter your account email so we can sand your verification code" : 'Check your email and enter received otp'} />
      {receivedOtp ? <Typography size={'medium'} color='transparentBlack' align='center' bottom={'mb10'}>Your OTP is: {receivedOtp}</Typography> : null}
      <ScrollView>
                <TextInput
        value={email}
        placeholder='Enter your email'
        onChangeText={setEmail} label={'Email'}                />
      
      {receivedOtp ? <>
        <TextInput label={'Otp'} placeholder='Enter otp here' value={otp} onChangeText={setOtp} />
      </>: null}
      </ScrollView>
          <Button
            loader={isLoading}
            label={receivedOtp ? 'Done' : 'Send'}
            onPress={!receivedOtp ? sendCode : handleVarification}
      />
    </Container>
  );
};

export default ForgotPassword;
