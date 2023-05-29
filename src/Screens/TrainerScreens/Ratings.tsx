import React, {useState} from 'react';
import {
  Text,
  View,
  Button,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Modal,
  Image,
  ScrollView,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import * as Images from '../../constants/Images';

const Ratings = ({navigation}) => {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.main}>
      <View style={styles.TopView}>
          <View style={styles.topView}>
            <View style={styles.BoxMianView}>
              <View style={styles.imageView}>
                <Image
                  style={styles.imagestyles}
                  source={Images.Profile}
                />
                <Text style={styles.nameTest}>QAZISAIF</Text>
                <Text style={styles.nameTest}>
                  4.0 <AntDesign name="star" />
                </Text>
              </View>
              <View style={styles.lineView}></View>
              <View style={styles.TextsView}>
                <Text style={styles.TextsStyle}>
                  Lorem ipsum dolor sit amet,{'\n'} consectetur adipiscing elit. In{'\n'}
                  adipiscing ac adipiscing mauris {'\n'}tincidunt varius sollicitudin.
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
export default Ratings;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    paddingTop: Platform.OS === 'ios' ? 40 : 20,
    paddingBottom: Platform.OS === 'ios' ? 0 : 0,
  },
  main: {
    width: '100%',
  },
  footer: {
    width: '100%',
    marginBottom: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
  TopView: {
    width: '100%',
    alignItems: 'center',
  },
  topView: {width: '90%'},
  topView1: {
    width: '90%',
    alignItems: 'center',
  },
  BoxMianView: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: '#000',
    height: 122,
    borderRadius: 20,
    alignItems: 'center',
  },
  imageView: {
    width: '30%',
    alignItems:'center'
  },
  TextsView: {
    width: '70%',
    alignItems: 'center',
  },
  lineView: {
    width: 2,
    height: 100,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  imagestyles: {
    width: 80,
    height: 80,
    borderRadius: 200 / 2,
  },
  nameTest: {
    fontSize: RFValue(10, 580),
    fontFamily: 'Poppins-Regular',
    color: '#fff',
    
  },
  TextsStyle: {
    fontSize: RFValue(10, 580),
    fontFamily: 'Poppins-Regular',
    color: '#fff',
    textAlign: 'auto',
  },
});
