import React, { useState, useEffect } from "react";
import { Text, View, Pressable, TextInput, Modal, ScrollView, StyleSheet, ToastAndroid } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import Header from "../../../Components/Header";
import Colors from "../../../constants/Colors";
import Button from "../../../Components/Button";
import { url } from "../../../constants/url";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";
import { RFValue } from "react-native-responsive-fontsize";
import { NavigationSwitchProp } from "react-navigation";
import { useAddCustomServiceMutation, useFitnessLevelChooseMutation } from "../../../slice/FitsApi.slice";
import { androidToast, errorToast } from "../../../utils/toast";
import { UserDetail } from "../../../interfaces";
import Container from "../../../Components/Container";
import Typography from "../../../Components/typography/text";

interface PropsInterface {
  navigation: NavigationSwitchProp;
}

interface Service {
  service_name: string;
  check: boolean;
}

const ServicesOffered = ({ navigation }: PropsInterface) => {
  const [selectedServiceIndex, setSelectedServiceIndex] = useState<number>(-1);
  const [selectedServiceKey, setSelectedServiceKey] = useState<string>("");
  const [modalVisible, setModalVisible] = useState(false);
  const [customServiceName, setCustomServiceName] = useState("");
  const [addCustomServiceMutateAsync, {isLoading: serviceCreateLoading}] = useAddCustomServiceMutation()
  const [mutateAsyncFitnessLevelChoose, {isLoading: fitnessLevelChooseLoading}] = useFitnessLevelChooseMutation()
  const { userInfo } = useSelector((state: { fitsStore: Partial<UserDetail> }) => state.fitsStore);
  const [servicesData, setServicesData] = useState<Service[]>(preDefineServices)

  const goToNextScreen = () => {
    navigation.navigate("CheckUser");
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const changeServiceSelection = (index: number) => {
    setSelectedServiceIndex(index);
    setSelectedServiceKey(servicesData[index].service_name);
  };

  const updateServicesOffered = async () => {
      const servicesOfferedInfo = {
        value: selectedServiceIndex.toString(),
        key: selectedServiceKey,
      };
    const body = {
      services_offered: servicesOfferedInfo
    }
    let result = await mutateAsyncFitnessLevelChoose(body)
    if (result?.data) goToNextScreen()
    if (result?.error) errorToast(result.error?.error?.message);
  };

  const addCustomService = async () => {
      const body = {
          service_name: customServiceName,
          user: userInfo?.user._id,
        }
    const result = await addCustomServiceMutateAsync(body)
    if (!!result?.error) androidToast(result.error?.data?.message)
    if (result.data) {
      const updatedServicesData = [...servicesData, { service_name: customServiceName, check: false }];
      setServicesData(updatedServicesData);
      closeModal();
    }
  };

  const renderServices = () => {
    return servicesData.map((service, index) => (
      <Pressable
        key={service.service_name}
        onPress={() => changeServiceSelection(index)}
        style={[selectedServiceIndex === index ? styles.selectedService : styles.service]}
      >
        <Text style={styles.serviceText}>{service.service_name}</Text>
      </Pressable>
    ));
  };

  return (
    <Container>
      <Header label={"Services Offered"} subLabel="(Select appropriate)" />
      <Pressable style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Typography size={'heading2'} weight="700" style={{marginRight: 2}}>Add new services</Typography>
        <Feather name="plus-circle" color={Colors.primary} size={25} />
      </Pressable>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.servicesContainer}>{renderServices()}</View>
      </ScrollView>

        <Button
        label="NEXT"
        loader={fitnessLevelChooseLoading}
        disabled={fitnessLevelChooseLoading}
        onPress={updateServicesOffered}
        />

      <Modal animationType="fade" transparent={true} visible={modalVisible} onRequestClose={closeModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Add your custom service</Text>

            <View style={styles.inputContainer}>
              <Text style={styles.inputTitle}>Title</Text>
              <TextInput
                style={styles.input}
                placeholder="Add Your Services"
                placeholderTextColor={Colors.white}
                value={customServiceName}
                onChangeText={setCustomServiceName}
              />
            </View>

            <View style={styles.buttonContainer}>
              <Pressable style={styles.cancelButton} onPress={closeModal}>
                <Text style={styles.buttonText}>Cancel</Text>
              </Pressable>
              <Pressable disabled={serviceCreateLoading} style={styles.createButton} onPress={addCustomService}>
                <Text style={styles.buttonText}>Create</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </Container>
  );
};

const styles = StyleSheet.create({
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'space-between',
  },
  servicesContainer: {
    width: "100%",
    alignSelf: "center",
    paddingVertical: 10,
  },
  service: {
    width: "100%",
    height: 70,
    backgroundColor: Colors.black,
    borderRadius: 10,
    justifyContent: "center",
    paddingLeft: 10,
    marginTop: 10,
  },
  selectedService: {
    width: "100%",
    height: 70,
    backgroundColor: Colors.black,
    borderRadius: 10,
    justifyContent: "center",
    borderWidth: 2,
    borderColor: Colors.primary,
    paddingLeft: 10,
    marginTop: 10,
  },
  serviceText: {
    color: Colors.white,
    fontFamily: "Poppins-Regular",
    fontSize: RFValue(14, 580),
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    width: "100%",
    paddingVertical: 20,
    backgroundColor: Colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
  },
  modalTitle: {
    textAlign: "center",
    fontSize: RFValue(16, 580),
    fontFamily: "Poppins-SemiBold",
    color: Colors.black,
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputTitle: {
    color: Colors.white,
    fontSize: RFValue(12, 580),
    fontFamily: "Poppins-Regular",
    marginBottom: 5,
  },
  input: {
    width: "100%",
    height: 40,
    fontSize: RFValue(12, 580),
    fontFamily: "Poppins-Regular",
    color: Colors.white,
    backgroundColor: Colors.black,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cancelButton: {
    backgroundColor: Colors.lightGray,
    width: 120,
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  createButton: {
    backgroundColor: Colors.primary,
    width: 120,
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: Colors.white,
    fontSize: RFValue(12, 580),
    fontFamily: "Poppins-Regular",
  },
});

export default ServicesOffered;


const preDefineServices: Service[] = [
{
  service_name: "Gym instructor",
  check: false,
},
{
  service_name: "Fitness assessment & nutrition advice",
  check: false,
},
{
  service_name: "Personal trainer",
  check: false,
},
{
  service_name: "Physical and online workout",
  check: false,
},
{
  service_name: "Mental health & welbeing",
  check: false,
},
{
  service_name: "Strength and muscular training",
  check: false,
},
{
  service_name: "Martial art & Boxing",
  check: false,
},
{
  service_name: "Technique Guide",
  check: false,
},
{
  service_name: "Cardio/Yoga",
  check: false,
},
];