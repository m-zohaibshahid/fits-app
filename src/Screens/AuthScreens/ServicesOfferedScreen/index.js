import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Pressable,
  TextInput,
  Modal,
  ScrollView,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import Header from "../../../Components/Header";
import Colors from "../../../constants/Colors";
import Button from "../../../Components/Button";
import { url } from "../../../constants/url";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./styles";
import { Toast } from "react-native-toast-message/lib/src/Toast";

const Servicesoffere = ({ navigation }) => {
  // Hooks
  const [value, setValue] = useState("");
  const [key, setKey] = useState("");
  const [id, setId] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [serviceName, setServiceName] = useState("");
  const [load, setLoad] = useState(false);
  const [loadx, setLoadx] = useState(false);
  const [loade, setLoade] = useState(false);
  const [token, setToken] = useState("");
  const [servicesData, setServicesData] = useState([]);
  // variables
  const Manual = [
    {
      service_name: "Gym instructor",
      check: false,
    },
    {
      service_name: "Fitness assessment & nutrition advice",
      check: false,
    },
    {
      service_name: "Personal trainer",
      check: false,
    },
    {
      service_name: "Physical and online workout",
      check: false,
    },
    {
      service_name: "Mental health & welbeing",
      check: false,
    },
    {
      service_name: "Strength and muscular training",
      check: false,
    },
    {
      service_name: "Martial art & Boxing",
      check: false,
    },
    {
      service_name: "Technique Guide",
      check: false,
    },
    {
      service_name: "Cardio/Yoga",
      check: false,
    },
  ];

  // Functions
  const goToNextScreen = async () => {
    navigation.navigate("TrainerTabb");
  };

  const getUserInfo = async () => {
    const userData = await AsyncStorage.getItem("userData");
    let userDatax = JSON.parse(userData);
    setToken(userDatax?.access_token);
    setId(userDatax?.data?._id);
    if (userDatax?.access_token !== null) {
      getAllServices();
    }
  };

  const modalFalse = () => {
    setModalVisible(false);
  };

  const changeServicesSelection = (data, i) => {
    let dummy = [...servicesData];
    let dummy1 = dummy.map((item, index) =>
      index == i ? { ...item, check: !item.check } : { ...item, check: false }
    );
    setValue(i);
    setKey(data?.service_name);
    setServicesData(dummy1);
  };

  const servicesOfferedInfoCall = async () => {
    const services_offerrd_info = { value: value, key: key };
    setLoad(true);

    await fetch(`${url}/user/fitness/choose/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        services_offered: services_offerrd_info,
      }),
    })
      .then((res) => res.json())
      .then((res2) => {
        setLoad(false);
        if (res2.message === "your fitness info updated successfully") {
          goToNextScreen();
          Toast.show({
            type: "success",
            text1: "Goal updated successfully",
          });
        } else {
          Toast.show({
            type: "error",
            text1: "Something went wrong",
          });
        }
      })
      .catch(() => {
        setLoad(false);
        Toast.show({
          type: "error",
          text1: "Something went wrong",
        });
      });
  };

  const getAllServices = async () => {
    const userData = await AsyncStorage.getItem("userData");
    let userDatax = JSON.parse(userData);
    setLoadx(true);
    await fetch(`${url}/services/${userDatax?.data?._id}`, {
      method: "GET",
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
          let newServiceData = result.concat(res2.data);
          setServicesData(newServiceData);
        }
      })
      .catch((error) => {
        setLoadx(false);
      });
  };
  const addServices = async () => {
    if (serviceName === "") {
      Toast.show({
        type: "error",
        text1: "Please enter service name",
      });
      return;
    } else {
      setLoade(true);
      await fetch(`${url}/services`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          service_name: serviceName,
          user: id,
        }),
      })
        .then((res) => res.json())
        .then((res2) => {
          setLoade(false);
          if (res2.message === "created successfully") {
            Toast.show({
              type: "success",
              text1: "Created successfully",
            });
            getAllServices();
            modalFalse();
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

  // Effects
  useEffect(() => {
    navigation.addListener("focus", () => {
      getUserInfo();
    });
  }, [getUserInfo]);

  return (
    <View style={styles.mainContainer}>
      <Header
        label={"Services Offered"}
        subLabel={"(Select appropriate)"}
        navigation={navigation}
        doubleHeader={true}
      />

      <Pressable
        style={styles.addServiceMainView}
        onPress={() => setModalVisible(true)}
      >
        <View style={styles.titleView}>
          <Text style={styles.titleText}>Add new services </Text>
        </View>
        <View style={styles.iconView}>
          <Feather name="plus-circle" color={"#ff0000"} size={25} />
        </View>
      </Pressable>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.mainBody}>
          <View style={styles.mainViewBox}>
            {servicesData.map((item, i) => (
              <Pressable
                key={i}
                onPress={() => {
                  changeServicesSelection(item, i);
                }}
                style={[value === i ? styles.BoxViewBoder : styles.boxView]}
              >
                <Text style={styles.boxviewText}>{item?.service_name}</Text>
              </Pressable>
            ))}
          </View>
          <View style={{ width: "100%", marginVertical: "15%" }}></View>
        </View>
      </ScrollView>
      <View
        style={{
          paddingVertical: 10,
          marginBottom: 0,
          bottom: 0,
          position: "absolute",
          height: "15%",
          justifyContent: "center",
          backgroundColor: Colors.white,
          width: "100%",
        }}
      >
        <Button
          navigation={navigation}
          loader={load}
          disabled={value.length > 0 || !key}
          label={"NEXT"}
          onPress={() => {
            if (!load) {
              servicesOfferedInfoCall();
            }
          }}
        />
      </View>
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
              <View style={{ Width: "100%" }}>
                <Text style={styles.addTitleText}>
                  Add your custom services
                </Text>
              </View>

              <View style={styles.inputMainView}>
                <View style={styles.inputTitleView}>
                  <Text style={styles.inputTitleText}>Title</Text>
                </View>
                <View style={styles.inputTypeMainView}>
                  <View style={styles.inputTypeView}>
                    <TextInput
                      style={styles.inputTypeStyle}
                      placeholder="Add Your Services"
                      placeholderTextColor={Colors.white}
                      value={serviceName}
                      onChangeText={setServiceName}
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
                        addServices();
                        setServiceName("");
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
    </View>
  );
};
export default Servicesoffere;
