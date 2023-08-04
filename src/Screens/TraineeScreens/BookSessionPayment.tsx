import React, { useEffect, useMemo, useState } from "react";
import { Text, View, StyleSheet, ScrollView, Pressable, Platform } from "react-native";
import moment from "moment";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { RFValue } from "react-native-responsive-fontsize";
import { useSelector } from "react-redux";
import { RouteProp, useRoute } from "@react-navigation/native";
import { StripeCustomerInterface, UserDetail } from "../../interfaces";
import { useBookASessionMutation, useGetStripeUserQuery, useStripePaymentTransferMutation, } from "../../slice/FitsApi.slice";
import { errorToast, successToast } from "../../utils/toast";
import Container from "../../Components/Container";
import Typography from "../../Components/typography/text";
import { heightPercentageToDP } from "react-native-responsive-screen";
import Entypo from "react-native-vector-icons/Entypo";
import { NavigationSwitchProp } from "react-navigation";
import Header from "../../Components/Header";
import Button from "../../Components/Button";

type RootStackParamList = {
  BookSessionPaymentScreen: BookSessionPaymentParams;
};

interface PropsInterface {
  navigation: NavigationSwitchProp;
}

type BookSessionPaymentParams = {
  data: any;
};

const BookSessionPayment = ({ navigation }: PropsInterface) => {
  const { userInfo } = useSelector((state: { fitsStore: Partial<UserDetail> }) => state.fitsStore);
  const [isDetailsShow, setIsDetailsShow] = useState(false);
  const [cardData, setCardData] = useState<StripeCustomerInterface | null>();
  const route = useRoute<RouteProp<RootStackParamList, "BookSessionPaymentScreen">>();
  const bookSessionParams = route?.params?.data;
  const receiverCustomerId = bookSessionParams.userData?.user?.cus_id;
  const trainerId = bookSessionParams.userData.user._id;
  const sessionId = bookSessionParams.sessionId
  const [bookSessionMutation,  {isLoading: isLoadingBookSession}] = useBookASessionMutation();
  const [tripePaymentTransferMutation, { isLoading: isLoadingTransferStripe }] = useStripePaymentTransferMutation();
  const { refetch: refetchStripeUser } = useGetStripeUserQuery(userInfo?.stripe.customer.id || '');

  const cost = +bookSessionParams.userData?.price;
  const walletAmount = useMemo(() => cardData?.balance ?? 0, [cardData]);

  const getStripeCard = async () => {
    const result = await refetchStripeUser();
    if (result?.data) setCardData(result.data.data);
  };


  const goToWalletUpdateScreen = () => {
    navigation.navigate("WalletForTrainee");
  };


  useEffect(() => {
    navigation.addListener('focus', () => {
      getStripeCard();
    })
  }, []);

  const transferPayment = async () => {
    const body = {
      sender: userInfo?.stripe.card.customer,
      reciver: receiverCustomerId,
      currency: "usd",
      amount: -cost,
      subamount: cost,
    };
    try {
      const result = await tripePaymentTransferMutation(body);
      if (result.data) {
        setCardData((pre) => {
          const deepCopy = { ...pre } as StripeCustomerInterface;
          deepCopy.balance = +deepCopy.balance - +result.data.reciver.amount;
          return deepCopy;
        });
        BookASession()
      }
    } catch (error) {
      errorToast(error?.data?.message);
    }
  };

  const BookASession = async () => {
    const body = {
      sessionId,
      trainerId,
      sender: userInfo?.stripe.card.customer,
      receiver: receiverCustomerId,
      currency: "usd",
      amount: -cost,
      subamount: cost
    }
   const result = await bookSessionMutation(body)
    if (result.data) {
      successToast('Booking Successfully')
        navigation.navigate("Home");
    } else if (result.error) {
      errorToast(result.error?.data.message);
    }
    }


  const renderDetails = () => {
    return (
      <View style={{ padding: heightPercentageToDP(2) }}>
        <DetailItem label="Cost" value={`$${route?.params?.data?.userData?.price}`} />
        <DetailItem
          label="Type"
          value={route?.params?.data?.userData?.session_type.type}
        />
        <DetailItem
          label="Title"
          value={route?.params?.data?.userData?.class_title}
        />
        <DetailItem
          label="Description"
          value={route?.params?.data?.userData?.details}
        />
      </View>
    );
  };

  return (
    <Container>
      <Header label={"Payment"} subLabel={"Pay before the class starts"} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.marchmainview}>
          <View style={styles.marchmainview2}>
            <View style={{ width: "27%", alignItems: "center" }}>
              <Text style={styles.marchtext}>
                {moment(bookSessionParams.userData?.select_date).format("DD MMMM")}
              </Text>
              <Typography color="white" children={moment(bookSessionParams.userData?.select_date).format("ddd")} />
            </View>
            <View style={{ width: "5%", alignItems: "center" }}>
              <View
                style={{
                  width: 2,
                  height: 50,
                  backgroundColor: "#fff",
                }}
              />
            </View>
            <View style={{ width: "30%", flexDirection: "column" }}>
              <Text
                style={{
                  color: "#fff",
                  fontSize: RFValue(10, 580),
                  fontFamily: "Poppins-Regular",
                }}
              >
                {moment(bookSessionParams.userData?.class_time).format('hh:mm A')}
              </Text>
            </View>
            <Pressable
              onPress={() => setIsDetailsShow(!isDetailsShow)}
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
                <Entypo name={isDetailsShow ? "chevron-up" : "chevron-down"} size={18} color={"#fff"} />
              </View>
            </Pressable>
          </View>
          {isDetailsShow && renderDetails()}
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: "center", marginTop: 10 }}>
          <Typography size={"heading2"} weight="600">Total Cost</Typography>
          <Typography size={"heading2"} weight="600">$ {cost}</Typography>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: "center", marginTop: 5 }}>
          <Typography size={"heading3"} style={styles.walletText}>Wallet</Typography>
          <Typography size={"heading3"} style={styles.walletText}>$ {cardData?.balance}</Typography>
        </View>
        </ScrollView>
        {walletAmount < cost ? (
          <Typography
            style={{ marginBottom: 30, textTransform: 'uppercase' }}
            size={'heading4'}
            align="center"
            weight="bold"
            color="grayTransparent"
            children={`You have insufficient balance`}
          />
        ) : null}
          <Button
            style={{ marginBottom: 12 }}
            disabled={isLoadingTransferStripe || isLoadingBookSession}
            loader={isLoadingTransferStripe || isLoadingBookSession}
            label={walletAmount < cost ? "Tap to Recharge" : "Pay Now"}
            onPress={() => {
              if (walletAmount < cost) {
                goToWalletUpdateScreen();
              } else {
                transferPayment();
              }
            }}
          />
    </Container>
  );
};

