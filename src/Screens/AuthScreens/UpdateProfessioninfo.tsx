import React, { useState, useEffect } from "react";
import { Text, View, Pressable, ScrollView, StyleSheet} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import Header from "../../Components/Header";
import Colors from "../../constants/Colors";
import Button from "../../Components/Button";
import TextInput from "../../Components/Input";
import RNRestart from 'react-native-restart';
import Conatiner from "../../Components/Container";
import { NavigationSwitchProp } from "react-navigation";
import { useSelector } from "react-redux";
import { UserDetail } from "../../interfaces";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Qualification } from "../../slice/store.interface";
import { RFValue } from "react-native-responsive-fontsize";
import Typography from "../../Components/typography/text";
import { useProfessionInfoUpdateMutation } from "../../slice/FitsApi.slice";
import { errorToast } from "../../utils/toast";
import moment from "moment";

interface Props {
  navigation: NavigationSwitchProp;
}

const UpdateProfessioninfo: React.FC<Props> = ({ navigation }) => {
  const { userInfo } = useSelector((state: { fitsStore: Partial<UserDetail> }) => state.fitsStore);
const [professionInfoUpdateMutateAsync, {isLoading}] = useProfessionInfoUpdateMutation()
  const [qualifications, setQualifications] = useState<Qualification[]>([{degree: '', degree_note: ''}]);
  const [isYearPickerVisible, setIsYearPickerVisible] = useState<boolean>(false);
  const [experienceYear, setExperienceYear] = useState(new Date().getFullYear().toString());
  const [experienceNote, setExperienceNote] = useState("");

  useEffect(() => {
    navigation.addListener("focus", setInitialState);
  }, []);

  
  const setInitialState = () => { 
    setQualifications(userInfo?.profession_info.qualification ?? []);
    setExperienceYear(userInfo?.profession_info.experience_year ?? experienceYear);
    setExperienceNote(userInfo?.profession_info.experience_note ?? '');
  }


   const UpdateProfessionallInfo = async () => {
        const body = {
          qualification: qualifications,
          experience_year: experienceYear,
          experience_note: experienceNote,
        }
     const result = await professionInfoUpdateMutateAsync({ id: userInfo?.profession_info._id, body })
     if (result?.data?.success) RNRestart.restart()
     if (result?.error) errorToast(result?.error?.data?.message);
  }; 

  const handleChangeInput = (value: string, index: number, field: 'degree_note' | 'degree') => {
    setQualifications((prevQualifications) => {
      const updatedQualifications = [...prevQualifications];
      updatedQualifications[index] = {
        ...updatedQualifications[index],
        [field]: value,
      };
      return updatedQualifications;
    });
  };
  
  const delQualification = (index: number) => {
    setQualifications(pre => {
      const deepCopy = [...pre]
      deepCopy.slice(index, 1)
      return deepCopy
    });
  };

  const addQualification = () => {
    setQualifications([...qualifications, {degree: '', degree_note: ''}]);
  };

  const handleConfirmDate = (date: moment.MomentInput) => {
    setExperienceYear(moment(date).format("YYYY"))
  };

  return (
    <Conatiner>
      <Header label="Profession Info" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollViewContent}>
        <TextInput
          maxLength={500}
          placeholderTextColor={Colors.white}
          value={experienceNote}
          isTextArea
          onChangeText={setExperienceNote}
          label={"Any Description related to your profession"}
        />
        <TextInput
          value={experienceYear}
          handleOnPress={() => setIsYearPickerVisible(true)}
          isEditable={false}
          label={"Select Experience Year"} />

          <Typography size={'heading2'} weight="600" style={{marginTop: 20}} bottom={"mb7"}>
            Qualifications <Typography size={"small"}>(up to 3 degrees)</Typography>
          </Typography>
          {qualifications.map((item, index) => (
            <View key={index} style={styles.qualificationItem}>
              <View style={styles.inputIconWrapper}>
              <TextInput
                style={{flex: 1}}
                label="Degree/certificate"
                placeholderTextColor={Colors.white}
                value={item.degree}
                onChangeText={(text) => handleChangeInput(text, index, 'degree')}
                />
                  <Pressable style={{padding: 20}}  onPress={() => delQualification(index)}>
                    <AntDesign name="delete" color={'red'} size={20} />
                  </Pressable>
                </View>

              <TextInput
                isTextArea={true}
                maxLength={500}
                placeholderTextColor={Colors.white}
                value={item.degree_note}
                onChangeText={(text) => handleChangeInput(text, index, 'degree_note')} label={"Description related to degrees"}                  />
              
            </View>
          ))}
          <Pressable onPress={addQualification} style={styles.addQualificationButton}>
            <Ionicons name="add-circle-outline" style={styles.addIcon} />
            <Text style={styles.addQualificationText}>Add qualifications</Text>
          </Pressable>
      </ScrollView>
      <Button loader={isLoading} style={{marginVertical: 10}} onPress={UpdateProfessionallInfo} label={"Update"}          />
      <DateTimePickerModal
        isVisible={isYearPickerVisible}
        mode="date"
        onConfirm={handleConfirmDate}
        onCancel={() => setIsYearPickerVisible(false)}
      />
    </Conatiner>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  qualificationsView: {
    marginTop: 25,
    marginBottom: 10,
    alignItems: "center",
  },
  qualificationstext: {
    fontFamily: "Poppins-Bold",
    fontSize: RFValue(18, 580),
    color: Colors.black,
  },
  uptotext: {
    fontFamily: "Poppins-Regular",
    fontSize: RFValue(9, 580),
    marginTop: 10,
  },
  qualificationItem: {
    marginBottom: 10,
  },
  inputIconWrapper: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    borderRadius: 20,
    overflow: 'hidden'
  },
  bgcolorview: {
    width: "81%",
    backgroundColor: Colors.black,
    borderRadius: 8,
  },
  deleteiconview: {
    width: 50,
    height: 50,
    backgroundColor: Colors.gray,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  deleteIcon: {
    fontSize: 20,
    color: "red",
  },
  degreeNoteView: {
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
  degreeNote: {
    textAlignVertical: "top",
    fontFamily: "Poppins-Regular",
    color: Colors.white,
  },
  addQualificationButton: {
    width: "100%",
    alignItems: "center",
    marginTop: 15,
    flexDirection: 'row'
  },
  addIcon: {
    fontSize: 30,
    color: Colors.black,
  },
  addQualificationText: {
    fontFamily: "Poppins-Regular",
    fontSize: RFValue(14, 580),
    lineHeight: 25,
    color: Colors.black,
  },
  buttonContainer: {
    paddingVertical: 10,
    width: "100%",
  },
});

export default UpdateProfessioninfo;
