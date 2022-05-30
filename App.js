import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Homestack from './routes/homestack';

import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';




function App() {
  let [fontsLoaded] = useFonts({
    Inter_900Black,
  });
 
  return (
    <NavigationContainer>
      <Homestack/>
    </NavigationContainer>
  );
}

export default App;
