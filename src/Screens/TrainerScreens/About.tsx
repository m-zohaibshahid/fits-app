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
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import * as Images from '../../constants/Images';

const About = ({navigation}) => {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.main}>
        {/*Start BoxView*/}
        <View style={styles.TopView}>
          <View style={styles.topView}>
            <View style={styles.BoxMianView}>
              <View style={styles.dotmainview}>
                <View style={styles.dotview}>
                  <FontAwesome name="circle" style={{color: '#979797'}} />
                </View>
                <View style={{width: '90%'}}>
                  <Text style={styles.textstyle}>Age{'\n'} 30</Text>
                </View>
              </View>
              <View style={styles.dotmainview}>
                <View style={styles.dotview}>
                  <FontAwesome name="circle" style={{color: '#979797'}} />
                </View>
                <View style={{width: '90%'}}>
                  <Text style={styles.textstyle}>
                    Fitness Level {'\n'}Newbie
                  </Text>
                </View>
              </View>
              <View style={styles.dotmainview}>
                <View style={styles.dotview}>
                  <FontAwesome name="circle" style={{color: '#979797'}} />
                </View>
                <View style={{width: '90%'}}>
                  <Text style={styles.textstyle}>
                    Fitness Goal{'\n'}Lose fat with workout
                  </Text>
                </View>
              </View>
              <View style={styles.dotmainview}>
                <View style={styles.dotview}>
                  <FontAwesome name="circle" style={{color: '#979797'}} />
                </View>
                <View style={{width: '90%'}}>
                  <Text style={styles.textstyle}>
                    Location{'\n'}Russia, Albie, Burnie
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        {/*End BoxView*/}
      </ScrollView>
    </View>
  );
};
export default About;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    width: '100%',
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
    marginTop: 10,
  },
  topView: {width: '90%'},
  topView1: {
    width: '90%',
    alignItems: 'center',
  },
  BoxMianView: {
    width: '100%',
    backgroundColor: '#000',
    height: 229,
    borderRadius: 20,
    alignItems: 'center',
  },
  dotmainview: {
    width: '100%',
    flexDirection: 'row',
    marginTop: 10,
  },
  dotview: {
    width: '10%',
    alignItems: 'center',
    marginTop: 5,
  },
  textstyle: {
    color: '#fff',
    fontSize: RFValue(10, 580),
    fontFamily: 'Poppins-Regular',
  },
});
