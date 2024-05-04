//Create a page for the host to update player scores
import colours from "./colours"
import { StyleSheet, Text, TextInput, View,  TouchableOpacity } from "react-native";


function deletePlayer(ws, playerName){
    var msg = {"type" : "deletePlayer", "name" : playerName};
    ws.send(JSON.stringify(msg));
  }
  

export default function HostPage({playerList, player, ws}){
    return(
        <View
            style = {{display : "flex", flexDirection : 'row', flexWrap : 'wrap', justifyContent : 'center'}}
        >
            <Text>I am the Host</Text>
        </View>
    )
}