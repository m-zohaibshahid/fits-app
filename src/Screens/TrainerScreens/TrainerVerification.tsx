import React, { useState } from "react";
import { View, ScrollView, Image, StyleSheet } from "react-native";
import ImagePicker from "react-native-image-crop-picker";
import { useSelector } from "react-redux";
import { useRequestVarificationMutation } from "../../slice/FitsApi.slice";
import { UserDetail } from "../../interfaces";
import * as Images from "../../constants/Images";
import Container from "../../Components/Container";
import Header from "../../Components/Header";
import Button from "../../Components/Button";
import Typography from "../../Components/typography/text";
import { errorToast, successToast } from "../../utils/toast";
import TextInput from "../../Components/Input";

const TrainerVerification = ({ navigation }: any) => {
  const { userInfo } = useSelector((state: { fitsStore: Partial<UserDetail> }) => state.fitsStore);
  const [image, setImage] = useState("");
  const [details, setDetails] = useState("");
  const [cloudImageUrl, setCloudImageUrl] = useState("");
  const [accountVarificationMutation, { isLoading }] = useRequestVarificationMutation();

  const choosePhotoFromCamera = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 200,
      cropping: true,
      compressImageQuality: 0.4,
    }).then((file) => {
      const newFile = {
        uri: file.path,
        type: "image/png",
        name: `image.png`,
      };
      uploadImageOnCloud(newFile);
      setImage(file.path);
    });
  };

  const uploadImageOnCloud = async (image) => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "employeeApp");
    formData.append("cloud_name", "ZACodders");

    const response = await fetch("https://api.cloudinary.com/v1_1/ZACodders/image/upload", {
      method: "POST",
      body: formData,
    });

    const responseData = await response.json();
    setCloudImageUrl(responseData?.url);
  };

  const upLoadVideoInfo = async () => {
    const body = {
      verification: {
        documet: cloudImageUrl,
        reason: details,
      },
    };
    const result = await accountVarificationMutation({ id: userInfo?.user._id, body });
    if (result.error) errorToast(result.error.data.message);
    if (result.data) {
      successToast("Request sent: Wait for approval");
      navigation.goBack();
    }
  };

  return (
    <Container>
      <Header label="Verification Process" subLabel="Kindly upload verification document picture it could be national identity card, Utility bill, Phone bill, Driving license etc." />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.topView}>
          {!image ? (
            <View style={styles.imagePlaceholder}>
              <Typography size="heading3" style={styles.placeholderText}>
                yogavideo.mp4
              </Typography>
              <Image style={{marginBottom: 10}}  source={Images.Mp4} />
              <Button variant="tini" label="Drop file" onPress={choosePhotoFromCamera} />
            </View>
          ) : (
            <View style={styles.imageContainer}>
              <Image style={styles.uploadedImage} resizeMode="cover" source={{ uri: image }} />
            </View>
          )}
        </View>
        <TextInput
          maxLength={200}
          isTextArea
          placeholder="Why you get verification"
          value={details}
          onChangeText={setDetails} label={"Verification Reason"}        />
        <Button
          label="Upload"
          style={styles.uploadButton}
          disabled={!details || !cloudImageUrl}
          onPress={upLoadVideoInfo}
        />
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  topView: {
    width: "100%",
    alignItems: "center",
  },
  imagePlaceholder: {
    width: "100%",
    borderRadius: 20,
    padding: 20,
    backgroundColor: "#979797",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 20,
  },
  placeholderText: {
    marginBottom: 20,
  },
  imageContainer: {
    width: "100%",
    marginTop: 20,
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
  },
  uploadedImage: {
    width: "90%",
    height: 200,
    borderRadius: 5,
    alignSelf: "center",
  },
  textInput: {
    height: 200,
    textAlignVertical: "top",
    fontFamily: "Poppins-Regular",
    color: "#fff",
    marginHorizontal: 5,
  },
  uploadButton: {
    marginBottom: 18,
  },
});

export default TrainerVerification;
