/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from "react";
import { Text, View, Pressable, ActivityIndicator, ScrollView } from "react-native";
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from "react-native-confirmation-code-field";
import { RFValue } from "react-native-responsive-fontsize";
import Header from "../../../Components/Header";
import Button from "../../../Components/Button";
import { useNavigation, useRoute } from "@react-navigation/native";
import { url } from "../../../constants/url";
import styles from "./styles";
import { Toast } from "react-native-toast-message/lib/src/Toast";

const ForgotCode = () => {
  const route: any = useRoute();
  const navigation = useNavigation();
  const [load, setLoad] = useState(false);
  const [code, setCode] = useState("0000");
  const [loadx, setLoadx] = useState(false);
  const CELL_COUNT = 5;
  const [value, setValue] = useState("");
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const NextScreen = (email: string) => {
    navigation.navigate("GeneratePassword", {
      email: email,
    });
  };
  const verifyCode = async () => {
    if (value === "") {
      Toast.show({
        type: "error",
        text1: "Please Enter code.",
      });
    } else {
      setLoad(true);
      await fetch(`${url}/code-verify`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: route?.params?.email[0],
          code: value,
          type: "forgot_password",
        }),
      })
        .then((res) => res.json())
        .then((res2) => {
          setLoad(false);
          if (res2.message === "verified") {
            Toast.show({
              type: "success",
              text1: res2.message,
            });
            NextScreen(route?.params?.email[0]);
          } else {
            Toast.show({
              type: "error",
              text1: res2.message,
            });
          }
        })
        .catch((error) => {
          setLoad(false);
          Toast.show({
            type: "error",
            text1: error,
          });
          console.log(error);
        });
    }
  };

  const resendCode = async () => {
    setLoadx(true);

    await fetch(`${url}/email-send`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: route?.params?.email[0],
      }),
    })
      .then((res) => res.json())
      .then((res2) => {
        setLoadx(false);
        setCode(res2.data.code);
        if (res2.message === "send code successfully") {
          Toast.show({
            type: "success",
            text1: res2.message,
          });
        } else {
          Toast.show({
            type: "error",
            text1: res2.message,
          });
        }
      })
      .catch((error) => {
        setLoad(false);
        Alert.alert("Something Went Wrong");
        console.log(error);
      });
  };
  useEffect(() => {
    setCode(route.params.email[1].data.code);
  }, []);
  return (
    <View style={styles.mainContainer}>
      <Header label={"Forgot Password"} navigation={navigation} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.mainBody}>
          <View style={{ width: "90%", alignSelf: "center" }}>
            <Text style={styles.subTitle}>Verification code has been sent to {"\n"} your email</Text>
          </View>
          <View style={{ width: "90%", marginTop: 10, alignSelf: "center" }}>
            <Text style={styles.secondText}>Please enter this code {code}</Text>
          </View>
          <View style={{ width: "80%", alignSelf: "center", marginTop: "5%" }}>
            <CodeField
              ref={ref}
              {...props}
              value={value}
              onChangeText={setValue}
              cellCount={CELL_COUNT}
              rootStyle={styles.codeFieldRoot}
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              renderCell={({ index, symbol, isFocused }) => (
                <View style={{ borderBottomWidth: 1 }}>
                  <Text key={index} style={[styles.cell, isFocused && styles.focusCell]} onLayout={getCellOnLayoutHandler(index)}>
                    {symbol || (isFocused ? <Cursor /> : null)}
                  </Text>
                </View>
              )}
            />
          </View>

          <View style={{ width: "100%", marginTop: "20%", alignItems: "center" }}>
            <Button
              navigation={navigation}
              label={"Next"}
              loader={load}
              onPress={() => {
                !load && verifyCode();
              }}
            />
          </View>
          <View
            style={{
              width: "100%",
              marginTop: "2%",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <View style={{ width: "65%", alignItems: "flex-end" }}>
              <Text
                style={{
                  color: "#000000",
                  marginTop: 10,
                  fontSize: RFValue(14, 580),
                  fontFamily: "Poppins-Regular",
                  alignItems: "center",
                }}
              >
                Don’t have an account ?
              </Text>
            </View>
            <View style={{ width: "40%" }}>
              <Pressable
                onPress={() => {
                  !loadx && resendCode();
                }}
              >
                <Text
                  style={{
                    color: "#FF0000",
                    fontSize: RFValue(12, 580),
                    fontFamily: "Poppins-Regular",
                    textDecorationLine: "underline",
                    marginTop: 10,
                  }}
                >
                  {loadx === true ? <ActivityIndicator size="small" color="#000" /> : "Resend Email"}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ForgotCode;
