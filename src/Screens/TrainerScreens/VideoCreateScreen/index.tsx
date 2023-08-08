import React, { useEffect, useState } from "react";
import { Text, View, Pressable, StyleSheet, ScrollView, ToastAndroid, ActivityIndicator, Platform, Image } from "react-native";
import Colors from "../../../constants/Colors";
import VideoPlayer from "react-native-video-player";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import ImagePicker from "react-native-image-crop-picker";
import { RFValue } from "react-native-responsive-fontsize";
import Header from "../../../Components/Header";
import Button from "../../../Components/Button";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { NavigationSwitchProp } from "react-navigation";
import { useGetMyAllCreatedVideosQuery, useUploadVideoMutation, useVideoUpdateMutation } from "../../../slice/FitsApi.slice";
import Container from "../../../Components/Container";
import Typography from "../../../Components/typography/text";
import { errorToast } from "../../../utils/toast";
import { useRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { UserDetail } from "../../../interfaces";
import FullPageLoader from "../../../Components/FullpageLoader";
import TextInput from "../../../Components/Input";

interface PropsInterface {
  navigation: NavigationSwitchProp;
}
const VideoCreateScreen = ({ navigation }: PropsInterface) => {
  const route = useRoute();
  const paramater: any = route.params;
  const [mutateAsyncVideoUpload, { isLoading }] = useUploadVideoMutation();
  const [mutateUpdateVideo, { isLoading: isLoading1 }] = useVideoUpdateMutation();
  const [statusOne, setStatusOne] = useState(false);
  const [statusTwo, setStatusTwo] = useState(false);
  const [statusThree, setStatusThree] = useState(false);
  const [statusFour, setStatusFour] = useState(false);
  const [statusFive, setStatusFive] = useState(false);
  const [statusSix, setStatusSix] = useState(false);
  const [details, setDetails] = useState("");
  const [video, setVideo] = useState("");
  const [price, setPrice] = useState("");
  const [uploadOnCloudLoading, setUploadOnCLoudLoading] = useState<{ video: boolean; image: boolean }>({ image: false, video: false });
  const [videoTitle, setVideoTitle] = useState("");
  const [cloudVideoUrl, setCloudVideoLink] = useState([]);
  const [cloudImageUrl, setCloudImageUrl] = useState("");
  const [value, setValue] = useState("");
  const { userInfo } = useSelector((state: { fitsStore: Partial<UserDetail> }) => state.fitsStore);
  const { refetch: refetchMyAllVideos, isLoading: isLoading2 } = useGetMyAllCreatedVideosQuery(userInfo?.user._id ?? "");

  useEffect(() => {
    if (paramater?.item) {
      setVideo(paramater?.item.video);
      setPrice(paramater?.item.price);
      setValue(paramater?.item.video_category);
      setCloudImageUrl(paramater?.item.video_thumbnail);
      setDetails(paramater?.item.video_details);
      setVideoTitle(paramater?.item.topic);
      setCloudVideoLink(paramater?.item.video_links);
      setStatusOne(paramater?.item.video_category === "Cardio/Abs");
      setStatusTwo(paramater?.item.video_category === "No Equipment Home Exercise");
      setStatusThree(paramater?.item.video_category === "Learn Technique");
      setStatusFour(paramater?.item.video_category === "Strength Building Workout");
      setStatusFive(paramater?.item.video_category === "Fat Burning Workout");
      setStatusSix(paramater?.item.video_category === "Mental Health & Nutrition");
    }
  }, [paramater?.item]);
  const chooseVideoFromGallery = () => {
    ImagePicker.openPicker({
      mediaType: "video",
    }).then((file) => {
      let newFile = {
        uri: file.path,
        type: "video/mp4",
        name: `video.mp4`,
      };
      setUploadOnCLoudLoading({ ...uploadOnCloudLoading, video: true });
      uploadVideoOnCloud(newFile);
      setVideo(file.path);
    });
  };

  const chooseImageFromGallery = () => {
    ImagePicker.openPicker({
      mediaType: "photo",
    }).then((file) => {
      let newFile = {
        uri: file.path,
        type: "photo/jpg",
        name: `photo.jpg`,
      };
      uploadImageOnCloud(newFile);
      setUploadOnCLoudLoading({ ...uploadOnCloudLoading, image: true });
    });
  };

  const uploadImageOnCloud = async (image: { uri: string; type: string; name: string }) => {
    const imageUploadOnCloud = new FormData();
    imageUploadOnCloud.append("file", image);
    imageUploadOnCloud.append("upload_preset", "employeeApp");
    imageUploadOnCloud.append("cloud_name", "ZACodders");
    await fetch("https://api.cloudinary.com/v1_1/ZACodders/image/upload", {
      method: "POST",
      body: imageUploadOnCloud,
    })
      .then((res) => res.json())
      .then((res2) => {
        setCloudImageUrl(res2?.url);
      })
      .catch((error) => {
        ToastAndroid.show(error, ToastAndroid.LONG);
      });
    setUploadOnCLoudLoading({ ...uploadOnCloudLoading, image: false });
  };

  const handleUploadVideo = async () => {
    const body = {
      topic: videoTitle,
      video_links: cloudVideoUrl,
      video_category: value,
      video_details: details,
      price: price,
      video_thumbnail: cloudImageUrl,
    };
    const result = await mutateAsyncVideoUpload(body);

    if (result?.data) navigation.navigate("Home");
    if (result?.error) errorToast(result?.error?.data.message);
  };
  const handleUpdateVideo = async () => {
    const body = {
      topic: videoTitle,
      video_links: cloudVideoUrl,
      video_category: value,
      video_details: details,
      price: price,
      video_thumbnail: cloudImageUrl,
    };
    const result: any = await mutateUpdateVideo({ id: paramater?.item._id, body });

    if (result?.data) {
      refetchMyAllVideos();
      navigation.navigate("Home");
    }
    if (result?.error) errorToast(result?.error?.data.message);
  };

  const uploadVideoOnCloud = async (video: any) => {
    const formData = new FormData();
    formData.append("file", video);
    formData.append("upload_preset", "employeeApp");
    formData.append("cloud_name", "ZACodders");

    await fetch("https://api.cloudinary.com/v1_1/ZACodders/video/upload", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((res2) => {
        setUploadOnCLoudLoading({ ...uploadOnCloudLoading, video: false });
        setCloudVideoLink([res2?.url]);
      })
      .catch((err) => {
        errorToast(err.message);
        setUploadOnCLoudLoading({ ...uploadOnCloudLoading, video: false });
        setVideo("");
      });
  };

  if (isLoading2) return <FullPageLoader />;
  return (
    <Container>
      <Header label={"Upload Video"} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.mainBody}>
          {video === "" ? (
            <View
              style={{
                width: "100%",
                backgroundColor: "#979797",
                height: 200,
                alignItems: "center",
                justifyContent: "center",
                alignSelf: "center",
              }}
            >
              <SimpleLineIcons name="cloud-upload" size={80} color={"#000"} />
              <Typography size={"heading2"} style={{ marginBottom: 20 }}>
                Tap to upload Video
              </Typography>
              <Button label="Upload Video" onPress={chooseVideoFromGallery} variant="tini" />
            </View>
          ) : uploadOnCloudLoading.video ? (
            <ActivityIndicator />
          ) : (
            <View style={{ width: "100%", alignSelf: "center", position: "relative" }}>
              <Pressable onPress={chooseVideoFromGallery} style={{ paddingVertical: 5, paddingHorizontal: 10, backgroundColor: Colors.grayTransparent, position: "absolute", top: 5, left: 5, borderRadius: 5 }}>
                <Typography color="white" size={"small"}>
                  Another
                </Typography>
              </Pressable>
              <VideoPlayer video={{ uri: cloudVideoUrl[0] }} videoWidth={1600} videoHeight={900} style={{ borderRadius: 10, alignSelf: "center" }} />
            </View>
          )}
          {!cloudImageUrl ? (
            <View
              style={{
                marginTop: 20,
                width: "100%",
                backgroundColor: "#979797",
                height: 200,
                alignItems: "center",
                justifyContent: "center",
                alignSelf: "center",
              }}
            >
              <SimpleLineIcons name="cloud-upload" size={50} color={"#000"} />
              <Typography size={"heading2"} style={{ marginBottom: 20 }}>
                Tap to upload Thumbnail
              </Typography>
              <Button variant="tini" onPress={chooseImageFromGallery} label="Thumbnail" />
            </View>
          ) : uploadOnCloudLoading.image ? (
            <ActivityIndicator style={{ marginVertical: 60 }} />
          ) : (
            <Pressable onPress={chooseImageFromGallery}>
              <Image
                style={{
                  marginVertical: 30,
                  width: "100%",
                  height: 200,
                }}
                source={{
                  uri: cloudImageUrl,
                }}
              />
            </Pressable>
          )}
        <Typography style={{ marginTop: 15 }} size={"heading3"}>
            Video Title
          </Typography>
              <TextInput
            placeholder="Please Enter Video Title"
            placeholderTextColor={Colors.white80}
            value={videoTitle}
            onChangeText={setVideoTitle} label={"Video Title"}              />
          <View style={{ width: "100%", alignItems: "center", marginTop: 20 }}>
            <View style={{ width: "100%" }}>
              <View style={{ width: "100%", flexDirection: "row" }}>
                <View style={{ width: "60%" }}>
                  <Text
                    style={{
                      fontSize: RFValue(14, 580),
                      fontFamily: "Poppins-SemiBold",
                      color: "#000",
                    }}
                  >
                    Select Category
                  </Text>
                </View>
                <View
                  style={{
                    width: "40%",
                    marginTop: 9,
                    alignItems: "flex-end",
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Poppins-Regular",
                      fontSize: RFValue(9, 580),
                    }}
                  >
                    (select appropriate)
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.mainBoxView}>
            <View style={{ width: "100%", flexDirection: "row" }}>
              <View style={styles.BoxviewWidth1}>
                <Pressable
                  style={statusOne ? styles.BoxShadowView : styles.BoxShadowViewBorder}
                  onPress={() => {
                    setStatusOne(true);
                    setValue("Cardio/Abs");
                    setStatusTwo(false);
                    setStatusThree(false);
                    setStatusFour(false);
                    setStatusFive(false);
                    setStatusSix(false);
                  }}
                >
                  <Text style={styles.BoxText}>Cardio/Abs</Text>
                </Pressable>
              </View>
              <View style={styles.BoxviewWidth2}>
                <Pressable
                  style={statusTwo ? styles.BoxShadowView : styles.BoxShadowViewBorder}
                  onPress={() => {
                    setStatusOne(false);
                    setValue("No Equipment Home Exercise");
                    setStatusTwo(true);
                    setStatusThree(false);
                    setStatusFour(false);
                    setStatusFive(false);
                    setStatusSix(false);
                  }}
                >
                  <Text style={styles.BoxText}>
                    No {"\n"}Equipment{"\n"}Home{"\n"}Exercise
                  </Text>
                </Pressable>
              </View>
              <View style={styles.BoxviewWidth3}>
                <Pressable
                  style={statusThree ? styles.BoxShadowView : styles.BoxShadowViewBorder}
                  onPress={() => {
                    setStatusOne(false);
                    setValue("Learn Technique");
                    setStatusTwo(false);
                    setStatusThree(true);
                    setStatusFour(false);
                    setStatusFive(false);
                    setStatusSix(false);
                  }}
                >
                  <Text style={styles.BoxText}>Learn Technique</Text>
                </Pressable>
              </View>
            </View>
          </View>
          <View style={styles.mainBoxView}>
            <View style={{ width: "100%", flexDirection: "row" }}>
              <View style={styles.BoxviewWidth1}>
                <Pressable
                  style={statusFour ? styles.BoxShadowView : styles.BoxShadowViewBorder}
                  onPress={() => {
                    setStatusOne(false);
                    setValue("Strength Building Workout");
                    setStatusTwo(false);
                    setStatusThree(false);
                    setStatusFour(true);
                    setStatusFive(false);
                    setStatusSix(false);
                  }}
                >
                  <Text style={styles.BoxText}>
                    Strength {"\n"} Building{"\n"} Workout
                  </Text>
                </Pressable>
              </View>
              <View style={styles.BoxviewWidth2}>
                <Pressable
                  style={statusFive ? styles.BoxShadowView : styles.BoxShadowViewBorder}
                  onPress={() => {
                    setStatusOne(false);
                    setValue("Fat Burning Workout");
                    setStatusTwo(false);
                    setStatusThree(false);
                    setStatusFour(false);
                    setStatusFive(true);
                    setStatusSix(false);
                  }}
                >
                  <Text style={styles.BoxText}>
                    Fat {"\n"} Burning{"\n"} Workout
                  </Text>
                </Pressable>
              </View>
              <View style={styles.BoxviewWidth3}>
                <Pressable
                  style={statusSix ? styles.BoxShadowView : styles.BoxShadowViewBorder}
                  onPress={() => {
                    setStatusOne(false);
                    setValue("Mental Health & Nutritiion");
                    setStatusTwo(false);
                    setStatusThree(false);
                    setStatusFour(false);
                    setStatusFive(false);
                    setStatusSix(true);
                  }}
                >
                  <Text style={styles.BoxText}>
                    Mental{"\n"} Health & {"\n"} Nutritiion
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
          <Typography style={{ marginTop: 15 }} size={"heading3"}>
            Any specific details
          </Typography>
            <TextInput isTextArea maxLength={500} placeholder="Write your decription here....." value={details} onChangeText={setDetails} label={"Video Description"} />

            <TextInput
              keyboard="phone-pad"
              value={price !== null ? price.toString() : ""}
              placeholder="Enter price"
              maxLength={5}
              onChangeText={setPrice} label={"Price"}
            />
        </View>
      </ScrollView>
      <Button
        style={{
          marginVertical: 20,
        }}
        label={paramater?.item ? "Update Video" : "Upload"}
        loader={isLoading || isLoading1}
        disabled={!videoTitle || !value || !price || !details || !cloudImageUrl || !cloudVideoUrl.length}
        onPress={paramater?.item ? handleUpdateVideo : handleUploadVideo}
      />
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
  mainBody: {
    width: "100%",
  },
  footer: {
    width: "100%",
    marginBottom: 0,
    bottom: 0,
    height: "10%",
    justifyContent: "center",
    position: "absolute",
    backgroundColor: "#fff",
  },
  btn: {
    padding: 10,
    margin: 10,
    width: "100%",
    borderRadius: 10,
    color: "#6698FF",
    backgroundColor: "#FF0000",
    alignItems: "center",
    justifyContent: "center",
  },
  mainBoxView: {
    width: "100%",
    alignItems: "center",
    marginTop: 30,
  },
  BoxText: {
    color: "#fff",
    fontSize: RFValue(9, 580),
    fontFamily: "Poppins-Bold",
    textAlign: "center",
    lineHeight: 21,
    letterSpacing: 2,
  },
  BoxviewWidth1: {
    width: "33%",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  BoxviewWidth2: {
    width: "34%",
    justifyContent: "center",
    alignItems: "center",
  },
  BoxviewWidth3: {
    width: "33%",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  BoxShadowView: {
    width: 101,
    height: 101,
    backgroundColor: "#000000",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#ff0000",
  },
  BoxShadowViewBorder: {
    width: 101,
    height: 101,
    backgroundColor: "#000000",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: hp(1),
    paddingHorizontal: wp(1),
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
});

export default VideoCreateScreen;
