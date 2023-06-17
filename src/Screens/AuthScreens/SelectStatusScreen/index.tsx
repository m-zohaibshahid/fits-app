import React, { useState } from "react";
import {  ToastAndroid, ScrollView } from "react-native";
import Header from "../../../Components/Header";
import StatusCard from "../../../Organisms/SelectStatusCard";
import { selectStatusesData } from "../../../constants/utilities";
import Button from "../../../Components/Button";
import { NavigationSwitchProp } from "react-navigation";
import Container from "../../../Components/Container";
interface Props {
  navigation: NavigationSwitchProp;
} 

const SelectStatusScreen:React.FC<Props> = ({ navigation }) => {
  // Hooks

  const [selectedIndex, setSelectedIndex] = useState();
  const [disable, setDisable] = useState(false);
  const [selectedItem, setSelectedItem] = useState<{title:string}>();

  // Functions
  const goNext = () => {
    if (!disable) {
      return ToastAndroid.show(
        "Please select your status. Trainer or Trainee?",
        ToastAndroid.SHORT
      );
    } else if (selectedItem?.title === "Trainer") {
      return navigation.navigate("SignUp", {
        role: "trainer",
      });
    } else if (selectedItem?.title === "Trainee") {
      return navigation.navigate("SignUp", {
        role: "trainee",
      });
    } else {
      return null;
    }
  };

  const selectItem = (i: React.SetStateAction<undefined>, item: React.SetStateAction<{ title: string; } | undefined>) => {
    setSelectedItem(item);
    setSelectedIndex(i);
    setDisable(true);
  };

  return (
    <Container>
      <Header label={"Select your Status"} lableStyle={{
        fontSize: 100
      }} />

      <ScrollView showsVerticalScrollIndicator={false}>
          <StatusCard
            data={selectStatusesData}
            onPressItem={selectItem}
            selectedIndex={selectedIndex}
          />
      </ScrollView>
        <Button
          disabled={!disable}
          label={"Next"}
          onPress={goNext}
        />
    </Container>
  );
};

export default SelectStatusScreen;
