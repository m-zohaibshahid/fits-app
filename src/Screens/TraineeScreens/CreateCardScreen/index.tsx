/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {
  Text,
  View,
  TextInput,
  ScrollView,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';
import Header from '../../../Components/Header';
import Button from '../../../Components/Button';
import {url} from '../../../constants/url';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';
import moment from 'moment';

const CreateCardScreen = ({navigation}) => {
  // Hooks
  const [cardNumber, setCardNumber] = useState('');
  const [expDate, setExpDate] = useState('');
  const [expMonth, setExpMonth] = useState('');
  const [expYear, setExpYear] = useState('');
  const [cvc, setCVC] = useState('');
  const [load, setLoad] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  // Functions
  const showDatePicker = () => {
    setDatePickerVisibility(!isDatePickerVisible);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  React.useEffect(() => {
    if (cardNumber.length === 4) setCardNumber(cardNumber + ' ');
    else if (cardNumber.length === 9) setCardNumber(cardNumber + ' ');
    else if (cardNumber.length === 14) setCardNumber(cardNumber + ' ');
  }, [cardNumber]);

  const handleConfirm = date => {
    setExpDate(moment(date).format('DD-MM-YYYY'));
    setExpMonth(moment(date).format('MM'));
    setExpYear(moment(date).format('YYYY'));
    hideDatePicker();
  };

  const createCall = async () => {
    setLoad(true);
    const userData = await AsyncStorage.getItem('createStripeData');
    let userDatax = JSON.parse(userData);
    const userTokendata = await AsyncStorage.getItem('userData');
    let userTokendatax = JSON.parse(userTokendata);
    if (userDatax) {
      const body = {
        card_number: cardNumber,
        exp_month: expMonth,
        exp_year: expYear,
        cvc: cvc,
      };
      await fetch(`${url}/stripe/card/${userDatax?.cus_id}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userTokendatax?.access_token}`,
        },
        body: JSON.stringify({
          card_number: cardNumber,
          exp_month: expMonth,
          exp_year: expYear,
          cvc: cvc,
        }),
      })
        .then(res => res.json())
        .then(res2 => {
          setLoad(false);
          if (res2?.message === 'card created successfully...') {
            ToastAndroid.show(
              'Card created Successfully...',
              ToastAndroid.LONG,
            );
            navigation.goBack();
          } else {
            ToastAndroid.show(res2?.message, ToastAndroid.SHORT);
          }
        })
        .catch(error => {
          setLoad(false);
          console.log(error);
        });
    }
  };

  return (
    <View style={styles.mainContainer}>
      <Header label={'Create Card'} navigation={navigation} />

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
                  placeholderTextColor={'#fff'}
                  placeholder="0000 - 0000 - 0000 - 0000"
                  value={cardNumber}
                  keyboardType={'number-pad'}
                  maxLength={19}
                  onChangeText={setCardNumber}
                />
              </View>
            </View>
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => showDatePicker()}>
            <View style={styles.inputMainView}>
              <View style={styles.inputTitleView}>
                <Text style={styles.inputTitleText}>Select Expiry Date</Text>
              </View>
              <View style={styles.inputTypeMainView}>
                <View style={styles.inputTypeView}>
                  <TextInput
                    style={styles.inputTypeStyle}
                    label="Exp Date"
                    placeholderTextColor={'#fff'}
                    placeholder="08-12-2022"
                    value={expDate}
                    editable={false}
                    onChangeText={setExpDate}
                  />
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
                  placeholderTextColor={'#fff'}
                  placeholder="Enter CVC Number"
                  value={cvc}
                  keyboardType={'number-pad'}
                  maxLength={3}
                  onChangeText={setCVC}
                />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <Button
        navigation={navigation}
        loader={load}
        label={'Create'}
        disabled={!cardNumber || !expDate || !cvc}
        onPress={() => {
          if (!load) {
            createCall();
          }
        }}
      />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
};
export default CreateCardScreen;
