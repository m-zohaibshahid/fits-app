import React, { useState, useEffect } from "react";
import { Text, View, ImageBackground, Pressable, StyleSheet, TextInput, ScrollView, ToastAndroid, ActivityIndicator, Platform, Image, Modal } from "react-native";
import Colors from "../../constants/Colors";
import VideoPlayer from "react-native-video-player";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import ImagePicker from "react-native-image-crop-picker";
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from "react-native-confirmation-code-field";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Octicons from "react-native-vector-icons/Octicons";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { heightPercentageToDP } from "react-native-responsive-screen";
import * as Images from "../../constants/Images";
import Header from "../../Components/Header";
import Button from "../../Components/Button";
import { url } from "../../constants/url";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UploadVideo2 = ({ navigation }) => {
  const GoBack = () => {
    navigation.goBack();
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

  const [statusOne, setStatusOne] = useState(false);
  const [statusTwo, setStatusTwo] = useState(false);
  const [statusThree, setStatusThree] = useState(false);
  const [statusFour, setStatusFour] = useState(false);
  const [statusFive, setStatusFive] = useState(false);
  const [statusSix, setStatusSix] = useState(false);

  const [details, setDetails] = useState("");
  const [video, setVideo] = useState("");
  const [price, setPrice] = useState();
  const [videoTitle, setVideoTitle] = useState();
  const [videoLink, setVideoLink] = useState([]);
  const [value, setValue] = useState("");

  const [load, setLoad] = useState(false);
  const [loadx, setLoadx] = useState(false);

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
        setVideoLink([res2?.url]);
      })
      .catch((err) => {
        setLoadx(false);
      });
  };
  const upLoadVideoInfo = async () => {
    if (videoTitle === "") {
      ToastAndroid.show("Please Enter Video Title here.", ToastAndroid.SHORT);
    } else if (details === "") {
      ToastAndroid.show("Please Enter Details.", ToastAndroid.SHORT);
    } else if (value === "") {
      ToastAndroid.show("Please select the Category.", ToastAndroid.SHORT);
    } else if (price === "") {
      ToastAndroid.show("Please enter the Price.", ToastAndroid.SHORT);
    } else {
      setLoad(true);
      await fetch(`${url}/video`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          sessionId: "62e400339cc3ab0016673384",
          topic: videoTitle,
          video_links: videoLink,
          video_category: value,
          video_details: details,
          price: price,
        }),
      })
        .then((res) => res.json())
        .then((res2) => {
          setLoad(false);

          if (res2.message === "created successfully") {
            GoBack();
          } else {
            Alert.alert(res2?.errors?.email);
          }
        })
        .catch((error) => {
          setLoad(false);
          Alert.alert("Something Went Wrong");
          console.log(error);
        });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.fixeheight}>
          <Header navigation={navigation} onPress={GoBack} />
        </View>
        <View style={styles.fixeheight1}>
          <View style={styles.TopView}>
            <View style={styles.topView}>
              <Text
                style={{
                  color: "#000000",
                  fontSize: RFValue(30, 580),
                  marginTop: 20,
                  fontFamily: "Poppins-SemiBold",
                }}
              >
                Upload Video
              </Text>
            </View>
          </View>
        </View>
      </View>
      {loadx === true ? (
        <ActivityIndicator size="large" color="#000" />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.TopView}>
            {video === "" ? (
              <View
                style={{
                  width: "90%",
                  backgroundColor: "#979797",
                  height: 200,
                }}
              >
                <View
                  style={{
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ fontSize: RFValue(15, 580) }}>yogavideo.mp4</Text>
                  <Image source={Images.Mp4} marginTop={15} />

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
                        fontFamily: "Poppins-Regular",
                      }}
                    >
                      Drop file
                    </Text>
                  </Pressable>
                </View>
              </View>
            ) : (
              <VideoPlayer
                video={{
                  uri: video,
                }}
                filterEnabled={true}
                videoWidth={2000}
                videoHeight={1400}
                fullscreenAutorotate={false}
                //thumbnail={Images.videoImage}
                style={{ borderTopRightRadius: 16, borderTopLeftRadius: 16 }}
              />
            )}
          </View>
          <View style={{ width: "90%", alignSelf: "center", marginTop: 10 }}>
            {/*start pricing */}
            <Text
              style={{
                fontSize: RFValue(16, 580),
                fontFamily: "Poppins-Bold",
                color: "#000",
                fontWeight: "700",
              }}
            >
              Video Title
            </Text>
            <View
              style={{
                width: "100%",
                backgroundColor: "#414143",
                borderRadius: 9,
                marginTop: 10,
                height: 50,
                justifyContent: "center",
              }}
            >
              <TextInput
                placeholder="Please Enter Video Title"
                style={{
                  borderRadius: 10,
                  width: "100%",
                  paddingLeft: 10,
                  fontSize: RFValue(15, 580),
                  color: Colors.white,
                }}
                placeholderTextColor={"#fff"}
                value={videoTitle}
                onChangeText={setVideoTitle}
              />
            </View>
            {/*end pricing */}
          </View>
          <View style={{ width: "100%", alignItems: "center", marginTop: 20 }}>
            <View style={{ width: "90%" }}>
              <View style={{ width: "100%", flexDirection: "row" }}>
                <View style={{ width: "60%" }}>
                  <Text
                    style={{
                      fontSize: RFValue(14, 580),
                      fontFamily: "Poppins-SemiBold",
                      color: "#000",
                    }}
                  >
                    Select Category
                  </Text>
                </View>
                <View
                  style={{
                    width: "40%",
                    marginTop: 9,
                    alignItems: "flex-end",
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Poppins-Regular",
                      fontSize: RFValue(9, 580),
                    }}
                  >
                    (select appropriate)
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.mainBoxView}>
            <View style={{ width: "90%", flexDirection: "row" }}>
              <View style={styles.BoxviewWidth1}>
                <Pressable
                  style={statusOne ? styles.BoxShadowView : styles.BoxShadowViewBorder}
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
                  style={statusTwo ? styles.BoxShadowView : styles.BoxShadowViewBorder}
                  onPress={() => {
                    setStatusOne(false);
                    setValue("No Equipment Home Exercise");
                    setStatusTwo(true);
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
                  style={statusThree ? styles.BoxShadowView : styles.BoxShadowViewBorder}
                  onPress={() => {
                    setStatusOne(false);
                    setValue("Learn Technique");
                    setStatusTwo(false);
                    setStatusThree(true);
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
                  style={statusFour ? styles.BoxShadowView : styles.BoxShadowViewBorder}
                  onPress={() => {
                    setStatusOne(false);
                    setValue("Strength Building Workout");
                    setStatusTwo(false);
                    setStatusThree(false);
                    setStatusFour(true);
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
                  style={statusFive ? styles.BoxShadowView : styles.BoxShadowViewBorder}
                  onPress={() => {
                    setStatusOne(false);
                    setValue("Fat Burning Workout");
                    setStatusTwo(false);
                    setStatusThree(false);
                    setStatusFour(false);
                    setStatusFive(true);
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
                  style={statusSix ? styles.BoxShadowView : styles.BoxShadowViewBorder}
                  onPress={() => {
                    setStatusOne(false);
                    setValue("Mental Health & Nutritiion");
                    setStatusTwo(false);
                    setStatusThree(false);
                    setStatusFour(false);
                    setStatusFive(false);
                    setStatusSix(true);
                  }}
                >
                  <Text style={styles.BoxText}>
                    Mental{"\n"} Health & {"\n"} Nutritiion
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
          <View style={{ width: "100%", alignItems: "center", marginTop: 40 }}>
            <View style={{ width: "90%" }}>
              <Text style={{ fontSize: RFValue(18, 580), color: "#000" }}>Any specific details</Text>
            </View>
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
                placeholder="Write your specific detail here....."
                placeholderTextColor={"#fff"}
                style={{
                  height: 200,
                  textAlignVertical: "top",
                  fontFamily: "Poppins-Regular",
                  color: "#fff",
                }}
                value={details}
                onChangeText={setDetails}
              />
            </View>
          </View>
          <View style={{ width: "90%", alignSelf: "center", marginTop: 10 }}>
            {/*start pricing */}
            <Text
              style={{
                fontSize: RFValue(16, 580),
                fontFamily: "Poppins-Bold",
                color: "#000",
                fontWeight: "700",
              }}
            >
              Total Cost
            </Text>
            <View
              style={{
                width: "70%",
                backgroundColor: "#414143",
                borderRadius: 9,
                marginTop: 10,
                height: 50,
                justifyContent: "center",
                marginBottom: -10,
              }}
            >
              <TextInput
                placeholder=" Please Enter Cost"
                style={{
                  borderRadius: 10,
                  width: "100%",
                  paddingLeft: 10,
                  fontSize: RFValue(15, 580),
                  color: Colors.white,
                }}
                placeholderTextColor={"#fff"}
                value={price}
                keyboardType="numeric"
                maxLength={19}
                onChangeText={setPrice}
              />
            </View>
            {/*end pricing */}
          </View>

          <View
            style={{
              width: "100%",
              alignItems: "center",
              marginTop: 40,
            }}
          >
            <Button
              navigation={navigation}
              label={load === true ? <ActivityIndicator size="small" color="#fff" /> : "Done"}
              onPress={() => {
                if (load === true) {
                } else {
                  upLoadVideoInfo();
                }
              }}
            />
          </View>
          <View style={{ marginVertical: 10 }}></View>
        </ScrollView>
      )}
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
    backgroundColor: "#FF0000",
    alignItems: "center",
    justifyContent: "center",
  },
  mainBoxView: {
    width: "100%",
    alignItems: "center",
    marginTop: 30,
  },
  BoxText: {
    color: "#fff",
    fontSize: RFValue(9, 580),
    fontFamily: "Poppins-Bold",
    textAlign: "center",
    lineHeight: 21,
    letterSpacing: 2,
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
});

export default UploadVideo2;
