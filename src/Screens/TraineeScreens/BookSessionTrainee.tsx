import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import {  RFValue } from "react-native-responsive-fontsize";
import {
  Calendar
} from "react-native-calendars";
import Header from "../../Components/Header";

const BookSessionTrainee = ({ navigation }) => {
  const [currentDate, setCurrentDate] = useState<any>();
  const GoBack = () => {
    navigation.goBack();
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.fixeheight}>
          <Header navigation={navigation} onPress={GoBack} />
        </View>
        <View style={styles.fixeheight1}>
          <View style={styles.TopView}>
            <View style={styles.topView}>
              <Text style={styles.bookTextstyle}>Book a Session</Text>
              <Text style={styles.alreadyTextstyle}>Fill in some details</Text>
            </View>
          </View>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.main}>
          {/*start Already booked*/}
          <View style={styles.TopView}>
            <View style={styles.topView}>
              <View style={styles.absrowview}>
                <View style={styles.abstextview}>
                  <Text style={styles.alreadyTextstyle}>
                    Already Booked Slots
                  </Text>
                </View>
                <View style={styles.reddotview}>
                  <View style={styles.dotview}></View>
                </View>
              </View>
              {/*end Already booked*/}
              <View>
                <Calendar
                  markingType={"custom"}
                  onDayPress={(day:{dateString:any}) => {
                    setCurrentDate(day?.dateString);
                  }}
                  firstDay={1}
                  markedDates={{
                    [currentDate]: { selected: true, selectedColor: "red" },
                  }}
                />
                <View style={styles.borderView}></View>
              </View>
              {/*start clastime*/}
              <View style={styles.absrowview}>
                <View style={styles.classtimeview}>
                  <Text style={styles.classtextstyles}>Class time</Text>
                </View>
                <View style={styles.timeview}>
                  <Text style={styles.timetextstyle}>7:30 am</Text>
                </View>
              </View>
              {/*end classtime*/}
              {/*start Duration*/}
              <View style={styles.absrowview}>
                <View style={styles.durationView}>
                  <Text style={styles.classtextstyles}>
                    Duration <Text style={styles.mintext}>(min)</Text>
                  </Text>
                </View>
                <View style={styles.TimepulsView}>
                  <View style={styles.TimewidthView}>
                    <View style={styles.TimewidthchangeView}>
                      <TouchableOpacity style={styles.minusview}>
                        <AntDesign name="minus" color={"#fff"} size={20} />
                      </TouchableOpacity>
                    </View>
                    <View style={styles.TimewidthchangeView1}>
                      <View style={{ justifyContent: "center" }}>
                        <Text
                          style={{
                            fontSize: RFValue(12, 580),
                            fontFamily: "Poppins-Regular",
                          }}
                        >
                          60
                        </Text>
                      </View>
                    </View>
                    <View style={styles.TimewidthchangeView2}>
                      <TouchableOpacity style={styles.pulsview}>
                        <AntDesign name="plus" color={"#fff"} size={20} />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
              {/*end Duration*/}
              {/*start Select type of Sessions */}
              <View style={styles.selectView}>
                <Text style={styles.selectText}>
                  Select type of Sessions{" "}
                  <Text style={styles.selectTexts}>(select one)</Text>
                </Text>
              </View>
              <View style={styles.mainBoxView}>
                <View style={styles.boxViews1}>
                  <TouchableOpacity style={styles.boxShadowView}>
                    <Text style={styles.boxText}>
                      Online
                      {"\n"} session
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.boxViews2}>
                  <TouchableOpacity style={styles.boxShadowView}>
                    <Text style={styles.boxText}>Physical {"\n"} Session</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.boxViews3}>
                  <TouchableOpacity style={styles.boxShadowView}>
                    <Text style={styles.boxText}>Recorded {"\n"}session</Text>
                  </TouchableOpacity>
                </View>
              </View>
              {/*End Select type of Sessions */}
              {/*start Select Categorie */}
              <View style={styles.selectView}>
                <Text style={styles.selectText}>
                  Select Categorie{" "}
                  <Text style={styles.selectTexts}>(select many)</Text>
                </Text>
              </View>
              <View style={styles.mainBoxView}>
                <View style={styles.boxViews1}>
                  <TouchableOpacity style={styles.boxShadowView}>
                    <Text style={styles.boxText}>
                      Group
                      {"\n"} session
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.boxViews2}>
                  <TouchableOpacity style={styles.boxShadowView}>
                    <Text style={styles.boxText}>
                      Personal
                      {"\n"} Session
                    </Text>
                  </TouchableOpacity>
                </View>
                {/* <View style={styles.boxViews}>
                  <TouchableOpacity style={styles.boxShadowView}>
                    <Text style={styles.boxText}>Recorded {'\n'}session</Text>
                  </TouchableOpacity>
                </View> */}
              </View>
              {/*End Select Categorie*/}
              {/*start Select Category */}
              <View style={styles.selectView}>
                <Text style={styles.selectText}>
                  Select Category{" "}
                  <Text style={styles.selectTexts}>(Select appropriate)</Text>
                </Text>
              </View>
              <View style={styles.mainBoxView}>
                <View style={styles.boxViews1}>
                  <TouchableOpacity style={styles.boxShadowView}>
                    <Text style={styles.boxText}>Cardio/Abs</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.boxViews2}>
                  <TouchableOpacity style={styles.boxShadowView}>
                    <Text style={styles.boxText}>
                      No{"\n"} equipment{"\n"} home{"\n"} exercise
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.boxViews3}>
                  <TouchableOpacity style={styles.boxShadowView}>
                    <Text style={styles.boxText}>Learn {"\n"}technique</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.mainBoxView}>
                <View style={styles.boxViews1}>
                  <TouchableOpacity style={styles.boxShadowView}>
                    <Text style={styles.boxText}>
                      Strength {"\n"} building {"\n"} workout
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.boxViews2}>
                  <TouchableOpacity style={styles.boxShadowView}>
                    <Text style={styles.boxText}>
                      Fat{"\n"} burning{"\n"} worlout
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.boxViews3}>
                  <TouchableOpacity style={styles.boxShadowView}>
                    <Text style={styles.boxText}>
                      Mental{"\n"} health & {"\n"}nutritiion
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              {/*End Select Category */}
              {/*start Any specific details*/}
              <View style={styles.selectView}>
                <Text style={styles.selectText}>Any specific details</Text>
              </View>
              <View
                style={{
                  width: "100%",
                  backgroundColor: "#414143",
                  borderRadius: 8,
                  flexDirection: "column",
                  height: 130,
                  marginTop: 15,
                }}
              >
                <ScrollView showsVerticalScrollIndicator={false}>
                  <TextInput
                    multiline={true}
                    numberOfLines={5}
                    maxLength={500}
                    placeholder="Write your specific detail here.........."
                    placeholderTextColor={"#fff"}
                    style={{
                      height: 200,
                      left: 10,
                      textAlignVertical: "top",
                      fontFamily: "Poppins-Regular",
                      color: "#fff",
                    }}
                  />
                </ScrollView>
              </View>
              {/*end Any specific details*/}
              {/*start pricing */}
              <View style={styles.rowWidthView}>
                <View style={{ width: "50%" }}>
                  <Text style={styles.pricingText}>Pricing</Text>
                </View>
                <View style={{ width: "50%", alignItems: "flex-end" }}>
                  <Text style={styles.pricingText}>$ 488</Text>
                </View>
              </View>
              {/*end pricing */}
              {/*start btn*/}
              <View style={styles.rowView}>
                <View style={styles.mainbtnView}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("BookSessionPaymentgroup")
                    }
                    style={styles.ccbtnview}
                  >
                    <Text style={styles.btntextstyle}>Cancel</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.mainbtnView}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("BookSessionPaymentPersonal")
                    }
                    style={styles.profilebtnview}
                  >
                    <Text style={styles.btntextstyle1}>Next</Text>
                  </TouchableOpacity>
                </View>
              </View>
              {/*end btn*/}
            </View>
          </View>
        </View>
        <View style={{ paddingVertical: 20 }}></View>
      </ScrollView>
    </View>
  );
};
export default BookSessionTrainee;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingTop: Platform.OS === "ios" ? 40 : 0,
    paddingBottom: Platform.OS === "ios" ? 0 : 0,
  },
  main: {
    width: "100%",
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
  footer: {
    width: "100%",
    marginBottom: 0,
    bottom: 0,
    alignItems: "center",
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
  bookTextstyle: {
    fontSize: RFValue(20, 580),
    fontFamily: "Poppins-Bold",
    color: "#000",
  },

  borderView: {
    width: "100%",
    borderWidth: 1,
    bordercolor: "#000",
  },
  absrowview: {
    width: "100%",
    flexDirection: "row",
    marginTop: 20,
  },
  abstextview: {
    width: "70%",
  },
  reddotview: {
    width: "30%",
    alignItems: "flex-end",
  },
  dotview: {
    width: 10,
    height: 10,
    backgroundColor: "#ff0000",
    borderWidth: 1,
  },
  alreadyTextstyle: {
    fontSize: RFValue(12, 580),
    fontFamily: "Poppins-Regular",
    color: "#ABABB5",
  },
  classtimeview: {
    width: "50%",
  },
  timeview: {
    width: "50%",
    alignItems: "flex-end",
  },
  classtextstyles: {
    fontSize: RFValue(12, 580),
    fontFamily: "Poppins-Bold",
    color: "#000",
  },
  timetextstyle: {
    fontSize: RFValue(10, 580),
    fontFamily: "Poppins-Regular",
  },
  durationView: {
    width: "50%",
  },
  TimepulsView: {
    width: "50%",
    alignItems: "flex-end",
  },
  TimewidthView: {
    width: "100%",
    flexDirection: "row",
  },
  mintext: {
    fontSize: RFValue(9, 580),
    fontFamily: "Poppins-Regular",
  },
  pulsview: {
    width: 26,
    height: 26,
    backgroundColor: "#ff0000",
    alignItems: "center",
    justifyContent: "center",
  },
  minusview: {
    width: 26,
    height: 26,
    backgroundColor: "#414143",
    alignItems: "center",
    justifyContent: "center",
  },
  TimewidthchangeView: {
    width: "45%",
    marginLeft: 12,
    alignItems: "flex-end",
  },
  TimewidthchangeView1: {
    width: "15%",
    marginLeft: 12,
    top: 2,
    alignItems: "flex-end",
  },
  TimewidthchangeView2: {
    width: "40%",
    alignItems: "center",
  },
  mainBoxView: {
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 20,
  },
  boxViews1: {
    width: "33%",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  boxViews2: {
    width: "34%",
    justifyContent: "center",
    alignItems: "center",
  },
  boxViews3: {
    width: "33%",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  boxShadowView: {
    width: 101,
    height: 101,
    backgroundColor: "#000000",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  selectView: {
    width: "100%",
    marginTop: 25,
  },
  selectText: {
    fontFamily: "Poppins-Bold",
    fontSize: RFValue(14, 580),
    color: "#000",
  },
  selectTexts: {
    fontFamily: "Poppins-Regular",
    fontSize: RFValue(9, 580),
  },
  boxText: {
    color: "#fff",
    fontSize: RFValue(10, 580),
    fontFamily: "Poppins-Bold",
  },
  rowWidthView: {
    flexDirection: "row",
    width: "100%",
    marginTop: 10,
  },
  pricingText: {
    fontSize: RFValue(15, 580),
    fontFamily: "Poppins-SemiBold",
    color: "#000",
  },
  rowView: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  mainbtnView: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#fff",
  },
  ccbtnview: {
    backgroundColor: "#F2F2F2",
    width: 163,
    height: 58,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  profilebtnview: {
    backgroundColor: "#ff0000",
    width: 163,
    height: 58,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  btntextstyle: {
    color: "#ff0000",
    fontSize: RFValue(12, 580),
    fontFamily: "Poppins-Regular",
  },
  btntextstyle1: {
    color: "#fff",
    fontSize: RFValue(12, 580),
    fontFamily: "Poppins-Regular",
  },
});
