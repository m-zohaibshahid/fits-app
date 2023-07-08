import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, StyleSheet, TextInput, ScrollView, Image, ActivityIndicator, Platform } from "react-native";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import { RFValue } from "react-native-responsive-fontsize";
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationSwitchProp } from "react-navigation";
import { useGetChatRoomsQuery } from "../../slice/FitsApi.slice";
import Typography from "../../Components/typography/text";
import Container from "../../Components/Container";
import Colors from "../../constants/Colors";
import useSocket from "../../hooks/use-socket";
import { useSelector } from "react-redux";
import { UserDetail } from "../../interfaces";

interface PropsInterface {
  navigation: NavigationSwitchProp;
}

const Chat = ({ navigation }: PropsInterface) => {
  const { data: getRoomsFromApi } = useGetChatRoomsQuery({});
  const { userInfo } = useSelector((state: { fitsStore: Partial<UserDetail> }) => state.fitsStore);
  const [searchText, setSearchText] = useState("");
  const { activeUsers } = useSocket(userInfo?.user._id || '')

  
  const handlePressOnRoom = (roomId: number) => {
    navigation.navigate("EnterChatforTrainee", { roomId });
  };
  
  console.log('====================================');
  console.log(getRoomsFromApi?.data);
  console.log('====================================');

  const filteredRooms = getRoomsFromApi?.data.filter((room: RoomDataInterface) =>
    room.linkedUser.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <Container>
      <View style={styles.header}>
        <Typography style={{
          marginTop: 10,
          marginBottom: 20,
          marginLeft: 10,
    fontSize: 40
            }}>Chat</Typography>

          <View style={styles.searchBarMainView}>
          <EvilIcons name="search" size={30} style={{ color: "#fff" }} />
              <TextInput
                numberOfLines={1}
                placeholder="Search... "
                placeholderTextColor="#fff"
                value={searchText}
                onChangeText={setSearchText}
                style={styles.searchBarTextInput}
              />
          </View>
        </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.main}>
          <View style={styles.topView}>
            {filteredRooms && filteredRooms.length === 0 ? (
              <View style={styles.noRoomsView}>
                <Typography>No rooms found</Typography>
              </View>
            ) : (
              filteredRooms?.map((item: any) => (
                <TouchableOpacity
                  key={item._id}
                  style={styles.roomContainer}
                  onPress={() => handlePressOnRoom(item._id)}
                >
                  <View style={styles.roomContent}>
                    <Image
                      style={styles.roomImage}
                      source={{ uri: item?.linkedUser.image }}
                    />
                    <View style={styles.roomTextContent}>
                      <Typography size="sectionTitle">{item.linkedUser.name}</Typography>
                      <Typography size={'medium'}>{item.messages[0]?.message}</Typography>
                    </View>
                  </View>
                  {activeUsers.some(user => user.userID === item.linkedUser._id) ?  <View style={styles.activeDot} /> : null}
                </TouchableOpacity>
              ))
            )}
          </View>
        </View>
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 175,
  },
  fixedHeight: {
    height: 175,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  topView: {
    width: "100%",
  },
  chatText: {
    color: "#000000",
    fontSize: RFValue(30, 580),
    marginTop: 10,
    fontFamily: "Poppins-Bold",
  },
  searchBarMainView: {
    width: "100%",
    backgroundColor: "#000",
    borderRadius: 5,
    flexDirection: "row",
    padding: 5,
    alignItems: 'center',
    justifyContent: "center",
  },
  searchBarTextInput: {
    color: "#fff",
    fontFamily: "Poppins-Regular",
    fontSize: RFValue(14, 580),
    width: "85%",
  },
  main: {
    width: "100%",
    backgroundColor: "#fff",
  },
  noRoomsView: {
    width: "100%",
    marginTop: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  roomContainer: {
    width: "100%",
    borderBottomWidth: 1,
    paddingVertical: 15,
    borderColor: "grey",
    position: "relative",
    flex: 1,
    alignItems: "center",
  },
  roomContent: {
    width: "100%",
    alignSelf: "center",
    flexDirection: "row",
  },
  roomImage: {
    width: 60,
    height: 60,
    borderRadius: 100,
  },
  roomTextContent: {
    paddingLeft: 10,
  },
  roomInnerText: {
    fontSize: RFValue(12, 580),
    fontFamily: "Poppins-Regular",
    color: "#000",
  },
  activeDot: {
    position: "absolute",
    top: 25,
    right: 20,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.success
  },
});

export default Chat;


interface RoomDataInterface {
  _id: string;
  createdAt: string;
  linkedUser: {
    id: string;
    image: string;
    name: string;
  }
}
