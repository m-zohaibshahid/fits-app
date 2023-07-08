import React, { useState } from "react";
import { Text, View, Pressable, ScrollView, StyleSheet } from "react-native";
import Button from "../../../Components/Button";
import Header from "../../../Components/Header";
import { NavigationSwitchProp } from "react-navigation";
import Colors from "../../../constants/Colors";
import { Platform } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { useFitnessLevelChooseMutation } from "../../../slice/FitsApi.slice";
import { UserDetail } from "../../../interfaces";
import { useSelector } from "react-redux";
import { errorToast } from "../../../utils/toast";
import Container from "../../../Components/Container";

interface PropsInterface {
  navigation: NavigationSwitchProp
}

const FitnessLevelScreen = ({ navigation }: PropsInterface) => {
  // Hooks
  const { userInfo } = useSelector((state: { fitsStore: Partial<UserDetail> }) => state.fitsStore);
  const [value, setValue] = useState("");
  const [key, setKey] = useState("");
  const [statusOne, setStatusOne] = useState(false);
  const [statusTwo, setStatusTwo] = useState(false);
  const [statusThree, setStatusThree] = useState(false);
  const [statusFour, setStatusFour] = useState(false);
  const [mutateAsyncFitnessLevelChoose, { isLoading }] = useFitnessLevelChooseMutation()

  // Functions
  const selectLevelFirst = () => {
    setStatusOne(true);
    setValue("1");
    setKey("level_1");
    setStatusTwo(false);
    setStatusThree(false);
    setStatusFour(false);
  };

  const selectLevelSecond = () => {
    setStatusOne(false);
    setStatusTwo(true);
    setValue("2");
    setKey("level_2");
    setStatusThree(false);
    setStatusFour(false);
  };

  const selectLevelThird = () => {
    setStatusOne(false);
    setStatusTwo(false);
    setStatusThree(true);
    setValue("3");
    setKey("level_3");
    setStatusFour(false);
  };

  const selectLevelFourth = () => {
    setStatusOne(false);
    setStatusTwo(false);
    setStatusThree(false);
    setStatusFour(true);
    setValue("4");
    setKey("level_4");
  };

  const gotToNextScreen = async () => {
    navigation.navigate("CheckUser");
  };

  const handleCallPersonalInfoUpdate = async () => {
    const fitnessLevelInfo = { fitness_level: { value: value, key: key }};
    let result = await mutateAsyncFitnessLevelChoose(fitnessLevelInfo)
    if (result?.data) gotToNextScreen()
    if (result?.error) errorToast(result.error?.error?.message);
  }
  
  return (
    <Container>
      <Header label={"Fitness Level"} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.mainBody}>
          <View style={styles.mainFirstRectForRow}>
            <View style={styles.firstCol}>
              <Pressable
                onPress={() => {
                  selectLevelFirst();
                }}
                style={[statusOne ? styles.innerBorderBox : styles.innerBox]}
              >
                <Text style={styles.titleText}>(Level-1){"\n"}Beginner</Text>
              </Pressable>
            </View>
            <View style={styles.secondCol}>
              <Pressable
                onPress={() => {
                  selectLevelSecond();
                }}
                style={[statusTwo ? styles.innerBorderBox : styles.innerBox]}
              >
                <Text style={styles.titleText}>
                  (Level-2){"\n"}Intermediate
                </Text>
              </Pressable>
            </View>
          </View>

          <View style={{ flexDirection: "row", marginTop: 20 }}>
            <View style={styles.firstCol}>
              <Pressable
                onPress={() => {
                  selectLevelThird();
                }}
                style={[statusThree ? styles.innerBorderBox : styles.innerBox]}
              >
                <Text style={styles.titleText}>(Level-3){"\n"}Advanced</Text>
              </Pressable>
            </View>
            <View style={styles.secondCol}>
              <Pressable
                onPress={() => {
                  selectLevelFourth();
                }}
                style={[statusFour ? styles.innerBorderBox : styles.innerBox]}
              >
                <Text style={styles.titleText}>(Level-4){"\n"}Elite</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
        <Button
          loader={isLoading}
          label={"Done"}
          disabled={!value || !key}
          onPress={handleCallPersonalInfoUpdate}
        />
    </Container>
  );
};
export default FitnessLevelScreen;


const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingTop: Platform.OS === "ios" ? 40 : 0,
    paddingBottom: Platform.OS === "ios" ? 0 : 0,
  },
  mainBody: {
    width: "100%",
    height: "80%",
    alignItems: "center",
  },
  mainFirstRectForRow: {
    flexDirection: "row",
    marginTop: "3%",
  },
  firstCol: {
    width: "50%",
    alignItems: "flex-start",
  },
  secondCol: {
    width: "50%",
    alignItems: "flex-end",
  },
  innerBox: {
    width: 180,
    height: 180,
    backgroundColor: "#000000",
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  innerBorderBox: {
    width: 180,
    height: 180,
    backgroundColor: "#000000",
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#ff0000",
  },
  titleText: {
    color: "#fff",
    textAlign: "center",
    fontSize: RFValue(12, 580),
    fontFamily: "Poppins-SemiBold",
    lineHeight: 21,
    letterSpacing: 2,
  },
});