import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import Header from "../../../Components/Header";
import Button from "../../../Components/Button";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import RNRestart from 'react-native-restart';
import moment from "moment";
import { NavigationSwitchProp } from "react-navigation";
import TextInput from "../../../Components/Input";
import Container from "../../../Components/Container";
import { useSelector } from "react-redux";
import { useCreateStripeCardMutation, useGetUserMeQuery } from "../../../slice/FitsApi.slice";
import { errorToast } from "../../../utils/toast";
import { storeUserDataInAsyncStorage } from "../../../utils/async-storage";
import { handleConfirmAlert } from "../../../utils/handle-confirm";

interface Props {
  navigation: NavigationSwitchProp;
}

const CreateCardScreen: React.FC<Props> = ({ navigation }) => {
  // Hooks
  const [cardNumber, setCardNumber] = useState("");
  const [expDate, setExpDate] = useState("");
  const [expMonth, setExpMonth] = useState("");
  const [expYear, setExpYear] = useState("");
  const [cvc, setCVC] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const { createStripeData } = useSelector((state: any) => state.fitsStore);
  const { refetch: getUserInfoFromUserMe, data: userInfo } = useGetUserMeQuery({});
  const [createStripeCard, { isLoading }] = useCreateStripeCardMutation();
  
  const handleConfirm = (date: moment.MomentInput) => {
    setExpMonth(moment(date).format("MM"));
    setExpYear(moment(date).format("YYYY"))
    setExpDate(moment(date).format("MMMM - YYYY"));
    setDatePickerVisibility(false);
  };

  React.useEffect(() => {
    if (cardNumber.length === 4) setCardNumber(cardNumber + " ");
    else if (cardNumber.length === 9) setCardNumber(cardNumber + " ");
    else if (cardNumber.length === 14) setCardNumber(cardNumber + " ");
  }, [cardNumber]);

  const updateUserInfoInAsyncStorage = async () => {
    const result = await getUserInfoFromUserMe()
    if (result?.data) {
      await storeUserDataInAsyncStorage(JSON.stringify(result.data))
      handleConfirmAlert("You must restart your app",() => RNRestart.restart());      
    }
  }

  const addCraditCard = async () => {
    if (createStripeData) {
        const body = {
          card_number: cardNumber.replace(/\s/g, ""),
          exp_month: expMonth,
          exp_year: expYear,
          cvc: cvc,
        };
        const result = await createStripeCard({ id: userInfo?.user.cus_id, body})
      if (result?.error) {
        errorToast(result.error?.data.message);
      } else if (result?.data) {  
        updateUserInfoInAsyncStorage()
      }
    }
  };



  return (
    <Container>
      <Header label={"Add Payment Card"}/>

        <View style={styles.mainBody}>
                <TextInput
                  label="Card Number"
                  placeholderTextColor={"#9f9f9f"}
                  placeholder="0000 - 0000 - 0000 - 0000"
                  value={cardNumber}
                  keyboard={"phone-pad"}
                  maxLength={19}
                  onChangeText={setCardNumber}
                />
                <TextInput
                  label="Choose Date"
                  placeholderTextColor={"#9f9f9f"}
                  placeholder="Touch Here"
                  value={expDate}
                  handleOnPress={() => setDatePickerVisibility(true)}
                  isEditable={false}
                />
                <TextInput
                  label="CVC"
                  placeholderTextColor={"#9f9f9f"}
                  placeholder="CVC"
                  value={cvc}
                  keyboard="phone-pad"
                  maxLength={3}
                  onChangeText={setCVC}
                />
        </View>
      <Button
        loader={isLoading}
        label={"Create"}
        disabled={!cardNumber || !expDate || !cvc} onPress={addCraditCard}
      />
      <DateTimePickerModal isVisible={isDatePickerVisible} mode="date" onConfirm={handleConfirm} onCancel={() => setDatePickerVisibility(false)} />
    </Container>
  );
};
export default CreateCardScreen;


const styles = StyleSheet.create({
  mainBody: {
    width: "100%",
  },
});
