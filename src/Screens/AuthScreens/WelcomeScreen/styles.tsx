/* eslint-disable prettier/prettier */
import {StyleSheet, Platform} from 'react-native';
import Colors from '../../../constants/Colors';
import {RFValue} from 'react-native-responsive-fontsize';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 60 : 0,
    paddingBottom: Platform.OS === 'ios' ? 0 : 0,
  },
  mainBgImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  mainFooterRect: {
    width: '100%',
    bottom: 0,
    marginBottom: 0,
    height: '30%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  bottomTextMainRect: {width: '90%', flexDirection: 'row'},
  alreadyTextRect: {width: '70%', alignItems: 'flex-end'},
  signInTextRect: {
    width: '30%',
  },
  textAlready: {
    color: Colors.white,
    marginTop: 10,
    fontSize: RFValue(12, 580),
    fontFamily: 'Poppins-Regular',
  },
  signInText: {
    color: Colors.bgRedBtn,
    fontSize: RFValue(11.5, 580),
    fontFamily: 'Poppins-SemiBold',
    textDecorationLine: 'underline',
    marginTop: 10,
  },
});
export default styles;
