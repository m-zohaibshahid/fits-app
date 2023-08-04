import { Alert } from "react-native";

export const handleConfirmAlert = (message: string, confirmCallback: () => void) => {
    // Show the confirmation dialog
    Alert.alert(
        'Confirmation',
        message,
        [
            {
                text: 'Cancel',
                style: 'cancel',
            },
            {
                text: 'Confirm',
                onPress: () => {
                    confirmCallback()
                },
            },
        ],
        { cancelable: false }
    );
};
