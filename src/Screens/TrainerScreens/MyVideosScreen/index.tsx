/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  Platform,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {RFValue} from 'react-native-responsive-fontsize';
import VideoPlayer from 'react-native-video-player';
import Colors from '../../../constants/Colors';

const MyVideos = ({navigation, data, load}: any) => {
  console.log('loaddata==>', load, data);
  return (
    <View style={styles.container}>
      {/*All videos*/}
      <View style={styles.main}>
        {load === true ? (
          <ActivityIndicator size="large" color="black" />
        ) : data?.length < 1 || data === undefined ? (
          <View
            style={{
              width: '100%',
              marginTop: '30%',
              height: 25,
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: Colors.gray,
                fontSize: RFValue(12, 580),
                fontFamily: 'Poppins-Regular',
              }}>
              -- Videos Not Available --
            </Text>
          </View>
        ) : (
          <View style={{width: '100%', alignItems: 'center'}}>
            {data.map((item, i) => (
              <View style={styles.topView1} key={i}>
                <View style={styles.VideoView}>
                  <VideoPlayer
                    video={{
                      uri: `${item.video_links[0]}`,
                    }}
                    filterEnabled={true}
                    videoWidth={900}
                    videoHeight={900}
                    thumbnail={{
                      uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtLvJBFarEabFbaBsDwn429BPEnnDmaon2JA&usqp=CAU',
                    }}
                    style={{
                      borderTopRightRadius: 16,
                      borderTopLeftRadius: 16,
                    }}
                  />
                </View>
                <View style={styles.BoxView}>
                  <View style={styles.rowboxmainview}>
                    <View style={styles.boxviewicon}>
                      <FontAwesome name="circle" style={{color: '#fff'}} />
                    </View>
                    <View style={{width: '90%'}}>
                      <Text style={styles.boxtextstyle}>
                        Class Rating: {item?.averageRating?.toFixed(1)}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.rowboxmainview}>
                    <View style={styles.boxviewicon} />
                    <View style={{width: '90%'}}>
                      <Text style={{color: '#ffffff'}}>
                        {item?.averageRating?.toFixed(1)}
                        {'  '}
                        <AntDesign name="star" style={styles.boxtextstyle} />
                        {'  '}({item?.numReviews} Reviews)
                      </Text>
                    </View>
                  </View>
                  {/*start */}
                  <View style={styles.rowboxmainview}>
                    <View style={styles.boxviewicon}>
                      <FontAwesome name="circle" style={{color: '#fff'}} />
                    </View>
                    <View style={{width: '90%'}}>
                      <Text style={styles.boxtextstyle}>Trainer name:</Text>
                    </View>
                  </View>
                  {/*start */}
                  <View style={styles.rowboxmainview}>
                    <View style={styles.boxviewicon} />
                    <View style={{width: '90%'}}>
                      <Text style={styles.boxtextstyle}>
                        {item?.trainer?.personal?.name}
                      </Text>
                    </View>
                  </View>
                  {/*start */}
                  <View style={styles.rowboxmainview}>
                    <View style={styles.boxviewicon}>
                      <FontAwesome name="circle" style={{color: '#fff'}} />
                    </View>
                    <View style={{width: '90%'}}>
                      <Text style={styles.boxtextstyle}>Topic:</Text>
                    </View>
                  </View>
                  {/*start */}
                  <View style={styles.rowboxmainview}>
                    <View style={styles.boxviewicon} />
                    <View style={{width: '90%'}}>
                      <Text style={styles.boxtextstyle}>{item.topic}</Text>
                    </View>
                  </View>
                  {/*start */}
                  <View style={styles.rowboxmainview}>
                    <View style={styles.boxviewicon}>
                      <FontAwesome name="circle" style={{color: '#fff'}} />
                    </View>
                    <View style={{width: '90%'}}>
                      <Text style={styles.boxtextstyle}>Price:</Text>
                    </View>
                  </View>
                  {/*start */}
                  <View style={styles.rowboxmainview}>
                    <View style={styles.boxviewicon} />
                    <View style={{width: '90%'}}>
                      <Text style={styles.boxtextstyle}>{item.price}</Text>
                    </View>
                  </View>
                  {/*start */}
                  <View style={styles.rowboxmainview}>
                    <View style={styles.boxviewicon}>
                      <FontAwesome name="circle" style={{color: '#fff'}} />
                    </View>
                    <View style={{width: '90%'}}>
                      <Text style={styles.boxtextstyle}>Video Catagory:</Text>
                    </View>
                  </View>
                  {/*start */}
                  <View style={styles.rowboxmainview}>
                    <View style={styles.boxviewicon} />
                    <View style={{width: '90%'}}>
                      <Text style={styles.boxtextstyle}>
                        {item.video_category}
                      </Text>
                    </View>
                  </View>
                  {/*start */}
                  <View style={styles.rowboxmainview}>
                    <View style={styles.boxviewicon}>
                      <FontAwesome name="circle" style={{color: '#fff'}} />
                    </View>
                    <View style={{width: '90%'}}>
                      <Text style={styles.boxtextstyle}>Description:</Text>
                    </View>
                  </View>
                  {/*start */}
                  <View style={styles.rowboxmainview}>
                    <View style={styles.boxviewicon} />
                    <View style={{width: '90%'}}>
                      <Text style={styles.boxtextstyle}>
                        {item.video_details}{' '}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingTop: Platform.OS === 'ios' ? 40 : 0,
    paddingBottom: Platform.OS === 'ios' ? 0 : 0,
  },
  main: {
    width: '100%',
  },
  topView1: {
    backgroundColor: Colors.black,
    borderRadius: 8,
    marginBottom: '40%',
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
  },
  VideoView: {
    width: '100%',
    borderBottomWidth: 1,
    borderColor: Colors.lightGray,
  },
  BoxView: {
    width: '100%',
    backgroundColor: '#000',
    paddingBottom: 10,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
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
});

export default MyVideos;
