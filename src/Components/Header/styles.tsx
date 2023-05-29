/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import Colors from '../../constants/Colors';

const styles = StyleSheet.create({
  mainHeaderRect: {
    width: '100%',
    height: 120,
  },
  mainHeaderRectForDouble: {
    width: '100%',
    height: 160,
  },
  firstArrowHeaderRect1: {
    height: 50,
    borderBottomWidth: 0.5,
    justifyContent: 'center',
    borderColor: 'lightgrey',
    width: '100%',
    alignItems: 'center',
  },
  bottomHeaderRect2: {
    height: 70,
    width: '90%',
    alignSelf: 'center',
  },
  bottomHeaderRect2ForDouble: {
    height: 110,
    width: '90%',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  bottomHeaderRect2ForDoubleRow: {
    height: 100,
    width: '90%',
    justifyContent: 'center',
    flexDirection: 'row',
    alignSelf: 'center',
  },
  widthView: {
    width: '90%',
  },
  secondText: {
    fontSize: RFValue(14, 580),
    fontFamily: 'Poppins-Regular',
    color: Colors.lightGray,
  },
  col1: {
    width: '70%',
    alignItems: 'flex-start',
  },
  col2: {
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default styles;
