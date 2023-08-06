import React, { useState, useEffect } from "react";
import { View, StyleSheet, ActivityIndicator, ScrollView } from "react-native";
import VideoPlayer from "react-native-video-player";
import Colors from "../../constants/Colors";
import { NavigationSwitchProp } from "react-navigation";
import { useSelector } from "react-redux";
import { useGetMyBookedVideosQuery } from "../../slice/FitsApi.slice";
import { UserDetail } from "../../interfaces";
import Typography from "../../Components/typography/text";
import Entypo from "react-native-vector-icons/Entypo";
interface Props {
  navigation: NavigationSwitchProp;
}
const MyBookedVideosScreen: React.FC<Props> = ({ navigation }) => {
  const { userInfo } = useSelector((state: { fitsStore: Partial<UserDetail> }) => state.fitsStore);
  const { data: myBookedVideos, refetch: refetchMyBookedVideos, isLoading: getMyVideosIsLoading } = useGetMyBookedVideosQuery(userInfo?.user._id)
  const [thumbnailLoading, setThumbnailLoading] = useState(true);

  useEffect(() => {
    navigation.addListener('focus', () => {
      refetchMyBookedVideos()
    })
  }, [])

  /*   const RattingReviews = async () => {
      if (rating === "") {
        ToastAndroid.show("Enter your ratings", ToastAndroid.LONG);
      } else {
        {
        }
        let reviews;
        (reviews = {
          rating: rating,
          comment: "Na",
          user: id,
        }),
          await fetch(`${url}/review`, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              videoId: videoId,
              reviewFor: "video",
              reviews: reviews,
            }),
          })
            .then((res) => res.json())
            .then((res2) => {
              setLoadxx(false);
              if (res2.message === "reviews submit successfully") {
                ToastAndroid.show("Confirmed your reviews", ToastAndroid.LONG);
                getAllVideos();
              } else {
                ToastAndroid.show(res2.message, ToastAndroid.LONG);
              }
            })
            .catch((error) => {
              setLoadxx(false);
              Alert.alert("Something Went Wrong");
            });
      }
    }; */

  if (!myBookedVideos || !myBookedVideos?.data.length) {
    return <Typography style={{ marginTop: 50 }} align="center">
      ---You dont have any video yet---
    </Typography>
  }
  
  if (getMyVideosIsLoading) return <ActivityIndicator style={{marginTop: 300, alignSelf: 'center'}} />

  return (
    <ScrollView showsHorizontalScrollIndicator={false}>
      {myBookedVideos?.data.map((item: Daum) => {
          const duration = '1 hour';
            return <View style={styles.topView1} key={item._id}>
              <View style={styles.VideoView}>
                <VideoPlayer
                  video={{
                    uri: `${item.video_links[0]}`,
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
              <View style={{
                width: '100%',
                flexDirection: 'column',
                marginVertical: 5
              }}>
                <Typography color='white' size={'regularText'}>
                  Trainer Name:
                </Typography>
                <Typography color='white90' style={{marginLeft: 30, marginTop: 5}} size={'medium'}>
                kuch bh
                </Typography>
              </View>
              <View style={{
                width: '100%',
                flexDirection: 'column',
                marginVertical: 5
              }}>
                <Typography color='white' size={'regularText'}>
                  Class Rating:
                </Typography>
                <Typography color='white90' style={{marginLeft: 30, marginTop: 5}} size={'medium'}>
                {item.averageRating}
                {"   "}
                  <Entypo name="star" style={{marginHorizontal: 10}} size={18} color={'#fff'} />
                {"   "}
                ({item.numReviews}) Reviews
                </Typography>
              </View>
              <View style={{
                width: '100%',
                flexDirection: 'column',
                marginVertical: 5
              }}>
                <Typography color='white' size={'regularText'}>
                  Topic:
                </Typography>
                <Typography color='white90' style={{marginLeft: 30, marginTop: 5}} size={'medium'}>
                  {item.topic}
                </Typography>
              </View>
              <View style={{
                width: '100%',
                flexDirection: 'column',
                marginVertical: 5
              }}>
                <Typography color='white' size={'regularText'}>
                  Duration:
                </Typography>
                <Typography color='white90' style={{marginLeft: 30, marginTop: 5}} size={'medium'}>
                  {duration}
                </Typography>
              </View>
              <View style={{
                width: '100%',
                flexDirection: 'column',
                marginVertical: 5
              }}>
                <Typography color='white' size={'regularText'}>
                  Description:
                </Typography>
                <Typography color='white90' style={{marginLeft: 30, marginTop: 5}} size={'medium'}>
                  {item.video_details}
                </Typography>
                </View>
            </View>
            </View>
        })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  topView1: {
    backgroundColor: Colors.black,
    borderRadius: 10,
    marginBottom: 20,
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  VideoView: {
    width: '100%',
    borderBottomWidth: 1,
    borderColor: Colors.lightGray,
  },
  BoxView: {
    width: '100%',
    backgroundColor: '#000',
    padding: 20,
  },
  thumbnailLoader: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.black,
  },
});

export default MyBookedVideosScreen;


export interface GetBookedVideosApiInterface {
  data: Daum[]
  statusCode: number
  message: string
  success: boolean
}

export interface Daum {
  _id: string
  video_links: string[]
  numReviews: number
  averageRating: number
  video_thumbnail: string
  topic: string
  video_category: string
  video_details: string
  price: number
  user: string
  createdAt: string
  updatedAt: string
  __v: number
  trainer: Trainer
  reviews: any[]
}

export interface Trainer {
  _id: string
  role: string
  isVerified: boolean
  amount: number
  emailVerified: boolean
  suspended: boolean
  reset_password: boolean
  trainerVerified: string
  accountVerified: string
  numReviews: number
  averageRating: number
  cardCreated: boolean
  email: string
  password: string
  createdAt: string
  updatedAt: string
  __v: number
  personal: Personal
  profession: string
  services_offered: ServicesOffered
  cus_id: string
}

export interface Personal {
  _id: string
  name: string
  date_of_birth: string
  country: string
  state: string
  city: string
  gender: string
  user: string
  profileImage: string
  phoneNumber: number
  createdAt: string
  updatedAt: string
  __v: number
}

export interface ServicesOffered {
  value: string
  key: string
}
