/* eslint-disable react/self-closing-comp */
import React from 'react';
import {View, ImageBackground} from 'react-native';
import * as Images from '../../../constants/Images';
import styles from './style';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
        resizeMode="stretch"
        style={styles.mainBgImage}
        source={Images.welcomeBgImage}></ImageBackground>
    </View>
  );
};

export default SplashScreen;
