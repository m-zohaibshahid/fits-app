import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Pressable,
  Modal,
  Image,
  ScrollView,
  ToastAndroid,
  TouchableOpacity,
  Alert,
  Platform,
  StyleSheet,
  ImageSourcePropType,
} from "react-native";
import FastImage from "react-native-fast-image";
import CountryPicker from "react-native-country-picker-modal";
import ImagePicker from "react-native-image-crop-picker";
import moment from "moment";
import { RFValue } from "react-native-responsive-fontsize";
import Entypo from "react-native-vector-icons/Entypo";
import RNRestart from 'react-native-restart';
import DatePicker from "react-native-date-picker";
import * as Images from "../../constants/Images";
import Header from "../../Components/Header";
import Colors from "../../constants/Colors";
import Button from "../../Components/Button";
import { url } from "../../constants/url";
import { useNavigation } from "@react-navigation/native";
import * as Yup from "yup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useGetUserMeQuery } from "../../slice/FitsApi.slice";
import { genderOptions } from "../../constants/utilities";
import { useSelector } from "react-redux";
import Container from "../../Components/Container";
import Typography from "../../Components/typography/text";
import TextInput from "../../Components/Input";
import { PersonalInfoValidateErrorsIntarface } from "./types";
import { handleConfirmAlert } from "../../utils/handle-confirm";

export const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  date_of_birth: Yup.date().required("Date of birth is required"),
  country: Yup.string().required("Country is required"),
  phoneNumber: Yup.string().required("Phone number is required"),
  state: Yup.string().required("State is required"),
  city: Yup.string().required("City is required"),
  gender: Yup.string().required("Gender is required"),
  profileImage: Yup.string(),
  confirmPassword: Yup.string().oneOf([Yup.ref("password")], "Passwords must match"),
});

