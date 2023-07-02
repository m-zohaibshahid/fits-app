import React, { useState, useEffect } from "react";
import { Text, View, Pressable, StyleSheet, TextInput, Modal, ImageBackground, Image, ScrollView, ToastAndroid, ActivityIndicator, Platform, PermissionsAndroid, Alert } from "react-native";
import { getDistance } from "geolib";
import Feather from "react-native-vector-icons/Feather";
import AntDesign from "react-native-vector-icons/AntDesign";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { RFValue } from "react-native-responsive-fontsize";
import Recommended from "./Recommended";
import * as Images from "../../constants/Images";
import Colors from "../../constants/Colors";
import Sort from "./Filter/Sort";
import Sports from "./Filter/Sports";
import Price from "./Filter/Price";
import Type from "./Filter/Type";
import { url } from "../../constants/url";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Geolocation from "react-native-geolocation-service";
import Geocoder from "react-native-geocoder";
import FastImage from "react-native-fast-image";
import { useGetUserMeQuery, useSessionsQuery, useStripeCustomerMutation, useUpdateFilterMutation } from "../../slice/FitsApi.slice";
import { useDispatch, useSelector } from "react-redux";
import { UserDataInterface, UserDetail } from "../../interfaces";
import { setCreateStripeData } from "../../slice/FitsSlice.store";

