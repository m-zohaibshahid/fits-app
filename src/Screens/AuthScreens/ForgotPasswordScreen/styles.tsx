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
  mainBody: {
    width: '100%',
  },
  subTitle: {
    fontSize: RFValue(14, 580),
    fontFamily: 'Poppins-Regular',
    color: '#ABABB5',
  },
  inputMainView: {
    width: '90%',
    backgroundColor: Colors.black,
    borderRadius: 8,
    marginTop: '10%',
    marginBottom: '10%',
    justifyContent: 'center',
    alignSelf: 'center',
    height: Platform.OS === 'ios' ? 60 : 60,
  },
  inputTitleView: {
    width: '95%',
    alignSelf: 'center',
    height: 20,
    justifyContent: 'center',
  },
  inputTitleText: {
    color: Colors.white,
    fontSize: Platform.OS === 'ios' ? RFValue(8, 580) : RFValue(10, 580),
    fontFamily: 'poppins-regular',
  },
  inputTypeMainView: {
    width: '95%',
    alignSelf: 'center',
    borderColor: Colors.white,
    flexDirection: 'row',
    height: 40,
  },
  inputTypeView: {
    width: '90%',
    height: 40,
    justifyContent: 'center',
  },
  inputTypeStyle: {
    width: '100%',
    height: 40,
    fontSize: RFValue(10, 580),
    fontFamily: 'Poppins-Regular',
    color: '#fff',
  },
});
export default styles;
