import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Pressable, Platform, ScrollView } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import moment from "moment";
import { NavigationSwitchProp } from "react-navigation";
import { useSelector } from "react-redux";
import { UserDetail } from "../../interfaces";
import { useGetMyBookedClassesQuery } from "../../slice/FitsApi.slice";
import Typography from "../../Components/typography/text";
import Entypo from "react-native-vector-icons/Entypo";
import FullPageLoader from "../../Components/FullpageLoader";
import { heightPercentageToDP } from "react-native-responsive-screen";

interface PropsInterface {
  navigation: NavigationSwitchProp;
}

const ScheduledClasses = ({ navigation }: PropsInterface) => {
  const { userInfo } = useSelector((state: { fitsStore: Partial<UserDetail> }) => state.fitsStore);
const [expendedItemDeatils, setExpendedItemDetails] = useState<SessionInterface | null>(null)
  const {data: myBookedClassesApiResponse, refetch, isLoading} = useGetMyBookedClassesQuery({})
  const [expandedClassIndex, setExpandedClassIndex] = useState<number | null>(null);

  useEffect(() => {
    navigation.addListener("focus", () => {
      refetch();
    });
  }, []);

  const DetailItem = ({ label, value }: { label: string; value: string | number | string[] }) => (
    <View style={styles.dotmainview}>
      <View style={styles.dotview}>
        <FontAwesome name="circle" style={{ color: "#979797" }} />
      </View>
      <View style={{ width: "100%" }}>
        <Text style={styles.textstyle}>
          <Typography weight="700" color="white" size={"heading4"}>
            {label}:
          </Typography>
          {"\n"}
          {Array.isArray(value) ? value?.map(item => {
            return <Typography weight="300" color="whiteRegular">
            {"          "}
            {item}
          </Typography>
          } )
          : 
          <Typography weight="300" color="whiteRegular">
            {"          "}
            {value}
          </Typography>}
        </Text>
      </View>
    </View>
  );

  const renderDetails = () => {
    return (
      <View style={{ padding: heightPercentageToDP(2) }}>
        <DetailItem label="Title" value={expendedItemDeatils?.class_title ?? ''} />
        <DetailItem label="Description" value={expendedItemDeatils?.details ?? ''} />
        <DetailItem label="Price" value={expendedItemDeatils?.price ?? 0} />
        <DetailItem label="Ratings" value={expendedItemDeatils?.averageRating ?? ''} />
        <DetailItem label="Duration" value={expendedItemDeatils?.duration ?? ''} />
        <DetailItem label="Equipments" value={expendedItemDeatils?.equipment.length ? expendedItemDeatils?.equipment : 'No need of any Equipment'} />
        <DetailItem label="Trainer Name" value={expendedItemDeatils?.trainer.name ?? ''} />
        <DetailItem label="Session Type" value={expendedItemDeatils?.session_type.type ?? ''} />
      </View>
    );
  };

  if (isLoading) {
    return <FullPageLoader />
  }
  
  return (
    <View>
       <ScrollView showsVerticalScrollIndicator={false}>
        {!myBookedClassesApiResponse?.length ? <View style={{ display: 'flex', justifyContent: 'center', alignItems: "center", height: '100%' }}><Typography style={{ marginBottom: 30 }}>---You dont have any Class yet---</Typography></View> : myBookedClassesApiResponse.map((item, i) => {
          const isExpended = expendedItemDeatils?._id === item._id
           return <>
           <View style={styles.marchmainview}>
             <View style={styles.marchmainview2}>
               <View style={{ width: "27%", alignItems: "center" }}>
                 <Text style={styles.marchtext}>{moment(item.select_date).format("DD MMMM")}</Text>
                 <Typography color="white" children={moment(item.select_date).format("ddd")} />
               </View>
               <View style={{ width: "5%", alignItems: "center" }}>
                 <View
                   style={{
                     width: 2,
                     height: 50,
                     backgroundColor: "#fff",
                   }}
                 />
               </View>
               <View style={{ width: "30%", flexDirection: "column" }}>
                 <Text
                   style={{
                     color: "#fff",
                     fontSize: RFValue(10, 580),
                     fontFamily: "Poppins-Regular",
                   }}
                 >
                   {moment(item?.class_time).format("hh:mm A")}
                 </Text>
               </View>
               <Pressable
                 onPress={() => setExpendedItemDetails(expendedItemDeatils?._id === item._id ? null : item)}
                 style={{
                   width: "30%",
                   backgroundColor: "#414143",
                   alignItems: "center",
                   borderRadius: 12,
                   height: 50,
                   justifyContent: "center",
                 }}
               >
                 <View
                   style={{
                     width: "100%",
                     alignItems: "center",
                     flexDirection: "row",
                   }}
                 >
                   <View style={{ width: "80%", justifyContent: "center" }}>
                     <Text
                       style={{
                         color: "#fff",
                         fontSize: RFValue(14, 580),
                         fontFamily: "Poppins-Regular",
                         textAlign: "center",
                       }}
                     >
                       Details
                     </Text>
                   </View>
                   <Entypo name={isExpended ? "chevron-up" : "chevron-down"} size={18} color={"#fff"} />
                 </View>
               </Pressable>
             </View>
             {isExpended && renderDetails()}
             </View>
           </>
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingTop: Platform.OS === "ios" ? 40 : 0,
    paddingBottom: 0,
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
    height: 70,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  main: {
    width: "100%",
    height: "100%",
    paddingVertical: 10,
  },
  TopView: {
    width: "100%",
    alignItems: "center",
  },
  topView: {
    width: "100%",
  },
  rowView: {
    width: "100%",
    flexDirection: "row",
  },
  borderView: {
    width: "100%",
    borderWidth: 1,
    bordercolor: "#000",
  },
  textstyle: {
    color: "#979797",
    fontSize: RFValue(12, 580),
    fontFamily: "Poppins-Regular",
  },
  dotmainview: {
    width: "100%",
    flexDirection: "row",
    marginBottom: 10,
  },
  dotview: {
    width: "10%",
    alignItems: "center",
  },
  marchmainview: {
    width: "100%",
    backgroundColor: "#000",
    justifyContent: "center",
    borderRadius: 14,
    marginBottom: 10
  },
  marchmainview2: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingVertical: 9,
  },
  marchtext: {
    color: "#fff",
    fontSize: RFValue(12, 580),
    fontFamily: "Poppins-SemiBold",
  },
  mainbtnView: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#fff",
  },
  ccbtnview: {
    backgroundColor: "#ff0000",
    width: 100,
    height: 45,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  profilebtnview: {
    backgroundColor: "#ff0000",
    width: 100,
    height: 45,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  btntextstyle: {
    color: "#fff",
    fontSize: RFValue(10, 580),
    fontFamily: "Poppins-Regular",
  },
  upcomingtextstyle: {
    fontSize: RFValue(17, 580),
    fontFamily: "Poppins-SemiBold",
    color: "#000",
  },
  paymenttextstyle: {
    fontSize: RFValue(20, 580),
    fontFamily: "Poppins-Bold",
    color: "#000000",
    lineHeight: 51,
  },
  beforclasstextstyle: {
    fontSize: RFValue(12, 580),
    fontFamily: "Poppins-Regular",
    color: "#000000",
    lineHeight: 25,
  },
  totalView: {
    width: "50%",
  },
  $10View: {
    width: "50%",
    alignItems: "flex-end",
  },
  totalText: {
    fontFamily: "Poppins-Bold",
    fontSize: RFValue(17, 580),
    lineHeight: 50,
    color: "#000",
  },
  walletText: {
    fontFamily: "Poppins-Regular",
    fontSize: RFValue(17, 580),
    lineHeight: 40,
    color: "#000",
  },
  footer: {
    width: "100%",
    marginBottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  btn: {
    padding: 10,
    width: "100%",
    borderRadius: 10,
    backgroundColor: "#FF0000",
    alignItems: "center",
    justifyContent: "center",
  },
  paytextstyle: {
    color: "#FFFFFF",
    fontSize: RFValue(12, 580),
    fontFamily: "Poppins-SemiBold",
  },
});

export default ScheduledClasses;


export type GetMyBookedSessionsApiInterface = SessionInterface[]

export interface SessionInterface {
  _id: string
  image: string
  numReviews: number
  averageRating: number
  session_title: string
  class_title: string
  select_date: string
  class_time: string
  duration: number
  equipment: any[]
  session_type: SessionType
  sports: string
  details: string
  price: number
  no_of_slots: number
  user: string
  createdAt: string
  updatedAt: string
  __v: number
  trainer: Trainer
}

export interface SessionType {
  _id: string
  type: string
  recordCategory: string
  no_of_play: string
  videoTitle: string
}

export interface Trainer {
  _id: string
  name: string
  date_of_birth: string
  country: string
  state: string
  city: string
  gender: string
  user: string
  profileImage: string
  phoneNumber: number
  createdAt: string
  updatedAt: string
  __v: number
}
