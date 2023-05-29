/* eslint-disable prettier/prettier */
import * as React from 'react';
import {View, Text} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {RFValue} from 'react-native-responsive-fontsize';
import styles from './styles';
import Colors from '../../constants/Colors';

const Header = ({
  label,
  subLabel,
  navigation,
  doubleHeader,
  rightLabelStatus,
  rightLabel,
}: any) => {
  const goBack = () => {
    navigation.goBack();
  };
  return (
    <View
      style={[
        doubleHeader ? styles.mainHeaderRectForDouble : styles.mainHeaderRect,
      ]}>
      <View style={styles.firstArrowHeaderRect1}>
        <View style={styles.widthView}>
          <AntDesign
            onPress={() => goBack()}
            name="arrowleft"
            style={{
              fontSize: 27,
              color: '#130F26',
            }}
          />
        </View>
      </View>
      {rightLabelStatus ? (
        <View
          style={[
            doubleHeader
              ? styles.bottomHeaderRect2ForDoubleRow
              : styles.bottomHeaderRect2,
          ]}>
          <View style={styles.col1}>
            <Text
              style={{
                fontSize: RFValue(24, 580),
                fontFamily: 'Poppins-Bold',
                color: Colors.black,
                marginTop: 10,
              }}>
              {label}
            </Text>
            <Text style={styles.secondText}>{subLabel}</Text>
          </View>

          <View style={styles.col2}>{rightLabel}</View>
        </View>
      ) : (
        <View
          style={[
            doubleHeader
              ? styles.bottomHeaderRect2ForDouble
              : styles.bottomHeaderRect2,
          ]}>
          <Text
            style={{
              fontSize: RFValue(24, 580),
              fontFamily: 'Poppins-Bold',
              color: Colors.black,
              marginTop: 10,
            }}>
            {label}
          </Text>
          <Text style={styles.secondText}>{subLabel}</Text>
        </View>
      )}
    </View>
  );
};

export default Header;
