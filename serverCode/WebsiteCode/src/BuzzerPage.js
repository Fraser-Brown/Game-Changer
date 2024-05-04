//Create a page for the players to buzz in
import colours from "./colours"
import { StyleSheet, Text, TextInput, View,  TouchableOpacity } from "react-native";
import { styles } from "./styles";

function buzzIn(ws, playerName){
    console.log(playerName)
    var msg = {"type" : "buzzedIn", name: playerName};
    ws.send(JSON.stringify(msg));
}

export default function BuzzerPage({playerList, player, ws, canBuzz, setCanBuzz}){
    return(
        <View
            style = {{display : "flex", flexDirection : 'row', flexWrap : 'wrap', justifyContent : 'center'}}
        >
            <TouchableOpacity
                disabled={!canBuzz}
                onPress={() => {
                    buzzIn(ws, player);
                    setCanBuzz(false)
                }}
                style={[styles.button,
                        {
                            width: '50vw',
                            height: '50vw',
                            textAlign: 'center',
                            background: canBuzz ? 'red' : 'grey',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '60px',
                            borderRadius: '100%',
                            border: 'white solid 3px',
                        }
                ]}>
                    <Text style={{fontSize: '60px', color : canBuzz ? 'white': 'black'}}>{canBuzz ? 'Buzz In' : 'You cant buzz right now'}</Text>
            </TouchableOpacity>
        </View>
    )
}