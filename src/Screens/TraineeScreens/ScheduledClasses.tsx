import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Pressable, ToastAndroid, ActivityIndicator, Platform, Alert } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { RFValue } from "react-native-responsive-fontsize";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { url } from "../../constants/url";
import moment from "moment";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationSwitchProp } from "react-navigation";
import { useSelector } from "react-redux";
import { UserDetail } from "../../interfaces";

interface PropsInterface {
  navigation: NavigationSwitchProp;
}


const ScheduledClasses = ({ navigation }: PropsInterface) => {
  const { userInfo } = useSelector((state: { fitsStore: Partial<UserDetail> }) => state.fitsStore);
  const token: string = useSelector((state: { token: string }) => state.token);
  const [data, setData] = useState();
  const [load, setLoad] = useState(false);
  const [loadx, setLoadx] = useState(false);

  useEffect(() => {
    navigation.addListener("focus", () => {
      getAllClassesTrainee();
    });
  }, []);

  const getAllClassesTrainee = async () => {
    await fetch(`${url}/book-a-session/trainee/${userInfo?.user._id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
  };

  const deleteBooking = async (item) => {
    await fetch(`${url}/book-a-session/trainee/${item?._id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${userDatax?.access_token}`,
      },
    })
  };

  const detailsInfoCall = (item, i) => {
    let dummy = [...data];
    if (dummy[i].status == true) {
      dummy.forEach((item) => (item.status = false));
    } else {
      dummy.forEach((item) => (item.status = false));
      dummy[i].status = true;
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        {load === true ? (
          <ActivityIndicator size="large" color="black" />
        ) : (
          <View>
            {data?.map((item, i) => (
              <View style={styles.TopView} key={i}>
                {item.session === null ? null : (
                  <View style={styles.marchmainview}>
                    <View style={styles.marchmainview2}>
                      <View style={{ width: "25%", alignItems: "center" }}>
                        <Text style={styles.marchtext}>
                          {moment(item?.session?.select_date).format("DD ")}
                          {moment(item?.session?.select_date).format("MMMM")}
                        </Text>
                        <Text style={styles.Daytext}>({moment(item?.session?.select_date).format("dddd")})</Text>
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
                        <Text style={styles.marchtext}>{item?.session?.class_title}</Text>
                        <Text
                          style={{
                            color: "#fff",
                            fontSize: RFValue(8, 580),
                            fontFamily: "Poppins-Regular",
                          }}
                        >
                          {item?.session?.class_time}
                        </Text>
                      </View>
                      <Pressable
                        onPress={() => detailsInfoCall(item, i)}
                        //onPress={() => setDetails(!details)}
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
                          <AntDesign name={item.status ? "up" : "down"} size={15} color={"#fff"} />
                        </View>
                      </Pressable>
                    </View>
                    {/*end Yoga */}
                    {item.status && (
                      <View style={{ width: "100%", paddingBottom: 18 }}>
                        <View style={styles.dotmainview}>
                          <View style={styles.dotview}>
                            <FontAwesome name="circle" style={{ color: "#979797" }} />
                          </View>
                          <View style={{ width: "90%" }}>
                            <Text style={styles.textstyle}>
                              Cost: {"\n"}$ {item?.session?.price}
                            </Text>
                          </View>
                        </View>
                        <View style={styles.dotmainview}>
                          <View style={styles.dotview}>
                            <FontAwesome name="circle" style={{ color: "#979797" }} />
                          </View>
                          <View style={{ width: "90%" }}>
                            <Text style={styles.textstyle}>{item?.session?.details}.</Text>
                          </View>
                        </View>
                        <View style={styles.mainbtnView}>
                          <Pressable
                            onPress={() => {
                              if (loadx === true) {
                              } else {
                                deleteBooking(item);
                              }
                            }}
                            style={styles.ccbtnview}
                          >
                            {loadx === true ? <ActivityIndicator size="small" color="#fff" /> : <Text style={styles.btntextstyle}>Cancel</Text>}
                          </Pressable>
                        </View>
                      </View>
                    )}
                  </View>
                )}
              </View>
            ))}
          </View>
        )}
        {/*end Totale */}
      </View>
      <View style={{ marginVertical: 20 }} />
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
  textstyle: {
    color: "#ffffff",
    fontSize: RFValue(12, 580),
    fontFamily: "Poppins-Regular",
    marginTop: -5,
  },
  Daytext: {
    color: "#fff",
    fontSize: RFValue(8, 580),
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
    fontSize: RFValue(10, 580),
    fontFamily: "Poppins-SemiBold",
  },
  mainbtnView: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#fff",
    marginTop: 20,
  },
  ccbtnview: {
    backgroundColor: "red",
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
export default ScheduledClasses;
