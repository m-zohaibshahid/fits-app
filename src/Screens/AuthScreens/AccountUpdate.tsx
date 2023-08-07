import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Pressable,
  Modal,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
  Platform,
  StyleSheet,
} from "react-native";
import CountryPicker from "react-native-country-picker-modal";
import ImagePicker from "react-native-image-crop-picker";
import moment from "moment";
import { RFValue } from "react-native-responsive-fontsize";
import RNRestart from 'react-native-restart';
import DatePicker from "react-native-date-picker";
import * as Images from "../../constants/Images";
import Header from "../../Components/Header";
import Colors from "../../constants/Colors";
import Button from "../../Components/Button";
import * as Yup from "yup";
import { useGetUserMeQuery, usePersonalInfoUpdateMutation } from "../../slice/FitsApi.slice";
import Container from "../../Components/Container";
import Typography from "../../Components/typography/text";
import TextInput from "../../Components/Input";
import { PersonalInfoFormValidationResultInterface, PersonalInfoValidateErrorsIntarface, PersonalInfoValidateSchemaInterface } from "./types";
import FullPageLoader from "../../Components/FullpageLoader";
import { errorToast } from "../../utils/toast";
import { validateForm } from "../../utils/validation";
import { NavigationSwitchProp } from "react-navigation";

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

interface Props {
  navigation: NavigationSwitchProp;
}

const AccountUpdate = ({navigation}: Props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleDate, setModalVisibleDate] = useState(false);
  const [fullName, setFullName] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [gender, setGender] = useState<any>("");
  const [phoneNumber, setPhoneNumber] = useState('');
  const [date, setDate] = useState(new Date());
  const [image, setImage] = useState("");
  const [cloudImageUrl, setCloudImageUrl] = useState("");
  const [validationErrors, setValidationErrors] = useState<PersonalInfoValidateErrorsIntarface>({});
  const [isCountryVisible, setIsCountryVisible] = React.useState(false);
  const { data: userInfo, refetch: refetchUserMeApi, isLoading } = useGetUserMeQuery({});
  const [mutateAsyncPersonalInfoUpdate, {isLoading: updateInfoLoading}] = usePersonalInfoUpdateMutation();

  useEffect(() => {
    navigation.addListener("focus",async () => {
      const result = await refetchUserMeApi();
      if (result.data) setInitialState()
    });
  }, []);

  const setInitialState = () => { 
    setFullName(userInfo?.personal_info?.name ?? '');
    setCountry(userInfo?.personal_info?.country ?? '');
    setState(userInfo?.personal_info?.state ?? '');
    setCity(userInfo?.personal_info?.city ?? '');
    setGender(userInfo?.personal_info?.gender ?? '');
    setPhoneNumber(userInfo?.personal_info?.phoneNumber ?? '');
    setDate(new Date(userInfo?.personal_info?.date_of_birth) ?? new Date());
    setImage(userInfo?.personal_info?.profileImage ?? '');
    setCloudImageUrl(userInfo?.personal_info?.profileImage ?? '');
  }

  const onPressFlag = () => {
    setIsCountryVisible(true);
  };

  const accountUpdate = async () => {
    const formValues: PersonalInfoValidateSchemaInterface = {
      name: fullName,
      date_of_birth: date,
      country: country,
      phoneNumber: phoneNumber,
      state: state,
      city: city,
      gender: gender,
      profileImage: cloudImageUrl,
      userType: userInfo?.personal_info.user
    };
    
    
    const { isValid, errors }: PersonalInfoFormValidationResultInterface = await validateForm(formValues, validationSchema);
    setValidationErrors(errors);
    if (isValid) {
      const result = await mutateAsyncPersonalInfoUpdate({id: userInfo?.personal_info._id, body: formValues});
      if (result?.data?.success) RNRestart.restart()
      if (result?.error) errorToast(result?.error?.data?.message);
    }
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
        setCloudImageUrl(res2?.url);
      })
      .catch((err) => {
        Alert.alert(err.message);
      });
  };

  if (isLoading) return <FullPageLoader />

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
        </ScrollView>{isCountryVisible && <CountryPicker onClose={() => setIsCountryVisible(false)} visible={isCountryVisible} onSelect={(value) => setCountry(value.name)} countryCode={"AF"} />}
            
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

      <Modal animationType="fade" transparent={true} visible={modalVisibleDate} onRequestClose={() => setModalVisibleDate(false)}>
        <View style={styles.bottomView}>
          <View style={styles.modalContainer}>
            <View style={styles.cancelView}>
              <Pressable onPress={() => setModalVisibleDate(false)} style={styles.canceldoneView}>
                <Text style={styles.TextCancelDone}>Cancel</Text>
              </Pressable>
              <View style={styles.DOBView}>
                <Text style={styles.TextDOB}>Date of Birth</Text>
              </View>
              <Pressable onPress={() => setModalVisibleDate(false)} style={styles.canceldoneView}>
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
        </View>
      </Modal>
      <Button style={{marginVertical: 10}} label={"Next"} loader={updateInfoLoading} onPress={accountUpdate} />
    </Container>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: Colors.white,
    paddingTop: Platform.OS === "ios" ? 40 : 0,
    paddingBottom: 0,
  },
  bottomView: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: Colors.transparentBlack,
  },
  header: {
    width: "100%",
    height: 150,
  },
  modalContainer: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    paddingHorizontal: 24,
    paddingTop: 28,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 6.84,
    elevation: 9,
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
  topView: { width: "90%", alignItems: "center", alignSelf: "center" },
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
    height: 60,
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
