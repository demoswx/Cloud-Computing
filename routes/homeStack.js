import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity,Button,image } from 'react-native';
import { Camera } from 'expo-camera';
import {CameraType} from 'expo-camera/build/Camera.types';

 function homeStack() {
  const [hasPermission, setHasPermission] = useState(null);
  const [image,setImage] =useState(null);
  const [camera,setCamera] =useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const  cameraStatus  = await Camera.requestCameraPermissionsAsync();
      setHasPermission(cameraStatus.status === 'granted');
    })();
  }, []);
  const takePicture=async ()=>{
      if(camera){
          const data =await camera.takePictureAsync(null)
          setImage(data.url);
      }
  }
  if (hasPermission===false){
      return <Text>NO camera Access</Text>;
  }
  return (
    <View style={{flex:1}}>
    <View style={styles.cameraContainer}>
        <Camera ref={ref=>setCamera(ref)}
        style={styles.fixedRatio}
        type={type}
        ratio={'1:2'}
        ></Camera>
    </View>
    <Button
    title="Filp camera"
    onPress={()=>{
        setType(type===Camera.Constants.Type.back? Camera.Constants.Type.front:Camera.Constants.Type.back);
    }}>
    </Button>
    <Button title='Take Pictre'
    onPress={()=>takePicture()}
    />
    {image && <Image source={{url:image}} style={{flex:1}}/>}
    </View>
  );
}

const styles = StyleSheet.create({
 cameraContainer:{
     flex:1,
     flexDirection:'row'
 },
 fixedRatio:{
     flex:1,
     aspectRatio:1
 }
});

export default homeStack;