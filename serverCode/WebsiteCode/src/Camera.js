import { StyleSheet, Text, TextInput, View,  TouchableOpacity, Dimensions , Image} from "react-native"; 
import React, { useState, useEffect, useRef } from 'react';
import { Camera } from 'expo-camera'; 

export default function ReactCamera({ws, playerName, sendPhoto, children}){
    const [imgSrc, setImgSrc] = React.useState(null);
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.front);
    const cameraRef = useRef(null)
    const cameraSize = Math.min(Dimensions.get('window').width* 0.75, Dimensions.get('window').height *0.5)
  
    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    return (
      <View style={{
          display : 'flex',
          alignItems : 'center',
          width : Dimensions.get('window').width,
          height : Dimensions.get('window').height *0.8,
      }}>
        {!imgSrc && 
            <>  
                <View
                    style={
                        {width : cameraSize,
                         height : cameraSize,
                         objectFit: 'cover', 
                         margin : 16, 
                         borderRadius : '50%'}
                    } 
                >
                    <Camera type={type}  ref = {cameraRef}/>

                </View>
                <TouchableOpacity
                    onPress={async () => {
                       
                        console.log('here')
                        let photo = await cameraRef.current.takePictureAsync();
                        console.log(photo)
                        setImgSrc(photo)
                        
                      }}
                    style={styles.button}>
                    <Text style={styles.text}>Take Photo</Text>
                </TouchableOpacity>
            </>
        }
        

        {imgSrc && (
            <>  
                {imgSrc.base64 &&
                    <img 
                        style={
                        {objectFit: 'cover', 
                         margin : 16, 
                         borderRadius : '50%',
                         width : cameraSize,
                         height : cameraSize,
                         transform: 'scaleX(-1)',
                         maxWidth : '80%',
                         maxHeight : '80%',
                         margin : 'auto'
                        }
                        }
                        src={imgSrc.base64}
                    />
                }
                {
                    !imgSrc.base64 &&
                    <Image source={{uri : imgSrc}}/>
                }
                
                <TouchableOpacity
                    onPress={() => setImgSrc(null)}
                    style={styles.button}>
                    <Text style={styles.text}>Retake Photo</Text>
                </TouchableOpacity>

                {children}

                <TouchableOpacity
                    disabled={!playerName}
                    onPress={() => sendPhoto(imgSrc.base64, playerName, ws)}
                    style={styles.button}>
                    <Text style={styles.text}>Submit</Text>
                </TouchableOpacity>
                        
            </>
        )}
      </View>
    );
  };

  
const em = 16;

const styles = StyleSheet.create({
    container: {
      padding: em,
      backgroundColor : "#7209b7ff",
      borderRadius : em
    },
    button: {
        backgroundColor: "black" ,
        borderRadius : em,
        margin: em,
        textAlign: "center"
    },
    text: {
        color: "#fff",
        fontFamily: "Roboto",
        padding: em
    }
  });