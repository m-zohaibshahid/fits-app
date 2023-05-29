import { StyleSheet, Platform } from "react-native";
import Colors from "../../../constants/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFValue } from "react-native-responsive-fontsize";

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingTop: Platform.OS === "ios" ? 40 : 0,
    paddingBottom: Platform.OS === "ios" ? 0 : 0,
  },
  mainBody: {
    width: "100%",
    height: "80%",
    alignItems: "center",
  },
  mainFirstRectForRow: {
    width: "90%",
    flexDirection: "row",
    marginTop: "3%",
  },
  firstCol: {
    width: "50%",
    alignItems: "flex-start",
  },
  secondCol: {
    width: "50%",
    alignItems: "flex-end",
  },
  innerBox: {
    width: 150,
    height: 150,
    backgroundColor: "#000000",
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  innerBorderBox: {
    width: 150,
    height: 150,
    backgroundColor: "#000000",
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#ff0000",
  },
  titleText: {
    color: "#fff",
    textAlign: "center",
    fontSize: RFValue(12, 580),
    fontFamily: "Poppins-SemiBold",
    lineHeight: 21,
    letterSpacing: 2,
  },
});
export default styles;
