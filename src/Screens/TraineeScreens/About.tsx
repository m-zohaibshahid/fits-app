import React, { useState } from "react";
import {
  Text,
  View,
 
  StyleSheet,
 
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {  RFValue } from "react-native-responsive-fontsize";
import { useRoute } from "@react-navigation/native";
import { heightPercentageToDP } from "react-native-responsive-screen";
import moment from "moment";

const About = ({ navigation }:any) => {
  const route = useRoute();

  return (
    <View style={styles.container}>
      {/*Start BoxView*/}
      <View style={styles.TopView}>
        <View style={styles.topView}>
          <View style={styles.BoxMianView}>
            <View style={styles.dotmainview}>
              <View style={styles.dotview}>
                <FontAwesome name="circle" style={{ color: "#979797" }} />
              </View>
              <View style={{ width: "90%" }}>
                <Text style={styles.textstyleBold}>Age</Text>
                <Text style={styles.textstyle}>
                  {moment(route?.params?.personalData?.check?.date_of_birth)
                    .month(0)
                    .from(moment().month(0))}
                </Text>
              </View>
            </View>
            <View style={styles.dotmainview}>
              <View style={styles.dotview}>
                <FontAwesome name="circle" style={{ color: "#979797" }} />
              </View>
              <View style={{ width: "90%" }}>
                <Text style={styles.textstyleBold}>Experience</Text>
                <Text style={styles.textstyle}>
                  {route.params.professionalData.checkx.experience_year}
                </Text>
              </View>
            </View>
            <View style={styles.dotmainview}>
              <View style={styles.dotview}>
                <FontAwesome name="circle" style={{ color: "#979797" }} />
              </View>
              <View style={{ width: "90%" }}>
                <Text style={styles.textstyleBold}>
                  Qualifications
                  {"\n"}
                  {route?.params?.professionalData?.checkx?.qualification[0]
                    ?.degree === "" &&
                    route?.params?.professionalData?.checkx?.qualification[0]
                      ?.degree_note === "" ? (
                    <Text style={styles.textstyle}>
                      No Qualification Entered
                    </Text>
                  ) : (
                    <Text style={styles.textstyles}>
                      {
                        route?.params?.professionalData?.checkx
                          ?.qualification[0]?.degree
                      }
                      {"\n"}
                      {
                        route?.params?.professionalData?.checkx
                          ?.qualification[0]?.degree_note
                      }
                    </Text>
                  )}
                </Text>
              </View>
            </View>
            <View style={styles.dotmainview}>
              <View style={styles.dotview}>
                <FontAwesome name="circle" style={{ color: "#979797" }} />
              </View>
              <View style={{ width: "90%" }}>
                <Text style={styles.textstyleBold}>
                  Category{"\n"}
                  <Text style={styles.textstyle}>
                    {route.params.userData.item.category}
                  </Text>
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      {/*End BoxView*/}
    </View>
  );
};
export default About;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: "100%",
    height: 120,
  },
  fixeheight: {
    height: 50,
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
    alignItems: "center",
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
    marginTop: 30,
  },
  topView: { width: "90%" },
  topView1: {
    width: "90%",
    alignItems: "center",
  },
  BoxMianView: {
    width: "100%",
    backgroundColor: "#000",
    borderRadius: 20,
    alignItems: "center",
    paddingVertical: 10,
  },
  dotmainview: {
    width: "100%",
    flexDirection: "row",
    marginTop: 10,
  },
  dotview: {
    width: "10%",
    alignItems: "center",
    marginTop: 5,
  },
  textstyle: {
    color: "#fff",
    fontSize: RFValue(10, 580),
    fontFamily: "Poppins-Regular",
  },
  textstyles: {
    color: "#fff",
    fontSize: RFValue(10, 580),
    fontFamily: "Poppins-Regular",
  },
  textstyleBold: {
    color: "#fff",
    fontSize: RFValue(13, 580),
    fontFamily: "Poppins-SemiBold",
    marginTop: heightPercentageToDP(-0.5),
  },
});
