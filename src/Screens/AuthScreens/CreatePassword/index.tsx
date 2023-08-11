/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import { ScrollView } from "react-native";
import Header from "../../../Components/Header";
import { useRoute } from "@react-navigation/native";
import RNRestart from 'react-native-restart';
import Container from "../../../Components/Container";
import { useCreatePasswordMutation } from "../../../slice/FitsApi.slice";
import { errorToast } from "../../../utils/toast";
import TextInput from "../../../Components/Input";
import Button from "../../../Components/Button";

const CreatePassword = () => {
  const route = useRoute();
  const [password, setPassword] = useState('');
  const [createPasswordMutateAsync] = useCreatePasswordMutation()

  const handleCreatePassword = async () => {
    const body = {
      email: route.params?.email,
      password
    }
    const result = await createPasswordMutateAsync(body)
    if (result.error) {
      errorToast(result.error.data.message)
    } else if (result.data) {
      RNRestart.restart()
      errorToast(result.data.message)
    }
  }



  return (
    <Container>
      <Header label={"Create Password"}/>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TextInput label={"Password"} secureTextEntry  placeholder="Enter password" value={password} onChangeText={setPassword} />
      </ScrollView>
      <Button label={"Create"} onPress={handleCreatePassword} />
    </Container>
  );
};

export default CreatePassword;
