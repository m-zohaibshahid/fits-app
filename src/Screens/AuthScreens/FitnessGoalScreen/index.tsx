import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Pressable,
  Modal,
  ScrollView,
  ActivityIndicator,
  Platform,
  StyleSheet,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import Button from "../../../Components/Button";
import Header from "../../../Components/Header";
import Colors from "../../../constants/Colors";
import { url } from "../../../constants/url";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { RFValue } from "react-native-responsive-fontsize";
import { NavigationSwitchProp } from "react-navigation";
import TextInput from "../../../Components/Input";
import { useAddNewGoalMutation, useFitnessLevelChooseMutation } from "../../../slice/FitsApi.slice";
import { errorToast } from "../../../utils/toast";
import Container from "../../../Components/Container";
import Typography from "../../../Components/typography/text";
import { useSelector } from "react-redux";
import { UserDetail } from "../../../interfaces";

interface PropsInterface {
  navigation: NavigationSwitchProp
}

const FitnessGoalScreen = ({ navigation }: PropsInterface) => {
  const { userInfo } = useSelector((state: { fitsStore: Partial<UserDetail> }) => state.fitsStore);
  const [value, setValue] = useState("");
  const [key, setKey] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [goalsData, setGoalsData] = useState<typeof preDefineGoals>(preDefineGoals);
  const [goalName, setGoalName] = useState("");
  const [mutateAsyncFitnessLevelChoose, {isLoading: fitnessLevelChooseLoading}] = useFitnessLevelChooseMutation()
  const [mutateAsyncAddNewGoal] = useAddNewGoalMutation()

  const goToNextScreen = async () => {
    navigation.navigate("CheckUser");
  };

  const handleUpdatePersonalInfo = async () => {
    const fitness_goal = { value: value, key: key };
    let result = await mutateAsyncFitnessLevelChoose({ fitness_goal })
    if (result?.data) goToNextScreen()
    if (result?.error) errorToast(result.error?.error?.message);
  }
  ``
  const handleCreateNewGoal = async () => {
    const body = {
      goal_name: goalName,
      user: userInfo?.user._id,
    }
    const result = await mutateAsyncAddNewGoal(body)
    if (result?.error) errorToast(result.error?.error?.message);
    if (result?.data) {
      setGoalsData((pre) => [...pre,  {
        goal_name: goalName,
      }])
      setModalVisible(false)
    }
  };

  const changeGoalsSelection = (data, i) => {
    let dummy = [...goalsData];
    let dummy1 = dummy.map((item, index) =>
      index === i ? { ...item, check: !item.check } : { ...item, check: false }
    );
    setValue(i);
    setKey(data?.goal_name);
    setGoalsData(dummy1);
  };

  return (
    <Container>
      <Header label={"Fitness Goal"} />
      <Pressable style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Typography size={'heading2'} weight="700" style={{marginRight: 2}}>Add your own fitness goal</Typography>
        <Feather name="plus-circle" color={Colors.primary} size={25} />
      </Pressable>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.mainBody}>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              flexWrap: "wrap",
            }}
          >
            {goalsData.map((item, i) => (
              <View style={{ width: "50%", alignItems: "center" }} key={i}>
                <Pressable
                  onPress={() => {
                    changeGoalsSelection(item, i);
                  }}
                  style={[item.check ? styles.borderedView : styles.box]}
                  key={i}
                >
                  <Text style={styles.TextStyle}>{item.goal_name}</Text>
                </Pressable>
              </View>
            ))}
          </View>

          <View style={{ marginTop: 25, width: "100%" }}>
            <Button
              loader={fitnessLevelChooseLoading}
              disabled={!value && !key}
              label={"Done"}
              onPress={handleUpdatePersonalInfo}
            />
          </View>
        </View>
      </ScrollView>
      {/*filter option model  Start*/}
      <Modal animationType='fade' transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <View style={styles.bottomView}>
          <View style={styles.modalContainer}>
            <TextInput
               label="Title"
               placeholder="Add Your Goals"
               placeholderTextColor={Colors.white}
               value={goalName}
                onChangeText={setGoalName}
            />
            <Button label={"Create"} onPress={handleCreateNewGoal} disabled={goalName.trim() === ""} /> 
            </View>
          </View>
        </Modal>
      {/*end modal*/}
    </Container>
  );
};

