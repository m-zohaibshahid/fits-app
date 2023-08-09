import React, { useEffect, useMemo, useState } from "react";
import {
  Text,
  View,
  ScrollView,
  Pressable,
  ActivityIndicator,
  TextInput,
  StyleSheet,
  Platform,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { RFValue } from "react-native-responsive-fontsize";
import { Calendar } from "react-native-calendars";
import moment from "moment";
import Colors from "../../../constants/Colors";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import Typography from "../../../Components/typography/text";
import { useSessionDelMutation, useTrainerSessionQuery } from "../../../slice/FitsApi.slice";
import { useSelector } from "react-redux";
import { UserDetail } from "../../../interfaces";
import Entypo from "react-native-vector-icons/Entypo";
import Button from "../../../Components/Button";
import { useNavigation } from "@react-navigation/native";

const Classes = () => {
  const navigation = useNavigation()
  const { userInfo } = useSelector((state: { fitsStore: Partial<UserDetail> }) => state.fitsStore);
  const { data: trainerSession, refetch: refetchSessions, isLoading: getAllSessionLoading } = useTrainerSessionQuery(userInfo?.user?._id || '');
  const [mutateDeleleSession, {isLoading: isSessionDeleteLoading}] = useSessionDelMutation();
  // Hooks
  const [searchText, setSearchText] = useState("");
  const [currentDate, setCurrentDate] = useState<string>('')
  const [detailsItemId, setDetailsItemId] = useState<string | null>()

  const filteredClasses = useMemo(() => {
    return trainerSession?.data?.session?.filter((item: SessionItemType) => {
      return item.session_title.toLowerCase().includes(searchText.toLowerCase())
    })
  }, [trainerSession, refetchSessions])

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      refetchSessions();
    });

    return unsubscribe; // Cleanup the listener when component unmounts
  }, [navigation, refetchSessions]);

  const handleDeleteSession = async (id: string) => {
    mutateDeleleSession(id)
    refetchSessions()
  }

  const handleShowDetails = (id: string) => { 
    if (detailsItemId === id) setDetailsItemId(null)
    else setDetailsItemId(id)
  }

  if (getAllSessionLoading) return <ActivityIndicator />
  
  return (
      <View>
          <View style={styles.searchBarMainView}>
          <EvilIcons name="search" size={30} style={{ color: "#fff" }} />
              <TextInput
                numberOfLines={1}
                placeholder="Search... "
                placeholderTextColor="#fff"
                value={searchText}
                onChangeText={setSearchText}
                style={styles.searchBarTextInput}
              />
      </View>

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
      {!filteredClasses?.length ? <Typography style={{marginTop: 50}} align="center">---You dont have any class yet---</Typography> : 
        filteredClasses?.map((item: SessionItemType) => {
        return     <View style={styles.marchmainview}>
        <View style={styles.marchmainview2}>
          <View style={{ width: "25%", alignItems: "center" }}>
            <Text style={styles.marchtext}>
              {moment(item.class_time).format("DD ")}
              {moment(item.class_time).format("MMMM")}
            </Text>
            <Text
              style={{
                color: "#fff",
                fontSize: RFValue(8, 580),
                fontFamily: "Poppins-Regular",
              }}
            >
              ({moment(item.class_time).format("dddd")})
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
              {item.class_title.slice(0, 10)} {"...\n"}
              <Text
                style={{
                  color: "#fff",
                  fontSize: RFValue(10, 580),
                  fontFamily: "Poppins-Regular",
                }}
              >
                {item.class_time.slice(0, 10)}
              </Text>
            </Text>
          </View>
          <Pressable
            onPress={() => handleShowDetails(item._id)}
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
              <Entypo name={detailsItemId === item._id ? "chevron-up" : "chevron-down"} size={18} color={"#fff"} />
            </View>
          </Pressable>
        </View>
        {detailsItemId === item._id && (
          <View>
            <View style={styles.dotmainview}>
              <View style={styles.dotview}>
                <FontAwesome name="circle" style={{ color: "#979797" }} />
              </View>
              <View style={{ width: "90%" }}>
                <Text style={styles.textstyle}>
                  <Typography weight="700" color="white" size={"heading4"}>Cost:</Typography>{'\n'}<Typography weight="300" color="whiteRegular">{"          "}${item.price}</Typography>
                </Text>
              </View>
            </View>
            <View style={styles.dotmainview}>
              <View style={styles.dotview}>
                <FontAwesome name="circle" style={{ color: "#979797" }} />
              </View>
              <View style={{ width: "90%" }}>
                <Text style={styles.textstyle}>
                  <Typography weight="700" color="white" size={"heading4"}>Title:</Typography>{'\n'}<Typography weight="300" color="whiteRegular">{"          "}{item.class_title}</Typography>
                </Text>
              </View>
            </View>
            <View style={styles.dotmainview}>
              <View style={styles.dotview}>
                <FontAwesome name="circle" style={{ color: "#979797" }} />
              </View>
              <View style={{ width: "90%" }}>
                <Text style={styles.textstyle}>
                  <Typography weight="700" color="white" size={"heading4"}>Description:</Typography>{'\n'}<Typography weight="300" color="whiteRegular">{"          "}{item.details}</Typography>
                </Text>
              </View>
            </View>
            <View style={styles.dotmainview}>
              <View style={styles.dotview}>
                <FontAwesome name="circle" style={{ color: "#979797" }} />
              </View>
              <View style={{ width: "90%" }}>
                <Text style={styles.textstyle}>
                  <Typography weight="700" color="white" size={"heading4"}>Type:</Typography>{'\n'}<Typography weight="300" color="whiteRegular">{"          "}{item.session_type.type}</Typography>
                </Text>
                  </View>
            </View>
            <Button disabled={isSessionDeleteLoading} loader={isSessionDeleteLoading} onPress={() => handleDeleteSession(item._id)} style={{marginLeft: 'auto'}} label="Cancle Class" variant="tini"/>
          </View>
        )}
        </View>
            })}
      </View>
  );
};

