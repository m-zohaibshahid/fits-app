import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Home from "../Home";
import MyClasses from "../MyClasses";
import Chat from "../Chat";
import Account from "../Account";
import { Platform, StyleSheet, View } from "react-native";
import Colors from "../../../constants/Colors";
import { useSelector } from "react-redux";
import { MessageState } from "../../../slice/messages.slice";

const Tab = createBottomTabNavigator();

const TraineeBottomTabScreen = () => {
  const {unReadMessages} = useSelector((state: { messages: Partial<MessageState> }) => state.messages);
  return (
    <Tab.Navigator
    options={{ headerShown: false }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          let iconName;
  
          switch (route.name) {
            case 'Home':
              iconName = 'home-filled';
              break;
            case 'MyClasses':
              iconName = 'group';
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
      })}
      tabBarOptions={{
        activeTintColor: "#fff",
        inactiveTintColor: "grey",
        activeBackgroundColor: "#000",
        inactiveBackgroundColor: "#000",
        labelStyle: {
          paddingBottom: Platform.OS === "ios" ? 20 : 0,
        },
      }}
    >
      <Tab.Screen options={{headerShown: false}} name="Home" component={Home} />
      <Tab.Screen options={{headerShown: false}} name="MyClasses" component={MyClasses} />
      <Tab.Screen options={{headerShown: false}} name="Chat" component={Chat} />
      <Tab.Screen options={{headerShown: false}} name="Account" component={Account} />
    </Tab.Navigator>
  );
};

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


export default TraineeBottomTabScreen;
