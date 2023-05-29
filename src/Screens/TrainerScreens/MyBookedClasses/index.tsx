import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  ToastAndroid,
  ActivityIndicator,
  Platform,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { RFValue } from "react-native-responsive-fontsize";
import { Calendar } from "react-native-calendars";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";

const MyBookedClasses = ({
  navigation,
  data,
  deleteBooking,
  detailsInfoCall,
  load,
  loadx,
}) => {
  const [currentDate, setCurrentDate] = useState();

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <View style={styles.TopView}>
          <View style={styles.topView}>
            <View style={styles.CalendarView}>
              <Calendar
                markingType={"custom"}
                onDayPress={(day) => {
                  setCurrentDate(day?.dateString);
                }}
                firstDay={1}
                markedDates={{
                  [currentDate]: { selected: true, selectedColor: "red" },
                }}
              />
            </View>
          </View>
        </View>

        {/*start Totale */}
        {load === true ? (
          <ActivityIndicator size="large" color="black" />
        ) : (
          <View>
            {data?.map((item, i) => (
              <View style={styles.TopView} key={i}>
                {item?.session === null ? null : (
                  <View style={styles.marchmainview}>
                    <View style={styles.marchmainview2}>
                      <View style={{ width: "27%", alignItems: "center" }}>
                        <Text style={styles.marchtext}>
                          {moment(item?.session?.select_date).format("DD-")}
                          {moment(item?.session?.select_date).format("MMMM")}
                        </Text>
                        <Text
                          style={{
                            color: "#fff",
                            fontSize: RFValue(8, 580),
                            fontFamily: "Poppins-Regular",
                          }}
                        >
                          ({moment(item?.session?.select_date).format("dddd")})
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
                      <View style={{ width: "33%", flexDirection: "column" }}>
                        <Text style={styles.marchtext}>
                          {item?.session?.class_title}
                          {"\n"}
                          <Text
                            style={{
                              color: "#fff",
                              fontSize: RFValue(10, 580),
                              fontFamily: "Poppins-Regular",
                            }}
                          >
                            {item?.session?.class_time}
                          </Text>
                        </Text>
                      </View>
                      <Pressable
                        onPress={() => detailsInfoCall(item, i)}
                        //onPress={() => setDetails(!details)}
                        style={{
                          width: "30%",
                          backgroundColor: "#414143",
                          alignItems: "center",
                          borderRadius: 8,
                          height: 40,
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
                          <View
                            style={{ width: "78%", justifyContent: "center" }}
                          >
                            <Text
                              style={{
                                color: "#fff",
                                fontSize: RFValue(12, 580),
                                fontFamily: "Poppins-Regular",
                                left: 10,
                              }}
                            >
                              Details
                            </Text>
                          </View>
                          <AntDesign
                            name={item.status ? "up" : "down"}
                            size={14}
                            color={"#fff"}
                          />
                        </View>
                      </Pressable>
                    </View>
                    {/*end Yoga */}
                    {item.status && (
                      <View style={{ width: "100%", paddingBottom: 18 }}>
                        {/* <View style={styles.dotmainview}>
                     <View style={styles.dotview}>
                       <FontAwesome
                         name="circle"
                         style={{ color: "#979797" }}
                       />
                     </View>
                     <View style={{ width: "90%" }}>
                       <Text style={styles.textstyle}>
                         Type:{"\n"}
                         {item?.session_type?.type}
                       </Text>
                     </View>
                   </View>*/}
                        <View style={styles.dotmainview}>
                          <View style={styles.dotview}>
                            <FontAwesome
                              name="circle"
                              style={{ color: "#979797" }}
                            />
                          </View>
                          <View style={{ width: "90%" }}>
                            <Text style={styles.textstyle}>
                              Cost: {"\n"}$ {item?.session?.price}
                            </Text>
                          </View>
                        </View>
                        {/*<View style={styles.dotmainview}>
                      <View style={styles.dotview}>
                        <FontAwesome
                          name="circle"
                          style={{ color: "#979797" }}
                        />
                      </View>
                      <View style={{ width: "90%" }}>
                        <Text style={styles.textstyle}>
                          Trainee name:{"\n"}
                        </Text>
                      </View>
                    </View>*/}
                        <View style={styles.dotmainview}>
                          <View style={styles.dotview}>
                            <FontAwesome
                              name="circle"
                              style={{ color: "#979797" }}
                            />
                          </View>
                          <View style={{ width: "90%" }}>
                            <Text style={styles.textstyle}>
                              {item?.session?.details}
                            </Text>
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
                            {loadx === true ? (
                              <ActivityIndicator size="small" color="#fff" />
                            ) : (
                              <Text style={styles.btntextstyle}>
                                Cancel Class
                              </Text>
                            )}
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
        {data?.length < 0 && (
          <View style={{ width: "100%", borderWidth: 1 }}>
            <Text style={{ fontSize: 22 }}>
              There is no Booked classes by trainee
            </Text>
          </View>
        )}
        <View style={{ marginVertical: 20 }} />
        {/*end total */}
      </View>
    </View>
  );
};

export default MyBookedClasses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "ios" ? 40 : 0,
    paddingBottom: Platform.OS === "ios" ? 0 : 0,
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
    backgroundColor: "#fff",
    // borderWidth:1,
    height: 70,
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
  rowView: {
    width: "100%",
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  borderView: {
    width: "100%",
    borderWidth: 1,
    bordercolor: "#000",
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
    paddingVertical: 7,
    flexDirection: "row",
  },
  marchtext: {
    color: "#fff",
    fontSize: RFValue(11, 580),
    fontFamily: "Poppins-SemiBold",
  },
  mainbtnView: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#fff",
    // borderWidth:1,
    marginTop: 15,
  },
  ccbtnview: {
    backgroundColor: "#979797",
    width: 100,
    height: 45,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  btntextstyle: {
    color: "#fff",
    fontSize: RFValue(10, 580),
    fontFamily: "Poppins-Regular",
  },
});
