/* eslint-disable prettier/prettier */
import React from 'react';
import {Text, View, ImageBackground, Pressable} from 'react-native';
import * as Images from '../../../constants/Images';
import Button from '../../../Components/Button';
import styles from './styles';

const WelcomeScreen = ({navigation}: any) => {
  // Functions
  const goToNext = () => {
    return navigation.navigate('SelectStatusScreen');
  };

  return (
    <View style={styles.mainContainer}>
      <ImageBackground
        resizeMode="stretch"
        style={styles.mainBgImage}
        source={Images.welcomeBgImage}>
        <View style={styles.mainFooterRect}>
          <Button
            navigation={navigation}
            label="Create account"
            onPress={goToNext}
          />
          {/*Footer start*/}
          <View style={styles.bottomTextMainRect}>
            <View style={styles.alreadyTextRect}>
              <Text style={styles.textAlready}>Already a member? </Text>
            </View>
            <View style={styles.signInTextRect}>
              <Pressable onPress={() => navigation.navigate('SignIn')}>
                <Text style={styles.signInText}>Sign in</Text>
              </Pressable>
            </View>
          </View>
          {/*Footer End*/}
        </View>
      </ImageBackground>
    </View>
  );
};

export default WelcomeScreen;
