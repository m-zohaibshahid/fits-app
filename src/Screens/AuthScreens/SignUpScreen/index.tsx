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
import { useGetUserMeQuery, useRegisterUserMutation } from '../../../slice/FitsApi.slice';
import { errorToast } from '../../../utils/toast';
import VarificationModal from '../../../Components/VerificationModal';
import { NavigationSwitchProp } from 'react-navigation';
import { useDispatch } from 'react-redux';
import { setToken } from '../../../slice/token.slice';
import { storeUserDataInAsyncStorage, storeUserTokenInAsyncStorage } from '../../../utils/async-storage';

interface PropsInterface {
  navigation: NavigationSwitchProp
}

const SignUpScreen = ({navigation}: PropsInterface) => {
  const route = useRoute();
  const dispatch = useDispatch()
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [validationErrors, setValidationErrors] = useState<SignUpFormValidationErrors>({});
  const [isVarificationModalVisible,setIsVarificationModalVisible] = useState<boolean>(false);
  const [userId,setUserId] = useState<number>(0);
  const [userToken,setUserToken] = useState<string>("");
  const { refetch: getUserInfoFromUserMe } = useGetUserMeQuery(userId);
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
        setUserId(result?.data?.data?._id)
        setUserToken(result?.data?.access_token)
        setIsVarificationModalVisible(true)
      }
      if (result.error) errorToast(result.error.data.message)
    }
  }

  const setDataInAsyncStorageAndUpdateState = async (userInfo: string) => {
    await storeUserTokenInAsyncStorage(userToken)
    await storeUserDataInAsyncStorage(userInfo)
    dispatch(setToken(userToken));
    navigation.navigate("CheckUser")
  }
  
  useEffect(() => {
    if (!!isError) errorToast(error?.data?.message)
  }, [isError])
  
  
  const handleGetUserInfoFromServer = async () => {
    let result = await getUserInfoFromUserMe()
    await setDataInAsyncStorageAndUpdateState(JSON.stringify(result?.data))
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
      {isVarificationModalVisible ? <VarificationModal afterVarified={handleGetUserInfoFromServer} isVisible={isVarificationModalVisible} onClose={() => setIsVarificationModalVisible} email={email} code={userRegisterApiResponse?.email_message.code} /> : null}
    </Container>
  );
};

export default SignUpScreen;

export const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email'),
  password: Yup.string().min(8, 'Must be at least 8 characters long').matches(
    /^(?=.*[@$!%*?&])(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/,
    'Must Contain A-Z, a-z, special sharacters and numbers'
  ),
  confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match')
});
