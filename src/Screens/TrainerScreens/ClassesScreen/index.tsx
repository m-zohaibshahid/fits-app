import React, { useState } from "react";
import {
  Text,
  View,
  ScrollView,
  Pressable,
  ActivityIndicator,
  TextInput,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { RFValue } from "react-native-responsive-fontsize";
import { Calendar } from "react-native-calendars";
import moment from "moment";
import styles from "./styles";
import Colors from "../../../constants/Colors";

const Classes = ({ deleteClass, detailsInfoCall, loadx, load, data }) => {
  // Hooks
  const [search, setSearch] = useState("");
  const [currentDate, setCurrentDate] = useState([]);
  return (
    <View style={styles.mainContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.mainBody}>
          {/* Search bar */}
          <View style={styles.seacherbarmainView}>
            {/* <View style={styles.seacherbariconview}>
            <EvilIcons name="search" size={wp(8)} style={{ color: "#fff" }} />
          </View> */}
            <View
              style={{
                width: "88%",
                justifyContent: "flex-end",
              }}
            >
              <TextInput
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
                  width: "100%",
                  fontSize: RFValue(12, 580),
                  paddingTop: -5,
                }}
              />
            </View>
          </View>
          {/* Search bar */}
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

          {/*start Totale */}
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
              {data?.map((item, i) => (
                <View style={styles.TopView} key={i}>
                  <View style={styles.marchmainview}>
                    <View style={styles.marchmainview2}>
                      <View style={{ width: "27%", alignItems: "center" }}>
                        <Text style={styles.marchtext}>
                          {moment(item?.select_date).format("D-")}
                          {moment(item?.select_date).format("MMMM")}
                        </Text>
                        <Text style={styles.Daytext}>
                          ({moment(item?.select_date).format("dddd")})
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
                          {item?.class_title} {"\n"}
                          <Text
                            style={{
                              color: "#fff",
                              fontSize: RFValue(10, 580),
                              fontFamily: "Poppins-Regular",
                              textTransform: "uppercase",
                            }}
                          >
                            {moment(item?.item?.class_time).format("h a")}
                            {/* {item?.class_time} */}
                          </Text>
                        </Text>
                      </View>
                      <Pressable
                        onPress={() => detailsInfoCall(item, i)}
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
                            style={{
                              width: "78%",
                              justifyContent: "center",
                            }}
                          >
                            <Text
                              style={{
                                color: "#fff",
                                fontSize: RFValue(12, 580),
                                fontFamily: "Poppins-Regular",
                                left: 8,
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
                        <View style={styles.dotmainview}>
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
                              Cost: {"\n"}$ {item?.price}
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
                              {item?.details}
                            </Text>
                          </View>
                        </View>
                        <View style={styles.mainbtnView}>
                          <Pressable
                            style={styles.ccbtnview}
                            onPress={() => {
                              if (loadx === true) {
                              } else {
                                deleteClass(item);
                              }
                            }}
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
                </View>
              ))}
            </View>
          )}
          {/*end total */}
        </View>
        <View style={{ paddingVertical: 35 }}></View>
      </ScrollView>
    </View>
  );
};

export default Classes;
