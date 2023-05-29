/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import * as React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import Colors from '../../constants/Colors';
import styles from './styles';
import {SelectStatusesDataInterface} from '../../interfaces';

const SelectStatusCard = ({data, onPressItem, selectedIndex}: any) => {
  return (
    <>
      {data?.map((item: SelectStatusesDataInterface, i: number) => (
        <TouchableOpacity
          activeOpacity={0.8}
          key={i as number}
          onPress={() => {
            onPressItem(i, item);
          }}
          style={[
            selectedIndex === i ? styles.selectedBox : styles.unSelectedBox,
          ]}>
          <View
            style={{
              width: '100%',
              alignItems: 'center',
            }}>
            <View style={{width: '90%', marginTop: 10}}>
              <Text
                style={{
                  fontSize: RFValue(16, 580),
                  color: Colors.white,
                  fontFamily: 'Poppins-Bold',
                }}>
                {item?.title}
              </Text>
            </View>
          </View>
          <View style={{width: '100%', alignItems: 'center'}}>
            <View style={{width: '90%'}}>
              <Text
                style={{
                  fontSize: RFValue(14, 580),
                  fontFamily: 'Poppins-Regular',
                  color: Colors.white,
                }}>
                {item?.content}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </>
  );
};

export default SelectStatusCard;
