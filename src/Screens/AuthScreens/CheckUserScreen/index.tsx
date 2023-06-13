import React, { useEffect } from "react";
import { View, StatusBar, ToastAndroid } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FastImage from "react-native-fast-image";
import { url } from "../../../constants/url";
import styles from "./styles";

const CheckUser = ({ navigation }) => {
  // Effects
  useEffect(() => {
    navigation.addListener("focus", () => {
      userMe();
    });
  }, [userMe]);

  // Functions
  const userMe = async () => {
    const userData = await AsyncStorage.getItem("userData");
    let userDatax = await JSON.parse(userData);
    await fetch(`${url}user/me/${userDatax?.data?._id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${userDatax?.access_token}`,
      },
    })
      .then((res) => res.json())
      .then((res2) => {
        console.log(res2.message);
        if (res2?.success) {
          const profile_status = res2.profile_status;
          getUserInfo(profile_status);
        } else {
          ToastAndroid.show(res2.message, ToastAndroid.SHORT);
          //alert(res2.errors);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getUserInfo = async (profile_status) => {
    const userData = await AsyncStorage.getItem("userData");
    let userDatax = JSON.parse(userData);
    if (userDatax === null) {
      ToastAndroid.show("Please Enter your email.", ToastAndroid.SHORT);
      navigation.navigate("Welcome");
    } else {
      if (userDatax?.login === true) {
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
