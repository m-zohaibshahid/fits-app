/* eslint-disable prettier/prettier */
import React from "react";
import { View, ImageBackground, Pressable } from "react-native";
import * as Images from "../../../constants/Images";
import Button from "../../../Components/Button";
import styles from "./styles";

import { NavigationSwitchProp } from "react-navigation";
import Typography from "../../../Components/typography/text";

interface Props {
  navigation: NavigationSwitchProp;
}

const WelcomeScreen: React.FC<Props> = ({ navigation }) => {
  // Functions
  const goToNext = () => {
    return navigation.navigate("SelectStatusScreen");
  };

  return (
    <View style={styles.mainContainer}>
      <ImageBackground resizeMode="stretch" style={styles.mainBgImage} source={Images.welcomeBgImage}>
        <View style={styles.mainFooterRect}>
          <Typography
            size="title"
            align="center"
            color="whiteRegular"
            weight="800"
            bottom="mb7"
            style={{
              lineHeight: 35,
            }}
          >
            Find the trainer {"\n"} that FITS you
          </Typography>
          <Button style={{ width: "90%" }} label="Create account" onPress={goToNext} />
          <Pressable style={styles.bottomTextMainRect} onPress={() => navigation.navigate("SignIn")}>
            <Typography color={"white"}>Already a member? </Typography>
            <Typography color="redColor" style={styles.signInText}>
              Sign in
            </Typography>
          </Pressable>
        </View>
      </ImageBackground>
    </View>
  );
};

export default WelcomeScreen;
