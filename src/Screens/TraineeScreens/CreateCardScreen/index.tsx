/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import { Text, View, TextInput, ScrollView, ToastAndroid, TouchableOpacity, Alert } from "react-native";
import Header from "../../../Components/Header";
import Button from "../../../Components/Button";
import { url } from "../../../constants/url";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import styles from "./styles";
import moment from "moment";
import { NavigationSwitchProp } from "react-navigation";
import { useSelector } from "react-redux";
import { useCreateStripeCardMutation } from "../../../slice/FitsApi.slice";
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
  const [load, setLoad] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const token: string = useSelector((state: { token: string }) => state.token);
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
    <View style={styles.mainContainer}>
      <Header label={"Create Card"} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.mainBody}>
          <View style={styles.inputMainView}>
            <View style={styles.inputTitleView}>
              <Text style={styles.inputTitleText}>Card Number</Text>
            </View>
            <View style={styles.inputTypeMainView}>
              <View style={styles.inputTypeView}>
                <TextInput
                  style={styles.inputTypeStyle}
                  label="Card Number"
                  placeholderTextColor={"#fff"}
                  placeholder="0000 - 0000 - 0000 - 0000"
                  value={cardNumber}
                  keyboardType={"number-pad"}
                  maxLength={19}
                  onChangeText={setCardNumber}
                />
              </View>
            </View>
          </View>

          <TouchableOpacity activeOpacity={0.8} onPress={() => showDatePicker()}>
            <View style={styles.inputMainView}>
              <View style={styles.inputTitleView}>
                <Text style={styles.inputTitleText}>Select Expiry Date</Text>
              </View>
              <View style={styles.inputTypeMainView}>
                <View style={styles.inputTypeView}>
                  <TextInput style={styles.inputTypeStyle} label="Exp Date" placeholderTextColor={"#fff"} placeholder="08-12-2022" value={expDate} editable={false} onChangeText={setExpDate} />
                </View>
              </View>
            </View>
          </TouchableOpacity>

          <View style={styles.inputMainView}>
            <View style={styles.inputTitleView}>
              <Text style={styles.inputTitleText}>CVC</Text>
            </View>
            <View style={styles.inputTypeMainView}>
              <View style={styles.inputTypeView}>
                <TextInput
                  style={styles.inputTypeStyle}
                  label="CVC"
                  placeholderTextColor={"#fff"}
                  placeholder="Enter CVC Number"
                  value={cvc}
                  keyboardType={"number-pad"}
                  maxLength={3}
                  onChangeText={setCVC}
                />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <Button
        // navigation={navigation}
        loader={load || isLoading1}
        label={"Create"}
        disabled={!cardNumber || !expDate || !cvc}
        onPress={() => {
          if (!load) {
            createCall();
          }
        }}
      />
      <DateTimePickerModal isVisible={isDatePickerVisible} mode="date" onConfirm={handleConfirm} onCancel={hideDatePicker} />
    </View>
  );
};
export default CreateCardScreen;
