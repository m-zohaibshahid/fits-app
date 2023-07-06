import React, { useState, useEffect } from "react";
import { Text, View, Pressable, StyleSheet, TextInput, ScrollView, ToastAndroid, ActivityIndicator, Platform } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { RFValue } from "react-native-responsive-fontsize";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import Header from "../../Components/Header";
import Colors from "../../constants/Colors";
import Button from "../../Components/Button";
import { url } from "../../constants/url";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationSwitchProp } from "react-navigation";
interface Props {
  navigation: NavigationSwitchProp;
}
const UpdateProfessioninfo: React.FC<Props> = ({ navigation }) => {
  const route = useRoute();

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

  const GoBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    navigation.addListener("focus", () => {
      getUserInfo();
    });
  }, []);

  const getUserInfo = async () => {
    const userData = await AsyncStorage.getItem("userData");
    let userDatax = JSON.parse(userData);
    setToken(userDatax?.access_token);
  };

  const UpdateProfessionallInfo = async () => {
    if (experienceYear === "") {
      ToastAndroid.show("Please Enter your Experience year.", ToastAndroid.SHORT);
      return;
    }
    if (experienceNote === "") {
      ToastAndroid.show("Please Enter your experienceNote.", ToastAndroid.SHORT);
      return;
    }
    if (qualification.degree === "") {
      ToastAndroid.show("Please Enter Degree.", ToastAndroid.SHORT);
      return;
    }
    if (qualification.degree_note === "") {
      ToastAndroid.show("Please Enter Degree note.", ToastAndroid.SHORT);
      return;
    } else {
      setLoad(true);

      await fetch(`${url}/profession/${route.params.Id}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${route.params.token}`,
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
          if (res2.success === true) {
            GoBack();
          } else {
            ToastAndroid.show(res2.message, ToastAndroid.LONG);
          }
        })
        .catch((error) => {
          setLoad(false);
          Alert.alert("Something Went Wrong");
          console.log(error);
        });
    }
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

  return (
    <View style={styles.container}>
      {/*Header rect start*/}
      <View style={styles.header}>
        <View style={styles.fixeheight}>
          <Header navigation={navigation} onPress={GoBack} />
        </View>
        <View style={styles.fixeheight1}>
          <View style={styles.topView}>
            <Text style={styles.Professioninfotext}>Professional Info</Text>
          </View>
        </View>
      </View>
      {/*Header rect end*/}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.main}>
          <View style={styles.TopView}>
            <View style={styles.inputtopviews}>
              <View style={styles.inputnameView}>
                <Text style={styles.inputnameText}> Experience (years)</Text>
              </View>
              <View style={styles.textinputView}>
                <View style={styles.textinputView1}>
                  <TextInput style={styles.inputEmail} placeholder="Enter Experience" keyboardType="number-pad" value={experienceYear} onChangeText={setExperienceYear} />
                </View>
              </View>
            </View>
          </View>
          <View style={styles.descriptionTopview}>
            <View style={styles.descriptiontopviews}>
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
                    paddingLeft: 8,
                    left: 5,
                    textAlignVertical: "top",
                    fontFamily: "Poppins-Regular",
                    color: Colors.white,
                  }}
                />
              </ScrollView>
            </View>
          </View>
          {/*Qualification section start*/}
          <View style={styles.qualificationsView}>
            <View style={{ width: "90%", flexDirection: "row" }}>
              <View style={{ width: "100%", alignItems: "flex-start" }}>
                <Text style={styles.qualificationstext}>
                  Qualifications <Text style={styles.uptotext}>(up to 3 degrees)</Text>
                </Text>
              </View>
            </View>
          </View>
          {qualification.map((item, i) => (
            <View key={i} style={{ marginBottom: 10 }}>
              <View style={{ width: "90%" }}>
                <View style={styles.textinputtopview}>
                  <View style={styles.bgcolorview}>
                    <TextInput
                      // multiline={true}
                      // numberOfLines={5}
                      // maxLength={500}
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
                  <View style={{ width: "15%" }}>
                    <Pressable style={styles.deleteiconview} onPress={() => delQualification(item.id)}>
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
              </View>
              <View
                style={{
                  width: wp("90%"),
                  alignItems: "center",
                  marginTop: 10,
                }}
              >
                <View
                  style={{
                    width: "100%",
                    backgroundColor: Colors.black,
                    borderRadius: 7,
                    flexDirection: "column",
                    height: 113,
                  }}
                >
                  <ScrollView showsVerticalScrollIndicator={false}>
                    <TextInput
                      multiline={true}
                      numberOfLines={5}
                      maxLength={500}
                      paddingLeft={5}
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
          <Pressable onPress={addQualification}>
            <View style={{ width: "100%", alignItems: "center", marginTop: 15 }}>
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
          <View style={{ paddingVertical: 10, width: "100%" }}>
            <Button
              navigation={navigation}
              label={load === true ? <ActivityIndicator size="small" color="#fff" /> : "NEXT"}
              onPress={() => {
                if (load === true) {
                } else {
                  UpdateProfessionallInfo();
                }
              }}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: Colors.white,
    paddingTop: Platform.OS === "ios" ? 40 : 0,
    paddingBottom: Platform.OS === "ios" ? 0 : 0,
  },
  header: {
    width: "100%",
    height: 150,
  },
  fixeheight: {
    height: 50,
    justifyContent: "center",
    borderColor: "lightgrey",
    borderBottomWidth: 0.5,
    width: "100%",
    alignItems: "center",
  },
  fixeheight1: {
    width: "100%",
    alignItems: "center",
  },
  main: {
    width: "100%",
    alignItems: "center",
  },
  inputEmail: {
    borderRadius: 10,
    width: "100%",
    height: 40,
    left: 8,
    fontSize: RFValue(10, 580),
    fontFamily: "Poppins-Regular",
    color: Colors.white,
  },

  btn: {
    padding: 10,
    margin: 10,
    width: "90%",
    borderRadius: 10,
    color: Colors.infos,
    backgroundColor: Colors.bgRedBtn,
    alignItems: "center",
    justifyContent: "center",
  },
  TopView: {
    width: "100%",
    alignItems: "center",
  },
  topView: { width: "90%" },
  topView1: { width: "90%", alignItems: "center" },
  backiconstyles: {
    fontSize: 27,
    color: Colors.black,
    marginTop: 20,
  },
  Professioninfotext: {
    color: Colors.black,
    fontSize: RFValue(22, 580),
    fontFamily: "Poppins-Bold",
    marginTop: 10,
  },
  inputTopView: {
    width: "100%",
    alignItems: "center",
    marginTop: 30,
  },
  inputtopviews: {
    width: "91%",
    height: 60,
    borderWidth: 1,
    backgroundColor: Colors.black,
    borderRadius: 12,
  },
  inputnameView: {
    width: "100%",
    marginTop: 3,
    paddingLeft: 10,
    borderRadius: 8,
  },
  inputnameText: {
    color: Colors.white,
    fontSize: RFValue(9, 580),
    fontFamily: "poppins-regular",
  },
  textinputView: {
    width: "100%",
    borderColor: Colors.white,
    flexDirection: "row",
  },
  textinputView1: {
    width: "90%",
    borderColor: Colors.white,
  },
  hideIconView: {
    width: "10%",
    alignItems: "center",
    justifyContent: "center",
  },
  descriptionTopview: {
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
  descriptiontopviews: {
    width: "90%",
    backgroundColor: Colors.black,
    borderRadius: 8,
    flexDirection: "column",
    height: 130,
  },
  qualificationsView: {
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
    marginTop: 25,
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
  textinputtopview: {
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
export default UpdateProfessioninfo;
