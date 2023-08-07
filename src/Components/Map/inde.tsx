import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View } from 'react-native';

const MapWithMarker = () => {
  // Sample location for the marker (you can change this to your desired location)
  const markerLocation = {
    latitude: 37.78825,
    longitude: -122.4324,
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: markerLocation.latitude,
          longitude: markerLocation.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={markerLocation}
          title="Marker Title"
          description="This is the marker description"
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
        flex: 1,
      height: 400
  },
  map: {
    flex: 1,
    height: 400
},
});

export default MapWithMarker;
