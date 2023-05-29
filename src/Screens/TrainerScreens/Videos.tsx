import React, { useState } from "react";
import {
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Modal,
  Image,
  ScrollView,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import MyVideos from "./MyVideos";
import UpdatedClasses from "./UpdatedClasses";
import * as Images from "../../constants/Images";
import Header from "../../Components/Header";
import Button from "../../Components/Button";
import Entypo from "react-native-vector-icons/Entypo";

const Videos = ({ navigation }) => {
  const [myVideos, setMyVideos] = useState(true);
  const [updatedClasses, setUpdatedClasses] = useState(false);

  const classestrueState = () => {
    setMyVideos(true);
    setUpdatedClasses(false);
  };
  const VideotrueState = () => {
    setMyVideos(false);
    setUpdatedClasses(true);
  };
  const GoBack = () => {
    navigation.goBack();
  };
  const NextScreen = () => {
    navigation.navigate("");
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.fixeheight1}>
            <View style={styles.TopView}>
              <View style={styles.topView}>
                <Text style={styles.hometext}>My Classes</Text>
                {/*start navigation*/}
                <View style={styles.toptabmainview}>
                  <TouchableOpacity
                    style={styles.mainclassesview}
                    onPress={() => classestrueState()}
                  >
                    <Text
                      style={[
                        myVideos ? styles.topbartext : styles.topbartext1,
                      ]}
                    >
                      My videos
                    </Text>
                    {myVideos ? <View style={styles.borderView}></View> : null}
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.mainclassesview}
                    onPress={() => VideotrueState()}
                  >
                    <Text
                      style={[
                        updatedClasses ? styles.topbartext : styles.topbartext1,
                      ]}
                    >
                      Booked Classes
                    </Text>
                    {updatedClasses ? (
                      <View style={styles.borderView}></View>
                    ) : null}
                  </TouchableOpacity>
                </View>
                {/*end navigation*/}
              </View>
            </View>
          </View>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/*Start Navigation Screen*/}
          {myVideos ? <MyVideos navigation={navigation} /> : null}

          {updatedClasses ? <UpdatedClasses navigation={navigation} /> : null}
          {/*End Navigation Screen*/}
          <View style={{ paddingVertical: 10 }}></View>
        </ScrollView>
      </ScrollView>
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
  fixeheight1: {
    height: 100,
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
  hometext: {
    fontSize: RFValue(25, 580),
    marginTop: 30,
    fontWeight: "bold",
    fontFamily: "Poppins-Bold",
    color: "#000000",
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
