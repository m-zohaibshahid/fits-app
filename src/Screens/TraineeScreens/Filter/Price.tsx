import React, { useState } from "react";
import { Text, View, Pressable, StyleSheet, ScrollView } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import Colors from "../../../constants/Colors";
import Feather from "react-native-vector-icons/Feather";
import { TextInput } from "react-native-gesture-handler";

const Price = (props: { MinPriceData?: any; MaxPriceData?: any }) => {
  const { MinPriceData } = props;
  const { MaxPriceData } = props;
  const Value = (minPrice: string, maxPrice: string) => {
    if (minPrice !== "") {
      MinPriceData(minPrice);
    }
    if (maxPrice !== "") {
      MaxPriceData(maxPrice);
    }
  };
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  return (
    <View style={styles.marginView}>
      <Text style={styles.SortText}>Price </Text>
      <View style={styles.borderWidth} />
      {/*start minimum*/}
      <View style={styles.flexDirectionView}>
        <View style={styles.minTextView}>
          <Text style={styles.minText}>Minimum</Text>
        </View>
        <View style={styles.mininputView}>
          <TextInput placeholder="minimum" placeholderTextColor={"#fff"} keyboardType={"numeric"} style={styles.minTextInput} maxLength={10} value={minPrice} onChangeText={setMinPrice} />
        </View>
      </View>
      {/*End Minimum*/}
      {/*start Maximum*/}
      <View style={styles.flexDirectionView}>
        <View style={styles.minTextView}>
          <Text style={styles.minText}>Maximum</Text>
        </View>
        <View style={styles.mininputView}>
          <TextInput placeholder="maximum" placeholderTextColor={"#fff"} keyboardType={"numeric"} style={styles.minTextInput} maxLength={10} value={maxPrice} onChangeText={setMaxPrice} />
        </View>
      </View>
      {/*End Maximum*/}
      {/*start flex box*/}
      <View style={styles.flexDirectionView}>
        {/* <View style={styles.ViewWidth}>
          <Pressable style={styles.BtnView1}>
            <Text style={styles.textstyle}>$$</Text>
          </Pressable>
        </View>
        <View style={styles.ViewWidth}>
          <Pressable style={styles.BtnView1}>
            <Text style={styles.textstyle}>$$$</Text>
          </Pressable>
        </View>*/}
        <View style={{ width: "67%" }} />
        <View style={styles.ViewWidth}>
          <Pressable onPress={() => Value(minPrice, maxPrice)} style={styles.BtnView1}>
            <Text style={styles.textstyle}>$</Text>
          </Pressable>
        </View>
      </View>
      {/*End flex box*/}
    </View>
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
    height: 40,
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
  ViewWidth: {
    width: "33%",
    alignItems: "center",
    justifyContent: "center",
  },
  BtnView: {
    width: 100,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#ff0000",
  },
  BtnView1: {
    width: 100,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#000",
  },
  textstyle: { color: "#fff" },
  flexViews: {
    width: "50%",
    flexDirection: "row",
  },
  minText: {
    fontSize: RFValue(16, 580),
    color: Colors.black,
    fontFamily: "Poppins-SemiBold",
  },
  mininputView: {
    width: "50%",
    backgroundColor: Colors.black,
    justifyContent: "center",
    borderRadius: 10,
    paddingLeft: 10,
  },
  minTextView: {
    width: "50%",
    alignItems: "flex-start",
  },
  minTextInput: {
    color: Colors.white,
    fontFamily: "poppins-Regular",
  },
});
export default Price;
