import { StyleSheet } from "react-native";
import Colors from "../../../constants/Colors";
import { RFValue } from "react-native-responsive-fontsize";

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: "100%",
    backgroundColor: Colors.white,
    paddingTop: Platform.OS === "ios" ? 40 : 0,
    paddingBottom: Platform.OS === "ios" ? 0 : 0,
  },
  mainBody: {
    width: "100%",
    alignItems: "center",
  },
  inputMainView: {
    width: "90%",
    backgroundColor: Colors.black,
    borderRadius: 8,
    marginTop: "3%",
    marginBottom: "3%",
    justifyContent: "center",
    alignSelf: "center",
    height: Platform.OS === "ios" ? 60 : 60,
  },
  inputTitleView: {
    width: "95%",
    alignSelf: "center",
    height: 20,
    justifyContent: "center",
  },
  inputTitleText: {
    color: Colors.white,
    fontSize: Platform.OS === "ios" ? RFValue(8, 580) : RFValue(10, 580),
    fontFamily: "poppins-regular",
  },
  inputTypeMainView: {
    width: "95%",
    alignSelf: "center",
    borderColor: Colors.white,
    flexDirection: "row",
    height: 40,
  },
  inputTypeView: {
    width: "90%",
    height: 40,
    justifyContent: "center",
  },
  inputTypeStyle: {
    width: "100%",
    height: 40,
    fontSize: RFValue(10, 580),
    fontFamily: "Poppins-Regular",
    color: "#fff",
  },
  descriptionInnerViews: {
    width: "90%",
    marginTop: 5,
    backgroundColor: Colors.black,
    borderRadius: 8,
    flexDirection: "column",
    alignSelf: "center",
    height: 130,
  },

  qualificationsView: {
    width: "90%",
    alignSelf: "center",
    flexDirection: "row",
    marginBottom: 10,
    marginTop: 20,
  },
  qualificationstext: {
    color: Colors.black,
    fontSize: RFValue(18, 580),
    fontFamily: "Poppins-Bold",
    left: 2,
  },
  uptotext: {
    fontSize: RFValue(9, 580),
    fontFamily: "Poppins-Regular",
    marginTop: 10,
  },
  textinputMainview: {
    width: "90%",
    flexDirection: "row",
  },
  bgcolorview: {
    width: "81%",
    backgroundColor: Colors.black,
    borderRadius: 8,
  },
  deleteiconview: {
    width: 50,
    height: 50,
    backgroundColor: Colors.gray,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
});
export default styles;
