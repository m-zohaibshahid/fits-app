import React, { useState, useEffect } from "react";
import { Text, View, Pressable, StyleSheet, TextInput, Modal, ToastAndroid, Image, ScrollView, ActivityIndicator, Platform, Alert } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Entypo from "react-native-vector-icons/Entypo";
import Fontisto from "react-native-vector-icons/Fontisto";
import Ionicons from "react-native-vector-icons/Ionicons";
import { RFValue } from "react-native-responsive-fontsize";
import * as Images from "../../constants/Images";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FastImage from "react-native-fast-image";
import { useGetUserMeQuery, useUpdatePasswordMutation } from "../../slice/FitsApi.slice";
import { getUserAsyncStroage } from "../../common/AsyncStorage";
import { useSelector } from "react-redux";
import { UserDataInterface, UserDetail } from "../../interfaces";
import { NavigationSwitchProp } from "react-navigation";
import ErrorHandler from "../../Components/Alert-modal";
interface Props {
  navigation: NavigationSwitchProp;
}
const Account: React.FC<Props> = ({ navigation }) => {
  const [hidePass, setHidePass] = React.useState(true);
  const [ChangePassword, setChangePassword] = useState(false);
  const [getLink, setGetLink] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [id, setId] = useState("");
  const [userDatax, setUserDatax] = useState<{ data: UserDataInterface }>();
  const [userCurrentLocation, setUserCurrentLocation] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { userInfo } = useSelector((state: { fitsStore: Partial<UserDetail> }) => state.fitsStore);
  const { data: userMeData, isLoading: isLoading1, error: error1 } = useGetUserMeQuery({});
  const [updatePassword, { isLoading, error }] = useUpdatePasswordMutation();
  useEffect(() => {
    navigation.addListener("focus", () => {
      getUserInfo();
    });
  }, []);

  const getUserInfo = async () => {
    const userMeData = await getUserAsyncStroage();
    setUserDatax(userMeData);
    setId(userInfo?.user?._id ?? "");
    const userLoc: string | null = await AsyncStorage.getItem("userLocation");
    let userLocx = JSON.parse(userLoc ?? "");
    setUserCurrentLocation(userLocx);
  };

  const UpdatePassword = async () => {
    if (oldPassword === "") {
      ToastAndroid.show("Please Enter your old Password.", ToastAndroid.SHORT);
    } else if (newPassword === "") {
      ToastAndroid.show("Please Enter your new Password.", ToastAndroid.SHORT);
    } else if (newPassword !== confirmPassword) {
      ToastAndroid.show("Your password and confirmation password do not match.", ToastAndroid.SHORT);
    } else {
      const body = {
        oldPassword: oldPassword,
        password: newPassword,
      };
      await updatePassword({ id, ...body })
        // .unwrap()
        .then((res2) => {
          if (res2?.data.success === true) {
            ToastAndroid.show("Password updated", ToastAndroid.LONG);
          } else {
            Alert.alert(res2?.data?.message);
          }
        })
        .catch((error) => {
          Alert.alert("Something Went Wrong");
        });
    }
  };
  const logOut = async () => {
    await AsyncStorage.clear();
    navigation.navigate("logoutNow");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.fixeheight1}>
          <View
            style={{
              width: "100%",
              alignItems: "center",
            }}
          >
            <View style={{ width: "90%" }}>
              <Text
                style={{
                  color: "#000000",
                  fontSize: RFValue(28, 580),
                  marginTop: 10,
                  fontFamily: "Poppins-Bold",
                }}
              >
                My Account
              </Text>
            </View>
          </View>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.main}>
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
          {/*Start Profile */}
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
          {/*End Profile */}
          {/*Start Wallet */}
          <View style={{ width: "100%", alignItems: "center", marginTop: 30 }}>
            <Pressable
              onPress={() => {
                if (userMeData?.stripe?.card) {
                  navigation.navigate("WalletForTrainee");
                } else {
                  navigation.navigate("CreateCardTrainee");
                }
              }}
              style={{
                width: "90%",
                alignItems: "center",
                backgroundColor: "#000",
                borderRadius: 14,
              }}
            >
              <View style={{ width: "100%", alignItems: "center" }}>
                <View style={{ width: "90%", alignItems: "center" }}>
                  <View
                    style={{
                      width: "100%",
                      height: 60,
                      justifyContent: "center",
                      flexDirection: "row",
                    }}
                  >
                    <View style={{ width: "15%", justifyContent: "center" }}>
                      <Fontisto name="wallet" size={25} color={"#fff"} />
                    </View>
                    <View style={{ width: "80%", justifyContent: "center" }}>
                      <Text
                        style={{
                          color: "#fff",
                          fontSize: RFValue(13, 580),
                          fontFamily: "Poppins-SemiBold",
                        }}
                      >
                        Wallet
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </Pressable>
          </View>
          {/*End Wallet */}
          {/*Start Password */}
          <View style={{ width: "100%", alignItems: "center", marginTop: 30 }}>
            <View
              style={{
                width: "90%",
                alignItems: "center",
                backgroundColor: "#000",
                borderRadius: 14,
              }}
            >
              <View style={{ width: "100%", alignItems: "center" }}>
                <View
                  style={{
                    width: "90%",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      width: "100%",
                      height: 60,
                      justifyContent: "center",
                      flexDirection: "row",
                    }}
                  >
                    <View style={{ width: "15%", justifyContent: "center" }}>
                      <Fontisto name="key" size={25} color={"#fff"} />
                    </View>
                    <View style={{ width: "70%", justifyContent: "center" }}>
                      <Text
                        style={{
                          color: "#fff",
                          fontSize: RFValue(13, 580),
                          fontFamily: "Poppins-SemiBold",
                        }}
                      >
                        Change password
                      </Text>
                    </View>
                    <Pressable
                      onPress={() => setChangePassword(!ChangePassword)}
                      style={{
                        width: "15%",
                        justifyContent: "center",
                        alignItems: "flex-end",
                      }}
                    >
                      <Entypo name={ChangePassword ? "chevron-up" : "chevron-down"} size={25} color={"#fff"} />
                    </Pressable>
                  </View>
                </View>
              </View>
              {ChangePassword && (
                <View
                  style={{
                    width: "100%",
                    borderTopColor: "#fff",
                    borderTopWidth: 1,
                  }}
                >
                  <View
                    style={{
                      width: "100%",
                      alignItems: "center",
                      marginTop: 30,
                    }}
                  >
                    <View
                      style={{
                        width: "90%",
                        backgroundColor: "#414143",
                        borderRadius: 8,
                        height: 58,
                      }}
                    >
                      <View
                        style={{
                          width: "100%",
                          marginTop: 3,
                          paddingLeft: 10,
                          borderRadius: 8,
                        }}
                      >
                        <Text
                          style={{
                            color: "#ffffff",
                            fontFamily: "Poppins-Regular",
                            fontSize: RFValue(9, 580),
                          }}
                        >
                          Old Password
                        </Text>
                      </View>
                      <View
                        style={{
                          width: "100%",
                          borderColor: "#fff",
                          flexDirection: "row",
                        }}
                      >
                        <View
                          style={{
                            width: "90%",
                            borderColor: "#fff",
                          }}
                        >
                          <Text style={styles.label}>Password</Text>
                          <TextInput style={styles.inputPassword} placeholder="Old Password" secureTextEntry={hidePass} value={oldPassword} onChangeText={setOldPassword} />
                        </View>
                        <View
                          style={{
                            width: "10%",
                            alignItems: "center",
                          }}
                        >
                          <Ionicons name={hidePass ? "eye-off" : "eye"} onPress={() => setHidePass(!hidePass)} size={20} color="#fff" />
                        </View>
                      </View>
                    </View>
                  </View>
                  <View
                    style={{
                      width: "100%",
                      alignItems: "center",
                      marginTop: 30,
                    }}
                  >
                    <View
                      style={{
                        width: "90%",
                        backgroundColor: "#414143",
                        borderRadius: 8,
                        height: 58,
                      }}
                    >
                      <View
                        style={{
                          width: "100%",
                          marginTop: 3,
                          paddingLeft: 10,
                          borderRadius: 8,
                        }}
                      >
                        <Text
                          style={{
                            color: "#ffffff",
                            fontFamily: "Poppins-Regular",
                            fontSize: RFValue(9, 580),
                          }}
                        >
                          New Password
                        </Text>
                      </View>
                      <View
                        style={{
                          width: "100%",
                          borderColor: "#fff",
                          flexDirection: "row",
                        }}
                      >
                        <View
                          style={{
                            width: "90%",
                            borderColor: "#fff",
                          }}
                        >
                          <TextInput
                            style={styles.inputPassword}
                            label="password"
                            placeholder="Enter Password"
                            secureTextEntry={hidePass ? true : false}
                            value={newPassword}
                            onChangeText={setNewPassword}
                          />
                        </View>
                        <View
                          style={{
                            width: "10%",
                            alignItems: "center",
                          }}
                        >
                          <Ionicons name={hidePass ? "eye-off" : "eye"} onPress={() => setHidePass(!hidePass)} size={20} color="#fff" />
                        </View>
                      </View>
                    </View>
                  </View>
                  <View
                    style={{
                      width: "100%",
                      alignItems: "center",
                      marginTop: 30,
                    }}
                  >
                    <View
                      style={{
                        width: "90%",
                        height: 58,
                        backgroundColor: "#414143",
                        borderRadius: 8,
                      }}
                    >
                      <View
                        style={{
                          width: "100%",
                          marginTop: 3,
                          paddingLeft: 10,
                          borderRadius: 8,
                        }}
                      >
                        <Text
                          style={{
                            color: "#ffffff",
                            fontSize: RFValue(9, 580),
                            fontFamily: "Poppins-Regular",
                          }}
                        >
                          Crofirm Password
                        </Text>
                      </View>
                      <View
                        style={{
                          width: "100%",
                          borderColor: "#fff",
                          flexDirection: "row",
                        }}
                      >
                        <View
                          style={{
                            width: "90%",
                            borderColor: "#fff",
                          }}
                        >
                          <TextInput
                            style={styles.inputPassword}
                            label="password"
                            placeholder="Enter Password"
                            secureTextEntry={hidePass ? true : false}
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                          />
                        </View>
                        <View
                          style={{
                            width: "10%",
                            alignItems: "center",
                          }}
                        >
                          <Ionicons name={hidePass ? "eye-off" : "eye"} onPress={() => setHidePass(!hidePass)} size={20} color="#fff" />
                        </View>
                      </View>
                    </View>
                  </View>
                  <View
                    style={{
                      width: "100%",
                      alignItems: "center",
                      marginTop: 10,
                    }}
                  >
                    <Pressable
                      navigation={navigation}
                      onPress={() => {
                        UpdatePassword();
                        setConfirmPassword("");
                        setNewPassword("");
                        setOldPassword("");
                      }}
                      style={{
                        width: "30%",
                        backgroundColor: "#FF0000",
                        height: 40,
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 10,
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "Poppins-Regular",
                          fontSize: RFValue(12, 580),
                          color: "#fff",
                        }}
                      >
                        {isLoading || isLoading1 ? <ActivityIndicator size="small" color="#fff" /> : "Save"}
                      </Text>
                    </Pressable>
                  </View>
                  <View style={{ marginVertical: 9 }} />
                </View>
              )}
            </View>
          </View>
          {/*End Password */}
          {/*Start Get referral link */}
          <View style={{ width: "100%", alignItems: "center", marginTop: 30 }}>
            <View
              style={{
                width: "90%",
                alignItems: "center",
                backgroundColor: "#000",
                borderRadius: 14,
                padding: 10,
              }}
            >
              <View style={{ width: "100%", alignItems: "center" }}>
                <View
                  style={{
                    width: "90%",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      width: "100%",
                      height: 60,
                      justifyContent: "center",
                      flexDirection: "row",
                    }}
                  >
                    <View style={{ width: "15%", justifyContent: "center" }}>
                      <Fontisto name="link" size={25} color={"#fff"} />
                    </View>
                    <View style={{ width: "70%", justifyContent: "center" }}>
                      <Text
                        style={{
                          color: "#fff",
                          fontSize: RFValue(13, 580),
                          fontFamily: "Poppins-SemiBold",
                        }}
                      >
                        Get referral link{"\n"}
                        <Text style={styles.inviteText}>Invite friends you get discount</Text>
                      </Text>
                    </View>
                    <Pressable
                      onPress={() => setGetLink(!getLink)}
                      style={{
                        width: "15%",
                        justifyContent: "center",
                        alignItems: "flex-end",
                      }}
                    >
                      <Entypo name={getLink ? "chevron-up" : "chevron-down"} size={25} color={"#fff"} />
                    </Pressable>
                  </View>
                </View>
              </View>
              {getLink && (
                <View
                  style={{
                    width: "100%",
                    borderTopColor: "#fff",
                    borderTopWidth: 1,
                  }}
                >
                  <View style={styles.TopView}>
                    <View style={styles.topView}>
                      <View>
                        <TextInput style={styles.textinput} placeholder="https://qazisaif.com" placeholderTextColor={"#fff"} />
                      </View>

                      <Pressable
                        onPress={() => setChangePassword(false)}
                        style={{
                          width: 100,
                          backgroundColor: "#FF0000",
                          height: 40,
                          justifyContent: "center",
                          alignItems: "center",
                          borderRadius: 10,
                          marginTop: 10,
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: "Poppins-Regular",
                            fontSize: RFValue(12, 580),
                            color: "#fff",
                          }}
                        >
                          Copy
                        </Text>
                      </Pressable>
                    </View>
                  </View>
                </View>
              )}
            </View>
          </View>
          {/*End Get referral link */}

          {/*Start Sign out */}
          <View style={{ width: "100%", alignItems: "center", marginTop: 30 }}>
            <Pressable
              style={{
                width: "90%",
                alignItems: "center",
                backgroundColor: "#000",
                borderRadius: 14,
              }}
              onPress={() => {
                logOut();
              }}
            >
              <View style={{ width: "100%", alignItems: "center" }}>
                <View style={{ width: "90%", alignItems: "center" }}>
                  <View
                    style={{
                      width: "100%",
                      height: 60,
                      justifyContent: "center",
                      flexDirection: "row",
                    }}
                  >
                    <View style={{ width: "15%", justifyContent: "center" }}>
                      <Entypo name="log-out" size={25} color={"#fff"} />
                    </View>
                    <View style={{ width: "80%", justifyContent: "center" }}>
                      <Text
                        style={{
                          color: "#fff",
                          fontSize: RFValue(13, 580),
                          fontFamily: "Poppins-SemiBold",
                        }}
                      >
                        Sign out
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </Pressable>
          </View>
          {/*End Sign out */}
        </View>
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
    </View>
  );
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
  topView: { width: "90%" },
  topView1: {
    width: "90%",
    alignItems: "center",
  },
  textinput: {
    marginTop: 10,
    backgroundColor: "#202020",
    padding: 12,
  },
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    opacity: 1,
  },
  modalView: {
    width: "100%",
    height: "42%",
    margin: 5,
    backgroundColor: "#fff",
    borderRadius: 7,
    padding: 0,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 6.84,
    elevation: 5,
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
