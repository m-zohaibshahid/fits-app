import React, { useEffect, useState } from "react";
import { Text, View, ImageBackground, Pressable, StyleSheet, ScrollView, ToastAndroid, Alert } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import { RFValue } from "react-native-responsive-fontsize";
import { getDistance } from "geolib";
import { NavigationSwitchProp } from "react-navigation";
import { TrainerClassInterfaceInTraineeScreenInterface, TrainerPersonalinfoInTraineeScreenInterface, TrainerProfessioninfoInTraineeScreen } from "../../interfaces";
import FullPageLoader from "../../Components/FullpageLoader";
import { useTraineeSessionRecommentQuery } from "../../slice/FitsApi.slice";
interface Props {
  navigation: NavigationSwitchProp;
  superLong: any;
  superLat: any;
}
const Recommended: React.FC<Props> = ({ navigation, superLong, superLat }) => {
  const [data, setData] = useState<TrainerClassInterfaceInTraineeScreenInterface[]>([]);
  const [personalInfoData, setPersonalInfoData] = useState<TrainerPersonalinfoInTraineeScreenInterface[]>([]);
  const [professionalData] = useState<TrainerProfessioninfoInTraineeScreen[]>([]);
  const { data: data1, isLoading, error } = useTraineeSessionRecommentQuery({});
  useEffect(() => {
    navigation.addListener("focus", () => {
      // RecommendedSessioan();
    });
  }, []);
  // const RecommendedSessioan = async () => {
  //   if (isLoading) {
  //     return <FullPageLoader />;
  //   }
  //   if (!recommendedSessions?.data) return;
  //   setData(recommendedSessions?.data?.classes);
  //   getDistanceFunction(recommendedSessions?.data?.classes);
  //   setPersonalInfoData(recommendedSessions?.data?.personal_info);
  //   setProfessionalData(recommendedSessions?.data?.profession_info);
  // };
  const dummyData = (id: any, item: any) => {
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

  const getDistanceGoogle = (lat: any, lng: any) => {
    let dis;
    dis = getDistance({ latitude: lat, longitude: lng }, { latitude: superLat, longitude: superLong });

    let distanceInKM = dis / 1000;

    return distanceInKM;
  };
  const getDistanceFunction = (data: any) => {
    let dummy = [...data];
    dummy.map((item, i) => {
      var dis = getDistanceGoogle(item.session_type.lat, item.session_type.lng);
      item.session_type.distance = dis;
    });
  };

  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.main}>
      {/*start image box view*/}
      {data.map((item, i) => (
        <View>
          {item?.session_type?.type === "online" ? (
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
                            <AntDesign name="star" size={15} color={"#000"} /> {item?.user?.averageRating.toFixed(1)}
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
          ) : null}
        </View>
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
export default Recommended;
