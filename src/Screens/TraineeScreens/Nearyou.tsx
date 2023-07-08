import React, { useEffect, useState } from "react";
import { Text, View, ImageBackground, Pressable, StyleSheet, ScrollView, ToastAndroid } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import { RFValue } from "react-native-responsive-fontsize";
import { url } from "../../constants/url";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getDistance } from "geolib";

const Nearyou = ({ navigation, superLong, superLat }) => {
  const [data, setData] = useState([]);
  const [personalInfoData, setPersonalInfoData] = useState([]);
  const [professionalData, setProfessionalData] = useState([]);
  const GoBack = () => {
    navigation.goBack();
  };
  useEffect(() => {
    navigation.addListener("focus", () => {
      bookASessioan();
    });
  }, []);
  const bookASessioan = async () => {
    const userData = await AsyncStorage.getItem("userData");
    let userDatax = JSON.parse(userData);
    //setLoad(true);

    await fetch(`${url}/session`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${userDatax?.access_token}`,
      },
    })
      .then((res) => res.json())
      .then((res2) => {
        //setLoad(false);
        if (res2.message === "all classes get successfully") {
          setData(res2.data?.classes);
          getDistanceFunction(res2.data?.classes);
          setPersonalInfoData(res2.data?.personal_info);
          setProfessionalData(res2.data?.profession_info);
        } else {
          Alert.alert(res2.errors);
        }
      })
  };
  const dummyData = (id, item) => {
    const check = personalInfoData.find((data) => data?.user === id);
    const checkx = professionalData.find((data) => data?.user === id);
    if (check === undefined) {
      ToastAndroid.show("undefined", ToastAndroid.LONG);
    }
    if (checkx === undefined) {
      ToastAndroid.show("undefined", ToastAndroid.LONG);
    } else {
      navigation.navigate("TrainerDetail", {
        personalData: { check },
        professionalData: { checkx },
        userData: { item },
        trainerId: id,
        sessionId: item._id,
      });
    }
  };

  const getDistanceGoogle = (lat, lng) => {
    let dis;
    dis = getDistance({ latitude: lat, longitude: lng }, { latitude: superLat, longitude: superLong });

    let distanceInKM = dis / 1000;

    return distanceInKM;
  };
  const getDistanceFunction = (data) => {
    let dummy = [...data];
    dummy.map((item, _i) => {
      var dis = getDistanceGoogle(item.session_type.lat, item.session_type.lng);
      item.session_type.distance = dis;
    });
  };

  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.main}>
      {/*start image box view*/}
      {data.map((item, i) => (
        <Pressable onPress={() => dummyData(item?.user?._id, item)} style={styles.boxview} key={i}>
          <ImageBackground
            imageStyle={{ borderRadius: 10 }}
            style={styles.ImageBackgroundstyle}
            source={{
              uri: `${item?.image}`,
            }}
          >
            <View style={styles.TopView}>
              <View style={styles.topView}>
                <View style={styles.RowView}>
                  <View style={styles.inImageView}>
                    <View style={styles.BoxViews}>
                      <Text style={styles.TextStyle}>
                        <AntDesign name="star" size={15} color={"#000"} /> {item?.averageRating?.toFixed(1)}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.inImageView1}>
                    <View style={styles.BoxView1}>
                      <Text style={styles.TextStyle}>$ {item?.price} / Session</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </ImageBackground>
          <View style={styles.jumerNameView}>
            <Text style={styles.jamesnameText}>{item.class_title}</Text>
            <View style={{ width: "100%", flexDirection: "row" }}>
              <EvilIcons name="location" size={20} color="black" />
              <Text style={styles.kmtextstyle}>{item?.session_type?.distance?.toFixed(1)} km from you</Text>
            </View>
          </View>
        </Pressable>
      ))}
      {/*End image box view*/}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
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

  boxview: {
    width: 269,
    backgroundColor: "#fff",
    borderRadius: 10,
    margin: 9,
  },
  ImageBackgroundstyle: {
    width: 269,
    height: 269,
    resizeMode: "contain",
  },
  RowView: {
    width: "100%",
    flexDirection: "row",
    paddingVertical: 10,
  },
  inImageView: {
    width: "50%",
  },
  inImageView1: {
    width: "50%",
    alignItems: "flex-end",
  },
  BoxViews: {
    width: 50,
    backgroundColor: "#E5E6EA",
    height: 23,
    borderRadius: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  BoxView1: {
    paddingHorizontal: 5,
    backgroundColor: "#E5E6EA",
    paddingVertical: 5,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  TextStyle: {
    color: "#000",
    fontSize: RFValue(9, 580),
    fontFamily: "Poppins-Regular",
  },
  jumerNameView: {
    width: "100%",
    paddingTop: 10,
    paddingLeft: 10,
  },
  jamesnameText: {
    fontSize: RFValue(16, 580),
    fontFamily: "Poppins-SemiBold",
    color: "#000",
    textTransform: "capitalize",
  },

  kmtextstyle: {
    fontSize: RFValue(10, 580),
    fontFamily: "Poppins-Regular",
    color: "#000",
    marginTop: -2,
  },
});
export default Nearyou;
