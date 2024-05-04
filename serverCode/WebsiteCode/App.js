import { StyleSheet, Text, View,  TouchableOpacity, Dimensions} from "react-native";
import { useState, useEffect} from "react";
import { useFonts } from "expo-font";
import Register from "./src/Register";
import PlayersPage from "./src/PlayersPage";
import HostPage from "./src/HostPage";
import BuzzerPage from "./src/BuzzerPage";

let ws

export default function App() {
  const [loaded] = useFonts({
    Roboto: require("./assets/Roboto/Roboto-Black.ttf"),
  });
  const [player , setPlayer] = useState("")
  const [playerList , setPlayerList] = useState([])
  const [page, setPage] = useState('Register')
  const [isHost, setIsHost] = useState(false)
  const [canBuzz, setCanBuzz] = useState(true)
  const [buzzedPlayer, setBuzzedPlayer] = useState(null)
  const [isRegistered, setIsRegistered] = useState(false)

  function recieveFromServer(msg){
    console.log(msg);

    const message = JSON.parse(msg.data);
    switch(message.type){
      case "newPlayer":
        setPlayerList(message.players)
        break;
      case 'registrationComplete':
        setIsRegistered(true);
        setPage('Players')
        break;
      case "alreadyRegistered":
        alert('Name Taken: Please use another')
        break;
      case "deletePlayer":
        setPlayerList(message.players)
        break;
      case "updatePlayers":
        setPlayerList(message.players)
        break;
      case 'alreadyBuzzed':
        setCanBuzz(false);
        if(!buzzedPlayer){
          setBuzzedPlayer(message.player)
        }
        break;
      case 'resetBuzzers':
        setCanBuzz(true);
        break;
      default:
        console.log(message)
        break;
    }
  }

  useEffect( () => {
    // ws = new WebSocket("wss://thefrasergame.ddns.net:443"); //Live
    ws = new WebSocket("wss://192.168.0.169:443"); //Development
    // ws = new WebSocket("wss://localhost:443"); //Development
    ws.onmessage = recieveFromServer;
  }, [])
  
  const allPages = [
    'Register',
    'Players'
  ]

  //TODO make it so once registered you cant reregister???
  return (
    <View style={styles.container}>

        <View style={styles.header}>
          {allPages.map(page => 
            <TouchableOpacity
                key={page}
                onPress={() => setPage(page)}
                style={styles.button}>
                <Text style={styles.headerButton}>{page}</Text>
            </TouchableOpacity>
            )}
            {isHost &&
            <TouchableOpacity
                key={page}
                onPress={() => setPage('Host')}
                style={styles.button}>
                <Text style={styles.headerButton}>{'Host'}</Text>
            </TouchableOpacity>
            }
            {!isHost &&
            <TouchableOpacity
                key={page}
                onPress={() => setPage('Buzzer')}
                style={styles.button}>
                <Text style={styles.headerButton}>{'Buzzer'}</Text>
            </TouchableOpacity>
            }
        </View>
        
        { page === 'Register' &&
          <Register
            player = {player}
            setPlayer = {(value) => setPlayer(value)}
            setIsHost = {(value) => setIsHost(value)}
            ws = {ws}
            changePage={() => setPage('Players')}
          />
        }
        { page === 'Players' &&
          <PlayersPage 
              playerList={playerList} 
              player={player} 
              ws={ws} 
            />
        }
        { page === 'Host' &&
          <HostPage 
              playerList={playerList} 
              player={player} 
              ws={ws} 
              buzzedPlayer={buzzedPlayer}
              setBuzzedPlayer={setBuzzedPlayer}
            />
        }
        { page === 'Buzzer' && isRegistered &&
          <BuzzerPage 
              playerList={playerList} 
              player={player} 
              ws={ws} 
              canBuzz={canBuzz}
              setCanBuzz={setCanBuzz}
            />
        }
    </View>
  );
}

const em = 16;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#5fa5ba",
    color :"white",
    alignItems: "center"
  },
  button: {
    backgroundColor: "black" ,
    borderRadius : em/2,
    margin: em,
    color: "#fff",
    fontFamily: "Roboto",
    padding : em
  },
  header : {
    display: 'flex',
    flexDirection: 'row',
    flexWrap : 'wrap',
    justifyContent: 'center'
  
  },
  headerButton : {
    color: "#fff" ,
    textAlign : 'center'
  }
});