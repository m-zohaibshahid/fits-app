/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  Modal,
  ScrollView,
  Platform,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import styles from "./styles";
import Toast from "react-native-toast-message";
import Button from "../../../Components/Button";
import Header from "../../../Components/Header/index";
import { useRegisterUserMutation } from "../../../slice/FitsApi.slice";
import Colors from "../../../constants/Colors";
import { ParamListBase, RouteProp, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignUpScreen = ({ navigation }: any) => {
  // Hooks
  const { params }: RouteProp<ParamListBase | any> = useRoute();
  const [hidePass, setHidePass] = useState(true);
  const [email, setEmail] = useState(""); //abbastrainee1@yopmail.com
  const [password, setPassword] = useState(""); //Abbas110@
  const [confirmPassword, setConfirmPassword] = useState(""); //Abbas110@
  const [modalVisible, setModalVisible] = useState(false);

  const storeUserData = async (userData: any) => {
    try {
      await AsyncStorage.setItem("userData", JSON.stringify(userData));
      navigation.navigate("Verification");
    } catch (e) {
      console.log(e);
    }
  };

  const [registerUser, { isLoading, isError, isSuccess }] =
    useRegisterUserMutation();
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
      registerUser({ role: params?.role ?? "trainee", email, password })
        .unwrap()
        .then((data) => {
          console.log("data-----", data);
          // Registration successful, handle the response data
          if (data.message === "success" || isSuccess) {
            Toast.show({
              type: "success",
              text1: "OTP sent to your email",
            });
            navigation.navigate("Verification");
            storeUserData(data.data);
          }
        })
        .catch((error) => {
          // Registration failed, handle the error
          console.error("Registration error:", error);
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
                  // label="Email"
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
                  // label="Password"
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
                  // label="Password"
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
          // loader={load}
          disabled={!email || !password || !confirmPassword}
          label={"NEXT"}
          onPress={() => {
            // navigation.navigate('Verification');
            signupCall();
          }}
        />
      </View>
      {/*Modal Start*/}
      {/* <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      > */}
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
      {/* </Modal> */}
      {/* Modal End*/}
    </View>
  );
};

export default SignUpScreen;
