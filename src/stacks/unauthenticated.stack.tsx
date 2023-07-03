import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from '../Screens/AuthScreens/WelcomeScreen';
import SelectStatusScreen from '../Screens/AuthScreens/SelectStatusScreen';
import SignUpScreen from '../Screens/AuthScreens/SignUpScreen';
import SignInScreen from '../Screens/AuthScreens/SignInScreen';
import ForgotPassword from '../Screens/AuthScreens/ForgotPasswordScreen';
import ForgotCode from '../Screens/AuthScreens/ForgotCodeScreen';
import GeneratePassword from '../Screens/AuthScreens/GeneratePasswordScreen';
import VerificationScreen from '../Screens/AuthScreens/VerificationModal';

const Stack = createStackNavigator();

export const UnauthenticatedStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="SignUp" component={SignUpScreen} />
    <Stack.Screen name="SignIn" component={SignInScreen} />
    <Stack.Screen name="Welcome" component={WelcomeScreen} />
    <Stack.Screen name="SelectStatusScreen" component={SelectStatusScreen} />
    <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
    <Stack.Screen name="ForgotCode" component={ForgotCode} />
    <Stack.Screen name="GeneratePassword" component={GeneratePassword} />
    <Stack.Screen name="Verification" component={VerificationScreen} />
    {/* <Stack.Screen name="CheckUser" component={CheckUser}/> */}
    {/* <Stack.Screen name="LoginNow" component={LoginNow} /> */}
    {/* Add more unauthenticated screens as needed */}
  </Stack.Navigator>
);
