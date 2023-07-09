/* eslint-disable prettier/prettier */
import * as React from "react";
import { View, ViewStyle, TextStyle, StyleSheet } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import Typography from "../typography/text";

interface HeaderProps {
  label: string;
  subLabel?: string;
  lableStyle?: TextStyle | ViewStyle;
  hideBackButton?: boolean;
  showCloseButton?: boolean;
  onClose?: () => void;
}

const Header = ({ label, subLabel, lableStyle, hideBackButton, showCloseButton, onClose }: HeaderProps) => {
  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
  };
  return (
    <View>
     {hideBackButton ? null : <View style={styles.firstArrowHeaderRect1}>
        <AntDesign
          onPress={goBack}
          name="arrowleft"
          style={{
            fontSize: 27,
            color: "#130F26",
          }}
        />
      </View>}
    
      <View style={[styles.label]}>
        <View style={[styles.labelContainer, {
          marginTop: 10,
          marginBottom: subLabel ? 18 : 40,
        }, lableStyle]}>
        <Typography
          size="pageTitle"
          weight="700"
          >
          {label}
        </Typography>
          {showCloseButton ? 
          <AntDesign
          onPress={onClose}
          name="closecircleo"
          style={{
            fontSize: 27,
            color: "#130F26",
          }}
        /> : null}
          </View>
        
        {subLabel ? (
          <Typography
            size="pageSubTitle"
            style={{
              marginBottom: 50,
            }}
            weight="500"
            color="blackishGray"
          >
            {subLabel}
          </Typography>
        ) : null}
      </View>
    </View>
  );
};

export default Header;


const styles = StyleSheet.create({
  firstArrowHeaderRect1: {
    height: 60,
    borderBottomWidth: 0.5,
    justifyContent: "center",
    borderColor: "lightgrey",
    width: "100%",
  },
  closeIcon: {
    height: 60,
    borderBottomWidth: 0.5,
    justifyContent: "flex-end",
    borderColor: "lightgrey",
    width: "100%",
  },
  labelContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  bottomHeaderRect2: {
    height: 70,
    width: "100%",
  },
  bottomHeaderRect2ForDouble: {
    height: 110,
    width: "100%",
    justifyContent: "center",
  },
  label: {
    paddingLeft: 5,
    width: "100%",
  },
});