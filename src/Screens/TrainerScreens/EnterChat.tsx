import React, { useState, useEffect, useRef } from "react";
import { Text, View, Button, ImageBackground, TouchableOpacity, StyleSheet, TextInput, ScrollView, Image, Modal, ToastAndroid, ActivityIndicator, Platform } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { heightPercentageToDP } from "react-native-responsive-screen";
import * as Images from "../../constants/Images";
import { url } from "../../constants/url";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";

const EnterChat = ({ navigation }) => {
  const scrollViewRef = useRef();

  const route = useRoute();

  const [id, setId] = useState(route.params.roomId);

  const [data, setData] = useState();
  const [load, setLoad] = useState(false);
  const [loade, setLoade] = useState(false);
  const [token, setToken] = useState("");
  const [trainerId, setTrainerId] = useState("");

  const [mesage, setMesage] = useState("");

  useEffect(() => {
    navigation.addListener("focus", () => {
      getUserInfo();
    });
  }, [getUserInfo]);
  useEffect(() => {
    GetMesaage();
  }, [GetMesaage]);

  useEffect(() => {
    if (route?.params?.roomId == "") {
    } else {
      const interval = setInterval(() => {
        GetMesaage();
      }, 1000);
      // setLoading(true);
      return () => clearInterval(interval);
    }
  }, [id]);

  const GetMesaage = async () => {
    const userData = await AsyncStorage.getItem("userData");
    let userDatax = JSON.parse(userData);
    setLoade(true);
    await fetch(`${url}/chat/message/${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${userDatax?.access_token}`,
      },
    })
      .then((res) => res.json())
      .then((res2) => {
        setLoade(false);
        if (res2.message === "messages found") {
          setData(res2?.data?.messages);
        }
        if (res2.message === "messages not found") {
          setData(res2?.data?.messages);
        } else {
          // ToastAndroid.show(res2.message, ToastAndroid.LONG);
        }
      })
      .catch((error) => {
        setLoade(false);
        Alert.alert("Something Went Wrong");
      });
  };

  const getUserInfo = async () => {
    const userData = await AsyncStorage.getItem("userData");
    let userDatax = JSON.parse(userData);
    setToken(userDatax?.access_token);
    setTrainerId(userDatax?.data?._id);
  };

  const CreateMessage = async () => {
    if (mesage === "") {
      ToastAndroid.show("Please Enter Message.", ToastAndroid.SHORT);
    } else {
      setLoad(true);
      await fetch(`${url}/chat/message/create`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          mes: mesage,
          sname: route?.params?.senderName,
          rid: route?.params?.reciverId,
          roomId: route?.params?.roomId,
        }),
      })
        .then((res) => res.json())
        .then((res2) => {
          setLoad(false);
          if (res2.message === "Message sent successfully..") {
          } else {
            // ToastAndroid.show(res2.message, ToastAndroid.LONG);
          }
        })
        .catch((error) => {
          setLoad(false);
          Alert.alert("Something Went Wrong");
        });
    }
  };

  return (
    <View style={styles.container}>
      {/*start Hader*/}
      <View style={styles.hader}>
        <View style={styles.TopView}>
          <View style={styles.topView}>
            <View
              style={{
                width: "100%",
                alignItems: "center",
                marginTop: 15,
                flexDirection: "row",
              }}
            >
              <View style={{ width: "10%", justifyContent: "center" }}>
                <AntDesign
                  onPress={() => navigation.goBack("")}
                  name="arrowleft"
                  size={25}
                  style={{
                    color: "#130F26",
                  }}
                />
              </View>
              <View
                style={{
                  width: "20%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  style={{
                    width: 45,
                    height: 45,
                    borderRadius: 200 / 2,
                  }}
                  source={{
                    uri: `${route?.params?.Image}`,
                  }}
                />
              </View>
              <View style={{ width: "60%" }}>
                <Text
                  style={{
                    fontSize: RFValue(16, 580),
                    fontFamily: "Poppins-SemiBold",
                    color: "#000",
                  }}
                >
                  {route.params.senderName}
                </Text>
                <View style={{ width: "55%", justifyContent: "center" }}>
                  <Text
                    style={{
                      fontSize: RFValue(8, 580),
                      fontFamily: "Poppins-Regular",
                      color: "#000",
                      left: 4,
                      textAlign: "left",
                    }}
                  >
                    Active 10m ago
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
      {/*End Hader*/}
      {/*start Main*/}
      <View style={styles.main}>
        <ScrollView showsVerticalScrollIndicator={false} ref={scrollViewRef} onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}>
          {data?.map((item, i) => (
            <View key={i}>
              {/* chat Start react*/}
              {trainerId === item?.senderId ? (
                <View
                  style={{
                    width: "100%",
                    flexDirection: "row",
                    marginVertical: 10,
                  }}
                >
                  <View
                    style={{
                      width: "20%",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  ></View>
                  <View
                    style={{
                      width: "80%",
                      alignItems: "flex-start",
                      justifyContent: "center",
                    }}
                  >
                    <View
                      style={{
                        width: "90%",
                        backgroundColor: "#000",
                        padding: 5,
                        borderTopLeftRadius: 16,
                        borderBottomLeftRadius: 16,
                        borderTopRightRadius: 16,
                        paddingLeft: 14,
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "Poppins-Regular",
                          color: "#fff",
                          fontSize: RFValue(11, 580),
                          textAlign: "auto",
                        }}
                      >
                        {item.message}
                      </Text>
                      <View style={{ flexDirection: "row", width: "95%" }}>
                        <View style={{ width: "100%", alignItems: "flex-end" }}>
                          <Text style={{ color: "white" }}>{moment(item.createdAt).format("hh:mm a")}</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              ) : (
                <View
                  style={{
                    width: "100%",
                    flexDirection: "row",
                    marginVertical: 10,
                  }}
                >
                  <View
                    style={{
                      width: "80%",
                      alignItems: "flex-end",
                      justifyContent: "center",
                    }}
                  >
                    <View
                      style={{
                        width: "90%",
                        backgroundColor: "#FF0000",
                        padding: 5,
                        borderTopLeftRadius: 16,
                        borderTopRightRadius: 16,
                        borderBottomRightRadius: 16,
                        paddingLeft: 14,
                      }}
                    >
                      <Text
                        style={{
                          color: "#fff",
                          fontFamily: "Poppins-Regular",
                          fontSize: RFValue(11, 580),
                          textAlign: "auto",
                        }}
                      >
                        {item.message}
                      </Text>
                      <View style={{ flexDirection: "row", width: "95%" }}>
                        <View style={{ width: "100%", alignItems: "flex-end" }}>
                          <Text style={{ color: "white" }}>{moment(item.createdAt).format("hh:mm a")}</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                  <View
                    style={{
                      width: "20%",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  ></View>
                </View>
              )}
            </View>
          ))}
          <View style={{ marginBottom: 140 }}></View>
        </ScrollView>
      </View>
      {/*footer*/}
      <View style={styles.footer}>
        <View style={styles.topView}>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                width: "15%",
                justifyContent: "center",
                alignItems: "flex-start",
              }}
            >
              <View
                style={{
                  width: 50,
                  height: 50,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 12,
                  backgroundColor: "#F5F5F5",
                }}
              >
                <AntDesign name="plus" color={"#000"} size={20} />
              </View>
            </View>
            <View
              style={{
                width: "85%",
                justifyContent: "center",
                alignItems: "flex-end",
              }}
            >
              <View
                style={{
                  width: "96%",
                  flexDirection: "row",
                  backgroundColor: "#F5F5F5",
                  height: 50,
                  borderRadius: 12,
                }}
              >
                <View
                  style={{
                    width: "80%",
                    justifyContent: "center",
                  }}
                >
                  <TextInput
                    placeholder="Aa"
                    placeholderTextColor="black"
                    style={{
                      width: "100%",
                      fontFamily: "Poppins-Regular",
                      alignItems: "center",
                      left: 5,
                      fontSize: RFValue(16, 580),
                    }}
                    value={mesage}
                    onChangeText={setMesage}
                  />
                </View>
                <View
                  style={{
                    width: "20%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      CreateMessage();
                      setMesage("");
                    }}
                  >
                    {load === true ? <ActivityIndicator size="small" color="black" /> : <FontAwesome name="send" size={25} color={"#000"} />}
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
      {/* end*/}
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
  hader: {
    width: "100%",
  },
  main: {
    width: "100%",
    marginTop: 40,
  },
  footer: {
    width: "100%",
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    backgroundColor: "white",
    paddingVertical: 10,
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
});
export default EnterChat;
