import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Octicons from "react-native-vector-icons/Octicons";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { heightPercentageToDP } from "react-native-responsive-screen";
import VideoPlayer from "react-native-video-player";
import * as Images from "../../constants/Images";
import Header from "../../Components/Header";
import Button from "../../Components/Button";
import { url } from "../../constants/url";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import Colors from "../../constants/Colors";

const VideosForClasses = ({ navigation }) => {
  useEffect(() => {
    navigation.addListener("focus", () => {
      getUserInfo();
      userMe();
    });
  }, [getUserInfo]);

  const [token, setToken] = useState("");

  const getUserInfo = async () => {
    const userData = await AsyncStorage.getItem("userData");
    let userDatax = JSON.parse(userData);
    setToken(userDatax?.access_token);
  };
  const userMe = async () => {
    setLoadx(true);
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
        setLoadx(false);
        if (res2.success === true) {
          setId(res2?.user?._id);
        } else {
          ToastAndroid.show(res2.message, ToastAndroid.LONG);
        }
      })
      .catch((error) => {
        setLoadx(false);
        ToastAndroid.show(error, ToastAndroid.LONG);
      });
  };
  const [one, setOne] = useState("");
  const [two, setTwo] = useState("");
  const [three, setThree] = useState("");
  const [four, setFour] = useState("");
  const [five, setFive] = useState("");

  const oneInfo = async () => {
    setOne(true);
    setRating("1");
    setTwo(false);
    setThree(false);
    setFour(false);
    setFive(false);
  };
  const twoInfo = async () => {
    setOne(true);
    setTwo(true);
    setRating("2");
    setThree(false);
    setFour(false);
    setFive(false);
  };
  const threeInfo = async () => {
    setOne(true);
    setTwo(true);
    setThree(true);
    setRating("3");
    setFour(false);
    setFive(false);
  };
  const fourInfo = async () => {
    setOne(true);
    setTwo(true);
    setThree(true);
    setFour(true);
    setRating("4");
    setFive(false);
  };
  const fiveInfo = async () => {
    setOne(true);
    setTwo(true);
    setThree(true);
    setFour(true);
    setFive(true);
    setRating("5");
  };

  const [loadx, setLoadx] = useState(false);
  const [loadxx, setLoadxx] = useState(false);
  const [rating, setRating] = useState("");
  const [id, setId] = useState("");
  const RattingReviews = async () => {
    if (rating === "") {
      ToastAndroid.show("Enter your ratings", ToastAndroid.LONG);
    } else {
      setLoadxx(true);
      {
      }
      let reviews;
      (reviews = {
        rating: rating,
        comment: "Na",
        user: id,
      }),
        await fetch(`${url}/review`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            videoId: videoId,
            reviewFor: "video",
            reviews: reviews,
          }),
        })
          .then((res) => res.json())
          .then((res2) => {
            setLoadxx(false);
            if (res2.message === "reviews submit successfully") {
              ToastAndroid.show("Confirmed your reviews", ToastAndroid.LONG);
              getAllVideos();
            } else {
              ToastAndroid.show(res2.message, ToastAndroid.LONG);
            }
          })
          .catch((error) => {
            setLoadxx(false);
            alert("Something Went Wrong");
            console.log(error);
          });
    }
  };
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    navigation.addListener("focus", () => {
      getAllVideos();
    });
  }, []);
  const [videoId, setVideoId] = useState("");
  const getAllVideos = async () => {
    const userData = await AsyncStorage.getItem("userData");
    let userDatax = JSON.parse(userData);
    setLoad(true);

    await fetch(`${url}/video`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${userDatax.access_token}`,
      },
    })
      .then((res) => res.json())
      .then((res2) => {
        setLoad(false);
        if (res2.success === true) {
          setData(res2.data);
        } else {
          ToastAndroid.show(res2.message, ToastAndroid.LONG);
        }
      })
      .catch((error) => {
        setLoad(false);
        alert("Something Went Wrong");
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        {/* videos */}
        {load === true ? (
          <ActivityIndicator size="large" color="black" />
        ) : data?.length < 1 || data === undefined ? (
          <View
            style={{
              width: "100%",
              marginTop: "30%",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: Colors.gray,
                fontSize: RFValue(12, 580),
                fontFamily: "Poppins-Regular",
              }}
            >
              --- Data Not Available ---
            </Text>
          </View>
        ) : (
          <View>
            {data.map((item, i) => (
              <View key={i} style={styles.TopeView}>
                <View style={styles.topView}>
                  <View style={styles.VideoView}>
                    <VideoPlayer
                      video={{
                        uri: `${item?.video_links[0]}`,
                      }}
                      filterEnabled={true}
                      videoWidth={1600}
                      videoHeight={900}
                      fullscreenAutorotate={false}
                      // thumbnail={Images.videoImage}
                      style={{
                        borderTopRightRadius: 16,
                        borderTopLeftRadius: 16,
                      }}
                    />
                  </View>
                  <View style={styles.BoxView}>
                    <View style={styles.rowboxmainview}>
                      <View style={styles.boxviewicon}>
                        <FontAwesome
                          name="circle"
                          style={{ color: "#979797" }}
                        />
                      </View>
                      <View style={{ width: "90%" }}>
                        <Text style={styles.boxtextstyle}>
                          Rate this class:
                        </Text>
                      </View>
                    </View>
                    {/*start star view*/}
                    <View style={styles.TopView}>
                      <View style={styles.topView}>
                        <View style={styles.starrow1view}>
                          <Pressable
                            onPress={() => oneInfo()}
                            style={styles.startView}
                          >
                            <AntDesign
                              name="star"
                              size={20}
                              color={one ? "#50555C" : "#fff"}
                            />
                          </Pressable>
                          <Pressable
                            onPress={() => twoInfo()}
                            style={styles.startView}
                          >
                            <AntDesign
                              name="star"
                              size={20}
                              color={two ? "#50555C" : "#fff"}
                            />
                          </Pressable>
                          <Pressable
                            onPress={() => threeInfo()}
                            style={styles.startView}
                          >
                            <AntDesign
                              name="star"
                              size={20}
                              color={three ? "#50555C" : "#fff"}
                            />
                          </Pressable>
                          <Pressable
                            onPress={() => fourInfo()}
                            style={styles.startView}
                          >
                            <AntDesign
                              name="star"
                              size={20}
                              color={four ? "#50555C" : "#fff"}
                            />
                          </Pressable>
                          <Pressable
                            onPress={() => fiveInfo()}
                            style={styles.startView}
                          >
                            <AntDesign
                              name="star"
                              size={20}
                              color={five ? "#50555C" : "#fff"}
                            />
                          </Pressable>
                        </View>
                      </View>
                    </View>
                    {/*end star view*/}
                    <View style={styles.rowboxmainview}>
                      <View style={styles.boxviewicon}>
                        <FontAwesome
                          name="circle"
                          style={{ color: "#979797" }}
                        />
                      </View>
                      <View style={{ width: "90%" }}>
                        <Text style={styles.boxtextstyle}>Trainer name:</Text>
                      </View>
                    </View>
                    {/*start*/}
                    <View style={styles.rowboxmainview}>
                      <View style={styles.boxviewicon} />
                      <View style={{ width: "90%" }}>
                        <Text style={styles.boxtextstyle}>
                          {item?.trainer?.personal?.name} (
                          {item.averageRating.toFixed(1)})
                        </Text>
                      </View>
                    </View>
                    {/*start */}
                    <View style={styles.rowboxmainview}>
                      <View style={styles.boxviewicon}>
                        <FontAwesome
                          name="circle"
                          style={{ color: "#979797" }}
                        />
                      </View>
                      <View style={{ width: "90%" }}>
                        <Text style={styles.boxtextstyle}>Topic:</Text>
                      </View>
                    </View>
                    {/*start */}
                    <View style={styles.rowboxmainview}>
                      <View style={styles.boxviewicon} />
                      <View style={{ width: "90%" }}>
                        <Text style={styles.boxtextstyle}>{item?.topic}</Text>
                      </View>
                    </View>
                    {/*start */}
                    <View style={styles.rowboxmainview}>
                      <View style={styles.boxviewicon}>
                        <FontAwesome
                          name="circle"
                          style={{ color: "#979797" }}
                        />
                      </View>
                      <View style={{ width: "90%" }}>
                        <Text style={styles.boxtextstyle}>Video Catagory:</Text>
                      </View>
                    </View>
                    {/*start */}
                    <View style={styles.rowboxmainview}>
                      <View style={styles.boxviewicon} />
                      <View style={{ width: "90%" }}>
                        <Text style={styles.boxtextstyle}>
                          {item?.video_category}
                        </Text>
                      </View>
                    </View>
                    {/*start */}
                    <View style={styles.rowboxmainview}>
                      <View style={styles.boxviewicon}>
                        <FontAwesome
                          name="circle"
                          style={{ color: "#979797" }}
                        />
                      </View>
                      <View style={{ width: "90%" }}>
                        <Text style={styles.boxtextstyle}>Price:</Text>
                      </View>
                    </View>
                    {/*start */}
                    <View style={styles.rowboxmainview}>
                      <View style={styles.boxviewicon} />
                      <View style={{ width: "90%" }}>
                        <Text style={styles.boxtextstyle}>{item?.price}</Text>
                      </View>
                    </View>
                    {/*start */}
                    <View style={styles.rowboxmainview}>
                      <View style={styles.boxviewicon}>
                        <FontAwesome
                          name="circle"
                          style={{ color: "#979797" }}
                        />
                      </View>
                      <View style={{ width: "90%" }}>
                        <Text style={styles.boxtextstyle}>Description:</Text>
                      </View>
                    </View>
                    {/*start */}
                    <View style={styles.rowboxmainview}>
                      <View style={styles.boxviewicon} />
                      <View style={{ width: "90%" }}>
                        <Text style={styles.boxtextstyle}>
                          {item?.video_details}.{" "}
                        </Text>
                      </View>
                    </View>
                    {/*start join class Btn*/}
                    <View style={styles.TopView}>
                      <View style={styles.topView}>
                        <View style={styles.rowView}>
                          <View style={styles.mainbtnView}>
                            <TouchableOpacity
                              onPress={() => {
                                if (loadxx === true) {
                                } else {
                                  setVideoId(item?._id);
                                  RattingReviews();
                                  setRating("");
                                  setOne(false);
                                  setTwo(false);
                                  setThree(false);
                                  setFour(false);
                                  setFive(false);
                                }
                              }}
                              style={styles.ccbtnview}
                            >
                              {loadxx === true ? (
                                <ActivityIndicator size="small" color="#fff" />
                              ) : (
                                <Text style={styles.btntextstyle}>
                                  Submit Review
                                </Text>
                              )}
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    </View>
                    {/*End join class Btn*/}
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}
        <View style={{ marginVertical: 20 }} />
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
    height: 120,
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
    height: 70,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  main: {
    width: "100%",
    marginTop: 15,
  },
  backgroundVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },

  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.29)",
  },
  TopView: {
    width: "100%",
    alignItems: "center",
  },
  TopeView: {
    width: "100%",
    alignItems: "center",
    marginVertical: 10,
  },
  topView: { width: "90%" },
  topView1: {
    width: "90%",
    alignItems: "center",
  },
  VideoView: {
    width: "100%",
    // height: 190,
  },
  toolbar: {
    marginTop: 30,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
  },
  mediaPlayer: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: "black",
    justifyContent: "center",
  },
  textvideostyle: {
    color: "#000000",
    fontSize: RFValue(30, 580),
    marginTop: 20,
    fontFamily: "Poppins-SemiBold",
  },
  BoxView: {
    width: "100%",
    backgroundColor: "#000",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingVertical: 15,
  },
  rowboxmainview: {
    width: "100%",
    flexDirection: "row",
  },
  boxviewicon: {
    width: "10%",
    alignItems: "center",
    marginTop: 5,
  },
  boxtextstyle: {
    color: "#ffffff",
    fontSize: RFValue(12, 580),
    fontFamily: "Poppins-Regular",
  },
  starrow1view: {
    width: "50%",
    flexDirection: "row",
  },
  startView: {
    left: 15,
    width: "18%",
  },
  mainbtnView: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#fff",
    marginTop: 15,
  },
  ccbtnview: {
    backgroundColor: "#ff0000",
    width: 140,
    height: 45,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  btntextstyle: {
    color: "#ffffff",
    fontSize: RFValue(10, 580),
    fontFamily: "Poppins-Regular",
  },
});

export default VideosForClasses;
