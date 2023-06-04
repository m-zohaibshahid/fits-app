/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { toastConfig } from './src/constants/ToastConfig';
import { setToken } from './src/slice/token.slice';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAsyncStroageToken } from './src/common/AsyncStorage';
import AuthenticatedStack from './src/stacks/authenticated.stack';
import { UnauthenticatedStack } from './src/stacks/unauthenticated.stack';

function App() {
  const dispatch = useDispatch();
  const token = useSelector((state: { token: string }) => state.token);
  const getUserInfo = async () => {
    const userDatax = await getUserAsyncStroageToken();
    dispatch(setToken(userDatax));
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <NavigationContainer>
      {!!token ? <AuthenticatedStack /> : <UnauthenticatedStack />}
      <Toast config={toastConfig} position="bottom" bottomOffset={50} />
    </NavigationContainer>
  );
}
LogBox.ignoreLogs(["[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!"]);
LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications
export default App;
