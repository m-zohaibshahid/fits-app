import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, StyleSheet, TextInput, ScrollView, Image, ActivityIndicator, Platform } from "react-native";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import { RFValue } from "react-native-responsive-fontsize";
import { url } from "../../constants/url";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Chat = ({ navigation }) => {
  const route = useRoute();
  const NextScreen = (item) => {
    navigation.navigate("EnterChatforTrainee", {
      roomId: item._id,
      receiverName: item.receiverName,
      senderName: item.senderName,
      reciverId: item.receiverId,
      receiverImage: item.receiver?.personal?.profileImage,
    });
  };
  const [data, setData] = useState([]);
  const [dumdata, setDumData] = useState([]);
  const [load, setLoad] = useState(false);
  const [token, setToken] = useState("");
  const [search, setSearch] = useState("");
  const [m, setM] = useState("");

  useEffect(() => {
    navigation.addListener("focus", () => {
      getUserInfo();
    });
  }, [getUserInfo]);

  const getUserInfo = async () => {
    const userData = await AsyncStorage.getItem("userData");
    let userDatax = JSON.parse(userData);
    setToken(userDatax?.access_token);
  };

  useEffect(() => {
    navigation.addListener("focus", () => {
      getMessages();
    });
  }, []);

  const getMessages = async () => {
    const userData = await AsyncStorage.getItem("userData");
    let userDatax = JSON.parse(userData);

    setLoad(true);

    await fetch(`${url}/chat/rooms`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${userDatax?.access_token}`,
      },
      body: JSON.stringify({
        all_rooms: true,
      }),
    })
      .then((res) => res.json())
      .then((res2) => {
        setLoad(false);
        if (res2.message === "rooms found") {
          // ToastAndroid.show("Done", ToastAndroid.LONG);
          setData(res2?.data?.rooms);
          setDumData(res2?.data?.rooms);
        } else {
          //Alert.alert(res2.errors);
        }
      })
      .catch((error) => {
        setLoad(false);
        Alert.alert("Something Went Wrong");
        console.log(error);
      });
  };
  const find = (t) => {
    const words = [...data];
    setSearch(t);
    if (t === "") {
      setM("");
      setData(dumdata);
    } else {
      const newData = words.filter((item) => {
        const itemData = `${item?.item?.toUpperCase()} ${item?.receiverName?.toUpperCase()}`;
        const textData = t?.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setData(newData);

      // if (newData[0] == null) {
      //   setM("1");
      // } else {
      //   setM("");
      // }
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.fixeheight1}>
          <View style={styles.TopView}>
            <View style={styles.topView}>
              <Text style={styles.chattext}>Chat</Text>
            </View>
          </View>

          <View style={styles.seacherbarmainView}>
            <View style={styles.seacherbariconview}>
              <EvilIcons name="search" size={40} style={{ color: "#fff" }} />
            </View>
            <View
              style={{
                width: "85%",
                justifyContent: "flex-end",
                //paddingTop: Platform.OS === 'ios' ? 13 : 5,
              }}
            >
              <TextInput
                numberOfLines={1}
                placeholder="Search... "
                placeholderTextColor={"#fff"}
                value={search}
                onChangeText={(e) => {
                  find(e);
                }}
                style={{
                  color: "#fff",
                  height: 42,
                  fontFamily: "Poppins-Regular",
                  fontSize: RFValue(14, 580),
                  paddingTop: -5,
                }}
              />
            </View>
          </View>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.main}>
          {/*Chat start */}
          <View style={styles.TopView}>
            {/*start*/}
            {load === true ? (
              <View
                style={{
                  width: "100%",
                  marginTop: 100,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ActivityIndicator size="large" color="black" />
              </View>
            ) : data[0] == null ? (
              <View
                style={{
                  width: "100%",
                  marginTop: 100,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    fontFamily: "Poppins-Regular",
                    fontSize: RFValue(12, 580),
                  }}
                >
                  Room not available
                </Text>
              </View>
            ) : (
              <View>
                {data?.map((item, i) => (
                  <View
                    style={{
                      width: "100%",
                      borderTopWidth: 1,
                      borderBottomWidth: 1,
                      paddingVertical: 10,
                      borderColor: "grey",
                    }}
                    key={i}
                  >
                    <View style={styles.chatmainview}>
                      <View style={{ width: "20%", justifyContent: "center" }}>
                        <Image
                          style={{
                            width: 65,
                            height: 65,
                            borderRadius: 200 / 2,
                          }}
                          source={{
                            uri: `${item?.receiver?.personal?.profileImage}`,
                          }}
                        />
                      </View>
                      <TouchableOpacity onPress={() => NextScreen(item)} style={styles.touchview}>
                        <Text style={styles.nametext}>{item.receiverName}</Text>

                        <Text style={styles.inertextstyles}>{item.lastMessage}</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
              </View>
            )}
            <View style={{ marginBottom: 40 }} />
            {/*end*/}
          </View>
          {/*Chat end */}
        </View>
      </ScrollView>
      <View style={styles.footer} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "ios" ? 40 : 0,
    paddingBottom: Platform.OS === "ios" ? 0 : 0,
  },
  header: {
    width: "100%",
    height: 175,
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
    height: 175,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  main: {
    width: "100%",
    backgroundColor: "#fff",
  },
  footer: {
    width: "100%",
    marginBottom: 0,
    bottom: 0,
    justifyContent: "center",
    position: "absolute",
    backgroundColor: "#fff",
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
  chattext: {
    color: "#000000",
    fontSize: RFValue(30, 580),
    marginTop: 10,
    fontFamily: "Poppins-Bold",
  },
  seacherbarmainView: {
    width: "90%",
    backgroundColor: "#000",
    height: 55,
    borderRadius: 10,
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
  },
  seacherbariconview: {
    width: "15%",
    alignItems: "center",
    justifyContent: "center",
  },
  chatmainview: {
    width: "90%",
    alignSelf: "center",
    flexDirection: "row",
    height: 98,
  },
  touchview: {
    width: "80%",
    paddingLeft: 4,
    justifyContent: "center",
  },
  nametext: {
    fontSize: RFValue(16, 580),
    fontFamily: "Poppins-Bold",
    color: "#000",
  },
  inertextstyles: {
    fontSize: RFValue(12, 580),
    fontFamily: "Poppins-Regular",
    color: "#000",
  },
});

export default Chat;
