/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import Colors from '../../constants/Colors';

const styles = StyleSheet.create({
  firstArrowHeaderRect1: {
    height: 60,
    borderBottomWidth: 0.5,
    justifyContent: 'center',
    borderColor: 'lightgrey',
    width: '100%',
  },
  bottomHeaderRect2: {
    height: 70,
    width: '100%',
  },
  bottomHeaderRect2ForDouble: {
    height: 110,
    width: '100%',
    justifyContent: 'center',
  },
  label: {
    paddingLeft: 5,
    width: '100%',
  },
});
export default styles;
