import { StyleSheet, Text, TextInput, View, TouchableOpacity } from "react-native";

const em = 16;

export const styles = StyleSheet.create({
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
        margin: em,
        zIndex: 100
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
    },
    player : {
        padding : em,
        backgroundColor : "black",
        borderRadius : em/2,
        color: "#fff",
        textAlign : 'center',
        fontSize : 1.2 * em
      },
  });