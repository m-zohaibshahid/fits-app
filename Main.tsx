/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {LogBox} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
{
  // Auth Screens
}
import Splash from './src/Screens/AuthScreens/SplashScreen';
import Welcome from './src/Screens/AuthScreens/WelcomeScreen';
import SelectStatusScreen from './src/Screens/AuthScreens/SelectStatusScreen';
import SignUp from './src/Screens/AuthScreens/SignUpScreen';
import SignIn from './src/Screens/AuthScreens/SignInScreen';
import ForgotPassword from './src/Screens/AuthScreens/ForgotPasswordScreen';
import ForgotCode from './src/Screens/AuthScreens/ForgotCodeScreen';
import GeneratePassword from './src/Screens/AuthScreens/GeneratePasswordScreen';
import Verification from './src/Screens/AuthScreens/VerificationScreen';
import CheckUser from './src/Screens/AuthScreens/CheckUserScreen';
import PersonalInfo from './src/Screens/AuthScreens/PersonalInfoScreen';
import ProfessionalInfo from './src/Screens/AuthScreens/ProfessionalInfoScreen';
import ServicesOffered from './src/Screens/AuthScreens/ServicesOfferedScreen';
import FitnessLevel from './src/Screens/AuthScreens/FitnessLevelScreen';
import FitnessGoal from './src/Screens/AuthScreens/FitnessGoalScreen';
{
  /*Start Trainer Screen*/
}

import TrainerTabb from './src/Screens/TrainerScreens/TrainerBottomTabScreen';
import CreateBookSession from './src/Screens/TrainerScreens/CreateBookSessionScreen';
import CreateRecorderClass from './src/Screens/TrainerScreens/CreateRecorderSession';
import VideoCreate from './src/Screens/TrainerScreens/VideoCreateScreen';
import EnterChatTrainer from './src/Screens/TrainerScreens/EnterChatScreen';
import TrainerPayment from './src/Screens/TrainerScreens/TrainerPaymentScreen';
import TrainerWallet from './src/Screens/TrainerScreens/WalletScreen';
import TrainerCreateCard from './src/Screens/TrainerScreens/CreateCardScreen';

{
  /*Start Trainee Screen*/
}
import TraineeTabb from './src/Screens/TraineeScreens/TraineeBottomTabScreen';
import TrainerDetail from './src/Screens/TraineeScreens/TrainerDetail';
import BookSessionPayment from './src/Screens/TraineeScreens/BookSessionPayment';
import WalletForTrainee from './src/Screens/TraineeScreens/WalletForTrainee';
import CreateCardTrainee from './src/Screens/TraineeScreens/CreateCardScreen';
import Toast from 'react-native-toast-message';
import {toastConfig} from './src/constants/ToastConfig';
import AccountUpdate from './src/Screens/AuthScreens/AccountUpdate';
import TrainerVerification from './src/Screens/TrainerScreens/TrainerVerification';
import UpdateProfessioninfo from './src/Screens/AuthScreens/UpdateProfessioninfo';
import EnterChatforTrainee from './src/Screens/TraineeScreens/EnterChatforTrainee';
import {url} from './src/constants/url';
import {UserDetailInfoInterface} from './src/interfaces';
import {setToken} from './src/slice/tokenSlice';
import {useDispatch, useSelector} from 'react-redux';
import tokenSlice from './src/slice/tokenSlice';
import {getUserAsyncStroage} from './src/common/AsyncStorage';

const Stack = createStackNavigator();

function App() {
  const dispatch = useDispatch();
  const userData = useSelector((state: any) => state.token);
  console.log('userData=====?>>>>', userData);
  const getUserInfo = async () => {
    const userDatax = await getUserAsyncStroage();

    dispatch(setToken(userDatax?.userData?.access_token));
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <>
      <NavigationContainer>
        {
          // isLoading ? (
          //   <Stack.Navigator>
          //     <Stack.Screen
          //       name="Splash"
          //       component={Splash}
          //       options={{headerShown: false}}
          //     />
          //   </Stack.Navigator>
          // ) :
          userData == null ? (
            <Stack.Navigator>
              <Stack.Screen
                name="Welcome"
                component={Welcome}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="SelectStatusScreen"
                component={SelectStatusScreen}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="SignUp"
                component={SignUp}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="SignIn"
                component={SignIn}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="ForgotPassword"
                component={ForgotPassword}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="ForgotCode"
                component={ForgotCode}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="GeneratePassword"
                component={GeneratePassword}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="Verification"
                component={Verification}
                options={{headerShown: false}}
              />
              {/* <Stack.Screen
                name="CheckUser"
                component={CheckUser}
                options={{headerShown: false}}
              /> */}
              {/* <Stack.Screen
                name="LoginNow"
                component={LoginNow}
                options={{headerShown: false}}
              /> */}
            </Stack.Navigator>
          ) : (
            <Stack.Navigator>
              <Stack.Screen
                name="CheckUser"
                component={CheckUser}
                options={{headerShown: false}}
              />
              {/* <Stack.Screen
                name="PersonalInfo"
                component={PersonalInfo}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="ProfessionalInfo"
                component={ProfessionalInfo}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="ServicesOffered"
                component={ServicesOffered}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="TrainerVerification"
                component={TrainerVerification}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="UpdateProfessioninfo"
                component={UpdateProfessioninfo}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="FitnessLevel"
                component={FitnessLevel}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="FitnessGoal"
                component={FitnessGoal}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="TrainerTabb"
                component={TrainerTabb}
                initialParams={{unReadMessages}}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="AccountUpdate"
                component={AccountUpdate}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="CreateBookSession"
                component={CreateBookSession}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="CreateRecorderClass"
                component={CreateRecorderClass}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="TrainerPayment"
                component={TrainerPayment}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="VideoCreate"
                component={VideoCreate}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="EnterChatTrainer"
                component={EnterChatTrainer}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="EnterChatforTrainee"
                component={EnterChatforTrainee}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="TrainerWallet"
                component={TrainerWallet}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="TrainerCreateCard"
                component={TrainerCreateCard}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="TraineeTabb"
                component={TraineeTabb}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="TrainerDetail"
                component={TrainerDetail}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="BookSessionPayment"
                component={BookSessionPayment}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="WalletForTrainee"
                component={WalletForTrainee}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="CreateCardTrainee"
                component={CreateCardTrainee}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="logoutNow"
                component={LogoutNow}
                options={{headerShown: false}}
              /> */}
            </Stack.Navigator>
          )
        }
      </NavigationContainer>
      <Toast config={toastConfig} position="bottom" bottomOffset={50} />
    </>
  );
}
LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);
LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications
export default App;
