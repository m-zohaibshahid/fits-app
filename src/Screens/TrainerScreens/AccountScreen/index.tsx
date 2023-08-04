/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Pressable,
  Platform,
} from 'react-native';
import Geocoder from 'react-native-geocoder';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {RFValue} from 'react-native-responsive-fontsize';
import * as Images from '../../../constants/Images';
import FastImage from 'react-native-fast-image';
import { useUpdatePasswordMutation } from '../../../slice/FitsApi.slice';
import Container from '../../../Components/Container';
import Header from '../../../Components/Header';
import Typography from '../../../Components/typography/text';
import Colors from '../../../constants/Colors';
import TextInput from '../../../Components/Input';
import Button from '../../../Components/Button';
import { NavigationSwitchProp } from 'react-navigation';
import { useSelector } from 'react-redux';
import { UserDetail } from '../../../interfaces';
import { onLogout } from '../../../utils/logout';
import { LocationState } from '../../../slice/location.slice';
import { errorToast, successToast } from '../../../utils/toast';

interface PropsInterface {
  navigation: NavigationSwitchProp
}

const AccountScreen = ({navigation}: PropsInterface) => {
  const [ChangePassword, setChangePassword] = useState(false);
  const { userInfo } = useSelector((state: { fitsStore: Partial<UserDetail> }) => state.fitsStore);
  const { latitude, longitute } = useSelector((state: {location: LocationState}) => state.location);
  const [userCurrentLocation, setUserCurrentLocation] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [updatePassword, {isLoading: passwordUpdateLoading}] = useUpdatePasswordMutation();

  const getUserLocation = () => {
    Geocoder.geocodePosition({
      lat: latitude,
      lng: longitute,
    }).then((res: string | any[]) => {
      if (res.length > 0) {
        const address = res[0].formattedAddress;
        setUserCurrentLocation(address);
      } else {
        setUserCurrentLocation('Location not available');
      }
    }).catch((error: any) => {
      setUserCurrentLocation('Location not available');
    });
  };

  useEffect(() => {
    getUserLocation();
  }, []);


  const UpdatePassword = async () => {
      const body={
        oldPassword: oldPassword,
        password: newPassword,
      }
      
    const result:any = await updatePassword({ id: userInfo?.user._id, data: body })
    if (result.error) errorToast(result.error.data.message)
    if (result.data) {
      successToast('Password updated')
      setChangePassword(false)
    }
    }

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
                {userInfo?.personal_info?.profileImage ? (
                  <FastImage
                    style={{
                      width: 165,
                      height: 165,
                      borderRadius: 200 / 2,
                    }}
                    source={{
                      uri: `${userInfo?.personal_info?.profileImage}`,
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
                  {userInfo?.personal_info.name}
                </Text>
              </View>
            </View>
            <View style={{alignItems: 'center',flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, paddingHorizontal: 20}}>
                  <EvilIcons
                    name="location"
                    style={{color: '#000'}}
                    size={25}
                  />
          <Typography size={'medium'} style={{ marginLeft: 10}}>
                    {userCurrentLocation}
                  </Typography>
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
                  {userInfo?.user.accountVerified ? (
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
            <View style={{alignItems: 'center'}}>
              <View
            style={{
                  marginVertical: 5,
                  width: '100%',
                  backgroundColor: '#000',
                  padding: 20,
                  borderRadius: 10,
                }}>
                 <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => navigation.navigate('AccountUpdate')}
                        style={{
                          width: '100%',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          }}>
                          <Typography color='white'>Profile</Typography>
                          <MaterialCommunityIcons
                            name="pencil-outline"
                            color={'#fff'}
                            size={25}
                          />
                      </TouchableOpacity>
                <View style={{
                  width: '100%',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginVertical: 10
                    }}>
                        <Typography color='white' size={'regularText'}>
                          Username
                        </Typography>
                        <Typography color='white' size={'regularText'}>
                          {userInfo?.personal_info.name}
                        </Typography>
                    </View>
                <View style={{
                  width: '100%',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginVertical: 10
                    }}>
                        <Typography color='white' size={'regularText'}>
                          Email
                        </Typography>
                        <Typography color='white' size={'regularText'}>
                          {userInfo?.user.email}
                        </Typography>
                    </View>
                <View style={{
                  width: '100%',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginVertical: 10
                    }}>
                        <Typography color='white' size={'regularText'}>
                          Country
                        </Typography>
                        <Typography color='white' size={'regularText'}>
                        {userInfo?.personal_info.country}
                        </Typography>
                    </View>
                <View style={{
                  width: '100%',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginVertical: 10
                    }}>
                        <Typography color='white' size={'regularText'}>
                        State
                        </Typography>
                        <Typography color='white' size={'regularText'}>
                        {userInfo?.personal_info.state}
                        </Typography>
                    </View>
                <View style={{
                  width: '100%',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginVertical: 10
                    }}>
                        <Typography color='white' size={'regularText'}>
                        City
                        </Typography>
                        <Typography color='white' size={'regularText'}>
                        {userInfo?.personal_info.city}
                        </Typography>
                    </View>
                <View style={{
                  width: '100%',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginVertical: 10
                    }}>
                        <Typography color='white' size={'regularText'}>
                        Gender
                        </Typography>
                        <Typography color='white' size={'regularText'}>
                        {userInfo?.personal_info.gender}
                        </Typography>
                    </View>
                  </View>
            </View>
            <View style={{ alignItems: 'center', marginVertical: 5 }}>
              <Pressable
                onPress={() => {
                  if (userInfo?.stripe.card) navigation.navigate('TrainerWallet');
                  else navigation.navigate('CreateCardScreen');
                }}
                style={{
                  width: '100%',
                  alignItems: 'center',
                  backgroundColor: '#000',
                  borderRadius: 14,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  padding: 15
            }}>
            <View style={{ flexDirection: 'row' }}>
              <Fontisto name="wallet" size={22} color={'#fff'} />
                <Typography style={{marginLeft: 10}} color="white">
                  Wallet
                </Typography>
                </View>
              </Pressable>
            </View>
            <View style={{ backgroundColor: Colors.black, alignItems: "center", borderRadius: 10, marginVertical: 5 }}>
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
                        <TextInput placeholder="Enter Password" label="Old Password" secureTextEntry value={oldPassword} onChangeText={setOldPassword} />
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
                <Button loader={passwordUpdateLoading} style={{marginLeft: 'auto'}} variant="tini" label={"Change"} onPress={UpdatePassword} />
              </View>
            )}
            </View>
            <View style={{ alignItems: 'center', marginVertical: 5 }}>
              <Pressable
                onPress={() => navigation.navigate('ServicesOffered')}
                style={{
                  width: '100%',
                  alignItems: 'center',
                  backgroundColor: '#000',
                  borderRadius: 14,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  padding: 15
            }}>
            <View style={{ flexDirection: 'row' }}>
              <Ionicons name="ios-barbell" size={22} color={'#fff'} />
                <Typography style={{marginLeft: 10}} color="white">
                Services offered
                </Typography>
                </View>
              </Pressable>
            </View>
            <View style={{ alignItems: 'center', marginVertical: 5 }}>
              <Pressable
                 onPress={() =>
                  navigation.navigate('UpdateProfessioninfo')
                }
                style={{
                  width: '100%',
                  alignItems: 'center',
                  backgroundColor: '#000',
                  borderRadius: 14,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  padding: 15
            }}>
            <View style={{ flexDirection: 'row' }}>
            <Entypo name="graduation-cap" size={22} color={'#fff'} />
                <Typography style={{marginLeft: 10}} color="white">
                Qualifications & Experience
                </Typography>
                </View>
              </Pressable>
            </View>
            <View style={{ alignItems: 'center', marginVertical: 5 }}>
              <Pressable
                onPress={onLogout}
                style={{
                  width: '100%',
                  alignItems: 'center',
                  backgroundColor: '#000',
                  borderRadius: 14,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  padding: 15
            }}>
            <View style={{ flexDirection: 'row' }}>
            <Entypo name="log-out" size={22} color={'#fff'} />
                <Typography style={{marginLeft: 10}} color="white">
                  Sign out
                </Typography>
                </View>
              </Pressable>
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
    paddingBottom: 0,
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
