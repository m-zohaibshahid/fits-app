import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
  ScrollView,
} from "react-native";
import Colors from "../../../constants/Colors";
import AntDesign from "react-native-vector-icons/AntDesign";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { RFValue } from "react-native-responsive-fontsize";
import MyVideos from "../MyVideosScreen";
import MyBookedClasses from "../MyBookedClasses";
import { url } from "../../../constants/url";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Videos = ({ navigation }) => {
  const [myVideos, setMyVideos] = useState(true);
  const [updatedClasses, setUpdatedClasses] = useState(false);
  const [data, setData] = useState([]);
  const [bookedClasses, setBookedClasses] = useState([]);
  const [load, setLoad] = useState(false);
  const [loadx, setLoadx] = useState(false);

  const classestrueState = () => {
    setMyVideos(true);
    setUpdatedClasses(false);
  };
  const VideotrueState = () => {
    setMyVideos(false);
    setUpdatedClasses(true);
  };

  useEffect(() => {
    navigation.addListener("focus", () => {
      getAllVideos();
      getAllClasses();
    });
  }, []);

  const getAllVideos = async () => {
    setLoad(true);
    const userData = await AsyncStorage.getItem("userData");
    let userDatax = JSON.parse(userData);

    await fetch(`${url}/video`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${userDatax.access_token}`,
      },
    })
      .then((res) => res.json())
      .then((res2) => {
        setLoad(false);
        if (res2.success === true) {
          setData(res2.data);
        } else {
          ToastAndroid.show(res2.message, ToastAndroid.LONG);
        }
      })
      .catch((error) => {
        setLoad(false);
      });
  };

  const getAllClasses = async () => {
    const userData = await AsyncStorage.getItem("userData");
    let userDatax = JSON.parse(userData);
    setLoad(true);
    await fetch(`${url}/book-a-session/trainer/${userDatax?.data?._id}`, {
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
        if (res2.success === true) {
          setBookedClasses(res2?.data);
        } else {
          ToastAndroid.show(res2.message, ToastAndroid.LONG);
        }
      })
      .catch((error) => {
        setLoad(false);
      });
  };

  const deleteBooking = async (item) => {
    const userData = await AsyncStorage.getItem("userData");
    let userDatax = JSON.parse(userData);
    setLoadx(true);
    await fetch(`${url}/book-a-session/trainer/${item?._id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${userDatax?.access_token}`,
      },
    })
      .then((res) => res.json())
      .then((res2) => {
        setLoadx(false);
        if (res2?.success === true) {
          getAllClasses();
        } else {
        }
      })
      .catch((error) => {
        setLoadx(false);
      });
  };

  const detailsInfoCall = (item, i) => {
    let dummy = [...bookedClasses];
    if (dummy[i].status == true) {
      dummy.forEach((item) => (item.status = false));
    } else {
      dummy.forEach((item) => (item.status = false));
      dummy[i].status = true;
    }
    setBookedClasses(dummy);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.topView}>
          <Text style={styles.hometext}>My Classes</Text>
          <View style={styles.toptabmainview}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.mainclassesview}
              onPress={() => {
                getAllVideos();
                classestrueState();
              }}
            >
              <Text style={[myVideos ? styles.topbartext : styles.topbartext1]}>
                My videos
              </Text>
              {myVideos ? <View style={styles.borderView}></View> : null}
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.mainclassesview}
              onPress={() => {
                getAllClasses();
                VideotrueState();
              }}
            >
              <Text
                style={[
                  updatedClasses ? styles.topbartext : styles.topbartext1,
                ]}
              >
                Booked Classes
              </Text>
              {updatedClasses ? <View style={styles.borderView}></View> : null}
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/*Start Navigation Screen*/}
        {myVideos ? (
          <MyVideos navigation={navigation} data={data} load={load} />
        ) : null}

        {updatedClasses ? (
          <MyBookedClasses
            navigation={navigation}
            data={bookedClasses}
            deleteBooking={deleteBooking}
            detailsInfoCall={detailsInfoCall}
            load={load}
            loadx={loadx}
          />
        ) : null}
        {/*End Navigation Screen*/}
        <View style={{ paddingVertical: 10 }}></View>
      </ScrollView>
      {myVideos && (
        <View style={styles.footerRect}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate("VideoCreate")}
            style={styles.addIconRect}
          >
            <AntDesign name="plus" color={"#fff"} size={wp(7)} />
          </TouchableOpacity>
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
    alignItems: "center",
  },
  hometext: {
    fontSize: RFValue(25, 580),
    marginTop: 15,
    fontWeight: "bold",
    fontFamily: "Poppins-Bold",
    color: "#000000",
  },
  footerRect: {
    width: "100%",
    height: "19%",
    backgroundColor: Colors.white,
    marginBottom: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "flex-end",
  },
  addIconRect: {
    width: 55,
    height: 55,
    marginRight: 12,
    borderRadius: 40,
    marginTop: 3,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
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
  rowView: {
    width: "90%",
    flexDirection: "row",
  },

  imageview: {
    width: "40%",
    alignItems: "center",
    justifyContent: "center",
  },
  imagestyles: {
    width: 80,
    height: 80,
    borderRadius: 200 / 2,
  },
  toptabmainview: {
    width: "100%",
    flexDirection: "row",
    marginTop: 20,
  },
  mainclassesview: {
    width: "50%",
    alignItems: "center",
  },
  topbartext: {
    fontSize: RFValue(12, 580),
    color: "#ff0000",
    fontFamily: "Poppins-Regular",
  },
  topbartext1: {
    fontSize: RFValue(12, 580),
    color: "#000",
    fontFamily: "Poppins-Regular",
  },
  borderView: {
    width: 30,
    borderWidth: 1,
    borderColor: "#ff0000",
  },
});
export default Videos;
