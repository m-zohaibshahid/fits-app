import React, { useState, useRef, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
  Image,
  Platform,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { RFValue } from "react-native-responsive-fontsize";
import { useRoute } from "@react-navigation/native";
import moment from "moment";
import { NavigationSwitchProp } from "react-navigation";
import Container from "../../Components/Container";
import Colors from "../../constants/Colors";
import Typography from "../../Components/typography/text";
import Divider from "../../Components/Divider";
import { MessageInterface, UserDetail } from "../../interfaces";
import { useGetRoomMessagesQuery, useSendMessageMutation } from "../../slice/FitsApi.slice";
import { useSelector } from "react-redux";
import useSocket from "../../hooks/use-socket";
import { SendMessageToSocketInterface } from "../../hooks/types";

interface PropsInterface {
  navigation: NavigationSwitchProp;
}

const ChatBox = ({ navigation }: PropsInterface) => {
  const route = useRoute();
  const { userInfo } = useSelector((state: { fitsStore: Partial<UserDetail> }) => state.fitsStore);
  const scrollViewRef = useRef<ScrollView>(null);
  const { refetch: getRoomMessages } = useGetRoomMessagesQuery(route.params?.roomId);
  const [mutateAsyncSendMessage] = useSendMessageMutation();
  const [sendSocketMessage, setSendSocketMessage] = useState<SendMessageToSocketInterface | null>();
  const [messages, setMessages] = useState<MessageInterface[]>([]);
  const [message, setMessage] = useState("");
  const { socket, sendMessageToSocket } = useSocket(userInfo?.user._id || "")

  useEffect(() => {
    socket.on("receive-message", () => {
      handleGetMessages()
      setSendSocketMessage(null)
      });
  }, []);

  useEffect(() => {
    if (sendSocketMessage) {
      setMessage("")
      handleGetMessages()
      sendMessageToSocket(sendSocketMessage)
    }
  }, [sendSocketMessage]);

  useEffect(() => {
    navigation.addListener("focus", async () => handleGetMessages())
  }, [])
  
  const handleGetMessages = async () => {
    const result = await getRoomMessages()
    const interLeavedMessages = interleaverMessages(result.data?.data.messages || [])
    setMessages(interLeavedMessages)
  }

  const handleSendNewMessage = async () => {
    const body = {
      text: message,
      roomId: route.params?.roomId
    }
    const result = await mutateAsyncSendMessage(body)
    if (result?.data) {
      await handleSetSocketMessage()
    }
  };

  const handleSetSocketMessage = async () => {
    const body = { linkedUserId: route.params?.linkedUser.id, roomId: route.params?.roomId };
    setSendSocketMessage(body);
  }


  const interleaverMessages = (data: MessageInterface | MessageInterface[]): MessageInterface[] => {
    const messagesArray = Array.isArray(data) ? data : [data];

    return messagesArray.map(message => {
      const formattedTime = moment(message.createdAt).format('h:mm A');
      return {
        ...message,
        createdAt: formattedTime,
      };
    });
  };

  const getUniqueMessageById = (array: MessageInterface[]): MessageInterface[] => {
    const result: MessageInterface[] = [];
    const uniqueIDs = new Set();
    array.forEach((item) => {
      if (!uniqueIDs.has(item._id)) {
        uniqueIDs.add(item._id)
        result.push(item)
      }
    })
    return result
  }

  return (
    <Container>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={() => navigation.goBack("")}>
            <AntDesign
              name="arrowleft"
              size={25}
              style={styles.headerIcon}
            />
          </TouchableOpacity>
          <View style={styles.profileImageContainer}>
            <Image
              style={styles.profileImage}
              source={{ uri: route.params?.linkedUser.image }}
            />
          </View>
          <View style={styles.headerTextContainer}>
            <Text style={styles.receiverName}>
              {route.params?.linkedUser.name}
            </Text>
            {route.params?.status ?
              <View style={{flexDirection: "row", alignItems: 'center'}}>
              <View style={styles.circleIcon}></View>
                <Typography color="disabled">{"  "}Online</Typography>
              </View> : null
            }
          </View>
        </View>
      </View>
      <Divider />
        <ScrollView
          showsVerticalScrollIndicator={false}
        ref={scrollViewRef}
        style={{paddingVertical: 20, paddingHorizontal: 15, marginBottom: 30}}
          onContentSizeChange={() =>
            scrollViewRef.current ? scrollViewRef.current.scrollToEnd({ animated: true }) : null
          }
        >
            {getUniqueMessageById(messages).map((item) => (
                <View key={item._id} style={[item.userId === userInfo?.user._id ? styles.selfMessageStyle : styles.otherMessageStyle]}>
                  <Typography color="whiteRegular" style={{marginBottom: 5}} size='medium'>
                    {item.message}
                  </Typography>
                  <Typography color="whiteRegular" size={'extraSmall'}>
                    {item.createdAt}
                  </Typography>
                </View>
            ))}
      </ScrollView>
      <Divider />
      <View style={styles.footer}>
            <TextInput
              placeholder="Type a message…"
              placeholderTextColor="black"
              style={styles.messageInput}
              value={message}
              onChangeText={setMessage}
            />
            <TouchableOpacity
              style={styles.sendButtonContainer}
              onPress={handleSendNewMessage}
            >
              <FontAwesome name="send" size={20} color={"#000"} />
            </TouchableOpacity>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingTop: Platform.OS === "ios" ? 40 : 0,
  },
  circleIcon: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.darkGreen
  },
  header: {
    width: "100%",
    marginBottom: 10
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
  },
  headerIcon: {
    color: "#130F26",
  },
  profileImageContainer: {
    width: "20%",
    justifyContent: "center",
    alignItems: "center",
  },
  profileImage: {
    width: 45,
    height: 45,
    borderRadius: 200 / 2,
  },
  headerTextContainer: {
    width: "60%",
  },
  receiverName: {
    fontSize: RFValue(16, 580),
    fontFamily: "Poppins-SemiBold",
    color: "#000",
  },
  main: {
    flex: 1,
    marginTop: 40,
  },
  messageContainer: {
    width: "100%",
    alignItems: "center",
  },
  selfMessageStyle: {
    width: "80%",
    backgroundColor: Colors.black,
    marginBottom: 20,
    padding: 10,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingLeft: 14,
    marginLeft: "auto",
  },
  otherMessageStyle: {
    width: "80%",
    marginBottom: 20,
    backgroundColor: Colors.bgRedBtn,
    padding: 10,
    paddingVertical: 10,
    borderTopLeftRadius: 16,
    borderBottomRightRadius: 16,
    borderTopRightRadius: 16,
    paddingLeft: 14,
  },
  messageContent: {
    width: "80%",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  messageBubble: {
    padding: 5,
    borderRadius: 16,
    paddingLeft: 14,
  },
  messageText: {
    fontFamily: "Poppins-Regular",
    color: "#fff",
    fontSize: RFValue(11, 580),
    textAlign: "auto",
  },
  messageTimeContainer: {
    flexDirection: "row",
    width: "95%",
  },
  messageTime: {
    color: "white",
  },
  bottomSpacing: {
    marginBottom: 140,
  },
  footer: {
    width: "100%",
    alignItems: "center",
    // justifyContent: "center",
    flexDirection: "row",
    bottom: 0,
    paddingVertical: 5,
    transform: [{translateY: -10}],
  },
  messageInput: {
    width: "85%",
    fontFamily: "Poppins-Regular",
    alignItems: "center",
    left: 5,
    top: 5,
    fontSize: RFValue(16, 580),
  },
  sendButtonContainer: {
    width: "15%",
    justifyContent: "flex-end",
    alignItems: "center",
    transform: [{translateY: 6}],
  },
});

export default ChatBox;
