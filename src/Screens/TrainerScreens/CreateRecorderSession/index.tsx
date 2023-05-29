import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  ImageBackground,
  Pressable,
  StyleSheet,
  TextInput,
  ScrollView,
  ToastAndroid,
  ActivityIndicator,
  Platform,
  Image,
  Modal,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import ImagePicker from "react-native-image-crop-picker";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { heightPercentageToDP } from "react-native-responsive-screen";
import Header from "../../../Components/Header";
import Button from "../../../Components/Button";
import Colors from "../../../constants/Colors";
import { url } from "../../../constants/url";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import VideoPlayer from "react-native-video-player";

const UploadVideo = ({ navigation }) => {
  const route = useRoute();

  const NextScreen = () => {
    navigation.navigate("TrainerPayment");
  };
  useEffect(() => {
    navigation.addListener("focus", () => {
      getUserInfo();
    });
  }, [getUserInfo]);

  const [token, setToken] = useState("");
  const getUserInfo = async () => {
    const userData = await AsyncStorage.getItem("userData");
    let userDatax = JSON.parse(userData);
    setToken(userDatax?.access_token);
  };
  const [value, setValue] = useState("");
  const [statusOne, setStatusOne] = useState(false);
  const [statusTwo, setStatusTwo] = useState(false);
  const [statusThree, setStatusThree] = useState(false);
  const [statusFour, setStatusFour] = useState(false);
  const [statusFive, setStatusFive] = useState(false);
  const [statusSix, setStatusSix] = useState(false);

  const [details, setDetails] = useState("");
  const [video, setVideo] = useState("");
  const [price, setPrice] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [equipment, setEquipment] = useState([
    {
      value: "Na",
    },
  ]);
  const [load, setLoad] = useState(false);
  const [loadx, setLoadx] = useState(false);

  const bookSession = async () => {
    if (details === "") {
      ToastAndroid.show("Please Enter Details.", ToastAndroid.SHORT);
    } else if (value === "") {
      ToastAndroid.show("Please select the Category.", ToastAndroid.SHORT);
    } else if (price === "") {
      ToastAndroid.show("Please enter the Price.", ToastAndroid.SHORT);
    } else {
      setLoad(true);
      let session_type;
      session_type = {
        type: "recorded",
        videoLink: videoLink,
        lat: route?.params?.lat,
        lng: route?.params?.lng,
        // null
        recordCategory: "NA",
        no_of_play: "NA",
        videoTitle: "NA",
        desc: "NA",
        meetingLink: "NA",
        equipment: equipment,
        sports: "NA",
        image: "Na",
      };
      await fetch(`${url}/session`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          // params
          session_title: "NA",
          select_date: route?.params?.select_date,
          class_title: route?.params?.class_title,
          class_time: route?.params?.class_time,
          duration: route?.params?.duration,
          no_of_slots: route?.params?.no_of_slots,
          equipment: equipment,
          sports: "NA",
          image: route?.params?.image,
          // body
          category: value,
          details: details,
          price: price,
          session_type: session_type,
        }),
      })
        .then((res) => res.json())
        .then((res2) => {
          setLoad(false);
          if (res2.message === "created successfully") {
            NextScreen();
          } else {
            ToastAndroid.show(res2?.errors?.email);
          }
        })
        .catch((error) => {
          setLoad(false);
          ToastAndroid.show("Something Went Wrong");
          console.log(error);
        });
    }
  };

  const choosePhotoFromCamera = () => {
    ImagePicker.openPicker({
      mediaType: "video",
    })
      .then((file) => {
        let newFile = {
          uri: file.path,
          type: "video/mp4",
          name: `video.mp4`,
        };
        uploadImageOnCloud(newFile);
        setVideo(file.path);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const uploadImageOnCloud = async (image) => {
    setLoadx(true);
    const zzz = new FormData();
    zzz.append("file", image);
    zzz.append("upload_preset", "employeeApp");
    zzz.append("cloud_name", "ZACodders");


    await fetch("https://api.cloudinary.com/v1_1/ZACodders/video/upload", {
      method: "POST",
      body: zzz,
    })
      .then((res) => res.json())
      .then((res2) => {
        setLoadx(false);
        setVideoLink(res2?.url);
      })
      .catch((err) => {
        setLoadx(false);
        console.log("catch" + err);
      });
  };

  return (
    <View style={styles.container}>
      <Header label={"Upload Video"} navigation={navigation} />

      {loadx === true ? (
        <ActivityIndicator size="large" color="#000" />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.TopView}>
            <View style={styles.topView}>
              {video === "" ? (
                <View
                  style={{
                    width: "100%",
                    marginTop: 10,
                    backgroundColor: "#979797",
                    height: 180,
                    borderRadius: 10,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <SimpleLineIcons
                    name="cloud-upload"
                    size={40}
                    color={"#000"}
                  />
                  <Text
                    style={{ fontSize: RFValue(15, 580), color: Colors.Black }}
                  >
                    Tap to upload video file
                  </Text>
                  <Pressable
                    style={{
                      marginTop: 20,
                      width: "35%",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#FF0000",
                      borderRadius: 10,
                      paddingVertical: 10,
                    }}
                    onPress={() => {
                      choosePhotoFromCamera();
                    }}
                  >
                    <Text
                      style={{
                        color: "#fff",
                        fontFamily: "Poppins-SemiBold",
                      }}
                    >
                      Upload video
                    </Text>
                  </Pressable>
                </View>
              ) : (
                <VideoPlayer
                  video={{
                    uri: video,
                  }}
                  filterEnabled={true}
                  videoWidth={1600}
                  videoHeight={900}
                  fullscreenAutorotate={false}
                  //thumbnail={Images.videoImage}
                  style={{ borderRadius: 10 }}
                />
              )}
            </View>
            <View
              style={{ width: "100%", alignItems: "center", marginTop: 10 }}
            >
              <View style={styles.mainRectViewRow}>
                <Text style={styles.selectText}>
                  Select Category{" "}
                  <Text style={styles.selectTexts}>(Select appropriate)</Text>
                </Text>
              </View>
            </View>

            <View style={styles.mainBoxView}>
              <View style={{ width: "90%", flexDirection: "row" }}>
                <View style={styles.BoxviewWidth1}>
                  <Pressable
                    style={
                      statusOne
                        ? styles.BoxShadowView
                        : styles.BoxShadowViewBorder
                    }
                    onPress={() => {
                      setStatusOne(true);
                      setValue("Cardio/Abs");
                      setStatusTwo(false);
                      setStatusThree(false);
                      setStatusFour(false);
                      setStatusFive(false);
                      setStatusSix(false);
                    }}
                  >
                    <Text style={styles.BoxText}>Cardio/Abs</Text>
                  </Pressable>
                </View>
                <View style={styles.BoxviewWidth2}>
                  <Pressable
                    style={
                      statusTwo
                        ? styles.BoxShadowView
                        : styles.BoxShadowViewBorder
                    }
                    onPress={() => {
                      setStatusOne(false);
                      setStatusTwo(true);
                      setValue("No Equipment Home Exercise");
                      setStatusThree(false);
                      setStatusFour(false);
                      setStatusFive(false);
                      setStatusSix(false);
                    }}
                  >
                    <Text style={styles.BoxText}>
                      No {"\n"}Equipment{"\n"}Home{"\n"}Exercise
                    </Text>
                  </Pressable>
                </View>
                <View style={styles.BoxviewWidth3}>
                  <Pressable
                    style={
                      statusThree
                        ? styles.BoxShadowView
                        : styles.BoxShadowViewBorder
                    }
                    onPress={() => {
                      setStatusOne(false);
                      setStatusTwo(false);
                      setStatusThree(true);
                      setValue("Learn Technique");
                      setStatusFour(false);
                      setStatusFive(false);
                      setStatusSix(false);
                    }}
                  >
                    <Text style={styles.BoxText}>Learn Technique</Text>
                  </Pressable>
                </View>
              </View>
            </View>
            <View style={styles.mainBoxView}>
              <View style={{ width: "90%", flexDirection: "row" }}>
                <View style={styles.BoxviewWidth1}>
                  <Pressable
                    style={
                      statusFour
                        ? styles.BoxShadowView
                        : styles.BoxShadowViewBorder
                    }
                    onPress={() => {
                      setStatusOne(false);
                      setStatusTwo(false);
                      setStatusThree(false);
                      setStatusFour(true);
                      setValue("Strength Building Workout");
                      setStatusFive(false);
                      setStatusSix(false);
                    }}
                  >
                    <Text style={styles.BoxText}>
                      Strength {"\n"} Building{"\n"} Workout
                    </Text>
                  </Pressable>
                </View>
                <View style={styles.BoxviewWidth2}>
                  <Pressable
                    style={
                      statusFive
                        ? styles.BoxShadowView
                        : styles.BoxShadowViewBorder
                    }
                    onPress={() => {
                      setStatusOne(false);
                      setStatusTwo(false);
                      setStatusThree(false);
                      setStatusFour(false);
                      setStatusFive(true);
                      setValue("Fat Burning Worlout");
                      setStatusSix(false);
                    }}
                  >
                    <Text style={styles.BoxText}>
                      Fat {"\n"} Burning{"\n"} Workout
                    </Text>
                  </Pressable>
                </View>
                <View style={styles.BoxviewWidth3}>
                  <Pressable
                    style={
                      statusSix
                        ? styles.BoxShadowView
                        : styles.BoxShadowViewBorder
                    }
                    onPress={() => {
                      setStatusOne(false);
                      setStatusTwo(false);
                      setStatusThree(false);
                      setStatusFour(false);
                      setStatusFive(false);
                      setStatusSix(true);
                      setValue("Mental Health & Nutritiion");
                    }}
                  >
                    <Text style={styles.BoxText}>
                      Mental{"\n"} Health & {"\n"} Nutritiion
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>
            <View style={{ width: "90%", alignSelf: "center", marginTop: 10 }}>
              <Text
                style={{
                  fontSize: RFValue(18, 580),
                  fontFamily: "Poppins-Regular",
                  color: "#000",
                }}
              >
                Any specific details
              </Text>
            </View>
            <View
              style={{
                width: "100%",
                alignItems: "center",
                marginTop: 10,
              }}
            >
              <View
                style={{
                  width: "90%",
                  backgroundColor: "#414143",
                  borderRadius: 8,
                  flexDirection: "column",
                  height: 130,
                }}
              >
                <TextInput
                  multiline={true}
                  numberOfLines={5}
                  maxLength={500}
                  placeholder="Description"
                  placeholderTextColor={"#fff"}
                  value={details}
                  onChangeText={setDetails}
                  style={{
                    height: 200,
                    textAlignVertical: "top",
                    fontFamily: "Poppins-Regular",
                    color: "#fff",
                    left: 6,
                  }}
                />
              </View>
            </View>
            <View
              style={{
                width: "90%",
                alignSelf: "center",
                marginVertical: hp(1),
              }}
            >
              {/*start pricing */}
              <Text style={styles.pricingText}>Total Cost</Text>
              <View style={styles.TextInput}>
                <Text style={styles.dolarStyle}>$</Text>
                <TextInput
                  style={styles.inputEmail}
                  placeholderTextColor={"#fff"}
                  value={price}
                  keyboardType="numeric"
                  maxLength={19}
                  onChangeText={setPrice}
                />
              </View>
            </View>
          </View>
          <View style={{ marginVertical: 50 }}></View>
        </ScrollView>
      )}
      <View
        style={{
          width: "100%",
          marginBottom: 0,
          backgroundColor: Colors.white,
          bottom: 0,
          position: "absolute",
          alignItems: "center",
          marginTop: 40,
        }}
      >
        <Button
          loader={load}
          disabled={!value || !videoLink || !details || !price}
          label={"Done"}
          onPress={() => {
            if (!load === true) {
              bookSession();
              setDetails("");
              setPrice("");
            }
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
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
    borderBottomWidth: 0.5,
    borderColor: "lightgrey",
    width: "100%",
    alignItems: "center",
  },
  fixeheight1: {
    height: 100,
    width: "100%",
    justifyContent: "center",
    // alignItems: 'center',
  },
  mainRectViewRow: {
    width: "90%",
    alignSelf: "center",
    flexDirection: "row",
    marginTop: 15,
    marginBottom: 3,
  },
  selectText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: RFValue(14, 580),
    color: "#000",
    fontWeight: "500",
  },
  selectTexts: {
    fontFamily: "Poppins-Regular",
    fontSize: RFValue(9, 580),
    fontWeight: "500",
  },
  TopView: {
    width: "100%",
    alignItems: "center",
  },
  topView: { width: "90%" },
  topView1: {
    width: "90%",
    alignItems: "center",
  },
  main: {
    width: "100%",
    height: "85%",
  },
  TextInput: {
    width: "70%",
    backgroundColor: Colors.black,
    borderRadius: 9,
    marginTop: 10,
    height: 50,
    justifyContent: "center",
    marginBottom: -10,
    flexDirection: "row",
  },
  footer: {
    width: "100%",
    marginBottom: 0,
    bottom: 0,
    height: "10%",
    justifyContent: "center",
    position: "absolute",
    backgroundColor: "#fff",
  },
  btn: {
    padding: 10,
    margin: 10,
    width: "90%",
    borderRadius: 10,
    color: "#6698FF",
    backgroundColor: "#979797",
    alignItems: "center",
    justifyContent: "center",
  },
  pricingText: {
    fontSize: RFValue(17, 580),
    fontFamily: "Poppins-SemiBold",
    color: "#000",
    fontWeight: "700",
  },
  BoxviewWidth1: {
    width: "33%",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  BoxviewWidth2: {
    width: "34%",
    justifyContent: "center",
    alignItems: "center",
  },
  BoxviewWidth3: {
    width: "33%",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  inputEmail: {
    borderRadius: 10,
    width: "100%",
    paddingLeft: 10,
    fontSize: RFValue(15, 580),
    color: Colors.white,
  },
  dolarStyle: {
    fontSize: RFValue(15, 580),
    color: Colors.white,
    marginTop: 13,
    marginLeft: 30,
  },
  BoxShadowView: {
    width: 101,
    height: 101,
    backgroundColor: "#000000",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#ff0000",
  },
  BoxShadowViewBorder: {
    width: 101,
    height: 101,
    backgroundColor: "#000000",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: hp(1),
    paddingHorizontal: wp(1),
  },
  mainBoxView: {
    width: "100%",
    alignItems: "center",
    marginTop: 15,
  },
  BoxText: {
    color: "#fff",
    fontSize: RFValue(9, 580),
    fontFamily: "Poppins-Bold",
    textAlign: "center",
    lineHeight: 21,
    letterSpacing: 2,
  },
});

export default UploadVideo;
