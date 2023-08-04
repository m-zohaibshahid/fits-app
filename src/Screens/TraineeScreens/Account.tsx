import React, { useState } from "react";
import { Text, View, Pressable, StyleSheet, Modal, Image, ScrollView, Platform, Alert} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Entypo from "react-native-vector-icons/Entypo";
import Fontisto from "react-native-vector-icons/Fontisto";
import { RFValue } from "react-native-responsive-fontsize";
import * as Images from "../../constants/Images";
import FastImage from "react-native-fast-image";
import { useGetUserMeQuery, useUpdatePasswordMutation} from "../../slice/FitsApi.slice";
import { useSelector } from "react-redux";
import { UserDetail } from "../../interfaces";
import { NavigationSwitchProp } from "react-navigation";
import TextInput from "../../Components/Input";
import Button from "../../Components/Button";
import Colors from "../../constants/Colors";
import Header from "../../Components/Header";
import Typography from "../../Components/typography/text";
import Container from "../../Components/Container";
import { onLogout } from "../../utils/logout";
import { errorToast, successToast } from "../../utils/toast";
interface Props {
  navigation: NavigationSwitchProp;
}

const Account: React.FC < Props > = ({ navigation }) => {
  const [ChangePassword, setChangePassword] = useState(false);
  const [getLink, setGetLink] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [userCurrentLocation, setUserCurrentLocation] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // const { userMeData } = useSelector((state: { fitsStore: Partial <UserDetail>}) => state.fitsStore);
  const [updatePassword, { isLoading: isPasswordUpdateLoading }] = useUpdatePasswordMutation();
  const { data: userMeData, isLoading } = useGetUserMeQuery({});
 
  const UpdatePassword = async () => {
    const body={
      oldPassword: oldPassword,
      password: newPassword,
    }
    
  const result = await updatePassword({ id: userMeData?.user._id, data: body })
  if (result.error) errorToast(result.error.data.message)
  if (result.data) {
    successToast('Password updated')
    setChangePassword(false)
  }
  }
    

  return (<Container>
    <Header label='Settings' lableStyle={{fontSize: 20}} />
    <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ width: "100%", alignItems: "center" }}>
          <View
            style={{
              width: "90%",
              marginTop: 15,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {userMeData?.personal_info?.profileImage ? (
              <FastImage
                style={{
                  width: 165,
                  height: 165,
                  borderRadius: 200 / 2,
                }}
                source={{
                  uri: `${userMeData?.personal_info?.profileImage}`,
                  headers: { Authorization: "someAuthToken" },
                  priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.cover}
              />
            ) : (
              <Image style={{ width: 165, height: 165, borderRadius: 200 / 2 }} source={Images.Profile} />
            )}
          </View>
        </View>
        <View style={{ width: "100%", alignItems: "center", marginTop: 10 }}>
          <View style={{ width: "90%", alignItems: "center", marginTop: 5 }}>
            <Text
              style={{
                fontSize: RFValue(19, 580),
                fontFamily: "Poppins-Bold",
                color: "#000",
                textTransform: "capitalize",
              }}
            >
              {userMeData?.personal_info?.name}
            </Text>
          </View>
        </View>
        <View style={{ width: "100%", alignItems: "center" }}>
          <View
            style={{
              width: "90%",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <View
              style={{
                width: "6%",
                justifyContent: "center",
                alignItems: "flex-end",
              }}
            >
              <EvilIcons name="location" style={{ color: "#000" }} size={25} />
            </View>
            <View style={{ width: "94%" }}>
              <Text style={{ fontSize: RFValue(12, 580), color: "#000" }}> {userCurrentLocation}</Text>
            </View>
          </View>
        </View>
        <View style={{ width: "100%", alignItems: "center", marginTop: 30 }}>
          <View
            style={{
              width: "90%",
              alignItems: "center",
              backgroundColor: "#000",
              borderRadius: 14,
              paddingVertical: 10,
            }}
          >
            <View style={{ width: "100%", alignItems: "center" }}>
              <View style={{ width: "90%", alignItems: "center" }}>
                <View
                  style={{
                    marginTop: 10,
                    width: "100%",
                    flexDirection: "row",
                  }}
                >
                  <View style={{ width: "50%" }}>
                    <Text
                      style={{
                        color: "#fff",
                        fontSize: RFValue(15, 580),
                        fontFamily: "Poppins-Regular",
                      }}
                    >
                      Profile
                    </Text>
                  </View>
                  <View style={{ width: "50%", alignItems: "flex-end" }}>
                    <Pressable onPress={() => navigation.navigate("AccountUpdate")}>
                      <MaterialCommunityIcons name="pencil-outline" color={"#fff"} size={25} />
                    </Pressable>
                  </View>
                </View>
                <View
                  style={{
                    borderBottomColor: "#fff",
                    borderBottomWidth: 1,
                    width: "100%",
                  }}
                />
                <View
                  style={{
                    marginTop: 10,
                    width: "100%",
                    flexDirection: "row",
                  }}
                >
                  <View style={{ width: "50%" }}>
                    <Text
                      style={{
                        color: "#fff",
                        fontSize: RFValue(15, 580),
                        fontFamily: "Poppins-Regular",
                      }}
                    >
                      Full name
                    </Text>
                  </View>
                  <View style={{ width: "50%", alignItems: "flex-end" }}>
                    <Text
                      style={{
                        color: "#fff",
                        fontSize: RFValue(12, 580),
                        fontFamily: "Poppins-Regular",
                        textTransform: "capitalize",
                      }}
                    >
                      {userMeData?.personal_info?.name}
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    marginTop: 10,
                    width: "100%",
                  }}
                >
                  <View style={{ width: "100%", alignItems: "flex-start" }}>
                    <Text
                      style={{
                        color: "#fff",
                        fontSize: RFValue(15, 580),
                        fontFamily: "Poppins-Regular",
                      }}
                    >
                      E-mail
                    </Text>
                  </View>
                  <View style={{ width: "100%", alignItems: "flex-end" }}>
                    <Text
                      style={{
                        color: "#fff",
                        fontSize: RFValue(10, 580),
                        fontFamily: "Poppins-Regular",
                      }}
                    >
                      {userMeData?.user?.email}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    marginTop: 10,
                    width: "100%",
                    flexDirection: "row",
                  }}
                >
                  <View style={{ width: "50%" }}>
                    <Text
                      style={{
                        color: "#fff",
                        fontSize: RFValue(15, 580),
                        fontFamily: "Poppins-Regular",
                      }}
                    >
                      Country
                    </Text>
                  </View>
                  <View style={{ width: "50%", alignItems: "flex-end" }}>
                    <Text
                      style={{
                        color: "#fff",
                        fontSize: RFValue(12, 580),
                        fontFamily: "Poppins-Regular",
                      }}
                    >
                      {userMeData?.personal_info?.country}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    marginTop: 10,
                    width: "100%",
                    flexDirection: "row",
                  }}
                >
                  <View style={{ width: "50%" }}>
                    <Text
                      style={{
                        color: "#fff",
                        fontSize: RFValue(15, 580),
                        fontFamily: "Poppins-Regular",
                      }}
                    >
                      State
                    </Text>
                  </View>
                  <View style={{ width: "50%", alignItems: "flex-end" }}>
                    <Text
                      style={{
                        color: "#fff",
                        fontSize: RFValue(12, 580),
                        fontFamily: "Poppins-Regular",
                      }}
                    >
                      {userMeData?.personal_info?.state}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    marginTop: 10,
                    width: "100%",
                    flexDirection: "row",
                  }}
                >
                  <View style={{ width: "50%" }}>
                    <Text
                      style={{
                        color: "#fff",
                        fontSize: RFValue(15, 580),
                        fontFamily: "Poppins-Regular",
                      }}
                    >
                      City
                    </Text>
                  </View>
                  <View style={{ width: "50%", alignItems: "flex-end" }}>
                    <Text
                      style={{
                        color: "#fff",
                        fontSize: RFValue(12, 580),
                        fontFamily: "Poppins-Regular",
                      }}
                    >
                      {userMeData?.personal_info?.city}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    marginTop: 10,
                    width: "100%",
                    flexDirection: "row",
                  }}
                >
                  <View style={{ width: "50%" }}>
                    <Text
                      style={{
                        color: "#fff",
                        fontSize: RFValue(15, 580),
                        fontFamily: "Poppins-Regular",
                      }}
                    >
                      Gender
                    </Text>
                  </View>
                  <View style={{ width: "50%", alignItems: "flex-end" }}>
                    <Text
                      style={{
                        color: "#fff",
                        fontSize: RFValue(12, 580),
                        fontFamily: "Poppins-Regular",
                      }}
                    >
                      {userMeData?.personal_info?.gender}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    marginTop: 10,
                    width: "100%",
                    flexDirection: "row",
                  }}
                >
                  <View style={{ width: "50%" }}>
                    <Text
                      style={{
                        color: "#fff",
                        fontSize: RFValue(15, 580),
                        fontFamily: "Poppins-Regular",
                      }}
                    >
                      Fitness level
                    </Text>
                  </View>
                  <View style={{ width: "50%", alignItems: "flex-end" }}>
                    <Text
                      style={{
                        color: "#fff",
                        fontSize: RFValue(12, 580),
                        fontFamily: "Poppins-Regular",
                      }}
                    >
                      {userMeData?.user?.fitness_level?.key}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    marginTop: 10,
                    width: "100%",
                    flexDirection: "row",
                  }}
                >
                  <View style={{ width: "50%" }}>
                    <Text
                      style={{
                        color: "#fff",
                        fontSize: RFValue(15, 580),
                        fontFamily: "Poppins-Regular",
                      }}
                    >
                      Fitness Goal
                    </Text>
                  </View>
                  <View style={{ width: "50%", alignItems: "flex-end" }}>
                    <Text
                      style={{
                        color: "#fff",
                        fontSize: RFValue(12, 580),
                        fontFamily: "Poppins-Regular",
                      }}
                    >
                      {userMeData?.user?.fitness_goal?.key}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
      </View>
      <Pressable
        onPress={() => {
          if (userMeData?.stripe?.card) {
            navigation.navigate("WalletForTrainee");
          } else {
            navigation.navigate("CreateCardScreen");
          }
                }}
                style={{
                  width: '100%',
                  alignItems: 'center',
                  backgroundColor: '#000',
                  borderRadius: 12,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  padding: 15,
                  marginVertical: 5
            }}>
            <View style={{ flexDirection: 'row' }}>
            <Fontisto name="wallet" size={25} color={"#fff"} />
                <Typography style={{marginLeft: 10}} color="white">
                Wallet
                </Typography>
                </View>
              </Pressable>
        <View style={{ backgroundColor: Colors.black, alignItems: "center", borderRadius: 12, marginVertical: 5 }}>
                    <Pressable
                      onPress={() => setChangePassword(!ChangePassword)}
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: '100%',
                        padding: 15
                    }}>
                      <View style={{ flexDirection: 'row' }}>
                        <Entypo
                          name={'key'}
                          size={25}
                          color={'#fff'}
                        />
                        <Typography style={{marginLeft: 10}} color="white">
                          Change Password
                        </Typography>
                        </View>
                        <Entypo
                          name={ChangePassword ? 'chevron-up' : 'chevron-down'}
                          size={25}
                          color={'#fff'}
                        />
                    </Pressable>
               {ChangePassword && (
                 <View
                   style={{
                   width: "100%",
              padding: 20,
                   backgroundColor: Colors.white90
                   }}
                 >
                        <TextInput placeholder="Enter Password" label="Old Password" secureTextEntry value={oldPassword} onChangeText={setOldPassword} />
                        <TextInput
                          style={styles.inputPassword}
                          label="New Password"
                          placeholder="Enter Password"
                          secureTextEntry
                          value={newPassword}
                          onChangeText={setNewPassword}
                        />
                        <TextInput
                          style={styles.inputPassword}
                          label="New Password"
                          placeholder="Enter Password"
                          secureTextEntry
                          value={confirmPassword}
                          onChangeText={setConfirmPassword}
                />
                <Button loader={isPasswordUpdateLoading} style={{marginLeft: 'auto'}} variant="tini" label={"Change"} onPress={UpdatePassword} />
                   
              </View>
            )}
        </View>
                    <Pressable
                      onPress={() => setGetLink(!getLink)}
                      style={{
                        width: '100%',
                        alignItems: 'center',
                        backgroundColor: '#000',
                        borderRadius: 12,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        padding: 15,
                        marginVertical: 5
                    }}>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Entypo
                          name={'link'}
                          size={22}
                          color={'#fff'}
                        />
                        <Typography style={{marginLeft: 10 }} color="white">
                        Get referral link
                        </Typography>
                        </View>
                        <Entypo
                          name={getLink ? 'chevron-up' : 'chevron-down'}
                          size={22}
                          color={'#fff'}
                        />
                    </Pressable>
               {getLink && 
                <View
                 style={{
                 width: "100%",
                 padding: 20,
                 backgroundColor: Colors.white90
                 }}
                >
                        <TextInput label="Referrel link" placeholder="  https://qazisaif.com" secureTextEntry value={oldPassword} onChangeText={setOldPassword} />
                <Button style={{marginLeft: 'auto'}} variant="tini" label={"Copy"} onPress={() => Alert.alert('Text Copied')} />
              </View>
            }
          <Pressable
                onPress={onLogout}
                style={{
                  width: '100%',
                  alignItems: 'center',
                  backgroundColor: '#000',
                  borderRadius: 12,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  padding: 15,
                  marginVertical: 5
            }}>
            <View style={{ flexDirection: 'row' }}>
            <Entypo name="log-out" size={22} color={'#fff'} />
                <Typography style={{marginLeft: 10}} color="white">
                  Sign out
                </Typography>
                </View>
              </Pressable>
      <View style={{ marginVertical: 45 }} />
    </ScrollView>

    <View style={styles.footer}>
      {/*Modal Start*/}
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
              <ScrollView showsVerticalScrollIndicator={false}>
                <View
                  style={{
                    width: "100%",
                    alignItems: "flex-start",
                  }}
                >
                  <View style={styles.TopView}>
                    <View style={styles.topView}>
                      <AntDesign
                        onPress={() => setModalVisible(false)}
                        name="arrowleft"
                        style={{
                          fontSize: 30,
                          color: "#130F26",
                        }}
                      />
                      <Text style={styles.Gendertexts}>
                        Gender
                        <Text style={styles.genderonetext}>(Select one)</Text>
                      </Text>
                    </View>
                  </View>
                  <View style={styles.opercard}>
                    <Pressable style={styles.box}>
                      <View style={styles.inner}>
                        <Image source={Images.Vector} />
                        <Text style={styles.maletext}>Male</Text>
                      </View>
                    </Pressable>

                    <Pressable style={styles.box}>
                      <View style={styles.inner}>
                        <Image source={Images.Vector2} />
                        <Text style={styles.maletext}>Female</Text>
                      </View>
                    </Pressable>
                  </View>
                  <View
                    style={{
                      width: "100%",
                      height: "30%",
                      marginTop: 20,
                    }}
                  >
                    <Pressable style={styles.otherView}>
                      <View style={styles.oternameview}>
                        <Text style={styles.otherText}>Other</Text>
                      </View>
                    </Pressable>
                  </View>
                </View>
              </ScrollView>
            </View>
          </View>
        </Modal>
      </View>
      {/* Modal End*/}
    </View>
  </Container>);
};
const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: "#ffffff",
      paddingTop: Platform.OS === "ios" ? 40 : 0,
      paddingBottom: Platform.OS === "ios" ? 0 : 0,
  },
  header: {
      width: "100%",
      height: 120,
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
      height: 70,
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
  },
  main: {
      width: "100%",
  },
  backgroundVideo: {
      position: "absolute",
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
  },
  footer: {
      width: "100%",
      marginBottom: 0,
      bottom: 0,
      justifyContent: "center",
      position: "absolute",
      backgroundColor: "#fff",
  },
  inputPassword: {
      borderRadius: 10,
      width: "100%",
      paddingLeft: 10,
      fontSize: RFValue(10, 580),
      fontFamily: "Poppins-Regular",
      color: "#fff",
  },
  centeredView: {
      flex: 1,
      justifyContent: "flex-end",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.29)",
  },
  modalView: {
      width: "100%",
      height: "100%",
      margin: 5,
      backgroundColor: "#fff",
      borderRadius: 15,
      padding: 0,
      shadowColor: "#000",
      shadowOffset: {
          width: 0,
          height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 6.84,
      elevation: 9,
  },
  btn: {
      padding: 10,
      margin: 10,
      width: "90%",
      borderRadius: 10,
      color: "#6698FF",
      backgroundColor: "#979797",
      alignItems: "center",
      justifyContent: "center",
  },
  inviteText: {
      color: "#fff",
      fontFamily: "Poppins-Regular",
      fontSize: RFValue(10, 580),
  },
  TopView: {
      width: "100%",
      alignItems: "center",
  },
  topView: {
      width: "90%"
  },
  topView1: {
      width: "90%",
      alignItems: "center",
  },
  textinput: {
      marginTop: 10,
      backgroundColor: "#202020",
      padding: 12,
  },
  Gendertexts: {
      color: "#000000",
      fontSize: RFValue(16, 580),
      fontFamily: "Poppins-ExtraBold",
  },
  genderonetext: {
      fontSize: RFValue(10, 520),
      color: "#414143",
      fontFamily: "poppins-regular",
  },
  maletext: {
      color: "#fff",
      fontWeight: "bold",
      fontSize: RFValue(9, 580),
      fontFamily: "poppins-regular",
  },
  oternameview: {
      padding: 15,
      borderRadius: 10,
      width: "80%",
      backgroundColor: "#000000",
      alignItems: "center",
      justifyContent: "center",
      margin: 10,
  },
  otherText: {
      color: "#fff",
      fontSize: RFValue(16, 580),
      fontFamily: "poppins-regular",
  },
  otherView: {
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
  },
  box: {
      width: "50%",
      alignItems: "center",
  },
  inner: {
      backgroundColor: "#000000",
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
      margin: 10,
      height: 140,
      width: 140,
      borderRadius: 25,
      flexDirection: "column",
  },
  opercard: {
      marginTop: 25,
      width: "100%",
      flexDirection: "row",
  },
  label: {
      fontSize: 16,
      fontWeight: "bold",
      marginBottom: 5,
  },
});
export default Account;