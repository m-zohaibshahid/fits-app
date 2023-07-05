import React, { useState } from "react";
import { Text, View, Pressable, ScrollView, ToastAndroid, Modal, Platform } from "react-native";
import TextInput from "../../../Components/Input";
import Header from "../../../Components/Header";
import Button from "../../../Components/Button";
import { url } from "../../../constants/url";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import styles from "./styles";
import { useLoginUserMutation } from "../../../slice/FitsApi.slice";
import { useDispatch } from "react-redux";
import { LoginInterface } from "../../../slice/store.interface";
import { setToken } from "../../../slice/token.slice";
import { setUserInfo } from "../../../slice/FitsSlice.store";
import Typography from "../../../Components/typography/text";
import Container from "../../../Components/Container";
import { useNavigation } from "@react-navigation/native";

const SignInScreen = () => {
  const navigation = useNavigation();
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
          ToastAndroid.show("OTP sent to your email, please check your email", ToastAndroid.LONG);
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
          dispatch(setUserInfo(res2?.data));
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
    <Container style={styles.mainContainer}>
      <Header label={"Welcome"} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.mainBody}>
          <TextInput style={{ marginBottom: 15 }} label={"E-mail"} placeholder={"xyz@fits.com"} value={email} onChangeText={setEmail} />
          <TextInput style={{ marginBottom: 20 }} secureTextEntry label={"Password"} placeholder={"••••••••"} value={password} onChangeText={setPassword} />
          <Pressable onPress={() => navigation.navigate("ForgotPassword")}>
            <Typography align="right" color="softGray" size="paragraph" style={styles.forgottext} weight="500">
              Forgot Password?
            </Typography>
          </Pressable>

          <Button
            loader={load}
            label={"Sign In"}
            disabled={!email || !password}
            onPress={() => {
              if (!load) {
                signInCall();
              }
            }}
            style={{ marginBottom: 20 }}
          />

          <View style={styles.termsTextRect}>
            <Typography weight="500" align="center" style={{ lineHeight: 20 }}>
              By signing in, I agree with{" "}
              <Typography color="redColor" style={styles.underlinetext}>
                {" "}
                Terms of Use
              </Typography>
              {"\n"}and{" "}
              <Typography color="redColor" style={styles.underlinetext}>
                {" "}
                Privacy Policy
              </Typography>
            </Typography>
          </View>
        </View>
      </ScrollView>

      <Pressable style={styles.footerMainView} onPress={() => navigation.navigate("SelectStatusScreen")}>
        <Typography size="paragraph" weight="400" align="center">
          Don’t have an account?
          <Typography color="redColor" size="button" weight="700">
            {" "}
            Sign up
          </Typography>
        </Typography>
      </Pressable>

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
              <Text style={styles.vercodetext}>Your Email isn't verified. Please go to email verification screen...</Text>
            </View>

            <View
              style={{
                marginTop: Platform.OS === "ios" ? 50 : 10,
                width: "100%",
              }}
            >
              <Button
                loader={loadxx}
                label={"Go"}
                onPress={() => {
                  if (!loadxx) resendCodeCall();
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
      {/* Modal End*/}
    </Container>
  );
};
export default SignInScreen;
