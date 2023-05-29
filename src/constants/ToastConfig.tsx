/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import {RFValue} from 'react-native-responsive-fontsize';

export const toastConfig = {
  error: ({text1}: any) => {
    return (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          width: 'auto',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#f2f2f2',
          paddingVertical: 12,
          paddingHorizontal: 'auto',
          borderRadius: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            width: 'auto',
          }}>
          <Entypo
            size={23}
            color="red"
            style={{
              width: 'auto',
              alignSelf: 'flex-end',
              paddingLeft: 10,
            }}
            name="circle-with-cross"
          />
          <Text
            style={{
              fontSize: RFValue(13),
              fontWeight: '500',
              color: '#625c77',
              width: 'auto',
              fontFamily: 'Poppins-Regular',
              paddingHorizontal: 10,
            }}>
            {text1}
          </Text>
        </View>
      </TouchableOpacity>
    );
  } /*
          Or create a completely new type - `tomatoToast`,
          building the layout from scratch.
      
          I can consume any custom `(props:any)` I want.
          They will be passed when calling the `show` method (see below)
        */,
  success: ({text1}: any) => {
    return (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          width: 'auto',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#f2f2f2',
          paddingVertical: 12,
          paddingHorizontal: 'auto',
          borderRadius: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            width: 'auto',
          }}>
          <AntDesign
            size={23}
            color="#13d9b1"
            style={{width: 'auto', alignSelf: 'flex-end', paddingLeft: 10}}
            name="checkcircle"
          />
          <Text
            style={{
              fontSize: RFValue(13),
              fontWeight: '500',
              color: '#625c77',
              width: 'auto',
              fontFamily: 'Poppins-Regular',
              paddingHorizontal: 10,
            }}>
            {text1}
          </Text>
        </View>
      </TouchableOpacity>
    );
  },
};
