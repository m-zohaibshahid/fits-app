import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  StatusBar,
  PermissionsAndroid,
  Alert,
} from "react-native";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import Geolocation from "react-native-geolocation-service";

function Map({ navigation }) {
  const [superLong, setSuperLong] = useState(55.9754);
  const [superLat, setSuperLat] = useState(21.4735);

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Location Access Required",
          message: "This App needs to Access your location",
          buttonPositive: "Allow Location",
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        //To Check, If Permission is granted
        Geolocation.getCurrentPosition(
          (position) => {
          },
          (error) => {
            // See error code charts below.
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
      } else {
        Alert.alert(
          "Permission Access denied. Please Make Sure GPS Permission is enabled and then exit app and run again"
        );
      }
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    requestLocationPermission();
  }, []);

  return (
    <>
      <StatusBar backgroundColor="#003566" />
      <View style={styles.container}>
        <View style={styles.main}>
          <MapView
            style={styles.mapStyle}
            showsUserLocation={false}
            zoomEnabled={true}
            zoomControlEnabled={true}
            initialRegion={{
              latitude: parseFloat(superLat),
              longitude: parseFloat(superLong),
              latitudeDelta: 0.922,
              longitudeDelta: 0.421,
            }}
          >
            <Marker
              coordinate={{
                latitude: parseFloat(superLat),
                longitude: parseFloat(superLong),
              }}
              title={"User Location"}
              description={"Current Location"}
              identifier={`mshmsh`}
            />
          </MapView>
        </View>
        {/*End*/}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  main: {
    width: "100%",
  },
  mapStyle: {
    width: "100%",
    height: "100%",
  },
});

export default Map;
