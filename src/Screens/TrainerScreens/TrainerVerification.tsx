import React, { useState, useEffect } from "react";
import { Text, View, Pressable, StyleSheet, TextInput, ScrollView, ToastAndroid, ActivityIndicator, Platform, Image } from "react-native";
import ImagePicker from "react-native-image-crop-picker";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { RFValue } from "react-native-responsive-fontsize";
import * as Images from "../../constants/Images";
import Header from "../../Components/Header";
import Button from "../../Components/Button";
import { url } from "../../constants/url";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Typography from "../../Components/typography/text";
import Container from "../../Components/Container";

const TrainerVerification = ({ navigation }) => {
  const GoBack = () => {
    navigation.goBack();
  };
  const [image, setImage] = useState("");
  const [details, setDetails] = useState("");
  useEffect(() => {
    navigation.addListener("focus", () => {
      getUserInfo();
    });
  }, []);

  const [token, setToken] = useState("");
  const [id, setId] = useState("");
  const getUserInfo = async () => {
    const userData = await AsyncStorage.getItem("userData");
    let userDatax = JSON.parse(userData);
    setToken(userDatax?.access_token);
    setId(userDatax?.data?._id);
  };

  const [load, setLoad] = useState(false);

  const choosePhotoFromCamera = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 200,
      cropping: true,
      compressImageQuality: 0.4,
    })
      .then((file) => {
        let newFile = {
          uri: file.path,
          type: "image/png",
          name: `image.png`,
        };
        uploadImageOnCloud(newFile);
        setImage(file.path);
      })
  };

  const [cloudImageUrl, setCloudImageUrl] = useState("");
  const uploadImageOnCloud = async (image) => {
    const zzz = new FormData();
    zzz.append("file", image);
    zzz.append("upload_preset", "employeeApp");
    zzz.append("cloud_name", "ZACodders");

    await fetch("https://api.cloudinary.com/v1_1/ZACodders/image/upload", {
      method: "POST",
      body: zzz,
    })
      .then((res) => res.json())
      .then((res2) => {
        setCloudImageUrl(res2?.url);
      })
  };
  const upLoadVideoInfo = async () => {
    if (details === "") {
      ToastAndroid.show("Please Enter Details.", ToastAndroid.SHORT);
    } else if (cloudImageUrl === "") {
      ToastAndroid.show(" Kindly upload verification document picture it could be national identity card, Utility bill, Phone bill, Driving license etc.", ToastAndroid.SHORT);
    } else {
      setLoad(true);
      {
      }
      let Verification_Process;
      (Verification_Process = {
        documet: cloudImageUrl,
        reason: details,
      }),
        await fetch(`${url}/profession/verification/${id}`, {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            verification: Verification_Process,
          }),
        })
          .then((res) => res.json())
          .then((res2) => {
            setLoad(false);

            if (res2.success === true) {
              GoBack();
            } else {
              ToastAndroid.show(res2.message, ToastAndroid.SHORT);
            }
          })
          .catch((error) => {
            setLoad(false);
          });
    }
  };

  return (
    <Container>
          <Header lableStyle={{marginBottom: 10}} label="Verification Process" subLabel="Kindly upload verification document picture it could be national identity card, Utility bill, Phone bill, Driving license etc." />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.TopView}>
          {!image ? (
            <>
            <View
              style={{
                  width: "100%",
                  borderRadius: 20,
                padding: 20,
                backgroundColor: "#979797",
                flexDirection: 'column',
                  alignItems: "center",
                marginBottom: 20  
              }}
              >
                <Typography size={'heading3'} style={{marginBottom: 20}}>yogavideo.mp4</Typography>
                <Image  source={Images.Mp4} />
                <Button style={{marginTop: 20}} variant="tini" label={"Drop file"} onPress={choosePhotoFromCamera} />    
                </View>
                </>
            ) : (
            <View
              style={{
                width: "100%",
                marginTop: 20,
                borderTopRightRadius: 16,
                borderTopLeftRadius: 16,
              }}
            >
              <Image
                style={{
                  width: "90%",
                  height: 200,
                  borderRadius: 5,
                  alignSelf: "center",
                }}
                resizeMode="cover"
                source={{
                  uri: image,
                }}
              />
            </View>
          )}
        </View>
            <Typography size={'heading3'}>
              Reason for Verification
            </Typography>
        <View
          style={{
            width: "100%",
            alignItems: "center",
            marginTop: 5,
          }}
        >
          <View
            style={{
              width: "100%",
              backgroundColor: "#414143",
              borderRadius: 12,
              flexDirection: "column",
              height: 130,
            }}
          >
            <TextInput
              multiline={true}
              numberOfLines={5}
              maxLength={500}
              placeholder="Write your verification reason here....."
              placeholderTextColor={"#fff"}
              style={{
                height: 200,
                textAlignVertical: "top",
                fontFamily: "Poppins-Regular",
                color: "#fff",
                marginHorizontal: 5,
              }}
              value={details}
              onChangeText={setDetails}
            />
          </View>
        </View>
        <View style={{ marginVertical: 10 }}></View>
      </ScrollView>
          <Button
        label="Upload"
        style={{marginBottom: 18}}
            disabled={!details || !cloudImageUrl}
            onPress={upLoadVideoInfo}
          />
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingTop: Platform.OS === "ios" ? 40 : 0,
    paddingBottom: Platform.OS === "ios" ? 0 : 0,
  },
  header: {
    width: "100%",
    height: 120,
  },
  fixeheight: {
    height: 50,
    justifyContent: "center",
    borderBottomWidth: 0.5,
    borderColor: "lightgrey",
    width: "100%",
    alignItems: "center",
  },
  fixeheight1: {
    height: 100,
    width: "100%",
    justifyContent: "center",
  },
  TopView: {
    width: "100%",
    alignItems: "center",
  },
  topView: { width: "90%" },
  topView1: {
    width: "100%",
    alignItems: "center",
  },
  main: {
    width: "100%",
    height: "85%",
  },
  footer: {
    width: "100%",
    marginBottom: 0,
    bottom: 0,
    height: "10%",
    justifyContent: "center",
    position: "absolute",
    backgroundColor: "#fff",
  },
  btn: {
    padding: 10,
    margin: 10,
    width: "90%",
    borderRadius: 10,
    color: "#6698FF",
    backgroundColor: "#FF0000",
    alignItems: "center",
    justifyContent: "center",
  },
  mainBoxView: {
    width: "100%",
    alignItems: "center",
    marginTop: 30,
  },
  BoxText: {
    color: "#fff",
    fontSize: RFValue(9, 580),
    fontFamily: "Poppins-Bold",
    textAlign: "center",
    lineHeight: 21,
    letterSpacing: 2,
  },
  BoxviewWidth1: {
    width: "33%",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  BoxviewWidth2: {
    width: "34%",
    justifyContent: "center",
    alignItems: "center",
  },
  BoxviewWidth3: {
    width: "33%",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  BoxShadowView: {
    width: 101,
    height: 101,
    backgroundColor: "#000000",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#ff0000",
  },
  BoxShadowViewBorder: {
    width: 101,
    height: 101,
    backgroundColor: "#000000",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: hp(1),
    paddingHorizontal: wp(1),
  },
});

export default TrainerVerification;
