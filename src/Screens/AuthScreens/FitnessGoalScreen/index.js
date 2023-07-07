import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Pressable,
  TextInput,
  Modal,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import Button from "../../../Components/Button";
import Header from "../../../Components/Header";
import Colors from "../../../constants/Colors";
import { url } from "../../../constants/url";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./styles";
import { Toast } from "react-native-toast-message/lib/src/Toast";

const FitnessGoalScreen = ({ navigation }) => {
  // Hooks
  const [value, setValue] = useState("");
  const [key, setKey] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [goalsData, setGoalsData] = useState([
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
  ]);
  const [load, setLoad] = useState(false);
  const [loade, setLoade] = useState(false);
  const [loadx, setLoadx] = useState(false);
  const [goalName, setGoalName] = useState("");

  // Functions
  const changeGoalsSelection = (data, i) => {
    let dummy = [...goalsData];
    let dummy1 = dummy.map((item, index) =>
      index === i ? { ...item, check: !item.check } : { ...item, check: false }
    );
    setValue(i);
    setKey(data?.goal_name);
    setGoalsData(dummy1);
  };

  const ModalFalse = () => {
    setModalVisible(false);
  };
  const NextScreen = async () => {
    navigation.navigate("TraineeTabb");
  };

  // submit goals api
  const fitnessGoalInfo = async () => {
    const userData = await AsyncStorage.getItem("userData");
    let userDatax = JSON.parse(userData);
    const fitness_Goal = { value: value, key: key };
    setLoad(true);

    await fetch(`${url}/user/fitness/choose/${userDatax?.data?._id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${userDatax?.access_token}`,
      },
      body: JSON.stringify({
        fitness_goal: fitness_Goal,
      }),
    })
      .then((res) => res.json())
      .then((res2) => {
        setLoad(false);
        if (res2.message === "your fitness info updated successfully") {
          Toast.show({
            type: "success",
            text1: "Your fitness Goal updated successfully",
          });
          NextScreen();
        } else {
          Toast.show({
            type: "error",
            text1: "Something went wrong!",
          });
        }
      })
      .catch(() => {
        setLoad(false);
        Toast.show({
          type: "error",
          text1: "Something went wrong!",
        });
      });
  };

  // add goals
  const AddGoals = async () => {
    const userData = await AsyncStorage.getItem("userData");
    let userDatax = JSON.parse(userData);
    if (goalName === "") {
      Toast.show({
        type: "error",
        text1: "Please enter a fitness goal",
      });
      return;
    } else {
      setLoade(true);
      await fetch(`${url}/goals`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${userDatax?.access_token}`,
        },
        body: JSON.stringify({
          goal_name: goalName,
          user: userDatax?.data?._id,
        }),
      })
        .then((res) => res.json())
        .then((res2) => {
          setLoade(false);
          if (res2.message === "created successfully") {
            getGoals();
            ModalFalse();
            Toast.show({
              type: "success",
              text1: "Fitness Goal created successfully",
            });
          } else {
            Toast.show({
              type: "error",
              text1: "Something went wrong",
            });
          }
        })
        .catch(() => {
          setLoade(false);
          Toast.show({
            type: "error",
            text1: "Something went wrong",
          });
        });
    }
  };
  // show goals
  const getGoals = async () => {
    const userData = await AsyncStorage.getItem("userData");
    let userDatax = JSON.parse(userData);
    setLoadx(true);

    await fetch(`${url}/goals/${userDatax.data._id}`, {
      method: "Get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${userDatax?.access_token}`,
      },
    })
      .then((res) => res.json())
      .then((res2) => {
        setLoadx(false);
        res2.data.map((item) => {
          item.check = false;
          return item;
        });
        if (res2.data) {
          let result = Manual;
          let newGoalsData = result.concat(res2.data);
          setGoalsData(newGoalsData);
        }
      })
      .catch((error) => {
        setLoadx(false);
      });
  };
  const Manual = [
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
  ];

  // Effects

  useEffect(() => {
    navigation.addListener("focus", () => {
      getGoals();
    });
  }, []);

  return (
    <View style={styles.mainContainer}>
      <Header label={"Fitness Goal"} navigation={navigation} />
      <View style={styles.flexmain}>
        <Pressable
          style={styles.flexDirectionView}
          onPress={() => setModalVisible(true)}
        >
          <View style={styles.titleView}>
            <Text style={styles.titleText}>Add your own fitness goal</Text>
          </View>
          <View style={styles.iconView}>
            <Feather name="plus-circle" color={"#ff0000"} size={25} />
          </View>
        </Pressable>
      </View>

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
              navigation={navigation}
              loader={load}
              disabled={!value && !key}
              label={"Done"}
              onPress={() => {
                fitnessGoalInfo();
              }}
            />
          </View>
        </View>
      </ScrollView>
      {/*filter option model  Start*/}
      <View style={styles.centeredView}>
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
              <View style={styles.fixeheight}>
                <View style={{ width: "100%" }}>
                  <Text style={styles.addText}>Add your own fitness goal</Text>
                </View>
              </View>
              <View style={styles.inputMainView}>
                <View style={styles.inputTitleView}>
                  <Text style={styles.inputTitleText}>Title</Text>
                </View>
                <View style={styles.inputTypeMainView}>
                  <View style={styles.inputTypeView}>
                    <TextInput
                      style={styles.inputTypeStyle}
                      placeholder="Add Your Goals"
                      placeholderTextColor={Colors.white}
                      value={goalName}
                      onChangeText={setGoalName}
                    />
                  </View>
                </View>
              </View>
              {/*start btn*/}
              <View style={styles.rowView}>
                <View style={styles.mainbtnView}>
                  <Pressable
                    onPress={() => setModalVisible(false)}
                    style={styles.ccbtnview}
                  >
                    <Text style={styles.btntextstyle}>Cancel</Text>
                  </Pressable>
                </View>
                <View style={styles.mainbtnView}>
                  <Pressable
                    style={styles.profilebtnview}
                    onPress={() => {
                      if (!loade) {
                        AddGoals();
                      }
                    }}
                  >
                    {loade === true ? (
                      <ActivityIndicator size="small" color="#fff" />
                    ) : (
                      <Text style={styles.btntextstyle1}>Create</Text>
                    )}
                  </Pressable>
                </View>
              </View>
              {/*end btn*/}
            </View>
          </View>
        </Modal>
      </View>
      {/*end modal*/}
    </View>
  );
};

export default FitnessGoalScreen;
