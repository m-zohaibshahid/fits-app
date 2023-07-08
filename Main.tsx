import React, { createContext, useContext, useEffect } from "react";
import { SafeAreaView, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { toastConfig } from "./src/constants/ToastConfig";
import { useDispatch, useSelector } from "react-redux";
import { styles } from "./style";
import { UnauthenticatedStack } from "./src/stacks/unauthenticated.stack";
import AuthenticatedStack from "./src/stacks/authenticated.stack";
import { setToken } from "./src/slice/token.slice";
import { getUserAsyncStroage, getUserAsyncStroageToken } from "./src/utils/async-storage";
import { errorToast } from "./src/utils/toast";
import { setUserInfo } from "./src/slice/FitsSlice.store";

export const AuthContext = createContext({});

export function LogoutNow() {
  const { signOut }: any = useContext(AuthContext);
  return <View>{signOut()}</View>;
}

export function LoginNow() {
  const { Loginx }: any = useContext(AuthContext);
  return <View>{Loginx()}</View>;
}

const App = () => {
  const token: string = useSelector((state: { token: string }) => state.token);
  const userDispatch = useDispatch();

  useEffect(() => {
    bootstrapAsync();
  }, []);
  
  const bootstrapAsync = async () => {
    try {
      const tokenResult = await getUserAsyncStroageToken();
      const userResult = await getUserAsyncStroage();
      userDispatch(setToken(tokenResult));
      userDispatch(setUserInfo(userResult));
    } catch (e) {
      errorToast(e?.message);
    }
  };

  const renderNavigation = () => {
    if (!token) {
      return <UnauthenticatedStack />;
    }
    return <AuthenticatedStack />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        {renderNavigation()}
      </NavigationContainer>
      <Toast config={toastConfig} position="bottom" bottomOffset={50} />
    </SafeAreaView>
  );
};

export default App;
