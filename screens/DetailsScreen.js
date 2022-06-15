import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Button, Image,TouchableOpacity } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { Camera } from 'expo-camera';
import { shareAsync } from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';
import {CameraType} from 'expo-camera/build/Camera.types';
import { back } from 'react-native/Libraries/Animated/Easing';
import { FontAwesome5 } from '@expo/vector-icons';
import axios from 'axios';
import Constants from '../constants';







export default function DetailsScreen() {
 
  let cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  const [photo, setPhoto] = useState();
  const [ws,setwa]=useState(null);

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
      setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
    })();
  }, []);

  
    async function uploadImage(data) {
        console.log(Constants.SERVER_URL)
        const d = new FormData();
        d.append('file', data);
        console.log(d)
        try {
          const response = await axios.post(
            `${Constants.SERVER_URL}/`,
            d,
            {
              headers: { 
                'Content-Type': 'multipart/form-data',
              },
            },
          );
          const {data} = response;
          console.log("success")
          setPhoto(data);
        } catch(error) {
          console.log(error)
          console.log("失败")
        }
      }


   async function UploadRequest( datas) {
    
      const d = new FormData();
        d.append('file', datas);
    
      console.log("exit")
      const params = {
          method: 'POST',
          body: d,
          headers: {
              'Content-Type': 'multipart/form-data'
          },
          timeout: 5000 // 5s超时
      };
  
      return fetch(`${constants.SERVER_URL}`, params)
          .then(response => response.json())
          .then(data => data)
          .catch(error => {
              return {error_code: -3, error_msg:'请求异常，请重试'}
          })
          
  }
  





  if (hasCameraPermission === undefined) {
    return <Text>Requesting permissions...</Text>
  } else if (!hasCameraPermission) {
    return <Text>Permission for camera not granted. Please change this in settings.</Text>
  }

  let takePic = async () => {
    let options = {
      quality: 1,
      base64: true,
      exif: false,
    };
    
    let newPhoto = await cameraRef.current.takePictureAsync(options);
    setPhoto(newPhoto);
    const source={
      uri:newPhoto.uri,
      type:'multipart/form-data',
      name:"randomname",
    }
    console.log(source)
    console.log("圖片獲取成功")
    uploadImage(source)
  };


  if (photo) {
    let sharePic = () => {
      shareAsync(photo.uri).then(() => {
        setPhoto(undefined);
        console.log(photo.uri)
  
      });
    };

    let savePhoto = () => {
      MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
        setPhoto(undefined);
        console.log(photo.uri);
      });
    };
     
  




 



    return (
      <SafeAreaView style={styles.container}>
        <Image style={styles.preview} source={{ uri: "data:image/jpg;base64," + photo.base64 }} />
        <TouchableOpacity style={styles.button} title="分享照片" onPress={sharePic}>
           <Text style={styles.buttonText}>分享照片 </Text>
         
        </TouchableOpacity>
        {hasMediaLibraryPermission ? <TouchableOpacity style={styles.button}  onPress={savePhoto}>
        <Text style={styles.buttonText}>保存照片 </Text>
        </TouchableOpacity> : undefined}
        <TouchableOpacity style={styles.button} onPress={() => setPhoto(undefined)}>
        <Text style={styles.buttonText}>重新拍照 </Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <Camera style={styles.container} ref={cameraRef} type={CameraType.front}>
      
      <FontAwesome5 name="camera" size={40} color="black" onPress={takePic}  />
        {/* <Button title="拍照" onPress={takePic} /> */}
      
      <StatusBar style="auto" />
    </Camera>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  buttonContainer: {
    backgroundColor: '#ffe',
    alignSelf: 'flex-end',
  },
  preview: {
    alignSelf: 'stretch',
    flex: 1,    
  },
  button: {
    margin: 5,
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#406E9F',
    borderRadius: 9,
    alignItems: 'stretch',
    justifyContent: 'space-between',
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});