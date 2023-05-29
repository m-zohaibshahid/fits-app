/* eslint-disable prettier/prettier */

import * as React from 'react';
import {View, Text, Button} from 'react-native';

function Home({navigation}: any) {
  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <Text>Home Screen</Text>
      <Text>Zuhair Abbas</Text>
      <Button
        title="Go to About"
        onPress={() => navigation.navigate('About')}
      />
    </View>
  );
}

export default Home;
