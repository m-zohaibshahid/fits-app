/* eslint-disable prettier/prettier */
import React, { useState, useEffect, useRef, LegacyRef } from "react";
import { Text, View, Pressable, StyleSheet, TextInput, ScrollView, ToastAndroid, Platform, Modal, TouchableOpacity, Image } from "react-native";
import {default as CustomInput} from '../../../Components/Input'
import ImagePicker from "react-native-image-crop-picker";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { RFValue } from "react-native-responsive-fontsize";
import { Calendar } from "react-native-calendars";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import Colors from "../../../constants/Colors";
import moment from "moment";
import { useRoute } from "@react-navigation/native";
import { errorToast } from "../../../utils/toast";
import { useSessionCreateMutation } from "../../../slice/FitsApi.slice";
import Button from "../../../Components/Button";
import Container from "../../../Components/Container";
import Header from "../../../Components/Header";
import Typography from "../../../Components/typography/text";
import MapView, { LatLng, Marker } from "react-native-maps";
import { useSelector } from "react-redux";
import { LocationState } from "../../../slice/location.slice";

enum SessionType {
  ONLINE = "online",
  PHYSICAL = "physical",
  RECORDED = "recorded",
}

const BookSession = ({ navigation }: any) => {
  const route = useRoute();
  const mapRef = useRef<MapView | null>(null);
  const [superLong, setSuperLong] = useState<number>();
  const locationState = useSelector((state: {location: LocationState}) => state.location);
  const [superLat, setSuperLat] = useState<number>();
  const [currentDate, setCurrentDate] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleTopSelect, setModalVisibleTopSelect] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [type, setType] = useState<SessionType>();
  const [value, setValue] = useState("");
  const [cardio, setCardio] = useState(false);
  const [noEquipment, setNoEquipment] = useState(false);
  const [learn, setLearn] = useState(false);
  const [classTitle, setClassTitle] = useState("");
  const [sessionTitle, setSessionTitle] = useState("");
  const [sport, setSport] = useState("");
  const [equipment, setEquipment] = useState([]);
  const [image, setImage] = useState("");
  const [meetingLink, setMeetingLink] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("00:00 PM");
  const [duration, setDuration] = useState<string>("");
  const [slots, setSlots] = useState(0);
  const [price, setPrice] = useState<string>("");
  const [cloudImageUrl, setCloudImageUrl] = useState("");
  const [data, setData] = useState([]);
  const [mutateAsyncSessionCreate] = useSessionCreateMutation()


  useEffect(() => {
    navigation.addListener("focus", () => {
        setSuperLat(locationState.latitude);
        setSuperLong(locationState.longitude);
    });
  }, [route.params]);

  const NextScreen = async () => {
    navigation.navigate("Home");
  };

  const upLoadVideo = () => {
      navigation.navigate("CreateRecorderClass");
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (time) => {
    setTime(time);
    hideDatePicker();
  };

  const callBookSession = async () => {
    if (classTitle !== '' || equipment.length || sport !== '' || currentDate !== '' || description !== '' || image !== '' || time !== '' || duration !== '' || value !== '' || slots || price !== '') {
      let session_type;
      if (type === SessionType.ONLINE) {
        if (!sessionTitle || !meetingLink) {
          errorToast("Missing something in Online Session")
          return
        }
        session_type = {
          type: type,
          meetingLink: meetingLink,
          recordCategory: "na",
          no_of_play: "na",
          videoTitle: "na",
          session_title: sessionTitle,
        }
      } else if (type === SessionType.PHYSICAL) {
        if (!superLat || !superLong) {
          errorToast("Missing something in Physical Session")
          return
        }
        session_type = {
          type: type,
          lat: superLat,
          lng: superLong,
          meetingLink: meetingLink,
          recordCategory: "na",
          no_of_play: "na",
          videoTitle: "we",
        };
      }
      const body = {
        select_date: currentDate,
        class_title: classTitle,
        class_time: time,
        duration: duration,
        no_of_slots: slots,
        equipment: equipment,
        sports: sport,
        price: price,
        details: description,
        image: cloudImageUrl,
        session_type: session_type,
        session_title: sessionTitle,
      }

      const result = await mutateAsyncSessionCreate(body)
        if (result?.error) errorToast(result.error?.data?.message)
        if (result?.data) NextScreen();
    }
  };

  const upValue = (value, index) => {
    let oldEquipment = [...equipment];
    oldEquipment[index].value = value;
    setEquipment(oldEquipment);
  };

  const delEquipment = (value) => {
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

  const UseTemplate = (item) => {
    if (item?.session_type?.type === SessionType.RECORDED) {
      Recorded(item);
      setModalVisibleTopSelect(false);
    } else if (item?.session_type?.type === SessionType.PHYSICAL) {
      Physical(item);
      setModalVisibleTopSelect(false);
    } else if (item?.session_type?.type === SessionType.ONLINE) {
      Online(item);
      setModalVisibleTopSelect(false);
    }
  };

  const Physical = (item) => {
    setClassTitle(item?.class_title);
    setDuration(item?.duration);
    setDescription(item?.details);
    setPrice(item?.price);
    setSessionTitle(item?.session_title);
    setTime(item?.class_time);
    setSlots(item?.no_of_slots);
    setSport(item?.sports);
  };

  const Online = (item) => {
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

  const Recorded = (item) => {
    setClassTitle(item?.class_title);
    setDuration(item?.duration);
  };

  const choosePhotoFromCamera = () => {
    ImagePicker.openPicker({
      width: 500,
      height: 800,
      cropping: true,
      compressImageQuality: 0.4,
    }).then((file) => {
        let newFile = {
          uri: file.path,
          type: "image/png",
          name: `image.png`,
        };
        uploadImageOnCloud(newFile);
        setImage(file.path);
      })
      .catch(() => {
      });
  };

  const uploadImageOnCloud = async (image: any) => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "employeeApp");
    formData.append("cloud_name", "ZACodders");

    await fetch("https://api.cloudinary.com/v1_1/ZACodders/image/upload", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((res2) => {
        setCloudImageUrl(res2?.url);
      })
      .catch(() => {
      });
  };

  const detailsInfoCall = (index: number) => {
    let dummy = [...data];
    if (dummy[index].status == true) {
      dummy.forEach((item) => (item.status = false));
    } else {
      dummy.forEach((item) => (item.status = false));
      dummy[index].status = true;
    }
    setData(dummy);
  };

  const handleOnMapReady = () => {
    if (mapRef.current && superLat !== undefined && superLong !== undefined) {
      const zuhairLatLng: LatLng = {
        latitude:superLat,
        longitude: superLong,
      };
  
      mapRef.current.fitToCoordinates([zuhairLatLng], {
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
        animated: true,
      });
    }
  };

  return (
    <Container>
      <Header label={"Create a Session"} subLabel="Fill in some Details" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.mainBody}>
          <View style={styles.calendarView}>
            <Calendar
              markingType={"custom"}
              onDayPress={(day) => {
                setCurrentDate(day?.dateString);
              }}
              firstDay={1}
              markedDates={{
                [currentDate]: { selected: true, selectedColor: "red" },
              }}
            />
          </View>
              <CustomInput placeholder="Enter Class Title" style={styles.inputTypeStyle} placeholderTextColor={Colors.white} value={classTitle} onChangeText={setClassTitle} label={"Class Title"} />
          {image === "" ? (
            <Pressable
              style={styles.imageBox}
              onPress={choosePhotoFromCamera}
            >
              <Ionicons name="cloud-upload-outline" size={wp(9)} color={Colors.white} />
              <Text style={styles.uploadTitleText}>Upload Image</Text>
            </Pressable>
          ) : (
            <View style={{ width: "100%", marginTop: 12 }}>
              <Image
                style={styles.imagestyle}
                resizeMode="cover"
                source={{
                  uri: image,
                }}
              />
            </View>
          )}

            <Text style={styles.selectText}>
              Select type of Session <Text style={styles.selectTexts}>(select one)</Text>
            </Text>
          
          {type === SessionType.ONLINE ? (
            <View>
              <CustomInput
                placeholder=" Enter Session title "
                style={styles.inputEmail}
                placeholderTextColor={"#fff"}
                value={sessionTitle}
                onChangeText={setSessionTitle} label={"Title"}
              />
              <CustomInput
                placeholder=" Enter The Link "
                style={styles.inputEmail}
                placeholderTextColor={"#fff"}
                value={meetingLink}
                onChangeText={setMeetingLink} label={"Link"}
              />
            </View>
          ) :  type == SessionType.PHYSICAL ? (
                  <View>
                    <CustomInput
                  label="Session title"
                  style={styles.inputEmail}
                  placeholderTextColor={"#fff"}
                  value={sessionTitle}
                  onChangeText={setSessionTitle} placeholder={"Enter Session title"}                      />
                    <View style={styles.mapBox}>
                      <MapView
                        style={styles.mapStyle}
                        showsUserLocation={false}
                        showsMyLocationButton={true}
                        zoomEnabled={true}
                        zoomControlEnabled={true}
                        ref={mapRef}
                        minZoomLevel={2}
                        maxZoomLevel={15}
                        initialCamera={{
                          center: {
                            latitude: superLat || 0,
                            longitude: superLong || 0,
                          },
                          pitch: 90,
                          heading: 0,
                          altitude: 1000,
                          zoom: 12,
                        }}
                        onMapReady={handleOnMapReady}
                        onPress={(e) => {
                          setSuperLat(e.nativeEvent.coordinate.latitude);
                          setSuperLong(e.nativeEvent.coordinate.longitude);
                        }}
                        initialRegion={{
                          latitude: superLat || 0,
                          longitude: superLong  || 0,
                          latitudeDelta: 0.922,
                          longitudeDelta: 0.421,
                        }}
                      >
                        <Marker
                          coordinate={{
                            latitude: superLat || 0,
                            longitude: superLong  || 0,
                          }}
                          title={"User Location"}
                          description={"Current Location"}
                          identifier={"Zeshan"}
                          pinColor={"red"}
                        />
                      </MapView>
                    </View>
                  </View>
          ) : null}
          <View style={styles.mainBoxView}>
            <View style={styles.boxViews1}>
              <Pressable
                style={type == SessionType.ONLINE ? styles.boxShadowborder : styles.boxShadowView}
                onPress={() => {
                  setType(SessionType.ONLINE);
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
                style={type === SessionType.PHYSICAL ? styles.boxShadowborder : styles.boxShadowView}
                onPress={() => {
                  setType(SessionType.PHYSICAL);
                }}
              >
                <Text style={styles.boxText}>Physical {"\n"} Session</Text>
              </Pressable>
            </View>
            <View style={styles.boxViews3}>
              <Pressable style={type == SessionType.RECORDED ? styles.boxShadowborder : styles.boxShadowView} onPress={upLoadVideo}>
                <Text style={styles.boxText}>Recorded {"\n"}Session</Text>
              </Pressable>
            </View>
          </View>

          <View style={styles.mainRectViewRow}>
            <View style={styles.titleLeftColRect}>
              <Text style={styles.classTitleText}>Your previous class templates</Text>
            </View>
            <View style={styles.titleRightColRect}>
              <TouchableOpacity activeOpacity={0.8} onPress={() => setModalVisibleTopSelect(true)} style={styles.selectBtnRect}>
                <Text style={styles.tapSelectTitle}>Tap to Select</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.mainRectViewRow}>
            <View style={styles.titleLeftColRect}>
              <Text style={styles.HeadingTextstyle}>Class time</Text>
            </View>
            <View style={styles.titleRightColRect}>
              <TouchableOpacity activeOpacity={0.8} onPress={showDatePicker} style={styles.selectTimeRow}>
                <View
                  style={{
                    width: "70%",
                    paddingLeft: 20,
                    paddingTop: 3,
                    justifyContent: "center",
                  }}
                >
                  <Text style={styles.tapSelectTitle}>{time === "00:00 PM" ? "00:00 PM" : moment(time).format("LT")}</Text>
                </View>
                <View
                  style={{
                    width: "30%",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Ionicons name="timer" size={wp(6)} color={Colors.white} />
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.mainRectViewRow}>
            <View style={styles.titleLeftColRect}>
              <Text style={styles.HeadingTextstyle}>
                Duration <Text style={styles.mintext}>(min)</Text>
              </Text>
            </View>
            <View style={styles.titleRightColRect}>
              <Pressable style={styles.lastBtn}>
                <TextInput onChangeText={setDuration} placeholder="00" placeholderTextColor={Colors.white} value={duration} keyboardType="numeric" maxLength={3} style={styles.TopselectTexte} />
              </Pressable>
            </View>
          </View>

          <View style={styles.mainRectViewRow}>
            <View style={styles.durationView}>
              <Text style={styles.HeadingTextstyle}>No of slots available</Text>
            </View>
            <View style={styles.TimepulsView}>
              <View style={styles.TimewidthView}>
                <View style={styles.TimewidthchangeView}>
                  <TouchableOpacity activeOpacity={0.8} disabled={!slots} onPress={() => setSlots((e) => e - 1)} style={styles.minusview}>
                    <AntDesign name="minus" color={"#fff"} size={20} />
                  </TouchableOpacity>
                </View>
                <View style={styles.TimewidthchangeView1}>
                  <Text style={styles.RangeText}>{slots}</Text>
                </View>
                <View style={styles.TimewidthchangeView2}>
                  <TouchableOpacity activeOpacity={0.8} disabled={slots >= 100} onPress={() => setSlots((prevState) => prevState + 1)} style={styles.pulsview}>
                    <AntDesign name="plus" color={"#fff"} size={20} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.mainRectViewRow}>
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
                }}
              >
                <Text style={styles.boxText}>Learn {"\n"}Technique</Text>
              </Pressable>
            </View>
          </View>
            <Typography size='heading3' weight="600" style={{marginTop: 10}}>Equipment Required</Typography>

          {equipment.map((item, i) => (
            <View style={{ width: "100%", alignSelf: "center" }} key={i}>
              <View style={styles.textinputtopview}>
                <View style={styles.bgcolorview}>
                  <TextInput
                    placeholder="Dumbbell"
                    placeholderTextColor={Colors.white}
                    value={item}
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
          ))}

          <Pressable onPress={addEquipment}>
            <View
              style={{
                width: "100%",
                alignItems: "center",
                marginTop: 5,
                marginBottom: 15,
                alignSelf: "center",
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
            <Text style={styles.HeadingTextstyle}>Add any Sports</Text>
            <View style={styles.searTextInput}>
              {sport.length === 0 ? <Text style={styles.searchInput}>Add any Sports</Text> : <Text style={styles.searchInput}>{sport}</Text>}
              <View style={styles.UpIcon}>
                <Entypo onPress={() => setModalVisible(!modalVisible)} name={modalVisible ? "chevron-up" : "chevron-down"} color={"#fff"} size={25} />
              </View>
            </View>

          {modalVisible ? (
            <View style={styles.SportsDropdown}>
                {preDefineSports.map((item, i) => (
                  <Text
                    key={i}
                    style={styles.sportsText}
                    onPress={() => {
                      setSport(item);
                      setModalVisible(false);
                    }}
                  >
                    {item}
                  </Text>
                ))}
            </View>
          ) : null}

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
          <View style={styles.selectView}>
            <Text style={styles.HeadingTextstyle}>Total Cost</Text>
          </View>

          <View style={styles.TextInput}>
            <Text style={styles.dolarText}>$</Text>
            <TextInput style={styles.inputEmail} placeholderTextColor={"#fff"} value={price} keyboardType="numeric" maxLength={19} onChangeText={setPrice}/>
          </View>
        </View>
        <View style={{ marginVertical: "20%" }}></View>
      </ScrollView>
      {/*start btn*/}
      <Button style={{
          marginVertical: 20
        }} onPress={callBookSession} disabled={!sport || !currentDate || !description || !image || !time || !value || !slots || !duration || !price} label={"Create"} />
      {/*end btn*/}
      <DateTimePickerModal isVisible={isDatePickerVisible} mode="time" onConfirm={handleConfirm} onCancel={hideDatePicker} />
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
                {data.map((item: any, i) => (
                  <View style={styles.TopView}>
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
                          onPress={() => detailsInfoCall(i)}
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
                            <View style={{ width: "100%" }}>
                              <Text style={styles.textstyle}>
                                Type:{"\n"} {item?.session_type?.type} session
                              </Text>
                            </View>
                          </View>
                          <View style={styles.dotmainview}>
                            <View style={styles.dotview}>
                              <FontAwesome name="circle" style={{ color: "#979797" }} />
                            </View>
                            <View style={{ width: "100%" }}>
                              <Text style={styles.textstyle}>
                                Cost: {"\n"}$ {item?.price}
                              </Text>
                            </View>
                          </View>
                          <View style={styles.dotmainview}>
                            <View style={styles.dotview}>
                              <FontAwesome name="circle" style={{ color: "#979797" }} />
                            </View>
                            <View style={{ width: "100%" }}>
                              <Text style={styles.textstyle}>
                                Available slots:: {"\n"} {item?.no_of_slots}
                              </Text>
                            </View>
                          </View>
                          <View style={styles.dotmainview}>
                            <View style={styles.dotview}>
                              <FontAwesome name="circle" style={{ color: "#979797" }} />
                            </View>
                            <View style={{ width: "100%" }}>
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
    </Container>
  );
};
export default BookSession;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingTop: Platform.OS === "ios" ? 40 : 0,
    paddingBottom: Platform.OS === "ios" ? 0 : 0,
  },
  mainHeaderRect: {
    width: "100%",
    alignItems: "center",
    height: 120,
  },
  arrowHeadRect: {
    width: "100%",
    alignSelf: "center",
    height: 50,
    justifyContent: "center",
  },
  titleHeadRect: {
    width: "100%",
    height: 70,
  },
  pageTitleText: {
    fontSize: RFValue(20, 580),
    fontFamily: "Poppins-SemiBold",
    color: "#000",
  },
  pageSubTitleText: {
    fontSize: RFValue(12, 580),
    fontFamily: "Poppins-Regular",
    color: "#ABABB5",
  },
  mainBody: {
    width: "100%",
  },
  calendarView: {
    width: "100%",
    alignSelf: "center",
    borderBottomWidth: 2,
    paddingBottom: 4,
    borderColor: "##3A3A3C",
  },
  mainClassTitleRect: {
    width: "100%",
    alignSelf: "center",
    marginTop: 15,
  },
  classTitleText: {
    fontSize: RFValue(16, 580),
    fontFamily: "Poppins-Bold",
    color: Colors.black,
  },
  textInputMainRect: {
    width: "100%",
    backgroundColor: Colors.black,
    borderRadius: 9,
    marginTop: 5,
    height: 50,
    justifyContent: "center",
  },
  inputTypeStyle: {
    borderRadius: 10,
    width: "100%",
    paddingLeft: 10,
    fontSize: RFValue(12, 580),
    color: Colors.white,
  },
  imageBox: {
    width: "100%",
    height: "8%",
    backgroundColor: Colors.black,
    marginTop: 12,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
    alignSelf: "center",
  },
  uploadTitleText: {
    textAlign: "center",
    fontSize: RFValue(14, 580),
    fontFamily: "Poppins-SemiBold",
    marginTop: 4,
    color: Colors.white,
  },
  imagestyle: {
    width: "100%",
    height: 200,
    alignSelf: "center",
    borderRadius: 5,
    marginBottom: 5,
  },
  titleLeftColRect: {
    width: "50%",
    justifyContent: "center",
  },
  titleRightColRect: {
    width: "50%",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  selectBtnRect: {
    width: 125,
    height: 48,
    backgroundColor: "#414143",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  tapSelectTitle: {
    fontSize: RFValue(10, 580),
    color: Colors.white,
    fontFamily: "Poppins-Regular",
  },
  selectTimeRow: {
    width: "70%",
    flexDirection: "row",
    backgroundColor: "#414143",
    borderRadius: 12,
    justifyContent: "center",
    height: 45,
  },
  HeadingTextstyle: {
    fontSize: RFValue(16, 580),
    fontFamily: "Poppins-Bold",
    color: "#000",
  },
  mintext: {
    fontSize: RFValue(9, 580),
    fontFamily: "Poppins-Regular",
  },
  lastBtn: {
    width: "50%",
    alignItems: "center",
    borderColor: "red",
    backgroundColor: "#414143",
    borderRadius: 8,
    justifyContent: "center",
    height: 35,
  },
  TopselectTexte: {
    fontSize: RFValue(12, 580),
    width: "50%",
    alignItems: "center",
    paddingBottom: 0,
    paddingTop: 4,
    paddingLeft: 10,
    color: Colors.white,
    fontFamily: "Poppins-Regular",
    justifyContent: "center",
    height: 32,
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
  pulsview: {
    width: 26,
    height: 26,
    backgroundColor: "#ff0000",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 2,
  },
  minusview: {
    width: 26,
    height: 26,
    backgroundColor: "#414143",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 2,
    alignSelf: "flex-end",
  },
  TimewidthchangeView: {
    width: "40%",
    alignItems: "flex-end",
  },
  TimewidthchangeView1: {
    width: "32%",
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  TimewidthchangeView2: {
    alignItems: "flex-end",
    width: "28%",
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
  RangeText: {
    color: "black",
    fontSize: Platform.OS === "ios" ? RFValue(10, 580) : RFValue(12, 580),
    fontFamily: "Poppins-Regular",
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
  mainBoxView: {
    width: "100%",
    alignSelf: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 20,
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

  TopView: {
    width: "100%",
    alignItems: "center",
  },
  topView: { width: "100%" },
  topView1: {
    width: "100%",
    alignItems: "center",
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
    width: "100%",
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

  selectView: {
    width: "100%",
    alignSelf: "center",
    marginTop: 3,
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
    marginBottom: 0,
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    height: "14%",
    backgroundColor: "#fff",
    alignItems: "center",
    alignSelf: "center",
    //marginTop: 20,
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
  },
  profileDisablebtnview: {
    backgroundColor: Colors.gray,
    width: 163,
    height: 58,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
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

  InputView: {
    width: "100%",
    backgroundColor: "#414143",
    borderRadius: 8,
    alignSelf: "center",
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

  inputEmail: {
    borderRadius: 10,
    width: "100%",
    paddingLeft: 10,
    fontSize: RFValue(14, 580),
    color: Colors.white,
  },
  TextInput: {
    width: "100%",
    alignSelf: "center",
    backgroundColor: Colors.black,
    borderRadius: 9,
    marginTop: 5,
    height: 50,
    justifyContent: "center",
    marginBottom: 40,
    flexDirection: "row",
  },
  dolarText: {
    marginLeft: 30,
    color: Colors.white,
    marginTop: 10,
    fontSize: 20,
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

  TopselectText: {
    fontSize: Platform.OS === "ios" ? RFValue(11, 580) : RFValue(15, 580),
    color: Colors.white,
    fontFamily: "poppins-Regular",
  },

  nonee: { marginBottom: hp(-12) },
  textinputtopview: {
    width: "100%",
    justifyContent: 'space-between',
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
    width: "100%",
    alignItems: "center",
    backgroundColor: "#000",
    flexDirection: "row",
    borderRadius: 10,
    marginTop: 10,
    justifyContent: "center",
    height: 50,
    marginBottom: 10
  },
  SportsDropdown: {
    width: "100%",
    alignSelf: "center",
    borderRadius: 10,
    backgroundColor: "#000",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent: "center",
    paddingBottom: hp(1),
  },

  UpIcon: {
    width: "20%",
    justifyContent: "center",
    paddingRight: 10,
    alignItems: "flex-end",
    borderColor: "#fff",
  },
  searInput: {
    borderRadius: 10,
    width: "100%",
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
    fontSize: RFValue(15, 580),
    color: Colors.white,
    textTransform: "capitalize",
    borderBottomWidth: 1,
    marginVertical: 5,
    borderColor: "white",
    padding: 10
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
  marchmainview: {
    width: "100%",
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
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
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
  PersonalinfoView: {
    width: "100%",
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

  inputTopView: {
    width: "100%",
    alignItems: "center",
    marginTop: 30,
  },
  inputtopviews: {
    width: "100%",
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
    width: "100%",
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
    width: "100%",
    borderRadius: 10,
    color: Colors.infos,
    backgroundColor: Colors.bgRedBtn,
    alignItems: "center",
    justifyContent: "center",
  },
  mainRectViewRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: "space-between",
    paddingVertical: 10
  },
});



const preDefineSports = [ "Soccer",  "Basketball",  "Tennis",  "Baseball",  "Golf",  "Volleyball",  "Running",  "Badminton",  "Swimming",  "Boxing",  "Table tennis",  "Skiing",  "Ice skating",  "Roller skating",  "Cricket",  "Rugby",  "Pool",  "Arts",  "Bowling",  "Karate" ];