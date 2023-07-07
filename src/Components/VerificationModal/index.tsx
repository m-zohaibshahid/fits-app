import React, { useState, useEffect, useRef } from 'react';
import { View, Pressable, StyleSheet, Platform, Modal, Alert } from 'react-native';
import { CodeField, Cursor } from 'react-native-confirmation-code-field';
import Button from '../Button';
import {  useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Typography from '../typography/text';
import { RFValue } from 'react-native-responsive-fontsize';
import Colors from '../../constants/Colors';
import { useCodeVerifyMutation, useResendVarificationCodeMutation } from '../../slice/FitsApi.slice';

interface VerificationScreenProps {
  isVisible: boolean;
  onClose: () => void;
  email: string;
  code: number;
  afterVarified: () => void;
}

const VarificationModal: React.FC<VerificationScreenProps> = ({ isVisible, onClose, email, code, afterVarified }) => {
  const CELL_COUNT = 5;
  const [varificationCode, setVarificationCode] = useState<number>();
  const [inputValue, setInputValue] = useState('');
  const [remainingTime, setRemainingTime] = useState(0);
  const [mutateAsyncVarification, { isLoading }] = useCodeVerifyMutation();
  const [mutateAsyncResendCode] = useResendVarificationCodeMutation();

  // Functions
  

  useEffect(() => {
    const timerId = setInterval(() => setRemainingTime(prevTime => prevTime - 1), 1000)
    return () => clearInterval(timerId);
  }, [])

  // Effect
  useEffect(() => {
    setRemainingTime(30);
  }, []);

  const handleVarification = async () => {
    setInputValue('');
    const body = {
      email: email,
      code: inputValue,
      type : "verification"
    }

    const result = await mutateAsyncVarification(body) as any
    if (result?.data?.message === 'verified') afterVarified()
    if (!!result.error) Alert.alert(result.error.data.message)
  };
  
  const handleResendCode = async () => {
    setInputValue('');
    if (remainingTime > 0) return

    const body = {
      email: email,
    }
    const result = await mutateAsyncResendCode(body) as any
    if (result.data) {
      setVarificationCode(result.data.code)
      setRemainingTime(30)
    }
    if (!!result.error) Alert.alert(result.error.data.message)
  }

  useEffect(() => {
    setVarificationCode(code)
  }, []);

  return (
    <Modal animationType='fade' transparent={true} visible={isVisible} onRequestClose={onClose}>
      <View  style={styles.bottomView}>
      <View  style={styles.modalContainer}>
        <Typography variant='heading' bottom={'mb5'} size={'heading1'} weight='800'>
          Verification
        </Typography>
        <Typography variant='heading' bottom={'mb3'} size={'heading4'} weight='400' color='grayTransparent'>
          Verification code has been sent to your email address
        </Typography>
        <Typography size={'heading3'}>Please enter this code - {varificationCode}</Typography>
        <View style={{ marginTop: 20, marginBottom: 38 }}>
          <CodeField
            value={inputValue}
            onChangeText={setInputValue}
            cellCount={CELL_COUNT}
            rootStyle={styles.codeFieldRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({ index, symbol, isFocused }) => (
              <View style={{ borderBottomWidth: 1 }} key={index}>
                <Typography style={[styles.cell, isFocused && styles.focusCell]}>
                  {symbol || (isFocused && <Cursor />)}
                </Typography>
              </View>
            )}
          />
        </View>

        <Button
          label='Next'
          loader={isLoading}
          disabled={isLoading}
          onPress={handleVarification}
        />

        <View style={styles.footerviewmain}>
          <Pressable
            style={styles.bottomTextMainRect}
            onPress={handleResendCode}
          >
            <Typography>{remainingTime > 0 ? "Resend code in " : "Didn’t get verification code?"}</Typography>
            <Typography style={{ marginLeft: 4 }} color={remainingTime > 0 ? 'black' : 'redColor'}>
              {remainingTime > 0 ? `00:${remainingTime}` : '  Resend email'}
            </Typography> 
          </Pressable>
        </View>
      </View>
      </View>
    </Modal>
  );
};

export default VarificationModal;

const styles = StyleSheet.create({
  bottomView: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: Colors.transparentBlack,
  },
  modalContainer: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    paddingHorizontal: 24,
    paddingTop: 28,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 6.84,
    elevation: 9,
  },
  codeFieldRoot: {
    marginTop: Platform.OS === 'ios' ? 40 : 10,
    width: '75%',
    alignSelf: 'center',
  },
  cell: {
    width: 22,
    height: 22,
    lineHeight: 26,
    fontSize: RFValue(18, 580),
    margin: 10,
    textAlign: 'center',
    color: Colors.black,
  },
  focusCell: {
    borderColor: Colors.black,
  },
  footerviewmain: {
    width: '100%',
    marginTop: '10%',
    marginBottom: 20,
  },
  bottomTextMainRect: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
