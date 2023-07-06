import React, { useEffect } from "react";
import { View, StatusBar } from "react-native";
import FastImage from "react-native-fast-image";
import styles from "./styles";
import { useGetUserMeQuery } from "../../../slice/FitsApi.slice";
import { NavigationSwitchProp } from "react-navigation";
import { UserDetail } from "../../../interfaces";
import { useSelector } from "react-redux";

interface Props {
  navigation: NavigationSwitchProp;
}

const CheckUser: React.FC<Props> = ({ navigation }) => {
  const { userInfo } = useSelector((state: { fitsStore: Partial<UserDetail> }) => state.fitsStore);
  const { data: userMeData, isLoading, error, isSuccess } = useGetUserMeQuery({ id: userInfo?._id });

  // Effects
  useEffect(() => {
    if (isSuccess || !error) {
      getUserInfo(userMeData?.profile_status);
    }
  }, [userMeData]);

  // Functions

  const getUserInfo = async (profile_status: {
    personal_step_1: boolean;
    professional_step_2: boolean;
    service_offered_step_3: boolean;
    fitness_level_step_2: boolean;
    fitness_goal_step_3: boolean;
  }) => {
    if (userInfo?.role === "trainer") {
      if (!profile_status?.personal_step_1) {
        navigation.navigate("PersonalInfo");
      } else if (!profile_status?.professional_step_2) {
        navigation.navigate("ProfessionalInfo");
      } else if (!profile_status?.service_offered_step_3) {
        navigation.navigate("ServicesOffered");
      } else {
        navigation.navigate("TrainerTabb");
      }
    } else if (userInfo?.role === "trainee") {
      if (!profile_status?.personal_step_1) {
        navigation.navigate("PersonalInfo");
      } else if (!profile_status?.fitness_level_step_2) {
        navigation.navigate("FitnessLevel");
      } else if (!profile_status?.fitness_goal_step_3) {
        navigation.navigate("FitnessGoal");
      } else {
        navigation.navigate("TraineeTabb");
      }
    }
  };

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
                uri: "https://i.gifer.com/ZZ5H.gif",
                headers: { Authorization: "someAuthToken" },
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
