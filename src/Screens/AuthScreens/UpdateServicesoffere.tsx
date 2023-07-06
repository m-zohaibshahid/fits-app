import React, { useState, useEffect } from "react";
import { Text, View, Pressable, StyleSheet, TextInput, Modal, ScrollView, ToastAndroid, ActivityIndicator, Platform, Alert } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import Feather from "react-native-vector-icons/Feather";
import Header from "../../Components/Header";
import Colors from "../../constants/Colors";
import Button from "../../Components/Button";
import { url } from "../../constants/url";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationSwitchProp } from "react-navigation";
interface Props {
  navigation: NavigationSwitchProp;
}

const UpdateServicesoffere: React.FC<Props> = ({ navigation }) => {
  const route = useRoute();

  const [value, setValue] = useState();
  const [key, setKey] = useState("");
  const [id, setId] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [serviceName, setServiceName] = useState("");

  const [load, setLoad] = useState(false);
  const [loadx, setLoadx] = useState(false);
  const [loade, setLoade] = useState(false);
  const [token, setToken] = useState("");

  const [servicesData, setServicesData] = useState([]);

  useEffect(() => {
    navigation.addListener("focus", () => {
      getUserInfo();
    });
  }, []);

  const getUserInfo = async () => {
    const userData = await AsyncStorage.getItem("userData");
    let userDatax = JSON.parse(userData ?? "");
    setToken(userDatax?.access_token);
    setId(userDatax?.data?._id);
    if (userDatax.access_token !== null) {
      Services();
    }
  };

  const modalFalse = () => {
    setModalVisible(false);
  };
  const GoBack = () => {
    navigation.goBack();
  };
  const changeServicesSelection = (data: any, i: number | React.SetStateAction<string>) => {
    let dummy = [...servicesData];
    let dummy1: any = dummy.map((item, index) => (index == i ? { ...item, check: !item.check } : { ...item, check: false }));
    setValue(i);
    setKey(data?.service_name);
    setServicesData(dummy1);
  };
  const servicesOfferedInfo = async () => {
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
        if (res2.success === true) {
          GoBack();
        } else {
          ToastAndroid.show(res2.message, ToastAndroid.LONG);
        }
      })
      .catch((error) => {
        setLoad(false);
        Alert.alert("Something Went Wrong");
        console.log(error);
      });
  };
  const Services = async () => {
    const userData = await AsyncStorage.getItem("userData");
    let userDatax = JSON.parse(userData);
    setLoadx(true);
    await fetch(`${url}/services`, {
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
        res2.data.map((item: { check: boolean }) => {
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
        Alert.alert("Something Went Wrong");
        console.log(error);
      });
  };
  const addServices = async () => {
    if (serviceName === "") {
      ToastAndroid.show("Please Enter Service name.", ToastAndroid.SHORT);
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
            Services();
            modalFalse();
          } else {
            Alert.alert(res2.errors);
          }
        })
        .catch((error) => {
          setLoade(false);
          Alert.alert("Something Went Wrong");
          console.log(error);
        });
    }
  };
  const Manual = [
    {
      service_name: "Gym instructor",
    },
    {
      service_name: "Fitness assessment & nutrition advice",
    },
    {
      service_name: "Personal trainer",
    },
    {
      service_name: "Physical and online workout",
    },
    {
      service_name: "Mental health & welbeing",
    },
    {
      service_name: "Strength and muscular training",
    },
    {
      service_name: "Martial art & Boxing",
    },
    {
      service_name: "Technique Guide",
    },
    {
      service_name: "Cardio/Yoga",
    },
  ];
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.fixeheight}>
          <Header navigation={navigation} onPress={GoBack} />
        </View>
        <View style={styles.fixeheight1}>
          <View style={styles.topView}>
            <Text style={styles.ServicesoffereText}>Services Offered</Text>
            <Text style={{ color: Colors.lightGray }}>(Select appropriate)</Text>
          </View>
        </View>
      </View>
      {/*start flex box*/}
      <View style={styles.main}>
        <View style={styles.topView}>
          <Pressable style={styles.flexDirectionView} onPress={() => setModalVisible(true)}>
            <View style={styles.titleView}>
              <Text style={styles.titleText}>Add new services </Text>
            </View>
            <View style={styles.iconView}>
              <Feather name="plus-circle" color={"#ff0000"} size={25} />
            </View>
          </Pressable>
        </View>
      </View>
      {/*End flex box*/}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.main}>
          <View style={styles.mainViewBox}>
            {servicesData.map((item: any, i: number) => (
              <Pressable
                key={i}
                onPress={() => {
                  changeServicesSelection(item, i);
                }}
                style={[item.check ? styles.BoxViewBoder : styles.BoxView]}
              >
                <Text style={styles.boxviewText}>{item?.service_name}</Text>
              </Pressable>
            ))}
          </View>
        </View>
        <View style={styles.main}>
          {loadx ? <ActivityIndicator size="small" color="#fff" /> : null}
          {servicesData.map((item: any, i) => (
            <View style={styles.mainViewBox} key={i}>
              <Pressable
                onPress={() => {
                  changeServicesSelection(item, i);
                }}
                style={[item.check ? styles.BoxViewBoder : styles.BoxView]}
              >
                <Text style={styles.boxviewText}>{item?.service_name}</Text>
              </Pressable>
            </View>
          ))}
        </View>
      </ScrollView>
      <View style={{ paddingVertical: 10, width: "100%" }}>
        <Button
          label={load === true ? <ActivityIndicator size="small" color="#fff" /> : "Done"}
          onPress={() => {
            servicesOfferedInfo();
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
              <View style={styles.fixeheight}>
                <View style={{ Width: "100%" }}>
                  <Text style={styles.addText}>Add your custom services</Text>
                </View>
              </View>
              <View style={styles.inputTopView}>
                <View style={styles.inputtopviews}>
                  <View style={styles.inputnameView}>
                    <Text style={styles.inputnameText}>Title</Text>
                  </View>
                  <View style={styles.textinputView}>
                    <View style={styles.textinputView1}>
                      <TextInput style={styles.inputEmail} label="Email" placeholder="Add Your Services" placeholderTextColor={"white"} value={serviceName} onChangeText={setServiceName} />
                    </View>
                  </View>
                </View>
              </View>
              {/**/}
              {/*start btn*/}
              <View style={styles.rowView}>
                <View style={styles.mainbtnView}>
                  <Pressable onPress={() => setModalVisible(false)} style={styles.ccbtnview}>
                    <Text style={styles.btntextstyle}>Cancel</Text>
                  </Pressable>
                </View>
                <View style={styles.mainbtnView}>
                  <Pressable
                    style={styles.profilebtnview}
                    onPress={() => {
                      addServices();
                      setServiceName("");
                    }}
                  >
                    {loade === true ? <ActivityIndicator size="small" color="#fff" /> : <Text style={styles.btntextstyle1}>Create</Text>}
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
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: Colors.white,
    paddingTop: Platform.OS === "ios" ? 40 : 0,
    paddingBottom: Platform.OS === "ios" ? 0 : 0,
  },
  header: {
    width: "100%",
    height: 150,
  },
  fixeheight: {
    height: 50,
    justifyContent: "center",
    borderBottomWidth: 0.5,
    borderColor: "lightgrey",
    width: "100%",
    alignItems: "center",
  },
  fixeheight1: {
    height: 100,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  topView: {
    width: "90%",
  },
  main: {
    width: "100%",
    alignItems: "center",
  },
  inputEmail: {
    borderRadius: 10,
    width: "100%",
    height: 40,
    paddingLeft: 10,
    fontSize: RFValue(10, 580),
    color: Colors.white,
  },

  btn: {
    padding: 10,
    margin: 10,
    width: "90%",
    borderRadius: 10,
    color: Colors.infos,
    backgroundColor: Colors.bgRedBtn,
    alignItems: "center",
    justifyContent: "center",
  },
  footer: {
    width: "100%",
    marginBottom: 60,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
  },
  ServicesoffereText: {
    fontFamily: "Poppins-Bold",
    color: Colors.black,
    fontSize: RFValue(26, 580),
  },
  BoxView: {
    width: "100%",
    height: 70,
    backgroundColor: Colors.black,
    borderRadius: 10,
    justifyContent: "center",
    paddingLeft: 10,
    marginTop: 10,
  },
  BoxViewBoder: {
    width: "100%",
    height: 70,
    backgroundColor: Colors.black,
    borderRadius: 10,
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#ff0000",
    paddingLeft: 10,
    marginTop: 10,
  },
  boxviewText: {
    color: Colors.white,
    fontFamily: "Poppins-Regular",
    fontSize: RFValue(14, 580),
  },
  mainViewBox: {
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
  flexDirectionView: {
    width: "100%",
    flexDirection: "row",
    height: 30,
    borderColor: Colors.black,
    marginTop: 10,
  },
  titleView: {
    width: "80%",
    justifyContent: "center",
  },
  iconView: {
    width: "20%",
    justifyContent: "center",
    alignItems: "center",
  },
  titleText: {
    fontSize: RFValue(15, 580),
    color: Colors.black,
    fontFamily: "Poppins-SemiBold",
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
    elevation: 5,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  addText: {
    textAlign: "center",
    fontSize: RFValue(16, 580),
    fontFamily: "poppins-Bold",
    color: "black",
  },
  inputTopView: {
    width: "100%",
    marginTop: 30,
    paddingLeft: 20,
  },
  inputtopviews: {
    width: "70%",
    backgroundColor: Colors.black,
    borderRadius: 8,
    borderColor: Colors.bgRedBtn,
    height: Platform.OS === "ios" ? 55 : 55,
  },
  inputnameView: {
    width: "100%",
    height: 20,
    justifyContent: "center",
    borderColor: Colors.white,
    // borderWidth:1,
    paddingHorizontal: 10,
  },
  inputnameText: {
    color: Colors.white,
    fontSize: Platform.OS === "ios" ? RFValue(10, 580) : RFValue(12, 580),
    fontFamily: "poppins-regular",
  },
  textinputView: {
    width: "100%",
    // borderWidth:1,
    borderColor: Colors.white,
    flexDirection: "row",
    height: 35,
  },
  textinputView1: {
    width: "90%",
    borderColor: Colors.white,
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
export default UpdateServicesoffere;
