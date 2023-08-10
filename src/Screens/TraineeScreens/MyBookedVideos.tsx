import React, { useState, useEffect } from "react";
import { View, StyleSheet, ActivityIndicator, ScrollView } from "react-native";
import VideoPlayer from "react-native-video-player";
import Colors from "../../constants/Colors";
import { NavigationSwitchProp } from "react-navigation";
import { useSelector } from "react-redux";
import { useGetMyBookedVideosQuery, useSubmitReviewsMutation } from "../../slice/FitsApi.slice";
import { UserDetail } from "../../interfaces";
import Typography from "../../Components/typography/text";
import Entypo from "react-native-vector-icons/Entypo";
import Button from "../../Components/Button";
import ReviewsModal from "../../Components/reviewsModal";
import { errorToast, successToast } from "../../utils/toast";
interface Props {
  navigation: NavigationSwitchProp;
}
const MyBookedVideosScreen: React.FC<Props> = ({ navigation }) => {
  const { userInfo } = useSelector((state: { fitsStore: Partial<UserDetail> }) => state.fitsStore);
  const { data: myBookedVideos, refetch: refetchMyBookedVideos, isLoading: getMyVideosIsLoading } = useGetMyBookedVideosQuery(userInfo?.user._id)
  const [submitReviewMutateAsync, {isLoading: isReviewsSubmitLoading}] = useSubmitReviewsMutation()
  const [thumbnailLoading, setThumbnailLoading] = useState(true);
  const [reviewVideoDetails, setReviewVideoDetails] = useState<Video | null>();

  useEffect(() => {
    navigation.addListener('focus', () => {
      refetchMyBookedVideos()
    })
  }, [])
  
  const handleCommentSubmit = async (rating: number, comment: string) => {
    const body = {
      reviewFor: "video",
      videoId: reviewVideoDetails?._id,
      trainerId: reviewVideoDetails?.user._id,
      reviews: {
        rating: rating,
        comment: comment,
        userId: userInfo?.personal_info._id,
      },
    }
    const result = await submitReviewMutateAsync(body)
    if (result?.error) errorToast(result.error.data.message)
    if (result?.data) {
      successToast(result.data.message)
    }
    setReviewVideoDetails(null)
  };

  if (!myBookedVideos || !myBookedVideos?.length) {
    return <Typography style={{ marginTop: 50 }} align="center">
      ---You dont have any video yet---
    </Typography>
  }
  
  if (getMyVideosIsLoading) return <ActivityIndicator style={{marginTop: 300, alignSelf: 'center'}} />

  return (
    <ScrollView showsHorizontalScrollIndicator={false}>
      {myBookedVideos.map((item) => {
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
                marginTop: 5
              }}>
                <Typography color='white' size={'regularText'}>
                  Trainer Name:
                </Typography>
                <Typography color='white90' style={{marginLeft: 30, marginTop: 5}} size={'medium'}>
                  {item.user.name}
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
              <Button variant="medium" style={{alignSelf: "center", marginBottom: 10, paddingVertical: 15, width: 160}} label={"Add Reviews"} onPress={() => setReviewVideoDetails(item)} />
            </View>
      })}
      
      <ReviewsModal isVisible={!!reviewVideoDetails} onClose={() => setReviewVideoDetails(null)} onSubmitReviews={handleCommentSubmit} isLoading={isReviewsSubmitLoading} />
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



export type GetBookedVideosApiInterface = Video[]

export interface Video {
  video_links: string[]
  numReviews: number
  averageRating: number
  video_thumbnail: string
  _id: string
  topic: string
  video_category: string
  video_details: string
  price: number
  user: User
  createdAt: string
  updatedAt: string
  __v: number
}

export interface User {
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

