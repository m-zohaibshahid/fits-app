import React, { useState } from "react";
import { Text, View, Pressable, StyleSheet, ScrollView } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import Colors from "../../../constants/Colors";
import Feather from "react-native-vector-icons/Feather";
const Sporst = [
  {
    name: "Soccer",
  },
  {
    name: "Basketball",
  },
  {
    name: "Tennis",
  },
  {
    name: "Baseball",
  },
  {
    name: "Golf",
  },
  {
    name: "Volleyball",
  },
  {
    name: "Running",
  },
  {
    name: "Badminton",
  },
  {
    name: "Swimming",
  },
  {
    name: "Boxing",
  },
  {
    name: "Table tennis",
  },
  {
    name: "Skiing",
  },
  {
    name: "Ice skating",
  },
  {
    name: "Roller skating",
  },
  {
    name: "Cricket",
  },
  {
    name: "Rugby",
  },
  {
    name: "Pool",
  },
  {
    name: "Darts",
  },
  {
    name: "Bowling",
  },
  {
    name: "Karate",
  },
  {
    name: "Other",
  },
];
const Sports = (props: { handleSportsData: any; sportData: any }) => {
  const { handleSportsData, sportData } = props;
  return (
    <View>
      <Text style={styles.SortText}>Sports </Text>
      <View style={styles.borderWidth} />
      {/*start flex box*/}
      <View style={styles.flexDirectionView}>
        <View style={styles.titleView}>
          <Text style={styles.titledText}>
            Any sports <Text style={styles.titledefault}>(default)</Text>{" "}
          </Text>
        </View>
        <View style={styles.iconView}>
          <Feather name="check-circle" color={"#000"} size={25} />
        </View>
      </View>

      <View style={{ marginBottom: 100 }}>
        {Sporst.map((item, index) => (
          <Pressable key={index} onPress={() => handleSportsData(item)} style={styles.flexDirectionView}>
            <View style={styles.titleView}>
              <Text style={styles.titleText}>{item.name}</Text>
            </View>
            <View style={styles.iconView}>
              <Feather name="check-circle" color={sportData === item.name ? "red" : "#000"} size={25} />
            </View>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  marginView: {
    paddingVertical: 10,
    marginVertical: 10,
  },
  SortText: {
    fontSize: RFValue(20, 580),
    color: Colors.black,
    fontFamily: "Poppins-SemiBold",
  },
  borderWidth: {
    width: "100%",
    bordercolor: Colors.black,
    borderWidth: 1,
  },
  flexDirectionView: {
    width: "100%",
    flexDirection: "row",
    height: 30,
    borderColor: Colors.black,
    marginTop: 10,
  },
  titleView: {
    width: "80%",
    flex: 1,
    justifyContent: "space-between",
  },
  iconView: {
    width: "20%",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  titleText: {
    fontSize: RFValue(15, 580),
    color: Colors.black,
    fontFamily: "Poppins-Regular",
  },
  titlText: {
    fontSize: RFValue(15, 580),
    color: "red",
    fontFamily: "Poppins-Regular",
  },
  titledText: {
    fontSize: RFValue(15, 580),
    color: Colors.black,
    fontFamily: "Poppins-SemiBold",
  },
  titledefault: {
    fontSize: 13,
  },
});
export default Sports;
