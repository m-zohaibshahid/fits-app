import React, { useState } from "react";
import { Text, View, Pressable, TextInput, Modal, Image, ScrollView, ToastAndroid, ActivityIndicator, TouchableOpacity } from "react-native";
import ImagePicker from "react-native-image-crop-picker";
import moment from "moment";
import Entypo from "react-native-vector-icons/Entypo";
import DatePicker from "react-native-date-picker";
import * as Images from "../../../constants/Images";
import Header from "../../../Components/Header";
import Colors from "../../../constants/Colors";
import Button from "../../../Components/Button";
import { url } from "../../../constants/url";
import CountryPicker from "react-native-country-picker-modal";
import styles from "./styles";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { useSelector } from "react-redux";
import { useGetUserMeQuery, usePersonalInfoMutation } from "../../../slice/FitsApi.slice";
import { UserDetail } from "../../../interfaces";
import { NavigationSwitchProp } from "react-navigation";
interface Props {
  navigation: NavigationSwitchProp;
}

const PersonalInfo: React.FC<Props> = ({ navigation }) => {
  // Hooks
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleDate, setModalVisibleDate] = useState(false);
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [date, setDate] = useState(new Date());
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [gender, setGender] = useState("");
  const [statusOne, setStatusOne] = useState(false);
  const [statusTwo, setStatusTwo] = useState(false);
  const [statusThree, setStatusThree] = useState(false);
  const [image, setImage] = useState("");
  const [cloudImageUrl, setCloudImageUrl] = useState("");
  const [isCountryVisible, setIsCountryVisible] = React.useState(false);
  const [loadx, setLoadx] = useState(false);

  const token: string = useSelector((state: { token: string }) => state.token);
  const { userInfo } = useSelector((state: { fitsStore: Partial<UserDetail> }) => state.fitsStore);
  const { data: userMeData, isLoading: load } = useGetUserMeQuery({ id: userInfo?._id });
  const [personalInfo, { data: userPersonalInfo, isLoading: load1 }] = usePersonalInfoMutation();
  // Functions
  const onPressFlag = () => {
    return setIsCountryVisible(true);
  };

  const TrainerFlow = async () => {
    navigation.navigate("ProfessionalInfo");
  };
  const TraineeFlow = async () => {
    navigation.navigate("FitnessLevel");
  };

  const personalInfoCall = async () => {
    // await fetch(`${url}/personal`, {
    //   method: "POST",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${token}`,
    //   },
    //   body: JSON.stringify({
    //     name: fullName,
    //     date_of_birth: date,
    //     country: country,
    //     phoneNumber: phoneNumber,
    //     state: state,
    //     city: city,
    //     gender: gender,
    //     profileImage: cloudImageUrl ?? "https://cvbay.com/wp-content/uploads/2017/03/dummy-image.jpg",
    //   }),
    // })
    await personalInfo({
      name: fullName,
      date_of_birth: date,
      country: country,
      phoneNumber: phoneNumber,
      state: state,
      city: city,
      gender: gender,
      profileImage: cloudImageUrl ?? "https://cvbay.com/wp-content/uploads/2017/03/dummy-image.jpg",
    })
      .then((res2) => {
        if (res2?.data?.message === "personal info create successfully") {
          userMe();
        } else {
          Toast.show({
            type: "error",
            text1: "Something Went Wrong!",
          });
        }
      })
      .catch((e) => {
        console.log("e", e);
        Toast.show({
          type: "error",
          text1: "Something Went Wrong!",
        });
      });
  };

  const userMe = async () => {
    if (userMeData.success === true) {
      if (userMeData.user.role === "trainer") {
        Toast.show({
          type: "success",
          text1: "Personal info created successfully",
        });
        TrainerFlow();
      } else if (userMeData.user.role === "trainee") {
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

  const uploadImageOnCloud = async (image: { uri: string; type: string; name: string }) => {
    setLoadx(true);
    const imageUploadOnCloud = new FormData();
    imageUploadOnCloud.append("file", image);
    imageUploadOnCloud.append("upload_preset", "employeeApp");
    imageUploadOnCloud.append("cloud_name", "ZACodders");
    await fetch("https://api.cloudinary.com/v1_1/ZACodders/image/upload", {
      method: "POST",
      body: imageUploadOnCloud,
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
            {!image ? (
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

      {loadx ? (
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
                  <TextInput style={styles.inputTypeStyle} placeholder="Enter Name" placeholderTextColor={Colors.white} value={fullName} onChangeText={setFullName} />
                </View>
              </View>
            </View>
            <TouchableOpacity activeOpacity={0.8} onPress={() => setModalVisibleDate(true)} style={styles.inputMainView}>
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
            <TouchableOpacity activeOpacity={0.8} onPress={() => onPressFlag()} style={styles.inputMainView}>
              <View style={styles.inputTitleView}>
                <Text style={styles.inputTitleText}>Country</Text>
              </View>
              <View style={styles.inputTypeMainView}>
                <View style={styles.inputTypeView}>
                  <TextInput style={styles.inputTypeStyle} placeholderTextColor={Colors.white} placeholder="Select Your Country" value={country} editable={false} onChangeText={setCountry} />
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
                  <TextInput style={styles.inputTypeStyle} placeholder="Enter Your State" placeholderTextColor={Colors.white} value={state} onChangeText={setState} />
                </View>
              </View>
            </View>
            <View style={styles.inputMainView}>
              <View style={styles.inputTitleView}>
                <Text style={styles.inputTitleText}>City</Text>
              </View>
              <View style={styles.inputTypeMainView}>
                <View style={styles.inputTypeView}>
                  <TextInput style={styles.inputTypeStyle} placeholder="Enter Your City" placeholderTextColor={Colors.white} value={city} onChangeText={setCity} />
                </View>
              </View>
            </View>

            <TouchableOpacity onPress={() => setModalVisible(true)} activeOpacity={0.8} style={styles.inputMainView}>
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
                          <View style={[statusOne ? styles.BoxViewBoder : styles.inner]}>
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
                          <View style={[statusTwo ? styles.BoxViewBoder : styles.inner]}>
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
                          <View style={[statusThree ? styles.oternameviewBorder : styles.oternameview]}>
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
                        <Pressable onPress={() => setModalVisibleDate(false)} style={styles.canceldoneView}>
                          <Text style={styles.TextCancelDone}>Cancel</Text>
                        </Pressable>
                        <View style={styles.DOBView}>
                          <Text style={styles.TextDOB}>Date of Birth</Text>
                        </View>
                        <Pressable
                          onPress={() => {
                            setModalVisibleDate(false);
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
                          date={date ? new Date(date) : new Date()}
                          maximumDate={new Date(new Date().getFullYear() - 15, new Date().getMonth(), new Date().getDate())} // Set the maximum date to 18 years ago
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
          loader={load}
          label={"NEXT"}
          disabled={!fullName || !country || !state || !city || !gender || !phoneNumber}
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
