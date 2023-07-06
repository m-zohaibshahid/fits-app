import React, { createContext, useContext, useEffect, useMemo, useReducer, useState } from "react";
import { SafeAreaView, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Splash from "./src/Screens/AuthScreens/SplashScreen";
import Toast from "react-native-toast-message";
import { toastConfig } from "./src/constants/ToastConfig";
import { useDispatch, useSelector } from "react-redux";
import { styles } from "./style";
import { UnauthenticatedStack } from "./src/stacks/unauthenticated.stack";
import AuthenticatedStack from "./src/stacks/authenticated.stack";
import { clearToken, setToken } from "./src/slice/token.slice";
import { getUserAsyncStroage } from "./src/common/AsyncStorage";

const AuthContext = createContext({});
const Stack = createStackNavigator();
export function LogoutNow() {
  const { signOut }: any = useContext(AuthContext);
  return <View>{signOut()}</View>;
}

export function LoginNow() {
  const { Loginx }: any = useContext(AuthContext);
  return <View>{Loginx()}</View>;
}
const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const token: string = useSelector((state: { token: string }) => state.token);
  const userDispatch = useDispatch();

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
  console.log("state", state);
  useEffect(() => {
    bootstrapAsync();
  }, []);
  const bootstrapAsync = async () => {
    let userToken;
    try {
      setIsLoading(true);
      userToken = await AsyncStorage.getItem("userToken");
      const userData = await getUserAsyncStroage();
      dispatch({ type: "RESTORE_TOKEN", token: userToken });
      userDispatch(setToken(userData?.access_token));
      setIsLoading(false);
    } catch (e) {
      // Restoring token failed
      throw new Error("Could not retrieve user token from storage");
    }
  };
  const authContext = useMemo(
    () => ({
      Loginx: () => {
        dispatch({ type: "SIGN_IN", token: "dummy-auth-token" });
      },
      signOut: () => {
        userDispatch(clearToken());

        dispatch({ type: "SIGN_OUT" });
      },

      signUp: async () => {
        dispatch({ type: "SIGN_IN", token: "dummy-auth-token" });
      },
    }),
    []
  );
  const renderNavigation = () => {
    console.log("object,", isLoading);
    // if (isLoading) {
    //   return (
    //     <Stack.Navigator>
    //       <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
    //     </Stack.Navigator>
    //   );
    // }
    if (!token) {
      return <UnauthenticatedStack />;
    }
    return <AuthenticatedStack />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <AuthContext.Provider value={authContext}>
        <NavigationContainer>{renderNavigation()}</NavigationContainer>
      </AuthContext.Provider>
      <Toast config={toastConfig} position="bottom" bottomOffset={50} />
    </SafeAreaView>
  );
};
export default App;
