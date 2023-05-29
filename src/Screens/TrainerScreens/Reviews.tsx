import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import * as Images from "../../constants/Images";
import { url } from "../../constants/url";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Colors from "../../constants/Colors";

const Reviews = ({ navigation, data, load }) => {

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        {/* Map */}
        {load === false ? (
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
            {data.map((item, i) => (
              <View key={i}>
                {item?.session?.reviews[0] == null ? null : (
                  <View style={styles.TopView}>
                    <View style={styles.topView}>
                      <View style={styles.BoxMianView}>
                        <View style={styles.imageView}>
                          <Image
                            style={styles.imagestyles}
                            source={{
                              uri: `${item?.session?.reviews[0]?.user?.personal[0]?.profileImage}`,
                            }}
                          />
                          <View style={{ marginTop: 5 }}>
                            <Text style={styles.nameTest}>
                              {
                                item?.session?.reviews[0]?.user?.personal[0]
                                  ?.name
                              }
                            </Text>
                            <Text style={styles.nameTest}>
                              {item?.session?.averageRating}{" "}
                              <AntDesign name="star" />
                            </Text>
                          </View>
                        </View>
                        <View style={styles.lineView}></View>
                        <View style={styles.TextsView}>
                          <Text style={styles.TextsStyle}>
                            {item?.session?.reviews[0]?.comment}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                )}
              </View>
            ))}
          </View>
        )}
        {/* Map */}
      </View>
    </View>
  );
};

export default Reviews;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
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
  },
  TopView: {
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
  topView: { width: "90%" },
  topView1: {
    width: "90%",
    alignItems: "center",
  },
  BoxMianView: {
    width: "100%",
    flexDirection: "row",
    backgroundColor: "#000",
    height: 145,
    borderRadius: 20,
    alignItems: "center",
  },
  imageView: {
    width: "30%",
    alignItems: "center",
  },
  TextsView: {
    width: "70%",
    alignItems: "center",
  },
  lineView: {
    width: 2,
    height: 115,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  imagestyles: {
    width: 80,
    height: 80,
    borderRadius: 200 / 2,
  },
  nameTest: {
    fontSize: RFValue(10, 580),
    textAlign: "center",
    fontFamily: "Poppins-Regular",
    color: "#fff",
  },
  TextsStyle: {
    fontSize: RFValue(10, 580),
    fontFamily: "Poppins-Regular",
    color: "#fff",
    textAlign: "auto",
  },
});
