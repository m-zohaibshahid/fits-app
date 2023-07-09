/* eslint-disable prettier/prettier */
import * as React from "react";
import { View, ViewStyle, TextStyle } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import Typography from "../typography/text";

interface HeaderProps {
  label?: string;
  subLabel?: string;
  lableStyle?: TextStyle | ViewStyle;
  navigation?: any;
}

const Header = ({ label, subLabel, lableStyle, navigation }: HeaderProps) => {
  // const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
  };
  return (
    <View>
      <View style={styles.firstArrowHeaderRect1}>
        <AntDesign
          onPress={() => goBack()}
          name="arrowleft"
          style={{
            fontSize: 27,
            color: "#130F26",
          }}
        />
      </View>
      <View style={[lableStyle, styles.label]}>
        <Typography
          size="pageTitle"
          weight="700"
          style={{
            marginTop: 10,
            marginBottom: subLabel ? 18 : 40,
          }}
        >
          {label}
        </Typography>
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
