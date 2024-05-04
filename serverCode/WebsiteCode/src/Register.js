import { StyleSheet, Text, TextInput, View } from "react-native";
import { useFonts } from "expo-font";
import ReactCamera from "./Camera";
import React from "react";

function randomFromList(list){
    const rand = Math.floor(Math.random() * list.length);
    return list[rand];
}
  
export default function Register({ player, setPlayer, ws, changePage}){
    const [loaded] = useFonts({
        Roboto: require("../assets/Roboto/Roboto-Black.ttf"),
      });

    function sendProfilePic(imgSrc, playerName, ws){
        var msg = {"type" : "register", "name" : playerName, 'image' : imgSrc};
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
                <ReactCamera ws={ws} playerName={player} sendPhoto= {sendProfilePic} children= {children}/>
            </View>
        </>
    )
}

const em = 16;

const styles = StyleSheet.create({
    container: {
      padding: em,
      backgroundColor : "#7209b7ff",
      borderRadius : em,
      display : 'flex',
      flexDirection : 'row',
      maxWidth: '80%',
      flexWrap : 'wrap',
      justifyContent: "center",

    },
    button: {
        backgroundColor: "black" ,
        borderRadius : em,
        margin: em
    },
    text: {
        color: "#fff",
        fontFamily: "Roboto",
        padding: em
    },
    textInput: {
        backgroundColor : "white",
        borderRadius :em,
        color : "black",
        marginBottom : 3 * em
    }
  });