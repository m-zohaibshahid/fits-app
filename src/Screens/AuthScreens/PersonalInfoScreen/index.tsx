import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Pressable,
  TextInput,
  Modal,
  Image,
  ScrollView,
  ToastAndroid,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import ImagePicker from "react-native-image-crop-picker";
import moment from "moment";
import Entypo from "react-native-vector-icons/Entypo";
import DatePicker from "react-native-date-picker";
import * as Images from "../../../constants/Images";
import Header from "../../../Components/Header";
import Colors from "../../../constants/Colors";
import Button from "../../../Components/Button";
import { url } from "../../../constants/url";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CountryPicker from "react-native-country-picker-modal";
import styles from "./styles";
import { Toast } from "react-native-toast-message/lib/src/Toast";

const PersonalInfo = ({ navigation }) => {
  // Hooks
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleDate, setModalVisibleDate] = useState(false);
  const [data, setData] = useState(true);
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [date, setDate] = useState(new Date());
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [gender, setGender] = useState("");
  const [token, setToken] = useState("");
  const [statusOne, setStatusOne] = useState(false);
  const [statusTwo, setStatusTwo] = useState(false);
  const [statusThree, setStatusThree] = useState(false);
  const [image, setImage] = useState("");
  const [cloudImageUrl, setCloudImageUrl] = useState("");
  const [isCountryVisible, setIsCountryVisible] = React.useState(false);
  const [load, setLoad] = useState(false);
  const [loadx, setLoadx] = useState(false);
  const [id, setId] = useState("");

  // Functions
  const onPressFlag = () => {
    return setIsCountryVisible(true);
  };

  const getUserInfo = async () => {
    const userData = await AsyncStorage.getItem("userData");
    let userDatax = JSON.parse(userData);
    setToken(userDatax?.access_token);
    setId(userDatax?.data?._id);
  };

  const TrainerFlow = async () => {
    navigation.navigate("ProfessionalInfo");
  };
  const TraineeFlow = async () => {
    navigation.navigate("FitnessLevel");
  };

  const personalInfoCall = async () => {
    setLoad(true);

    await fetch(`${url}/personal`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: fullName,
        date_of_birth: date,
        country: country,
        phoneNumber: phoneNumber,
        state: state,
        city: city,
        gender: gender,
        profileImage: cloudImageUrl,
      }),
    })
      .then((res) => res.json())
      .then((res2) => {
        setLoad(false);
        if (res2?.message === "personal info create successfully") {
          userMe();
        } else {
          Toast.show({
            type: "error",
            text1: "Something Went Wrong!",
          });
        }
      })
      .catch(() => {
        setLoad(false);
        Toast.show({
          type: "error",
          text1: "Something Went Wrong!",
        });
      });
  };

  const userMe = async () => {
    setLoad(true);

    await fetch(`${url}/user/me/${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((res2) => {
        setLoad(false);
        if (res2.success === true) {
          if (res2.user.role === "trainer") {
            Toast.show({
              type: "success",
              text1: "Personal info created successfully",
            });
            TrainerFlow();
          } else if (res2.user.role === "trainee") {
            Toast.show({
              type: "success",
              text1: "Personal info created successfully",
            });
            TraineeFlow();
          }
        } else {
          Toast.show({
            type: "error",
            text1: "Something Went Wrong",
          });
        }
      })
      .catch(() => {
        setLoad(false);
        Toast.show({
          type: "error",
          text1: "Something Went Wrong",
        });
      });
  };

  const choosePhotoFromCamera = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      compressImageQuality: 0.4,
    })
      .then((file) => {
        if (file) {
          let newFile = {
            uri: file.path,
            type: "image/png",
            name: `image.png`,
          };
          uploadImageOnCloud(newFile);
          setImage(file.path);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const uploadImageOnCloud = async (image) => {
    setLoadx(true);
    const zzz = new FormData();
    zzz.append("file", image);
    zzz.append("upload_preset", "employeeApp");
    zzz.append("cloud_name", "ZACodders");
    await fetch("https://api.cloudinary.com/v1_1/ZACodders/image/upload", {
      method: "POST",
      body: zzz,
    })
      .then((res) => res.json())
      .then((res2) => {
        setLoadx(false);
        setCloudImageUrl(res2?.url);
      })
      .catch((error) => {
        setLoadx(false);
        ToastAndroid.show(error, ToastAndroid.LONG);
      });
  };

  // Effects
  useEffect(() => {
    navigation.addListener("focus", () => {
      getUserInfo();
    });
  }, [getUserInfo]);

  return (
    <View style={styles.mainContainer}>
      <Header
        label={"Peronal Info"}
        subLabel={"Fill in your details "}
        navigation={navigation}
        doubleHeader={true}
        rightLabelStatus={true}
        rightLabel={
          <TouchableOpacity
            onPress={() => {
              choosePhotoFromCamera();
            }}
          >
            {image === "" ? (
              <Image
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 200 / 2,
                  overflow: "hidden",
                  borderWidth: 1,
                  borderColor: "grey",
                }}
                source={Images.Profile}
              />
            ) : (
              <Image
                style={styles.imagestyle}
                source={{
                  uri: image,
                }}
              />
            )}
          </TouchableOpacity>
        }
      />

      {loadx === true ? (
        <ActivityIndicator size="large" color="#000" />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.mainBody}>
            <View style={styles.inputMainView}>
              <View style={styles.inputTitleView}>
                <Text style={styles.inputTitleText}>Full Name</Text>
              </View>
              <View style={styles.inputTypeMainView}>
                <View style={styles.inputTypeView}>
                  <TextInput
                    style={styles.inputTypeStyle}
                    placeholder="Enter Name"
                    placeholderTextColor={Colors.white}
                    value={fullName}
                    onChangeText={setFullName}
                  />
                </View>
              </View>
            </View>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setModalVisibleDate(true)}
              style={styles.inputMainView}
            >
              <View style={styles.inputTitleView}>
                <Text style={styles.inputTitleText}>Date of birth</Text>
              </View>
              <View style={styles.inputTypeMainView}>
                <View style={styles.inputTypeView}>
                  <TextInput
                    style={styles.inputTypeStyle}
                    placeholder="Select Date of Birth"
                    placeholderTextColor={Colors.white}
                    editable={false}
                    value={moment(date).format("DD-MM-YYYY")}
                    onChangeText={setDate}
                  />
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => onPressFlag()}
              style={styles.inputMainView}
            >
              <View style={styles.inputTitleView}>
                <Text style={styles.inputTitleText}>Country</Text>
              </View>
              <View style={styles.inputTypeMainView}>
                <View style={styles.inputTypeView}>
                  <TextInput
                    style={styles.inputTypeStyle}
                    placeholderTextColor={Colors.white}
                    placeholder="Select Your Country"
                    value={country}
                    editable={false}
                    onChangeText={setCountry}
                  />
                </View>
              </View>
            </TouchableOpacity>
            <View style={styles.inputMainView}>
              <View style={styles.inputTitleView}>
                <Text style={styles.inputTitleText}>Phone Number</Text>
              </View>
              <View style={styles.inputTypeMainView}>
                <View style={styles.inputTypeView}>
                  <TextInput
                    style={styles.inputTypeStyle}
                    keyboardType={"numeric"}
                    placeholder="Enter your Number"
                    placeholderTextColor={Colors.white}
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                  />
                </View>
              </View>
            </View>
            <View style={styles.inputMainView}>
              <View style={styles.inputTitleView}>
                <Text style={styles.inputTitleText}>State</Text>
              </View>
              <View style={styles.inputTypeMainView}>
                <View style={styles.inputTypeView}>
                  <TextInput
                    style={styles.inputTypeStyle}
                    placeholder="Enter Your State"
                    placeholderTextColor={Colors.white}
                    value={state}
                    onChangeText={setState}
                  />
                </View>
              </View>
            </View>
            <View style={styles.inputMainView}>
              <View style={styles.inputTitleView}>
                <Text style={styles.inputTitleText}>City</Text>
              </View>
              <View style={styles.inputTypeMainView}>
                <View style={styles.inputTypeView}>
                  <TextInput
                    style={styles.inputTypeStyle}
                    placeholder="Enter Your City"
                    placeholderTextColor={Colors.white}
                    value={city}
                    onChangeText={setCity}
                  />
                </View>
              </View>
            </View>

            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              activeOpacity={0.8}
              style={styles.inputMainView}
            >
              <View style={styles.genderTopview}>
                <View
                  style={{
                    width: "50%",
                    justifyContent: "center",
                  }}
                >
                  <Text style={styles.genderText}>Gender</Text>
                </View>
                <View
                  style={{
                    width: "40%",
                    borderColor: "#fff",
                    alignItems: "flex-end",
                    justifyContent: "center",
                  }}
                >
                  <Text style={styles.inputnameText}>{gender}</Text>
                </View>
                <View style={styles.iconView}>
                  <Entypo
                    name="chevron-down"
                    style={{
                      fontSize: 20,
                      color: Colors.white,
                    }}
                  />
                </View>
              </View>
            </TouchableOpacity>
            <View style={{ width: "100%", marginVertical: "15%" }}></View>
          </View>

          {isCountryVisible && (
            <CountryPicker
              onClose={() => setIsCountryVisible(false)}
              visible={isCountryVisible}
              onSelect={(value) => {
                setCountry(value.name);
              }}
            />
          )}

          {/*Modal Start*/}
          <View style={styles.centeredView}>
            <Modal
              animationType="fade"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(false);
              }}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <ScrollView showsVerticalScrollIndicator={false}>
                    <View
                      style={{
                        width: "100%",
                        alignItems: "flex-start",
                      }}
                    >
                      <View
                        style={{
                          width: "90%",
                          alignSelf: "center",
                          height: 60,
                          justifyContent: "center",
                        }}
                      >
                        <Text style={styles.Gendertexts}>
                          Gender
                          <Text style={styles.genderonetext}>(Select one)</Text>
                        </Text>
                      </View>

                      <View style={styles.opercard}>
                        <Pressable
                          style={styles.box}
                          onPress={() => {
                            setGender("Male");
                            setModalVisible(false);
                            setStatusOne(true);
                            setStatusTwo(false);
                            setStatusThree(false);
                          }}
                        >
                          <View
                            style={[
                              statusOne ? styles.BoxViewBoder : styles.inner,
                            ]}
                          >
                            <Image source={Images.Vector} />
                            <Text style={styles.maletext}>Male</Text>
                          </View>
                        </Pressable>

                        <Pressable
                          style={styles.box1}
                          onPress={() => {
                            setGender("Female");
                            setModalVisible(false);
                            setStatusOne(false);
                            setStatusTwo(true);
                            setStatusThree(false);
                          }}
                        >
                          <View
                            style={[
                              statusTwo ? styles.BoxViewBoder : styles.inner,
                            ]}
                          >
                            <Image source={Images.Vector2} />
                            <Text style={styles.maletext}>Female</Text>
                          </View>
                        </Pressable>
                      </View>
                      <View
                        style={{
                          width: "100%",
                          height: "30%",
                          marginTop: 8,
                        }}
                      >
                        <Pressable
                          style={styles.otherView}
                          onPress={() => {
                            setGender("Other");
                            setModalVisible(false);
                            setStatusOne(false);
                            setStatusTwo(false);
                            setStatusThree(true);
                          }}
                        >
                          <View
                            style={[
                              statusThree
                                ? styles.oternameviewBorder
                                : styles.oternameview,
                            ]}
                          >
                            <Text style={styles.otherText}>Other</Text>
                          </View>
                        </Pressable>
                      </View>
                    </View>
                  </ScrollView>
                </View>
              </View>
            </Modal>
          </View>
          {/* Modal End*/}

          {/*modalVisibleDate Start*/}
          <View style={styles.centeredView}>
            <Modal
              animationType="fade"
              transparent={true}
              visible={modalVisibleDate}
              onRequestClose={() => {
                setModalVisibleDate(false);
              }}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalViewdate}>
                  <ScrollView showsVerticalScrollIndicator={false}>
                    <View
                      style={{
                        width: "100%",
                        alignItems: "flex-start",
                      }}
                    >
                      <View style={styles.cancelView}>
                        <Pressable
                          onPress={() => setModalVisibleDate(false)}
                          style={styles.canceldoneView}
                        >
                          <Text style={styles.TextCancelDone}>Cancel</Text>
                        </Pressable>
                        <View style={styles.DOBView}>
                          <Text style={styles.TextDOB}>Date of Birth</Text>
                        </View>
                        <Pressable
                          onPress={() => {
                            setModalVisibleDate(false);
                            setData(false);
                          }}
                          style={styles.canceldoneView}
                        >
                          <Text style={styles.TextCancelDone}>Done</Text>
                        </Pressable>
                      </View>

                      <View style={styles.topView}>
                        <DatePicker
                          mode="date"
                          textColor="#000"
                          date={date}
                          style={styles.DatePicker}
                          onDateChange={setDate}
                        />
                      </View>
                    </View>
                  </ScrollView>
                </View>
              </View>
            </Modal>
          </View>
          {/* modalVisibleDate End*/}
        </ScrollView>
      )}
      <View
        style={{
          paddingVertical: 10,
          marginBottom: 0,
          bottom: 0,
          width: "100%",
          backgroundColor: Colors.white,
          position: "absolute",
          alignItems: "center",
        }}
      >
        <Button
          navigation={navigation}
          loader={load}
          label={"NEXT"}
          disabled={
            !fullName || !country || !state || !city || !gender || !phoneNumber
          }
          onPress={() => {
            if (!load) {
              personalInfoCall();
            }
          }}
        />
      </View>
    </View>
  );
};

export default PersonalInfo;
