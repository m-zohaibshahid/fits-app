/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
  Image,
  ActivityIndicator,
  Platform,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {RFValue} from 'react-native-responsive-fontsize';
import {url} from '../../../constants/url';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ChatScreen = ({navigation}) => {
  const NextScreen = item => {
    navigation.navigate('EnterChatTrainer', {
      roomId: item._id,
      receiverName: item.receiverName,
      senderName: item.senderName,
      reciverId: item.receiverId,
      Image: item.sender.personal.profileImage,
    });
  };
  const [data, setData] = useState([]);
  const [dumdata, setDumData] = useState([]);
  const [load, setLoad] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    navigation.addListener('focus', () => {
      getAllRomms();
    });
  }, []);

  const getAllRomms = async () => {
    const userData = await AsyncStorage.getItem('userData');
    let userDatax = JSON.parse(userData);
    setLoad(true);
    await fetch(`${url}/chat/rooms`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userDatax?.access_token}`,
      },
      body: JSON.stringify({
        all_rooms: true,
      }),
    })
      .then(res => res.json())
      .then(res2 => {
        setLoad(false);
        if (res2.success) {
          setData(res2?.data?.rooms);
          setDumData(res2?.data?.rooms);
        }
      })
      .catch(error => {
        setLoad(false);
      });
  };

  const find = t => {
    const words = [...data];
    setSearch(t);
    if (t === '') {
      setData(dumdata);
    } else {
      const newData = words.filter(item => {
        const itemData = `${item?.item?.toUpperCase()} ${item?.receiverName?.toUpperCase()}`;
        const textData = t?.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setData(newData);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.topView}>
          <Text style={styles.chattext}>Chat</Text>
        </View>

        <View style={styles.seacherbarmainView}>
          <View style={styles.seacherbariconview}>
            <EvilIcons name="search" size={32} style={{color: '#fff'}} />
          </View>
          <View
            style={{
              width: '85%',
              justifyContent: 'center',
            }}>
            <TextInput
              placeholder="Search... "
              placeholderTextColor={'#fff'}
              value={search}
              onChangeText={e => {
                find(e);
              }}
              style={{
                color: '#fff',
                top: 3,
                height: 50,
                fontFamily: 'Poppins-Regular',
                fontSize: RFValue(14, 580),
              }}
            />
          </View>
        </View>
      </View>
      {load === true ? (
        <View style={{width: '100%', marginTop: 200, alignItems: 'center'}}>
          <FastImage
            style={{
              width: 50,
              height: 50,
            }}
            source={{
              uri: 'https://i.gifer.com/ZZ5H.gif',
              headers: {Authorization: 'someAuthToken'},
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.main}>
            {/*Chat start */}
            <View style={styles.TopView}>
              {/*start*/}
              {load ? (
                <ActivityIndicator size="large" color="black" />
              ) : data[0] == null ? (
                <View
                  style={{
                    width: '100%',
                    marginTop: 100,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Poppins-Regular',
                      fontSize: RFValue(12, 580),
                    }}>
                    Room not available
                  </Text>
                </View>
              ) : (
                data?.map((item: any, i) => (
                  <View
                    style={{
                      width: '100%',
                      borderTopWidth: 1,
                      borderBottomWidth: 1,
                      paddingVertical: 10,
                      borderColor: 'grey',
                    }}
                    key={i}>
                    <View style={styles.chatmainview}>
                      <View style={{width: '20%', justifyContent: 'center'}}>
                        <Image
                          style={{
                            width: 65,
                            height: 65,
                            borderRadius: 200 / 2,
                          }}
                          source={{
                            uri: `${item?.sender?.personal?.profileImage}`,
                          }}
                        />
                      </View>
                      {item?.count > 0 && (
                        <View style={styles.badge}>
                          <Text style={{fontSize: 15}}>{item?.count}</Text>
                        </View>
                      )}
                      <TouchableOpacity
                        onPress={() => NextScreen(item)}
                        style={styles.touchview}>
                        <Text style={styles.nametext}>{item.senderName}</Text>

                        <Text style={styles.inertextstyles}>
                          {item.lastMessage}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ))
              )}
              <View style={{marginBottom: 40}} />
              {/*end*/}
            </View>
            {/*Chat end */}
          </View>
        </ScrollView>
      )}
      <View style={styles.footer} />
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
    height: 130,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topView: {width: '90%', alignSelf: 'center'},
  fixeheight: {
    height: 50,
    justifyContent: 'center',
    borderBottomWidth: 0.5,
    borderColor: 'lightgrey',
    width: '100%',
    alignItems: 'center',
  },
  main: {
    width: '100%',
  },
  footer: {
    width: '100%',
    marginBottom: 0,
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    backgroundColor: '#fff',
  },
  badge: {
    height: 25,
    position: 'absolute',
    top: '50%',
    right: 10,
    transform: [{translateY: -10}],
    // transform: "TranslateY(-50%)",
    width: 25,
    borderRadius: 50,
    backgroundColor: '#e02323',
    color: 'white',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  TopView: {
    width: '100%',
    alignItems: 'center',
  },
  topView1: {
    width: '90%',
    alignItems: 'center',
  },
  chattext: {
    color: '#000000',
    fontSize: RFValue(28, 580),
    fontFamily: 'Poppins-Bold',
  },
  seacherbarmainView: {
    width: '90%',
    backgroundColor: '#000',
    height: 50,
    borderRadius: 10,
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  seacherbariconview: {
    width: '15%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chatmainview: {
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    height: 98,
  },
  touchview: {
    width: '80%',
    paddingLeft: 4,
    justifyContent: 'center',
  },
  nametext: {
    fontSize: RFValue(16, 580),
    fontFamily: 'Poppins-Bold',
    color: '#000',
  },
  inertextstyles: {
    fontSize: RFValue(12, 580),
    fontFamily: 'Poppins-Regular',
    color: '#000',
  },
});

export default ChatScreen;
