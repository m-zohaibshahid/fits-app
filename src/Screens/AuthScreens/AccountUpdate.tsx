import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  ImageBackground,
  Pressable,
  StyleSheet,
  TextInput,
  Modal,
  Image,
  ScrollView,
  ToastAndroid,
  ActivityIndicator,
  TouchableOpacity,
  Platform,
} from "react-native";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import FastImage from "react-native-fast-image";
import CountryPicker from "react-native-country-picker-modal";
import ImagePicker from "react-native-image-crop-picker";
import moment from "moment";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import Entypo from "react-native-vector-icons/Entypo";
import DatePicker from "react-native-date-picker";
import * as Images from "../../constants/Images";
import Header from "../../Components/Header";
import Colors from "../../constants/Colors";
import Button from "../../Components/Button";
import { url } from "../../constants/url";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useGetUserMeQuery } from "../../slice/FitsApi.slice";
import { getUserAsyncStroage } from "../../common/AsyncStorage";

const AccountUpdate = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleDate, setModalVisibleDate] = useState(false);
  const [data, setData] = useState(true);
  const [fullName, setFullName] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [gender, setGender] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [date, setDate] = useState(new Date());
  const [token, setToken] = useState("");
  const [statusOne, setStatusOne] = useState(true);
  const [statusTwo, setStatusTwo] = useState(false);
  const [statusThree, setStatusThree] = useState(false);
  const [image, setImage] = useState("");
  const [cloudImageUrl, setCloudImageUrl] = useState("");
  const [userDatax, setUserDatax] = useState();

  const [isCountryVisible, setIsCountryVisible] = React.useState(false);
  const { data:userMeData, isLoading, error, isSuccess } = useGetUserMeQuery({ id: userDatax?.data._id });

  const [load, setLoad] = useState(false);
  const [loadx, setLoadx] = useState(false);

  const [id, setId] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    navigation.addListener("focus", () => {
      getUserInfo();
      userMe();
    });
  }, []);

  const getUserInfo = async () => {
    const userData=await getUserAsyncStroage()
    setUserDatax(userData)
    
    setToken(userData?.access_token);
    setId(userData?.data?._id);
  };

  const onPressFlag = () => {
    setIsCountryVisible(true);
  };

  const CELL_COUNT = 5;
  const [value, setValue] = useState("");
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const GoBack = () => {
    navigation.goBack();
  };
  const userApiCalling = async (data) => {
    await AsyncStorage.setItem("userPersonalInfo", JSON.stringify(data));
    userMe();
  };
  // update account
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
        phoneNumber: phoneNumber,
        profileImage: cloudImageUrl,
      }),
    })
      .then((res) => res.json())
      .then((res2) => {
        setLoad(false);
        if (res2.success) {
          userApiCalling(res2.data);
          GoBack();
        } else {
          ToastAndroid.show(res2.message, ToastAndroid.LONG);
        }
      })
      .catch((error) => {
        setLoad(false);
        alert("Something Went Wrong");
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
        alert(err.message);
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
      .catch((err) => {
        setLoadx(false);
        alert(err.message);
      });
  };

  // user Me api
  const userMe = async () => {
    setLoadx(true);

    
        setLoadx(false);
        if (userMeData.success) {
          setFullName(userMeData?.personal_info?.name);
          setCountry(userMeData?.personal_info?.country);
          setState(userMeData?.personal_info?.state);
          setCity(userMeData?.personal_info?.city);
          setGender(userMeData?.personal_info?.gender);
          setUserId(userMeData?.personal_info?._id);
          setPhoneNumber(userMeData?.personal_info?.phoneNumber);
          setDate(userMeData?.personal_info?.date_of_birth);
          setImage(userMeData?.personal_info?.profileImage);
          setCloudImageUrl(userMeData?.personal_info?.profileImage);
          setData(userMeData);
        } else {
          alert(userMeData.errors);
        }
      
  };
  return (
    <View style={styles.container}>
      {/*Header rect start*/}
      <View style={styles.header}>
        <View style={styles.fixeheight}>
          <Header navigation={navigation} onPress={GoBack} />
        </View>
        <View style={styles.fixeheight1}>
          <View style={styles.PersonalinfoView}>
            <View style={{ width: "60%", alignItems: "flex-start" }}>
              <TouchableOpacity
                onPress={() => {
                  uploadImageOnCloud();
                }}
              >
                <Text style={styles.PersonalinfoText}>Personal Info</Text>
              </TouchableOpacity>
              <Text style={styles.filldetailsText}>Fill in your details</Text>
            </View>
            <View style={styles.imageView}>
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
            </View>
          </View>
        </View>
      </View>
      {/*Header rect end*/}
      {loadx === true ? (
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
          <View style={styles.main}>
            <View style={styles.inputTopView}>
              <View style={styles.inputtopviews}>
                <View style={styles.inputnameView}>
                  <Text style={styles.inputnameText}>Fullname</Text>
                </View>
                <View style={styles.textinputView}>
                  <TextInput
                    style={styles.inputEmail}
                    placeholder="Enter Full name"
                    placeholderTextColor="white"
                    value={fullName}
                    onChangeText={setFullName}
                  />
                </View>
              </View>
            </View>

            <View style={styles.inputTopView}>
              <Pressable
                onPress={() => setModalVisibleDate(true)}
                style={styles.inputtopviews}
              >
                <View style={styles.inputnameView}>
                  <Text style={styles.inputnameText}>Date of birth</Text>
                </View>
                <View
                  style={{
                    width: "100%",
                    justifyContent: "center",
                    borderColor: Colors.white,
                    height: 40,
                  }}
                >
                  <Text style={styles.DateText}>
                    {moment(date).format("DD-MM-YYYY")}
                  </Text>
                </View>
              </Pressable>
            </View>

            <View style={styles.inputTopView}>
              <Pressable
                style={styles.inputtopviews}
                onPress={() => {
                  onPressFlag();
                }}
              >
                <View style={styles.inputnameView}>
                  <Text style={styles.inputnameText}>Country</Text>
                </View>
                <View style={styles.textinputView}>
                  <Text
                    style={{
                      color: Colors.white,
                      marginTop: 5,
                      marginLeft: 10,
                      fontSize: RFValue(12, 580),
                      fontFamily: "poppins-regular",
                    }}
                  >
                    {country}
                  </Text>
                </View>
              </Pressable>
            </View>
            <View style={styles.inputTopView}>
              <View style={styles.inputtopviews}>
                <View style={styles.inputnameView}>
                  <Text style={styles.inputnameText}>State</Text>
                </View>
                <View style={styles.textinputView}>
                  <TextInput
                    style={styles.inputEmail}
                    placeholder="Enter State"
                    placeholderTextColor="white"
                    value={state}
                    onChangeText={setState}
                  />
                </View>
              </View>
            </View>
            <View style={styles.inputTopView}>
              <View style={styles.inputtopviews}>
                <View style={styles.inputnameView}>
                  <Text style={styles.inputnameText}>City</Text>
                </View>
                <View style={styles.textinputView}>
                  <TextInput
                    style={styles.inputEmail}
                    placeholder="Enter City"
                    placeholderTextColor="white"
                    value={city}
                    onChangeText={setCity}
                  />
                </View>
              </View>
            </View>
          </View>
          <View style={styles.inputTopView}>
            <Pressable onPress={() => setModalVisible(true)}>
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
            </Pressable>
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
                      <View style={styles.TopView}>
                        <View style={styles.topView}>
                          <View
                            style={{
                              width: "100%",
                              height: 60,
                              justifyContent: "center",
                            }}
                          >
                            <Text style={styles.Gendertexts}>
                              Gender
                              <Text style={styles.genderonetext}>
                                (Select one)
                              </Text>
                            </Text>
                          </View>
                        </View>
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
                          marginTop: 20,
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
                        alignItems: "center",
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
          <View style={{ paddingVertical: 10, alignItems: "center" }}>
            <Button
              navigation={navigation}
              label={
                load === true ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  "NEXT"
                )
              }
              onPress={() => {
                if (load === true) {
                } else {
                  accountUpdate();
                }
              }}
            />
          </View>
        </ScrollView>
      )}
    </View>
  );
};
export default AccountUpdate;
