/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import * as React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import Colors from '../../constants/Colors';
import styles from './styles';
import {} from '../../interfaces';
import Typography from '../../Components/typography/text';

const StatusCard = ({data, onPressItem, selectedIndex}: any) => {
  return (
    <>
      {data?.map((item: any, i: number) => {
        const selected = selectedIndex === i
        return <TouchableOpacity
          activeOpacity={0.8}
          key={i as number}
          onPress={() => {
            onPressItem(i, item);
          }}
          style={[styles.box, 
            selected ? styles.redBorder : null,
          ]}>
              <Typography color='whiteRegular' size='heading2' weight='800' bottom='mb3'>
                {item?.title}
              </Typography>
          <Typography color='lightWhite' size='regularText' weight='400' style={{
                lineHeight: 25
              }}>
                {item?.content}
              </Typography>
        </TouchableOpacity>
      })}
    </>
  );
};

export default StatusCard;
