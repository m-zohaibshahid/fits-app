import React, {useEffect} from 'react';
import {View, StatusBar, ToastAndroid, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FastImage from 'react-native-fast-image';
import styles from './styles';
import {useGetUserMeQuery} from '../../../slice/FitsApi.slice';
import {useSelector} from 'react-redux';
import {UserDetailInfoInterface} from '../../../interfaces/index';
import { useNavigation } from '@react-navigation/core';

let id: string;
const CheckUser = () => {
  const navigation = useNavigation();
  const {data: userInfo, isLoading, isError, error} = useGetUserMeQuery({id});

  useEffect(() => {
    navigation.addListener('focus', async () => {
      const userData: null | string = await AsyncStorage.getItem('userData');
      let userDatax = await JSON.parse(userData ?? '');
      id = userDatax?.data?._id;
    });
  }, []);

  const userData = useSelector(
    (state: {fitsStore: any; userInfo: UserDetailInfoInterface}) =>
      state.fitsStore,
  );
  // Functions
  const checkTrainer = (profile_status: any) => {
    if (!profile_status?.personal_step_1) {
      handleNavigate('PersonalInfo');
    } else if (!profile_status?.professional_step_2) {
      handleNavigate('ProfessionalInfo');
    } else if (!profile_status?.service_offered_step_3) {
      handleNavigate('ServicesOffered');
    } else {
      handleNavigate('TrainerTabb');
    }
  };
  const checkTrainee = (profile_status: any) => {
    if (!profile_status?.personal_step_1) {
      handleNavigate('PersonalInfo');
    } else if (!profile_status?.fitness_level_step_2) {
      handleNavigate('FitnessLevel');
    } else if (!profile_status?.fitness_goal_step_3) {
      handleNavigate('FitnessGoal');
    } else {
      handleNavigate('TraineeTabb');
    }
  };

  const getUserInfo = async (profile_status: any) => {
    if (userData.userInfo === null) {
      ToastAndroid.show('Please Enter your email.', ToastAndroid.SHORT);
      handleNavigate('Welcome');
    } else {
      if (userData.userInfo?.login || userData.userInfo?.register) {
        if (userData.userInfo?.data?.role === 'trainer') {
          checkTrainer(profile_status);
        } else if (userData.userInfo?.data?.role === 'trainee') {
          checkTrainee(profile_status);
        }
      } else {
        handleNavigate('Welcome');
      }
    }
  };

  const handleNavigate = (screen: string) => navigation.navigate(screen);


  useEffect(() => {
    if (userInfo?.success) {
      const profile_status = userInfo?.profile_status;
      getUserInfo(profile_status);
    }
  }, [userInfo])

  return (
    <>
      {isLoading && (
        <>
          <StatusBar backgroundColor="#000" />
          <View style={styles.mainContainer}>
            <FastImage
              style={{
                width: 50,
                height: 50,
              }}
              source={{
                uri: 'https://i.gifer.com/ZZ5H.gif',
                headers: {Authorization: 'someAuthToken'},
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.cover}
            />
          </View>
        </>
      )}
    </>
  );
};

export default CheckUser;
