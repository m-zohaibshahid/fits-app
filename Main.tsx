import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import { Alert, SafeAreaView, View } from "react-native";
import { LogBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Splash from "./src/Screens/AuthScreens/SplashScreen";
import Welcome from "./src/Screens/AuthScreens/WelcomeScreen/";
import SelectStatusScreen from "./src/Screens/AuthScreens/SelectStatusScreen";
import SignUp from "./src/Screens/AuthScreens/SignUpScreen";
import SignIn from "./src/Screens/AuthScreens/SignInScreen";
import ForgotPassword from "./src/Screens/AuthScreens/ForgotPasswordScreen";
import ForgotCode from "./src/Screens/AuthScreens/ForgotCodeScreen";
import GeneratePassword from "./src/Screens/AuthScreens/GeneratePasswordScreen";
import Verification from "./src/Screens/AuthScreens/VerificationScreen";
import CheckUser from "./src/Screens/AuthScreens/CheckUserScreen";
import PersonalInfo from "./src/Screens/AuthScreens/PersonalInfoScreen";
import ProfessionalInfo from "./src/Screens/AuthScreens/ProfessionalInfoScreen";
import ServicesOffered from "./src/Screens/AuthScreens/ServicesOfferedScreen";
import FitnessLevel from "./src/Screens/AuthScreens/FitnessLevelScreen";
import FitnessGoal from "./src/Screens/AuthScreens/FitnessGoalScreen";
{
  /*Start Trainer Screen*/
}

import TrainerTabb from "./src/Screens/TrainerScreens/TrainerBottomTabScreen";
import CreateBookSession from "./src/Screens/TrainerScreens/CreateBookSessionScreen";
import CreateRecorderClass from "./src/Screens/TrainerScreens/CreateRecorderSession";
import VideoCreate from "./src/Screens/TrainerScreens/VideoCreateScreen";
import EnterChatTrainer from "./src/Screens/TrainerScreens/EnterChatScreen";
import TrainerPayment from "./src/Screens/TrainerScreens/TrainerPaymentScreen";
import TrainerWallet from "./src/Screens/TrainerScreens/WalletScreen";
import TrainerCreateCard from "./src/Screens/TrainerScreens/CreateCardScreen";

import TraineeTabb from "./src/Screens/TraineeScreens/TraineeBottomTabScreen";
import TrainerDetail from "./src/Screens/TraineeScreens/TrainerDetail";
import BookSessionPayment from "./src/Screens/TraineeScreens/BookSessionPayment";
import WalletForTrainee from "./src/Screens/TraineeScreens/WalletForTrainee";
import CreateCardTrainee from "./src/Screens/TraineeScreens/CreateCardScreen";
import Toast from "react-native-toast-message";
import { toastConfig } from "./src/constants/ToastConfig";
import AccountUpdate from "./src/Screens/AuthScreens/AccountUpdate";
import TrainerVerification from "./src/Screens/TrainerScreens/TrainerVerification";
import UpdateProfessioninfo from "./src/Screens/AuthScreens/UpdateProfessioninfo";
import EnterChatforTrainee from "./src/Screens/TraineeScreens/EnterChatforTrainee";
import { url } from "./src/constants/url";
import { useSelector } from "react-redux";
import { styles } from "./style";

export const MainContext = createContext({});

const AuthContext = createContext({});
const Stack = createStackNavigator();

function LogoutNow() {
  const { signOut }: any = useContext(AuthContext);
  return <View>{signOut()}</View>;
}

function LoginNow() {
  const { Loginx }: any = useContext(AuthContext);
  return <View>{Loginx()}</View>;
}
const  App = () => {
  const [unReadMessages, setUnReadMessages] = useState(0);
  const timerRef = useRef<any>(null);
  const delay = 1000; // 1 second delay
  const token: string = useSelector((state: { token: string }) => state.token);
  
  const [state, dispatch] = useReducer(
    (prevState: any, action: any) => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            userToken: token,
            isLoading: false,
          };
        case "SIGN_IN":
          return {
            ...prevState,
            isSignout: false,
            userToken: token,
          };
        case "SIGN_OUT":
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  

  const getAllRomms = async () => {
    
    await fetch(`${url}/chat/rooms`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        all_rooms: true,
      }),
    })
      .then((res) => res.json())
      .then((res2) => {
        if (res2.success) {
          setUnReadMessages(res2?.data?.totallUnreadMessages);
        }
      })
      .catch((error) => {
        Alert.alert(error.message);
      });
  };

  useEffect(() => {
    let interval = setTimeout(() => {
      getAllRomms();
    }, 500);
    return clearTimeout(interval);
  }, [getAllRomms]);

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      // Code to run after delay
      getAllRomms();
    }, delay);

    // Clean up function
    return () => clearTimeout(timerRef.current);
  }, []);

  useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;
      try {
        userToken = await AsyncStorage.getItem("userToken");
      } catch (e) {
        // Restoring token failed
      }
      dispatch({ type: "RESTORE_TOKEN", token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = useMemo(
    () => ({
      Loginx: () => {
        dispatch({ type: "SIGN_IN", token: "dummy-auth-token" });
      },
      signOut: () => dispatch({ type: "SIGN_OUT" }),
      signUp: async () => {
        dispatch({ type: "SIGN_IN", token: "dummy-auth-token" });
      },
    }),
    []
  );

  return (
    <SafeAreaView style={styles.container}>
      <AuthContext.Provider value={authContext}>
        <NavigationContainer>
          {state.isLoading ? (
            <Stack.Navigator>
              <Stack.Screen
                name="Splash"
                component={Splash}
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          ) : !state.userToken ? (
            <Stack.Navigator>
              <Stack.Screen
                name="Welcome"
                component={Welcome}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="SelectStatusScreen"
                component={SelectStatusScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="SignUp"
                component={SignUp}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="SignIn"
                component={SignIn}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="ForgotPassword"
                component={ForgotPassword}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="ForgotCode"
                component={ForgotCode}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="GeneratePassword"
                component={GeneratePassword}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Verification"
                component={Verification}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="LoginNow"
                component={LoginNow}
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          ) : (
            <Stack.Navigator>
              <Stack.Screen
                name="CheckUser"
                component={CheckUser}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="PersonalInfo"
                component={PersonalInfo}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="ProfessionalInfo"
                component={ProfessionalInfo}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="ServicesOffered"
                component={ServicesOffered}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="TrainerVerification"
                component={TrainerVerification}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="UpdateProfessioninfo"
                component={UpdateProfessioninfo}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="FitnessLevel"
                component={FitnessLevel}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="FitnessGoal"
                component={FitnessGoal}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="TrainerTabb"
                component={TrainerTabb}
                initialParams={{ unReadMessages }}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="AccountUpdate"
                component={AccountUpdate}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="CreateBookSession"
                component={CreateBookSession}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="CreateRecorderClass"
                component={CreateRecorderClass}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="TrainerPayment"
                component={TrainerPayment}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="VideoCreate"
                component={VideoCreate}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="EnterChatTrainer"
                component={EnterChatTrainer}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="EnterChatforTrainee"
                component={EnterChatforTrainee}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="TrainerWallet"
                component={TrainerWallet}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="TrainerCreateCard"
                component={TrainerCreateCard}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="TraineeTabb"
                component={TraineeTabb}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="TrainerDetail"
                component={TrainerDetail}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="BookSessionPayment"
                component={BookSessionPayment}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="WalletForTrainee"
                component={WalletForTrainee}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="CreateCardTrainee"
                component={CreateCardTrainee}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="logoutNow"
                component={LogoutNow}
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          )}
        </NavigationContainer>
      </AuthContext.Provider>
      <Toast config={toastConfig} position="bottom" bottomOffset={50} />
    </SafeAreaView>
  );
}
export default App;