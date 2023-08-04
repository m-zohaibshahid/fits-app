import React from "react";
import { View, StyleSheet } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {  RFValue } from "react-native-responsive-fontsize";
import { useRoute } from "@react-navigation/native";
import { heightPercentageToDP } from "react-native-responsive-screen";
import moment from "moment";
import Container from "../../Components/Container";
import Typography from "../../Components/typography/text";

const About = () => {
  const route = useRoute();
  return (
    <Container >
      {/*Start BoxView*/}
        <View style={styles.topView}>
          <View style={styles.BoxMianView}>
            <View style={styles.dotmainview}>
              <View style={{ width: "90%" }}>
                <Typography color="white" size={'heading4'}>Age</Typography>
                <Typography color="white">
                  {moment(route?.params?.personalData?.date_of_birth)
                    .month(0)
                    .from(moment().month(0))}
                </Typography>
              </View>
            </View>
            <View style={styles.dotmainview}>
              <View style={{ width: "90%" }}>
              <Typography color="white" size={'heading4'}>Experience</Typography>
              <Typography size={'heading6'} color="white">
                {route?.params?.professionalData?.experience_year} Year
              </Typography>
              <Typography size={'heading6'} color="white90">
                {route?.params?.professionalData?.experience_note}
              </Typography>
              </View>
            </View>
            <View style={styles.dotmainview}>
              <View>
                <Typography color="white" size={'heading4'}>
                  Qualifications
              </Typography>
              {route?.params?.professionalData?.qualification.map((item: any) => {
                return <View style={{ flexDirection: 'row'}}>
                        <View style={styles.dotview}>
                          <FontAwesome name="circle" style={{ color: "#979797" }} />
                        </View>
                        <View>
                          <Typography size={'heading6'} color="white">
                            {item.degree}
                            {" "}
                          </Typography>
                          <Typography size={'heading6'} color="white90">
                            {item.degree_note}
                          </Typography>
                          </View>
                        </View>
                  })}
              </View>
            </View>
            <View style={styles.dotmainview}>
              <View>
                <Typography color="white" size={'heading4'}>
                Service Offered
              </Typography>
                <View style={{ flexDirection: 'row'}}>
              <View style={styles.dotview}>
                    <FontAwesome name="circle" style={{ color: "#979797" }} />
                  </View>
                    <Typography style={{marginLeft: 5}} size={'heading6'} color="white">
                      {route?.params?.userData.user.services_offered.key}
                    </Typography>
                </View>
              </View>
            </View>
          </View>
        </View>
      {/*End BoxView*/}
    </Container>
  );
};
export default About;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fixeheight1: {
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
  topView: { width: "90%" },
  topView1: {
    width: "100%",
    alignItems: "center",
  },
  BoxMianView: {
    width: "100%",
    backgroundColor: "#000",
    borderRadius: 10,
    alignItems: "center",
    padding: 10,
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
