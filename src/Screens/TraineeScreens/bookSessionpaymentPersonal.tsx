import React, {useState} from 'react';
import {
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Modal,
  Image,
  ScrollView,
  Pressable,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import * as Images from '../../constants/Images';
import Header from '../../Components/Header';
import Button from '../../Components/Button';

const BookSessionPaymentPersonal = ({navigation}) => {
  const [details, setDetails] = useState(false);
  const GoBack = () => {
    navigation.goBack();
  };
  const NextScreen = () => {
    navigation.navigate('');
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.fixeheight}>
          <Header navigation={navigation} onPress={GoBack} />
        </View>
        <View style={styles.fixeheight1}>
          <View style={styles.TopView}>
            <View style={styles.topView}>
              <Text style={styles.paymenttextstyle}>Payment</Text>
              <Text style={styles.beforclasstextstyle}>
                Pay before the class starts
              </Text>
            </View>
          </View>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.main}>
        {/*start Totale */}
        <View style={styles.TopView}>
          <View style={styles.marchmainview}>
            <View style={styles.marchmainview2}>
              <View style={{width: '25%', alignItems: 'center'}}>
                <Text style={styles.marchtext}>5-March</Text>
              </View>
              <View
                style={{
                  width: '5%',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    width: 2,
                    height: 50,
                    backgroundColor: '#fff',
                  }}></View>
              </View>
              <View style={{width: '35%', flexDirection: 'column'}}>
                <Text style={styles.marchtext}>Yoga Defence</Text>
                <Text
                  style={{
                    color: '#fff',
                    fontSize: RFValue(12, 580),
                    fontFamily: 'Poppins-Regular',
                  }}>
                  5 PM - 6 PM
                </Text>
              </View>
              <Pressable
                onPress={() => setDetails(!details)}
                style={{
                  width: '30%',
                  backgroundColor: '#414143',
                  alignItems: 'center',
                  borderRadius: 14,
                  height: 50,
                  justifyContent: 'center',
                }}>
                <View
                  style={{
                    width: '100%',
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}>
                  <View style={{width: '80%', justifyContent: 'center'}}>
                    <Text
                      style={{
                        color: '#fff',
                        fontSize: RFValue(14, 580),
                        fontFamily: 'Poppins-Regular',
                        textAlign: 'center',
                      }}>
                      Details
                    </Text>
                  </View>
                  <Entypo
                    name={details ? 'chevron-up' : 'chevron-down'}
                    size={18}
                    color={'#fff'}
                  />
                </View>
              </Pressable>
            </View>
            {/*end Yoga */}
            {details && (
              <View style={{width: '100%', paddingBottom: 18}}>
                <View style={{width: '90%'}}>
                  <View style={styles.dotmainview}>
                    <View style={styles.dotview}>
                      <FontAwesome name="circle" style={{color: '#979797'}} />
                    </View>
                    <View style={{width: '90%'}}>
                      <Text style={styles.textstyle}>
                        Type:{'\n'} Online session(personal)
                      </Text>
                    </View>
                  </View>
                  <View style={styles.dotmainview}>
                    <View style={styles.dotview}>
                      <FontAwesome name="circle" style={{color: '#979797'}} />
                    </View>
                    <View style={{width: '90%'}}>
                      <Text style={styles.textstyle}>Cost: {'\n'}$ 488</Text>
                    </View>
                  </View>
                  <View style={styles.dotmainview}>
                    <View style={styles.dotview}>
                      <FontAwesome name="circle" style={{color: '#979797'}} />
                    </View>
                    <View style={{width: '90%'}}>
                      <Text style={styles.textstyle}>
                        Trainer name: Murrey Job{'\n'}Trainer name: Murrey Job
                      </Text>
                    </View>
                  </View>
                  <View style={styles.dotmainview}>
                    <View style={styles.dotview}>
                      <FontAwesome name="circle" style={{color: '#979797'}} />
                    </View>
                    <View style={{width: '90%'}}>
                      <Text style={styles.textstyle}>
                        Description:{'\n'}Lorem ipsum dolor sit amet,
                        consectetur adipiscing elit. In adipiscing ac adipiscing
                        mauris tincidunt varius sollicitudin.
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            )}
          </View>
        </View>
        {/*end total */}

        <View style={styles.TopView}>
          <View style={styles.topView}>
            {/*start pay*/}
            <View style={styles.rowView}>
              <View style={styles.totalView}>
                <Text style={styles.totalText}>Total Cost</Text>
              </View>
              <View style={styles.$10View}>
                <Text style={styles.totalText}>$ 488 </Text>
              </View>
            </View>
            {/*end pay*/}
            {/*start pay*/}
            <View style={styles.rowView}>
              <View style={styles.totalView}>
                <Text style={styles.walletText}>Wallet Balance</Text>
              </View>
              <View style={styles.$10View}>
                <Text style={styles.walletText}>$ 300 </Text>
              </View>
            </View>
            {/*end pay*/}
          </View>
        </View>
        <View style={{paddingVertical: 40}}></View>
      </ScrollView>
      <View style={styles.footer}>
        <View style={styles.TopView}>
          <Button
            navigation={navigation}
            label={'Pay Now'}
            onPress={NextScreen}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingTop: Platform.OS === 'ios' ? 40 : 0,
    paddingBottom: Platform.OS === 'ios' ? 0 : 0,
  },
  header: {
    width: '100%',
    height: 120,
  },
  fixeheight: {
    height: 50,
    justifyContent: 'center',
    borderBottomWidth: 0.5,
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
    height: '100%',
    paddingVertical: 10,
  },
  TopView: {
    width: '100%',
    alignItems: 'center',
  },
  topView: {
    width: '90%',
  },

  rowView: {
    width: '100%',
    flexDirection: 'row',
  },
  borderView: {
    width: '100%',
    borderWidth: 1,
    bordercolor: '#000',
  },
  textstyle: {
    color: '#fff',
    fontSize: RFValue(12, 580),
    fontFamily: 'Poppins-Regular',
  },
  dotmainview: {
    width: '100%',
    flexDirection: 'row',
  },
  dotview: {
    width: '10%',
    alignItems: 'center',
  },
  marchmainview: {
    width: '90%',
    backgroundColor: '#000',
    justifyContent: 'center',
    borderRadius: 14,
    margin: 10,
  },
  marchmainview2: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingVertical: 9,
  },
  marchtext: {
    color: '#fff',
    fontSize: RFValue(12, 580),
    fontFamily: 'Poppins-SemiBold',
  },
  mainbtnView: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#fff',
  },
  ccbtnview: {
    backgroundColor: '#ff0000',
    width: 100,
    height: 45,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilebtnview: {
    backgroundColor: '#ff0000',
    width: 100,
    height: 45,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btntextstyle: {
    color: '#fff',
    fontSize: RFValue(10, 580),
    fontFamily: 'Poppins-Regular',
  },
  upcomingtextstyle: {
    fontSize: RFValue(17, 580),
    fontFamily: 'Poppins-SemiBold',
    color: '#000',
  },
  paymenttextstyle: {
    fontSize: RFValue(20, 580),
    fontFamily: 'Poppins-Bold',
    color: '#000000',
    lineHeight: 51,
  },
  beforclasstextstyle: {
    fontSize: RFValue(12, 580),
    fontFamily: 'Poppins-Regular',
    color: '#000000',
    lineHeight: 25,
  },
  totalView: {
    width: '50%',
  },
  $10View: {
    width: '50%',
    alignItems: 'flex-end',
  },
  totalText: {
    fontFamily: 'Poppins-Bold',
    fontSize: RFValue(17, 580),
    lineHeight: 50,
    color: '#000',
  },
  walletText: {
    fontFamily: 'Poppins-Regular',
    fontSize: RFValue(17, 580),
    lineHeight: 40,
    color: '#000',
  },
  footer: {
    width: '100%',
    marginBottom: 0,
    bottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    backgroundColor: '#fff',
  },
  btn: {
    padding: 10,
    width: '90%',
    borderRadius: 10,
    backgroundColor: '#FF0000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paytextstyle: {
    color: '#FFFFFF',
    fontSize: RFValue(12, 580),
    fontFamily: 'Poppins-SemiBold',
  },
});
export default BookSessionPaymentPersonal;
