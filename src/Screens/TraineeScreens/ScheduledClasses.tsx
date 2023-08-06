import React, { useState, useEffect } from "react";
import { View, StyleSheet, Pressable, ActivityIndicator, Text } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { RFValue } from "react-native-responsive-fontsize";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import moment from "moment";
import { NavigationSwitchProp } from "react-navigation";
import { useSelector } from "react-redux";
import { UserDetail } from "../../interfaces";
import { useGetMyBookedClassesQuery, useGetUserMeQuery } from "../../slice/FitsApi.slice";
import Container from "../../Components/Container";
import Typography from "../../Components/typography/text";

interface Props {
  navigation: NavigationSwitchProp;
}

interface MyBookedClass {
  _id: React.Key | null | undefined;
  session: {
    select_date: moment.MomentInput;
    class_title: string;
    class_time: string;
    price: string;
    details: string;
  } | null;
  status: boolean;
}

const ScheduledClasses = ({ navigation }: Props) => {
  const { userInfo } = useSelector((state: { fitsStore: Partial<UserDetail> }) => state.fitsStore);
  const { data: userMe } = useGetUserMeQuery({});

  const { data: myBookedClassesApiResponse, refetch, isLoading } = useGetMyBookedClassesQuery(userMe?.user?._id || "");

  const [expandedClassIndex, setExpandedClassIndex] = useState<number | null>(null);

  useEffect(() => {
    navigation.addListener("focus", () => {
      refetch();
    });
  }, []);

  const handleDetailsToggle = (index: number) => {
    if (expandedClassIndex === index) {
      setExpandedClassIndex(null); // Collapse class details if already expanded
    } else {
      setExpandedClassIndex(index); // Expand class details
    }
  };

  if (isLoading) {
    return <ActivityIndicator size="large" color="black" />;
  }

  return (
    <Container>
      {!myBookedClassesApiResponse?.data.booking ? (
        <View style={styles.emptyClassesView}>
          <Typography style={styles.emptyClassesText}>---You don't have any Class yet---</Typography>
        </View>
      ) : (
        myBookedClassesApiResponse?.data.booking.map((item: MyBookedClass, index: number) => (
          <View style={styles.cardContainer} key={item._id}>
            {item.session === null ? null : (
              <View style={[styles.card, { backgroundColor: expandedClassIndex === index ? "#F8F8F8" : "#FFF" }]}>
                <View style={styles.dateContainer}>
                  <Text style={styles.dateText}>{moment(item.session.select_date).format("DD MMMM")}</Text>
                  <Text style={styles.dayText}>({moment(item.session.select_date).format("dddd")})</Text>
                  <View style={styles.separator} />
                  <View style={styles.classInfoContainer}>
                    <Text style={styles.classNameText}>{item.session.class_title}</Text>
                    <Text style={styles.classTimeText}>{moment(item.session.class_time).format("DD MMMM")}</Text>
                  </View>
                  <Pressable onPress={() => handleDetailsToggle(index)} style={[styles.detailsButton, { backgroundColor: expandedClassIndex === index ? "#414143" : "#000" }]}>
                    <Text style={styles.detailsButtonText}>Details</Text>
                    <AntDesign name={expandedClassIndex === index ? "up" : "down"} size={15} color={"#fff"} />
                  </Pressable>
                </View>

                {expandedClassIndex === index && (
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
            )}
          </View>
        ))
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
    elevation: 2,
    padding: 16,
  },
  dateContainer: {
    flexDirection: "row",
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
    marginRight: 10,
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
  },
});

export default ScheduledClasses;
