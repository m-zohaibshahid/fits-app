import React, { useState, useEffect } from "react";
import { Text, View, Pressable, StyleSheet, TextInput, Modal, ImageBackground, Image, ScrollView, ToastAndroid, Platform, PermissionsAndroid, Alert } from "react-native";
import { getDistance } from "geolib";
import Feather from "react-native-vector-icons/Feather";
import AntDesign from "react-native-vector-icons/AntDesign";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { RFValue } from "react-native-responsive-fontsize";
import Recommended from "./Recommended";
import * as Images from "../../constants/Images";
import Colors from "../../constants/Colors";
import Sort from "./Filter/Sort";
import Sports from "./Filter/Sports";
import Price from "./Filter/Price";
import Type from "./Filter/Type";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Geolocation from "react-native-geolocation-service";
import Geocoder from "react-native-geocoder";
import FastImage from "react-native-fast-image";
import { useSessionsQuery, useStripeCustomerMutation, useUpdateFilterMutation } from "../../slice/FitsApi.slice";
import { useDispatch, useSelector } from "react-redux";
import { TrainerClassInterfaceInTraineeScreenInterface, TrainerPersonalinfoInTraineeScreenInterface, TrainerProfessioninfoInTraineeScreen, UserDetail } from "../../interfaces";
import { setCreateStripeData } from "../../slice/FitsSlice.store";
import { NavigationSwitchProp } from "react-navigation";
import { errorToast } from "../../utils/toast";
import Container from "../../Components/Container";
import Header from "../../Components/Header";
import Typography from "../../Components/typography/text";
interface Props {
  navigation: NavigationSwitchProp;
}
const Home: React.FC<Props> = ({ navigation }) => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state: { fitsStore: Partial<UserDetail> }) => state.fitsStore);
  const [modalVisible, setModalVisible] = useState(false);
  const [filterType, setFilterType] = useState<FilterTypes>(FilterTypes.SORT);
  const [filterData, setFilterData] = useState<TrainerClassInterfaceInTraineeScreenInterface[]>([]);
  const [dumdata, setDumData] = useState<TrainerClassInterfaceInTraineeScreenInterface[]>([]);
  const [personalInfoData, setPersonalInfoData] = useState<TrainerPersonalinfoInTraineeScreenInterface[]>([]);
  const [professionalData, setProfessionalData] = useState<TrainerProfessioninfoInTraineeScreen[]>([]);
  const [sportData, setSportData] = useState(null);
  const [minimumPrice, setMinimumPrice] = useState(0);
  const [maximumPrice, setMaximumPrice] = useState(0);
  const [classType, setClassType] = useState(null);
  const [classSort, setClassSort] = useState(null);
  const [search, setSearch] = useState("");
  const [nearyou, setNearyou] = useState(true);
  const [recommended, setRecommended] = useState(false);
  const [superLong, setSuperLong] = useState(55.9754);
  const [superLat, setSuperLat] = useState(21.4735);

  const { data: session, refetch: sessionRefetch } = useSessionsQuery({});
  const [stripeCustomer] = useStripeCustomerMutation({});
  const [updateFilter] = useUpdateFilterMutation({});

  const handleSportsData = (item: { name: null }) => {
    setModalVisible(false);
    setSportData(item?.name);
  };

  const minPriceData = (minPrice: string) => {
    setModalVisible(false);
    setMinimumPrice(parseInt(minPrice, 10));
  };

  const maxPriceData = (maxPrice: string) => {
    setModalVisible(false);
    setMaximumPrice(parseInt(maxPrice, 10));
  };

  const handleClassType = (item: { Name: { toLowerCase: () => React.SetStateAction<null> } }) => {
    setModalVisible(false);
    setClassType(item?.Name.toLowerCase());
  };

  const classSorts = (item: { Name: React.SetStateAction<null> }) => {
    setModalVisible(false);
    setClassSort(item?.Name);
  };

  // useEffects

  useEffect(() => {
    if (sportData || minimumPrice || maximumPrice || classType || classSort) {
      Filter();
    }
  }, [sportData, minimumPrice, maximumPrice, classType, classSort]);

  useEffect(() => {
    navigation.addListener("focus", () => {
      createStripeAccount(userInfo?.personal_info);
      requestLocationPermission();
      sessionRefetch();
    });
  }, []);
  
  useEffect(() => {
      bookASession();
  }, [session]);

  // filter Api states
  const Filter = async () => {
    const data = {
      sports: sportData,
      min_price: minimumPrice,
      max_price: maximumPrice,
      type: classType,
      sort_by: classSort,
    };
    const result = await updateFilter(data)
    
    if (result?.error) errorToast(result.error?.data?.message);
    if (result?.data) setFilterData(result.data?.data?.result);
  };

  //function
  const NearyoutrueState = () => {
    setNearyou(true);
    setRecommended(false);
  };
  const RecommendedtrueState = () => {
    setNearyou(false);
    setRecommended(true);
  };

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
                  const address = res[0].subLocality + " " + res[0].locality + ", " + res[0].adminArea + "-" + res[0].country;
                  setUserLocation(address);
                }
              )
              .catch((error: string) => Alert.alert(error));
          },
          (error) => {
            console.log("Error while getting location:", error);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
      } else {
        Alert.alert("Permission Access denied. Please Make Sure GPS Permission is enabled and then exit app and run again");
      }
    } catch (err) {
      console.log("Error while requesting location permission:", err);
    }
  };

  const setForCareateStripeCall = async (filterData: any) => {
    dispatch(setCreateStripeData(filterData));
  };

  const createStripeAccount = async (filterData: { personal_info: { name: string; phoneNumber: string }; user: { email: any } }) => {
    stripeCustomer({ name: filterData?.personal_info?.name, email: filterData?.user?.email, phone: filterData?.personal_info?.phoneNumber })
      // .unwrap()
      .then((res2: any) => {
        if (res2?.data?.message === "success" || res2?.error?.data?.message === "customer already exists") {
          setForCareateStripeCall(res2?.error?.data?.data ?? res2?.data?.data);
        }
      })
      .catch((error) => {
        errorToast(error?.message)
      });
  };

  const handlePressOnCard = (item: TrainerClassInterfaceInTraineeScreenInterface) => {
    const findPersonalInfoById = personalInfoData.find((data: TrainerPersonalinfoInTraineeScreenInterface) => data.user === item.user?._id);
    const findProfessionalInfoById = professionalData.find((data: TrainerProfessioninfoInTraineeScreen) => data.user === item.user?._id);
    if (!findPersonalInfoById) ToastAndroid.show("Failed to retrieve personal information. Please make sure the user has filled out their personal profile.", ToastAndroid.LONG);
    if (!findProfessionalInfoById) {
      ToastAndroid.show("Failed to retrieve professional information. Please make sure the user has filled out their professional profile.", ToastAndroid.LONG);
    } else {
      console.log();
      
      navigation.navigate("TrainerDetail", {
        personalData: findPersonalInfoById,
        professionalData: findProfessionalInfoById,
        userData: item,
        sessionId: item?._id,
      });
    }
  };

  const bookASession = async () => {
    if (!session?.data) return
    setPersonalInfoData(session?.data.personal_info);
    setProfessionalData(session?.data.profession_info);
    setFilterData(session?.data.classes);
    setDumData(session?.data.classes);
    getDistanceFunction(session?.data.classes);
  };

  const getDistanceGoogle = (lat: any, lng: any) => {
    let distance;
    distance = getDistance({ latitude: lat, longitude: lng }, { latitude: superLat, longitude: superLong });

    let distanceInKM = distance / 1000;

    return distanceInKM;
  };

  const getDistanceFunction = (data: any) => {
    let dummy = [...data];
    dummy.forEach((item) => {
      const distance = getDistanceGoogle(item.session_type.lat, item.session_type.lng);
      item.session_type.distance = distance;
    });
  };

  const find = (t: any) => {
    console.log("t", t);
    const words = [...filterData];
    setSearch(t);
    if (!t) {
      setFilterData(dumdata);
    } else {
      const newData = words.filter((item: any) => {
        const itemData = `${item?.item?.toUpperCase()} ${item?.class_title?.toUpperCase()}`;
        const textData = t?.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilterData(newData);
    }
  };

  return (
    <Container>
      <View style={styles.header}>
        <View style={styles.fixeheight1}>
          <View style={styles.TopView}>
            <View style={styles.topView}>
              <View style={styles.rowView}>
                <View style={{ width: "60%" }}>
                  <Text style={styles.hometext}>Home</Text>
                  <Text style={styles.text}>Hello, {userInfo?.personal_info?.name}</Text>
                </View>
                <View style={styles.imageview}>
                  {userInfo?.personal_info?.profileImage ? (
                    <FastImage
                      style={{
                        width: 70,
                        height: 70,
                        borderRadius: 200 / 2,
                      }}
                      source={{
                        uri: `${userInfo?.personal_info?.profileImage}`,
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
                    onChangeText={(e) => find(e)}
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
        {filterData ? (
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.main}>
              {filterData.map((item: TrainerClassInterfaceInTraineeScreenInterface, i: number) => (
                <Pressable onPress={() => handlePressOnCard(item)} style={styles.boxview} key={i}>
                  <ImageBackground imageStyle={{ borderRadius: 10 }} style={styles.ImageBackgroundstyle} source={{ uri: item.image } ?? dummyImageSource}>
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
                      <Text style={styles.kmtextstyle}>{item.session_type.desc} km from you</Text>
                    </View>
                  </View>
                </Pressable>
              ))}
            </ScrollView>
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
    <Modal
      animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
      >
              <View style={styles.bottomView}>
                <View style={styles.modalContainer}>
                    <Header label={"Filter"} hideBackButton showCloseButton lableStyle={{marginBottom: 30}} onClose={() => setModalVisible(false)} />
                      <View style={styles.toptabmainview}>
                          <Typography style={filterType === FilterTypes.SORT ? {
                            borderBottomColor: Colors.redColor,
                            borderBottomWidth: 2
                          } : {}} color={filterType === FilterTypes.SORT ? "redColor" : "black"} size="medium" onPress={() => setFilterType(FilterTypes.SORT)} pressAble>Sort</Typography>
                          <Typography style={filterType === FilterTypes.SPORT ? {
                            borderBottomColor: Colors.redColor,
                            borderBottomWidth: 2
                          } : {}} color={filterType === FilterTypes.SPORT ? "redColor" : "black"} size="medium" onPress={() => setFilterType(FilterTypes.SPORT)} pressAble>Sports</Typography>
                          <Typography style={filterType === FilterTypes.PRICE ? {
                            borderBottomColor: Colors.redColor,
                            borderBottomWidth: 2
                          } : {}} color={filterType === FilterTypes.PRICE ? "redColor" : "black"} size="medium" onPress={() => setFilterType(FilterTypes.PRICE)} pressAble>Price</Typography>
                          <Typography style={filterType === FilterTypes.TYPE ? {
                            borderBottomColor: Colors.redColor,
                            borderBottomWidth: 2
                          } : {}} color={filterType === FilterTypes.TYPE ? "redColor" : "black"} size="medium" onPress={() => setFilterType(FilterTypes.TYPE)} pressAble>Type</Typography>
                      </View>
                      <ScrollView showsVerticalScrollIndicator={false}>
                        {filterType === FilterTypes.SORT ? <Sort ClassSorts={classSorts} /> : null}
                        {filterType === FilterTypes.SPORT ? <Sports navigation={navigation} handleSportsData={handleSportsData} /> : null}
                        {filterType === FilterTypes.PRICE ? <Price navigation={navigation} MinPriceData={minPriceData} MaxPriceData={maxPriceData} /> : null}
                        {filterType === FilterTypes.TYPE ? <Type navigation={navigation} ClassType={handleClassType} /> : null}
                      </ScrollView>
                  </View>
                </View>
    </Modal>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingTop: Platform.OS === "ios" ? 40 : 0,
    paddingBottom: 0,
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
    paddingTop: 15,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 6.84,
    elevation: 9,
    height: 500
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
    marginTop: 20
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
    // flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10
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

enum FilterTypes {
  SORT = "sort",
  SPORT = "sport",
  TYPE = "type",
  PRICE = "price",
}