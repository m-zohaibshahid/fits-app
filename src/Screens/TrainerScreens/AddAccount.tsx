import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TextInput, ScrollView, ToastAndroid, ActivityIndicator, TouchableOpacity, Platform, Alert } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import Header from "../../Components/Header";
import Colors from "../../constants/Colors";
import Button from "../../Components/Button";
import { url } from "../../constants/url";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCreateStripeCardMutation, useGetUserMeQuery } from "../../slice/FitsApi.slice";
import { NavigationSwitchProp } from "react-navigation";
interface PropsInterface {
  navigation: NavigationSwitchProp;
}
const AddAccount: React.FC<PropsInterface> = ({ navigation }) => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("");
  const [expiryYear, setExpiryYear] = useState("");
  const [cvc, setCvc] = useState("");
  const { data: userMeData, isLoading } = useGetUserMeQuery({});
  const [createStripeCard, { data: createCard, isLoading: isLoading1 }] = useCreateStripeCardMutation();

  const GoBack = () => {
    navigation.goBack();
  };

  const NextScreen = () => {
    navigation.navigate("Account");
  };

  const [token, setToken] = useState("");

  const [load, setLoad] = useState(false);
  const [loadx, setLoadx] = useState("");

  const [data, setData] = useState("");

  useEffect(() => {
    navigation.addListener("focus", () => {
      getUserInfo();
      userMe();
    });
  }, []);

  const getUserInfo = async () => {
    const userData = await AsyncStorage.getItem("userData");
    let userDatax = JSON.parse(userData);
    setToken(userDatax?.access_token);
  };

  const userMe = async () => {
    setLoadx(true);
    const userData = await AsyncStorage.getItem("userData");
    let userDatax = JSON.parse(userData);
    await fetch(`${url}/user/me/${userDatax?.data?._id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${userDatax?.access_token}`,
      },
    })
      .then((res) => res.json())
      .then((res2) => {
        setLoadx(false);
        if (res2.success === true) {
          setData(res2.stripe.customer.id);
        } else {
          Alert.alert(res2.errors);
        }
      })
      .catch((error) => {
        setLoadx(false);
        Alert.alert("Something Went Wrong");
        console.log(error);
      });
  };

  const UpdateCard = async () => {
    if (!cardNumber) {
      ToastAndroid.show("Please Enter your Card Number.", ToastAndroid.SHORT);
    } else if (!expiryMonth) {
      ToastAndroid.show("Please Enter your Card Expiry Month.", ToastAndroid.SHORT);
    } else if (!expiryYear) {
      ToastAndroid.show("Please Enter your Card Expiry Year.", ToastAndroid.SHORT);
    } else if (!cvc) {
      ToastAndroid.show("Please Enter your cvc.", ToastAndroid.SHORT);
    } else {
      setLoad(true);
      console.log("object,", data);
      // await fetch(`${url}/stripe/card/${data}`, {
      //   method: "POST",
      //   headers: {
      //     Accept: "application/json",
      //     "Content-Type": "application/json",
      //     Authorization: `Bearer ${token}`,
      //   },
      //   body: JSON.stringify({
      //     card_number: cardNumber,
      //     exp_month: expiryMonth,
      //     exp_year: expiryYear,
      //     cvc: cvc,
      //   }),
      // })
      //   .then((res) => res.json())
      const body = {
        card_number: cardNumber,
        exp_month: expiryMonth,
        exp_year: expiryYear,
        cvc: cvc,
      };
      await createStripeCard({
        id: data,
        ...body,
      })
        .unwrap()
        .then((res2) => {
          setLoad(false);
          if (res2.success) {
            ToastAndroid.show("Card Done", ToastAndroid.LONG);
            NextScreen();
          } else {
            ToastAndroid.show(res2.message, ToastAndroid.LONG);
          }
        })
        .catch((error) => {
          setLoad(false);
          Alert.alert("Something Went Wrong");
          console.log(error);
        });
      // .catch((error) => {
      //   setLoad(false);
      //   Alert.alert("Something Went Wrong");
      //   console.log(error);
      // });
    }
  };

  return (
    <View style={styles.container}>
      {/*Header rect start*/}
      <View style={styles.header}>
        <View style={styles.fixeheight}>
          <Header navigation={navigation} onPress={GoBack} />
        </View>
        <View style={styles.fixeheight1}>
          <View style={styles.PersonalinfoView}>
            <View style={{ width: "60%", alignItems: "flex-start" }}>
              <TouchableOpacity>
                <Text style={styles.PersonalinfoText}>Card Details</Text>
              </TouchableOpacity>
              <Text style={styles.filldetailsText}>Fill in your details</Text>
            </View>
          </View>
        </View>
      </View>
      {/*Header rect end*/}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.main}>
          <View style={styles.inputTopView}>
            <View style={styles.inputtopviews}>
              <View style={styles.inputnameView}>
                <Text style={styles.inputnameText}>Card Number</Text>
              </View>
              <View style={styles.textinputView}>
                <TextInput style={styles.inputEmail} placeholder="Number" placeholderTextColor="white" keyboardType="numeric" maxLength={16} value={cardNumber} onChangeText={setCardNumber} />
              </View>
            </View>
          </View>
          <View style={styles.inputTopView}>
            <View style={styles.inputtopviews}>
              <View style={styles.inputnameView}>
                <Text style={styles.inputnameText}>Expiry Month</Text>
              </View>
              <View style={styles.textinputView}>
                <TextInput style={styles.inputEmail} placeholder="Month" placeholderTextColor="white" keyboardType="numeric" maxLength={2} value={expiryMonth} onChangeText={setExpiryMonth} />
              </View>
            </View>
          </View>
          <View style={styles.inputTopView}>
            <View style={styles.inputtopviews}>
              <View style={styles.inputnameView}>
                <Text style={styles.inputnameText}>Expiry Year</Text>
              </View>
              <View style={styles.textinputView}>
                <TextInput style={styles.inputEmail} placeholder="Year" placeholderTextColor="white" keyboardType="numeric" maxLength={2} value={expiryYear} onChangeText={setExpiryYear} />
              </View>
            </View>
          </View>
          <View style={styles.inputTopView}>
            <View style={styles.inputtopviews}>
              <View style={styles.inputnameView}>
                <Text style={styles.inputnameText}>CVC</Text>
              </View>
              <View style={styles.textinputView}>
                <TextInput style={styles.inputEmail} placeholder="Enter cvc" placeholderTextColor="white" value={cvc} onChangeText={setCvc} keyboardType="numeric" maxLength={3} />
              </View>
            </View>
          </View>
        </View>
        {/* modalVisibleDate End*/}
        <View style={{ paddingVertical: 10, alignItems: "center" }}>
          <Button
            label={load || isLoading ? <ActivityIndicator size="small" color="#fff" /> : "NEXT"}
            onPress={() => {
              if (load === true) {
              } else {
                UpdateCard();
              }
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: Colors.white,
    paddingTop: Platform.OS === "ios" ? 40 : 0,
    paddingBottom: Platform.OS === "ios" ? 0 : 0,
  },
  header: {
    width: "100%",
    height: 150,
  },
  fixeheight: {
    height: 50,
    borderBottomWidth: 0.5,
    justifyContent: "center",
    borderColor: "lightgrey",
    width: "100%",
    alignItems: "center",
  },
  fixeheight1: {
    height: 100,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  main: {
    width: "100%",
    marginTop: 20,
  },
  TopView: {
    width: "100%",
    alignItems: "center",
  },
  topView: { width: "90%" },
  topView1: { width: "90%", alignItems: "center" },
  inner: {
    backgroundColor: Colors.black,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    margin: 10,
    height: 130,
    width: 130,
    borderRadius: 25,
    flexDirection: "column",
  },
  DatePicker: {
    height: 250,
  },
  opercard: {
    marginTop: 10,
    width: "88%",
    alignSelf: "center",
    flexDirection: "row",
  },
  box: {
    width: "50%",
    alignItems: "flex-start",
  },
  BoxViewBoder: {
    backgroundColor: Colors.black,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    margin: 10,
    height: 130,
    width: 130,
    borderRadius: 25,
    flexDirection: "column",
    borderWidth: 2,
    borderColor: "#ff0000",
  },
  box1: {
    width: "50%",
    alignItems: "flex-end",
  },
  inputEmail: {
    borderRadius: 10,
    width: "100%",
    height: 38,
    paddingLeft: 10,
    fontSize: RFValue(10, 580),
    fontFamily: "poppins-regular",
    color: Colors.white,
  },
  inputPassword: {
    borderRadius: 10,
    width: "100%",
    height: 38,
    paddingLeft: 10,
    fontSize: RFValue(10, 580),
    fontFamily: "poppins-regular",
    color: Colors.white,
  },
  iconStyle: { fontSize: 27, color: Colors.lightGray, marginTop: 20 },
  btn: {
    padding: 10,
    margin: 10,
    width: "90%",
    borderRadius: 10,
    color: Colors.infos,
    backgroundColor: Colors.bgRedBtn,
    alignItems: "center",
    justifyContent: "center",
  },
  footer: {
    width: "100%",
    marginBottom: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
  },
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    opacity: 1,
  },
  modalView: {
    margin: 0,
    width: "100%",
    height: "42%",
    margin: 5,
    backgroundColor: Colors.white,
    borderRadius: 7,
    padding: 0,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 6.84,
    elevation: 5,
  },
  modalViewdate: {
    margin: 0,
    width: "100%",
    height: "38%",
    margin: 5,
    backgroundColor: Colors.white,
    borderRadius: 7,
    padding: 0,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 6.84,
    elevation: 5,
  },
  centeredViewCountry: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    opacity: 1,
  },
  modalViewCountry: {
    margin: 0,
    width: "95%",
    height: "60%",
    margin: 5,
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 0,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 6.84,
    elevation: 5,
  },
  cancelView: {
    width: "100%",
    flexDirection: "row",
    marginTop: 10,
  },
  root: { flex: 1, padding: 20 },
  title: { textAlign: "center", fontSize: 30 },
  codeFieldRoot: { marginTop: 28 },
  cell: {
    width: 45,
    height: 35,
    lineHeight: 38,
    fontSize: 24,
    margin: 10,
    borderBottomWidth: 1,
    borderColor: Colors.black,
    textAlign: "center",
  },
  focusCell: {
    borderColor: Colors.black,
  },
  TextDOB: {
    fontSize: RFValue(18, 580),
    fontFamily: "Poppins-SemiBold",
    color: Colors.black,
  },
  TextCancelDone: {
    fontFamily: "poppins-Regular",
    color: Colors.black,
    fontSize: RFValue(12, 580),
  },
  PersonalinfoView: {
    width: "90%",
    flexDirection: "row",
  },
  PersonalinfoText: {
    fontSize: RFValue(23, 580),
    fontFamily: "Poppins-Bold",
    color: Colors.black,
  },
  filldetailsText: {
    fontSize: RFValue(16, 580),
    fontFamily: "poppins-regular",
    color: Colors.gray,
  },
  imageView: {
    width: "40%",
    alignItems: "flex-end",
    justifyContent: "center",
  },
  imagestyle: {
    width: 80,
    height: 80,
    borderRadius: 200 / 2,
  },
  inputTopView: {
    width: "100%",
    alignItems: "center",
    marginTop: 30,
  },
  inputtopviews: {
    width: "90%",
    height: 60,
    backgroundColor: Colors.black,
    borderRadius: 8,
  },
  inputnameView: {
    width: "100%",
    marginTop: 3,
    paddingLeft: 10,
    borderRadius: 8,
  },
  inputnameText: {
    color: Colors.white,
    fontSize: RFValue(9, 580),
    fontFamily: "poppins-regular",
  },
  textinputView: {
    width: "100%",
    borderColor: Colors.white,
    flexDirection: "row",
  },
  genderTopview: {
    width: "90%",
    backgroundColor: Colors.black,
    borderRadius: 10,
    height: 60,
    flexDirection: "row",
  },
  genderText: {
    fontSize: RFValue(13, 580),
    fontFamily: "poppins-regular",
    color: Colors.white,
    left: 10,
  },
  iconView: {
    width: "10%",
    borderColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  Gendertexts: {
    color: Colors.black,
    fontSize: RFValue(16, 580),
    fontFamily: "Poppins-ExtraBold",
  },
  genderonetext: {
    fontSize: RFValue(10, 520),
    color: "#414143",
    fontFamily: "poppins-regular",
  },
  maletext: {
    color: Colors.white,
    fontWeight: "bold",
    fontSize: RFValue(9, 580),
    fontFamily: "poppins-regular",
  },
  oternameview: {
    padding: 15,
    borderRadius: 14,
    width: "80%",
    backgroundColor: Colors.black,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
  oternameviewBorder: {
    padding: 15,
    borderRadius: 14,
    width: "80%",
    backgroundColor: Colors.black,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    borderWidth: 2,
    borderColor: "#ff0000",
  },
  otherText: {
    color: Colors.white,
    fontSize: RFValue(16, 580),
    fontFamily: "poppins-regular",
  },
  otherView: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  canceldoneView: {
    width: "20%",
    alignItems: "center",
    justifyContent: "center",
  },
  DOBView: {
    width: "60%",
    alignItems: "center",
    justifyContent: "center",
  },
  btnmainView: {
    width: "100%",
    alignItems: "center",
    marginTop: 30,
  },
  nextText: {
    color: Colors.white,
    fontSize: RFValue(16, 580),
    fontFamily: "poppins-regular",
  },
  DateText: {
    fontSize: RFValue(12, 580),
    fontFamily: "Poppins-Regular",
    color: Colors.white,
    textAlign: "left",
    left: 10,
  },
});
export default AddAccount;
