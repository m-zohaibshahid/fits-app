/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {Platform} from 'react-native';
import MyVideos from '../MyVideosScreen/index';
import AccountScreen from '../AccountScreen/index';
import Home from '../../TraineeScreens/Home';

const Tab = createBottomTabNavigator();

function TrainerBottomTabScreen() {
  return (
    <Tab.Navigator
      screenOptions={({route}: any) => ({
        tabBarIcon: ({focused, color}) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home-filled' : 'home-filled';
            return <MaterialIcons name={iconName} size={wp(6)} color={color} />;
          } else if (route.name === 'Video') {
            iconName = focused ? 'folder-video' : 'folder-video';
            return <Entypo name={iconName} size={wp(6)} color={color} />;
          } else if (route.name === 'Account') {
            iconName = focused ? 'settings' : 'settings';
            return <Ionicons name={iconName} size={wp(6)} color={color} />;
          }
        },
        tabBarStyle: {
          height: Platform.OS === 'ios' ? 110 : 50,
          justifyContent: 'center',
          bottom: Platform.OS === 'ios' ? -30 : 0,
          marginBottom: 0,
          position: 'absolute',
        },
      })}
      tabBarIcon
      tabBarOptions={{
        activeTintColor: '#fff',
        inactiveTintColor: 'grey',
        activeBackgroundColor: '#000',
        inactiveBackgroundColor: '#000',
        labelStyle: {
          paddingBottom: Platform.OS === 'ios' ? 20 : 0,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
        listeners={({navigation, route}: any) => ({
          tabPress: () => {
            if (route.state && route.state.routeNames.length > 0) {
              navigation.navigate('Device');
            }
          },
        })}
      />

      <Tab.Screen
        name="Video"
        component={MyVideos}
        options={{headerShown: false}}
        listeners={({navigation, route}: any) => ({
          tabPress: () => {
            if (route.state && route.state.routeNames.length > 0) {
              navigation.navigate('Device');
            }
          },
        })}
      />

      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{headerShown: false}}
        listeners={({navigation, route}: any) => ({
          tabPress: () => {
            if (route.state && route.state.routeNames.length > 0) {
              navigation.navigate('Device');
            }
          },
        })}
      />
    </Tab.Navigator>
  );
}

export default TrainerBottomTabScreen;
