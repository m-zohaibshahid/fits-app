/* eslint-disable react/react-in-jsx-scope */
// store.js
import {Provider} from 'react-redux';
import Main from './Main';
import {store} from './src/store/store';
import Icon from 'react-native-vector-icons/MaterialIcons'
import AntDesign from "react-native-vector-icons/AntDesign";
import IonIcon from "react-native-vector-icons/Ionicons";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Fontisto from "react-native-vector-icons/Fontisto";
Icon.loadFont();
AntDesign.loadFont();
IonIcon.loadFont();
EvilIcons.loadFont();
Entypo.loadFont();
MaterialCommunityIcons.loadFont();
Fontisto.loadFont();

export default function App() {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}
