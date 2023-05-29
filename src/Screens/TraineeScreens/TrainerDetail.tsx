import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Modal,
  Image,
  ToastAndroid,
  ActivityIndicator,
  Platform,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import About from "./About";
import Videos2 from "./Videos2";
import Ratings from "./Ratings";
import Schedule from "./Schedule";
import * as Images from "../../constants/Images";
import Header from "../../Components/Header";
import Button from "../../Components/Button";
import { url } from "../../constants/url";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FastImage from "react-native-fast-image";
import Entypo from "react-native-vector-icons/Entypo";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";

const TrainerDetail = ({ navigation }) => {
  const [modalVisiblex, setModalVisiblex] = useState(false);
  const route = useRoute();
  const [about, setAbout] = useState(false);
  const [schedule, setSchedule] = useState(true);
  const [video, setVideo] = useState(false);
  const [ratings, setRatings] = useState(false);

  const GoBack = () => {
    navigation.goBack();
  };
  const NextScreen = () => {
    navigation.navigate("Chat", {
      TRAINERID: route.params.trainerId,
    });
  };
  const Api = () => {
    setModalVisiblex(true);
  };
  const aboutTrueState = () => {
    setAbout(true);
    setSchedule(false);
    setVideo(false);
    setRatings(false);
  };
  const scheduleTrueState = () => {
    setAbout(false);
    setSchedule(true);
    setVideo(false);
    setRatings(false);
  };
  const videotrueState = () => {
    setAbout(false);
    setSchedule(false);
    setVideo(true);
    setRatings(false);
  };
  const ratingstrueState = () => {
    setAbout(false);
    setSchedule(false);
    setVideo(false);
    setRatings(true);
  };

  const [loadxx, setLoadxx] = useState(false);

  const [loade, setLoade] = useState(false);

  const [load, setLoad] = useState(false);

  const [data, setData] = useState(false);

  const [id, setId] = useState("");
  const [token, setToken] = React.useState("");

  const [sessionId, setSessionId] = useState("");
  const [trainerId, setTrainerId] = useState("");

  const [mesage, setMesage] = useState("");

  useEffect(() => {
    navigation.addListener("focus", () => {
      setSessionId(route?.params?.sessionId);
      setTrainerId(route?.params?.trainerId);
      getUserInfo();
      userMe();
      // ChatRoom();
    });
  }, [getUserInfo]);

  const getUserInfo = async () => {
    const userData = await AsyncStorage.getItem("userData");
    let userDatax = JSON.parse(userData);
    setToken(userDatax?.access_token);
    setId(userDatax?.data?._id);
  };

  const chatRoomCreate = async () => {
    const userData = await AsyncStorage.getItem("userData");
    let userDatax = JSON.parse(userData);
    setLoade(true);
    await fetch(`${url}/chat/rooms`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${userDatax?.access_token}`,
      },
      body: JSON.stringify({
        trainerId: trainerId,
      }),
    })
      .then((res) => res.json())
      .then((res2) => {
        setLoade(false);
        if (res2.message === "rooms not found") {
          Api();
        } else if (res2.message === "rooms found") {
          NextScreen();
        } else {
          ToastAndroid.show(res2.message, ToastAndroid.LONG);
        }
      })
      .catch((error) => {
        setLoade(false);

        console.log(error);
      });
  };
  const CreateRoom = async () => {
    if (mesage === "") {
      ToastAndroid.show("Please Enter Message.", ToastAndroid.SHORT);
    } else {
      setLoad(true);
      let body;
      await fetch(`${url}/chat/room/create`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          message: mesage,
          rid: route?.params?.personalData?.check?.user,
          sname: data?.personal_info?.name,
        }),
      })
        .then((res) => res.json())
        .then((res2) => {
          setLoad(false);
          if (res2.message === "Message sent successfully..") {
            ToastAndroid.show("Message sent successfully", ToastAndroid.LONG);
            NextScreen();
          } else {
            ToastAndroid.show(res2.message, ToastAndroid.LONG);
          }
        })
        .catch((error) => {
          setLoad(false);
          alert("Something Went Wrong");
          console.log(error);
        });
    }
  };
  const userMe = async () => {
    const userData = await AsyncStorage.getItem("userData");
    let userDatax = JSON.parse(userData);
    await fetch(`${url}/user/me/${userDatax?.data?._id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${userDatax?.access_token}`,
      },
    })
      .then((res) => res.json())
      .then((res2) => {
        console.log(res2.message);
        if (res2.success === true) {
          setData(res2);
        } else {
          ToastAndroid.show(res2.message, ToastAndroid.LONG);
        }
      })
      .catch((error) => {
        alert("Something Went Wrong");
        console.log(error);
      });
  };
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <FastImage
          style={styles.Imagestyle}
          source={{
            uri: `${route.params.userData.item.image}`,
            headers: { Authorization: "someAuthToken" },
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.cover}
        >
          <View style={{ width: "100%" }}>
            <View
              style={{ width: "90%", alignSelf: "center", marginVertical: 10 }}
            >
              <View style={{ width: "100%", flexDirection: "row" }}>
                <View style={{ width: "20%" }}>
                  <Pressable onPress={GoBack}>
                    <View
                      style={{
                        backgroundColor: "black",
                        opacity: 0.4,
                        height: 40,
                        width: 40,
                        borderRadius: 100,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Entypo name="cross" size={20} color="white" />
                    </View>
                  </Pressable>
                </View>
                <View style={{ width: "80%", alignItems: "flex-end" }}>
                  <View style={{ width: "45%" }}>
                    <View
                      style={{
                        backgroundColor: "black",
                        opacity: 0.4,
                        height: 40,
                        borderRadius: 10,
                        alignItems: "center",
                        justifyContent: "center",
                        paddingHorizontal: 10,
                        width: "100%",
                        flexDirection: "row",
                      }}
                    >
                      {route?.params?.professionalData?.checkx
                        ?.verification_status === "verified" ? (
                        <Text
                          style={{
                            fontFamily: "Poppins-Regular",
                            fontSize: RFValue(10, 580),
                            color: "#fff",
                            opacity: 1,
                          }}
                        >
                          Verified{"  "}
                        </Text>
                      ) : (
                        <Text
                          style={{
                            fontFamily: "Poppins-Regular",
                            fontSize: RFValue(10, 580),
                            color: "#fff",
                            opacity: 1,
                          }}
                        >
                          Not Verified{"  "}
                        </Text>
                      )}
                      <AntDesign
                        name="checksquare"
                        size={18}
                        color={"rgba(255, 0, 0, 1)"}
                      />
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </FastImage>
        {/* <Image style={styles.Imagestyle} source={Images.Trainer} /> */}

        <View style={styles.header}>
          <View style={styles.TopView}>
            <View style={styles.topView1}>
              {/*start James Name*/}
              <Text style={styles.NameText}>
                {route.params.personalData.check.name}
              </Text>
              <View style={styles.BtnmainrowView}>
                <View style={styles.BtnviewView}>
                  <Text style={styles.sessionText}>
                    <Text style={styles.Boldtextstyle}>
                      {route.params.userData.item.price}$
                    </Text>
                    /session
                  </Text>
                </View>
                <View style={styles.Btnmain2View}>
                  <Text style={styles.sessionText}>
                    <Text style={styles.Boldtextstyle}>
                      {route?.params?.userData?.item?.averageRating?.toFixed(1)}{" "}
                      <AntDesign name="star" color={"#000"} size={15} />
                    </Text>
                    ({route?.params?.userData?.item?.numReviews} Reviews)
                  </Text>
                </View>
              </View>
            </View>

            {/*end James Name*/}
            {/*start contact Btn */}
            <View style={styles.BtnmainRowView}>
              <View style={styles.BtnviewView}>
                <TouchableOpacity
                  onPress={() => {
                    chatRoomCreate();
                  }}
                  style={styles.BtnView}
                >
                  <Text style={styles.contactText}>
                    {loade === true ? (
                      <ActivityIndicator size="small" color="#fff" />
                    ) : (
                      "Contact"
                    )}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            {/*end contact Btn*/}
            {/* Modal  */}
            <View style={styles.centeredView}>
              <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisiblex}
              >
                <View style={styles.centeredViewx}>
                  <View style={styles.modalViewx}>
                    <View style={styles.MoadalMainContainer}>
                      {/*cancel Button*/}
                      <View style={{ flexDirection: "row", width: "100%" }}>
                        <View style={{ width: "80%" }} />
                        <View style={{ width: "20%", alignItems: "flex-end" }}>
                          <TouchableOpacity
                            onPress={() => setModalVisiblex(false)}
                          >
                            <MaterialIcons
                              name="cancel"
                              size={20}
                              color="black"
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                      {/* Label  */}
                      <Text style={styles.ModalLabel}>Enter Message</Text>
                      {/*Load Measure*/}
                      <View style={styles.parkingtyperow}>
                        <View style={{ width: "85%" }}>
                          <TextInput
                            style={styles.input}
                            placeholderTextColor="black"
                            placeholder="Message here..."
                            value={mesage}
                            onChangeText={setMesage}
                          />
                        </View>
                        <View style={styles.parkingType}>
                          <TouchableOpacity
                            onPress={() => {
                              if (load === true) {
                              } else {
                                setModalVisiblex(false);
                                CreateRoom();
                              }
                            }}
                          >
                            <MaterialCommunityIcons
                              name="send-circle"
                              size={35}
                              color="#FF0000"
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </Modal>
            </View>
            {/* Modal ends here  */}
            {/*start navigation*/}
            <View style={styles.toptabmainview}>
              <TouchableOpacity
                style={styles.mainclassesview}
                onPress={() => aboutTrueState()}
              >
                <Text style={[about ? styles.topbartext : styles.topbartext1]}>
                  About
                </Text>
                {about ? <View style={styles.borderView} /> : null}
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.mainclassesview}
                onPress={() => scheduleTrueState()}
              >
                <Text
                  style={[schedule ? styles.topbartext : styles.topbartext1]}
                >
                  Schedule
                </Text>
                {schedule ? <View style={styles.borderView} /> : null}
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => videotrueState()}
                style={styles.mainclassesview}
              >
                <Text style={[video ? styles.topbartext : styles.topbartext1]}>
                  Video
                </Text>
                {video ? <View style={styles.borderView} /> : null}
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => ratingstrueState(true)}
                style={styles.mainclassesview}
              >
                <Text
                  style={[ratings ? styles.topbartext : styles.topbartext1]}
                >
                  Ratings
                </Text>
                {ratings ? <View style={styles.borderView} /> : null}
              </TouchableOpacity>
            </View>
            {/*end navigation*/}
          </View>
        </View>
        {/*Start Navigation Screen*/}
        {about ? <About navigation={navigation} token={token} id={id} /> : null}
        {schedule ? (
          <Schedule navigation={navigation} token={token} id={id} />
        ) : null}
        {video ? (
          <Videos2 navigation={navigation} token={token} id={id} />
        ) : null}
        {ratings ? (
          <Ratings navigation={navigation} token={token} id={id} />
        ) : null}
        {/*End Navigation Screen*/}
        <View style={{ paddingVertical: 10 }} />

        <View style={{ paddingVertical: 10 }} />
      </ScrollView>
    </View>
  );
};
export default TrainerDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "ios" ? 40 : 0,
    paddingBottom: Platform.OS === "ios" ? 0 : 0,
  },
  header: {
    width: "100%",
    height: "20%",
    marginTop: -20,
    backgroundColor: "#fff",
    borderRadius: 24,
  },
  main: {
    width: "100%",
    height: "80%",
  },
  footer: {
    width: "100%",
    marginBottom: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
  },
  TopView: {
    width: "100%",
    alignItems: "center",
  },
  topView: { width: "90%" },
  topView1: {
    width: "90%",
    marginTop: 5,
    alignItems: "center",
  },
  Imagestyle: {
    width: "100%",
    height: 350,
  },
  NameText: {
    fontFamily: "Poppins-Bold",
    fontSize: RFValue(22, 580),
    color: "#000",
  },
  sessionText: {
    fontFamily: "Poppins-Regular",
    fontSize: RFValue(10, 580),
    color: "#979797",
  },
  BtnView: {
    width: 115,
    height: 45,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 14,
  },
  BtnmainrowView: {
    width: "100%",
    flexDirection: "row",
    paddingVertical: 4,
  },
  BtnmainRowView: {
    width: "70%",
    paddingVertical: 8,
    alignItems: "center",
  },
  BtnviewView: {
    width: "47%",
    alignItems: "flex-end",
  },
  Btnmain2View: {
    width: "50%",
    alignItems: "center",
  },
  contactText: {
    fontFamily: "Poppins-Regular",
    fontSize: RFValue(10, 580),
    color: "#fff",
  },
  toptabmainview: {
    width: "100%",
    flexDirection: "row",
    paddingVertical: 10,
  },
  mainclassesview: {
    width: "25%",
    alignItems: "center",
  },
  topbartext: {
    fontSize: RFValue(12, 580),
    color: "#ff0000",
    fontFamily: "Poppins-Regular",
  },
  topbartext1: {
    fontSize: RFValue(12, 580),
    color: "#000",
    fontFamily: "Poppins-Regular",
  },
  borderView: {
    width: 30,
    borderWidth: 1,
    borderColor: "#ff0000",
  },
  RowView: {
    width: "100%",
    flexDirection: "row",
  },
  Boldtextstyle: {
    fontSize: RFValue(10, 580),
    color: "#000",
    fontFamily: "Poppins-SemiBold",
  },
  // Modal
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FAF9F6",
    opacity: 0.9,
  },
  modalViewx: {
    margin: 0,
    width: "95%",
    justifyContent: "center",
    margin: 5,
    backgroundColor: "#FAF9F6",
    borderRadius: 25,
    padding: 0,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 6.84,
    elevation: 5,
    paddingTop: 10,
    paddingBottom: 20,
  },
  centeredViewx: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#262626",
    opacity: 0.9,
  },
  MoadalMainContainer: {
    width: "90%",
    alignSelf: "center",
  },
  ModalLabel: {
    fontSize: RFValue(14, 580),
    color: "black",
    paddingLeft: 10,
    paddingBottom: 10,
  },
  input: {
    fontSize: RFValue(12, 580),
    color: "black",
  },
  parkingtyperow: {
    flexDirection: "row",
    width: "100%",
    backgroundColor: "white",
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    height: 42,
    justifyContent: "center",
    // paddingHorizontal: wp(5),
    // marginVertical: hp(0.5),
    paddingHorizontal: 5,
    marginVertical: 0.5,
  },
  parkingType: {
    width: "15%",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
});
