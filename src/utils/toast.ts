import { ToastAndroid } from "react-native";
import Toast from "react-native-toast-message";

export const errorToast = (message?: string) => {
    Toast.show({
        type: "error",
        text1: message ?? "Something went wrong",
    });
}
export const successToast = (message: string) => {
    Toast.show({
        type: "success",
        text1: message,
    });
}

export const androidToast = (message: string) => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
}