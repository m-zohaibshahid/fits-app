import React, { useState, useEffect } from "react";
import { Text, View, Pressable, TextInput, ScrollView } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFValue } from "react-native-responsive-fontsize";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import Header from "../../../Components/Header";
import Colors from "../../../constants/Colors";
import Button from "../../../Components/Button";
import { url } from "../../../constants/url";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./styles";
import { Toast } from "react-native-toast-message/lib/src/Toast";

const Professioninfo = ({ navigation }) => {
  // Hooks
  const [qualification, setQualification] = useState([
    {
      id: 1,
      degree: "",
      degree_note: "",
    },
  ]);
  const [experienceYear, setExperienceYear] = useState("");
  const [experienceNote, setExperienceNote] = useState("");
  const [load, setLoad] = useState(false);
  const [token, setToken] = useState("");

  // Functions
  const goToNextScreen = async () => {
    navigation.navigate("ServicesOffered");
  };

  const getUserInfo = async () => {
    const userData = await AsyncStorage.getItem("userData");
    let userDatax = JSON.parse(userData);
    setToken(userDatax?.access_token);
  };

  const professionallInfo = async () => {
    setLoad(true);
    await fetch(`${url}/profession`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        qualification: qualification,
        experience_year: experienceYear,
        experience_note: experienceNote,
      }),
    })
      .then((res) => res.json())
      .then((res2) => {
        setLoad(false);
        if (res2?.message === "create profession info successfully") {
          Toast.show({
            type: "success",
            text1: "Professional info created successfully",
          });
          goToNextScreen();
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
  };

  const upDegree = (value, index) => {
    let oldQualification = [...qualification];
    oldQualification[index].degree = value;
    setQualification(oldQualification);
  };
  const upDegreeNote = (value, index) => {
    let oldQualification = [...qualification];
    oldQualification[index].degree_note = value;
    setQualification(oldQualification);
  };

  const delQualification = (id) => {
    let oldQualification = [...qualification];
    if (oldQualification.length <= 1) return;
    let newQualification = oldQualification.filter((item) => item.id !== id);
    setQualification(newQualification);
  };
  const addQualification = () => {
    let oldQualification = [...qualification];
    let newQualification = {
      id: qualification.length + 1,
      degree: "",
      degree_note: "",
    };
    oldQualification.push(newQualification);
    setQualification(oldQualification);
  };

  // Effects
  useEffect(() => {
    navigation.addListener("focus", () => {
      getUserInfo();
    });
  }, [getUserInfo]);

  return (
    <View style={styles.mainContainer}>
      <Header label={"Profession Info"} navigation={navigation} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.mainBody}>
          <View style={styles.inputMainView}>
            <View style={styles.inputTitleView}>
              <Text style={styles.inputTitleText}>Experience (years)</Text>
            </View>
            <View style={styles.inputTypeMainView}>
              <View style={styles.inputTypeView}>
                <TextInput
                  style={styles.inputTypeStyle}
                  placeholder="Enter Experience"
                  keyboardType="number-pad"
                  placeholderTextColor={Colors.white}
                  value={experienceYear}
                  onChangeText={setExperienceYear}
                />
              </View>
            </View>
          </View>

          <View style={styles.descriptionInnerViews}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <TextInput
                multiline={true}
                numberOfLines={5}
                maxLength={500}
                placeholder="Any description related to experience...."
                placeholderTextColor={Colors.white}
                value={experienceNote}
                onChangeText={setExperienceNote}
                style={{
                  height: 200,
                  paddingLeft: 10,
                  textAlignVertical: "top",
                  fontFamily: "Poppins-Regular",
                  color: Colors.white,
                }}
              />
            </ScrollView>
          </View>

          {/*Qualification section start*/}

          <View style={styles.qualificationsView}>
            <View style={{ width: "100%", alignItems: "flex-start" }}>
              <Text style={styles.qualificationstext}>
                Qualifications{" "}
                <Text style={styles.uptotext}>(up to 3 degrees)</Text>
              </Text>
            </View>
          </View>

          {qualification.map((item, i) => (
            <View key={i} style={{ marginBottom: 10 }}>
              <View style={styles.textinputMainview}>
                <View style={styles.bgcolorview}>
                  <TextInput
                    placeholder="Degree/certificate "
                    placeholderTextColor={Colors.white}
                    value={item.degree}
                    onChangeText={(text) => upDegree(text, i)}
                    style={{
                      color: Colors.white,
                      height: 50,
                      left: 8,
                      fontFamily: "Poppins-Regular",
                    }}
                  />
                </View>
                <View style={{ width: "4%" }}></View>
                <View style={{ width: "15%", alignItems: "center" }}>
                  <Pressable
                    style={styles.deleteiconview}
                    onPress={() => delQualification(item.id)}
                  >
                    <AntDesign
                      name="delete"
                      style={{
                        fontSize: 20,
                        color: "red",
                      }}
                    />
                  </Pressable>
                </View>
              </View>

              <View
                style={{
                  width: wp("90%"),
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    width: "100%",
                    backgroundColor: Colors.black,
                    borderRadius: 7,
                    marginTop: 10,
                    flexDirection: "column",
                    height: 113,
                  }}
                >
                  <ScrollView showsVerticalScrollIndicator={false}>
                    <TextInput
                      multiline={true}
                      numberOfLines={5}
                      maxLength={500}
                      paddingLeft={10}
                      placeholder="Any Description related to degrees....."
                      placeholderTextColor={Colors.white}
                      value={item.degree_note}
                      onChangeText={(text) => upDegreeNote(text, i)}
                      style={{
                        textAlignVertical: "top",
                        fontFamily: "Poppins-Regular",
                        color: Colors.white,
                      }}
                    />
                  </ScrollView>
                </View>
              </View>
            </View>
          ))}
          {/*Qualification section end*/}
        </View>
      </ScrollView>
      <View
        style={{
          paddingVertical: 10,
          backgroundColor: Colors.white,
          width: "100%",
        }}
      >
        <Pressable onPress={addQualification}>
          <View
            style={{
              width: "90%",
              alignSelf: "center",
              alignItems: "center",
              marginBottom: 5,
            }}
          >
            <View
              style={{
                width: "100%",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <View style={{ width: "10%", alignItems: "flex-start" }}>
                <Ionicons
                  name="add-circle-outline"
                  style={{
                    fontSize: 30,
                    color: Colors.black,
                  }}
                />
              </View>
              <View style={{ width: "80%" }}>
                <Text
                  style={{
                    color: Colors.black,
                    fontSize: RFValue(14, 580),
                    fontFamily: "Poppins-Regular",
                    lineHeight: 25,
                  }}
                >
                  Add qualifications
                </Text>
              </View>
            </View>
          </View>
        </Pressable>
        <Button
          navigation={navigation}
          loader={load}
          label={"NEXT"}
          disabled={
            !experienceYear ||
            !experienceNote ||
            !qualification[0].degree ||
            !qualification[0].degree_note
          }
          onPress={() => {
            if (!load) {
              professionallInfo();
            }
          }}
        />
      </View>
    </View>
  );
};

export default Professioninfo;
