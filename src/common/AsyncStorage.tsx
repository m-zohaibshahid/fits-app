/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';

const getUserAsyncStroage = async () => {
  const userData: string | null = await AsyncStorage.getItem('userData');

  return await JSON.parse(userData ?? '');
};
const getUserAsyncStroageToken = async () => {
  const userData: string | null = await AsyncStorage.getItem('token');

  return await JSON.parse(userData ?? '');
};
export { getUserAsyncStroage, getUserAsyncStroageToken };
