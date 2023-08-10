/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Platform, ActivityIndicator, TouchableOpacity, ScrollView, Alert } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { RFValue } from "react-native-responsive-fontsize";
import VideoPlayer from "react-native-video-player";
import Colors from "../../../constants/Colors";
import Container from "../../../Components/Container";
import Header from "../../../Components/Header";
import { useGetMyAllCreatedVideosQuery, useVideoDelMutation, useVideoUpdateMutation } from "../../../slice/FitsApi.slice";
import Typography from "../../../Components/typography/text";
import { NavigationSwitchProp } from "react-navigation";
import Entypo from "react-native-vector-icons/Entypo";
import Button from "../../../Components/Button";
import { useSelector } from "react-redux";
import { UserDetail } from "../../../interfaces";
import FullPageLoader from "../../../Components/FullpageLoader";

interface PropsInterface {
  navigation: NavigationSwitchProp;
}

const TrainerVideoScreen = ({ navigation }: PropsInterface) => {
  const { userInfo } = useSelector((state: { fitsStore: Partial<UserDetail> }) => state.fitsStore);
  const { data: myAllVideos, refetch: refetchMyAllVideos, isLoading } = useGetMyAllCreatedVideosQuery(userInfo?.user._id ?? "");
  const [mutateDeleleVideo, { isLoading: isVideoDeleteLoading }] = useVideoDelMutation();
  const [thumbnailLoading, setThumbnailLoading] = useState(true);

  useEffect(() => {
    navigation.addListener("focus", () => {
      refetchMyAllVideos();
    });
  }, []);

  if (isLoading || isVideoDeleteLoading) return <FullPageLoader />;
  const handleDeleteVideo = async (item: VideoInterface) => {
    const id = item._id;
    mutateDeleleVideo(id);
    refetchMyAllVideos();
  };
  const handleEditVideo = async (item: VideoInterface) => {
    navigation.navigate("VideoCreate", { item });
    refetchMyAllVideos();
  };
  return (
    <Container style={{ marginBottom: 50 }}>
      <Header label="My Classes" />
      <ScrollView showsHorizontalScrollIndicator={false}>
        {!myAllVideos?.data?.length ? (
          <Typography style={{ marginTop: 50 }} align="center">
            ---You dont have any video yet---
          </Typography>
        ) : (
          myAllVideos.data.map((item: VideoInterface) => {
            const duration = "1 hour";
            return (
              <View style={styles.topView1}>
                <View style={styles.VideoView}>
                  <VideoPlayer
                    video={{
                      uri: item.video_links,
                    }}
                    videoWidth={900}
                    videoHeight={700}
                    thumbnail={{
                      uri: item.video_thumbnail,
                    }}
                    onLoad={() => setThumbnailLoading(false)}
                  />
                  {thumbnailLoading && (
                    <View style={styles.thumbnailLoader}>
                      <ActivityIndicator />
                    </View>
                  )}
                </View>
                <View style={styles.BoxView}>
                  <View
                    style={{
                      width: "100%",
                      flexDirection: "column",
                      marginVertical: 5,
                    }}
                  >
                    <Typography color="white" size={"regularText"}>
                      Trainer Name:
                    </Typography>
                    <Typography color="white90" style={{ marginLeft: 30, marginTop: 5 }} size={"medium"}>
                      {userInfo?.personal_info.name}
                    </Typography>
                  </View>
                  <View
                    style={{
                      width: "100%",
                      flexDirection: "column",
                      marginVertical: 5,
                    }}
                  >
                    <Typography color="white" size={"regularText"}>
                      Class Rating:
                    </Typography>
                    <Typography color="white90" style={{ marginLeft: 30, marginTop: 5 }} size={"medium"}>
                      {item.averageRating}
                      {"   "}
                      <Entypo name="star" style={{ marginHorizontal: 10 }} size={18} color={"#fff"} />
                      {"   "}({item.numReviews}) Reviews
                    </Typography>
                  </View>
                  <View
                    style={{
                      width: "100%",
                      flexDirection: "column",
                      marginVertical: 5,
                    }}
                  >
                    <Typography color="white" size={"regularText"}>
                      Topic:
                    </Typography>
                    <Typography color="white90" style={{ marginLeft: 30, marginTop: 5 }} size={"medium"}>
                      {item.topic}
                    </Typography>
                  </View>
                  <View
                    style={{
                      width: "100%",
                      flexDirection: "column",
                      marginVertical: 5,
                    }}
                  >
                    <Typography color="white" size={"regularText"}>
                      Duration:
                    </Typography>
                    <Typography color="white90" style={{ marginLeft: 30, marginTop: 5 }} size={"medium"}>
                      {duration}
                    </Typography>
                  </View>
                  <View
                    style={{
                      width: "100%",
                      flexDirection: "column",
                      marginVertical: 5,
                    }}
                  >
                    <Typography color="white" size={"regularText"}>
                      Description:
                    </Typography>
                    <Typography color="white90" style={{ marginLeft: 30, marginTop: 5 }} size={"medium"}>
                      {item.video_details}
                    </Typography>
                  </View>
                  <View style={{ flexDirection: "row", justifyContent: "space-around", marginTop: 20 }}>
                    <Button variant="tini" label="Delete" onPress={() => handleDeleteVideo(item)} />
                    <Button style={{ backgroundColor: "#3b3b3be3" }} variant="tini" label="Edit" onPress={() => handleEditVideo(item)} />
                  </View>
                </View>
              </View>
            );
          })
        )}
      </ScrollView>
      <TouchableOpacity onPress={() => navigation.navigate("VideoCreate")} style={styles.addIconRect}>
        <AntDesign name="plus" color={"#fff"} size={24} />
      </TouchableOpacity>
    </Container>
  );
};

// VideoCreate
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingTop: Platform.OS === "ios" ? 40 : 0,
  },
  main: {
    width: "100%",
  },
  topView1: {
    backgroundColor: Colors.black,
    borderRadius: 10,
    marginBottom: 20,
    width: "100%",
    alignSelf: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  VideoView: {
    width: "100%",
    borderBottomWidth: 1,
    borderColor: Colors.lightGray,
  },
  BoxView: {
    width: "100%",
    backgroundColor: "#000",
    padding: 20,
  },
  rowboxmainview: {
    width: "100%",
    flexDirection: "row",
    marginTop: 10,
  },
  boxviewicon: {
    width: "10%",
    alignItems: "center",
    marginTop: 5,
  },
  boxtextstyle: {
    color: "#ffffff",
    fontSize: RFValue(12, 580),
    fontFamily: "Poppins-Regular",
  },
  addIconRect: {
    width: 56,
    height: 56,
    borderRadius: 40,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 8,
    right: 12,
  },
  thumbnailLoader: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.black,
  },
});

export default TrainerVideoScreen;

export interface VideoInterface {
  __v: number;
  _id: string;
  averageRating: number;
  createdAt: string;
  numReviews: number;
  price: number;
  topic: string;
  updatedAt: string;
  user: string;
  video_category: string;
  video_details: string;
  video_links: string;
  video_thumbnail: string;
}
