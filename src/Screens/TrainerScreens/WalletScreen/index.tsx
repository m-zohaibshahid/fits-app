import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, ScrollView, Pressable, ActivityIndicator, Linking } from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import moment from "moment";
import { RFValue } from "react-native-responsive-fontsize";
import Header from "../../../Components/Header";
import Button from "../../../Components/Button";
import Container from "../../../Components/Container";
import Colors from "../../../constants/Colors";
import Typography from "../../../Components/typography/text";
import { useSelector } from "react-redux";
import { useConnectAccountLinkMutation, useGetStripeUserQuery } from "../../../slice/FitsApi.slice";
import { NavigationSwitchProp } from "react-navigation";
import { StripeCustomerInterface, UserDetail, Transaction } from "../../../interfaces";

interface Props {
  navigation: NavigationSwitchProp;
}

const WalletScreen: React.FC<Props> = ({ navigation }) => {
  const [details, setDetails] = useState(false);
  const { userInfo } = useSelector((state: { fitsStore: Partial<UserDetail> }) => state.fitsStore);
  const [cardData, setCardData] = useState<StripeCustomerInterface | null>();
  console.log("userInfo?.stripe?.card?.customer", userInfo?.stripe?.card?.country);
  const { refetch: refetchStripeUser, isLoading } = useGetStripeUserQuery(userInfo?.stripe?.card?.customer || "");
  const [connectAccountLink, { data, isLoading: isLoading1 }] = useConnectAccountLinkMutation();

  useEffect(() => {
    navigation.addListener("focus", () => {
      getStripeCard();
    });
  }, []);

  const getStripeCard = async () => {
    try {
      const result = await refetchStripeUser();
      if (result?.data) setCardData(result.data.data);
    } catch (error) {
      // Handle error here
    }
  };
  const handleWithDrawFunds = async () => {
    const body = {
      email: userInfo?.user?.email,
      type: "express",
      country: userInfo?.stripe?.card?.country,
    };
    const responseConnectAccountLink: any = await connectAccountLink(body).unwrap();
    if (responseConnectAccountLink.data.url) {
      await Linking.openURL(responseConnectAccountLink.data.url);
    } else {
      console.log("Already account link.");
      navigation.navigate("WalletForTrainee");
    }
  };

  // Render transaction history
  const renderTransactionHistory = (transactions: Transaction[] | undefined) => {
    if (!transactions) return null;
    return transactions.map((transaction, index) => (
      <View key={index} style={styles.transactionItem}>
        <View style={styles.dateView}>
          <Typography color="white" size="heading4" weight="500">
            {moment(transaction.createdAt).format("DD-MMMM")}
          </Typography>
        </View>
        <View style={styles.separator} />
        <View style={styles.transactionInfo}>
          <Text style={styles.transactionText}>
            {transaction.name}
            <Text style={styles.transactionDetail}>{`\n          ${transaction.description}`}</Text>
          </Text>
        </View>
        <Pressable onPress={() => setDetails(!details)} style={styles.detailsButton}>
          <View style={styles.detailsButtonView}>
            <Text style={styles.detailsButtonText}>Details</Text>
            <Entypo name={details ? "chevron-up" : "chevron-down"} size={18} color={"#fff"} />
          </View>
        </Pressable>
      </View>
    ));
  };

  if (isLoading || isLoading1) return <ActivityIndicator />;

  return (
    <Container>
      <Header label={"Wallet"} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.walletBoxTextView}>
          <Typography color="white" size="heading1">
            Total balance
          </Typography>
          <Typography color="white" size="heading1" weight="900">
            $ {cardData?.balance ?? 0}
          </Typography>
        </View>
        <View style={styles.transactionHistoryView}>{renderTransactionHistory(userInfo?.transactions)}</View>
      </ScrollView>
      <Button disabled={!cardData?.balance} style={{ marginBottom: 10 }} label={"Withdraw Funds"} onPress={() => handleWithDrawFunds()} />
    </Container>
  );
};

const styles = StyleSheet.create({
  walletBoxTextView: {
    justifyContent: "center",
    alignItems: "center",
    rowGap: 15,
    backgroundColor: Colors.black,
    borderRadius: 12,
    height: 150,
  },
  transactionHistoryView: {
    marginTop: 20,
    width: "100%",
    backgroundColor: "#000",
    justifyContent: "center",
    borderRadius: 12,
  },
  transactionItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 9,
  },
  dateView: {
    width: "20%",
    alignItems: "center",
    backgroundColor: "red",
  },
  separator: {
    width: 2,
    height: 50,
    backgroundColor: "#fff",
  },
  transactionInfo: {
    width: "35%",
    flexDirection: "column",
  },
  transactionText: {
    color: "#fff",
    fontSize: RFValue(12, 580),
    fontFamily: "Poppins-SemiBold",
  },
  transactionDetail: {
    color: "#fff",
    fontSize: RFValue(10, 580),
    fontFamily: "Poppins-Regular",
  },
  detailsButton: {
    width: "30%",
    backgroundColor: "#414143",
    alignItems: "center",
    borderRadius: 12,
    height: 50,
    justifyContent: "center",
  },
  detailsButtonView: {
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
  },
  detailsButtonText: {
    color: "#fff",
    fontSize: RFValue(14, 580),
    fontFamily: "Poppins-Regular",
    textAlign: "center",
  },
});

export default WalletScreen;