const Home = ({ navigation }: any) => {
  // states

  const [modalVisible, setModalVisible] = useState(false);
  const [sort, setSort] = useState(true);
  const [sports, setSports] = useState(false);
  const [price, SetPrice] = useState(false);
  const [type, setType] = useState(false);
  const [filterData, setFilterData] = useState([]);
  const [dumdata, setDumData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [personalInfoData, setPersonalInfoData] = useState([]);
  const [professionalData, setProfessionalData] = useState([]);
  const [sportData, setSportData] = useState(null);
  const [minimumPrice, setMinimumPrice] = useState(0);
  const [maximumPrice, setMaximumPrice] = useState(0);
  const [classType, setClassType] = useState(null);
  const [classSort, setClassSort] = useState(null);
  const [search, setSearch] = useState("");

  const [m, setM] = useState("");
  const dispatch = useDispatch();
  const token: string = useSelector((state: { token: string }) => state.token);
  const { userInfo } = useSelector((state: { fitsStore: Partial<UserDetail> }) => state.fitsStore);

  const { data: userMeData, error, isSuccess, refetch } = useGetUserMeQuery({ id: userInfo?._id });

  const [stripeCustomer] = useStripeCustomerMutation({});
  const { data: session } = useSessionsQuery({});
  const [updateFilter, { data: filter }] = useUpdateFilterMutation({});
  // filter data User define functions
  const handleSportsData = (item: { name: React.SetStateAction<null> }) => {
    setModalVisible(false);
    setSportData(item?.name);
  };
  const minPriceData = (minPrice: string) => {
    setModalVisible(false);
    setMinimumPrice(parseInt(minPrice));
  };
  const maxPriceData = (maxPrice: string) => {
    setModalVisible(false);
    setMaximumPrice(parseInt(maxPrice));
  };
  const handleClassType = (item: { Name: { toLowerCase: () => React.SetStateAction<null> } }) => {
    setModalVisible(false);
    setClassType(item?.Name.toLowerCase());
  };
  const classSorts = (item: { Name: React.SetStateAction<null> }) => {
    setModalVisible(false);
    setClassSort(item?.Name);
  };

  useEffect(() => {
    if (sportData || minimumPrice || maximumPrice || classType || classSort) {
      Filter();
    }
  }, [sportData, minimumPrice, maximumPrice, classType, classSort]);
  // filter Api states
  const Filter = async () => {
    const data = {
      sports: sportData,
      min_price: minimumPrice,
      max_price: maximumPrice,
      type: classType,
      sort_by: classSort,
    };
    updateFilter(data)
      // refetch()
      // .unwrap()
      .then(async (res: any) => {
        if (res?.data?.success) {
          setFilterData(res.data?.data?.result);
          ToastAndroid.show(res.data?.message, ToastAndroid.SHORT);
        } else {
          ToastAndroid.show(res.error?.data?.message, ToastAndroid.SHORT);
        }
      })
      .catch(() => {});
  };
  //states
  const [nearyou, setNearyou] = useState(true);
  const [recommended, setRecommended] = useState(false);
  //function
  const NearyoutrueState = () => {
    setNearyou(true);
    setRecommended(false);
  };
  const RecommendedtrueState = () => {
    setNearyou(false);
    setRecommended(true);
  };

  const [load, setLoad] = useState(false);

  const [superLong, setSuperLong] = useState(55.9754);
  const [superLat, setSuperLat] = useState(21.4735);

  const getPersonalInfo = async () => {};

  const setUserLocation = async (data: string) => {
    await AsyncStorage.setItem("userLocation", JSON.stringify(data));
  };

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
        title: "Location Access Required",
        message: "This App needs to Access your location",
        buttonPositive: "Allow Location",
      });
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        //To Check, If Permission is granted
        Geolocation.getCurrentPosition(
          (position) => {
            setSuperLong(position?.coords?.longitude);
            setSuperLat(position?.coords?.latitude);
            const pos = {
              lat: position?.coords?.latitude,
              lng: position?.coords?.longitude,
            };
            Geocoder.geocodePosition(pos)
              .then(
                (
                  res: {
                    subLocality: string;
                    locality: string;
                    adminArea: string;
                    country: string;
                  }[]
                ) => {
                  setUserLocation(res[0].subLocality + " " + res[0].locality + " ," + res[0].adminArea + "-" + res[0].country);
                }
              )
              .catch((error: any) => alert(error));
          },
          () => {
            // See error code charts below.
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
      } else {
        Alert.alert("Permission Access denied. Please Make Sure GPS Permission is enabled and then exit app and run again");
      }
    } catch (err) {}
  };

  useEffect(() => {
    requestLocationPermission();
  }, []);

  useEffect(() => {
    navigation.addListener("focus", () => {
      getPersonalInfo();
      userMe();
      bookASessioan();
    });
  }, []);

  const userMe = async () => {
    setLoad(true);
    if (isSuccess) {
      setUserData(userMeData);
      createStripeAccount(userMeData);
      setLoad(false);
    } else {
      alert(error);
    }
  };

  const setForCareateStripeCall = async (filterData: any) => {
    // await AsyncStorage.setItem("createStripeData", JSON.stringify(filterData));

    dispatch(setCreateStripeData(filterData));
  };

  const createStripeAccount = async (filterData: { personal_info: { name: string; phoneNumber: string }; user: { email: any } }) => {
    setLoad(true);

    stripeCustomer({ name: filterData?.personal_info?.name, email: filterData?.user?.email, phone: filterData?.personal_info?.phoneNumber })
      // .unwrap()
      .then((res2) => {
        if (res2?.data?.message === "success" || res2?.error?.data?.message === "customer already exists") {
          setForCareateStripeCall(res2?.error?.data?.data ?? res2?.data?.data);
        }
      })
      .catch((error) => {
        setLoad(false);
        console.log("stripe account error", error);
      });
  };

  const handleSetSort = () => {
    setSort(true);
    setSports(false);
    SetPrice(false);
    setType(false);
  };
  const handleSetSports = () => {
    setSort(false);
    setSports(true);
    SetPrice(false);
    setType(false);
  };
  const handleSetPrice = () => {
    setSort(false);
    setSports(false);
    SetPrice(true);
    setType(false);
  };
  const handleSetType = () => {
    setSort(false);
    setSports(false);
    SetPrice(false);
    setType(true);
  };
  const dummyData = (id: any, item: never) => {
    const check = personalInfoData.find((data) => data?.user === id);
    const checkx = professionalData.find((data) => data?.user === id);
    if (check === undefined) {
      ToastAndroid.show("undefined", ToastAndroid.LONG);
    }
    if (checkx === undefined) {
      ToastAndroid.show("undefined", ToastAndroid.LONG);
    } else {
      navigation.navigate("TrainerDetail", {
        personalData: { check },
        professionalData: { checkx },
        userData: { item },
        trainerId: id,
        sessionId: item._id,
      });
    }
  };
  const bookASessioan = async () => {
    setLoad(true);

    await fetch(`${url}/session`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((res2) => {
        const { personal_info, profession_info, classes } = res2?.data;
        setLoad(false);
        if (res2.message === "all classes get successfully") {
          setPersonalInfoData(personal_info);
          setProfessionalData(profession_info);
          setFilterData(classes);
          setDumData(classes);
          getDistanceFunction(classes);
        } else {
          alert(res2.errors);
        }
      });
    if (error) {
      setLoad(false);
    }
  };

  const getDistanceGoogle = (lat: any, lng: any) => {
    let dis;
    dis = getDistance({ latitude: lat, longitude: lng }, { latitude: superLat, longitude: superLong });

    let distanceInKM = dis / 1000;

    return distanceInKM;
  };
  const getDistanceFunction = (data: any) => {
    let dummy = [...data];
    dummy.map((item) => {
      var dis = getDistanceGoogle(item.session_type.lat, item.session_type.lng);
      item.session_type.distance = dis;
    });
  };

  const find = (t: any) => {
    console.log("t", t);
    const words = [data];
    setSearch(t);
    if (t === "") {
      setM("");
      setFilterData(dumdata);
    } else {
      const newData = words.filter((item) => {
        const itemData = `${item?.item?.toUpperCase()} ${item?.class_title?.toUpperCase()}`;
        const textData = t?.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      console.log("first");
      setFilterData(newData);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.fixeheight1}>
          <View style={styles.TopView}>
            <View style={styles.topView}>
              <View style={styles.rowView}>
                <View style={{ width: "60%" }}>
                  <Text style={styles.hometext}>Home</Text>
                  <Text style={styles.text}>Hello, {userData?.personal_info?.name}</Text>
                </View>
                <View style={styles.imageview}>
                  {userData?.personal_info?.profileImage ? (
                    <FastImage
                      style={{
                        width: 70,
                        height: 70,
                        borderRadius: 200 / 2,
                      }}
                      source={{
                        uri: `${userData?.personal_info?.profileImage}`,
                        headers: { Authorization: "someAuthToken" },
                        priority: FastImage.priority.normal,
                      }}
                      resizeMode={FastImage.resizeMode.cover}
                    />
                  ) : (
                    <Image style={styles.imagestyles} source={Images.Profile} />
                  )}
                </View>
              </View>
              <Text style={styles.hometext}>Find a Class</Text>
              <View style={styles.rowView1}>
                <View style={styles.searchiconview}>
                  <FontAwesome name="search" size={24} color="#fff" />
                </View>
                <View style={styles.textinputview}>
                  <TextInput
                    placeholder="Search by class"
                    placeholderTextColor={"#fff"}
                    style={styles.textinputstyle}
                    value={search}
                    onChangeText={(e) => {
                      find(e);
                    }}
                  />
                </View>
                <Pressable
                  style={styles.closeiconview}
                  onPress={() => {
                    modalVisible ? setModalVisible(false) : setModalVisible(true);
                  }}
                >
                  <Feather name="sliders" size={19} color="#fff" />
                </Pressable>
              </View>
            </View>
          </View>
          <View style={styles.TopView}>
            <View style={styles.topView}>
              <View style={styles.toptabmainview}>
                <Pressable style={styles.mainclassesview} onPress={() => NearyoutrueState()}>
                  <Text style={[nearyou ? styles.topbartext : styles.topbartext1]}>Near you</Text>
                  {nearyou ? <View style={styles.borderView}></View> : null}
                </Pressable>
                <Pressable onPress={() => RecommendedtrueState()} style={styles.mainbookedview}>
                  <Text style={[recommended ? styles.topbartext : styles.topbartext1]}>Recommended</Text>
                  {recommended ? <View style={styles.borderView}></View> : null}
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.main}>
        {nearyou && load ? (
          <ActivityIndicator size="large" color="red" />
        ) : filterData ? (
          <>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.main}>
              {/*start image box view*/}
              {filterData.map((item: UserDataInterface, i: number) => (
                <Pressable onPress={() => dummyData(item?.user?._id, item)} style={styles.boxview} key={i}>
                  <ImageBackground
                    imageStyle={{ borderRadius: 10 }}
                    style={styles.ImageBackgroundstyle}
                    source={
                      item.image
                        ? {
                            uri: `${item?.image}`,
                          }
                        : {
                            uri: "https://se-new.ingrammicro.com/_layouts/images/CSDefaultSite/common/no-image-lg.png",
                          }
                    }
                  >
                    <View style={styles.TopView}>
                      <View style={styles.topView}>
                        <View style={styles.RowView}>
                          <View style={styles.inImageView}>
                            <View style={styles.BoxViews}>
                              <Text style={styles.TextStyle}>
                                <AntDesign name="star" size={15} color={"#000"} /> {item?.averageRating?.toFixed(1)}
                              </Text>
                            </View>
                          </View>
                          <View style={styles.inImageView1}>
                            <View style={styles.BoxView1}>
                              <Text style={styles.TextStyle}>$ {item?.price} / Session</Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    </View>
                  </ImageBackground>
                  <View style={styles.jumerNameView}>
                    <Text style={styles.jamesnameText}>{item.class_title}</Text>
                    <View style={{ width: "100%", flexDirection: "row" }}>
                      <EvilIcons name="location" size={20} color="black" />
                      <Text style={styles.kmtextstyle}>{item?.session_type?.distance?.toFixed(1)} km from you</Text>
                    </View>
                  </View>
                </Pressable>
              ))}
              {/*End image box view*/}
            </ScrollView>
          </>
        ) : (
          <View
            style={{
              width: "100%",
              marginTop: 20,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontFamily: "Poppins-Regular",
                fontSize: RFValue(10, 580),
              }}
            >
              No Data Found
            </Text>
          </View>
        )}
        {recommended ? <Recommended navigation={navigation} superLong={undefined} superLat={undefined} /> : null}
      </ScrollView>
      {/*filter option model  Start*/}
      <View style={styles.bottomZero}>
        <View style={styles.modalStyle}>
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
                <View style={styles.TopView}>
                  <View style={styles.topView}>
                    {/*start header*/}
                    <View style={styles.flexdirectionView}>
                      <View style={styles.iconView}>
                        <FontAwesome5 name="arrow-left" onPress={() => setModalVisible(false)} size={20} color={"#000"} />
                      </View>
                      <View style={styles.titleName}>
                        <Text style={styles.filterText}>Filter</Text>
                      </View>
                    </View>
                    {/*end header*/}
                    <ScrollView showsVerticalScrollIndicator={false}>
                      {/*start navigation*/}
                      <View style={styles.toptabmainview}>
                        <Pressable style={styles.mainclassesview} onPress={() => handleSetSort()}>
                          <Text style={[sort ? styles.topbartext : styles.topbartext1]}>Sort</Text>
                          {sort ? <View style={styles.borderView} /> : null}
                        </Pressable>
                        <Pressable style={styles.mainclassesview} onPress={() => handleSetSports()}>
                          <Text style={[sports ? styles.topbartext : styles.topbartext1]}>Sports</Text>
                          {sports ? <View style={styles.borderView} /> : null}
                        </Pressable>
                        <Pressable onPress={() => handleSetPrice()} style={styles.mainclassesview}>
                          <Text style={[price ? styles.topbartext : styles.topbartext1]}>Price</Text>
                          {price ? <View style={styles.borderView} /> : null}
                        </Pressable>
                        <Pressable onPress={() => handleSetType()} style={styles.mainclassesview}>
                          <Text style={[type ? styles.topbartext : styles.topbartext1]}>Type</Text>
                          {type ? <View style={styles.borderView} /> : null}
                        </Pressable>
                      </View>
                      {/*end navigation*/}

                      {/*Start Navigation Screen*/}
                      <ScrollView showsVerticalScrollIndicator={false}>
                        {sort && <Sort ClassSorts={classSorts} />}
                        {sports ? <Sports navigation={navigation} handleSportsData={handleSportsData} /> : null}
                        {price ? <Price navigation={navigation} MinPriceData={minPriceData} MaxPriceData={maxPriceData} /> : null}
                        {type ? <Type navigation={navigation} ClassType={handleClassType} /> : null}
                      </ScrollView>
                      {/*End Navigation Screen*/}
                    </ScrollView>
                  </View>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </View>
      {/* filter option model*/}
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
    height: 270,
  },
  fixeheight1: {
    height: 270,
    paddingTop: 10,
    width: "100%",
    alignItems: "center",
  },
  main: {
    width: "100%",
  },
  TopView: {
    width: "100%",
    alignItems: "center",
  },
  topView: {
    width: "90%",
  },
  boxview: {
    width: 269,
    backgroundColor: "#fff",
    borderRadius: 10,
    margin: 9,
  },
  ImageBackgroundstyle: {
    width: 269,
    height: 269,
    resizeMode: "contain",
  },
  RowView: {
    width: "100%",
    flexDirection: "row",
    paddingVertical: 10,
  },
  inImageView: {
    width: "50%",
  },
  inImageView1: {
    width: "50%",
    alignItems: "flex-end",
  },
  BoxViews: {
    width: 50,
    backgroundColor: "#E5E6EA",
    height: 23,
    borderRadius: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  BoxView1: {
    paddingHorizontal: 5,
    backgroundColor: "#E5E6EA",
    paddingVertical: 5,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  TextStyle: {
    color: "#000",
    fontSize: RFValue(9, 580),
    fontFamily: "Poppins-Regular",
  },
  jumerNameView: {
    width: "100%",
    paddingTop: 10,
    paddingLeft: 10,
  },
  jamesnameText: {
    fontSize: RFValue(16, 580),
    fontFamily: "Poppins-SemiBold",
    color: "#000",
    textTransform: "capitalize",
  },

  kmtextstyle: {
    fontSize: RFValue(10, 580),
    fontFamily: "Poppins-Regular",
    color: "#000",
    marginTop: -2,
  },

  rowView: {
    width: "100%",
    flexDirection: "row",
  },

  hometext: {
    fontSize: RFValue(19, 580),
    fontFamily: "Poppins-Bold",
    color: "#000000",
    marginTop: 10,
  },
  imageview: {
    width: "40%",
    alignItems: "flex-end",
    justifyContent: "center",
  },
  imagestyles: {
    width: 80,
    height: 80,
    borderRadius: 200 / 2,
  },
  toptabmainview: {
    width: "100%",
    flexDirection: "row",
    marginTop: 20,
  },
  mainclassesview: {
    width: "25%",
    alignItems: "center",
  },
  mainbookedview: {
    width: "40%",
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
    width: 20,
    borderWidth: 1,
    borderColor: "#ff0000",
    alignItems: "center",
    marginTop: 5,
  },
  rowView1: {
    width: "100%",
    flexDirection: "row",
    backgroundColor: "#000",
    borderRadius: 8,
    height: 50,
    marginTop: 20,
    justifyContent: "center",
    alignSelf: "center",
  },
  searchiconview: {
    width: "10%",
    alignItems: "center",
    justifyContent: "center",
  },
  textinputview: {
    width: "80%",
    paddingTop: Platform.OS === "ios" ? 13 : 5,
    justifyContent: "center",
  },
  closeiconview: {
    width: "10%",
    alignItems: "center",
    justifyContent: "center",
  },
  textinputstyle: {
    color: "#fff",
    height: 50,
    fontFamily: "Poppins-Regular",
    fontSize: RFValue(12, 580),
  },
  text: {
    fontFamily: "Poppins-Regular",
    fontSize: RFValue(10, 580),
    color: "#000",
    textTransform: "capitalize",
  },
  centeredView: {
    height: "100%",
    width: "100%",
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
  },
  modalView: {
    width: "100%",
    position: "absolute",
    bottom: 0,
    maxHeight: "80%",
    minHeight: "80%",
    paddingVertical: 10,
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
  flexdirectionView: {
    flexDirection: "row",
    width: "100%",
    backgroundColor: "#fff",
    height: 50,
  },
  iconView: {
    width: "20%",
    alignItems: "center",
    justifyContent: "center",
  },
  titleName: { width: "80%", justifyContent: "center" },
  filterText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: RFValue(20, 580),
    color: "#000",
  },
});
export default Home;
