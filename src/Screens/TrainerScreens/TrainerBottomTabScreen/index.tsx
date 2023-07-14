import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Platform, StyleSheet, View } from 'react-native';
import MyVideos from '../MyVideosScreen/index';
import AccountScreen from '../AccountScreen/index';
import Home from '../HomeScreen';
import Chat from '../../TraineeScreens/Chat';
import Colors from '../../../constants/Colors';
import { useSelector } from 'react-redux';
import { MessageState } from '../../../slice/messages.slice';

const Tab = createBottomTabNavigator();

const TrainerBottomTabScreen = () => {
  const {unReadMessages} = useSelector((state: { messages: Partial<MessageState> }) => state.messages);

  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color }) => {
        let iconName;

        switch (route.name) {
          case 'Home':
            iconName = 'home-filled';
            break;
          case 'Video':
            iconName = 'folder-video';
            break;
          case 'Chat':
            iconName = 'send';
            break;
          case 'Account':
            iconName = 'settings';
            break;
          default:
            return null;
        }

        return (
          <View style={styles.iconContainer}>
            <MaterialIcons name={iconName} size={wp(6)} color={color} />
              {route.name === "Chat" && unReadMessages ? <View style={styles.unreadIcon} /> : null}
          </View>
        );
      },
      tabBarStyle: {
        height: Platform.OS === 'ios' ? 110 : 50,
        justifyContent: 'center',
        bottom: Platform.OS === 'ios' ? -30 : 0,
        marginBottom: 0,
        position: 'absolute',
      },
    })}
    tabBarOptions={{
      activeTintColor: '#fff',
      inactiveTintColor: 'grey',
      activeBackgroundColor: '#000',
      inactiveBackgroundColor: '#000',
      labelStyle: {
        paddingBottom: Platform.OS === 'ios' ? 20 : 0,
      },
    }}>
      <Tab.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Tab.Screen name="Video" component={MyVideos} options={{ headerShown: false }} />
      <Tab.Screen name="Chat" component={Chat} options={{ title: "Chat" }} />
      <Tab.Screen name="Account" component={AccountScreen} options={{ headerShown: false }} />
  </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  unreadIcon: {
    position: "absolute",
    top: 4,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.bgRedBtn, // Use your desired color here
  },
});


export default TrainerBottomTabScreen;