import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Pressable, ToastAndroid, ActivityIndicator, Platform, Alert } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { RFValue } from "react-native-responsive-fontsize";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import moment from "moment";
import { NavigationSwitchProp } from "react-navigation";
import { useSelector } from "react-redux";
import { UserDetail } from "../../interfaces";
import { useGetMyBookedClassesQuery } from "../../slice/FitsApi.slice";
import Container from "../../Components/Container";
import Typography from "../../Components/typography/text";

interface PropsInterface {
  navigation: NavigationSwitchProp;
}
const ScheduledClasses = ({ navigation }: PropsInterface) => {
  const { userInfo } = useSelector((state: { fitsStore: Partial<UserDetail> }) => state.fitsStore);

  const {data: myBookedClassesApiResponse, refetch, isLoading} = useGetMyBookedClassesQuery(userInfo?.user?._id || "")


  useEffect(() => {
    navigation.addListener("focus", () => {
      refetch()
    });
  }, []);

  const detailsInfoCall = (item: any, i: number) => {
    let dummy = [...myBookedClassesApiResponse];
    if (dummy[i].status == true) {
      dummy.forEach((item) => (item.status = false));
    } else {
      dummy.forEach((item) => (item.status = false));
      dummy[i].status = true;
    }
  };

  if (isLoading) {
    return <ActivityIndicator size="large" color="black" />
  }
  return (
    <Container>
            {myBookedClassesApiResponse?.data.booking ? <View style={{display: 'flex', justifyContent: 'center', alignItems: "center", height: '100%'}}><Typography style={{marginBottom: 30}}>---You dont have any Class yet---</Typography></View> : myBookedClassesApiResponse?.data.booking.map((item, i) => (
              <View style={styles.TopView} key={item._id}>
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
                        </View>
                      </View>
                    )}
                  </View>
                )}
              </View>
            ))}
    </Container>
  );
};
const styles = StyleSheet.create({
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
