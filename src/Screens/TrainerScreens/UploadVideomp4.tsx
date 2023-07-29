import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
  Image,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import * as Images from "../../constants/Images";
import Header from "../../Components/Header";
import Button from "../../Components/Button";

const UploadVideomp4 = ({ navigation }) => {
  const GoBack = () => {
    navigation.goBack();
  };
  const NextScreen = () => {
    navigation.navigate("Tabb");
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
              <Text
                style={{
                  color: "#000000",
                  fontSize: RFValue(30, 580),
                  marginTop: 20,
                  fontFamily: "Poppins-SemiBold",
                }}
              >
                Upload Videoss
              </Text>
            </View>
          </View>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.TopView}>
          <View
            style={{
              width: "90%",
              backgroundColor: "#979797",
              height: 200,
            }}
          >
            <View
              style={{
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ fontSize: RFValue(15, 580) }}>yogavideo.mp4</Text>
              <Image source={Images.Mp4} marginTop={15} />

              <TouchableOpacity
                style={{
                  marginTop: 20,
                  width: "35%",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#FF0000",
                  borderRadius: 10,
                  paddingVertical: 10,
                }}
              >
                <Text
                  style={{
                    color: "#fff",
                    fontFamily: "Poppins-Regular",
                  }}
                >
                  Drop file
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{ width: "100%", alignItems: "center", marginTop: 50 }}>
          <View style={{ width: "90%", flexDirection: "row" }}>
            <View style={{ width: "50%" }}>
              <Text
                style={{
                  fontSize: RFValue(16, 580),
                  fontFamily: "Poppins-SemiBold",
                  color: "#000",
                }}
              >
                Select Category
              </Text>
            </View>
            <View
              style={{
                width: "50%",
                marginTop: 9,
                alignItems: "flex-start",
              }}
            >
              <Text
                style={{
                  fontFamily: "Poppins-Regular",
                  fontSize: RFValue(9, 580),
                }}
              >
                (select appropriate)
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            width: "100%",
            alignItems: "center",
            flexDirection: "row",
            marginTop: 30,
          }}
        >
          <View style={{ width: "5%" }}></View>
          <View style={{ width: "30%", justifyContent: "center" }}>
            <TouchableOpacity
              style={{
                width: 101,
                height: 101,
                backgroundColor: "#000000",
                borderRadius: 10,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: RFValue(10, 580),
                  fontFamily: "Poppins-Bold",
                }}
              >
                Cardio/Abs
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ width: "30%", justifyContent: "center" }}>
            <TouchableOpacity
              style={{
                width: 101,
                height: 101,
                backgroundColor: "#000000",
                borderRadius: 10,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: RFValue(10, 580),
                  fontFamily: "Poppins-Bold",
                }}
              >
                No {"\n"} equipment{"\n"} home{"\n"} exercise
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ width: "30%", justifyContent: "center" }}>
            <TouchableOpacity
              style={{
                width: 101,
                height: 101,
                backgroundColor: "#000000",
                borderRadius: 10,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: RFValue(10, 580),
                  fontFamily: "Poppins-Bold",
                }}
              >
                Learn technique
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ width: "5%" }}></View>
        </View>
        <View
          style={{
            width: "100%",
            alignItems: "center",
            flexDirection: "row",
            marginTop: 30,
          }}
        >
          <View style={{ width: "5%" }}></View>
          <View style={{ width: "30%", justifyContent: "center" }}>
            <TouchableOpacity
              style={{
                width: 101,
                height: 101,
                backgroundColor: "#000000",
                borderRadius: 10,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: RFValue(10, 580),
                  fontFamily: "Poppins-Bold",
                }}
              >
                Strength {"\n"} building{"\n"} workout
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ width: "30%", justifyContent: "center" }}>
            <TouchableOpacity
              style={{
                width: 101,
                height: 101,
                backgroundColor: "#000000",
                borderRadius: 10,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: RFValue(10, 580),
                  fontFamily: "Poppins-Bold",
                }}
              >
                Fat {"\n"} burning{"\n"} worlout
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ width: "30%", justifyContent: "center" }}>
            <TouchableOpacity
              style={{
                width: 101,
                height: 101,
                backgroundColor: "#000000",
                borderRadius: 10,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: RFValue(10, 580),
                  fontFamily: "Poppins-Bold",
                }}
              >
                Mental{"\n"} health & {"\n"} nutritiion
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ width: "5%" }}></View>
        </View>
        <View style={{ width: "100%", alignItems: "center", marginTop: 40 }}>
          <View style={{ width: "90%" }}>
            <Text style={{ fontSize: RFValue(18, 580), color: "#000" }}>
              Any specific details
            </Text>
          </View>
        </View>
        <View
          style={{
            width: "100%",
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <View
            style={{
              width: "90%",
              backgroundColor: "#414143",
              borderRadius: 8,
              flexDirection: "column",
              height: 130,
            }}
          >
            <ScrollView showsVerticalScrollIndicator={false}>
              <TextInput
                multiline={true}
                numberOfLines={5}
                maxLength={500}
                placeholder="Write your specific detail here....."
                placeholderTextColor={"#fff"}
                style={{
                  height: 200,
                  textAlignVertical: "top",
                  fontFamily: "Poppins-Regular",
                  color: "#fff",
                }}
              />
            </ScrollView>
          </View>
        </View>
        <View style={{ width: "100%", alignItems: "center" }}>
          <View style={{ width: "90%", flexDirection: "row", marginTop: 20 }}>
            <View style={{ width: "50%" }}>
              <Text
                style={{
                  fontSize: RFValue(15, 580),
                  fontFamily: "Poppins-SemiBold",
                  color: "#000",
                }}
              >
                Pricing
              </Text>
            </View>
            <View style={{ width: "50%", alignItems: "flex-end" }}>
              <Text
                style={{
                  fontSize: RFValue(15, 580),
                  fontFamily: "Poppins-SemiBold",
                  color: "#000",
                }}
              >
                $ 488
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            width: "100%",
            alignItems: "center",
            marginTop: 40,
          }}
        >
          <Button navigation={navigation} label={"Done"} onPress={NextScreen} />
        </View>
        <View style={{ marginVertical: 10 }}></View>
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
    height: 100,
  },
  fixeheight: {
    height: 30,
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
    // alignItems: 'center',
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
  main: {
    width: "100%",
    height: "85%",
  },
  footer: {
    width: "100%",
    marginBottom: 0,
    bottom: 0,
    height: "10%",
    justifyContent: "center",
    position: "absolute",
    backgroundColor: "#fff",
  },
  btn: {
    padding: 10,
    margin: 10,
    width: "90%",
    borderRadius: 10,
    color: "#6698FF",
    backgroundColor: "#FF0000",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default UploadVideomp4;
