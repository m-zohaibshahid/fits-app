import React, { useEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';
import TextInput from '../../../Components/Input';
import Header from '../../../Components/Header';
import Button from '../../../Components/Button';
import { useRoute } from '@react-navigation/native';
import Container from '../../../Components/Container';
import * as Yup from 'yup'
import { SignUpFormValidationErrors, SignUpFormValidationResult, SignUpFormValues } from '../types';
import { validateForm } from '../../../utils/validation';
import { useRegisterUserMutation } from '../../../slice/FitsApi.slice';
import { errorToast } from '../../../utils/toast';
import VarificationModal from '../../../Components/VerificationModal';
import { NavigationSwitchProp } from 'react-navigation';
import { useDispatch } from 'react-redux';
import { setToken } from '../../../slice/token.slice';
import { storeUserTokenInAsyncStorage } from '../../../utils/async-storage';

interface PropsInterface {
  navigation: NavigationSwitchProp
}

const SignUpScreen = ({navigation}: PropsInterface) => {
  const route:any = useRoute();
  const dispatch = useDispatch()
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [validationErrors, setValidationErrors] = useState<SignUpFormValidationErrors>({});
  const [isVarificationModalVisible,setIsVarificationModalVisible] = useState<boolean>(false);
  const [userToken,setUserToken] = useState<string>("");
  const [registerUser, { isLoading, isError, error, data: userRegisterApiResponse }] = useRegisterUserMutation()
 

  const signupCall = async () => {
    const formValues: SignUpFormValues = {
      email,
      password,
      confirmPassword,
      role: route?.params?.role,
    };

    const { isValid, errors }: SignUpFormValidationResult = await validateForm(formValues, validationSchema);
    setValidationErrors(errors);

    if (isValid) {
      delete formValues.confirmPassword;
      const result = await registerUser(formValues) as any
      if (result.data.register) {
        setUserToken(result?.data?.access_token)
        setIsVarificationModalVisible(true)
      }
      if (result.error) errorToast(result.error.data.message)
    }
  }
 
  useEffect(() => {
    if (!!isError) errorToast(error?.data?.message)
  }, [isError])
  
  
  const handleAfterEmailVarified = async () => {
    await storeUserTokenInAsyncStorage(userToken)
    dispatch(setToken(userToken));
    navigation.navigate("CheckUser")
  }
  
  return (
    <Container>
      <Header label={"Let's start here"} subLabel={"Fill in your details to begin"} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <TextInput label="E-mail" placeholder="xyz@gmail.com" value={email} onChangeText={setEmail} error={validationErrors.email} />
        <TextInput placeholder="••••••••••" value={password} label="Password" onChangeText={setPassword} error={validationErrors.password} secureTextEntry />
        <TextInput onChangeText={setConfirmPassword} value={confirmPassword} label="Confirm Password" placeholder="••••••••••" error={validationErrors.confirmPassword} secureTextEntry />
      </ScrollView>
      <View style={{ paddingVertical: 20, height: '20%', justifyContent: 'center' }}>
        <Button
          loader={isLoading}
          disabled={isLoading}
          label={'NEXT'}
          onPress={signupCall}
        />
      </View>
      {isVarificationModalVisible ? <VarificationModal afterVarified={handleAfterEmailVarified} isVisible={isVarificationModalVisible} onClose={() => setIsVarificationModalVisible} email={email} code={userRegisterApiResponse?.email_message.code} /> : null}
    </Container>
  );
};

export default SignUpScreen;

export const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email'),
  // password: Yup.string().min(8, 'Must be at least 8 characters long').matches(
  //   /^(?=.*[@$!%*?&])(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/,
  //   'Must Contain A-Z, a-z, special sharacters and numbers'
  // ),
  confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match')
});
