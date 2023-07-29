import React, { useState } from "react";
import { Text, View, ScrollView, ToastAndroid, TouchableOpacity, Alert } from "react-native";
import Header from "../../../Components/Header";
import Button from "../../../Components/Button";
import { url } from "../../../constants/url";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./styles";
import moment from "moment";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { NavigationSwitchProp } from "react-navigation";
import TextInput from "../../../Components/Input";
import Container from "../../../Components/Container";
import { useSelector } from "react-redux";
import { useCreateStripeCardMutation } from "../../../slice/FitsApi.slice";
import { errorToast } from "../../../utils/toast";

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

  const createCall = async () => {
    if (createStripeData) {
        const body = {
          card_number: cardNumber.replace(/\s/g, ""),
          exp_month: expMonth,
          exp_year: expYear,
          cvc: cvc,
        };
        const result = await createStripeCard({
          id: createStripeData?.cus_id,
          ...body,
        })
        if (result?.data) navigation.goBack();
        else if (result?.error) errorToast(result.error.data.message)
    }
  };

  return (
    <Container>
      <Header label={"Create Card"}/>

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
        disabled={!cardNumber || !expDate || !cvc} onPress={createCall}
      />
      <DateTimePickerModal isVisible={isDatePickerVisible} mode="date" onConfirm={handleConfirm} onCancel={() => setDatePickerVisibility(false)} />
    </Container>
  );
};
export default CreateCardScreen;
