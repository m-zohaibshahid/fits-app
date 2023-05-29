/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {Text, View, TextInput, ScrollView} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Header from '../../../Components/Header';
import Button from '../../../Components/Button';
import {useRoute} from '@react-navigation/native';
import {url} from '../../../constants/url';
import styles from './styles';
import {Toast} from 'react-native-toast-message/lib/src/Toast';

const GeneratePassword = ({navigation}) => {
  // Hooks
  const [load, setLoad] = useState(false);
  const [hidePass, setHidePass] = React.useState(true);
  const [password, setPassword] = React.useState(true);
  const [confirmPassword, setConfirmPassword] = React.useState(true);

  // variables
  const route: any = useRoute();

  // Functions
  const NextScreen = () => {
    navigation.navigate('SignIn');
  };
  const GenerateCode = async () => {
    if (password === '') {
      Toast.show({
        type: 'error',
        text1: 'Please enter password',
      });
    } else if (confirmPassword === '') {
      Toast.show({
        type: 'error',
        text1: 'Please enter confirm password',
      });
    } else if (password !== confirmPassword) {
      Toast.show({
        type: 'error',
        text1: 'Password does not match.',
      });
    } else {
      setLoad(true);

      await fetch(`${url}/change-password`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: route.params.email,
          password: password,
        }),
      })
        .then(res => res.json())
        .then(res2 => {
          setLoad(false);
          if (res2.message === 'password updated') {
            Toast.show({
              type: 'success',
              text1: res2?.message,
            });
            NextScreen();
          } else {
            Toast.show({
              type: 'error',
              text1: res2?.message,
            });
          }
        })
        .catch(error => {
          setLoad(false);
          Toast.show({
            type: 'error',
            text1: 'Something went wrong!',
          });
          console.log(error);
        });
    }
  };
  return (
    <>
      <Text>Hello</Text>
    </>
    // <View style={styles.mainContainer}>
    //   <Header label={'New Password'} navigation={navigation} />

    //   <ScrollView showsVerticalScrollIndicator={false}>
    //     <View style={styles.mainBody}>
    //       <View style={styles.inputMainView}>
    //         <View style={styles.inputTitleView}>
    //           <Text style={styles.inputTitleText}>Create New Password</Text>
    //         </View>
    //         <View style={styles.inputTypeMainView}>
    //           <View style={styles.inputTypeView}>
    //             {/* <TextInput
    //               style={styles.inputTypeStyle}
    //               label="Create New Password"
    //               placeholder="**********"
    //               placeholderTextColor={'#fff'}
    //               value={password}
    //               onChangeText={setPassword}
    //             /> */}
    //           </View>
    //           <View style={styles.hideIconView}>
    //             <Ionicons
    //               name={hidePass ? 'eye-off' : 'eye'}
    //               onPress={() => setHidePass(!hidePass)}
    //               size={18}
    //               color="#fff"
    //             />
    //           </View>
    //         </View>
    //       </View>

    //       <View style={styles.inputMainView}>
    //         <View style={styles.inputTitleView}>
    //           <Text style={styles.inputTitleText}>Password</Text>
    //         </View>
    //         <View style={styles.inputTypeMainView}>
    //           <View style={styles.inputTypeView}>
    //             {/* <TextInput
    //               style={styles.inputTypeStyle}
    //               placeholder="**********"
    //               placeholderTextColor={'#fff'}
    //               value={confirmPassword}
    //               onChangeText={setConfirmPassword}
    //             /> */}
    //           </View>
    //           <View style={styles.hideIconView}>
    //             <Ionicons
    //               name={hidePass ? 'eye-off' : 'eye'}
    //               onPress={() => setHidePass(!hidePass)}
    //               size={18}
    //               color="#fff"
    //             />
    //           </View>
    //         </View>
    //       </View>

    //       <View style={{width: '100%', alignItems: 'center', marginTop: 25}}>
    //         <Button
    //           navigation={navigation}
    //           label={'Change Password'}
    //           loader={load}
    //           onPress={() => {
    //             !load && GenerateCode();
    //           }}
    //         />
    //       </View>
    //     </View>
    //   </ScrollView>
    // </View>
  );
};

export default GeneratePassword;
