import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Platform,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { RFValue} from 'react-native-responsive-fontsize';
import VideoPlayer from 'react-native-video-player';
import * as Images from '../../constants/Images';
import Header from '../../Components/Header';
import Button from '../../Components/Button';

const VideoBookPayment = ({navigation}) => {
  const [details, setDetails] = useState(false);
  const GoBack = () => {
    navigation.goBack();
  }
  const NextScreen =() => {

    navigation.navigate('');
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <View style={styles.fixeheight}>
      <Header  navigation={navigation} onPress={GoBack} />
      </View>
        <View style={styles.fixeheight1}>
        <View style={styles.TopView}>
          <View style={styles.topView}>
           
            <Text style={styles.paymenttextstyle}>Payment</Text>
            <Text style={styles.beforclasstextstyle}>
              Pay before the class starts
            </Text>
            </View>
          </View>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.main}>
        {/*start image Box*/}
        {/* */}
        <View style={styles.TopView}>
          <View style={styles.topView}>
            <View style={styles.VideoView}>
              <VideoPlayer
                video={{
                  uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
                }}
                filterEnabled={true}
                videoWidth={1600}
                videoHeight={900}
                fullscreenAutorotate={false}
                thumbnail={Images.videoImage}
                style={{borderTopRightRadius:16,borderTopLeftRadius:16}}
              />
            </View>
            <View style={styles.BoxView}>
              <View style={styles.rowboxmainview}>
                <View style={styles.boxviewicon}>
                  <FontAwesome name="circle" style={{color: '#fff'}} />
                </View>
                <View style={{width: '90%'}}>
                  <Text style={styles.boxtextstyle}>Class Rating: 4.0</Text>
                </View>
              </View>
              <View style={styles.rowboxmainview}>
                <View style={styles.boxviewicon}></View>
                <View style={{width: '90%'}}>
                  <Text style={{color: '#ffffff'}}>
                    4.0
                    <AntDesign name="star" style={styles.boxtextstyle} />
                    (150 Reviews)
                  </Text>
                </View>
              </View>
              <View style={styles.rowboxmainview}>
                <View style={styles.boxviewicon}>
                  <FontAwesome name="circle" style={{color: '#fff'}} />
                </View>
                <View style={{width: '90%'}}>
                  <Text style={styles.boxtextstyle}>Trainer name:</Text>
                </View>
              </View>
              {/*start*/}
              <View style={styles.rowboxmainview}>
                <View style={styles.boxviewicon}></View>
                <View style={{width: '90%'}}>
                  <Text style={styles.boxtextstyle}>Murray Job (4.6)</Text>
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
                <View style={styles.boxviewicon}></View>
                <View style={{width: '90%'}}>
                  <Text style={styles.boxtextstyle}>
                    Learn Advance technique
                  </Text>
                </View>
              </View>
              {/*start */}
              <View style={styles.rowboxmainview}>
                <View style={styles.boxviewicon}>
                  <FontAwesome name="circle" style={{color: '#fff'}} />
                </View>
                <View style={{width: '90%'}}>
                  <Text style={styles.boxtextstyle}>Durations:</Text>
                </View>
              </View>
              {/*start */}
              <View style={styles.rowboxmainview}>
                <View style={styles.boxviewicon}></View>
                <View style={{width: '90%'}}>
                  <Text style={styles.boxtextstyle}>1 hour </Text>
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
                <View style={styles.boxviewicon}></View>
                <View style={{width: '90%'}}>
                  <Text style={styles.boxtextstyle}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
                    adipiscing ac adipiscing mauris tincidunt varius
                    sollicitudin.{' '}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        {/*start image Box*/}

        <View style={styles.TopView}>
          <View style={styles.topView}>
            {/*start pay*/}
            <View style={styles.rowView}>
              <View style={styles.totalView}>
                <Text style={styles.totalText}>Total Cost</Text>
              </View>
              <View style={styles.$10View}>
                <Text style={styles.totalText}>$ 100 </Text>
              </View>
            </View>
            {/*end pay*/}
            {/*start pay*/}
            <View style={styles.rowView}>
              <View style={styles.totalView}>
                <Text style={styles.walletText}>Wallet Balance</Text>
              </View>
              <View style={styles.$10View}>
                <Text style={styles.walletText}>$ 300 </Text>
              </View>
            </View>
            {/*end pay*/}
          </View>
        </View>
        <View style={{paddingVertical: 40}}></View>
      </ScrollView>
      <View style={styles.footer}>
        <View style={styles.TopView}>
        <Button navigation={navigation} label={'Pay Now'} 
                     onPress={NextScreen} />
         
        </View>
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
  header: {
    width: '100%',
    height: 120,
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
      height: 70,
      width:'100%',
      justifyContent:'center',
      alignItems:'center',
 },
  main: {
    width: '100%',
    height: '100%',
    paddingVertical: 10,
  },
  TopView: {
    width: '100%',
    alignItems: 'center',
  },
  topView: {
    width: '90%',
  },

  rowView: {
    width: '100%',
    flexDirection: 'row',
  },
  borderView: {
    width: '100%',
    borderWidth: 1,
    bordercolor: '#000',
  },
  textstyle: {
    color: '#979797',
    fontSize: RFValue(12, 580),
    fontFamily: 'Poppins-Regular',
  },
  dotmainview: {
    width: '100%',
    flexDirection: 'row',
  },
  dotview: {
    width: '10%',
    alignItems: 'center',
  },
  marchmainview: {
    width: '90%',
    backgroundColor: '#000',
    justifyContent: 'center',
    borderRadius: 20,
    paddingVertical: 15,
  },
  marchmainview2: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  marchtext: {
    color: '#fff',
    fontSize: RFValue(12, 580),
    fontFamily: 'Poppins-SemiBold',
  },
  mainbtnView: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#fff',
  },
  ccbtnview: {
    backgroundColor: '#ff0000',
    width: 100,
    height: 45,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilebtnview: {
    backgroundColor: '#ff0000',
    width: 100,
    height: 45,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btntextstyle: {
    color: '#fff',
    fontSize: RFValue(10, 580),
    fontFamily: 'Poppins-Regular',
  },
  upcomingtextstyle: {
    fontSize: RFValue(17, 580),
    fontFamily: 'Poppins-SemiBold',
    color: '#000',
  },
  paymenttextstyle: {
    fontSize: RFValue(20, 580),
    fontFamily: 'Poppins-Bold',
    color: '#000000',
    lineHeight: 51,
  },
  beforclasstextstyle: {
    fontSize: RFValue(12, 580),
    fontFamily: 'Poppins-Regular',
    color: '#000000',
    lineHeight: 25,
  },
  totalView: {
    width: '50%',
  },
  $10View: {
    width: '50%',
    alignItems: 'flex-end',
  },
  totalText: {
    fontFamily: 'Poppins-Bold',
    fontSize: RFValue(17, 580),
    lineHeight: 50,
    color: '#000',
  },
  walletText: {
    fontFamily: 'Poppins-Regular',
    fontSize: RFValue(17, 580),
    lineHeight: 40,
    color: '#000',
  },
  footer: {
    width: '100%',
    marginBottom: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    backgroundColor:'#fff'
  },
  btn: {
    padding: 10,
    width: '90%',
    borderRadius: 10,
    backgroundColor: '#FF0000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paytextstyle: {
    color: '#FFFFFF',
    fontSize: RFValue(12, 580),
    fontFamily: 'Poppins-SemiBold',
  },
  BoxView: {
    width: '100%',
    backgroundColor: '#000',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
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
export default VideoBookPayment;
