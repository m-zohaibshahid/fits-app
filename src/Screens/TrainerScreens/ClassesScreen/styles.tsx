import { StyleSheet } from "react-native";
import Colors from "../../../constants/Colors";
import { RFValue } from "react-native-responsive-fontsize";

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: Platform.OS === "ios" ? 40 : 0,
    paddingBottom: Platform.OS === "ios" ? 0 : 0,
  },
  mainBody: {
    width: "100%",
  },
  CalendarView: {
    width: "90%",
    alignSelf: "center",
  },

  TopView: {
    width: "100%",
    alignItems: "center",
  },

  textstyle: {
    color: "#fff",
    fontSize: RFValue(12, 580),
    fontFamily: "Poppins-Regular",
  },
  dotmainview: {
    width: "100%",
    borderColor: "#fff",
    flexDirection: "row",
    marginTop: 10,
  },
  dotview: {
    width: "10%",
    alignItems: "center",
    marginTop: 5,
  },
  marchmainview: {
    width: "90%",
    backgroundColor: "#000",
    justifyContent: "center",
    borderRadius: 10,
    marginTop: 20,
  },
  marchmainview2: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 7,
    flexDirection: "row",
  },
  marchtext: {
    color: "#fff",
    fontSize: RFValue(11, 580),
    fontFamily: "Poppins-SemiBold",
  },
  Daytext: {
    color: "#fff",
    fontSize: RFValue(8, 580),
    fontFamily: "Poppins-Regular",
  },
  mainbtnView: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#fff",
    marginTop: 15,
  },
  ccbtnview: {
    backgroundColor: "#979797",
    width: 100,
    height: 45,
    borderRadius: 12,
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
  btntextstyle: {
    color: "#fff",
    fontSize: RFValue(10, 580),
    fontFamily: "Poppins-Regular",
  },
});
export default styles;
