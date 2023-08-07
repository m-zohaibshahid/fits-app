import React, { useState } from "react";
import { Text, View, Pressable, StyleSheet, ScrollView } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import Colors from "../../../constants/Colors";
import Feather from "react-native-vector-icons/Feather";
const Sorts = [
  {
    Name: "Recommended",
  },
  {
    Name: "Nearest You",
  },
  {
    Name: "Top rated",
  },
  {
    Name: "Verified",
  },
  {
    Name: "Highest rating",
  },
];
const Sort = (props: { handleClassSorts: any; classSort: any }) => {
  const { handleClassSorts, classSort } = props;
  const detailsInfoCall = (item: { Name: string }) => {
    if (item.Name !== "") {
      handleClassSorts(item);
    }
  };

  return (
    <ScrollView style={styles.marginView}>
      <Text style={styles.SortText}>Sort </Text>
      <View style={styles.borderWidth} />
      {Sorts.map(
        (
          item: {
            Name: string;
          },
          i
        ) => (
          <Pressable onPress={() => detailsInfoCall(item)} style={styles.flexDirectionView} key={i}>
            <View style={styles.titleView}>
              <Text style={styles.titleText}>{item.Name}</Text>
            </View>
            <View style={styles.iconView}>
              <Feather name="check-circle" color={classSort === item.Name ? "red" : "#000"} size={25} />
            </View>
          </Pressable>
        )
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  marginView: {
    paddingVertical: 10,
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
    justifyContent: "center",
  },
  iconView: {
    width: "20%",
    justifyContent: "center",
    alignItems: "center",
  },
  titleText: {
    fontSize: RFValue(15, 580),
    color: Colors.black,
    fontFamily: "Poppins-Regular",
  },
});
export default Sort;