const AccountUpdate = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleDate, setModalVisibleDate] = useState(false);
  const [fullName, setFullName] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [gender, setGender] = useState<any>("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [date, setDate] = useState(new Date());
  const [image, setImage] = useState("");
  const [cloudImageUrl, setCloudImageUrl] = useState("");
  const [validationErrors, setValidationErrors] = useState<PersonalInfoValidateErrorsIntarface>({});
  const [isCountryVisible, setIsCountryVisible] = React.useState(false);
  const [load, setLoad] = useState(false);
  const [loadx, setLoadx] = useState(false);
  const [userId, setUserId] = useState("");
  const { data: userMeData, refetch, isLoading } = useGetUserMeQuery({});
  const token = useSelector((state: { token: string }) => state.token);
  useEffect(() => {
    navigation.addListener("focus", () => {
      userMe();
    });
  }, []);

  const onPressFlag = () => {
    setIsCountryVisible(true);
  };

  const GoBack = () => {
    navigation.goBack();
  };
  const userApiCalling = async (data: any) => {
    await AsyncStorage.setItem("userPersonalInfo", JSON.stringify(data));
    userMe();
  };

  const accountUpdate = async () => {
    setLoad(true);
    await fetch(`${url}/personal/${userId}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: fullName,
        date_of_birth: date,
        country: country,
        state: state,
        city: city,
        phoneNumber: phoneNumber,
        gender: gender,
        profileImage: cloudImageUrl,
      }),
    })
      .then((res) => res.json())
      .then((res2) => {
        refetch();
          setLoad(false);
          if (res2.success) {
            userApiCalling(res2.data);
            handleConfirmAlert('You must refresh your app', () => RNRestart.restart())
          } else {
            ToastAndroid.show(res2.message, ToastAndroid.LONG);
          }
      })
      .catch(() => {
        setLoad(false);
        Alert.alert("Something Went Wrong");
      });
  };
  // choose Photo From Camera
  const choosePhotoFromCamera = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      compressImageQuality: 0.4,
    })
      .then((file) => {
        let newFile = {
          uri: file.path,
          type: "image/png",
          name: `image.png`,
        };
        uploadImageOnCloud(newFile);
        setImage(file.path);
      })
      .catch((err) => {
        Alert.alert(err.message);
      });
  };

  const uploadImageOnCloud = async (image: { uri: string; type: string; name: string } | undefined) => {
    setLoadx(true);
    const cloudImage = new FormData();
    cloudImage.append("file", image);
    cloudImage.append("upload_preset", "employeeApp");
    cloudImage.append("cloud_name", "ZACodders");

    await fetch("https://api.cloudinary.com/v1_1/ZACodders/image/upload", {
      method: "POST",
      body: cloudImage,
    })
      .then((res) => res.json())
      .then((res2) => {
        setLoadx(false);
        setCloudImageUrl(res2?.url);
      })
      .catch((err) => {
        setLoadx(false);
        Alert.alert(err.message);
      });
  };
  // Assuming date is in the format "YYYY-MM-DD" e.g., "2023-07-06"
  const validDate = moment(date, "YYYY-MM-DD");

  const handleOptionPress = (
    genderSelect:
      | number
      | boolean
      | React.SetStateAction<string>
      | React.ReactElement<any, string | React.JSXElementConstructor<any>>
      | Iterable<React.ReactNode>
      | null
      | undefined
  ) => {
    setGender(genderSelect);
    setModalVisible(false);
  };

  const renderOption = (
    option: {
      value: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined;
      image: ImageSourcePropType;
    },
    index: React.Key | null | undefined
  ) => {
    const isActive = gender === option.value;
    return (
      <>
        {option.value !== "Other" ? (
          <Pressable key={index} style={isActive ? styles.BoxViewBoder : styles.inner} onPress={() => handleOptionPress(option.value)}>
            <View style={isActive ? styles.oternameview : styles.inner}>
              {option.image && <Image source={option.image} />}
              <Text style={styles.maletext}>{option.value}</Text>
            </View>
          </Pressable>
        ) : (
          <Pressable
            style={styles.otherView}
            onPress={() => {
              handleOptionPress(option.value);
            }}
          >
            <View style={[isActive ? styles.oternameviewBorder : styles.oternameview]}>
              <Text style={styles.otherText}>Other</Text>
            </View>
          </Pressable>
        )}
      </>
    );
  };

  // user Me api
  const userMe = async () => {
    const personalInfo = userMeData?.personal_info;
    if (userMeData?.success) {
      setFullName(personalInfo?.name);
      setCountry(personalInfo?.country);
      setState(personalInfo?.state);
      setCity(personalInfo?.city);
      setGender(personalInfo?.gender);
      setUserId(personalInfo?._id);
      setPhoneNumber(personalInfo?.phoneNumber);
      setDate(personalInfo?.date_of_birth);
      setImage(personalInfo?.profileImage);
      setCloudImageUrl(personalInfo?.profileImage);
    } else {
      Alert.alert(userMeData?.message ?? "user Information not available");
    }
  };
  return (
    <Container style={styles.container}>
      <View style={{ position: "relative" }}>
        <Header label={"Peronal Info"} subLabel={"Fill in your details "} />
        <TouchableOpacity style={{ position: "absolute", top: 70, right: 10 }} onPress={choosePhotoFromCamera}>
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
      </View>
      {/*Header rect end*/}
      {loadx ? (
        <View style={{ width: "100%", marginTop: 200, alignItems: "center" }}>
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
      ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
             <ScrollView showsVerticalScrollIndicator={false}>
        <TextInput error={validationErrors.name} placeholder="Enter Name" label="Full Name" value={fullName} onChangeText={setFullName} />
        <TextInput
          error={validationErrors.date_of_birth}
          handleOnPress={() => setModalVisibleDate(true)}
          placeholder="Select Date of Birth"
          isEditable={false}
          value={moment(date).format("DD-MM-YYYY")}
          label={"Date of birth"}
        />
        <TextInput error={validationErrors.country} label="Country" placeholder="Select Your Country" value={country} isEditable={false} handleOnPress={onPressFlag} onChangeText={setCountry} />
        <TextInput label="Phone Number" error={validationErrors.phoneNumber} keyboard={"numeric"} placeholder="Enter your Number" value={phoneNumber} onChangeText={setPhoneNumber} />
        <TextInput error={validationErrors.state} placeholder="Enter Your State" value={state} onChangeText={setState} label={"State"} />
        <TextInput error={validationErrors.city} placeholder="Enter Your City" value={city} onChangeText={setCity} label={"City"} />
        <TextInput value={gender} label={"Select Gender"} isEditable={false} handleOnPress={() => setModalVisible(true)}  />
              
      </ScrollView>
            {isCountryVisible && <CountryPicker onClose={() => setIsCountryVisible(false)} visible={isCountryVisible} onSelect={(value) => setCountry(value.name)} countryCode={"AF"} />}
            
      <View style={styles.centeredView}>
        <Modal animationType="fade" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
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
                    <Typography size={"heading1"}>
                      Gender
                      <Typography size="medium">{"  "}(Select one)</Typography>
                    </Typography>
                  </View>

                  <View style={styles.opercard}>
                    <Pressable
                      style={styles.box}
                      onPress={() => {
                        setGender("Male");
                        setModalVisible(false);
                      }}
                    >
                      <View style={[gender === 'Male' ? styles.BoxViewBoder : styles.inner]}>
                        <Image source={Images.Vector} />
                        <Text style={styles.maletext}>Male</Text>
                      </View>
                    </Pressable>

                    <Pressable
                      style={styles.box1}
                      onPress={() => {
                        setGender("Female");
                        setModalVisible(false);
                      }}
                    >
                      <View style={[gender === 'Female' ? styles.BoxViewBoder : styles.inner]}>
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
                      }}
                    >
                      <View style={[gender === 'Other' ? styles.oternameviewBorder : styles.oternameview]}>
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
        </ScrollView>
      )}
      <Button style={{marginVertical: 10}} label={"Next"} loader={load} onPress={accountUpdate} />
    </Container>
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
    borderBottomWidth: 0.5,
    justifyContent: "center",
    borderColor: "lightgrey",
    width: "100%",
    alignItems: "center",
  },
  fixeheight1: {
    height: 100,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  main: {
    width: "100%",
    marginTop: 20,
  },
  TopView: {
    width: "100%",
    alignItems: "center",
  },
  topView: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
  },
  topView1: { width: "90%", alignItems: "center" },
  inner: {
    backgroundColor: Colors.black,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    margin: 10,
    height: 130,
    width: 130,
    borderRadius: 25,
    flexDirection: "column",
  },
  DatePicker: {
    height: 250,
  },
  opercard: {
    marginTop: 10,
    width: "88%",
    alignSelf: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  box: {
    width: "50%",
    alignItems: "flex-start",
  },
  BoxViewBoder: {
    backgroundColor: Colors.black,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    height: 130,
    width: 130,
    borderRadius: 25,
    flexDirection: "column",
    borderWidth: 2,
    borderColor: "#ff0000",
  },
  box1: {
    width: "50%",
    alignItems: "flex-end",
  },
  inputEmail: {
    borderRadius: 10,
    width: "100%",
    height: 38,
    paddingLeft: 10,
    fontSize: RFValue(10, 580),
    fontFamily: "poppins-regular",
    color: Colors.white,
  },
  inputPassword: {
    borderRadius: 10,
    width: "100%",
    height: 38,
    paddingLeft: 10,
    fontSize: RFValue(10, 580),
    fontFamily: "poppins-regular",
    color: Colors.white,
  },
  iconStyle: { fontSize: 27, color: Colors.lightGray, marginTop: 20 },
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
  footer: {
    width: "100%",
    marginBottom: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
  },
  inputMainView: {
    backgroundColor: Colors.black,
    borderRadius: 8,
    marginTop: "3%",
    marginBottom: "3%",
    justifyContent: "center",
    alignSelf: "center",
    height: Platform.OS === "ios" ? 60 : 60,
  },
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    opacity: 1,
  },
  modalView: {
    width: "100%",
    height: "42%",
    margin: 5,
    backgroundColor: Colors.white,
    borderRadius: 7,
    padding: 0,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 6.84,
    elevation: 5,
  },
  modalViewdate: {
    width: "100%",
    height: "38%",
    margin: 5,
    backgroundColor: Colors.white,
    borderRadius: 7,
    padding: 0,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 6.84,
    elevation: 5,
  },
  centeredViewCountry: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    opacity: 1,
  },
  modalViewCountry: {
    width: "95%",
    height: "60%",
    margin: 5,
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 0,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 6.84,
    elevation: 5,
  },
  cancelView: {
    width: "100%",
    flexDirection: "row",
    marginTop: 10,
  },
  root: { flex: 1, padding: 20 },
  title: { textAlign: "center", fontSize: 30 },
  codeFieldRoot: { marginTop: 28 },
  cell: {
    width: 45,
    height: 35,
    lineHeight: 38,
    fontSize: 24,
    margin: 10,
    borderBottomWidth: 1,
    borderColor: Colors.black,
    textAlign: "center",
  },
  focusCell: {
    borderColor: Colors.black,
  },
  TextDOB: {
    fontSize: RFValue(18, 580),
    fontFamily: "Poppins-SemiBold",
    color: Colors.black,
  },
  TextCancelDone: {
    fontFamily: "poppins-Regular",
    color: Colors.black,
    fontSize: RFValue(12, 580),
  },
  PersonalinfoView: {
    width: "90%",
    flexDirection: "row",
  },
  PersonalinfoText: {
    fontSize: RFValue(20, 580),
    fontFamily: "Poppins-Bold",
    color: Colors.black,
  },
  filldetailsText: {
    fontSize: RFValue(16, 580),
    fontFamily: "poppins-regular",
    color: Colors.gray,
  },
  imageView: {
    width: "40%",
    alignItems: "flex-end",
    justifyContent: "center",
  },
  imagestyle: {
    width: 80,
    height: 80,
    borderRadius: 200 / 2,
  },
  inputTopView: {
    width: "100%",
    alignItems: "center",
    marginTop: 30,
  },
  inputtopviews: {
    width: "90%",
    height: 60,
    backgroundColor: Colors.black,
    borderRadius: 8,
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
  genderTopview: {
    width: "90%",
    backgroundColor: Colors.black,
    borderRadius: 10,
    height: 60,
    flexDirection: "row",
  },
  genderText: {
    fontSize: RFValue(13, 580),
    fontFamily: "poppins-regular",
    color: Colors.white,
    left: 10,
  },
  iconView: {
    width: "10%",
    borderColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  Gendertexts: {
    color: Colors.black,
    fontSize: RFValue(16, 580),
    fontFamily: "Poppins-ExtraBold",
  },
  genderonetext: {
    fontSize: RFValue(10, 520),
    color: "#414143",
    fontFamily: "poppins-regular",
  },
  maletext: {
    color: Colors.white,
    fontWeight: "bold",
    fontSize: RFValue(9, 580),
    fontFamily: "poppins-regular",
  },
  oternameview: {
    padding: 15,
    borderRadius: 14,
    width: "80%",
    backgroundColor: Colors.black,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
  oternameviewBorder: {
    padding: 15,
    borderRadius: 14,
    width: "80%",
    backgroundColor: Colors.black,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    borderWidth: 2,
    borderColor: "#ff0000",
  },
  otherText: {
    color: Colors.white,
    fontSize: RFValue(16, 580),
    fontFamily: "poppins-regular",
  },
  otherView: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  canceldoneView: {
    width: "20%",
    alignItems: "center",
    justifyContent: "center",
  },
  DOBView: {
    width: "60%",
    alignItems: "center",
    justifyContent: "center",
  },
  btnmainView: {
    width: "100%",
    alignItems: "center",
    marginTop: 30,
  },
  nextText: {
    color: Colors.white,
    fontSize: RFValue(16, 580),
    fontFamily: "poppins-regular",
  },
  DateText: {
    fontSize: RFValue(12, 580),
    fontFamily: "Poppins-Regular",
    color: Colors.white,
    textAlign: "left",
    left: 10,
  },
});
export default AccountUpdate;
