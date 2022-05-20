import * as React from 'react';
import { Button, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeStack from './routes/homeStack';



export default function App() {
  return (
    <NavigationContainer>
   <HomeStack/>
    </NavigationContainer>
  );
}