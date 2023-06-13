import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  Modal,
  ScrollView,
  ToastAndroid,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Header from "../../../Components/Header";
import Colors from "../../../constants/Colors";
import Button from "../../../Components/Button";
import { url } from "../../../constants/url";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import styles from "./styles";

const SignUpScreen = ({ navigation }: any) => {
  // Hooks
  const route = useRoute();
  const [hidePass, setHidePass] = useState(true);
  const [email, setEmail] = useState(""); //abbastrainee1@yopmail.com
  const [password, setPassword] = useState(""); //Abbas110@
  const [confirmPassword, setConfirmPassword] = useState(""); //Abbas110@
  const [load, setLoad] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const storeUserData = async (userData) => {
    try {
      setLoad(false);
      await AsyncStorage.setItem("userData", JSON.stringify(userData));
      navigation.navigate("Verification");
    } catch (e) {
      console.log(e);
    }
  };

  const signupCall = async () => {
    if (password.length < 8) {
      Toast.show({
        type: "error",
        text1: "Password be 8 characters",
      });
    } else if (!password.match(/\W/)) {
      Toast.show({
        type: "error",
        text1: "Password must contain at least one letter",
      });
    } else if (!email.includes("@")) {
      Toast.show({
        type: "error",
        text1: "Please enter a valid email",
      });
    } else if (password !== confirmPassword) {
      Toast.show({
        type: "error",
        text1: "Password does not match.",
      });
    } else {
      setLoad(true);
      await fetch(`${url}/register`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          role: route?.params?.role,
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then((res2) => {
          setLoad(false);
          if (res2.message === "success") {
            Toast.show({
              type: "success",
              text1: "OTP sent to your email",
            });
            storeUserData(res2);
          } else if ("Already Have An Account, Please SignIn!") {
            Toast.show({
              type: "error",
              text1: res2?.message,
            });
            setModalVisible(true);
          } else {
            Toast.show({
              type: "success",
              text1: res2?.message,
            });
          }
        })
        .catch(() => {
          setLoad(false);
          Toast.show({
            type: "error",
            text1: "You already have account , Please signin.",
          });
        });
    }
  };

  return (
    <View style={styles.mainContainer}>
      <Header
        label={"Let's start here"}
        subLabel={"Fill in your details to begin"}
        navigation={navigation}
        doubleHeader={true}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.main}>
          {/*Start*/}
          <View style={styles.inputMainView}>
            <View style={styles.inputTitleView}>
              <Text style={styles.inputTitleText}>E-mail</Text>
            </View>
            <View style={styles.inputTypeMainView}>
              <View style={styles.inputTypeView}>
                <TextInput
                  style={styles.inputTypeStyle}
                  label="Email"
                  placeholderTextColor={"#afafafe3"}
                  placeholder="xyz@gmail.com"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>
            </View>
          </View>
          {/*end email*/}
          {/*start password*/}
          <View style={styles.inputMainView}>
            <View style={styles.inputTitleView}>
              <Text style={styles.inputTitleText}>Password</Text>
            </View>
            <View style={styles.inputTypeMainView}>
              <View style={styles.inputTypeView}>
                <TextInput
                  style={styles.inputTypeStyle}
                  label="Password"
                  placeholder="**********"
                  placeholderTextColor={"#afafafe3"}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={hidePass ? true : false}
                />
              </View>
              <View style={styles.hideIconView}>
                <Ionicons
                  name={hidePass ? "eye-off" : "eye"}
                  onPress={() => setHidePass(!hidePass)}
                  size={18}
                  color={Colors.white}
                />
              </View>
            </View>
          </View>
          {/*end password*/}
          {/*start confirm password*/}
          <View style={styles.inputMainView}>
            <View style={styles.inputTitleView}>
              <Text style={styles.inputTitleText}>Confirm Password</Text>
            </View>
            <View style={styles.inputTypeMainView}>
              <View style={styles.inputTypeView}>
                <TextInput
                  style={styles.inputTypeStyle}
                  label="Password"
                  placeholder="**********"
                  placeholderTextColor={"#afafafe3"}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry={hidePass ? true : false}
                />
              </View>
              <View style={styles.hideIconView}>
                <Ionicons
                  name={hidePass ? "eye-off" : "eye"}
                  onPress={() => setHidePass(!hidePass)}
                  size={18}
                  color={Colors.white}
                />
              </View>
            </View>
          </View>
          {/*end confirm password*/}
        </View>
      </ScrollView>
      <View
        style={{ paddingVertical: 20, height: "20%", justifyContent: "center" }}
      >
        <Button
          navigation={navigation}
          loader={load}
          disabled={!email || !password || !confirmPassword}
          label={"NEXT"}
          onPress={() => {
            //navigation.navigate("Verification");
            signupCall();
          }}
        />
      </View>
      {/*Modal Start*/}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{ width: "90%", alignSelf: "center" }}>
              <Text style={styles.vercodetext}>
                Already Have An Account, Please SignIn!
              </Text>
            </View>

            <View
              style={{
                marginTop: Platform.OS === "ios" ? 50 : 10,
                width: "100%",
              }}
            >
              <Button
                navigation={navigation}
                label={"Go"}
                onPress={() => {
                  setModalVisible(false);
                  navigation.navigate("SignIn");
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
      {/* Modal End*/}
    </View>
  );
};

export default SignUpScreen;
