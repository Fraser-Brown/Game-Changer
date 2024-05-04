//Create a page for the players to buzz in
import colours from "./colours"
import { StyleSheet, Text, TextInput, View,  TouchableOpacity } from "react-native";


export default function BuzzerPage({playerList, player, ws}){
    return(
        <View
            style = {{display : "flex", flexDirection : 'row', flexWrap : 'wrap', justifyContent : 'center'}}
        >
            <Text>I am a button</Text>
        </View>
    )
}