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
  Platform,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import * as Images from '../../constants/Images';
import Colors from '../../constants/Colors';
import About from './About';
import Videos2 from './Videos2';
import Ratings from './Ratings';
import { NavigationSwitchProp } from 'react-navigation';

interface PropsInterface {
  navigation: NavigationSwitchProp
}

const TrainerProfile = ({navigation}: PropsInterface) => {
  const [about, setAbout] = useState(true);
  const [video, setVideo] = useState(false);
  const [ratings, setRatings] = useState(false);

  const aboutTrueState = () => {
    setAbout(true);
    setVideo(false);
    setRatings(false);
  };
  const videotrueState = () => {
    setAbout(false);
    setVideo(true);
    setRatings(false);
  };
  const ratingstrueState = () => {
    setAbout(false);
    setVideo(false);
    setRatings(true);
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <Image
          style={styles.Imagestyle}
          source={Images.Trainer}
        />
        <View style={styles.header}>
          <View style={styles.TopView}>
            <View style={styles.topView1}>
              {/*start James Name*/}
              <Text style={styles.NameText}> James Seidi</Text>
              <Text style={styles.sessionText}>
                (15 Sessions taken with you)
              </Text>
            </View>
            {/*end James Name*/}
            {/*start contact Btn */}
            <View style={styles.BtnmainView}>
              <TouchableOpacity
                onPress={() => navigation.navigate('Chat')}
                style={styles.BtnView}>
                <Text style={styles.contactText}>Contact</Text>
              </TouchableOpacity>
            </View>
            {/*end contact Btn*/}
            {/*start navigation*/}
            <View style={styles.toptabmainview}>
              <TouchableOpacity
                style={styles.mainclassesview}
                onPress={() => aboutTrueState()}>
                <Text style={[about ? styles.topbartext : styles.topbartext1]}>
                  About
                </Text>
                {about ? <View style={styles.borderView}></View> : null}
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => videotrueState()}
                style={styles.mainbookedview}>
                <Text style={[video ? styles.topbartext : styles.topbartext1]}>
                  Video
                </Text>
                {video ? <View style={styles.borderView}></View> : null}
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => ratingstrueState(true)}
                style={styles.mainclassesview}>
                <Text
                  style={[ratings ? styles.topbartext : styles.topbartext1]}>
                  Ratings
                </Text>
                {ratings ? <View style={styles.borderView}></View> : null}
              </TouchableOpacity>
            </View>
            {/*end navigation*/}
          </View>
        </View>
        <ScrollView showsVerticalScrollIndicator={false} style={styles.main}>
          {/*Start Navigation Screen*/}
          {about ? <About navigation={navigation} /> : null}
          {video ? <Videos2 /> : null}
          {ratings ? <Ratings navigation={navigation} /> : null}
          {/*End Navigation Screen*/}
          <View style={{paddingVertical: 20}}></View>
        </ScrollView>
      </View>
    </ScrollView>
  );
};
export default TrainerProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingTop: Platform.OS === 'ios' ? 40 : 0,
    paddingBottom: Platform.OS === 'ios' ? 0 : 0,
  },
  header: {
    width: '100%',
    height: '25%',
    marginTop: -20,
    backgroundColor: Colors.white,
    borderRadius: 24,
  },
  main: {
    width: '100%',
    height: '75%',
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
  Imagestyle: {
    width: '100%',
  },
  BoxViews: {
    backgroundColor: '#fff',
    width: '100%',
    borderRadius: 30,
    marginTop: -40,
    elevation: 7,
  },
  NameText: {
    fontFamily: 'Poppins-Bold',
    fontSize: RFValue(25, 580),
    color: '#000',
  },
  sessionText: {
    fontFamily: 'Poppins-Regular',
    fontSize: RFValue(10, 580),
    color: '#979797',
  },
  BtnView: {
    width: 101.74,
    height: 45,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
  },
  BtnmainView: {
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  contactText: {
    fontFamily: 'Poppins-Regular',
    fontSize: RFValue(10, 580),
    color: '#fff',
  },
  toptabmainview: {
    width: '100%',
    flexDirection: 'row',
    marginTop: 20,
  },
  mainclassesview: {
    width: '30%',
    alignItems: 'center',
  },
  mainbookedview: {
    width: '40%',
    alignItems: 'center',
  },
  topbartext: {
    fontSize: RFValue(12, 580),
    color: '#ff0000',
    fontFamily: 'Poppins-Regular',
  },
  topbartext1: {
    fontSize: RFValue(12, 580),
    color: '#000',
    fontFamily: 'Poppins-Regular',
  },
  borderView: {
    width: 30,
    borderWidth: 1,
    borderColor: '#ff0000',
  },
});
