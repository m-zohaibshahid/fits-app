import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Home from "../Home";
import MyClasses from "../MyClasses";
import Chat from "../Chat";
import Account from "../Account";
import { Platform } from "react-native";

const Tab = createBottomTabNavigator();

const TraineeBottomTabScreen = ({ navigation }) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        let iconName: any;
        let IconComponent: any;

        if (route.name === "Home") {
          iconName = "home-filled";
          IconComponent = MaterialIcons;
        } else if (route.name === "MyClasses") {
          iconName = "account-group";
          IconComponent = MaterialCommunityIcons;
        } else if (route.name === "Chat") {
          iconName = "send";
          IconComponent = FontAwesome;
        } else if (route.name === "Account") {
          iconName = "settings";
          IconComponent = Ionicons;
        }

        return {
          tabBarIcon: ({ color, size }) => {
            return <IconComponent name={iconName} size={wp(6)} color={color} />;
          },
        };
      }}
      tabBarStyle={{
        height: Platform.OS === "ios" ? 110 : 50,
        justifyContent: "center",
        bottom: Platform.OS === "ios" ? -30 : 0,
        marginBottom: 0,
        position: "absolute",
      }}
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
      <Tab.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
        listeners={({ navigation, route }: any) => ({
          tabPress: (e) => {
            if (route.state && route.state.routeNames.length > 0) {
              navigation.navigate("Device");
            }
          },
        })}
      />

      <Tab.Screen
        name="MyClasses"
        component={MyClasses}
        options={{ headerShown: false }}
        listeners={({ navigation, route }) => ({
          tabPress: (e) => {
            if (route.state && route.state.routeNames.length > 0) {
              navigation.navigate("Device");
            }
          },
        })}
      />
      <Tab.Screen
        name="Chat"
        component={Chat}
        options={{ headerShown: false }}
        listeners={({ navigation, route }) => ({
          tabPress: (e) => {
            if (route.state && route.state.routeNames.length > 0) {
              navigation.navigate("Device");
            }
          },
        })}
      />
      <Tab.Screen
        name="Account"
        component={Account}
        options={{ headerShown: false }}
        listeners={({ navigation, route }) => ({
          tabPress: (e) => {
            if (route.state && route.state.routeNames.length > 0) {
              navigation.navigate("Device");
            }
          },
        })}
      />
    </Tab.Navigator>
  );
};

export default TraineeBottomTabScreen;
