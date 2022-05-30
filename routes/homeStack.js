import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/DetailsScreen';
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons'; 




const Stack = createNativeStackNavigator();

function homestack() {
  return (
    
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home"   options={{
          title: '智慧門鎖',
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerRight: () => (
           
            <Ionicons name="md-person-sharp" size={24} color="black" />
          ),
        }}   component={HomeScreen} />
        <Stack.Screen name="Details"  options={{
          title: "相機",
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}  component={DetailsScreen} />
      </Stack.Navigator>
    
  );
}

export default homestack;