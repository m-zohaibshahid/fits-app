import React, { useState } from "react";
import {
  View,
  ScrollView,
} from "react-native";
import TextInput from '../../../Components/Input'
import Header from "../../../Components/Header";
import Button from "../../../Components/Button";
import { url } from "../../../constants/url";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import Container from "../../../Components/Container";
import Model from "../../../Components/model";

const SignUpScreen = ({ navigation }: any) => {
  // Hooks
  const route = useRoute();
  const [hidePass, setHidePass] = useState(true);
  const [email, setEmail] = useState(""); //abbastrainee1@yopmail.com
  const [password, setPassword] = useState(""); //Abbas110@
  const [confirmPassword, setConfirmPassword] = useState(""); //Abbas110@
  const [load, setLoad] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const storeUserData = async (userData: any) => {
    try {
      setLoad(false);
      await AsyncStorage.setItem("userData", JSON.stringify(userData));
      navigation.navigate("Verification");
    } catch (e) {
      console.log(e);
    }
  };

  const signupCall = async () => {
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
            setIsModalVisible(true);
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
  };

  const handleModelButtonClick = () => {
    setIsModalVisible(false);
    navigation.navigate("SignIn");
  }
  const handleOnModelCloseRequest = () => {
    setIsModalVisible(false);
  }
  
  return (
    <Container>
      <Header
        label={"Let's start here"}
        subLabel={"Fill in your details to begin"}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
          <TextInput
                  label="E-mail"
                  placeholder="xyz@gmail.com"
                  value={email}
                  onChangeText={setEmail}
          />
                <TextInput
                  label="Password"
                  placeholder="••••••••••"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={hidePass ? true : false}
                />
          <TextInput
            onChangeText={setConfirmPassword}
            value={confirmPassword}
                  label="Password"
                  placeholder="••••••••••"
                  secureTextEntry
                />
      </ScrollView>
      <View
        style={{ paddingVertical: 20, height: "20%", justifyContent: "center" }}
      >
        <Button
          loader={load}
          disabled={!email || !password || !confirmPassword}
          label={"NEXT"}
          onPress={signupCall}
        />
      </View>
      <Model visible={isModalVisible} onClick={handleModelButtonClick} onRequestClose={handleOnModelCloseRequest} />
    </Container>
  );
};

export default SignUpScreen;
