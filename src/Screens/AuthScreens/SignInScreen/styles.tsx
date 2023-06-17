/* eslint-disable prettier/prettier */
import {Platform, StyleSheet} from 'react-native';
import Colors from '../../../constants/Colors';
import {RFValue} from 'react-native-responsive-fontsize';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 40 : 0,
    paddingBottom: Platform.OS === 'ios' ? 0 : 0,
    backgroundColor: Colors.white,
  },
  mainBody: {
    width: '100%',
  },
  inputEmail: {
    borderRadius: 10,
    width: '100%',
    paddingLeft: 10,
    height: Platform.OS === 'ios' ? 40 : 40,
    borderColor: '#fff',
    fontSize: RFValue(10, 580),
    fontFamily: 'Poppins-Regular',
    color: Colors.white,
  },

  hideIconView: {
    width: '10%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  forgotPasswordRect: {
    width: '90%',
    marginTop: 20,
    alignSelf: 'center',
    alignItems: 'flex-end',
  },
  forgottext: {
    textDecorationLine: 'underline',
    marginBottom: 15,
  },
  termsTextRect: {
    paddingHorizontal: 20,
  },
  underlinetext: {
    textDecorationLine: 'underline',
  },
  footerMainView: {
    width: '100%',
    flexDirection: 'row',
    marginBottom: 0,
    bottom: 0,
    height: '10%',
    alignItems: 'center',
    justifyContent: 'center',
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

  vercodetext: {
    fontSize: Platform.OS === 'ios' ? RFValue(12, 580) : RFValue(14, 580),
    marginTop: Platform.OS === 'ios' ? 10 : 10,
    color: Colors.black,
    fontFamily: 'Poppins-SemiBold',
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
});
export default styles;
