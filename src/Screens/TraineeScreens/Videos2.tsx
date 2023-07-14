import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Modal, ScrollView, ToastAndroid } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { RFValue } from "react-native-responsive-fontsize";
import VideoPlayer from "react-native-video-player";
import Button from "../../Components/Button";
import { useRoute } from "@react-navigation/native";
import { url } from "../../constants/url";

const Videos2 = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState("");
  const [subscribedVideos, setSubscribedVideos] = useState([]);
  const route = useRoute();

  const getSubscribedVideo = async () => {
    const userData = await AsyncStorage.getItem("userData");
    let userDatax = JSON.parse(userData);
    JSON.stringify(setSubscribedVideos([]));

    if (userDatax) {
      await fetch(`${url}/subscription/videos/${userDatax?.data?._id}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${userDatax?.access_token}`,
        },
      })
        .then((res) => res.json())
        .then((res2) => {
          if (res2.success) {
            JSON.stringify(setSubscribedVideos(res2?.data?.video_links));
          }
        })
        .catch((error) => {
          ToastAndroid("errrrror");
        });
    }
  };

  const getAllVideos = async () => {
    const userTokendata = await AsyncStorage.getItem("userData");
    let userTokendatax = JSON.parse(userTokendata);

    fetch(`${url}/video`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${userTokendatax?.access_token}`,
      },
    })
      .then((res) => res.json())
      .then((res2) => {
        if (res2.success) {
          setData(res2.data);
        } else {
          ToastAndroid.show(res2.message, ToastAndroid.LONG);
        }
      });
  };

  const NextScreen = (price, video_links) => {
    navigation.navigate("BookSessionPayment", { item: price, video_links });
  };

  useEffect(async () => {
    getSubscribedVideo();
    getAllVideos();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.TopView}>
          <View style={styles.topView}>
            <Text style={styles.VideoboughtText}>Videos bought from you</Text>
          </View>
        </View>
      </View>
      <View style={styles.main}>
        <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
          {/*start image Box*/}
          {data?.length > 0 &&
            data?.map((item, i) => {
              return (
                <View style={styles.boxView}>
                  <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", margin: 7 }}>
                    <View style={styles.ratingWrap}>
                      <Text style={{ marginTop: 3 }}>
                        <FontAwesome name="star" style={{ color: "#fff", fontSize: 16 }} />
                      </Text>
                      <View>
                        <Text style={{ color: "white", fontSize: 17, marginLeft: 4 }}>{item.averageRating}</Text>
                      </View>
                    </View>
                    <View style={styles.priceWrap}>
                      <Text style={{ color: "white", fontSize: 20 }}>$</Text>
                      <View>
                        <Text style={{ color: "white", marginLeft: 5, fontSize: 20 }}>{item.price}</Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.VideoView}>
                    {subscribedVideos?.length > 0 && subscribedVideos.includes(item?.video_links[0]) ? (
                      <View>
                        <VideoPlayer
                          video={{
                            uri: `${item.video_links[0]}`,
                          }}
                          filterEnabled={true}
                          videoWidth={900}
                          videoHeight={500}
                          thumbnail={{
                            uri: item?.video_thumbnail ?? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtLvJBFarEabFbaBsDwn429BPEnnDmaon2JA&usqp=CAU",
                          }}
                          style={{
                            borderTopRightRadius: 16,
                            borderTopLeftRadius: 16,
                          }}
                        />
                      </View>
                    ) : (
                      <View pointerEvents="none">
                        <VideoPlayer
                          video={{
                            uri: `${item.video_links[0]}`,
                          }}
                          filterEnabled={true}
                          videoWidth={900}
                          videoHeight={500}
                          thumbnail={{
                            uri: item?.video_thumbnail ?? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtLvJBFarEabFbaBsDwn429BPEnnDmaon2JA&usqp=CAU",
                          }}
                          style={{
                            borderTopRightRadius: 16,
                            borderTopLeftRadius: 16,
                          }}
                        />
                      </View>
                    )}

                    <View style={styles.rowView}>
                      <View
                        style={{
                          width: "10%",
                          alignItems: "center",
                        }}
                      >
                        <FontAwesome name="circle" style={{ color: "#fff" }} />
                      </View>
                      <View style={{ width: "90%" }}>
                        <Text style={styles.desTextStyles}>Description:</Text>
                      </View>
                    </View>
                    <View style={styles.rowView}>
                      <View
                        style={{
                          width: "10%",
                          alignItems: "center",
                        }}
                      ></View>
                      <View style={{ width: "90%" }}>
                        <Text style={styles.destTextStyles}>{item.video_details} </Text>
                        {subscribedVideos?.length > 0 && subscribedVideos.includes(item?.video_links[0]) ? (
                          <View style={styles.btnBook}>
                            <Button label="Book Now" onPress={() => setModalVisible(true)} />
                          </View>
                        ) : (
                          <View style={styles.btnBook}>
                            <Button label="Booked" disabled={true} onPress={() => setModalVisible(true)} />
                          </View>
                        )}
                      </View>
                    </View>
                  </View>
                  <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
                    <View style={styles.modalView}>
                      <View>
                        <Text style={{ marginTop: 50, marginBottom: 30, fontSize: 20, color: "black" }}>Are You Sure , You want to Buy this Video?</Text>
                      </View>
                      <Button label="Skip" onPress={() => setModalVisible(false)} />
                      <Button label="Continue" onPress={() => NextScreen(item.price, item.video_links)} />
                    </View>
                  </Modal>
                </View>
              );
            })}
        </ScrollView>
      </View>
    </View>
  );
};
export default Videos2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    marginBottom: 20,
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
    alignItems: "center",
  },
  VideoboughtText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: RFValue(15, 580),
    color: "#000",
    marginTop: 10,
  },
  rowView: {
    width: "100%",
    flexDirection: "row",
    alignItems: "baseline",
  },
  desTextStyles: {
    color: "#ffffff",
    fontSize: RFValue(12, 580),
    fontFamily: "Poppins-Regular",
  },
  destTextStyles: {
    color: "#ffffff",
    fontSize: RFValue(12, 580),
    fontFamily: "Poppins-Regular",
    marginBottom: 10,
  },
  lockbtn: {
    position: "absolute",
    top: 30,
    left: 125,
  },
  ratingWrap: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "black",
    paddingLeft: 15,
    paddingRight: 15,
    paddingVertical: 4,
    borderRadius: 20,
  },
  priceWrap: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "black",
    paddingLeft: 15,
    paddingRight: 15,
    paddingVertical: 4,
    borderRadius: 20,
  },
  boxView: {
    width: 320,
    backgroundColor: "#000",
    margin: 9,
    borderRadius: 14,
  },
  VideoView: {
    width: 320,
    height: 350,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  btnBook: {
    width: "60%",
    textAlign: "center",
    padding: 12,
    flex: 1,
    alignItems: "center",
    marginLeft: 40,
    borderRadius: 5,
    fontSize: 20,
  },
  btnBookDisabled: {
    width: "60%",
    textAlign: "center",
    padding: 12,
    flex: 1,
    marginTop: 45,
    alignItems: "center",
    marginLeft: 40,
    borderRadius: 5,
    fontSize: 20,
  },
  row11View: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 80,
  },
  mainbtnView: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#fff",
  },
  ccbtnview: {
    backgroundColor: "#ff0000",
    width: 100,
    height: 45,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  btntextstyle: {
    color: "#fff",
    fontSize: RFValue(10, 580),
    fontFamily: "Poppins-Regular",
  },
});
