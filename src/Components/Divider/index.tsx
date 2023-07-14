import * as React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import Colors from "../../constants/Colors";



export default function Divider() {
    
    return <View style={styles.divider} />;
}

const styles = StyleSheet.create({
    divider: {
        backgroundColor: Colors.blackishGray,
        height: .5,
    },
});