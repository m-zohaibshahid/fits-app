import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Pressable,
  ToastAndroid,
  ActivityIndicator,
  TouchableOpacity,
  Platform,
  Linking,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { RFValue } from "react-native-responsive-fontsize";
import Header from "../../../Components/Header";
import Button from "../../../Components/Button";
import { url } from "../../../constants/url";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const WalletScreen = ({ navigation }) => {
  const [details, setDetails] = useState(false);
  const [load, setLoad] = useState(false);

  const [email, setEmail] = useState("");
  const [cardData, setCardData] = useState();
  const userMe = async () => {
    setLoad(true);
    const userData = await AsyncStorage.getItem("userData");
    let userDatax = JSON.parse(userData);
    if (userDatax) {
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
          if (res2?.success === true) {
            getStripeCard(res2?.stripe?.customer.id);
            setEmail(res2?.user?.email);
          } else {
            console.log(res2?.message);
          }
        })
        .catch((error) => {
          setLoad(false);
          console.log(error);
        });
    }
  };

  const getStripeCard = async (id) => {
    setLoad(true);
    const userData = await AsyncStorage.getItem("userData");
    let userDatax = JSON.parse(userData);
    if (userDatax) {
      await fetch(`${url}/stripe/customer/${id}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${userDatax?.access_token}`,
        },
      })
        .then((res) => res.json())
        .then((res2) => {
          setLoad(false);
          if (res2?.message === "Stripe Customer Found Successfully!") {
            setCardData(res2?.data);
          } else {
            console.log("mesage==>", res2?.message);
          }
        })
        .catch((error) => {
          setLoad(false);
          console.log(error);
        });
    }
  };

  const Payout = async () => {
    const userData = await AsyncStorage.getItem("userData");
    let userDatax = JSON.parse(userData);
    setLoad(true);
    await fetch(`${url}/stripe/connect/accountLink`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${userDatax?.access_token}`,
      },
      body: JSON.stringify({
        email: email,
      }),
    })
      .then((res) => res.json())
      .then((res2) => {
        setLoad(false);
        Linking.openURL(res2?.data?.url);
      })
      .catch((error) => {
        setLoad(false);
        console.log(error);
        Toast.show({
          type: "error",
          text1: "Something went wrong",
        });
      });
  };

  // Effects
  useEffect(() => {
    navigation.addListener("focus", () => {
      userMe();
    });
  }, []);
  return (
    <View style={styles.container}>
      <Header label={"Wallet"} navigation={navigation} />
      {load ? (
        <ActivityIndicator color="#000" size="large" />
      ) : (
        <View style={styles.container}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {/*start Totale */}
            <View style={styles.TopView}>
              <View style={styles.walletboxView}>
                <View style={styles.TopView}>
                  <View style={styles.walletboxtextview}>
                    <Text style={styles.tbtextstyle}>Total balance</Text>
                    <Text
                      style={{
                        color: "#fff",
                        fontSize: RFValue(20, 580),
                        fontFamily: "Poppins-Bold",
                      }}
                    >
                      $ {cardData?.balance}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            {/*end total */}
            {/*start Income */}
            <View
              style={{
                width: "100%",
                alignItems: "center",
                marginTop: 20,
              }}
            >
              <View style={{ width: "90%" }}>
                <Text
                  style={{
                    color: "#000",
                    fontSize: RFValue(20, 580),
                    fontFamily: "Poppins-Bold",
                  }}
                >
                  Transactions Details
                </Text>
              </View>
            </View>
            {/*start Totale */}
            <View style={styles.TopView}>
              <View style={styles.marchmainview}>
                <View style={styles.marchmainview2}>
                  <View style={{ width: "25%", alignItems: "center" }}>
                    <Text style={styles.marchtext}>5-March</Text>
                  </View>
                  <View
                    style={{
                      width: "5%",
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{
                        width: 2,
                        height: 50,
                        backgroundColor: "#fff",
                      }}
                    ></View>
                  </View>
                  <View style={{ width: "35%", flexDirection: "column" }}>
                    <Text style={styles.marchtext}>
                      Yoga Defence {"\n"}
                      <Text
                        style={{
                          color: "#fff",
                          fontSize: RFValue(10, 580),
                          fontFamily: "Poppins-Regular",
                        }}
                      >
                        5 PM - 6 PM
                      </Text>
                    </Text>
                  </View>
                  <Pressable
                    onPress={() => setDetails(!details)}
                    style={{
                      width: "30%",
                      backgroundColor: "#414143",
                      alignItems: "center",
                      borderRadius: 12,
                      height: 50,
                      justifyContent: "center",
                    }}
                  >
                    <View
                      style={{
                        width: "100%",
                        alignItems: "center",
                        flexDirection: "row",
                      }}
                    >
                      <View style={{ width: "80%", justifyContent: "center" }}>
                        <Text
                          style={{
                            color: "#fff",
                            fontSize: RFValue(14, 580),
                            fontFamily: "Poppins-Regular",
                            textAlign: "center",
                          }}
                        >
                          Details
                        </Text>
                      </View>
                      <AntDesign
                        name={details ? "up" : "down"}
                        size={15}
                        color={"#fff"}
                      />
                    </View>
                  </Pressable>
                </View>
                {/*end Yoga */}
                {details && (
                  <View style={{ width: "100%", paddingBottom: 18 }}>
                    <View style={styles.dotmainview}>
                      <View style={styles.dotview}>
                        <FontAwesome
                          name="circle"
                          style={{ color: "#979797" }}
                        />
                      </View>
                      <View style={{ width: "90%" }}>
                        <Text style={styles.textstyle}>
                          Type: Online session
                        </Text>
                      </View>
                    </View>
                    <View style={styles.dotmainview}>
                      <View style={styles.dotview}>
                        <FontAwesome
                          name="circle"
                          style={{ color: "#979797" }}
                        />
                      </View>
                      <View style={{ width: "90%", flexDirection: "row" }}>
                        <Text style={styles.textstyle}>
                          Cost: $48 (per person)
                        </Text>
                      </View>
                    </View>
                    <View style={styles.dotmainview}>
                      <View style={styles.dotview}>
                        <FontAwesome
                          name="circle"
                          style={{ color: "#979797" }}
                        />
                      </View>
                      <View style={{ width: "90%" }}>
                        <Text style={styles.textstyle}>
                          28 people attend this sessions
                        </Text>
                      </View>
                    </View>
                    <View style={styles.dotmainview}>
                      <View style={styles.dotview}>
                        <FontAwesome
                          name="circle"
                          style={{ color: "#979797" }}
                        />
                      </View>
                      <View style={{ width: "90%" }}>
                        <Text style={styles.textstyle}>
                          Total Income: $ 1344
                        </Text>
                      </View>
                    </View>
                    <View style={styles.dotmainview}>
                      <View style={styles.dotview}>
                        <FontAwesome
                          name="circle"
                          style={{ color: "#979797" }}
                        />
                      </View>
                      <View style={{ width: "90%" }}>
                        <Text style={styles.textstyle}>App Fees: $ 150</Text>
                      </View>
                    </View>
                  </View>
                )}
              </View>
            </View>
            {/*end total */}
            <View style={{ marginVertical: 10 }}></View>
          </ScrollView>
          <View style={styles.footer}>
            <View style={styles.TopView}>
              {
                <Button
                  label={"Withdraw Funds"}
                  onPress={() => navigation.navigate("WalletForTrainee")}
                />
              }
            </View>
          </View>
        </View>
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
    // alignItems: 'center',
  },
  main: {
    width: "100%",
  },
  footer: {
    width: "100%",
    marginBottom: 0,
    bottom: 0,
    justifyContent: "center",
    position: "absolute",
    backgroundColor: "#fff",
  },
  backTopView: {
    width: "100%",
    alignItems: "center",
    marginTop: 20,
  },
  backtopviews: {
    width: "90%",
    flexDirection: "row",
  },
  widthViewsback: {
    width: "10%",
    justifyContent: "center",
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
  walletsText: {
    fontFamily: "Poppins-Bold",
    fontSize: RFValue(24, 580),
    color: "#000",
  },
  walletboxView: {
    width: "90%",
    backgroundColor: "#000",
    height: 170,
    justifyContent: "center",
    borderRadius: 14,
  },
  walletboxtextview: {
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
  },
  tbtextstyle: {
    color: "#fff",
    fontSize: RFValue(20, 580),
    fontFamily: "Poppins-Bold",
  },
  textstyle: {
    color: "#fff",
    fontSize: RFValue(12, 580),
    fontFamily: "Poppins-Regular",
  },
  dotmainview: {
    width: "100%",
    // borderWidth:1,
    borderColor: "#fff",
    flexDirection: "row",
    marginTop: 10,
  },
  dotview: {
    width: "10%",
    alignItems: "center",
    marginTop: 5,
  },
  marchmainview: {
    width: "90%",
    backgroundColor: "#000",
    justifyContent: "center",
    borderRadius: 12,
    marginTop: 20,
  },
  marchmainview2: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 9,
    flexDirection: "row",
  },
  marchtext: {
    color: "#fff",
    fontSize: RFValue(12, 580),
    fontFamily: "Poppins-SemiBold",
  },
  perText: {
    color: "#979797",
    fontSize: RFValue(9, 580),
    fontFamily: "Poppins-Regular",
  },
  TopView: {
    width: "100%",
    alignItems: "center",
  },
  footer: {
    width: "100%",
    marginBottom: 0,
    bottom: 10,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    backgroundColor: "#fff",
  },
});

export default WalletScreen;
