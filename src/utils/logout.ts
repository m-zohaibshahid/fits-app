import { clearAsyncStorage } from "./async-storage"
import RNRestart from 'react-native-restart';


export const onLogout = () => {
    clearAsyncStorage()
    RNRestart.restart()
}
