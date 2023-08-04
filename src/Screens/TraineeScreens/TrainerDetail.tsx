import React, { useState } from "react";
import { Text, View, TouchableOpacity, StyleSheet, TextInput, Modal, Platform } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { RFValue } from "react-native-responsive-fontsize";
import About from "./About";
import VideosTab from "./VideosTab";
import Ratings from "./Ratings";
import Schedule from "./Schedule";
import { useRoute } from "@react-navigation/native";
import FastImage from "react-native-fast-image";
import Entypo from "react-native-vector-icons/Entypo";
import { useSelector } from "react-redux";
import { UserDetail } from "../../interfaces";
import { useCreateChatRoomMutation } from "../../slice/FitsApi.slice";
import { NavigationSwitchProp } from "react-navigation";
import { errorToast } from "../../utils/toast";
import Typography from "../../Components/typography/text";
import Colors from "../../constants/Colors";
import Container from "../../Components/Container";

enum Tab {
  ABOUT,
  SCHEDULE,
  VIDEO,
  RATINGS,
}

interface PropsInterface {
  navigation: NavigationSwitchProp;
}

const TrainerDetail = ({ navigation }: PropsInterface) => {
  const route = useRoute();
  const [modalVisible, setModalVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>(Tab.ABOUT);
  const [message, setMessage] = useState("");
  const [mutateAsyncChatRoomCreate] = useCreateChatRoomMutation()
  const trainerId = route?.params?.personalData.user
  const { userInfo } = useSelector((state: { fitsStore: Partial<UserDetail> }) => state.fitsStore);
  const token = useSelector((state: { token: string }) => state.token);

  const GoBack = () => {
    navigation.goBack();
  };

  const nextScreen = (roomId: string) => {
    navigation.navigate("Chat", { roomId });
  };

  const handleTabPress = (tab: Tab) => {
    setActiveTab(tab);
  };

  const handleCreateChatRoom = async () => {
    let body = {
      message: message,
      linkId: trainerId,
    };
    const result = await mutateAsyncChatRoomCreate(body);
    if (result?.error) errorToast(result.error?.data?.message);
    if (result?.data) nextScreen(result.data?.data.room._id);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case Tab.ABOUT:
        return <About />;
      case Tab.SCHEDULE:
        return <Schedule navigation={navigation} />;
      case Tab.VIDEO:
        return <VideosTab navigation={navigation} />;
      case Tab.RATINGS:
        return <Ratings navigation={navigation} token={token} id={userInfo?.user._id} />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <FastImage
          style={styles.Imagestyle}
          source={{
            uri: `${route.params.userData?.image}`,
            headers: { Authorization: "someAuthToken" },
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.cover}
        >
            <View style={{ alignSelf: "center", margin: 10 }}>
              <View style={{ width: "100%", flexDirection: "row" }}>
                <View style={{ width: "20%" }}>
                  <TouchableOpacity onPress={GoBack}>
                    <View
                      style={{
                        backgroundColor: "black",
                        opacity: 0.4,
                        height: 40,
                        width: 40,
                        borderRadius: 100,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Entypo name="cross" size={20} color="white" />
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={{ width: "80%", alignItems: "flex-end" }}>
                  <View style={{ width: "45%" }}>
                    <View
                      style={{
                        backgroundColor: "black",
                        opacity: 0.4,
                        height: 40,
                        borderRadius: 10,
                        alignItems: "center",
                        justifyContent: "center",
                        paddingHorizontal: 10,
                        width: "100%",
                        flexDirection: "row",
                      }}
                    >
                      {route?.params?.professionalData?.check?.verification_status === "verified" ? (
                        <Text
                          style={{
                            fontFamily: "Poppins-Regular",
                            fontSize: RFValue(10, 580),
                            color: "#fff",
                            opacity: 1,
                          }}
                        >
                          Verified{"  "}
                        </Text>
                      ) : (
                        <Text
                          style={{
                            fontFamily: "Poppins-Regular",
                            color: "#fff",
                            opacity: 1,
                          }}
                        >
                          Not Verified{"  "}
                        </Text>
                      )}
                      <AntDesign name="checksquare" size={18} color={"rgba(255, 0, 0, 1)"} />
                    </View>
                  </View>
                </View>
              </View>
            </View>
        </FastImage>

        <Container style={{ transform: [{translateY: -20}],borderTopLeftRadius: 20,overflow: "hidden", borderTopRightRadius:20, alignItems:'center'}}>
            <View style={styles.topView1}>
              <Text style={styles.NameText}>{route?.params?.personalData.name}</Text>
              <View style={styles.BtnmainrowView}>
                <View style={styles.BtnviewView}>
                  <Text style={styles.sessionText}>
                    <Text style={styles.Boldtextstyle}>{route?.params?.userData.price}$</Text>
                    /session
                  </Text>
                </View>
                <View style={styles.Btnmain2View}>
                  <Text style={styles.sessionText}>
                    <Text style={styles.Boldtextstyle}>
                      {route?.params?.userData.averageRating} <AntDesign name="star" color={"#000"} size={15} />
                    </Text>
                    ({route?.params?.userData.numReviews} Reviews)
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.BtnmainRowView}>
              <View style={styles.BtnviewView}>
                <TouchableOpacity style={styles.BtnView} onPress={() => setModalVisible(true)}>
                  <Text style={styles.contactText}>Contact</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.centeredView}>
              <Modal animationType="fade" transparent={true} visible={modalVisible}>
                <View style={styles.centeredViewx}>
                  <View style={styles.modalViewx}>
                    <View style={styles.MoadalMainContainer}>
                      <View style={{ flexDirection: "row", width: "100%" }}>
                        <View style={{ width: "80%" }} />
                        <View style={{ width: "20%", alignItems: "flex-end" }}>
                          <TouchableOpacity onPress={() => setModalVisible(false)}>
                            <MaterialIcons name="cancel" size={20} color="black" />
                          </TouchableOpacity>
                        </View>
                      </View>
                      <Text style={styles.ModalLabel}>Enter Message</Text>
                      <View style={styles.parkingtyperow}>
                        <View style={{ width: "85%" }}>
                          <TextInput style={styles.input} placeholderTextColor="black" placeholder="Message here..." value={message} onChangeText={setMessage} />
                        </View>
                        <View style={styles.parkingType}>
                          <TouchableOpacity
                            onPress={() => {
                              setModalVisible(false);
                              handleCreateChatRoom();
                            }}
                          >
                            <MaterialCommunityIcons name="send-circle" size={35} color="#FF0000" />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </Modal>
            </View>
            <View style={styles.toptabmainview}>
                <Typography pressAble size={"large"} onPress={() => handleTabPress(Tab.ABOUT)} color={activeTab=== Tab.ABOUT ? "redColor" : 'black'}  style={
                  activeTab === Tab.ABOUT
                    ? {
                        borderBottomColor: Colors.redColor,
                        borderBottomWidth: 2,
                      }
                    : {}
                } >About</Typography>
                <Typography pressAble size={"large"} onPress={() => handleTabPress(Tab.SCHEDULE)} color={activeTab=== Tab.SCHEDULE ? "redColor" : 'black'}  style={
                  activeTab === Tab.SCHEDULE
                    ? {
                        borderBottomColor: Colors.redColor,
                        borderBottomWidth: 2,
                      }
                    : {}
                }>Schedule</Typography>
                <Typography pressAble size={"large"} onPress={() => handleTabPress(Tab.VIDEO)} color={activeTab=== Tab.VIDEO ? "redColor" : 'black'}  style={
                  activeTab === Tab.VIDEO
                    ? {
                        borderBottomColor: Colors.redColor,
                        borderBottomWidth: 2,
                      }
                    : {}
                } >Video</Typography>
                <Typography pressAble size={"large"} onPress={() => handleTabPress(Tab.RATINGS)} color={activeTab=== Tab.RATINGS ? "redColor" : 'black'}  style={
                  activeTab === Tab.RATINGS
                    ? {
                        borderBottomColor: Colors.redColor,
                        borderBottomWidth: 2,
                      }
                    : {}
                } >Ratings</Typography>
            </View>
        </Container>

        {renderTabContent()}
        <View style={{ paddingVertical: 10 }} />
        <View style={{ paddingVertical: 10 }} />
        </ScrollView>
    </View>
  );
};

export default TrainerDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "ios" ? 40 : 0,
    paddingBottom: Platform.OS === "ios" ? 0 : 0,
  },
  header: {
    width: "100%",
    height: "20%",
    marginTop: -20,
    backgroundColor: "#fff",
    borderRadius: 24,
  },
  main: {
    width: "100%",
    height: "80%",
  },
  footer: {
    width: "100%",
    marginBottom: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
  },
  TopView: {
    width: "100%",
    alignItems: "center",
  },
  topView: { width: "90%" },
  topView1: {
  
    marginTop: 5,
    alignItems: "center",
  },
  Imagestyle: {
    width: "100%",
    height: 350,
  },
  NameText: {
    fontFamily: "Poppins-Bold",
    fontSize: RFValue(22, 580),
    color: "#000",
  },
  sessionText: {
    fontFamily: "Poppins-Regular",
    fontSize: RFValue(10, 580),
    color: "#979797",
  },
  BtnView: {
    width: 115,
    height: 45,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 14,
  },
  BtnmainrowView: {
    width: "100%",
    flexDirection: "row",
    paddingVertical: 4,
  },
  BtnmainRowView: {
    width: "70%",
    paddingVertical: 8,
    alignItems: "center",
  },
  BtnviewView: {
    width: "47%",
    alignItems: "flex-end",
  },
  Btnmain2View: {
    width: "50%",
    alignItems: "center",
  },
  contactText: {
    fontFamily: "Poppins-Regular",
    fontSize: RFValue(10, 580),
    color: "#fff",
  },
   toptabmainview: {
    width: "100%",
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  mainclassesview: {
    width: "25%",
    alignItems: "center",
  },
  topbartext: {
    fontSize: RFValue(12, 580),
    color: "#ff0000",
    fontFamily: "Poppins-Regular",
  },
  topbartext1: {
    fontSize: RFValue(12, 580),
    color: "#000",
    fontFamily: "Poppins-Regular",
  },
  borderView: {
    width: 30,
    borderWidth: 1,
    borderColor: "#ff0000",
  },
  RowView: {
    width: "100%",
    flexDirection: "row",
  },
  Boldtextstyle: {
    fontSize: RFValue(10, 580),
    color: "#000",
    fontFamily: "Poppins-SemiBold",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FAF9F6",
    opacity: 0.9,
  },
  modalViewx: {
    margin: 0,
    width: "95%",
    justifyContent: "center",
    backgroundColor: "#FAF9F6",
    borderRadius: 25,
    padding: 0,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 6.84,
    elevation: 5,
    paddingTop: 10,
    paddingBottom: 20,
  },
  centeredViewx: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#262626",
    opacity: 0.9,
  },
  MoadalMainContainer: {
  
    alignSelf: "center",
  },
  ModalLabel: {
    fontSize: RFValue(14, 580),
    color: "black",
    paddingLeft: 10,
    paddingBottom: 10,
  },
  input: {
    fontSize: RFValue(12, 580),
    color: "black",
  },
  parkingtyperow: {
    flexDirection: "row",
    width: "100%",
    backgroundColor: "white",
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    height: 42,
    justifyContent: "center",

    paddingHorizontal: 5,
    marginVertical: 0.5,
  },
  parkingType: {
    width: "15%",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
});
