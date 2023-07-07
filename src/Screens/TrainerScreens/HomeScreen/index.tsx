import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  PermissionsAndroid,
  ToastAndroid,
} from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import AntDesign from "react-native-vector-icons/AntDesign";
import * as Images from "../../../constants/Images";
import Classes from "../ClassesScreen";
import Reviews from "../Reviews";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Geolocation from "react-native-geolocation-service";
import Geocoder from "react-native-geocoder";
import FastImage from "react-native-fast-image";
import styles from "./styles";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { useGetUserMeQuery, useSessionDelMutation, useStripeCustomerMutation, useTrainerSessionQuery } from "../../../slice/FitsApi.slice";
import { useSelector } from "react-redux";
import { UserDetail } from "../../../interfaces";
import { NavigationSwitchProp } from "react-navigation";

interface Props{
    navigation: NavigationSwitchProp;
}

const Home:React.FC<Props> = ({ navigation }) => {
  // Hooks
  const [classes, setClasses] = useState(true);
  const [reviews, setReviews] = useState(false);
  const [userData, setUserData] = useState([]);
  const [superLong, setSuperLong] = useState(55.9754);
  const [superLat, setSuperLat] = useState(21.4735);
  const [search, setSearch] = useState("");
  const [load, setLoad] = useState(false);
  const [loadx, setLoadx] = useState(false);
  const [dumdata, setDumData] = useState([]);
  const [classesData, setClassesData] = useState([]);
  const {userInfo}  = useSelector((state: {fitsStore:Partial<UserDetail>}) => state.fitsStore)
  const token:string  = useSelector((state: {token:string}) => state.token)
  const { data:userMeData } = useGetUserMeQuery({ id: userInfo?._id });
  const { data:trainerSession } = useTrainerSessionQuery({ id: userInfo?._id });
  const [sessionDel,{ data: sessionDelete }] = useSessionDelMutation();
  const [stripeCustomer,{ data: stripeCustomerData }] = useStripeCustomerMutation();
  
  // Functions
  const userMe = async () => {
        if (userMeData?.success) {
          setUserData(userMeData);
          getAllClasses();
          createStripeAccount(userMeData);
        } else {
          ToastAndroid.show(userMeData?.message, ToastAndroid.LONG);
        }   
  };

  const setForCareateStripeCall = async (data: any) => {
    await AsyncStorage.setItem("createStripeData", JSON.stringify(data));
  };

  const createStripeAccount = async (data: { personal_info: { name: any; phoneNumber: any; }; user: { email: any; }; }) => {
    setLoad(true);
    stripeCustomer({
      name: data?.personal_info?.name,
      email: data?.user?.email,
      phone: data?.personal_info?.phoneNumber,
    }).unwrap()
      .then((res2) => {
        if (
          res2?.message === "success" ||
          res2?.message === "customer already exists"
        ) {
          setForCareateStripeCall(res2?.data);
        }
      })
      .catch((error) => {
        setLoad(false);
      });
  };

  const find = (t: React.SetStateAction<string>) => {
    const words = [...classesData];
    setSearch(t);
    if (t === "") {
      setClassesData(dumdata);
    } else {
      const newData = words.filter((item) => {
        const itemData = `${item?.item?.toUpperCase()} ${item?.class_title?.toUpperCase()}`;
        const textData = t?.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setClassesData(newData);
    }
  };

  const deleteClass = async (item: { _id: number; }) => {
   
    setLoadx(true);
    sessionDel(item._id).unwrap()
      .then((res2) => {
        setLoadx(false);
        if (res2.succes === true) {
          ToastAndroid.show("Deleted!", ToastAndroid.LONG);
          getAllClasses();
        } else {
          ToastAndroid.show(res2.message, ToastAndroid.LONG);
        }
      })
      .catch((error) => {
        setLoadx(false);
      });
  };

  const detailsInfoCall = (item: any, i: string | number) => {
    let dummy = [...classesData];
    if (dummy[i].status == true) {
      dummy.forEach((item) => (item.status = false));
    } else {
      dummy.forEach((item) => (item.status = false));
      dummy[i].status = true;
    }
    setClassesData(dummy);
  };

  const classestrueState = () => {
    setClasses(true);
    setReviews(false);
  };

  const reviewstrueState = () => {
    setClasses(false);
    setReviews(true);
  };

  const setUserLocation = async (data: string) => {
    await AsyncStorage.setItem("userLocation", JSON.stringify(data));
  };

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Location Access Required",
          message: "This App needs to Access your location",
          buttonPositive: "Allow Location",
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(
          (position) => {
            setSuperLong(position?.coords?.longitude);
            setSuperLat(position?.coords?.latitude);
            var pos = {
              lat: position?.coords?.latitude,
              lng: position?.coords?.longitude,
            };
            
            Geocoder.geocodePosition(pos)
              .then((res: {
                subLocality: string;
                locality: string;
                adminArea: string; country: string; 
}[]) => {
                setUserLocation(
                  res[0].subLocality +
                  " " +
                  res[0].locality +
                  " ," +
                  res[0].adminArea +
                  "-" +
                  res[0].country
                );
              })
          },
          (error) => {
            console.error(error.code, error?.message);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
      }
    } catch (error) {
      console.error(error?.message);
    }
  };

  const getAllClasses = async () => {
        if (trainerSession.success) {
          setDumData(trainerSession?.data?.session);
          setClassesData(trainerSession?.data?.session);
        } else {
        }
     
  };

  // Effects

  useEffect(() => {
    requestLocationPermission()
    Toast.show({
      type: "success",
      text1: "Welcome",
    });
    navigation.addListener("focus", () => {
      userMe();
    });
  }, []);

  
  return (
    <View style={styles.mainContainer}>
      {/*Header rect start*/}
      <View style={styles.mainHeaderRect}>
        {/*First Header*/}
        <View style={styles.topHeaderRect}>
          <View style={{ width: "60%" }}>
            <Text style={styles.homeTitleText}>Home</Text>
            <Text style={styles.userTitleText}>
              Hello, {userData?.personal_info?.name}
            </Text>
          </View>
          <View style={styles.profileImageRect}>
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
        {/*Second Header titles*/}
        <View style={styles.secondHeaderRect}>
          <TouchableOpacity
            style={styles.mainclassesview}
            onPress={() => classestrueState()}
          >
            <Text style={[classes ? styles.titleText : styles.activeTitleText]}>
              Classes
            </Text>
            {classes ? <View style={styles.borderView}></View> : null}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => reviewstrueState()}
            style={styles.mainclassesview}
          >
            <Text style={[reviews ? styles.titleText : styles.activeTitleText]}>
              Reviews
            </Text>
            {reviews && <View style={styles.borderView}></View> }
          </TouchableOpacity>
        </View>

      </View>
      {/*Header rect end*/}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.mainBody}>
          {classes && (
            <Classes
              deleteClass={deleteClass}
              detailsInfoCall={detailsInfoCall}
              loadx={loadx}
              load={load}
              data={classesData}
            />
          ) }
          {reviews && (
            <Reviews load={load} data={classesData} navigation={navigation} />
          ) }
        </View>
        <View style={{ marginVertical: 60 }}></View>
      </ScrollView>
      {classes && (
        <View style={styles.footerRect}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() =>
              navigation.navigate("CreateBookSession", {
                superLong: superLong,
                superLat: superLat,
              })
            }
            style={styles.addIconRect}
          >
            <AntDesign name="plus" color={"#fff"} size={wp(6)} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Home;
