import React, { useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const FullPageLoader = () => {
  const logoSize = new Animated.Value(1);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(logoSize, {
          toValue: 1.5, // Scale up the logo
          duration: 500,
          useNativeDriver: false,
        }),
        Animated.timing(logoSize, {
          toValue: 1, // Scale back down the logo
          duration: 500,
          useNativeDriver: false,
        }),
        Animated.delay(500), // Pause for 500ms before starting again
      ])
    ).start();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.loaderContainer}>
        <Animated.View style={[styles.logoContainer, { transform: [{ scale: logoSize }] }]}>
      <ActivityIndicator size="large" color="black" />
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0', // Replace with your app's background color
  },
  loaderContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white background
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  logoContainer: {
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default FullPageLoader;
