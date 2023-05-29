/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
import {StyleSheet, Platform} from 'react-native';
import Colors from '../../../constants/Colors';
import {RFValue} from 'react-native-responsive-fontsize';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingTop: Platform.OS === 'ios' ? 40 : 0,
    paddingBottom: Platform.OS === 'ios' ? 0 : 0,
  },
  secondText: {
    fontSize: RFValue(14, 580),
    fontFamily: 'Poppins-SemiBold',
    color: Colors.black,
  },
  mainBody: {
    width: '100%',
    backgroundColor: '#fff',
  },
  subTitle: {
    fontSize: Platform.OS === 'ios' ? RFValue(14, 580) : RFValue(14, 580),
    color: '#ABABB5',
    fontFamily: 'Poppins-Regular',
  },
  root: {flex: 1, padding: 20},
  codeFieldRoot: {marginTop: 20},
  cell: {
    width: 20,
    height: 30,
    lineHeight: 30,
    fontSize: 24,
    margin: 12,
    borderColor: '#000000',
    textAlign: 'center',
    color: '#000',
  },
  focusCell: {
    borderColor: '#000',
  },
});
export default styles;
