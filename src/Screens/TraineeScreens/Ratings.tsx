import React, { useState } from "react";
import { Text, View, Pressable, StyleSheet, TextInput, Image, ScrollView, ToastAndroid, ActivityIndicator, Alert } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import { RFValue } from "react-native-responsive-fontsize";

import { url } from "../../constants/url";
import { ParamListBase, RouteProp, useRoute } from "@react-navigation/native";

const Ratings = ({ navigation, token, id }: any) => {
  const route: any = useRoute();

  const [details, setDetails] = useState(false);
  const [one, setOne] = useState(false);
  const [two, setTwo] = useState(false);
  const [three, setThree] = useState(false);
  const [four, setFour] = useState(false);
  const [five, setFive] = useState(false);

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

  const GoBack = () => {
    navigation.goBack();
  };
  const NextScreen = () => {
    navigation.navigate("Home", {
      data: route?.params,
    });
  };

  const [loadxx, setLoadxx] = useState(false);

  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");

  const RattingReviews = async () => {
    if (comment === "") {
      ToastAndroid.show("Enter your reviews", ToastAndroid.LONG);
    } else if (rating === "") {
      ToastAndroid.show("Enter your ratings", ToastAndroid.LONG);
    } else {
      setLoadxx(true);
      let reviews;
      (reviews = {
        rating: rating,
        comment: comment,
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
            sessionId: route?.params?.sessionId,
            reviewFor: "session",
            reviews: reviews,
          }),
        })
          .then((res) => res.json())
          .then((res2) => {
            setLoadxx(false);
            if (res2.success) {
              ToastAndroid.show("Confirmed your reviews", ToastAndroid.LONG);
              NextScreen();
            } else {
              ToastAndroid.show(res2.message, ToastAndroid.LONG);
            }
          })
          .catch((error) => {
            setLoadxx(false);
            Alert.alert("Something Went Wrong");
          });
    }
  };
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.main}>
        <View style={styles.TopView}>
          <View style={styles.topView}>
            <View style={styles.totleratingView}>
              <Text style={styles.totaleratingtext}>Total Rating</Text>
              <Text style={styles.totalerating40text}>{route?.params?.userData?.averageRating?.toFixed(1)}</Text>
              <Text style={styles.reviewText}>({route?.params?.userData?.numReviews} Reviews)</Text>
              <View style={styles.starrowview}>
                <AntDesign name="star" size={18} color={"#000"} />
                <AntDesign name="star" size={18} color={"#000"} style={{ marginLeft: 5 }} />
                <AntDesign name="star" size={18} color={"#000"} style={{ marginLeft: 5 }} />
                <AntDesign name="star" size={18} color={"#000"} style={{ marginLeft: 5 }} />
                <AntDesign name="star" size={18} color={"#000"} style={{ marginLeft: 5 }} />
              </View>
            </View>
            {/*start box view*/}
            {/*start Totale */}
            <View style={styles.marchmainview}>
              <View style={styles.TopView}>
                <View style={styles.topView}>
                  {/*satrt  rate view*/}
                  <View style={styles.raterowview}>
                    <View style={styles.rateingView}>
                      <Text style={styles.ratetext}>Rate this trainer</Text>
                    </View>
                    <View style={styles.rateingView1}>
                      <Entypo onPress={() => setDetails(!details)} name={details ? "chevron-up" : "chevron-down"} size={22} color={"#fff"} />
                    </View>
                  </View>
                  {/*end rate view*/}
                  {/*start star view*/}
                  <View style={styles.starrow1view}>
                    <Pressable onPress={() => oneInfo()} style={styles.startView}>
                      <AntDesign name="star" size={25} color={one ? "#414143" : "#fff"} />
                    </Pressable>
                    <Pressable onPress={() => twoInfo()} style={styles.startView}>
                      <AntDesign name="star" size={25} color={two ? "#414143" : "#fff"} />
                    </Pressable>
                    <Pressable onPress={() => threeInfo()} style={styles.startView}>
                      <AntDesign name="star" size={25} color={three ? "#414143" : "#fff"} />
                    </Pressable>
                    <Pressable onPress={() => fourInfo()} style={styles.startView}>
                      <AntDesign name="star" size={25} color={four ? "#414143" : "#fff"} />
                    </Pressable>
                    <Pressable onPress={() => fiveInfo()} style={styles.startView}>
                      <AntDesign name="star" size={25} color={five ? "#414143" : "#fff"} />
                    </Pressable>
                  </View>
                  {/*end star view*/}
                  {/*satrt star view*/}
                  {details && (
                    <View>
                      <View style={styles.textinput}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                          <TextInput
                            multiline={true}
                            numberOfLines={5}
                            maxLength={500}
                            placeholder="Comments...."
                            placeholderTextColor={"#fff"}
                            style={{
                              height: 200,
                              textAlignVertical: "top",
                              fontFamily: "Poppins-Regular",
                              left: 10,
                              color: "#fff",
                            }}
                            value={comment}
                            onChangeText={setComment}
                          />
                        </ScrollView>
                      </View>
                      <View style={styles.rowView}>
                        <View style={styles.mainbtnView}>
                          <Pressable
                            onPress={() => {
                              if (loadxx === true) {
                              } else {
                                RattingReviews();
                                setComment("");
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
                            <Text style={styles.btntextstyle}>{loadxx === true ? <ActivityIndicator size="small" color="#fff" /> : "Submit"}</Text>
                          </Pressable>
                        </View>
                      </View>
                    </View>
                  )}
                  {/*end star view*/}
                </View>
              </View>
            </View>
            {/*End box view*/}
            {/*start BoxmainView*/}
            <View style={styles.BoxMianView}>
              <View style={styles.imageView}>
                <Image
                  style={styles.imagestyles}
                  source={{
                    uri: `${route.params?.personalData?.check?.profileImage}`,
                  }}
                />
                <Text style={styles.nameTest}>{route.params?.personalData?.check?.name}</Text>
                <Text style={styles.nameTest}>
                  {route.params?.userData?.item?.user?.averageRating.toFixed(1)} <AntDesign name="star" />
                </Text>
              </View>
              <View style={styles.lineView}></View>
              <View style={styles.TextsView}>
                <Text style={styles.TextsStyle}>{route?.params?.userData?.details}</Text>
              </View>
            </View>
            {/*end BoxmainView*/}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
export default Ratings;

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
    paddingVertical: 30,
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
  BoxMianView: {
    width: "100%",
    flexDirection: "row",
    backgroundColor: "#000",
    height: 150,
    borderRadius: 20,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  imageView: {
    width: "30%",
    alignItems: "center",
  },
  TextsView: {
    width: "70%",
    alignItems: "center",
  },
  lineView: {
    width: 2,
    height: 120,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  imagestyles: {
    width: 80,
    height: 80,
    borderRadius: 200 / 2,
  },
  nameTest: {
    fontSize: RFValue(10, 580),
    fontFamily: "Poppins-Regular",
    color: "#fff",
  },
  TextsStyle: {
    fontSize: RFValue(10, 580),
    fontFamily: "Poppins-Regular",
    color: "#fff",
    textAlign: "auto",
  },
  totleratingView: {
    width: "40%",
    alignItems: "center",
  },
  totaleratingtext: {
    fontSize: RFValue(15, 580),
    fontFamily: "Poppins-Bold",
    color: "#000",
  },
  totalerating40text: {
    fontSize: RFValue(40, 580),
    fontFamily: "Poppins-Regular",
    color: "#000",
  },
  reviewText: {
    fontSize: RFValue(10, 580),
    fontFamily: "Poppins-Regular",
    color: "#000",
  },
  starrowview: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  marchmainview: {
    marginTop: 30,
    width: "100%",
    backgroundColor: "#000",
    borderRadius: 14,
    paddingVertical: 5,
    paddingBottom: 10,
  },
  raterowview: {
    width: "100%",
    flexDirection: "row",
    marginTop: 5,
  },
  rateingView: {
    width: "70%",
  },
  rateingView1: {
    width: "30%",
    alignItems: "flex-end",
  },
  ratetext: {
    fontFamily: "Poppins-Bold",
    fontSize: RFValue(15, 580),
    color: "#fff",
  },
  starrow1view: {
    width: "70%",
    flexDirection: "row",
    marginTop: 5,
  },
  startView: {
    width: "20%",
  },
  textinput: {
    width: "100%",
    backgroundColor: "#414143",
    borderRadius: 8,
    flexDirection: "column",
    height: 130,
    marginTop: 15,
  },
  ccbtnview: {
    backgroundColor: "#ff0000",
    width: 100,
    height: 45,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  mainbtnView: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#fff",
  },
  rowView: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  btntextstyle: {
    color: "#fff",
    fontSize: RFValue(10, 580),
    fontFamily: "Poppins-Regular",
  },
});
