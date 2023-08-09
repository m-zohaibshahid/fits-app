import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import { useGetTrainerReviewsQuery } from "../../slice/FitsApi.slice";
import { useSelector } from "react-redux";
import { UserDetail } from "../../interfaces";
import Typography from "../../Components/typography/text";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/core";

const Reviews = () => {
  const navigation = useNavigation()
  const { userInfo } = useSelector((state: { fitsStore: Partial<UserDetail> }) => state.fitsStore);
  const { data: trainerReviews, refetch } = useGetTrainerReviewsQuery(userInfo?.personal_info._id || '');


  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      refetch();
    });

    return unsubscribe; // Cleanup the listener when component unmounts
  }, [navigation, refetch]);

  return (
    <ScrollView>
      {
        trainerReviews?.data.map((item) => {
          return (
            <>
            <View style={styles.BoxMianView}>
              <View style={styles.imageView}>
            <Image
              style={styles.imagestyles}
              source={{
                uri: `${item.trainee.profileImage}`,
              }}
              />
            <Typography color="white" size={"heading6"}>{item.trainee.name.split(' ').slice(0, 2).join(' ')}</Typography>
            <Typography color="white" size={"heading6"}>
              {item.rating.toFixed(2)} <AntDesign name="star" size={18} />
            </Typography>
          </View>
          <View style={styles.lineView}></View>
          <View style={styles.TextsView}>
              <Typography size={"heading4"} color="white">Type {item.reviewFor}</Typography>
            <Typography color="white90">{item.comment.slice(0, 140)}...</Typography>
          </View>
        </View>
      </>
          )
        })
   }
    </ScrollView>
  );
};

export default Reviews;

const styles = StyleSheet.create({
  BoxMianView: {
    width: "100%",
    flexDirection: "row",
    backgroundColor: "#000",
    padding: 10,
    // paddingHorizontal: 10,
    borderRadius: 20,
    alignItems: "center",
    marginTop: 10
  },
  imageView: {
    width: "30%",
    alignItems: "center",
  },
  TextsView: {
    width: "60%",
    justifyContent: "flex-start",
    height: '100%',

  },
  lineView: {
    width: 2,
    height: 115,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginHorizontal: 10
  },
  imagestyles: {
    width: 70,
    height: 70,
    borderRadius: 200 / 2,
  },
});

export interface GetReviewsApiInterface {
  statusCode: number
  success: boolean
  message: string
  data: ReviewsInterface[]
}

export interface ReviewsInterface {
  alreadyReview: boolean
  _id: string
  rating: number
  comment: string
  trainer: string
  reviewFor: string
  trainee: Trainee
  createdAt: string
  updatedAt: string
  __v: number
}

export interface Trainee {
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

