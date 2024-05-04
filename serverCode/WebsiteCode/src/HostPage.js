//Create a page for the host to update player scores
import colours from "./colours"
import { StyleSheet, Text, TextInput, View,  TouchableOpacity, Dimensions } from "react-native";
import { styles } from "./styles";

function deletePlayer(ws, playerName){
    var msg = {"type" : "deletePlayer", "name" : playerName};
    ws.send(JSON.stringify(msg));
  }

function addPointToPlayer(ws, playerName){
    var msg = {"type" : "addPoint", name: playerName};
    ws.send(JSON.stringify(msg));
}

function removePointFromPlayer(ws, playerName){
    var msg = {"type" : "removePoint", name: playerName};
    ws.send(JSON.stringify(msg));
}

function resetBuzzers(ws){
    var msg = {"type" : "resetBuzzers"};
    ws.send(JSON.stringify(msg));
}

export default function HostPage({playerList, ws, buzzedPlayer, setBuzzedPlayer}){
    return(
        <View>
            <View  style = {{display : "flex", flexDirection : 'row', flexWrap : 'wrap', justifyContent : 'center', alignItems: 'center'}}>
                <Text style={{fontSize: '35px'}}>{buzzedPlayer ? `Buzzed Player : ${buzzedPlayer}` : 'No one has buzzed in yet'}</Text>
                <TouchableOpacity
                    onPress={() => {
                        resetBuzzers(ws)
                        setBuzzedPlayer(null)
                    }}
                    style={styles.button}>
                        <Text style={styles.text}>Reset Buzzers</Text>
                </TouchableOpacity>
            </View>
            <View
                style = {{display : "flex", flexDirection : 'row', flexWrap : 'wrap', justifyContent : 'center'}}
            >
            
                {playerList && playerList.map(
                    (playerDetails, index) => 
                        <View>
                            <PlayerUpdater  
                            key={playerDetails.name} 
                            colour={colours[index % colours.length] } 
                            playerName = {playerDetails.name} 
                            ws = {ws} 
                            image = {playerDetails.image}
                            points = {playerDetails.points}
                        />
                        </View>
                )}
            </View>
        </View>
    )
}

function PlayerUpdater({playerName, image, ws, points, colour}){
    const cameraSize = Math.min(Dimensions.get('window').width, Dimensions.get('window').height)* 0.30
    return (
        <View style = {{
            margin : '10px', 
            backgroundColor : colour, 
            borderRadius : '10px', 
            maxWidth : Dimensions.get('window').width * 0.4}
    }>
      <View style = {{display: 'flex',alignItems: 'center'}}>
          <img src= {image} 
                style= {
                  {width: cameraSize,
                  height : cameraSize, 
                  objectFit: 'cover', 
                  margin : '1em', 
                  borderRadius : '50%',
                  transform: 'scaleX(-1)'
                }
                } 
          />
          <Text style={[styles.player , {backgroundColor :colour}]}>{playerName}</Text>
            <TouchableOpacity
                onPress={() => {
                    addPointToPlayer(ws, playerName)
                }}
                style={styles.button}>
                    <Text style={styles.text}>Add a Point</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => {
                    removePointFromPlayer(ws, playerName)
                }}
                style={styles.button}>
                    <Text style={styles.text}>Remove a Point</Text>
            </TouchableOpacity>
          
          <Text style={[styles.player , {backgroundColor : colour}]}>{points}</Text>
          <TouchableOpacity
                onPress={() => {
                    deletePlayer(ws, playerName)
                }}
                style={styles.button}>
                    <Text style={styles.text}>Delete Player</Text>
            </TouchableOpacity>
      </View>
    </View>
    )
}