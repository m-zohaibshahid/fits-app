import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import WelcomeScreen from "../Screens/AuthScreens/WelcomeScreen";
import SelectStatusScreen from "../Screens/AuthScreens/SelectStatusScreen";
import SignUpScreen from "../Screens/AuthScreens/SignUpScreen";
import SignInScreen from "../Screens/AuthScreens/SignInScreen";
import ForgotPassword from "../Screens/AuthScreens/ForgotPasswordScreen";
import CreatePassword from "../Screens/AuthScreens/CreatePassword";
import GeneratePassword from "../Screens/AuthScreens/GeneratePasswordScreen";
import { LoginNow } from "../../Main";

const Stack = createStackNavigator();

export const UnauthenticatedStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
    <Stack.Screen name="SelectStatusScreen" component={SelectStatusScreen} options={{ headerShown: false }} />
    <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
    <Stack.Screen name="SignIn" component={SignInScreen} options={{ headerShown: false }} />
    <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: false }} />
    <Stack.Screen name="CreatePassword" component={CreatePassword} options={{ headerShown: false }} />
    <Stack.Screen name="GeneratePassword" component={GeneratePassword} options={{ headerShown: false }} />
    <Stack.Screen name="LoginNow" component={LoginNow} options={{ headerShown: false }} />
  </Stack.Navigator>
);
