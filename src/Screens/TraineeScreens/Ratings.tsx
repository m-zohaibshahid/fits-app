import React, { useState } from "react";
import { Text, View, Pressable, StyleSheet, Image, ScrollView, ToastAndroid, Alert } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import { RFValue } from "react-native-responsive-fontsize";

import { url } from "../../constants/url";
import { RouteProp, useRoute } from "@react-navigation/native";
import Typography from "../../Components/typography/text";
import Container from "../../Components/Container";
import Button from "../../Components/Button";
import TextInput from "../../Components/Input";
import Colors from "../../constants/Colors";
import { useSubmitReviewsMutation } from "../../slice/FitsApi.slice";
import { errorToast, successToast } from "../../utils/toast";
import { useSelector } from "react-redux";
import { UserDetail } from "../../interfaces";

const Ratings = () => {
  const route = useRoute<RouteProp<ParamsInterface, "root">>();
  const [submitReviewMutateAsync, {isLoading}] = useSubmitReviewsMutation()
  const { userInfo } = useSelector((state: { fitsStore: Partial<UserDetail> }) => state.fitsStore);
  const [details, setDetails] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const  getStarsLength = (n: number): number[] => {
    const result: number[] = [];
    for (let i = 0; i < n; i++) {
      result.push(i);
    }
    return result;
  }

  const handleRating = (newRating: number) => {
    setRating(newRating);
  };

  const handleCommentSubmit = async () => {
    const body = {
      reviewFor: "trainer",
      trainerId: route?.params.personalData._id,
      reviews: {
        rating: rating,
        comment: comment,
        userId: userInfo?.personal_info._id,
      },
    }
    const result = await submitReviewMutateAsync(body)
    if (result.error) errorToast(result.error.data.message)
    if (result.data) {
      successToast(result.data.message)
    }
  };

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.main}>
      <View style={{flex:1, alignItems: 'center', width: 150  }}>
              <Typography align="center" size={"heading3"} weight="800">Total Rating</Typography>
              <Typography align="center" size={70}>{route?.params?.userData?.averageRating?.toFixed(1)}</Typography>
              <Typography align="center" bottom={"mb2"}>({route?.params?.userData?.numReviews} Reviews)</Typography>
              <View style={{flexDirection: "row", columnGap: 5}}>
          {getStarsLength(route?.params?.userData?.averageRating).map(() => {
            return <AntDesign name="star" size={18} color={"#000"} />
          })}
              </View>
            </View>
        <View style={styles.TopView}>
          <View style={styles.marchmainview}>
            <View style={styles.raterowview}>
                <Text style={styles.ratetext}>Rate this trainer</Text>
                <Entypo onPress={() => setDetails(!details)} name={details ? "chevron-up" : "chevron-down"} size={22} color={"#fff"} />
            </View>
            <View style={styles.starrow1view}>
              {[1, 2, 3, 4, 5].map((num) => (
                <Pressable
                  key={num}
                  onPress={() => handleRating(num)}
                  style={styles.startView}
                >
                  <AntDesign name="star" size={25} color={rating >= num ? "#fff" : "#414143"} />
                </Pressable>
              ))}
            </View>
            {details && (
              <View>
                <TextInput
                  style={{backgroundColor: Colors.gray}}
                  maxLength={200}
                  isTextArea
                  value={comment}
                  onChangeText={setComment} label={"Comment..."}                />
                <Button loader={isLoading} style={{alignSelf: "center", marginVertical: 10}} label={"SUbmit"} variant="tini" onPress={handleCommentSubmit} />
              </View>
            )}
          </View>
             <View style={styles.BoxMianView}>
              <View style={styles.imageView}>
                <Image
                  style={styles.imagestyles}
                  source={{
                    uri: `${route.params?.personalData?.profileImage}`,
                  }}
                />
                <Typography color="white" size={"heading5"}>{route.params?.personalData?.name}</Typography>
                <Typography color="white" size={"heading5"}>
                  {route?.params?.userData?.averageRating?.toFixed(1)} <AntDesign name="star" />
                </Typography>
              </View>
              <View style={styles.lineView}></View>
              <View style={styles.TextsView}>
                <Typography color="white" weight="600">{route?.params?.userData?.details.slice(0, 170)}</Typography>
              </View>
            </View>
        </View>
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {
    width: "100%",
    paddingVertical: 30,
  },
  TopView: {
    width: "100%",
    alignItems: "center",
  },
  marchmainview: {
    marginTop: 30,
    width: "100%",
    backgroundColor: "#000",
    borderRadius: 14,
    paddingVertical: 5,
    paddingBottom: 10,
    padding: 20,
  },
  raterowview: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rateingView: {
    width: "70%",
  },
  imagestyles: {
    width: 80,
    height: 80,
    borderRadius: 100,
    marginBottom: 5
  },
  rateingView1: {
    width: "30%",
    alignItems: "flex-end",
  },
  ratetext: {
    fontFamily: "Poppins-Bold",
    fontSize: RFValue(15, 580),
    color: "#fff",
  },
  starrow1view: {
    width: "70%",
    flexDirection: "row",
    marginTop: 5,
    marginBottom: 10
  },
  startView: {
    width: "20%",
  },
  textinput: {
    width: "100%",
    backgroundColor: "#414143",
    borderRadius: 8,
    flexDirection: "column",
    height: 130,
    marginTop: 15,
  },
  ccbtnview: {
    backgroundColor: "#ff0000",
    width: 100,
    height: 45,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  mainbtnView: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#fff",
  },
  rowView: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  btntextstyle: {
    color: "#fff",
    fontSize: RFValue(10, 580),
    fontFamily: "Poppins-Regular",
  },
  commentInput: {
    height: 200,
    textAlignVertical: "top",
    fontFamily: "Poppins-Regular",
    left: 10,
    color: "#fff",
  },
  BoxMianView: {
    width: "100%",
    flexDirection: "row",
    backgroundColor: "#000",
    padding: 10,    
    borderRadius: 14,
    alignItems: "center",
    marginTop: 20,
  },
  imageView: {
    width: "30%",
    alignItems: "center",
  },
  TextsView: {
    width: "62%",
    alignItems: "center",
  },
  lineView: {
    width: 2,
    height: '100%',
    backgroundColor: "#fff",
    borderRadius: 10,
    margin: 10
  },
  nameTest: {
    fontSize: RFValue(10, 580),
    fontFamily: "Poppins-Regular",
    color: "#fff",
  },
});

export default Ratings;

type ParamsInterface = {
  root: Root
}
export interface Root {
  personalData: PersonalData
  professionalData: ProfessionalData
  userData: UserData
  sessionId: string
}

export interface PersonalData {
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

export interface ProfessionalData {
  verification_status: string
  _id: string
  experience_year: number
  experience_note: string
  qualification: Qualification[]
  user: string
  createdAt: string
  updatedAt: string
  __v: number
}

export interface Qualification {
  _id: string
  id?: number
  degree: string
  degree_note: string
}

export interface UserData {
  image: string
  numReviews: number
  averageRating: number
  _id: string
  session_title: string
  class_title: string
  select_date: string
  class_time: string
  duration: number
  equipment: any[]
  session_type: SessionType
  sports: string
  details: string
  price: number
  no_of_slots: number
  user: User
  createdAt: string
  recommended: boolean
}

export interface SessionType {
  _id: string
  type: string
  recordCategory: string
  no_of_play: string
  videoTitle: string
}

export interface User {
  services_offered: ServicesOffered
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
  _id: string
  email: string
  password: string
  createdAt: string
  updatedAt: string
  __v: number
  personal: string
  profession: string
  cus_id: string
}

export interface ServicesOffered {
  value: string
  key: string
}
