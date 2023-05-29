import { StyleSheet, Platform } from "react-native";
import Colors from "../../../constants/Colors";
import { RFValue } from "react-native-responsive-fontsize";

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingTop: Platform.OS === "ios" ? 40 : 0,
    paddingBottom: Platform.OS === "ios" ? 0 : 0,
  },
  mainHeaderRect: {
    width: "100%",
    height: 160,
  },
  topHeaderRect: {
    height: 100,
    width: "90%",
    alignSelf: "center",
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  homeTitleText: {
    fontSize: RFValue(22, 580),
    fontFamily: "Poppins-Bold",
    color: Colors.black,
    marginTop: 10,
  },
  userTitleText: {
    fontFamily: "Poppins-Regular",
    fontSize: RFValue(10, 580),
    color: "#000",
    textTransform: "capitalize",
  },
  profileImageRect: {
    width: "40%",
    alignItems: "flex-end",
    justifyContent: "center",
  },
  imagestyles: {
    width: 80,
    height: 80,
    borderRadius: 200 / 2,
  },
  secondHeaderRect: {
    height: 35,
    width: "90%",
    alignSelf: "center",
    flexDirection: "row",
    marginTop: 20,
  },
  titleText: {
    fontSize: RFValue(12, 580),
    color: "#ff0000",
    fontFamily: "Poppins-Regular",
  },
  activeTitleText: {
    fontSize: RFValue(12, 580),
    color: "#000",
    fontFamily: "Poppins-Regular",
  },
  mainclassesview: {
    width: "50%",
    alignItems: "center",
  },
  mainBody: {
    width: "100%",
  },
  borderView: {
    width: 30,
    borderWidth: 1,
    borderColor: "#ff0000",
  },
  footerRect: {
    width: "100%",
    height: "15%",
    backgroundColor: Colors.white,
    marginBottom: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "flex-end",
    paddingTop: 7,
    paddingHorizontal: 18,
  },
  addIconRect: {
    width: 56,
    height: 56,
    borderRadius: 40,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  seacherbarmainView: {
    width: "90%",
    alignSelf: "center",
    backgroundColor: "#000",
    height: 55,
    borderRadius: 10,
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "center",
  },
  seacherbariconview: {
    width: "12%",
    alignItems: "center",
    justifyContent: "center",
  },
});
export default styles;
