import { StyleSheet, Text, TextInput, View, TouchableOpacity } from "react-native";
import { useFonts } from "expo-font";
import ReactCamera from "./Camera";
import React from "react";
import { styles } from "./styles";

function randomFromList(list){
    const rand = Math.floor(Math.random() * list.length);
    return list[rand];
}
  
export default function Register({ player, setPlayer, setIsHost, ws, changePage}){
    const [loaded] = useFonts({
        Roboto: require("../assets/Roboto/Roboto-Black.ttf"),
      });

    function sendProfilePic(imgSrc, playerName, ws){
        var msg = {"type" : "register", "name" : playerName, 'image' : imgSrc};
        ws.send(JSON.stringify(msg));
        setIsHost(false)
    }

    function addAsHost(ws){
        var msg = {"type" : "addHost"};
        ws.send(JSON.stringify(msg));
        changePage();
    }

    const children = 
        <View style={{display :'flex' , flexWrap : 'wrap', flexDirection : 'column', maxWidth : '80%', alignItems: 'center'}}>
            <View>
                <Text style={styles.text}>Set Player Name</Text>
                <TextInput style={[styles.text, styles.textInput]} onChangeText={(value) => { setPlayer(value); } } value={player}/>
            </View>
        </View>
   
    return (
        <>  
            <View style={styles.container}>
                <TouchableOpacity
                        onPress={() => {
                            setIsHost(true);
                            addAsHost(ws)
                        }}
                        style={styles.button}>
                        <Text style={styles.text}>I am a Host</Text>
                </TouchableOpacity>
                <ReactCamera ws={ws} playerName={player} sendPhoto={sendProfilePic} children={children}/>
            </View>
        </>
    )
}