export default Classes;



const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: Platform.OS === "ios" ? 40 : 0,
    paddingBottom: Platform.OS === "ios" ? 0 : 0,
  },
  mainBody: {
    width: "100%",
  },
  CalendarView: {
    width: "100%",
    alignSelf: "center",
  },

  TopView: {
    width: "100%",
    alignItems: "center",
  },
  searchBarMainView: {
    width: "100%",
    backgroundColor: "#000",
    borderRadius: 5,
    flexDirection: "row",
    padding: 3,
    alignItems: 'center',
    justifyContent: "center",
  },
  textstyle: {
    color: "#fff",
    fontSize: RFValue(12, 580),
    fontFamily: "Poppins-Regular",
  },
  dotmainview: {
    width: "100%",
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
    backgroundColor: "#000",
    justifyContent: "center",
    borderRadius: 10,
    marginTop: 20,
    padding: 10
  },
  marchmainview2: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  marchtext: {
    color: "#fff",
    fontSize: RFValue(11, 580),
    fontFamily: "Poppins-SemiBold",
  },
  searchBarTextInput: {
    color: "#fff",
    fontFamily: "Poppins-Regular",
    fontSize: RFValue(14, 580),
    width: "85%",
  },
  Daytext: {
    color: "#fff",
    fontSize: RFValue(8, 580),
    fontFamily: "Poppins-Regular",
  },
  mainbtnView: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#fff",
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
  seacherbarmainView: {
    width: "90%",
    alignSelf: "center",
    backgroundColor: "#000",
    height: 55,
    borderRadius: 10,
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "center",
  },
  btntextstyle: {
    color: "#fff",
    fontSize: RFValue(10, 580),
    fontFamily: "Poppins-Regular",
  },
});





export interface SessionItemType {
  image: string
  numReviews: number
  averageRating: number
  _id: string
  session_title: string
  class_title: string
  select_date: string
  class_time: string
  duration: number
  equipment: Equipment[]
  session_type: SessionType
  sports: string
  details: string
  price: number
  no_of_slots: number
  user: User
  createdAt: string
}

export interface Equipment {
  _id: string
  value: string
}

export interface SessionType {
  _id: string
  type: string
  lat?: number
  lng?: number
  meetingLink?: string
  recordCategory: string
  no_of_play: string
  videoTitle: string
}

export interface User {
  services_offered: ServicesOffered
  role: string
  isVerified: boolean
  amount: number
  emailVerified: boolean
  suspended: boolean
  reset_password: boolean
  trainerVerified: string
  accountVerified: string
  numReviews: number
  averageRating: number
  cardCreated: boolean
  _id: string
  email: string
  password: string
  createdAt: string
  updatedAt: string
  __v: number
  personal: string
  profession: string
  cus_id: string
}

export interface ServicesOffered {
  value: string
  key: string
}
