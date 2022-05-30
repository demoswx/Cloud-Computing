import * as React from 'react';
import { Button, View, Text ,Image} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Dimensions } from 'react-native';


export default function HomeScreen({ navigation }) {
  const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
 
    return (
      <View>
       <Image source={require('../assets/welcomehome.jpg')}
        style={{ width: windowWidth, height: 450 }}
        onPress={() => navigation.navigate('Details')}/>

         <Button
        container
        title="開始識別"
        color="#f194ff"
        onPress={() => navigation.navigate('Details')}
      />
      </View>
    );
  }