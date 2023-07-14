import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeUserDataInAsyncStorage = async (userData: string) => {
    await AsyncStorage.setItem('userData', userData);
};

export const storeUserTokenInAsyncStorage = async (userToken: string) => {
    await AsyncStorage.setItem('userToken', userToken);
};

export const getUserAsyncStroage = async () => {
    const userData: string | null = await AsyncStorage.getItem('userData');
    return await JSON.parse(userData ?? '');
};
export const getUserAsyncStroageToken = async () => {
    return AsyncStorage.getItem('userToken');
};
export const storeUnReadMessageInAsyncStorage = async () => {
    AsyncStorage.setItem('unReadMessage', JSON.stringify(true));
};
export const getUnReadMessagesFromAsyncStorage = async (): Promise<boolean> => {
    const unReadMessage: string | null = await AsyncStorage.getItem('unReadMessage');
    return await JSON.parse(unReadMessage ?? '');
};
export const clearUnReadMessageFromAsyncStorage = async () => {
    AsyncStorage.removeItem('unReadMessage');
};
