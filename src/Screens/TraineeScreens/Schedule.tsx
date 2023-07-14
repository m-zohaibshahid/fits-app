import React, { useState, useEffect } from "react";
import { Text, View, Pressable, StyleSheet } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { RFValue } from "react-native-responsive-fontsize";
import { Calendar } from "react-native-calendars";
import Entypo from "react-native-vector-icons/Entypo";
import { useRoute } from "@react-navigation/native";
import { heightPercentageToDP } from "react-native-responsive-screen";
import moment from "moment";
import { useGetUserMeQuery } from "../../slice/FitsApi.slice";
import { NavigationSwitchProp } from "react-navigation";
import { getUserAsyncStroage } from "../../utils/async-storage";

interface Props {
  navigation: NavigationSwitchProp;
}
const Schedule: React.FC<Props> = ({ navigation }) => {
  const route: any = useRoute();
  const [details, setDetails] = useState(false);
  const [card, setCard] = useState(false);
  const [currentDate, setCurrentDate] = useState('');

  const { data: userMeData } = useGetUserMeQuery<any>({});

  const goToNextScreen = () => {
    navigation.navigate("BookSessionPayment", {
      data: route?.params,
    });
  };

  useEffect(() => {
    setCard(userMeData?.user?.cardCreated);
  }, [userMeData]);
  
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <View style={styles.TopView}>
          <View style={styles.topView}>
            <View>
              <Calendar
                markingType={"custom"}
                onDayPress={(day: any) => {
                  setCurrentDate(day?.dateString);
                }}
                firstDay={1}
                markedDates={{
                  [currentDate]: { selected: true, selectedColor: "red" },
                }}
              />
              {/* <View style={styles.borderView}></View> */}
            </View>
            <Text style={styles.upcomingtextstyle}>Upcoming Events</Text>
          </View>
        </View>

        {/*start Totale */}

        <View style={styles.TopView}>
          <View style={styles.marchmainview}>
            <View style={styles.marchmainview2}>
              <View style={{ width: "25%", alignItems: "center" }}>
                <Text style={styles.marchtext}>
                  {moment(route.params?.userData?.select_date).format("DD ")}
                  {moment(route.params?.userData?.select_date).format("MMMM")}
                </Text>
                <Text
                  style={{
                    color: "#fff",
                    fontSize: RFValue(8, 580),
                    fontFamily: "Poppins-Regular",
                  }}
                >
                  ({moment(route.params?.userData?.select_date).format("dddd")})
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
                <Text style={styles.marchtext}>
                  {route?.params?.userData?.class_title} {"\n"}
                  <Text
                    style={{
                      color: "#fff",
                      fontSize: RFValue(10, 580),
                      fontFamily: "Poppins-Regular",
                    }}
                  >
                    {route?.params?.userData?.class_time.slice(0, 10)}
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
                  <Entypo name={details ? "chevron-up" : "chevron-down"} size={18} color={"#fff"} />
                </View>
              </Pressable>
            </View>
            {/*end Yoga */}
            {details && (
              <View
                style={{
                  width: "100%",
                  paddingBottom: heightPercentageToDP(2),
                }}
              >
                <View style={styles.dotmainview}>
                  <View style={styles.dotview}>
                    <FontAwesome name="circle" style={{ color: "#979797" }} />
                  </View>
                  <View style={{ width: "90%" }}>
                    <Text style={styles.textstyle}>
                      Cost: {"\n"}${route?.params?.userData?.price}
                    </Text>
                  </View>
                </View>
                <View style={styles.mainbtnView}>
                  <Pressable
                    onPress={() => {
                      if (card) goToNextScreen()
                      else navigation.navigate("CreateCardTrainee");
                    }}
                    style={styles.ccbtnview}
                  >
                    <Text style={styles.btntextstyle}>Book Now</Text>
                  </Pressable>
                </View>
              </View>
            )}
          </View>
        </View>
        {/*end Totale */}
      </View>
    </View>
  );
};

export default Schedule;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {
    width: "100%",
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
    alignItems: "center",
    justifyContent: "center",
  },
  borderView: {
    width: "100%",
    borderWidth: 1,
    bordercolor: "#000",
  },
  textstyle: {
    color: "#ffffff",
    fontSize: RFValue(12, 580),
    fontFamily: "Poppins-Regular",
    marginTop: heightPercentageToDP(-1),
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
    borderRadius: 20,
    margin: 10,
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
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#fff",
    marginTop: 20,
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
});
