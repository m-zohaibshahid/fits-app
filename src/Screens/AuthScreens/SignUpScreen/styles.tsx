/* eslint-disable prettier/prettier */
import {StyleSheet, Platform} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import Colors from '../../../constants/Colors';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingTop: Platform.OS === 'ios' ? 50 : 0,
    paddingBottom: Platform.OS === 'ios' ? 0 : 0,
  },
  main: {
    width: '100%',
    backgroundColor: Colors.white,
  },
  inputMainView: {
    width: '90%',
    backgroundColor: Colors.black,
    borderRadius: 8,
    marginTop: '5%',
    marginBottom: '2%',
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
  hideIconView: {
    width: '10%',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'red',
  },
  vercodetext: {
    fontSize: Platform.OS === 'ios' ? RFValue(12, 580) : RFValue(14, 580),
    marginTop: Platform.OS === 'ios' ? 10 : 10,
    color: Colors.black,
    fontFamily: 'Poppins-SemiBold',
  },
  centeredView: {
    flex: 1,
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 60 : 0,
    paddingBottom: Platform.OS === 'ios' ? 0 : 0,
    justifyContent: 'center',
    backgroundColor: Colors.lightGray,
    opacity: 0.9,
  },
  modalView: {
    margin: 0,
    width: '90%',
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 0,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 6.84,
    elevation: 9,
    justifyContent: 'center',
  },
});
export default styles;
