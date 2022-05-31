import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Button, Image } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { Camera } from 'expo-camera';
import { shareAsync } from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';
import {CameraType} from 'expo-camera/build/Camera.types';
import { back } from 'react-native/Libraries/Animated/Easing';
import { FontAwesome5 } from '@expo/vector-icons';







export default function DetailsScreen() {
  let cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  const [photo, setPhoto] = useState();
  const [type, setType] = useState(CameraType.back);
  const [ws,setwa]=useState(null);

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
      setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
    })();
  }, []);

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
  };


  if (photo) {
    let sharePic = () => {
      shareAsync(photo.uri).then(() => {
        setPhoto(undefined);
      });
    };

    let savePhoto = () => {
      MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
        setPhoto(undefined);
        console.log(photo.uri);
      });
    };
     
  


    let axiosPostRequestCancel = null
    async function uploadFiles(data, progressCallBack, callBack) {
      let formData = new FormData();
    
      data.map((item,index)=>{
        let file = {
          uri: photo.uri,
          type: 'application/octet-stream',
          name: photo
        };
        formData.append("file", file);
      })
      let config = {
        //添加请求头
        headers: { "Content-Type": "multipart/form-data" },
        timeout: 600000,
        //添加上传进度监听事件
        onUploadProgress: e => {
          let completeProgress = (e.loaded / e.total * 100) | 0;
          progressCallBack && progressCallBack(completeProgress)
        },
        cancelToken: new axios.CancelToken(function executor(c) {
          axiosPostRequestCancel = c // 用于取消上传
        })
      };
    
      axios.post("伺服器地址", formData, config)
      .then(
        function (response)
        {
          callBack && callBack(true, response)
        })
        .catch(function (error) {
          callBack && callBack(false)
        });
    }
 



    return (
      <SafeAreaView style={styles.container}>
        <Image style={styles.preview} source={{ uri: "data:image/jpg;base64," + photo.base64 }} />
        <Button title="分享照片" onPress={sharePic} />
        {hasMediaLibraryPermission ? <Button title="傳送照片" onPress={uploadFiles} /> : undefined}
        <Button title="重新拍照" onPress={() => setPhoto(undefined)} />
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
    justifyContent:'flex-end',
  },
  buttonContainer: {
    backgroundColor: '#fff',
    alignSelf: 'flex-end'
  },
  preview: {
    alignSelf: 'stretch',
    flex: 1
  }
});