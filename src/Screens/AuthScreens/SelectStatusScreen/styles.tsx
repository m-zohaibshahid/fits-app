/* eslint-disable prettier/prettier */
import {StyleSheet, Platform} from 'react-native';
import Colors from '../../../constants/Colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: Colors.white,
    paddingTop: Platform.OS === 'ios' ? 50 : 0,
    paddingBottom: Platform.OS === 'ios' ? 0 : 0,
  },
  header: {
    width: '100%',
    height: 120,
  },
  fixeheight: {
    height: 50,
    borderBottomWidth: 0.5,
    justifyContent: 'center',
    borderColor: 'lightgrey',
    width: '100%',
    alignItems: 'center',
  },
  fixeheight1: {
    height: 70,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  main: {
    width: '100%',
    alignItems: 'center',
  },
  topView: {
    width: '90%',
  },
  selectedBox: {
    width: '90%',
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: Colors.black,
    height: hp('26%'),
    borderWidth: 2,
    borderColor: '#ff0000',
  },
  unSelectedBox: {
    width: '90%',
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: Colors.black,
    height: hp('26%'),
  },
  footer: {
    paddingVertical: 10,
    marginBottom: 0,
    height: '20%',
    justifyContent: 'center',
    bottom: 0,
    position: 'absolute',
    width: '100%',
  },
});
export default styles;
