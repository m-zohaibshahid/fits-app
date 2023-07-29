/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Platform,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { RFValue } from 'react-native-responsive-fontsize';
import VideoPlayer from 'react-native-video-player';
import Colors from '../../../constants/Colors';
import Container from '../../../Components/Container';
import Header from '../../../Components/Header';
import { useGetMyAllCreatedVideosQuery } from '../../../slice/FitsApi.slice';
import Typography from '../../../Components/typography/text';
import { NavigationSwitchProp } from 'react-navigation';
import Entypo from 'react-native-vector-icons/Entypo';

interface PropsInterface {
  navigation: NavigationSwitchProp;
}

const TrainerVideoScreen = ({ navigation }: PropsInterface) => {
  const { data: myAllVideos, isLoading } = useGetMyAllCreatedVideosQuery({});
  const [thumbnailLoading, setThumbnailLoading] = useState(true);

  if (isLoading) return <ActivityIndicator />;

  return (
    <Container style={{ marginBottom: 50 }}>
      <Header label='My Classes' />
      <ScrollView showsHorizontalScrollIndicator={false}>
        {!myAllVideos?.data?.length ? (
          <Typography style={{ marginTop: 50 }} align="center">
            ---You dont have any video yet---
          </Typography>
        ) : (
          myAllVideos.data.map((item, i) => {
            const duration = '1 hour';

            return (
              <View style={styles.topView1} key={i}>
                <View style={styles.VideoView}>
                  <VideoPlayer
                    video={{
                      uri: `${item.video_links[0]}`,
                    }}
                    videoWidth={900}
                    videoHeight={700}
                    thumbnail={{
                      uri: item.video_thumbnail,
                    }}
                    onLoad={() => setThumbnailLoading(false)}
                  />
                  {thumbnailLoading && (
                    <View style={styles.thumbnailLoader}>
                      <ActivityIndicator />
                    </View>
                  )}
                </View>
                <View style={styles.BoxView}>
                <View style={{
                  width: '100%',
                  flexDirection: 'column',
                  marginVertical: 10
                }}>
                  <Typography color='white' size={'regularText'}>
                    Trainer Name:
                  </Typography>
                  <Typography color='white90' style={{marginLeft: 30, marginTop: 5}} size={'medium'}>
                  {item.trainer.personal.name}
                  </Typography>
                </View>
                <View style={{
                  width: '100%',
                  flexDirection: 'column',
                  marginVertical: 10
                }}>
                  <Typography color='white' size={'regularText'}>
                    Class Rating:
                  </Typography>
                  <Typography color='white90' style={{marginLeft: 30, marginTop: 5}} size={'medium'}>
                  {item.averageRating}
                  {"   "}
                    <Entypo name="star" style={{marginHorizontal: 10}} size={18} color={'#fff'} />
                  {"   "}
                  ({item.numReviews}) Reviews
                  </Typography>
                </View>
                <View style={{
                  width: '100%',
                  flexDirection: 'column',
                  marginVertical: 10
                }}>
                  <Typography color='white' size={'regularText'}>
                    Topic:
                  </Typography>
                  <Typography color='white90' style={{marginLeft: 30, marginTop: 5}} size={'medium'}>
                    {item.topic}
                  </Typography>
                </View>
                <View style={{
                  width: '100%',
                  flexDirection: 'column',
                  marginVertical: 10
                }}>
                  <Typography color='white' size={'regularText'}>
                    Duration:
                  </Typography>
                  <Typography color='white90' style={{marginLeft: 30, marginTop: 5}} size={'medium'}>
                    {duration}
                  </Typography>
                </View>
                <View style={{
                  width: '100%',
                  flexDirection: 'column',
                  marginVertical: 10
                }}>
                  <Typography color='white' size={'regularText'}>
                    Description:
                  </Typography>
                  <Typography color='white90' style={{marginLeft: 30, marginTop: 5}} size={'medium'}>
                    {item.video_details}
                  </Typography>
                </View>
              </View>
              </View>
            );
          })
        )}
      </ScrollView>
      <TouchableOpacity
        onPress={() => navigation.navigate('VideoCreate')}
        style={styles.addIconRect}
      >
        <AntDesign name="plus" color={'#fff'} size={24} />
      </TouchableOpacity>
    </Container>
  );
};

// VideoCreate
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingTop: Platform.OS === 'ios' ? 40 : 0,
  },
  main: {
    width: '100%',
  },
  topView1: {
    backgroundColor: Colors.black,
    borderRadius: 10,
    marginBottom: 20,
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  VideoView: {
    width: '100%',
    borderBottomWidth: 1,
    borderColor: Colors.lightGray,
  },
  BoxView: {
    width: '100%',
    backgroundColor: '#000',
    padding: 20,
  },
  rowboxmainview: {
    width: '100%',
    flexDirection: 'row',
    marginTop: 10,
  },
  boxviewicon: {
    width: '10%',
    alignItems: 'center',
    marginTop: 5,
  },
  boxtextstyle: {
    color: '#ffffff',
    fontSize: RFValue(12, 580),
    fontFamily: 'Poppins-Regular',
  },
  addIconRect: {
    width: 56,
    height: 56,
    borderRadius: 40,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 8,
    right: 12,
  },
  thumbnailLoader: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.black,
  },
});

export default TrainerVideoScreen;
