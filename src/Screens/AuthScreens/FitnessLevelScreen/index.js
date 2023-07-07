import React, { useState, useEffect } from "react";
import { Text, View, Pressable, ScrollView, ToastAndroid } from "react-native";
import Button from "../../../Components/Button";
import Header from "../../../Components/Header";
import { url } from "../../../constants/url";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./styles";
import { Toast } from "react-native-toast-message/lib/src/Toast";

const FitnessLevelScreen = ({ navigation }) => {
  // Hooks
  const [value, setValue] = useState("");
  const [key, setKey] = useState("");
  const [statusOne, setStatusOne] = useState(false);
  const [statusTwo, setStatusTwo] = useState(false);
  const [statusThree, setStatusThree] = useState(false);
  const [statusFour, setStatusFour] = useState(false);
  const [load, setLoad] = useState(false);

  // Functions
  const selectLevelFirst = () => {
    setStatusOne(true);
    setValue("1");
    setKey("level_1");
    setStatusTwo(false);
    setStatusThree(false);
    setStatusFour(false);
  };

  const selectLevelSecond = () => {
    setStatusOne(false);
    setStatusTwo(true);
    setValue("2");
    setKey("level_2");
    setStatusThree(false);
    setStatusFour(false);
  };

  const selectLevelThird = () => {
    setStatusOne(false);
    setStatusTwo(false);
    setStatusThree(true);
    setValue("3");
    setKey("level_3");
    setStatusFour(false);
  };

  const selectLevelFourth = () => {
    setStatusOne(false);
    setStatusTwo(false);
    setStatusThree(false);
    setStatusFour(true);
    setValue("4");
    setKey("level_4");
  };

  const gotToNextScreen = async () => {
    navigation.navigate("FitnessGoal");
  };

  const calFitnessLevel = async () => {
    const userData = await AsyncStorage.getItem("userData");
    let userDatax = JSON.parse(userData);
    if (value === "") {
      Toast.show({
        type: "error",
        text1: "Please Select Your Fitness Level",
      });
    } else {
      const fitness_level_profile = { value: value, key: key };

      setLoad(true);
      await fetch(`${url}/user/fitness/choose/${userDatax?.data?._id}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${userDatax?.access_token}`,
        },
        body: JSON.stringify({
          fitness_level: fitness_level_profile,
        }),
      })
        .then((res) => res.json())
        .then((res2) => {
          setLoad(false);
          if (res2.message === "your fitness info updated successfully") {
            Toast.show({
              type: "success",
              text1: "Your fitness info updated successfully",
            });
            gotToNextScreen();
          } else {
            Toast.show({
              type: "error",
              text1: "Something went wrong!",
            });
          }
        })
        .catch(() => {
          setLoad(false);
          Toast.show({
            type: "error",
            text1: "Something went wrong!",
          });
        });
    }
  };
  // Effects

  return (
    <View style={styles.mainContainer}>
      <Header label={"Fitness Level"} navigation={navigation} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.mainBody}>
          <View style={styles.mainFirstRectForRow}>
            <View style={styles.firstCol}>
              <Pressable
                onPress={() => {
                  selectLevelFirst();
                }}
                style={[statusOne ? styles.innerBorderBox : styles.innerBox]}
              >
                <Text style={styles.titleText}>(Level-1){"\n"}Beginner</Text>
              </Pressable>
            </View>
            <View style={styles.secondCol}>
              <Pressable
                onPress={() => {
                  selectLevelSecond();
                }}
                style={[statusTwo ? styles.innerBorderBox : styles.innerBox]}
              >
                <Text style={styles.titleText}>
                  (Level-2){"\n"}Intermediate
                </Text>
              </Pressable>
            </View>
          </View>

          <View style={{ width: "90%", flexDirection: "row", marginTop: 20 }}>
            <View style={styles.firstCol}>
              <Pressable
                onPress={() => {
                  selectLevelThird();
                }}
                style={[statusThree ? styles.innerBorderBox : styles.innerBox]}
              >
                <Text style={styles.titleText}>(Level-3){"\n"}Advanced</Text>
              </Pressable>
            </View>
            <View style={styles.secondCol}>
              <Pressable
                onPress={() => {
                  selectLevelFourth();
                }}
                style={[statusFour ? styles.innerBorderBox : styles.innerBox]}
              >
                <Text style={styles.titleText}>(Level-4){"\n"}Elite</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          position: "absolute",
          marginBottom: 0,
          height: "12%",
          bottom: 0,
          width: "100%",
        }}
      >
        <Button
          navigation={navigation}
          loader={load}
          label={"Done"}
          disabled={!value || !key}
          onPress={() => {
            calFitnessLevel();
          }}
        />
      </View>
    </View>
  );
};
export default FitnessLevelScreen;
