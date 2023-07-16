/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  ToastAndroid,
  ScrollView,
  ActivityIndicator,
  Pressable,
  Platform,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {RFValue} from 'react-native-responsive-fontsize';
import * as Images from '../../../constants/Images';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {url} from '../../../constants/url';
import FastImage from 'react-native-fast-image';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import { useUpdatePasswordMutation } from '../../../slice/FitsApi.slice';
import Container from '../../../Components/Container';
import Header from '../../../Components/Header';
import Typography from '../../../Components/typography/text';
import Colors from '../../../constants/Colors';
import TextInput from '../../../Components/Input';
import Button from '../../../Components/Button';

const AccountScreen = ({navigation}) => {
  const [hidePass, setHidePass] = useState(true);
  const [ChangePassword, setChangePassword] = useState(false);
  const [token, setToken] = useState('');
  const [id, setId] = useState('');
  const [data, setData] = useState('');
  const [load, setLoad] = useState('');
  const [loadx, setLoadx] = useState('');
  const [userCurrentLocation, setUserCurrentLocation] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [updatePassword, {  isLoading, error }] = useUpdatePasswordMutation();

  const NextScreen = data => {
    navigation.navigate('TrainerWallet', {
      Name: data?.personal_info?.name,
      Email: data?.user?.email,
    });
  };
  useEffect(() => {
    navigation.addListener('focus', () => {
      getUserInfo();
      userMe();
    });
  }, [getUserInfo]);
  const getUserInfo = async () => {
    const userData = await AsyncStorage.getItem('userData');
    let userDatax = JSON.parse(userData);
    setToken(userDatax?.access_token);
    setId(userDatax?.data?._id);
    const userLoc = await AsyncStorage.getItem('userLocation');
    let userLocx = JSON.parse(userLoc);
    setUserCurrentLocation(userLocx);
  };

  const userMe = async () => {
    setLoadx(true);
    const userData = await AsyncStorage.getItem('userData');
    let userDatax = JSON.parse(userData);
    await fetch(`${url}/user/me/${userDatax?.data?._id}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userDatax?.access_token}`,
      },
    })
      .then(res => res.json())
      .then(res2 => {
        setLoadx(false);
        if (res2.success === true) {
          setData(res2);
        } else {
          ToastAndroid.show(res2.message, ToastAndroid.LONG);
        }
      })
      .catch(error => {
        setLoadx(false);
        ToastAndroid.show(error, ToastAndroid.LONG);
      });
  };

  const UpdatePassword = async () => {
    if (oldPassword === '') {
      Toast.show({
        type: 'error',
        text1: 'Please enter your old password',
      });
    } else if (newPassword === '') {
      Toast.show({
        type: 'error',
        text1: 'Please enter your new password',
      });
    } else if (newPassword !== confirmPassword) {
      Toast.show({
        type: 'error',
        text1: 'Confirmation password do not match.',
      });
    } else {
      const body={
        oldPassword: oldPassword,
        password: newPassword,
      }
      setLoad(true);
      
      await updatePassword({ id, ...body })
      .unwrap()
        .then(res2 => {
          setLoad(false);
          if (res2.success === true) {
            Toast.show({
              type: 'success',
              text1: 'Password updated successfully.',
            });
          } else {
            Toast.show({
              type: 'error',
              text1: 'Old password is wrong',
            });
          }
        })
        .catch(() => {
          setLoad(false);
          Toast.show({
            type: 'error',
            text1: 'something went wrong!',
          });
        });
    }
  };

  const logOut = async () => {
    await AsyncStorage.setItem('personalInfoTrainer', JSON.stringify('false'));
    await AsyncStorage.setItem(
      'pefessionalInfoTrainer',
      JSON.stringify('false'),
    );
    await AsyncStorage.setItem('servicesTrainer', JSON.stringify('false'));
    await AsyncStorage.setItem('personalInfoTrainee', JSON.stringify('false'));
    await AsyncStorage.setItem('fitnessLevelTrainee', JSON.stringify('false'));
    await AsyncStorage.setItem('fitnessGoalTrainee', JSON.stringify('false'));
    await AsyncStorage.removeItem('personalInfoTrainer');
    await AsyncStorage.removeItem('pefessionalInfoTrainer');
    await AsyncStorage.removeItem('servicesTrainer');
    await AsyncStorage.removeItem('personalInfoTrainee');
    await AsyncStorage.removeItem('fitnessLevelTrainee');
    await AsyncStorage.removeItem('fitnessGoalTrainee');
    await AsyncStorage.removeItem('userToken');
    await AsyncStorage.removeItem('userData');
    Toast.show({
      type: 'success',
      text1: 'Log out successfully',
    });
    navigation.navigate('logoutNow');
  };

  return (
    <Container>
      <Header label='Settings' lableStyle={{fontSize: 20}} />
         <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{alignItems: 'center'}}>
              <View
                style={{
                  width: '90%',
                  marginTop: 15,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {data?.personal_info?.profileImage ? (
                  <FastImage
                    style={{
                      width: 165,
                      height: 165,
                      borderRadius: 200 / 2,
                    }}
                    source={{
                      uri: `${data?.personal_info?.profileImage}`,
                      headers: {Authorization: 'someAuthToken'},
                      priority: FastImage.priority.normal,
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                  />
                ) : (
                  <Image
                    style={{width: 165, height: 165, borderRadius: 200 / 2}}
                    source={Images.Profile}
                  />
                )}
              </View>
            </View>
            <View style={{alignItems: 'center', marginTop: 10}}>
              <View style={{width: '90%', alignItems: 'center', marginTop: 5}}>
                <Text
                  style={{
                    fontSize: RFValue(19, 580),
                    fontFamily: 'Poppins-Bold',
                    color: '#000',
                    textTransform: 'capitalize',
                  }}>
                  {data?.personal_info?.name}
                </Text>
              </View>
            </View>
            <View style={{alignItems: 'center'}}>
              <View
                style={{
                  width: '90%',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <View
                  style={{
                    width: '6%',
                    justifyContent: 'center',
                  }}>
                  <EvilIcons
                    name="location"
                    style={{color: '#000'}}
                    size={25}
                  />
                </View>
                <View style={{width: '94%'}}>
                  <Text
                    style={{
                      fontSize: RFValue(12, 580),
                      color: '#000',
                    }}>
                    {' '}
                    {userCurrentLocation}
                  </Text>
                </View>
              </View>
            </View>
            <View style={{alignItems: 'center', marginTop: 10}}>
              <Pressable
                onPress={() => navigation.navigate('TrainerVerification')}
                style={{
                  width: '60%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row',
                  backgroundColor: 'rgba(0, 0, 0, 0.4)',
                  height: 44,
                  borderRadius: 15,
                }}>
                <View
                  style={{
                    width: '90%',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  {data?.profession_info?.verification_status === 'verified' ? (
                    <Text
                      style={{
                        fontFamily: 'Poppins-SemiBold',
                        color: '#fff',
                        fontSize: RFValue(12, 580),
                        marginLeft: 15,
                        marginRight: 4,
                      }}>
                      Verified
                    </Text>
                  ) : (
                    <Text
                      style={{
                        fontFamily: 'Poppins-SemiBold',
                        color: '#fff',
                        fontSize: RFValue(12, 580),
                        marginLeft: 15,
                        marginRight: 4,
                      }}>
                      Apply For verification
                    </Text>
                  )}
                </View>
                <View style={{width: '20%'}}>
                  <AntDesign
                    name="checksquare"
                    size={20}
                    color={'rgba(255, 0, 0, 1)'}
                  />
                </View>
              </Pressable>
            </View>
            <View style={{alignItems: 'center', marginTop: 30}}>
              <View
                style={{
                  width: '90%',
                  alignItems: 'center',
                  backgroundColor: '#000',
                  paddingTop: 5,
                  paddingBottom: 10,
                  borderRadius: 14,
                }}>
                <View style={{alignItems: 'center'}}>
                  <View style={{width: '90%', alignItems: 'center'}}>
                    <View
                      style={{
                        marginTop: 10,
                        width: '100%',
                        flexDirection: 'row',
                      }}>
                      <View style={{width: '50%', justifyContent: 'center'}}>
                        <Text
                          style={{
                            color: '#fff',
                            fontSize: RFValue(14, 580),
                            fontFamily: 'Poppins-Regular',
                          }}>
                          Profile
                        </Text>
                      </View>
                      <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => navigation.navigate('AccountUpdate')}
                        style={{width: '50%', alignItems: 'flex-end'}}>
                        <View>
                          <MaterialCommunityIcons
                            name="pencil-outline"
                            color={'#fff'}
                            size={25}
                          />
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View
                      style={{
                        borderBottomColor: '#fff',
                        borderBottomWidth: 1,
                        width: '100%',
                        marginTop: 5,
                      }}
                    />
                    <View
                      style={{
                        marginTop: 10,
                        width: '100%',
                        flexDirection: 'row',
                      }}>
                      <View style={{width: '50%'}}>
                        <Text
                          style={{
                            color: '#fff',
                            fontSize: RFValue(14, 580),
                            fontFamily: 'Poppins-Regular',
                          }}>
                          Full name
                        </Text>
                      </View>
                      <View style={{width: '50%', alignItems: 'flex-end'}}>
                        <Text
                          style={{
                            color: '#fff',
                            fontSize: RFValue(12, 580),
                            fontFamily: 'Poppins-Regular',
                            textTransform: 'capitalize',
                          }}>
                          {data?.personal_info?.name}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        marginTop: 10,
                        width: '100%',
                      }}>
                      <View style={{alignItems: 'flex-start'}}>
                        <Text
                          style={{
                            color: '#fff',
                            fontSize: RFValue(15, 580),
                            fontFamily: 'Poppins-Regular',
                          }}>
                          E-mail
                        </Text>
                      </View>
                      <View style={{alignItems: 'flex-end'}}>
                        <Text
                          style={{
                            color: '#fff',
                            fontSize: RFValue(10, 580),
                            fontFamily: 'Poppins-Regular',
                          }}>
                          {data?.user?.email}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        marginTop: 10,
                        width: '100%',
                        flexDirection: 'row',
                      }}>
                      <View style={{width: '50%'}}>
                        <Text
                          style={{
                            color: '#fff',
                            fontSize: RFValue(15, 580),
                            fontFamily: 'Poppins-Regular',
                          }}>
                          Country
                        </Text>
                      </View>
                      <View style={{width: '50%', alignItems: 'flex-end'}}>
                        <Text
                          style={{
                            color: '#fff',
                            fontSize: RFValue(12, 580),
                            fontFamily: 'Poppins-Regular',
                          }}>
                          {data?.personal_info?.country}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        marginTop: 10,
                        width: '100%',
                        flexDirection: 'row',
                      }}>
                      <View style={{width: '50%'}}>
                        <Text
                          style={{
                            color: '#fff',
                            fontSize: RFValue(15, 580),
                            fontFamily: 'Poppins-Regular',
                          }}>
                          State
                        </Text>
                      </View>
                      <View style={{width: '50%', alignItems: 'flex-end'}}>
                        <Text
                          style={{
                            color: '#fff',
                            fontSize: RFValue(12, 580),
                            fontFamily: 'Poppins-Regular',
                          }}>
                          {data?.personal_info?.state}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        marginTop: 10,
                        width: '100%',
                        flexDirection: 'row',
                      }}>
                      <View style={{width: '50%'}}>
                        <Text
                          style={{
                            color: '#fff',
                            fontSize: RFValue(15, 580),
                            fontFamily: 'Poppins-Regular',
                          }}>
                          City
                        </Text>
                      </View>
                      <View style={{width: '50%', alignItems: 'flex-end'}}>
                        <Text
                          style={{
                            color: '#fff',
                            fontSize: RFValue(12, 580),
                            fontFamily: 'Poppins-Regular',
                          }}>
                          {data?.personal_info?.city}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        marginTop: 10,
                        width: '100%',
                        flexDirection: 'row',
                      }}>
                      <View style={{width: '50%'}}>
                        <Text
                          style={{
                            color: '#fff',
                            fontSize: RFValue(15, 580),
                            fontFamily: 'Poppins-Regular',
                          }}>
                          Gender
                        </Text>
                      </View>
                      <View style={{width: '50%', alignItems: 'flex-end'}}>
                        <Text
                          style={{
                            color: '#fff',
                            fontSize: RFValue(12, 580),
                            fontFamily: 'Poppins-Regular',
                          }}>
                          {data?.personal_info?.gender}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <View style={{alignItems: 'center', marginTop: 30}}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  if (data?.stripe?.card) {
                    navigation.navigate('TrainerWallet');
                  } else {
                    navigation.navigate('TrainerCreateCard');
                  }
                }}
                style={{
                  width: '90%',
                  alignItems: 'center',
                  backgroundColor: '#000',
                  borderRadius: 14,
                }}>
                <View style={{alignItems: 'center'}}>
                  <View style={{width: '90%', alignItems: 'center'}}>
                    <View
                      style={{
                        width: '100%',
                        height: 60,
                        justifyContent: 'center',
                        flexDirection: 'row',
                      }}>
                      <View style={{width: '15%', justifyContent: 'center'}}>
                        <Fontisto name="wallet" size={22} color={'#fff'} />
                      </View>
                      <View style={{width: '80%', justifyContent: 'center'}}>
                        <Text
                          style={{
                            color: '#fff',
                            fontSize: RFValue(12, 580),
                            fontFamily: 'Poppins-SemiBold',
                          }}>
                          Wallet
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
            <View style={{ backgroundColor: Colors.black, alignItems: "center", borderRadius: 10, marginTop: 30 }}>
                    <Pressable
                      onPress={() => setChangePassword(!ChangePassword)}
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: '100%',
                        padding: 15
                    }}>
                      <View style={{ flexDirection: 'row' }}>
                        <Entypo
                          name={'key'}
                          size={25}
                          color={'#fff'}
                        />
                        <Typography style={{marginLeft: 10}} color="white">
                          Change Password
                        </Typography>
                        </View>
                        <Entypo
                          name={ChangePassword ? 'chevron-up' : 'chevron-down'}
                          size={25}
                          color={'#fff'}
                        />
                    </Pressable>
               {ChangePassword && (
                 <View
                   style={{
                   width: "100%",
              padding: 20,
                   backgroundColor: Colors.white90
                   }}
                 >
                        <TextInput label="Old Password" placeholder="" secureTextEntry value={oldPassword} onChangeText={setOldPassword} />
                        <TextInput
                          style={styles.inputPassword}
                          label="New Password"
                          placeholder="Enter Password"
                          secureTextEntry
                          value={newPassword}
                          onChangeText={setNewPassword}
                        />
                        <TextInput
                          style={styles.inputPassword}
                          label="New Password"
                          placeholder="Enter Password"
                          secureTextEntry
                          value={confirmPassword}
                          onChangeText={setConfirmPassword}
                />
                <Button style={{marginLeft: 'auto'}} variant="tini" label={"Change"} onPress={UpdatePassword} />
              </View>
            )}
            </View>
            <View style={{alignItems: 'center', marginTop: 30}}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() =>
                  navigation.navigate('ServicesOffered', {
                    Id: data?.user?.profession,
                    token: token,
                  })
                }
                style={{
                  width: '90%',
                  alignItems: 'center',
                  backgroundColor: '#000',
                  borderRadius: 14,
                }}>
                <View style={{alignItems: 'center'}}>
                  <View style={{width: '90%', alignItems: 'center'}}>
                    <View
                      style={{
                        width: '100%',
                        height: 60,
                        justifyContent: 'center',
                        flexDirection: 'row',
                      }}>
                      <View style={{width: '15%', justifyContent: 'center'}}>
                        <Ionicons name="ios-barbell" size={22} color={'#fff'} />
                      </View>
                      <View
                        style={{
                          width: '80%',
                          justifyContent: 'center',
                        }}>
                        <Text
                          style={{
                            color: '#fff',
                            fontSize: RFValue(12, 580),
                            fontFamily: 'Poppins-SemiBold',
                          }}>
                          Services offered
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
            <View style={{alignItems: 'center', marginTop: 30}}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() =>
                  navigation.navigate('UpdateProfessioninfo', {
                    Id: data?.user?.profession,
                    token: token,
                  })
                }
                style={{
                  width: '90%',
                  alignItems: 'center',
                  backgroundColor: '#000',
                  borderRadius: 14,
                }}>
                <View style={{alignItems: 'center'}}>
                  <View style={{width: '90%', alignItems: 'center'}}>
                    <View
                      style={{
                        width: '100%',
                        height: 60,
                        justifyContent: 'center',
                        flexDirection: 'row',
                      }}>
                      <View style={{width: '15%', justifyContent: 'center'}}>
                        <Entypo
                          name="graduation-cap"
                          size={22}
                          color={'#fff'}
                        />
                      </View>
                      <View style={{width: '80%', justifyContent: 'center'}}>
                        <Text
                          style={{
                            color: '#fff',
                            fontSize: RFValue(12, 580),
                            fontFamily: 'Poppins-SemiBold',
                          }}>
                          Qualifications & Experience
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
            <View style={{alignItems: 'center', marginTop: 30}}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={{
                  width: '90%',
                  alignItems: 'center',
                  backgroundColor: '#000',
                  borderRadius: 14,
                }}
                onPress={() => {
                  logOut();
                }}>
                <View style={{alignItems: 'center'}}>
                  <View style={{width: '90%', alignItems: 'center'}}>
                    <View
                      style={{
                        width: '100%',
                        height: 60,
                        justifyContent: 'center',
                        flexDirection: 'row',
                      }}>
                      <View style={{width: '15%', justifyContent: 'center'}}>
                        <Entypo name="log-out" size={22} color={'#fff'} />
                      </View>
                      <View style={{width: '80%', justifyContent: 'center'}}>
                        <Text
                          style={{
                            color: '#fff',
                            fontSize: RFValue(12, 580),
                            fontFamily: 'Poppins-SemiBold',
                          }}>
                          Sign out
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          <View style={{marginVertical: 50}} />
        </ScrollView>
      <View style={styles.footer} />
    </Container>
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
    height: 70,
  },
  fixeheight1: {
    height: 70,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  main: {
    width: '100%',
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  footer: {
    width: '100%',
    marginBottom: 0,
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    backgroundColor: '#fff',
  },
  inputPassword: {
    borderRadius: 10,
    width: '100%',
    paddingLeft: 10,
    fontSize: RFValue(10, 580),
    fontFamily: 'Poppins-Regular',
    color: '#fff',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.29)',
  },
  modalView: {
    margin: 0,
    width: '100%',
    height: '100%',
    margin: 5,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 6.84,
    elevation: 9,
  },
  btn: {
    padding: 10,
    margin: 10,
    width: '90%',
    borderRadius: 10,
    color: '#6698FF',
    backgroundColor: '#979797',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AccountScreen;
