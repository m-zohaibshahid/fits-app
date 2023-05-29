/* eslint-disable prettier/prettier */
import {Platform, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: wp('100%'),
    height: hp('100%'),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
    paddingTop: Platform.OS === 'ios' ? 60 : 0,
    paddingBottom: Platform.OS === 'ios' ? 0 : 0,
  },
});
export default styles;
