import React from 'react';
import {
  Text,
  View,
  
  StyleSheet,
  
  ScrollView,
} from 'react-native';
import { RFValue} from 'react-native-responsive-fontsize';
import VideoPlayer from 'react-native-video-player';
import * as Images from '../../constants/Images';

const Videos2 = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.TopView}>
          <View style={styles.topView}>
            <Text style={styles.VideoboughtText}>Videos bought from you</Text>
          </View>
        </View>
      </View>

      <View style={styles.main}>
        <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
          {/*start image Box*/}
          <View style={styles.TopView}>
            <View style={styles.topView}>
            {/* <View style={styles.VideoView}>
                  <VideoPlayer
                    video={{
                      uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
                    }}
                    filterEnabled={true}
                    videoWidth={1600}
                    videoHeight={900}
                    thumbnail={Images.videoImage}
                    style={{borderTopRightRadius:16,borderTopLeftRadius:16}}
                  />
                </View> */}
              <View style={styles.boxView}>
                <View style={styles.TopView}>
                <View style={styles.topView}>
                    <Text style={styles.desTextStyles}>Description</Text>
                {/*start */}
                    <Text style={styles.desTextStyles}>
                      Lorem ipsum dolor sit amet,  consectetur adipiscing elit.
                      In adipiscing ac adipiscing mauris tincidunt varius
                      sollicitudin.
                    </Text>
                    </View>
                </View>
              </View>
            </View>
          </View>
          {/*End image Box*/}
          <View style={{paddingHorizontal: 20}}></View>
        </ScrollView>
      </View>
    </View>
  );
};
export default Videos2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: '100%',
    height: 150,
  },
  fixeheight: {
    height: 50,
    justifyContent: 'center',
    borderBottomWidth: 0.5,
    borderColor: 'lightgrey',
    width: '100%',
    alignItems: 'center',
  },
  fixeheight1: {
    height: 100,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
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
  VideoboughtText: {
    fontFamily: 'Poppins-Bold',
    fontSize: RFValue(15, 580),
    color: '#000',
  },
  rowView: {
    width: '100%',
    alignItems:'center'
  },
  desTextStyles: {
    color: '#ffffff',
    fontSize: RFValue(12, 580),
    fontFamily: 'Poppins-Regular',
  },
  boxView: {
    width:330,
    height:130,
    backgroundColor: '#000',
    borderBottomLeftRadius:14,
    borderBottomRightRadius:14,
    justifyContent:'center'
    
  },
  VideoView: {
    width:330,
  },
});
