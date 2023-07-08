import React, { useState, useEffect } from "react";
import { Text, View, Pressable, TextInput, ScrollView, Platform, StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { RFValue } from "react-native-responsive-fontsize";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import Header from "../../../Components/Header";
import Colors from "../../../constants/Colors";
import Button from "../../../Components/Button";
import { NavigationSwitchProp } from "react-navigation";
import { useTrainerProfessionalInfoCreateMutation } from "../../../slice/FitsApi.slice";
import { errorToast } from "../../../utils/toast";
import Container from "../../../Components/Container";

interface PropsInterface {
  navigation: NavigationSwitchProp
}
const Professioninfo = ({ navigation }: PropsInterface) => {
  const [qualification, setQualification] = useState([
    {
      id: 1,
      degree: "",
      degree_note: "",
    },
  ]);
  const [experienceYear, setExperienceYear] = useState("");
  const [experienceNote, setExperienceNote] = useState("");
  const [mutateAsyncPersonalInfoUpdate, { isLoading }] = useTrainerProfessionalInfoCreateMutation()

  // Functions
  const goToNextScreen = async () => {
    navigation.navigate("CheckUser");
  };

  const handleUpdateProfessionallInfo = async () => {

    const body = {
      qualification: qualification,
      experience_year: experienceYear,
      experience_note: experienceNote,
    }

    const result = await mutateAsyncPersonalInfoUpdate(body)
    
    if (result?.data) goToNextScreen()
    if (result?.error) errorToast(result.error?.error?.message)

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
  return (
    <Container >
      <Header label={"Profession Info"} />
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
          loader={isLoading}
          label={"NEXT"}
          disabled={
            !experienceYear ||
            !experienceNote ||
            !qualification[0].degree ||
            !qualification[0].degree_note
          }
          onPress={handleUpdateProfessionallInfo}
        />
      </View>
    </Container>
  );
};

export default Professioninfo;


const styles = StyleSheet.create({
  mainBody: {
    width: "100%",
    alignItems: "center",
  },
  inputMainView: {
    width: "100%",
    backgroundColor: Colors.black,
    borderRadius: 8,
    marginTop: "3%",
    marginBottom: "3%",
    justifyContent: "center",
    alignSelf: "center",
    height: Platform.OS === "ios" ? 60 : 60,
  },
  inputTitleView: {
    width: "95%",
    alignSelf: "center",
    height: 20,
    justifyContent: "center",
  },
  inputTitleText: {
    color: Colors.white,
    fontSize: Platform.OS === "ios" ? RFValue(8, 580) : RFValue(10, 580),
    fontFamily: "poppins-regular",
  },
  inputTypeMainView: {
    width: "95%",
    alignSelf: "center",
    borderColor: Colors.white,
    flexDirection: "row",
    height: 40,
  },
  inputTypeView: {
    width: "90%",
    height: 40,
    justifyContent: "center",
  },
  inputTypeStyle: {
    width: "100%",
    height: 40,
    fontSize: RFValue(10, 580),
    fontFamily: "Poppins-Regular",
    color: "#fff",
  },
  descriptionInnerViews: {
    width: "100%",
    marginTop: 5,
    backgroundColor: Colors.black,
    borderRadius: 8,
    flexDirection: "column",
    alignSelf: "center",
    height: 130,
  },

  qualificationsView: {
    width: "100%",
    alignSelf: "center",
    flexDirection: "row",
    marginBottom: 10,
    marginTop: 20,
  },
  qualificationstext: {
    color: Colors.black,
    fontSize: RFValue(18, 580),
    fontFamily: "Poppins-Bold",
    left: 2,
  },
  uptotext: {
    fontSize: RFValue(9, 580),
    fontFamily: "Poppins-Regular",
    marginTop: 10,
  },
  textinputMainview: {
    width: "100%",
    flexDirection: "row",
  },
  bgcolorview: {
    width: "81%",
    backgroundColor: Colors.black,
    borderRadius: 8,
  },
  deleteiconview: {
    width: 50,
    height: 50,
    backgroundColor: Colors.gray,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
});