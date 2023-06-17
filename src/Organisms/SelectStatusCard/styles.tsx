/* eslint-disable prettier/prettier */
import {StyleSheet, Platform} from 'react-native';
import Colors from '../../constants/Colors';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: Colors.white,
    paddingTop: Platform.OS === 'ios' ? 40 : 0,
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
  box: {
    marginTop: 20,
    borderRadius: 28,
    backgroundColor: Colors.black,
    height: hp('24%'),
    padding: 20,
  },
  redBorder: {
    borderWidth: 2,
    borderColor: '#ff0000',
  },
});
export default styles;
