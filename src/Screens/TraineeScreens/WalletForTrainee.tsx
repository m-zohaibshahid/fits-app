import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator, Platform, FlatList } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import Header from "../../Components/Header";
import { NavigationSwitchProp } from "react-navigation";
import { useRechargeStripeMutation, useStripeCustomerGetQuery } from "../../slice/FitsApi.slice";
import { useSelector } from "react-redux";
import Typography from "../../Components/typography/text";
import Container from "../../Components/Container";
import { UserDetail } from "../../interfaces";
import { errorToast } from "../../utils/toast";

interface Props {
  navigation: NavigationSwitchProp;
}

const WalletForTrainee: React.FC<Props> = ({ navigation }) => {
  const { userInfo } = useSelector((state: { fitsStore: Partial<UserDetail> }) => state.fitsStore);
  const [rechargeStripeMutate, { isLoading: isUpdateLoading }] = useRechargeStripeMutation();
  const [cardData, setCardData] = useState();
  const { refetch: getStripeCustomer } = useStripeCustomerGetQuery(userInfo?.user.cus_id ?? '')

  const getStripeCard = async () => {
    const result = await getStripeCustomer()
    if (result?.data) {
      setCardData(result.data.data)
    } else if (result?.error) {
      errorToast(result.error?.data?.message)
    }
  };

  useEffect(() => {
    navigation.addListener('focus', () => {
      getStripeCard();
    })
  }, []);

  const rechargeAccount = async (amount: number) => {
    const body = {
      amount: amount,
      currency: "USD",
      source: cardData?.default_source, // userInfo?.stripe.card.id,
      description: "Recharge Account",
    };

    const result = await rechargeStripeMutate({ id: userInfo?.user.cus_id, body })
    if (result.data) getStripeCard()
    if (result?.error) errorToast(result.error?.data?.message);
  };

  const renderRechargeOption = ({ item }: {  item: { amount1: number, amount2: number }}) => {
    return (
    <View style={{flexDirection: "row", justifyContent: "space-between"}}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => rechargeAccount(item.amount1)}
        style={styles.boxView}
        >
          {isUpdateLoading ? <ActivityIndicator /> : <><Typography size={'heading4'} color="white">Add</Typography>
          <Typography size={'heading4'} color="whiteRegular">$ {item.amount1}</Typography></>}
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => rechargeAccount(item.amount2)}
        style={styles.boxView}
        >
          {isUpdateLoading ? <ActivityIndicator /> : <><Typography size={'heading4'} color="white">Add</Typography>
          <Typography size={'heading4'} color="whiteRegular">$ {item.amount2}</Typography></>}
      </TouchableOpacity>
    </View>
    );
  };

  return (
    <Container>
      <Header label={"Wallet"} subLabel={"Add cash to your account by selecting any plan."} />
      <ScrollView showsVerticalScrollIndicator={false} style={styles.main}>
            <View style={{ marginBottom: 20, justifyContent: 'space-between', flexDirection: "row" }}>
                <Typography weight="700" size={'large'}>Total balance</Typography>
                <Typography weight="500" size={'large'}>$ {cardData?.balance}</Typography>
            </View>
              <Typography bottom={"mb10"} weight="700" size={'regularText'} >Select Wallet Top Up Amount</Typography>
                <FlatList
                  data={rechargeOptions}
                  renderItem={renderRechargeOption}
                />
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingTop: Platform.OS === "ios" ? 40 : 0,
  },
  header: {
    width: "100%",
    height: 250,
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
    height: 200,
    width: "100%",
    justifyContent: "center",
  },
  main: {
    width: "100%",
  },
  footer: {
    width: "100%",
    marginBottom: 20,
    bottom: 0,
    alignItems: "center",
    position: "absolute",
    backgroundColor: "#fff",
  },
  topView1: {
    width: "100%",
    alignItems: "center",
  },
  WalletText: {
    fontFamily: "Poppins-Bold",
    fontSize: RFValue(19, 580),
    color: "#000",
  },
  AddCashText: {
    fontFamily: "Poppins-Regular",
    fontSize: RFValue(13, 580),
    color: "#ABABB5",
  },
  FlexView: {
    width: "100%",
    flexDirection: "row",
    marginTop: 15,
  },
  totalTextstyle: {
    fontFamily: "Poppins-SemiBold",
    color: "#000",
    lineHeight: 28,
    fontSize: RFValue(15, 580),
  },
  moneyTextstyle: {
    fontFamily: "Poppins-Regular",
    color: "#000",
    lineHeight: 28,
    fontSize: RFValue(15, 580),
  },
  SelectText: {
    fontFamily: "Poppins-SemiBold",
    color: "#000",
    fontSize: RFValue(13, 580),
    fontStyle: "normal",
  },
  selectView: {
    marginTop: 30,
  },
  boxView: {
    width: 150,
    borderRadius: 20,
    marginVertical: 5,
    backgroundColor: "#000",
    justifyContent: "space-between",
    padding: 20,
    alignItems: "center",
    flexDirection: 'row'
  },
  FlexboxView: {
    width: "100%",
    flexDirection: "row",
    padding: 20,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
});

export default WalletForTrainee;


const rechargeOptions = [
  { amount1: 30, amount2: 60 },
  { amount1: 100, amount2: 130 },
  { amount1: 150, amount2: 170 },
  { amount1: 200, amount2: 230 },
  { amount1: 260, amount2: 300 },
];