/* eslint-disable prettier/prettier */
import * as React from 'react';
import {View, Text, Button} from 'react-native';

function About({navigation}: any) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>About Screen Siddiqui</Text>
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
    </View>
  );
}

export default About;
