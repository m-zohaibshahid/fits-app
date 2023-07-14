import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, ScrollView, Pressable, ActivityIndicator, Platform } from "react-native";
import moment from "moment";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { RFValue } from "react-native-responsive-fontsize";
import Header from "../../Components/Header";
import { url } from "../../constants/url";
import Button from "../../Components/Button";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { useSelector } from "react-redux";
import { UserDetail, UserDetailInfoInterface, UserInterface } from "../../interfaces";
import { useBookASessionMutation, useGetUserMeQuery } from "../../slice/FitsApi.slice";

type RootStackParamList = {
  BookSessionPaymentScreen: BookSessionPaymentParams;
  // Define other screens and their respective route params here
};

type BookSessionPaymentParams = {
  data: any;
};

const BookSessionPayment = () => {
  const navigation = useNavigation();
  const [details, setDetails] = useState(false);
  const [load, setLoad] = useState(false);
  const [cardData, setCardData] = useState();
  const [senderId, setSenderId] = useState();
  const route = useRoute<RouteProp<RootStackParamList, "BookSessionPaymentScreen">>();
  const bookSessionParams = route?.params?.data;
  const reciverId = bookSessionParams.userData?.user?.cus_id;
  const token = useSelector((state: { token: string }) => state.token);
  const { data, isLoading, error, isSuccess } = useGetUserMeQuery({});
  const [bookASession] = useBookASessionMutation();

  const userMe = async () => {
    setLoad(true);
    if (data?.success) {
      getStripeCard(data?.stripe?.card?.customer);
      setSenderId(data?.stripe?.card?.customer);
    }
  };

  const getStripeCard = async (id: string) => {
    setLoad(true);

    await fetch(`${url}/stripe/customer/${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      // .then((res) => res.json())

      .then((res2) => {
        setLoad(false);
        if (res2?.success) {
          setCardData(res2?.data);
        }
      })
      .catch(() => {
        setLoad(false);
      });
  };
  const BookASession = async () => {
    // await fetch(`${url}/book-a-session`, {
    //   method: "POST",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${userInfo?.access_token}`,
    //   },
    //   body: JSON.stringify({
    //     sessionId: route?.params?.data?.sessionId,
    //     trainerId: route?.params?.data?.trainerId,
    //   }),
    // })
    const body = {
      sessionId: route?.params?.data?.sessionId,
      trainerId: route?.params?.data?.trainerId,
    };
    bookASession(body)
      .then((res2) => {
        if (res2.data.success) {
          setLoad(false);
          navigation.navigate("Home");
          Toast.show({
            type: "success",
            text1: "Session booked successfully",
          });
        } else {
          setLoad(false);
          Toast.show({
            type: "error",
            text1: "Something went wrong",
          });
        }
      })
      .catch(() => {
        setLoad(false);
        Toast.show({
          type: "error",
          text1: "Something went wrong",
        });
      });
  };

  const transferPayment = async () => {
    setLoad(true);
    const userData = await AsyncStorage.getItem("userData");
    let userDatax = JSON.parse(userData);
    await fetch(`${url}/stripe/transfer`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${userDatax?.access_token}`,
      },
      body: JSON.stringify({
        sender: senderId,
        reciver: reciverId,
        currency: "usd",
        amount: -cost,
        subamount: cost,
      }),
    })
      .then((res) => res.json())
      .then((res2) => {
        if (res2?.reciver && res2?.sender) {
          BookASession();
        } else {
          Toast.show({
            type: error,
            text1: "Something went Wrong",
          });
        }
      });
  };
  // Effects
  useEffect(() => {
    navigation.addListener("focus", () => {
      userMe();
    });
  }, []);
  console.log("cardData", cardData, data?.stripe?.card?.customer);
  let wallet = Number(cardData?.balance === undefined ? 0 : cardData?.balance);
  let cost = Number(bookSessionParams.userData?.price);
  let balance = Number(wallet - cost);
  return (
    <View style={styles.container}>
      <Header label={"Payment"} subLabel={"Pay before the class starts"} navigation={navigation} doubleHeader={true} />
      <ScrollView showsVerticalScrollIndicator={false} style={styles.main}>
        {/*start Totale */}
        {load ? (
          <View style={{ marginTop: 30 }}>
            <ActivityIndicator color="red" size="large" />
          </View>
        ) : (
          <>
            <View style={styles.TopView}>
              <View style={styles.marchmainview}>
                <View style={styles.marchmainview2}>
                  <View style={{ width: "25%", alignItems: "center" }}>
                    <Text style={styles.marchtext}>
                      {moment(bookSessionParams.userData?.select_date).format("DD ")}
                      {moment(bookSessionParams.userData?.select_date).format("MMMM")}
                    </Text>
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
                    <Text style={styles.marchtext}>{bookSessionParams.userData?.category}</Text>
                    <Text
                      style={{
                        color: "#fff",
                        fontSize: RFValue(10, 580),
                        fontFamily: "Poppins-Regular",
                      }}
                    >
                      {bookSessionParams.userData?.class_time.slice(0, 10)}
                    </Text>
                  </View>
                  <Pressable
                    onPress={() => setDetails(!details)}
                    style={{
                      width: "30%",
                      backgroundColor: "#414143",
                      alignItems: "center",
                      borderRadius: 10,
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
                      <AntDesign name={details ? "up" : "down"} size={15} color={"#fff"} />
                    </View>
                  </Pressable>
                </View>
                {/*end Yoga */}
                {details && (
                  <View style={{ width: "100%", paddingBottom: 18 }}>
                    <View style={{ width: "90%" }}>
                      <View style={styles.dotmainview}>
                        <View style={styles.dotview}>
                          <FontAwesome name="circle" style={{ color: "#979797" }} />
                        </View>
                        <View style={{ width: "90%" }}>
                          <Text style={styles.textstyle}>
                            Type:{"\n"} {bookSessionParams.userData?.session_type.type}
                          </Text>
                        </View>
                      </View>
                      <View style={styles.dotmainview}>
                        <View style={styles.dotview}>
                          <FontAwesome name="circle" style={{ color: "#979797" }} />
                        </View>
                        <View style={{ width: "90%" }}>
                          <Text style={styles.textstyle}>
                            Cost: {"\n"}$ {bookSessionParams.userData?.price}
                          </Text>
                        </View>
                      </View>
                      <View style={styles.dotmainview}>
                        <View style={styles.dotview}>
                          <FontAwesome name="circle" style={{ color: "#979797" }} />
                        </View>
                        <View style={{ width: "90%" }}>
                          <Text style={styles.textstyle}>
                            Trainee name:{"\n"}
                            {bookSessionParams.personalData.check.name}
                          </Text>
                        </View>
                      </View>
                      <View style={styles.dotmainview}>
                        <View style={styles.dotview}>
                          <FontAwesome name="circle" style={{ color: "#979797" }} />
                        </View>
                        <View style={{ width: "90%" }}>
                          <Text style={styles.textstyle}>
                            Description:{"\n"}
                            {cardData?.description}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                )}
              </View>
            </View>
            {/*end total */}

            <View style={styles.TopView}>
              <View style={styles.topView}>
                {/*start pay*/}
                <View style={styles.rowView}>
                  <View style={styles.totalView}>
                    <Text style={styles.totalText}>Total Cost</Text>
                  </View>
                  <View style={styles.$10View}>
                    <Text style={styles.totalText}>$ {bookSessionParams.userData?.price}</Text>
                  </View>
                </View>
                {/*end pay*/}
                {/*start pay*/}
                <View style={styles.rowView}>
                  <View style={styles.totalView}>
                    <Text style={styles.walletText}>Wallet</Text>
                  </View>
                  <View style={styles.$10View}>
                    <Text style={styles.walletText}>$ {wallet}</Text>
                  </View>
                </View>
                <View style={styles.rowView}>
                  <View style={styles.totalView}>
                    <Text style={styles.walletText}>Balance</Text>
                  </View>
                  <View style={styles.$10View}>
                    <Text style={styles.walletText}>$ {balance}</Text>
                  </View>
                </View>
                {/*end pay*/}
              </View>
            </View>
            <View style={{ paddingVertical: 40 }}></View>
          </>
        )}
      </ScrollView>
      <View style={styles.footer}>
        <View style={styles.TopView}>
          <Button
            disabled={load}
            loader={load}
            navigation={navigation}
            label={wallet < cost ? "Please Recharge" : "Pay Now"}
            onPress={() => {
              if (wallet > cost) {
                transferPayment();
              } else {
                Toast.show({
                  type: "error",
                  text1: "Please recharge account",
                });
              }
            }}
          />
        </View>
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
    height: "100%",
    paddingVertical: 10,
  },
  TopView: {
    width: "100%",
    alignItems: "center",
  },
  topView: {
    width: "90%",
  },

  rowView: {
    width: "100%",
    flexDirection: "row",
  },
  borderView: {
    width: "100%",
    borderWidth: 1,
    bordercolor: "#000",
  },
  textstyle: {
    color: "#979797",
    fontSize: RFValue(12, 580),
    fontFamily: "Poppins-Regular",
  },
  dotmainview: {
    width: "100%",
    flexDirection: "row",
  },
  dotview: {
    width: "10%",
    alignItems: "center",
  },
  marchmainview: {
    width: "90%",
    backgroundColor: "#000",
    justifyContent: "center",
    borderRadius: 14,
    marginTop: 20,
  },
  marchmainview2: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingVertical: 9,
  },
  marchtext: {
    color: "#fff",
    fontSize: RFValue(12, 580),
    fontFamily: "Poppins-SemiBold",
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
  profilebtnview: {
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
  upcomingtextstyle: {
    fontSize: RFValue(17, 580),
    fontFamily: "Poppins-SemiBold",
    color: "#000",
  },
  paymenttextstyle: {
    fontSize: RFValue(20, 580),
    fontFamily: "Poppins-Bold",
    color: "#000000",
    lineHeight: 51,
  },
  beforclasstextstyle: {
    fontSize: RFValue(12, 580),
    fontFamily: "Poppins-Regular",
    color: "#000000",
    lineHeight: 25,
  },
  totalView: {
    width: "50%",
  },
  $10View: {
    width: "50%",
    alignItems: "flex-end",
  },
  totalText: {
    fontFamily: "Poppins-Bold",
    fontSize: RFValue(17, 580),
    lineHeight: 50,
    color: "#000",
  },
  walletText: {
    fontFamily: "Poppins-Regular",
    fontSize: RFValue(17, 580),
    lineHeight: 40,
    color: "#000",
  },
  footer: {
    width: "100%",
    marginBottom: 0,
    bottom: 10,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
  },
  btn: {
    padding: 10,
    width: "90%",
    borderRadius: 10,
    backgroundColor: "#FF0000",
    alignItems: "center",
    justifyContent: "center",
  },
  paytextstyle: {
    color: "#FFFFFF",
    fontSize: RFValue(12, 580),
    fontFamily: "Poppins-SemiBold",
  },
});
export default BookSessionPayment;
