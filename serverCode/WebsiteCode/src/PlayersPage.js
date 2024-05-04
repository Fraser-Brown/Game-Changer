import PlayerCard from "./PlayerCard"
import colours from "./colours"
import { StyleSheet, Text, TextInput, View,  TouchableOpacity } from "react-native";


export default function PlayersPage({playerList, player, ws}){
    return(
        <View
            style = {{display : "flex", flexDirection : 'row', flexWrap : 'wrap', justifyContent : 'center'}}
        >
            {playerList && playerList.map(
                (playerDetails, index) => 
                    <PlayerCard  
                        key={playerDetails.name} 
                        colour={colours[index % colours.length] } 
                        playerName = {playerDetails.name} 
                        myPlayerName = {player}
                        ws = {ws} 
                        image = {playerDetails.image}
                        points = {playerDetails.points}
                    />
            )}
        </View>
    )
}