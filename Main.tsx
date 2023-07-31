import React, { createContext, useContext, useEffect, useState } from "react";
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
import { clearAsyncStorage, clearUnReadMessageFromAsyncStorage, getUnReadMessagesFromAsyncStorage, getUserAsyncStroage, getUserAsyncStroageToken, storeUnReadMessageInAsyncStorage } from "./src/utils/async-storage";
import { errorToast } from "./src/utils/toast";
import { setUserInfo } from "./src/slice/FitsSlice.store";
import useSocket from "./src/hooks/use-socket";
import { UserDetail } from "./src/interfaces";
import { clearUnReadMessages, setUnReadMessage } from "./src/slice/messages.slice";
import { onLogout } from "./src/utils/logout";

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
  const { userInfo } = useSelector((state: { fitsStore: Partial<UserDetail> }) => state.fitsStore);
  const { socket } = useSocket(userInfo?.user?._id || '')
  const dispatch = useDispatch();

  socket.on("receive-message", async () => {
    await storeUnReadMessageInAsyncStorage()
    dispatch(setUnReadMessage())
    })

  useEffect(() => {
    bootstrapAsync();
  }, []);
  
  const bootstrapAsync = async () => {
    try {
      const tokenResult = await getUserAsyncStroageToken();
      dispatch(setToken(tokenResult));
      const userResult = await getUserAsyncStroage();
      dispatch(setUserInfo(userResult));
      const unreadMessagesExist = await getUnReadMessagesFromAsyncStorage();
      if (unreadMessagesExist) dispatch(setUnReadMessage())
      else dispatch(clearUnReadMessages())
    } catch (e) {
      if (e?.message === 'unAuthorized') onLogout()
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