export default FitnessGoalScreen;


const styles = StyleSheet.create({
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'space-between',
  },
    bottomView: {
      flex: 1,
      justifyContent: 'flex-end',
      backgroundColor: Colors.transparentBlack,
    },
    modalContainer: {
      backgroundColor: Colors.white,
      borderRadius: 10,
      paddingHorizontal: 24,
      paddingTop: 28,
      shadowColor: Colors.black,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 6.84,
      elevation: 9,
    },
  mainContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingTop: Platform.OS === "ios" ? 40 : 0,
    paddingBottom: Platform.OS === "ios" ? 0 : 0,
  },
  mainBody: {
    width: "100%",
    height: "80%",
    alignItems: "center",
  },
  flexmain: { width: "90%", alignSelf: "center", alignItems: "center" },
  flexDirectionView: {
    width: "100%",
    flexDirection: "row",
    height: 30,
    borderColor: Colors.black,
    marginBottom: 10,
  },
  titleText: {
    fontSize: RFValue(15, 580),
    color: Colors.black,
    fontFamily: "Poppins-SemiBold",
  },
  box: {
    width: 180,
    height: 180,
    marginTop: 25,
    backgroundColor: "#000000",
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    paddingHorizontal: 10,
  },
  borderedView: {
    width: 180,
    height: 180,
    marginTop: 25,
    backgroundColor: "#000000",
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    margin: 10,
    borderColor: "#ff0000",
    paddingHorizontal: 10,
  },
  TextStyle: {
    color: "#fff",
    fontSize: RFValue(12, 580),
    fontFamily: "Poppins-SemiBold",
    textAlign: "center",
    lineHeight: 21,
    letterSpacing: 2,
  },
  inputMainView: {
    width: "90%",
    backgroundColor: Colors.black,
    borderRadius: 8,
    marginTop: "3%",
    marginBottom: "3%",
    justifyContent: "center",
    alignSelf: "center",
    height: Platform.OS === "ios" ? 60 : 60,
  },
  inputTitleView: {
    width: "95%",
    alignSelf: "center",
    height: 20,
    justifyContent: "center",
  },
  inputTitleText: {
    color: Colors.white,
    fontSize: Platform.OS === "ios" ? RFValue(8, 580) : RFValue(10, 580),
    fontFamily: "poppins-regular",
  },
  inputTypeMainView: {
    width: "95%",
    alignSelf: "center",
    borderColor: Colors.white,
    flexDirection: "row",
    height: 40,
  },
  inputTypeView: {
    width: "90%",
    height: 40,
    justifyContent: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  modalView: {
    width: "100%",
    paddingVertical: 20,
    backgroundColor: Colors.white,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 6.84,
    borderWidth: 1,
    borderColor: "lightgrey",
    elevation: 5,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  addText: {
    textAlign: "center",
    fontSize: RFValue(16, 580),
    fontFamily: "Poppins-SemiBold",
    color: "black",
  },
  rowView: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  mainbtnView: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#fff",
  },
  ccbtnview: {
    backgroundColor: "#F2F2F2",
    width: 163,
    height: 58,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  profilebtnview: {
    backgroundColor: "#ff0000",
    width: 163,
    height: 58,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  btntextstyle: {
    color: "#ff0000",
    fontSize: RFValue(12, 580),
    fontFamily: "Poppins-Regular",
  },
  btntextstyle1: {
    color: "#fff",
    fontSize: RFValue(12, 580),
    fontFamily: "Poppins-Regular",
  },
});

const preDefineGoals = [
  {
    goal_name: "Gym instructor",
  },
  {
    goal_name: "Fitness assessment & nutrition advice",
  },
  {
    goal_name: "Personal trainer",
  },
  {
    goal_name: "Physical and online workout",
  },
]