const DetailItem = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.dotmainview}>
    <View style={styles.dotview}>
      <FontAwesome name="circle" style={{ color: "#979797" }} />
    </View>
    <View style={{ width: "90%" }}>
      <Text style={styles.textstyle}>
        <Typography weight="700" color="white" size={"heading4"}>{label}:</Typography>
        {"\n"}
        <Typography weight="300" color="whiteRegular">{"          "}{value}</Typography>
      </Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingTop: Platform.OS === "ios" ? 40 : 0,
    paddingBottom: 0,
  },
  header: {
    width: "100%",
    height: 120,
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
    height: 70,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  main: {
    width: "100%",
    height: "100%",
    paddingVertical: 10,
  },
  TopView: {
    width: "100%",
    alignItems: "center",
  },
  topView: {
    width: "100%",
  },
  rowView: {
    width: "100%",
    flexDirection: "row",
  },
  borderView: {
    width: "100%",
    borderWidth: 1,
    bordercolor: "#000",
  },
  textstyle: {
    color: "#979797",
    fontSize: RFValue(12, 580),
    fontFamily: "Poppins-Regular",
  },
  dotmainview: {
    width: "100%",
    flexDirection: "row",
    marginBottom: 10
  },
  dotview: {
    width: "10%",
    alignItems: "center",
  },
  marchmainview: {
    width: "100%",
    backgroundColor: "#000",
    justifyContent: "center",
    borderRadius: 14,
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
  mainbtnView: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#fff",
  },
  ccbtnview: {
    backgroundColor: "#ff0000",
    width: 100,
    height: 45,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  profilebtnview: {
    backgroundColor: "#ff0000",
    width: 100,
    height: 45,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
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
  paymenttextstyle: {
    fontSize: RFValue(20, 580),
    fontFamily: "Poppins-Bold",
    color: "#000000",
    lineHeight: 51,
  },
  beforclasstextstyle: {
    fontSize: RFValue(12, 580),
    fontFamily: "Poppins-Regular",
    color: "#000000",
    lineHeight: 25,
  },
  totalView: {
    width: "50%",
  },
  $10View: {
    width: "50%",
    alignItems: "flex-end",
  },
  totalText: {
    fontFamily: "Poppins-Bold",
    fontSize: RFValue(17, 580),
    lineHeight: 50,
    color: "#000",
  },
  walletText: {
    fontFamily: "Poppins-Regular",
    fontSize: RFValue(17, 580),
    lineHeight: 40,
    color: "#000",
  },
  footer: {
    width: "100%",
    marginBottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  btn: {
    padding: 10,
    width: "90%",
    borderRadius: 10,
    backgroundColor: "#FF0000",
    alignItems: "center",
    justifyContent: "center",
  },
  paytextstyle: {
    color: "#FFFFFF",
    fontSize: RFValue(12, 580),
    fontFamily: "Poppins-SemiBold",
  },
});
export default BookSessionPayment;
