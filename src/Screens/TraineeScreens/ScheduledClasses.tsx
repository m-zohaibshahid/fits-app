import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Pressable, ActivityIndicator } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { RFValue } from "react-native-responsive-fontsize";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import moment from "moment";
import { NavigationSwitchProp } from "react-navigation";
import { useSelector } from "react-redux";
import { UserDetail } from "../../interfaces";
import { useGetMyBookedClassesQuery } from "../../slice/FitsApi.slice";
import Container from "../../Components/Container";
import Typography from "../../Components/typography/text";

interface PropsInterface {
  navigation: NavigationSwitchProp;
}

const ScheduledClasses = ({ navigation }: PropsInterface) => {
  const { userInfo } = useSelector((state: { fitsStore: Partial<UserDetail> }) => state.fitsStore);

  const {data: myBookedClassesApiResponse, refetch, isLoading} = useGetMyBookedClassesQuery({})
  const [expandedClassIndex, setExpandedClassIndex] = useState<number | null>(null);

  useEffect(() => {
    navigation.addListener("focus", () => {
      refetch();
    });
  }, []);

  const handleDetailsToggle = (index: number) => {
    setExpandedClassIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  if (isLoading) {
    return <ActivityIndicator size="large" color="black" />;
  }

  return (
    <Container>
      {myBookedClassesApiResponse?.data.booking && myBookedClassesApiResponse?.data.booking.length > 0 ? (
        myBookedClassesApiResponse?.data.booking.map((item: any, i: number) => (
          <View style={styles.cardContainer} key={item._id}>
            {item.session ? (
              <View style={[styles.card, { backgroundColor: expandedClassIndex === i ? "#F8F8F8" : "#FFF" }]}>
                <View style={styles.subCardContainer}>
                  <View style={styles.dateContainer}>
                    <Text style={styles.dateText}>{moment(item.session.select_date).format("DD MMMM")}</Text>
                    <Text style={styles.dayText}>({moment(item.session.select_date).format("dddd")})</Text>
                  </View>
                  <View style={styles.separator} />
                  <View style={styles.classInfoContainer}>
                    <Text style={styles.classNameText}>{item.session.class_title}</Text>
                    <Text style={styles.classTimeText}>{moment(item.session.class_time).format("h:mm A")}</Text>
                  </View>
                  <Pressable onPress={() => handleDetailsToggle(i)} style={[styles.detailsButton, { backgroundColor: expandedClassIndex === i ? "#414143" : "#000" }]}>
                    <Text style={styles.detailsButtonText}>Details</Text>
                    <AntDesign name={expandedClassIndex === i ? "up" : "down"} size={15} color={"#fff"} />
                  </Pressable>
                </View>
                {expandedClassIndex === i && (
                  <View style={styles.detailsContainer}>
                    <View style={styles.detailItem}>
                      <FontAwesome name="circle" style={styles.dotIcon} />
                      <Text style={styles.detailText}>
                        Cost: {"\n"}$ {item.session.price}
                      </Text>
                    </View>
                    <View style={styles.detailItem}>
                      <FontAwesome name="circle" style={styles.dotIcon} />
                      <Text style={styles.detailText}>{item.session.details}.</Text>
                    </View>
                  </View>
                )}
              </View>
            ) : null}
          </View>
        ))
      ) : (
        <View style={styles.emptyClassesView}>
          <Typography style={styles.emptyClassesText}>---You don't have any Class yet---</Typography>
        </View>
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
  },
  card: {
    width: "90%",
    borderRadius: 12,
    elevation: 4,
    padding: 16,
    backgroundColor: "#FFF",
  },
  subCardContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  dateContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  dateText: {
    color: "#000",
    fontSize: RFValue(18),
    fontFamily: "Poppins-SemiBold",
  },
  dayText: {
    color: "#666",
    fontSize: RFValue(12),
    fontFamily: "Poppins-Regular",
    marginLeft: 8,
  },
  separator: {
    height: 50,
    width: 2,
    backgroundColor: "#666",
    marginHorizontal: 10,
  },
  classInfoContainer: {
    flex: 1,
    flexDirection: "column",
  },
  classNameText: {
    color: "#000",
    fontSize: RFValue(18),
    fontFamily: "Poppins-SemiBold",
  },
  classTimeText: {
    color: "#666",
    fontSize: RFValue(14),
    fontFamily: "Poppins-Regular",
  },
  detailsButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000",
    borderRadius: 12,
    height: 50,
    marginTop: 10,
  },
  detailsButtonText: {
    color: "#fff",
    fontSize: RFValue(16),
    fontFamily: "Poppins-Regular",
    textAlign: "center",
    margin: 10,
  },
  detailsContainer: {
    marginTop: 20,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  dotIcon: {
    color: "#979797",
    fontSize: RFValue(10),
    marginRight: 10,
  },
  detailText: {
    color: "#666",
    fontSize: RFValue(14),
    fontFamily: "Poppins-Regular",
  },
  emptyClassesView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyClassesText: {
    marginBottom: 30,
    fontSize: RFValue(14),
    fontFamily: "Poppins-Regular",
    textAlign: "center",
  },
});

export default ScheduledClasses;
