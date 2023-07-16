/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import { Text, View, ScrollView, ToastAndroid, TouchableOpacity, Alert } from "react-native";
import Header from "../../../Components/Header";
import Button from "../../../Components/Button";
import { url } from "../../../constants/url";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import { NavigationSwitchProp } from "react-navigation";
import { useSelector } from "react-redux";
import { useCreateStripeCardMutation } from "../../../slice/FitsApi.slice";
import TextInput from "../../../Components/Input";
import Container from "../../../Components/Container";
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
  const [createStripeCard, { isLoading: isLoading1 }] = useCreateStripeCardMutation();
  // Functions
  const showDatePicker = () => {
    setDatePickerVisibility(!isDatePickerVisible);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  React.useEffect(() => {
    if (cardNumber.length === 4) setCardNumber(cardNumber + " ");
    else if (cardNumber.length === 9) setCardNumber(cardNumber + " ");
    else if (cardNumber.length === 14) setCardNumber(cardNumber + " ");
  }, [cardNumber]);

  const handleConfirm = (date: moment.MomentInput) => {
    setExpDate(moment(date).format("DD-MM-YYYY"));
    setExpMonth(moment(date).format("MM"));
    setExpYear(moment(date).format("YYYY"));
    hideDatePicker();
  };

  const createCall = async () => {
    if (createStripeData) {
      try {
        const body = {
          card_number: cardNumber.replace(/\s/g, ""),
          exp_month: expMonth,
          exp_year: expYear,
          cvc: cvc,
        };
        await createStripeCard({
          id: createStripeData?.cus_id,
          ...body,
        })
          .unwrap()
          .then((payload) => {
            if (payload?.message === "card created successfully...") {
              ToastAndroid.show("Card created Successfully...", ToastAndroid.LONG);
              navigation.goBack();
            } else {
              ToastAndroid.show(payload?.message, ToastAndroid.SHORT);
            }
          })
      } catch (error: any) {
        Alert.alert(error.message);
      }
    }
  };

  return (
    <Container>
      <Header label={"Create Card"} />

                <TextInput
                  label="Card Number"
                  placeholderTextColor={"#fff"}
                  placeholder="0000 - 0000 - 0000 - 0000"
                  value={cardNumber}
                  keyboard={"phone-pad"}
                  maxLength={19}
                  onChangeText={setCardNumber}
                />
                  <TextInput isEditable={false} handleOnPress={showDatePicker} label="Select Expiry Date" placeholderTextColor={"#fff"} placeholder="08-12-2022" value={expDate} editable={false} onChangeText={setExpDate} />
                <TextInput
                  label="CVC"
                  placeholderTextColor={"#fff"}
                  placeholder="Enter CVC Number"
                  value={cvc}
                  keyboard={"phone-pad"}
                  maxLength={3}
                  onChangeText={setCVC}
                />
      <Button
        loader={isLoading1}
        label={"Create"}
        disabled={!cardNumber || !expDate || !cvc}
        onPress={createCall}
      />
      <DateTimePickerModal isVisible={isDatePickerVisible} mode="date" onConfirm={handleConfirm} onCancel={hideDatePicker} />
    </Container>
  );
};
export default CreateCardScreen;
