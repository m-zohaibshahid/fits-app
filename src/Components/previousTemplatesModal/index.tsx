import { View, Text, Modal, ScrollView, Pressable, StyleSheet, Platform } from 'react-native'
import React, { useMemo, useState } from 'react'
import moment from 'moment'
import Entypo from 'react-native-vector-icons/Entypo'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { RFValue } from 'react-native-responsive-fontsize'
import Colors from '../../constants/Colors'
import { useTrainerSessionQuery } from '../../slice/FitsApi.slice'
import { UserDetail } from '../../interfaces'
import { useSelector } from 'react-redux'
import { SessionItemType } from '../../Screens/TrainerScreens/ClassesScreen'
import Typography from '../typography/text'
import TextInput from '../Input'
import Container from '../Container'
import Header from '../Header'
import Button from '../Button'

interface PreviousTemplatesModalProps {
    isVisible: boolean
    onClose: () => void
    onSelect: (item: SessionItemType) => void
}

const PreviousTemplatesModal = ({ isVisible, onClose, onSelect }: PreviousTemplatesModalProps) => {
  const { userInfo } = useSelector((state: { fitsStore: Partial<UserDetail> }) => state.fitsStore);
  const [expendedItemDetails, setExpendedItemDetails] = useState<SessionItemType | null>()
  const [searchText, setSearchText] = useState('')
    const { data: trainerSession, refetch: refetchSessions, isLoading: getAllSessionLoading } = useTrainerSessionQuery(userInfo?.user?._id || '');
    
    const filteredClasses = useMemo(() => {
        return trainerSession?.data?.session?.filter((item: SessionItemType) => {
          return item.session_title.toLowerCase().includes(searchText.toLowerCase())
        })
      }, [trainerSession, refetchSessions])

      const DetailItem = ({ label, value }: { label: string; value: string | number | string[] }) => {
        return (
          <View style={styles.dotmainview}>
            <View style={styles.dotview}>
              <FontAwesome name="circle" style={{ color: "#979797" }} />
            </View>
              <Text style={styles.textstyle}>
                <Typography weight="700" color="white" size={"heading4"}>
                  {label}:
                </Typography>
                {"\n"} 
                {Array.isArray(value) ? value.map(item => {
                  return <Typography weight="300" color="whiteRegular">
                    {"          "}
                    {item}
                  </Typography>;
                })
                  :
                  <Typography weight="300" color="whiteRegular">
                    {"          "}
                    {value}
                  </Typography>}
              </Text>
          </View>
        );
      };
    
      const renderDetails = () => {
        return (
          <View style={{ paddingHorizontal: 10 }}>
            <DetailItem label="Title" value={expendedItemDetails?.class_title ?? ''} />
            <DetailItem label="Description" value={expendedItemDetails?.details ?? ''} />
            <DetailItem label="Price" value={expendedItemDetails?.price ?? 0} />
            <DetailItem label="Ratings" value={`${expendedItemDetails?.averageRating.toFixed(2)} * reviews(${expendedItemDetails?.numReviews})`} />
            <DetailItem label="Duration" value={expendedItemDetails?.duration ?? ''} />
            <DetailItem label="Session Type" value={expendedItemDetails?.session_type?.type ?? ''} />
          </View>
        );
      };
    
    
  return (
    <Modal
          animationType="slide"
          transparent={true}
          visible={isVisible}
          style={{height: '80%',paddingHorizontal: 100, position: 'absolute', bottom: 0}}
          onRequestClose={onClose}
        >
          <Container>
              <Header onClose={onClose} hideBackButton showCloseButton label='Tap to Select' lableStyle={{color: Colors.transparentBlack}} />
              <TextInput label={'Search session'} isSearchBox value={searchText} onChangeText={setSearchText} placeholder='Type here...' />
              <ScrollView style={{height: '70%'}} showsVerticalScrollIndicator={false}>
              {!filteredClasses?.length ? <View style={{ display: 'flex', justifyContent: 'center', alignItems: "center" }}><Typography style={{ marginBottom: 30 }}>---You dont have any Class yet---</Typography></View> : filteredClasses.map((item: SessionItemType) => {
          const isExpended = expendedItemDetails?._id === item._id
           return <>
           <View style={styles.marchmainview}>
             <View style={styles.marchmainview2}>
                <Button variant='tini' label={'Select'} onPress={() => onSelect(item)} />
                 <View
                   style={{
                    width: 2,
                    marginHorizontal: 10,
                    height: 50,
                    backgroundColor: "#fff",
                   }}
                 />
               <View style={{ width: "30%", flexDirection: "column" }}>
                 <Typography color='white' size={'medium'}>
                   {item.class_title.slice(0, 10)}...
                 </Typography>
                 <Typography color='white' size={'medium'}>
                   {moment(item?.class_time).format("hh:mm A")}
                 </Typography>
               </View>
               <Pressable
                 onPress={() => setExpendedItemDetails(expendedItemDetails?._id === item._id ? null : item)}
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
                     alignItems: "center",
                     flexDirection: "row",
                   }}
                 >
                   <View style={{ width: "80%", justifyContent: "center" }}>
                     <Typography align='center' size={'large'} color='white'>
                       Details
                     </Typography>
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
            </Container>
        </Modal>
  )
}

export default PreviousTemplatesModal


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#ffffff",
      paddingTop: Platform.OS === "ios" ? 40 : 0,
      paddingBottom: 0,
    },
    header: {
      height: 120,
    },
    fixeheight: {
      height: 50,
      justifyContent: "center",
      borderBottomWidth: 0.5,
      borderColor: "lightgrey",
      alignItems: "center",
    },
    fixeheight1: {
      height: 70,
      justifyContent: "center",
      alignItems: "center",
    },
    main: {
      paddingVertical: 10,
    },
    TopView: {
      alignItems: "center",
    },
    topView: {
    },
    rowView: {
      flexDirection: "row",
    },
    borderView: {
      borderWidth: 1,
      bordercolor: "#000",
    },
    textstyle: {
      color: "#979797",
      fontSize: RFValue(12, 580),
      fontFamily: "Poppins-Regular",
    },
    dotmainview: {
      width: "90%",
      flexDirection: "row",
      marginBottom: 5,
    },
    dotview: {
      width: "10%",
      alignItems: "center",
    },
    marchmainview: {
      backgroundColor: "#000",
      justifyContent: "center",
      borderRadius: 14,
      marginBottom: 10
    },
    marchmainview2: {
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
      marginBottom: 0,
      alignItems: "center",
      justifyContent: "center",
    },
    btn: {
      padding: 10,
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