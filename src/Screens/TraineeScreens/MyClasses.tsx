import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import {  RFValue } from "react-native-responsive-fontsize";
import ScheduledClasses from "./ScheduledClasses";
import VideosForClasses from "./VideosForClasses";
import Typography from "../../Components/typography/text";
import { NavigationSwitchProp } from "react-navigation";
import Colors from "../../constants/Colors";
import Header from "../../Components/Header";
import Container from "../../Components/Container";

enum TabsTypes {
  CLASSES = 'classes',
  VIDEOS = 'videos'
}

interface PropsInterface {
  navigation: NavigationSwitchProp;
}

const MyClasses = ({ navigation }: PropsInterface) => {
  const [currentTab, setCurrentTab] = useState<TabsTypes>(TabsTypes.CLASSES);

  return (
    <Container>
      <Header label="My Classes" lableStyle={{marginBottom: 15, marginTop: 20}} />
      <View style={styles.tabsTextWarper}>
      <Typography style={currentTab === TabsTypes.CLASSES  ? {      borderBottomColor: Colors.redColor,      borderBottomWidth: 2,    }  : {} }
                color={currentTab === TabsTypes.CLASSES ? "redColor" : "black"}
                size="medium"
                onPress={() => setCurrentTab(TabsTypes.CLASSES)}
                pressAble
                >
                Booked Classes
              </Typography>
      <Typography
                style={
                  currentTab === TabsTypes.VIDEOS
                  ? {
                    borderBottomColor: Colors.redColor,
                    borderBottomWidth: 2,
                  }
                    : {}
                }
                color={currentTab === TabsTypes.VIDEOS ? "redColor" : "black"}
                size="medium"
                onPress={() => setCurrentTab(TabsTypes.VIDEOS)}
                pressAble
                >
                My Videos
              </Typography>
                  </View>
        {currentTab === TabsTypes.CLASSES ? <ScheduledClasses navigation={navigation} /> : null}
        {currentTab === TabsTypes.VIDEOS ? <VideosForClasses navigation={navigation} /> : null}
    </Container>
  );
};

const styles = StyleSheet.create({
  tabsTextWarper: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
});
export default MyClasses;
