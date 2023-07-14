import React, { useState } from "react";
import {
  View,
  StyleSheet,
} from "react-native";
import ScheduledClasses from "./ScheduledClasses";
import VideosForClasses from "./VideosForClasses";
import Container from "../../Components/Container";
import { NavigationSwitchProp } from "react-navigation";
import Typography from "../../Components/typography/text";
import Colors from "../../constants/Colors";
import Header from "../../Components/Header";

interface PropsInterface {
  navigation: NavigationSwitchProp;
}

enum TabsTypes {
  CLASSES = 'classes',
  VIDEOS = 'videos',
}

const MyClasses = ({ navigation }: PropsInterface) => {
  const [currenttab,setCurrenttab] = useState<TabsTypes>(TabsTypes.CLASSES);

  return (
    <Container>
      <Header label="My Classes" hideBackButton lableStyle={{marginTop: 40, marginBottom: 20}} />
      <View style={styles.toptabmainview}>
        <Typography style={currenttab === TabsTypes.CLASSES ? { borderBottomColor: Colors.redColor, borderBottomWidth: 2 } : {}} color={currenttab === TabsTypes.CLASSES ? "redColor" : "black"} size="medium" onPress={() => setCurrenttab(TabsTypes.CLASSES)} pressAble>Booked Classes</Typography>
        <Typography style={currenttab === TabsTypes.VIDEOS ? { borderBottomColor: Colors.redColor, borderBottomWidth: 2} : {}} color={currenttab === TabsTypes.VIDEOS ? "redColor" : "black"} size="medium" onPress={() => setCurrenttab(TabsTypes.VIDEOS)} pressAble>My Videos</Typography>
      </View>
        {currenttab === TabsTypes.CLASSES ? <ScheduledClasses navigation={navigation} /> : null}
        {currenttab === TabsTypes.VIDEOS ? <VideosForClasses navigation={navigation} /> : null}
    </Container>
  );
};

const styles = StyleSheet.create({
  toptabmainview: {
    width: "100%",
    flexDirection: "row",
    justifyContent: 'space-around'
  },
});
export default MyClasses;
