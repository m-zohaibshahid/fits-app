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
  bottomTextMainRect: {
    width: '100%',
    justifyContent: 'center',
    flexDirection: 'row',
    marginVertical: 10,
  },
  alreadyTextRect: {
    width: '70%',
    alignItems: 'flex-end'
  },
  signInTextRect: {
    width: '30%',
  },
  signInText: {
    textDecorationLine: 'none',
  },
});
export default styles;
