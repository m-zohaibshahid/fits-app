import React, { useEffect, useMemo, useState } from "react";
import { Text, View, StyleSheet, ScrollView, Pressable, Platform, Alert } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { useSelector } from "react-redux";
import { RouteProp, useRoute } from "@react-navigation/native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import VideoPlayer from "react-native-video-player";
import Container from "../../Components/Container";
import Header from "../../Components/Header";
import Button from "../../Components/Button";
import Typography from "../../Components/typography/text";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { NavigationSwitchProp } from "react-navigation";
import { StripeCustomerInterface, UserDetail } from "../../interfaces";
import { useBookASessionMutation, useGetStripeUserQuery, useStripePaymentTransferMutation, useVideoSubscribeMutation } from "../../slice/FitsApi.slice";
import { TrainerData, Video } from "./types";
import { errorToast, successToast } from "../../utils/toast";

type RootStackParamList = {
  SubscribeVideoPaymentScreen: {
    trainerData: TrainerData;
    video: Video;
  };
};

interface PropsInterface {
  navigation: NavigationSwitchProp;
}

const SubscribeVideoPayment = ({ navigation }: PropsInterface) => {
  const { userInfo } = useSelector((state: { fitsStore: Partial<UserDetail> }) => state.fitsStore);
  const [cardData, setCardData] = useState<StripeCustomerInterface | null>(null);
  const route = useRoute<RouteProp<RootStackParamList, "SubscribeVideoPaymentScreen">>();
  const { trainerData, video } = route.params;

  const [bookSessionMutation, { isLoading: isLoadingBookSession }] = useVideoSubscribeMutation();
  const [tripePaymentTransferMutation, { isLoading: isLoadingTransferStripe }] = useStripePaymentTransferMutation();
  const { refetch: refetchStripeUser } = useGetStripeUserQuery(userInfo?.stripe?.card?.customer || "");

  const videoPrice = video.price;
  const walletAmount = useMemo(() => cardData?.balance ?? 0, [cardData]);

  const getStripeCard = async () => {
    const result = await refetchStripeUser();
    if (result?.data) setCardData(result.data.data);
  };

  useEffect(() => {
    navigation.addListener("focus", () => {
      getStripeCard();
    });
  }, []);

  const goToWalletUpdateScreen = () => {
    navigation.navigate("WalletForTrainee");
  };

  const handleSubscribeVideo = async () => {
    const result = await bookSessionMutation({ video_links: route.params.video.video_links[0] });
    if (result.error) errorToast(result.error.data.message);
    else if (result?.data) transferPayment();
  };

  const transferPayment = async () => {
    const body = {
      sender: userInfo?.user.cus_id,
      reciver: route.params.trainerData.userData.user.cus_id,
      currency: "usd",
      amount: -route.params.video.price,
      subamount: route.params.video.price,
    };
    try {
      const result = await tripePaymentTransferMutation(body);
      if (result.data) {
        successToast("Subscription Successfully");
        navigation.navigate("Home");
      }
    } catch (error) {
      errorToast(error?.data?.message);
    }
  };

  const renderDetails = () => {
    return (
      <View style={{ padding: heightPercentageToDP(2) }}>
        <DetailItem label="Class Rating" value={`$${video.averageRating} 🔘 ${video.numReviews} Reviews`} />
        <DetailItem label="Trainer name" value={trainerData.personalData.name} />
        <DetailItem label="Topic" value={video.topic} />
        <DetailItem label="Description" value={video.video_details} />
      </View>
    );
  };

  return (
    <Container>
      <Header label={"Payment"} style={{ marginBottom: 8 }} subLabel={"Pay before the class starts"} />
      <ScrollView style={{ marginBottom: 20 }}>
        <View style={styles.mainView}>
          <VideoPlayer
            video={{
              uri: video.video_links[0],
            }}
            videoWidth={900}
            videoHeight={500}
            thumbnail={{
              uri: video.video_thumbnail,
            }}
          />
          {renderDetails()}
        </View>

        <View style={styles.rowView}>
          <Typography size={"heading2"} weight="700">
            Total video Price
          </Typography>
          <Typography size={"heading2"} weight="700">
            $ {videoPrice}
          </Typography>
        </View>
        <View style={[styles.rowView, { marginBottom: 30 }]}>
          <Typography size={"heading3"} style={styles.walletText}>
            Wallet
          </Typography>
          <Typography size={"heading3"} style={styles.walletText}>
            $ {cardData?.balance}
          </Typography>
        </View>
      </ScrollView>
      {walletAmount < videoPrice ? <Typography style={{ marginBottom: 30, textTransform: "uppercase" }} size={"heading4"} align="center" weight="bold" color="grayTransparent" children={`You have insufficient balance`} /> : null}
      <Button
        style={{ marginBottom: 12 }}
        disabled={isLoadingTransferStripe || isLoadingBookSession}
        loader={isLoadingTransferStripe || isLoadingBookSession}
        label={walletAmount < videoPrice ? "Tap to Recharge" : "Pay Now"}
        onPress={() => {
          if (walletAmount < videoPrice) {
            goToWalletUpdateScreen();
          } else {
            handleSubscribeVideo();
          }
        }}
      />
    </Container>
  );
};

const DetailItem = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.detailItem}>
    <View style={styles.dotView}>
      <FontAwesome name="circle" style={{ color: "#979797" }} />
    </View>
    <View style={{ width: "90%" }}>
      <Text style={styles.textStyle}>
        <Typography weight="700" color="white" size={"heading4"}>
          {label}:
        </Typography>
        {"\n"}
        <Typography weight="300" color="whiteRegular">
          {"          "}
          {value}
        </Typography>
      </Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  mainView: {
    width: "100%",
    backgroundColor: "#000",
    justifyContent: "center",
    borderRadius: 14,
    overflow: "hidden",
  },
  detailItem: {
    width: "100%",
    flexDirection: "row",
    marginBottom: 18,
  },
  dotView: {
    width: "10%",
    alignItems: "center",
  },
  rowView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  textStyle: {
    color: "#979797",
    fontSize: RFValue(12, 580),
    fontFamily: "Poppins-Regular",
  },
  walletText: {
    fontFamily: "Poppins-Regular",
    fontSize: RFValue(17, 580),
    lineHeight: 40,
    color: "#000",
  },
});

export default SubscribeVideoPayment;
