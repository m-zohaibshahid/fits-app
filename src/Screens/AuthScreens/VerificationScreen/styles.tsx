/* eslint-disable prettier/prettier */
import {StyleSheet, Platform} from 'react-native';
import Colors from '../../../constants/Colors';
import {RFValue} from 'react-native-responsive-fontsize';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingTop: Platform.OS === 'ios' ? 50 : 0,
    paddingBottom: Platform.OS === 'ios' ? 0 : 0,
  },
  main: {
    width: '100%',
  },
  codeFieldRoot: {
    marginTop: Platform.OS === 'ios' ? 40 : 10,
    width: '75%',
    alignSelf: 'center',
  },
  cell: {
    width: 22,
    height: 22,
    lineHeight: 26,
    fontSize: RFValue(18, 580),
    margin: 10,
    borderColor: Platform.OS === 'ios' ? '#000' : '#000',
    textAlign: 'center',
    color: Colors.black,
  },
  focusCell: {
    borderColor: Colors.black,
  },
  footerviewmain: {
    width: '100%',
    flexDirection: 'row',
    marginTop: '5%',
  },
  donottext: {
    color: Colors.black,
    fontSize: Platform.OS === 'ios' ? RFValue(11, 580) : RFValue(12, 580),
    fontFamily: 'Poppins-Regular',
  },
  singuptext: {
    color: Colors.bgRedBtn,
    fontSize: Platform.OS === 'ios' ? RFValue(11, 580) : RFValue(12, 580),
    fontFamily: 'Poppins-Regular',
    textDecorationLine: 'underline',
  },
  secondText: {
    fontSize: RFValue(14, 580),
    fontFamily: 'Poppins-SemiBold',
    color: Colors.black,
  },
});
export default styles;
