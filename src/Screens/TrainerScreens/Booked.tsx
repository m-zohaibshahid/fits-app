<<<<<<< HEAD
import React, { useState } from 'react';
=======
import React, {useState} from 'react'
>>>>>>> API-1804
import {
  Text,
  View,
  Button,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Modal,
  Image,
  ScrollView,
  Pressable
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import {
  Calendar,
  CalendarList,
  Agenda,
  ExpandableCalendar,
  Timeline,
  CalendarProvider,
} from 'react-native-calendars';
import * as Images from '../../constants/Images';

const Booked = ({ navigation }) => {
  const [details, setDetails] = useState(false);
  const [currentDate, setCurrentDate] = useState();

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.main}>
          <View style={styles.TopView}>
            <View style={styles.topView}>
              <View style={styles.CalendarView}>
                <Calendar
                  markingType={'custom'}
                  onDayPress={day => {
                    setCurrentDate(day.dateString);
                  }}
                  firstDay={1}
                  markedDates={{
                    [currentDate]: { selected: true, selectedColor: 'red' },
                  }}
                />
                <View style={styles.borderView}></View>
              </View>
            </View>
          </View>
          {/*start Totale */}
          <View style={styles.TopView}>
            <View style={styles.marchmainview}>
              <View style={styles.marchmainview2}>
                <View style={{ width: '25%', alignItems: 'center' }}>
                  <Text style={styles.marchtext}>5-March</Text>
                </View>
                <View
                  style={{
                    width: '5%',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      width: 2,
                      height: 50,
                      backgroundColor: '#fff',
                    }}></View>
                </View>
                <View style={{ width: '35%', flexDirection: 'column' }}>
                  <Text style={styles.marchtext}>Yoga Defence {'\n'}
                    <Text
                      style={{
                        color: '#fff',
                        fontSize: RFValue(10, 580),
                        fontFamily: 'Poppins-Regular',
                      }}>
                      5 PM - 6 PM
                    </Text>
                  </Text>

                </View>
                <Pressable
                  onPress={() => setDetails(!details)}
                  style={{
                    width: '30%',
                    backgroundColor: '#414143',
                    alignItems: 'center',
                    borderRadius: 12,
                    height: 50,
                    justifyContent: 'center',
                  }}>
                  <View
                    style={{
                      width: '100%',
                      alignItems: 'center',
                      flexDirection: 'row',
                    }}>
                    <View style={{ width: '80%', justifyContent: 'center' }}>
                      <Text
                        style={{
                          color: '#fff',
                          fontSize: RFValue(14, 580),
                          fontFamily: 'Poppins-Regular',
                          textAlign: 'center',
                        }}>
                        Details
                      </Text>
                    </View>
                    <AntDesign

                      name={details ? 'up' : 'down'}
                      size={15}
                      color={'#fff'}
                    />
                  </View>
                </Pressable>
              </View>
              {/*end Yoga */}
              {details && (
                <View style={{ width: '100%', paddingBottom: 18, }}>
                  <View style={styles.dotmainview}>
                    <View style={styles.dotview}>
                      <FontAwesome name="circle" style={{ color: '#979797' }} />
                    </View>
                    <View style={{ width: '90%' }}>
                      <Text style={styles.textstyle}>
                        Type:{'\n'} Online session(personal)
                      </Text>
                    </View>
                  </View>
                  <View style={styles.dotmainview}>
                    <View style={styles.dotview}>
                      <FontAwesome name="circle" style={{ color: '#979797' }} />
                    </View>
                    <View style={{ width: '90%' }}>
                      <Text style={styles.textstyle}>Cost: {'\n'}$ 488</Text>
                    </View>
                  </View>
                  <View style={styles.dotmainview}>
                    <View style={styles.dotview}>
                      <FontAwesome name="circle" style={{ color: '#979797' }} />
                    </View>
                    <View style={{ width: '90%' }}>
                      <Text style={styles.textstyle}>
                        Trainee name:{'\n'}Cristian bill
                      </Text>
                    </View>
                  </View>
                  <View style={styles.dotmainview}>
                    <View style={styles.dotview}>
                      <FontAwesome name="circle" style={{ color: '#979797' }} />
                    </View>
                    <View style={{ width: '90%' }}>
                      <Text style={styles.textstyle}>
                        Description:{'\n'}Lorem ipsum dolor sit amet,
                        consectetur adipiscing elit. In adipiscing ac
                        adipiscing mauris tincidunt varius sollicitudin.
                      </Text>
                    </View>
                  </View>

                  <View style={styles.rowView}>
                    <View style={styles.mainbtnView}>
                      <TouchableOpacity style={styles.ccbtnview}>
                        <Text style={styles.btntextstyle}>
                          Cancel Class
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.mainbtnView}>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('TrainerProfile')
                        }
                        style={styles.profilebtnview}>
                        <Text style={styles.btntextstyle}>Profile</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              )}
            </View>
          </View>
          {/*end total */}
        </View>
        <View style={{ paddingVertical: 50 }}></View>
      </ScrollView>
      <View style={styles.footer}></View>
    </View>
  );
};

export default Booked;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingTop: Platform.OS === 'ios' ? 40 : 0,
    paddingBottom: Platform.OS === 'ios' ? 0 : 0,
  },
  main: {
    width: '100%',
    height: '85%',
  },
  footer: {
    width: '100%',
    height: '15%',
    marginBottom: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
  TopView: {
    width: '100%',
    alignItems: 'center',
  },
  topView: { width: '90%' },
  topView1: {
    width: '90%',
    alignItems: 'center',
  },
  rowView: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
  },
  borderView: {
    width: '100%',
    borderWidth: 1,
    bordercolor: '#000',
  },
  textstyle: {
    color: '#fff',
    fontSize: RFValue(12, 580),
    fontFamily: 'Poppins-Regular',
  },
  dotmainview: {
    width: '100%',
    // borderWidth:1,
    borderColor: "#fff",
    flexDirection: 'row',
    marginTop: 10,
  },
  dotview: {
    width: '10%',
    alignItems: 'center',
    marginTop: 5,
  },
  marchmainview: {
    width: '90%',
    backgroundColor: '#000',
    justifyContent: 'center',
    borderRadius: 12,
    marginTop: 20,
  },
  marchmainview2: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 9,
    flexDirection: 'row',
  },
  marchtext: {
    color: '#fff',
    fontSize: RFValue(12, 580),
    fontFamily: 'Poppins-SemiBold',
  },
  mainbtnView: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#fff',
  },
  ccbtnview: {
    backgroundColor: '#979797',
    width: 100,
    height: 45,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilebtnview: {
    backgroundColor: '#ff0000',
    width: 100,
    height: 45,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btntextstyle: {
    color: '#fff',
    fontSize: RFValue(10, 580),
    fontFamily: 'Poppins-Regular',
  },
});
