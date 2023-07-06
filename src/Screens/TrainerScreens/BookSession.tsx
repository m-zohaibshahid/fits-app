import React, { useState, useEffect, useRef } from "react";
import { Text, View, Pressable, StyleSheet, TextInput, ScrollView, ToastAndroid, ActivityIndicator, Platform, Modal, Image } from "react-native";
import ImagePicker from "react-native-image-crop-picker";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { RFValue } from "react-native-responsive-fontsize";
import { Calendar } from "react-native-calendars";
import Header from "../../Components/Header";
import DatePicker from "react-native-modern-datepicker";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import Colors from "../../constants/Colors";
import { url } from "../../constants/url";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import { useRoute } from "@react-navigation/native";
const Sporst = [
  {
    Name: "Soccer",
  },
  {
    Name: "Basketball",
  },
  {
    Name: "Tennis",
  },
  {
    Name: "Baseball",
  },
  {
    Name: "Golf",
  },
  {
    Name: "Volleyball",
  },
  {
    Name: "Running",
  },
  {
    Name: "Badminton",
  },
  {
    Name: "swimming",
  },
  {
    Name: "boxing",
  },
  {
    Name: "table tennis",
  },
  {
    Name: "skiing",
  },
  {
    Name: "ice skating",
  },
  {
    Name: "roller skating",
  },
  {
    Name: "cricket",
  },
  {
    Name: "rugby",
  },
  {
    Name: "pool",
  },
  {
    Name: "darts",
  },
  {
    Name: "bowling",
  },
  {
    Name: "karate",
  },
];
const BookSession = ({ navigation }) => {
  const route = useRoute();
  const [superLong, setSuperLong] = useState();
  const [superLat, setSuperLat] = useState();
  const [modalVisibleDate, setModalVisibleDate] = useState(false);
  const GoBack = () => {
    navigation.goBack();
  };
  useEffect(() => {
    navigation.addListener("focus", () => {
      if (route.params.superLat && route.params.superLong) {
        setSuperLat(route.params.superLat);
        setSuperLong(route.params.superLong);
      } else {
      }
    });
  }, [route.params]);
  const NextScreen = async () => {
    await AsyncStorage.setItem("BookSession", JSON.stringify("true"));
    navigation.navigate("Trainerpayment");
  };
  useEffect(() => {
    navigation.addListener("focus", () => {
      getUserInfo();
      userMe();
    });
  }, [getUserInfo]);
  const [token, setToken] = useState("");
  const mapRef = useRef();
  const getUserInfo = async () => {
    const userData = await AsyncStorage.getItem("userData");
    let userDatax = JSON.parse(userData);
    setToken(userDatax?.access_token);
  };
  const upLoadVideo = () => {
    if (classTitle === "") {
      ToastAndroid.show("Please Enter your Class Title.", ToastAndroid.SHORT);
    } else if (currentDate === "" || currentDate === undefined) {
      ToastAndroid.show("Please Select Date.", ToastAndroid.SHORT);
    } else if (time === "") {
      ToastAndroid.show("Please enter the time.", ToastAndroid.SHORT);
    } else if (duration === "") {
      ToastAndroid.show("Please enter duration.", ToastAndroid.SHORT);
    } else if (image === "") {
      ToastAndroid.show("Please Upload Image.", ToastAndroid.SHORT);
    } else if (slots === "") {
      ToastAndroid.show("Please enter the No of slots.", ToastAndroid.SHORT);
    } else {
      navigation.navigate("UploadVideo", {
        // params
        select_date: currentDate,
        class_title: classTitle,
        class_time: time,
        duration: duration,
        no_of_slots: slots,
        image: cloudImageUrl,
        lat: superLat,
        lng: superLong,
      });
    }
  };
  const [currentDate, setCurrentDate] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [details, setDetails] = useState("false");
  const [modalVisibleTopSelect, setModalVisibleTopSelect] = useState(false);
  {
    /*start a  type of Session*/
  }
  const [type, setType] = useState(false);
  {
    /*End a  type of Session*/
  }
  {
    /*start a  type of Session*/
  }
  const [value, setValue] = useState("");
  const [cardio, setCardio] = useState(false);
  const [noEquipment, setNoEquipment] = useState(false);
  const [learn, setLearn] = useState(false);
  const [strength, setStrength] = useState(false);
  const [fat, setFat] = useState(false);
  const [mental, setMental] = useState(false);
  {
    /*End a  type of Session*/
  }
  const [classTitle, setClassTitle] = useState("");
  const [sessionTitle, setSessionTitle] = useState("");
  const [sport, setSport] = useState("");
  const [equipment, setEquipment] = useState([
    {
      value: "",
    },
  ]);
  const [image, setImage] = useState("");
  const [meetingLink, setMeetingLink] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("");
  const [duration, setDuration] = useState();
  const [slots, setSlots] = useState(0);
  const [price, setPrice] = useState();
  const [cloudImageUrl, setCloudImageUrl] = useState("");
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(false);
  const [loadx, setLoadx] = useState(false);
  const bookSession = async () => {
    if (classTitle === "") {
      ToastAndroid.show("Please Enter your Class Title.", ToastAndroid.SHORT);
    } else if (equipment.value === "") {
      ToastAndroid.show("Please Enter Value.", ToastAndroid.SHORT);
    } else if (sport === "") {
      ToastAndroid.show("Please Enter any Sports.", ToastAndroid.SHORT);
    } else if (currentDate === "") {
      ToastAndroid.show("Please Enter Date.", ToastAndroid.SHORT);
    } else if (description === "") {
      ToastAndroid.show("Please enter the description.", ToastAndroid.SHORT);
    } else if (image === "") {
      ToastAndroid.show("Please Upload Image.", ToastAndroid.SHORT);
    } else if (time === "") {
      ToastAndroid.show("Please enter the time.", ToastAndroid.SHORT);
    } else if (duration === "") {
      ToastAndroid.show("Please enter duration.", ToastAndroid.SHORT);
    } else if (value === "") {
      ToastAndroid.show("Please select the Category.", ToastAndroid.SHORT);
    } else if (slots === 0) {
      ToastAndroid.show("Please enter the No of slots.", ToastAndroid.SHORT);
    } else if (price === "") {
      ToastAndroid.show("Please enter the Price.", ToastAndroid.SHORT);
    } else if (token === "") {
      ToastAndroid.show("token missing", ToastAndroid.SHORT);
    } else {
      setLoad(true);
      let session_type;
      if (type == "online") {
        if (sessionTitle === "") {
          ToastAndroid.show("Please enter the Session title.", ToastAndroid.SHORT);
        }

        if (meetingLink === "") {
          ToastAndroid.show("Please enter the Meeting link here.", ToastAndroid.SHORT);
        }

        session_type = {
          type: type,
          meetingLink: meetingLink,
          lat: superLat,
          lng: superLong,
          // null
          recordCategory: "na",
          no_of_play: "na",
          videoTitle: "na",
        };
      } else if (type == "physical") {
        session_type = {
          type: type,
          lat: superLat,
          lng: superLong,
          meetingLink: meetingLink,
          // null
          recordCategory: "na",
          no_of_play: "na",
          videoTitle: "we",
        };
      }

      await fetch(`${url}/session`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          // body
          select_date: currentDate,
          class_title: classTitle,
          class_time: time,
          duration: duration,
          no_of_slots: slots,
          equipment: equipment,
          sports: sport,
          category: value,
          price: price,
          details: description,
          image: cloudImageUrl,
          session_type: session_type,
          session_title: sessionTitle,
        }),
      })
        .then((res) => res.json())
        .then((res2) => {
          setLoad(false);
          if (res2.message === "created successfully") {
            NextScreen();
          } else {
            Alert.alert(res2?.errors?.email);
          }
        })
        .catch((error) => {
          setLoad(false);
          Alert.alert("Something Went Wrong");
        });
    }
  };
  const upValue = (value: string, index: number) => {
    let oldEquipment = [...equipment];
    oldEquipment[index].value = value;
    setEquipment(oldEquipment);
  };
  const delEquipment = (value: string) => {
    let oldEquipment = [...equipment];
    let newEquipment = oldEquipment.filter((item) => item.value !== value);
    setEquipment(newEquipment);
  };
  const addEquipment = () => {
    let oldEquipment = [...equipment];
    let newEquipment = {
      value: "",
    };
    oldEquipment.push(newEquipment);

    setEquipment(oldEquipment);
  };
  const UseTemplate = (item: never) => {
    if (item?.session_type?.type === "recorded") {
      Recorded(item);
      setModalVisibleTopSelect("false");
    } else if (item?.session_type?.type === "physical") {
      Physical(item);
      setModalVisibleTopSelect("false");
    } else if (item?.session_type?.type === "online") {
      Online(item);
      setModalVisibleTopSelect("false");
    }
  };
  const Physical = (item: {
    class_title: React.SetStateAction<string>;
    duration: React.SetStateAction<undefined>;
    details: React.SetStateAction<string>;
    price: React.SetStateAction<undefined>;
    session_title: React.SetStateAction<string>;
    class_time: React.SetStateAction<string>;
    no_of_slots: React.SetStateAction<number>;
    sports: React.SetStateAction<string>;
  }) => {
    setClassTitle(item?.class_title);
    setDuration(item?.duration);

    setDescription(item?.details);
    setPrice(item?.price);

    setSessionTitle(item?.session_title);
    setTime(item?.class_time);
    setSlots(item?.no_of_slots);
    setSport(item?.sports);
  };
  const Online = (item: {
    class_title: React.SetStateAction<string>;
    duration: React.SetStateAction<undefined>;
    details: React.SetStateAction<string>;
    price: React.SetStateAction<undefined>;
    session_title: React.SetStateAction<string>;
    session_type: { meetingLink: React.SetStateAction<string> };
    class_time: React.SetStateAction<string>;
    no_of_slots: React.SetStateAction<number>;
    sports: React.SetStateAction<string>;
  }) => {
    setClassTitle(item?.class_title);
    setDuration(item?.duration);
    setDescription(item?.details);
    setPrice(item?.price);
    setSessionTitle(item?.session_title);
    setMeetingLink(item?.session_type?.meetingLink);
    setTime(item?.class_time);
    setSlots(item?.no_of_slots);
    // setEquipment(item?.equipment[0]?.value);
    setSport(item?.sports);
  };
  const Recorded = (item: { class_title: React.SetStateAction<string>; duration: React.SetStateAction<undefined> }) => {
    setClassTitle(item?.class_title);
    setDuration(item?.duration);
  };
  const choosePhotoFromCamera = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 200,
      cropping: true,
      compressImageQuality: 0.4,
    })
      .then((file) => {
        let newFile = {
          uri: file.path,
          type: "image/png",
          name: `image.png`,
          //type: `test/${file.path.split(".")[1]}`,
          //name: `test.${file.path.split(".")[1]}`,
        };
        uploadImageOnCloud(newFile);
        setImage(file.path);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const uploadImageOnCloud = async (image: { uri: string; type: string; name: string }) => {
    const zzz = new FormData();
    zzz.append("file", image);
    zzz.append("upload_preset", "employeeApp");
    zzz.append("cloud_name", "ZACodders");

    await fetch("https://api.cloudinary.com/v1_1/ZACodders/image/upload", {
      method: "POST",
      body: zzz,
    })
      .then((res) => res.json())
      .then((res2) => {
        //setLoadx(false);
        setCloudImageUrl(res2?.url);
      })
      .catch((err) => {
        //setLoadx(false);
      });
  };
  const userMe = async () => {
    setLoadx(true);
    const userData = await AsyncStorage.getItem("userData");
    let userDatax = JSON.parse(userData);
    await fetch(`${url}/user/me/${userDatax?.data?._id}`, {
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
        if (res2.success === true) {
          setData(res2?.session);
        } else {
          ToastAndroid.show(res2.message, ToastAndroid.LONG);
        }
      })
      .catch((error) => {
        setLoadx(false);
        ToastAndroid.show(error, ToastAndroid.LONG);
      });
  };
  const detailsInfoCall = (item: never, i: number) => {
    let dummy = [...data];
    if (dummy[i].status == true) {
      dummy.forEach((item) => (item.status = false));
    } else {
      dummy.forEach((item) => (item.status = false));
      dummy[i].status = true;
    }
    setData(dummy);
  };
  const readyHa = () => {
    mapRef.current.fitToCoordinates(["zuhair"], {
      edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
      animated: true,
    });
  };
  return (
    <View style={styles.container}>
      <View style={styles.hader}>
        <View style={styles.fixeheight}>
          <Header navigation={navigation} onPress={GoBack} />
        </View>
        <View style={styles.fixeheight1}>
          <View style={styles.TopView}>
            <View style={styles.topView}>
              <Text style={styles.bookTextstyle}>Create a session</Text>
              <Text style={styles.alreadyTextstyle}>Fill in some details</Text>
            </View>
          </View>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.main}>
          {/*start Already booked*/}
          <View style={styles.TopView}>
            <View style={styles.topView}>
              {/*
              <View style={styles.absrowview}>
              <View style={styles.abstextview}>
                <Text style={styles.alreadyTextstyle}>
                  Already Booked Slots
                </Text>
              </View>
              <View style={styles.reddotview}>
                <View style={styles.dotview}></View>
              </View>
            </View>
            */}
              {/* end Already booked*/}
              <View style={styles.CalendarView}>
                <Calendar
                  markingType={"custom"}
                  onDayPress={(day) => {
                    setCurrentDate(day.dateString);
                  }}
                  firstDay={1}
                  markedDates={{
                    [currentDate]: { selected: true, selectedColor: "red" },
                  }}
                />
                <View style={styles.borderView}></View>
              </View>
              {/*start class title input*/}
              <View style={styles.ClassTitle}>
                <Text style={styles.HeadingTextstyle}>Class Title</Text>
                <View style={styles.TextInput}>
                  <TextInput placeholder=" Class Title " style={styles.inputEmail} placeholderTextColor={"#fff"} value={classTitle} onChangeText={setClassTitle} />
                </View>
              </View>
              {/*end class title input*/}
              {/*start Image  */}
              {image === "" ? (
                <Pressable
                  style={styles.ImageBox}
                  onPress={() => {
                    choosePhotoFromCamera();
                  }}
                >
                  <Ionicons name="cloud-upload-outline" size={50} color={"#fff"} />
                  <Text style={styles.uploadtext}>Upload Image</Text>
                </Pressable>
              ) : (
                <View style={{ width: "100%", marginTop: 20 }}>
                  <Image
                    style={styles.imagestyle}
                    resizeMode="cover"
                    source={{
                      uri: image,
                    }}
                  />
                </View>
              )}

              {/*end Image*/}
              {/*start Your previous class */}
              <View style={styles.absrowview}>
                <View style={styles.classtimeview}>
                  <Text style={styles.HeadingTextstyle}>Your previous class templates</Text>
                </View>
                <View style={styles.timeview}>
                  <Pressable onPress={() => setModalVisibleTopSelect(true)} style={styles.selectBtn}>
                    <Text style={styles.TopselectText}>Tap to select</Text>
                  </Pressable>
                </View>
              </View>
              {/*end Your previous class*/}

              {/*start clastime */}
              <View style={styles.absrowview}>
                <View style={styles.classtimeeview}>
                  <Text style={styles.HeadingTextstyle}>Class time</Text>
                </View>
                <Pressable onPress={() => setModalVisibleDate(true)} style={styles.timeeview}>
                  <Text style={styles.TopselectTexte}>{time}</Text>
                </Pressable>
              </View>
              {/*End clastime */}
              {/* start Duration */}
              <View style={styles.absrowview}>
                <View style={styles.durationView}>
                  <Text style={styles.HeadingTextstyle}>
                    Duration <Text style={styles.mintext}>(min)</Text>
                  </Text>
                </View>
                <View style={styles.TimepulsView}>
                  <Pressable style={styles.lastBtn}>
                    <TextInput placeholder="00" placeholderTextColor={"#fff"} value={duration} onChangeText={setDuration} keyboardType="numeric" maxLength={3} style={styles.TopselectTexte} />
                  </Pressable>
                </View>
              </View>
              {/* end Duration */}
              {/* start Duration */}
              <View style={styles.absrowview}>
                <View style={styles.durationView}>
                  <Text style={styles.HeadingTextstyle}>No of slots available</Text>
                </View>
                <View style={styles.TimepulsView}>
                  <View style={styles.TimewidthView}>
                    <View style={styles.TimewidthchangeView}>
                      <Pressable onPress={() => setSlots((prevState) => prevState - 1)} style={styles.minusview}>
                        <AntDesign name="minus" color={"#fff"} size={20} />
                      </Pressable>
                    </View>
                    <View style={styles.TimewidthchangeView1}>
                      <Text style={styles.RangeText}>{slots}</Text>
                    </View>
                    <View style={styles.TimewidthchangeView2}>
                      <Pressable onPress={() => setSlots((prevState) => prevState + 1)} style={styles.pulsview}>
                        <AntDesign name="plus" color={"#fff"} size={20} />
                      </Pressable>
                    </View>
                    <View style={{ width: "7%" }} />
                  </View>
                </View>
              </View>
              {/* end Duration */}
              {/*start Select type of Sessions */}
              <View style={styles.selectView}>
                <Text style={styles.selectText}>
                  Select type of Session <Text style={styles.selectTexts}>(select one)</Text>
                </Text>
              </View>
              {type == "online" ? (
                <View>
                  <View style={styles.Textinput}>
                    <TextInput placeholder=" Enter Session title " style={styles.inputEmail} placeholderTextColor={"#fff"} value={sessionTitle} onChangeText={setSessionTitle} />
                  </View>
                  <View style={styles.Textinputa}>
                    <TextInput placeholder=" Enter The Link " style={styles.inputEmail} placeholderTextColor={"#fff"} value={meetingLink} onChangeText={setMeetingLink} />
                  </View>
                </View>
              ) : null}

              <View>
                {type == "physical" ? (
                  <View>
                    <View style={styles.Textinput}>
                      <TextInput placeholder=" Enter Session title " style={styles.inputEmail} placeholderTextColor={"#fff"} value={sessionTitle} onChangeText={setSessionTitle} />
                    </View>
                    <View style={styles.mapBox}>
                      <MapView
                        style={styles.mapStyle}
                        showsUserLocation={false}
                        enableZoomControl={true}
                        showsMyLocationButton={true}
                        zoomEnabled={true}
                        strokeWidth={10}
                        waypoints={5}
                        zoomControlEnabled={true}
                        ref={mapRef}
                        minZoomLevel={2}
                        maxZoomLevel={15}
                        initialCamera={{
                          center: {
                            latitude: parseFloat(superLat),
                            longitude: parseFloat(superLong),
                          },
                          pitch: 90,
                          heading: 0,
                          altitude: 1000,
                          zoom: 12,
                        }}
                        onMapReady={() => {
                          readyHa();
                        }}
                        //onLayout={() => readyHa()}
                        onPress={(e) => {
                          setSuperLat(e.nativeEvent.coordinate.latitude);
                          setSuperLong(e.nativeEvent.coordinate.longitude);
                        }}
                        initialRegion={{
                          latitude: parseFloat(superLat),
                          longitude: parseFloat(superLong),
                          latitudeDelta: 0.922,
                          longitudeDelta: 0.421,
                        }}
                      >
                        <Marker
                          coordinate={{
                            latitude: parseFloat(superLat),
                            longitude: parseFloat(superLong),
                          }}
                          title={"User Location"}
                          description={"Current Location"}
                          identifier={"zuhair"}
                          pinColor={"red"}
                        />
                      </MapView>
                    </View>
                  </View>
                ) : null}
              </View>

              {/* input ends here */}
              <View style={styles.mainBoxView}>
                <View style={styles.boxViews1}>
                  <Pressable
                    style={type == "online" ? styles.boxShadowborder : styles.boxShadowView}
                    onPress={() => {
                      setType("online");
                    }}
                  >
                    <Text style={styles.boxText}>
                      Online
                      {"\n"} Session
                    </Text>
                  </Pressable>
                </View>
                <View style={styles.boxViews2}>
                  <Pressable
                    style={type == "physical" ? styles.boxShadowborder : styles.boxShadowView}
                    onPress={() => {
                      //readyHa();
                      setType("physical");
                    }}
                  >
                    <Text style={styles.boxText}>Physical {"\n"} Session</Text>
                  </Pressable>
                </View>
                <View style={styles.boxViews3}>
                  <Pressable style={type == "recorded" ? styles.boxShadowborder : styles.boxShadowView} onPress={upLoadVideo}>
                    <Text style={styles.boxText}>Recorded {"\n"}Session</Text>
                  </Pressable>
                </View>
              </View>
              {/*End Select type of Sessions */}
              {/*start Select Category */}
              <View style={styles.selectView}>
                <Text style={styles.selectText}>
                  Select Category <Text style={styles.selectTexts}>(Select appropriate)</Text>
                </Text>
              </View>
              <View style={styles.mainBoxView}>
                <View style={styles.boxViews1}>
                  <Pressable
                    style={cardio ? styles.boxShadowborder : styles.boxShadowView}
                    onPress={() => {
                      setCardio(true);
                      setValue("Cardio/Abs");
                      setNoEquipment(false);
                      setLearn(false);
                      setStrength(false);
                      setFat(false);
                      setMental(false);
                    }}
                  >
                    <Text style={styles.boxText}>Cardio/Abs</Text>
                  </Pressable>
                </View>
                <View style={styles.boxViews2}>
                  <Pressable
                    style={noEquipment ? styles.boxShadowborder : styles.boxShadowView}
                    onPress={() => {
                      setCardio(false);
                      setNoEquipment(true);
                      setValue("No Equipment Home Exercise");
                      setLearn(false);
                      setStrength(false);
                      setFat(false);
                      setMental(false);
                    }}
                  >
                    <Text style={styles.boxText}>
                      No{"\n"} Equipment{"\n"}Home{"\n"}Exercise
                    </Text>
                  </Pressable>
                </View>
                <View style={styles.boxViews3}>
                  <Pressable
                    style={learn ? styles.boxShadowborder : styles.boxShadowView}
                    onPress={() => {
                      setCardio(false);
                      setNoEquipment(false);
                      setLearn(true);
                      setValue("Learn Technique");
                      setStrength(false);
                      setFat(false);
                      setMental(false);
                    }}
                  >
                    <Text style={styles.boxText}>Learn {"\n"}Technique</Text>
                  </Pressable>
                </View>
              </View>
              <View style={styles.mainBoxView}>
                <View style={styles.boxViews1}>
                  <Pressable
                    style={strength ? styles.boxShadowborder : styles.boxShadowView}
                    onPress={() => {
                      setCardio(false);
                      setNoEquipment(false);
                      setLearn(false);
                      setStrength(true);
                      setValue("Strength Building Workout");
                      setFat(false);
                      setMental(false);
                    }}
                  >
                    <Text style={styles.boxText}>
                      Strength {"\n"}Building {"\n"}Workout
                    </Text>
                  </Pressable>
                </View>
                <View style={styles.boxViews2}>
                  <Pressable
                    style={fat ? styles.boxShadowborder : styles.boxShadowView}
                    onPress={() => {
                      setCardio(false);
                      setNoEquipment(false);
                      setLearn(false);
                      setStrength(false);
                      setFat(true);
                      setValue("Fat Burning Worlout");
                      setMental(false);
                    }}
                  >
                    <Text style={styles.boxText}>
                      Fat{"\n"}Burning{"\n"}Worlout
                    </Text>
                  </Pressable>
                </View>
                <View style={styles.boxViews3}>
                  <Pressable
                    style={mental ? styles.boxShadowborder : styles.boxShadowView}
                    onPress={() => {
                      setCardio(false);
                      setNoEquipment(false);
                      setLearn(false);
                      setStrength(false);
                      setFat(false);
                      setMental(true);
                      setValue("Mental Health & Nutritiion");
                    }}
                  >
                    <Text style={styles.boxText}>
                      Mental{"\n"}Health & {"\n"}Nutritiion
                    </Text>
                  </Pressable>
                </View>
              </View>
              {/*End Select Category */}
              <View style={{ marginTop: hp(1) }} />
              <Text style={styles.HeadingTextstyle}>Equipment Required</Text>
              {equipment.map((item, i) => (
                <View key={i}>
                  {/*Start Equipment Required */}
                  <View style={styles.textinputtopview}>
                    <View style={styles.bgcolorview}>
                      <TextInput
                        // multiline={true}
                        // numberOfLines={5}
                        // maxLength={500}
                        placeholder="Dumbbell"
                        placeholderTextColor={Colors.gray}
                        value={item.value}
                        onChangeText={(text) => upValue(text, i)}
                        style={{
                          color: Colors.white,
                          height: 50,
                          left: 8,
                          fontFamily: "Poppins-Regular",
                          fontSize: RFValue(14, 580),
                        }}
                      />
                    </View>
                    <View style={{ width: "20%", alignItems: "flex-end" }}>
                      <Pressable style={styles.deleteiconview} onPress={() => delEquipment(item.value)}>
                        <AntDesign
                          name="delete"
                          style={{
                            fontSize: 20,
                            color: "red",
                          }}
                        />
                      </Pressable>
                    </View>
                  </View>
                  {/*End Equipment Required  */}
                </View>
              ))}
              {/*Start add equipment*/}
              <Pressable onPress={addEquipment}>
                <View
                  style={{
                    width: "100%",
                    alignItems: "center",
                    marginTop: 15,
                    flexDirection: "row",
                  }}
                >
                  <View style={{ width: "10%", alignItems: "flex-start" }}>
                    <Ionicons
                      name="add-circle-outline"
                      style={{
                        fontSize: 30,
                        color: Colors.black,
                      }}
                    />
                  </View>
                  <View style={{ width: "80%" }}>
                    <Text
                      style={{
                        color: Colors.black,
                        fontSize: RFValue(14, 580),
                        fontFamily: "Poppins-Regular",
                        lineHeight: 25,
                      }}
                    >
                      Add equipment
                    </Text>
                  </View>
                </View>
              </Pressable>
              {/*end add equipment */}
              {/*Start Add any  Sport  */}
              <View style={{ marginTop: hp(1) }} />
              <Text style={styles.HeadingTextstyle}>Add any Sports</Text>
              <View style={styles.searTextInput}>
                {sport.length === 0 ? <Text style={styles.searchInput}>Add any Sports</Text> : <Text style={styles.searchInput}>{sport}</Text>}
                <View style={styles.UpIcon}>
                  <Entypo onPress={() => setModalVisible(!modalVisible)} name={modalVisible ? "chevron-up" : "chevron-down"} color={"#fff"} size={25} />
                </View>
              </View>
              {modalVisible ? (
                <View style={styles.SportsDropdown}>
                  <View style={{ width: "93%", alignSelf: "center" }}>
                    {Sporst.map((data, i) => (
                      <Text
                        key={i}
                        style={styles.sportsText}
                        onPress={() => {
                          setSport(data.Name);
                          setModalVisible(false);
                        }}
                      >
                        {data.Name}
                      </Text>
                    ))}
                  </View>
                </View>
              ) : null}
              {/*end Add any  Sport  */}

              {/*start Any specific details*/}
              <View style={styles.selectView}>
                <Text style={styles.HeadingTextstyle}>Description</Text>
              </View>
              <View style={styles.InputView}>
                <TextInput
                  multiline={true}
                  numberOfLines={5}
                  maxLength={500}
                  placeholder="Write your decription here....."
                  placeholderTextColor={"#fff"}
                  value={description}
                  onChangeText={setDescription}
                  style={styles.Input}
                />
              </View>
              {/*end Any specific details*/}

              {/*start pricing */}
              <Text style={styles.HeadingTextstyle}>Total Cost</Text>
              <View style={styles.TextInput}>
                <TextInput placeholder=" Please Enter Cost" style={styles.inputEmail} placeholderTextColor={"#fff"} value={price} keyboardType="numeric" maxLength={19} onChangeText={setPrice} />
              </View>
              {/*end pricing */}
              {/*start btn*/}
              <View style={styles.rowView}>
                <View style={styles.mainbtnView}>
                  <Pressable style={styles.ccbtnview}>
                    <Text style={styles.btntextstyle1}>Cancel</Text>
                  </Pressable>
                </View>
                <View style={{ width: "10%" }} />
                <View style={styles.mainbtnView}>
                  <Pressable
                    // onPress={() => navigation.navigate("Trainerpayment")}
                    label={<ActivityIndicator size="small" color="#fff" />}
                    onPress={() => {
                      if (load === true) {
                      } else {
                        bookSession();
                        setClassTitle("");
                        setCloudImageUrl("");
                        setTime("");
                        setDuration();
                        setSlots("");
                        setDescription("");
                        setPrice();
                        setSport("");
                        setSessionTitle("");
                        setMeetingLink("");
                      }
                    }}
                    style={styles.profilebtnview}
                  >
                    {load === true ? <ActivityIndicator size="small" color="#fff" /> : <Text style={styles.btntextstyle}>Next</Text>}
                  </Pressable>
                </View>
              </View>
              {/*end btn*/}
            </View>
          </View>
        </View>
        <View style={{ paddingVertical: 20 }}></View>
      </ScrollView>
      {/*filter option model  Start*/}
      <View style={styles.centerView}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisibleTopSelect}
          onRequestClose={() => {
            setModalVisibleTopSelect(false);
          }}
        >
          <View style={styles.centerView}>
            <View style={styles.modalView}>
              <View
                style={{
                  height: 80,
                  borderWidth: 1,
                  justifyContent: "center",
                  //borderBottomWidth: 0.5,
                  borderColor: "lightgrey",
                  width: "100%",
                  alignItems: "center",
                }}
              >
                <Text style={styles.addText}>Choose Template to Duplicate</Text>
              </View>
              <ScrollView showsVerticalScrollIndicator={false}>
                {/*start Totale */}
                {data.map((item, i) => (
                  <View style={styles.TopView} key={i}>
                    <View style={styles.marchmainview}>
                      <View style={styles.marchmainview2}>
                        <View style={{ width: "25%", alignItems: "center" }}>
                          <Text style={styles.marchtext}>
                            {moment(item?.select_date).format("DD ")}
                            {moment(item?.select_date).format("MMMM")}
                          </Text>
                          <Text style={styles.Daytext}>({moment(item?.select_date).format("dddd")})</Text>
                        </View>
                        <View
                          style={{
                            width: "5%",
                            alignItems: "center",
                          }}
                        >
                          <View
                            style={{
                              width: 2,
                              height: 50,
                              backgroundColor: "#fff",
                            }}
                          ></View>
                        </View>
                        <View style={{ width: "35%", flexDirection: "column" }}>
                          <Text style={styles.marchtext}>
                            {item?.class_title} {"\n"}
                            <Text
                              style={{
                                color: "#fff",
                                fontSize: RFValue(10, 580),
                                fontFamily: "Poppins-Regular",
                              }}
                            >
                              {item?.class_time}
                            </Text>
                          </Text>
                        </View>
                        <Pressable
                          onPress={() => detailsInfoCall(item, i)}
                          //onPress={() => setDetails(!details)}
                          style={{
                            width: "30%",
                            backgroundColor: "#414143",
                            alignItems: "center",
                            borderRadius: 12,
                            height: 50,
                            justifyContent: "center",
                          }}
                        >
                          <View
                            style={{
                              width: "100%",
                              alignItems: "center",
                              flexDirection: "row",
                            }}
                          >
                            <View style={{ width: "80%", justifyContent: "center" }}>
                              <Text
                                style={{
                                  color: "#fff",
                                  fontSize: RFValue(14, 580),
                                  fontFamily: "Poppins-Regular",
                                  textAlign: "center",
                                }}
                              >
                                Details
                              </Text>
                            </View>
                            <Entypo name={item.status ? "chevron-up" : "chevron-down"} size={18} color={"#fff"} />
                          </View>
                        </Pressable>
                      </View>
                      {/*end Yoga */}
                      {item.status && (
                        <View style={{ width: "100%", paddingBottom: 18 }}>
                          <View style={styles.dotmainview}>
                            <View style={styles.dotview}>
                              <FontAwesome name="circle" style={{ color: "#979797" }} />
                            </View>
                            <View style={{ width: "90%" }}>
                              <Text style={styles.textstyle}>
                                Type:{"\n"} {item?.session_type?.type} session
                              </Text>
                            </View>
                          </View>
                          <View style={styles.dotmainview}>
                            <View style={styles.dotview}>
                              <FontAwesome name="circle" style={{ color: "#979797" }} />
                            </View>
                            <View style={{ width: "90%" }}>
                              <Text style={styles.textstyle}>
                                Cost: {"\n"}$ {item?.price}
                              </Text>
                            </View>
                          </View>
                          <View style={styles.dotmainview}>
                            <View style={styles.dotview}>
                              <FontAwesome name="circle" style={{ color: "#979797" }} />
                            </View>
                            <View style={{ width: "90%" }}>
                              <Text style={styles.textstyle}>
                                Available slots:: {"\n"} {item?.no_of_slots}
                              </Text>
                            </View>
                          </View>
                          <View style={styles.dotmainview}>
                            <View style={styles.dotview}>
                              <FontAwesome name="circle" style={{ color: "#979797" }} />
                            </View>
                            <View style={{ width: "90%" }}>
                              <Text style={styles.textstyle}>{item?.details}</Text>
                            </View>
                          </View>
                          <View style={styles.bookNow}>
                            <Pressable onPress={() => UseTemplate(item)} style={styles.profilebtnview}>
                              <Text style={styles.btntextstyle}>Use Template</Text>
                            </Pressable>
                          </View>
                        </View>
                      )}
                    </View>
                  </View>
                ))}
                {/*end total */}
              </ScrollView>
            </View>
          </View>
        </Modal>
      </View>
      {/*end modal*/}

      {/*modalVisibleDate Start*/}
      <View style={styles.centeredView}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisibleDate}
          onRequestClose={() => {
            setModalVisibleDate(false);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalViewdate}>
              <ScrollView showsVerticalScrollIndicator={false}>
                <View
                  style={{
                    width: "100%",
                    alignItems: "flex-start",
                  }}
                >
                  <View style={styles.TopView}>
                    <View style={styles.topView}>
                      <View style={styles.cancelView}>
                        <Pressable style={styles.canceldoneView}></Pressable>
                        <View style={styles.DOBView}>
                          <Text style={styles.TextDOB}>Time</Text>
                        </View>
                        <Pressable
                          onPress={() => {
                            setModalVisibleDate(false);
                          }}
                          style={styles.canceldoneView}
                        >
                          <Text style={styles.TextCancelDone}>Cancel</Text>
                        </Pressable>
                      </View>
                    </View>
                  </View>
                  <View style={styles.TopView}>
                    <View style={styles.topView}>
                      <DatePicker
                        options={{
                          backgroundColor: "#090C08",
                          textDefaultColor: "#F6E7C1",
                          selectedTextColor: "#fff",
                          mainColor: "red",
                          textSecondaryColor: "#D6C7A1",
                        }}
                        mode="time"
                        minuteInterval={3}
                        onTimeChange={(selectedTime: React.SetStateAction<string>) => setTime(selectedTime)}
                      />
                    </View>
                  </View>
                </View>
              </ScrollView>
            </View>
          </View>
        </Modal>
      </View>
      {/* modalVisibleDate End*/}
    </View>
  );
};
export default BookSession;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingTop: Platform.OS === "ios" ? 40 : 0,
    paddingBottom: Platform.OS === "ios" ? 0 : 0,
  },
  main: {
    width: "100%",
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
    // alignItems: 'center',
  },
  footer: {
    width: "100%",
    marginBottom: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    backgroundColor: "#fff",
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
  bookTextstyle: {
    fontSize: RFValue(20, 580),
    fontFamily: "Poppins-Bold",
    color: "#000",
    fontWeight: "700",
  },
  HeadingTextstyle: {
    fontSize: RFValue(16, 580),
    fontFamily: "Poppins-Bold",
    color: "#000",
    fontWeight: "700",
  },
  borderView: {
    width: "100%",
    borderWidth: 1,
    bordercolor: "#000",
  },
  absrowview: {
    width: "100%",
    flexDirection: "row",
    marginTop: 20,
  },
  absrowView: {
    width: "90%",
    marginTop: 20,
    alignSelf: "center",
  },
  abstextview: {
    width: "70%",
  },
  reddotview: {
    width: "30%",
    alignItems: "flex-end",
  },
  dotview: {
    width: 10,
    height: 10,
    backgroundColor: "#ff0000",
    borderWidth: 1,
  },
  alreadyTextstyle: {
    fontSize: RFValue(12, 580),
    fontFamily: "Poppins-Regular",
    color: "#ABABB5",
    fontWeight: "500",
  },
  classtimeview: {
    width: "50%",
  },
  classtimeeview: {
    width: "75%",
  },
  timeview: {
    width: "50%",
    alignItems: "flex-end",
  },
  classtextstyles: {
    fontSize: Platform.OS === "ios" ? RFValue(11, 580) : RFValue(12, 580),
    fontFamily: "Poppins-Bold",
    color: "#000",
  },
  timetextstyle: {
    fontSize: RFValue(12, 580),
    fontFamily: "Poppins-Regular",
    fontWeight: "500",
    color: "white",
    textAlign: "center",
  },
  durationView: {
    width: "70%",
  },
  TimepulsView: {
    width: "30%",
    alignItems: "flex-end",
  },
  TimewidthView: {
    width: "100%",
    flexDirection: "row",
  },
  mintext: {
    fontSize: RFValue(9, 580),
    fontFamily: "Poppins-Regular",
  },
  pulsview: {
    width: 26,
    height: 26,
    backgroundColor: "#ff0000",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-start",
    borderRadius: 4,
    marginLeft: wp(1),
  },
  minusview: {
    width: 26,
    height: 26,
    backgroundColor: "#414143",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    alignSelf: "flex-end",
    marginRight: wp(1),
  },
  TimewidthchangeView: {
    width: "48%",
    alignItems: "flex-end",
  },
  TimewidthchangeView1: {
    width: "20%",
    alignItems: "center",
  },
  TimewidthchangeView2: {
    width: "25%",
  },
  mainBoxView: {
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 20,
  },
  boxViews: {
    width: "33%",
    justifyContent: "center",
    marginHorizontal: wp(1),
  },
  boxShadowView: {
    width: 101,
    height: 101,
    backgroundColor: "#000000",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: hp(1),
    paddingHorizontal: wp(1),
  },
  boxShadowborder: {
    width: 101,
    height: 101,
    backgroundColor: "#000000",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#ff0000",
  },
  selectView: {
    width: "100%",
    marginTop: 10,
  },
  selectText: {
    fontFamily: "Poppins-Bold",
    fontSize: RFValue(14, 580),
    color: "#000",
    fontWeight: "500",
  },
  selectTexts: {
    fontFamily: "Poppins-Regular",
    fontSize: RFValue(9, 580),
    fontWeight: "500",
  },
  boxText: {
    color: "#fff",
    fontSize: RFValue(9, 580),
    fontFamily: "Poppins-Bold",
    textAlign: "center",
    lineHeight: 21,
    letterSpacing: 2,
  },
  rowWidthView: {
    flexDirection: "row",
    width: "100%",
    marginTop: 10,
  },
  pricingText: {
    fontSize: RFValue(17, 580),
    fontFamily: "Poppins-SemiBold",
    color: "#000",
    fontWeight: "700",
  },
  rowView: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  mainbtnView: {
    width: "45%",
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
    fontSize: RFValue(14, 580),
    fontFamily: "Poppins-Regular",
  },
  btntextstyle1: {
    color: "#ff0000",
    fontSize: RFValue(12, 580),
    fontFamily: "Poppins-Regular",
  },
  RangeText: {
    color: "black",
    fontSize: Platform.OS === "ios" ? RFValue(10, 580) : RFValue(12, 580),
    fontFamily: "Poppins-Regular",
    fontWeight: "700",
    top: 3,
  },
  InputView: {
    width: "100%",
    backgroundColor: "#414143",
    borderRadius: 8,
    flexDirection: "column",
    height: 130,
    marginVertical: hp(1),
  },
  Input: {
    height: 200,
    textAlignVertical: "top",
    fontFamily: "Poppins-Regular",
    color: "#fff",
    fontSize: RFValue(12, 580),
    left: 10,
  },
  ClassTitle: {
    width: "100%",
    marginTop: 15,
  },
  inputEmail: {
    borderRadius: 10,
    width: "100%",
    paddingLeft: 10,
    fontSize: RFValue(15, 580),
    color: Colors.white,
  },
  TextInput: {
    width: "70%",
    backgroundColor: Colors.black,
    borderRadius: 9,
    marginTop: 10,
    height: 50,
    justifyContent: "center",
    marginBottom: -10,
  },
  Textinput: {
    width: "100%",
    backgroundColor: Colors.black,
    borderRadius: 9,
    marginTop: 10,
    height: 50,
    justifyContent: "center",
  },
  Textinputa: {
    width: "100%",
    backgroundColor: Colors.black,
    borderRadius: 9,
    marginTop: 10,
    height: 50,
    justifyContent: "center",
  },
  Textinpute: {
    width: "100%",
    backgroundColor: Colors.black,
    borderRadius: 9,
    marginTop: 10,
    height: 50,
    justifyContent: "center",
  },
  classtext: {
    fontSize: Platform.OS === "ios" ? RFValue(13, 580) : RFValue(14, 580),
    color: Colors.black,
    fontFamily: "Poppins-Bold",
  },
  selectBtn: {
    width: 125,
    height: 48,
    backgroundColor: "#414143",
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  TopselectText: {
    fontSize: Platform.OS === "ios" ? RFValue(11, 580) : RFValue(15, 580),
    color: Colors.white,
    fontFamily: "poppins-Regular",
  },
  TopselectTexte: {
    fontSize: Platform.OS === "ios" ? RFValue(10, 580) : RFValue(15, 580),
    color: Colors.white,
    paddingBottom: -1,
    paddingTop: -1,
    alignSelf: "center",
    justifyContent: "center",
    height: 25,
  },
  lastBtn: {
    width: "85%",
    alignItems: "center",
    borderWidth: 1,
    backgroundColor: "#414143",
    borderRadius: 10,
    justifyContent: "center",
    height: 35,
  },

  timeeview: {
    width: "25%",
    alignItems: "center",
    borderWidth: 1,
    backgroundColor: "#414143",
    borderRadius: 10,
    justifyContent: "center",
    height: 35,
  },
  boxViews1: {
    width: "33%",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  boxViews2: {
    width: "34%",
    justifyContent: "center",
    alignItems: "center",
  },
  boxViews3: {
    width: "33%",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  nonee: { marginBottom: hp(-12) },
  textinputtopview: {
    width: "100%",
    flexDirection: "row",
    marginTop: 10,
  },
  bgcolorview: {
    width: "80%",
    backgroundColor: Colors.black,
    borderRadius: 8,
    justifyContent: "center",
  },
  deleteiconview: {
    width: 50,
    height: 50,
    backgroundColor: "#C4C4C4",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  EQRText: {
    fontSize: RFValue(20, 580),
    color: Colors.black,
    fontFamily: "poppins-Regular",
    marginTop: 10,
  },
  searTextInput: {
    width: "80%",
    alignItems: "center",
    backgroundColor: "#000",
    flexDirection: "row",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginTop: 10,
    justifyContent: "center",
    height: 50,
  },
  SportsDropdown: {
    width: "80%",
    backgroundColor: "#000",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent: "center",
    paddingBottom: hp(1),
  },

  UpIcon: {
    width: "20%",
    justifyContent: "center",
    alignItems: "center",
  },
  searInput: {
    borderRadius: 10,
    width: "80%",
    paddingLeft: 10,
    fontSize: RFValue(15, 580),
    color: Colors.white,
  },
  searchInput: {
    borderRadius: 10,
    width: "80%",
    paddingLeft: 10,
    fontSize: RFValue(15, 580),
    color: Colors.white,
    margintop: hp(-1),
  },
  sportsText: {
    // borderRadius: 10,
    // paddingHorizontal: wp(2),
    fontSize: RFValue(15, 580),
    color: Colors.white,
    borderBottomWidth: 1,
    borderColor: "white",
  },
  fixeheight: {
    height: 50,
    justifyContent: "center",
    borderBottomWidth: 0.5,
    borderColor: "lightgrey",
    width: "100%",
    alignItems: "center",
  },

  dotmainview: {
    width: "100%",
    flexDirection: "row",
  },
  dotview: {
    width: "10%",
    alignItems: "center",
  },
  marchmainview: {
    width: "90%",
    backgroundColor: "#000",
    justifyContent: "center",
    borderRadius: 12,
    margin: 10,
  },
  marchmainview2: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingVertical: 9,
  },
  marchtext: {
    color: "#fff",
    fontSize: RFValue(12, 580),
    fontFamily: "Poppins-SemiBold",
  },
  Daytext: {
    color: "#fff",
    fontSize: RFValue(8, 580),
    fontFamily: "Poppins-Regular",
  },
  btntextstyle: {
    color: "#fff",
    fontSize: RFValue(10, 580),
    fontFamily: "Poppins-Regular",
  },
  upcomingtextstyle: {
    fontSize: RFValue(17, 580),
    fontFamily: "Poppins-SemiBold",
    color: "#000",
  },
  centeredView: {
    flex: 1,
    alignItems: "center",
    width: "95%",
    alignSelf: "center",
    justifyContent: "flex-end",
  },
  centerView: {
    flex: 1,
    width: "100%",
    borderWidth: 1,
    alignItems: "center",
  },
  modalView: {
    width: "100%",
    height: "100%",
    backgroundColor: Colors.white,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 6.84,
    elevation: 5,
  },
  addText: {
    textAlign: "center",
    fontSize: RFValue(15, 580),
    fontFamily: "Poppins-Bold",
    color: "#000",
  },
  textstyle: {
    color: "#ffffff",
    fontSize: RFValue(12, 580),
    fontFamily: "Poppins-Regular",
  },
  bookNow: { width: "100%", alignItems: "center" },
  mapStyle: {
    width: "100%",
    alignItems: "center",
    height: "100%",
  },
  mapBox: {
    width: "100%",
    height: 200,
    backgroundColor: Colors.black,
    marginTop: 13,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  ImageBox: {
    width: "100%",
    height: 200,
    backgroundColor: Colors.black,
    marginTop: 13,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  uploadtext: {
    textAlign: "center",
    fontSize: RFValue(20, 580),
    fontFamily: "poppins-SemiBold",
    color: "#fff",
  },
  MapImage: {
    width: "100%",
    resizeMode: "contain",
  },
  // modal

  modalViewdate: {
    margin: 0,
    width: "95%",
    height: "50%",
    backgroundColor: Colors.white,
    borderRadius: 7,
    padding: 0,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 6.84,
    elevation: 5,
  },
  TextCancelDone: {
    fontFamily: "poppins-Regular",
    color: Colors.black,
    fontSize: RFValue(12, 580),
  },
  centeredViewCountry: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    opacity: 1,
  },
  modalViewCountry: {
    margin: 0,
    width: "95%",
    height: "60%",
    margin: 5,
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 0,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 6.84,
    elevation: 5,
  },
  cancelView: {
    width: "100%",
    flexDirection: "row",
    marginTop: 10,
  },
  DOBView: {
    width: "60%",
    alignItems: "center",
    justifyContent: "center",
  },
  btnmainView: {
    width: "100%",
    alignItems: "center",
    marginTop: 30,
  },
  nextText: {
    color: Colors.white,
    fontSize: RFValue(16, 580),
    fontFamily: "poppins-regular",
  },
  DateText: {
    fontSize: RFValue(12, 580),
    fontFamily: "Poppins-Regular",
    color: Colors.white,
    textAlign: "left",
    left: 10,
  },
  root: { flex: 1, padding: 20 },
  title: { textAlign: "center", fontSize: 30 },
  codeFieldRoot: { marginTop: 28 },
  cell: {
    width: 45,
    height: 35,
    lineHeight: 38,
    fontSize: 24,
    margin: 10,
    borderBottomWidth: 1,
    borderColor: Colors.black,
    textAlign: "center",
  },
  focusCell: {
    borderColor: Colors.black,
  },
  TextDOB: {
    fontSize: RFValue(18, 580),
    fontFamily: "Poppins-SemiBold",
    color: Colors.black,
  },
  TextCancelDone: {
    fontFamily: "poppins-Regular",
    color: Colors.black,
    fontSize: RFValue(12, 580),
  },
  PersonalinfoView: {
    width: "90%",
    flexDirection: "row",
  },
  PersonalinfoText: {
    fontSize: RFValue(23, 580),
    fontFamily: "Poppins-Bold",
    color: Colors.black,
  },
  filldetailsText: {
    fontSize: RFValue(16, 580),
    fontFamily: "poppins-regular",
    color: Colors.gray,
  },
  imageView: {
    width: "40%",
    alignItems: "flex-end",
    justifyContent: "center",
  },
  imagestyle: {
    width: "100%",
    height: 200,
    borderRadius: 5,
  },
  inputTopView: {
    width: "100%",
    alignItems: "center",
    marginTop: 30,
  },
  inputtopviews: {
    width: "90%",
    height: 60,
    backgroundColor: Colors.black,
    borderRadius: 8,
  },
  inputnameView: {
    width: "100%",
    marginTop: 3,
    paddingLeft: 10,
    borderRadius: 8,
  },
  inputnameText: {
    color: Colors.white,
    fontSize: RFValue(9, 580),
    fontFamily: "poppins-regular",
  },
  textinputView: {
    width: "100%",
    borderColor: Colors.white,
    flexDirection: "row",
  },
  genderTopview: {
    width: "90%",
    backgroundColor: Colors.black,
    borderRadius: 10,
    height: 60,
    flexDirection: "row",
  },
  genderText: {
    fontSize: RFValue(13, 580),
    fontFamily: "poppins-regular",
    color: Colors.white,
    left: 10,
  },
  iconView: {
    width: "10%",
    borderColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  Gendertexts: {
    color: Colors.black,
    fontSize: RFValue(16, 580),
    fontFamily: "Poppins-ExtraBold",
  },
  genderonetext: {
    fontSize: RFValue(10, 520),
    color: "#414143",
    fontFamily: "poppins-regular",
  },
  maletext: {
    color: Colors.white,
    fontWeight: "bold",
    fontSize: RFValue(9, 580),
    fontFamily: "poppins-regular",
  },
  oternameview: {
    padding: 15,
    borderRadius: 14,
    width: "80%",
    backgroundColor: Colors.black,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
  oternameviewBorder: {
    padding: 15,
    borderRadius: 14,
    width: "80%",
    backgroundColor: Colors.black,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    borderWidth: 2,
    borderColor: "#ff0000",
  },
  otherText: {
    color: Colors.white,
    fontSize: RFValue(16, 580),
    fontFamily: "poppins-regular",
  },
  otherView: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  canceldoneView: {
    width: "20%",
    alignItems: "center",
    justifyContent: "center",
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
    marginBottom: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
  },
});
