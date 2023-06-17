import React, { useEffect, useState } from "react";
import { View, StatusBar, ToastAndroid } from "react-native";
import FastImage from "react-native-fast-image";
import styles from "./styles";
import { getUserAsyncStroage } from "../../../common/AsyncStorage";
import { useGetUserMeQuery } from "../../../slice/FitsApi.slice";

const CheckUser = ({ navigation }) => {
  
  const [userDatax, setUserDatax] = useState();

  const { data:userMeData, isLoading, error, isSuccess } = useGetUserMeQuery({ id: userDatax?.data._id });


  // Effects
  useEffect(() => {
    navigation.addListener("focus", () => {
      userMe();
    });
  }, []);

  useEffect(() => {
  getUserInfo(userMeData?.profile_status);
  }, [userMeData]);

  // Functions
  const userMe = async () => {
    const userData=await getUserAsyncStroage()
    setUserDatax(userData)
  
      
  };
console.log("userDatax?.login",userDatax?.login)
  const getUserInfo = async (profile_status: { personal_step_1: boolean; professional_step_2: boolean; service_offered_step_3: boolean; fitness_level_step_2: boolean; fitness_goal_step_3: boolean; }) => {
    if (userDatax === null) {
      ToastAndroid.show("Please Enter your email.", ToastAndroid.SHORT);
      navigation.navigate("Welcome");
    } else {
      if (userDatax?.login) {
        if (userDatax?.data?.role === "trainer") {
          if (profile_status?.personal_step_1 === false) {
            navigation.navigate("PersonalInfo");
          } else if (profile_status?.professional_step_2 === false) {
            navigation.navigate("ProfessionalInfo");
          } else if (profile_status?.service_offered_step_3 === false) {
            navigation.navigate("ServicesOffered");
          } else {
            navigation.navigate("TrainerTabb");
          }
        } else if (userDatax?.data?.role === "trainee") {
          if (profile_status?.personal_step_1 === false) {
            navigation.navigate("PersonalInfo");
          } else if (profile_status?.fitness_level_step_2 === false) {
            navigation.navigate("FitnessLevel");
          } else if (profile_status?.fitness_goal_step_3 === false) {
            navigation.navigate("FitnessGoal");
          } else {
            navigation.navigate("TraineeTabb");
          }
        } else {
        }
      } else if (userDatax?.register === true) {
        if (userDatax?.data?.role === "trainer") {
          if (profile_status?.personal_step_1 === false) {
            navigation.navigate("PersonalInfo");
          } else if (profile_status?.professional_step_2 === false) {
            navigation.navigate("ProfessionalInfo");
          } else if (profile_status?.service_offered_step_3 === false) {
            navigation.navigate("ServicesOffered");
          } else {
            navigation.navigate("TrainerTabb");
          }
        } else if (userDatax?.data?.role === "trainee") {
          if (profile_status?.personal_step_1 === false) {
            navigation.navigate("PersonalInfo");
          } else if (profile_status?.fitness_level_step_2 === false) {
            navigation.navigate("FitnessLevel");
          } else if (profile_status?.fitness_goal_step_3 === false) {
            navigation.navigate("FitnessGoal");
          } else {
            navigation.navigate("TraineeTabb");
          }
        } else {
        }
      } else {
        navigation.navigate("Welcome");
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
