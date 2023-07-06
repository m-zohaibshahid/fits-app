import React, { useEffect, useState } from "react";
import { View, StatusBar, ToastAndroid } from "react-native";
import FastImage from "react-native-fast-image";
import styles from "./styles";
import { useGetUserMeQuery } from "../../../slice/FitsApi.slice";
import { getUserAsyncStroage } from "../../../utils/async-storage";
import { NavigationSwitchProp } from "react-navigation";
import { errorToast } from "../../../utils/toast";

interface PropsInterface {
  navigation: NavigationSwitchProp
}

const CheckUser = ({ navigation }: PropsInterface) => {
  
  const [userInfo, setUserInfo] = useState() as any

  

  useEffect(() => {
    getInitialValues();
  }, []);

  useEffect(() => {
    getUserInfo(userInfo?.profile_status);
  }, [userInfo]);

  // Functions
  const getInitialValues = async () => {
    const result = await getUserAsyncStroage()
    setUserInfo(result)
  };

  const getUserInfo = async (profile_status: { personal_step_1: boolean; professional_step_2: boolean; service_offered_step_3: boolean; fitness_level_step_2: boolean; fitness_goal_step_3: boolean; }) => {
    if (userInfo === null) {
      ToastAndroid.show("Please Enter your email.", ToastAndroid.SHORT);
      navigation.navigate("Welcome");
    } else {
        if (userInfo?.user?.role === "trainer") {
          if (profile_status?.personal_step_1 === false) {
            navigation.navigate("PersonalInfo");
          } else if (profile_status?.professional_step_2 === false) {
            navigation.navigate("ProfessionalInfo");
          } else if (profile_status?.service_offered_step_3 === false) {
            navigation.navigate("ServicesOffered");
          } else {
            navigation.navigate("TrainerTabb");
          }
        } else if (userInfo?.user?.role === "trainee") {
          if (profile_status?.personal_step_1 === false) {
            navigation.navigate("PersonalInfo");
          } else if (profile_status?.fitness_level_step_2 === false) {
            navigation.navigate("FitnessLevel");
          } else if (profile_status?.fitness_goal_step_3 === false) {
            navigation.navigate("FitnessGoal");
          } else {
            navigation.navigate("TraineeTabb");
          }
      }
    }
  };

  return (
    <>
      <StatusBar backgroundColor="#000" />
      <View style={styles.mainContainer}>
        <FastImage
          style={{
            width: 50,
            height: 50,
          }}
          source={{
            uri: "https://i.gifer.com/ZZ5H.gif",
            headers: { Authorization: "someAuthToken" },
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
      </View>
    </>
  );
};

export default CheckUser;
