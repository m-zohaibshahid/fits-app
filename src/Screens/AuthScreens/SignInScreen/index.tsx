import React, { useEffect, useMemo, useState } from "react";
import { View, Pressable, ScrollView } from "react-native";
import TextInput from "../../../Components/Input";
import Header from "../../../Components/Header";
import Button from "../../../Components/Button";
import styles from "./styles";
import { useLoginUserMutation, useResendVarificationCodeMutation } from "../../../slice/FitsApi.slice";
import { useDispatch } from "react-redux";
import Typography from "../../../Components/typography/text";
import Container from "../../../Components/Container";
import { useNavigation } from "@react-navigation/native";
import { errorToast } from "../../../utils/toast";
import { storeUserDataInAsyncStorage } from "../../../utils/async-storage";
import VarificationModal from "../../../Components/VerificationModal";

const SignInScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isVarificationModalVisible,setIsVarificationModalVisible] = useState<boolean>(false);
  const [loginUserMutateAsync, {isLoading, isError, error}] = useLoginUserMutation() as any
  const [mutateAsyncResendCode, {data: sendCodeOnEmailApiResponse}] = useResendVarificationCodeMutation();

  const dispatch = useDispatch();

/* 
  const resendCodeCall = async () => {
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
      });
  }; */


  const handleLogin = async () => {
    const formValues = {
      email,
      password,
    };

      const result = await loginUserMutateAsync(formValues) as any
      /*  if (result.data.message === "please verify your email first") {
     // storeUserDataInAsyncStorage(JSON.stringify(result.data))

    }
      if (result.data) {
        await storeUserDataInAsyncStorage(JSON.stringify(result.data))
        setIsVarificationModalVisible(true)
      } */
      if (result.error) {
      errorToast(result.error.data.message)
      if (result.error.data.message === "please verify your email first") {
        handleSendCodeOnEmail()
        setIsVarificationModalVisible(true)
      }
    }
  }

  useEffect(() => {
    if (isError) errorToast(error?.error) as any;
  }, [isError])

  const handleSendCodeOnEmail = async () => {
    const body = {
      email: email,
    }
    const result = await mutateAsyncResendCode(body) as any
    if (!!result.error) errorToast(result.error.data.message)
  }

/*   const setDataInAsyncStorageAndUpdateState = async (userInfo: string) => {
    await storeUserTokenInAsyncStorage(userToken)
    await storeUserDataInAsyncStorage(userInfo)
    dispatch(setToken(userToken));
    navigation.navigate("CheckUser")
  }
  
  const handleGetUserInfoFromServer = async () => {
    let result = await getUserInfoFromUserMe()
    await setDataInAsyncStorageAndUpdateState(JSON.stringify(result?.data))
  } */

  const varificationCode = useMemo(() => {
    return sendCodeOnEmailApiResponse?.code
  }, [sendCodeOnEmailApiResponse])

  return (
    <Container style={styles.mainContainer}>
      <Header label={"Welcome"} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.mainBody}>
          <TextInput style={{ marginBottom: 15 }} label={"E-mail"} placeholder={"xyz@fits.com"} value={email} onChangeText={setEmail} />
          <TextInput style={{ marginBottom: 20 }} secureTextEntry label={"Password"} placeholder={"••••••••"} value={password} onChangeText={setPassword} />
          <Pressable onPress={() => navigation.navigate("ForgotPassword")}><Typography align="right" color="softGray" size="paragraph" style={styles.forgottext} weight="500">Forgot Password?</Typography></Pressable>
          <Button  loader={isLoading} label={"Sign In"} disabled={isLoading} onPress={handleLogin} style={{ marginBottom: 20 }} />
          <View style={styles.termsTextRect}>
            <Typography weight="500" align="center" style={{ lineHeight: 20 }}>
              By signing in, I agree with{" "}
              <Typography color="redColor" style={styles.underlinetext}>{" "}Terms of Use</Typography>
              {"\n"}and{" "}
              <Typography color="redColor" style={styles.underlinetext}>{" "}Privacy Policy</Typography>
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
      {isVarificationModalVisible && !!varificationCode ? <VarificationModal isVisible={isVarificationModalVisible} onClose={() => setIsVarificationModalVisible} email={email} code={varificationCode} afterVarified={function (): void {
        throw new Error("Function not implemented.");
      } } /> : null}
    </Container>
  );
};
export default SignInScreen;
