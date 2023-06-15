import React, { useState } from "react";
import {
  Text,
  View,
  Pressable,
  TextInput,
  ScrollView,
  ToastAndroid,
  Modal,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Header from "../../../Components/Header";
import Button from "../../../Components/Button";
import Colors from "../../../constants/Colors";
import { url } from "../../../constants/url";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import styles from "./styles";
import { useLoginUserMutation } from "../../../slice/FitsApi.slice";
import { useDispatch } from "react-redux";
import { LoginInterface } from "../../../slice/store.interface";
import { setToken } from "../../../slice/token.slice";
import { setUserInfo } from "../../../slice/FitsSlice.store";

const SignInScreen = ({ navigation }) => {
  // Hooks
  const [hidePass, setHidePass] = useState(true);
  const [email, setEmail] = useState(""); //abbastrainer1@yopmail.com
  const [password, setPassword] = useState(""); //Abbas110@
  const [load, setLoad] = useState(false);
  const [loadxx, setLoadxx] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [loginUser, { data, isLoading, error }] = useLoginUserMutation();

  const dispatch = useDispatch();
  
  // Functions
  const storeData = async (userToken: string, userData: LoginInterface) => {
    try {
      setLoad(false);
      await AsyncStorage.setItem("userToken", JSON.stringify(userToken));
      await AsyncStorage.setItem("userData", JSON.stringify(userData));
      navigation.navigate("LoginNow");
    } catch (e) {
      console.log("error", e);
    }
  };

  const OpneModule = () => {
    return setModalVisible(true);
  };
  const resendCodeCall = async () => {
    setLoadxx(true);

    await fetch(`${url}/resend-email`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
      }),
    })
      .then((res) => res.json())
      .then((res2) => {
        setLoadxx(false);
        if (res2?.code) {
          ToastAndroid.show(
            "OTP sent to your email, please check your email",
            ToastAndroid.LONG
          );
          navigation.navigate("Verification", {
            email: email,
            code: res2?.code,
          });
          setModalVisible(false);
        } else {
          ToastAndroid.show(res2?.message, ToastAndroid.SHORT);
        }
      })
      .catch((error) => {
        setLoadxx(false);
        console.log(error);
      });
  };

  const signInCall = async () => {
    setLoad(true);
    
    if (!email.includes("@")) {
      Toast.show({
        type: "error",
        text1: "Please enter a valid email",
      });
    }
    await loginUser({
      email,
      password,
    })
      .unwrap()
      .then(async (res2) => {
        setLoad(false);
        if (res2?.login) {
          Toast.show({
            type: "success",
            text1: "Login Successfully",
          });
          dispatch(setToken(res2?.access_token));
          dispatch(setUserInfo(res2.data))
          await storeData("usertoken", res2);
        } else if (res2?.message === "please verify your email first") {
          OpneModule();
        } else {
          Toast.show({
            type: "error",
            text1: res2?.message,
          });
        }
      })
      .catch((err) => {
        setLoad(false);
        console.log(err);
      });
  };
  

  return (
    <View style={styles.mainContainer}>
      <Header label={"Welcome"} navigation={navigation} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.mainBody}>
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
                  secureTextEntry={hidePass ? true : false}
                  value={password}
                  onChangeText={setPassword}
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

          <View style={styles.forgotPasswordRect}>
            <View style={{ width: "48%", alignItems: "flex-end" }}>
              <Pressable onPress={() => navigation.navigate("ForgotPassword")}>
                <Text style={styles.forgottext}>FORGOT PASSWORD ?</Text>
              </Pressable>
            </View>
          </View>

          <Button
            navigation={navigation}
            loader={load}
            label={"Sign In"}
            disabled={!email || !password}
            onPress={() => {
              if (!load) {
                signInCall();
              }
            }}
          />

          <View style={styles.termsTextRect}>
            <Text style={styles.signingtest}>
              By signing in I agree with{" "}
              <Text style={styles.underlinetext}>Terms of Use</Text> and{" "}
              <Text style={styles.underlinetext}>Privacy Policy</Text>
            </Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footerMainView}>
        <View style={{ width: "70%", alignItems: "flex-end" }}>
          <Text style={styles.donottext}>Don’t have an account ?</Text>
        </View>
        <View style={{ width: "30%", marginLeft: 5 }}>
          <Pressable onPress={() => navigation.navigate("SelectStatusScreen")}>
            <Text style={styles.singuptext}>Sign up</Text>
          </Pressable>
        </View>
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
                Your Email isn't verified. Please go to email verification
                screen...
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
                loader={loadxx}
                label={"Go"}
                onPress={() => {
                  if (!loadxx) {
                    resendCodeCall();
                  }
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
export default SignInScreen;
