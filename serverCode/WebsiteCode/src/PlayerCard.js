import { StyleSheet, Text, View, TouchableOpacity, Dimensions} from "react-native";

export default function PlayerCard({playerName, colour, ws, myPlayerName, image, points}){
    const cameraSize = Math.min(Dimensions.get('window').width, Dimensions.get('window').height)* 0.30

    return (
      <View style = {{
              margin : '10px', 
              backgroundColor : colour, 
              borderRadius : '10px', 
              maxWidth : Dimensions.get('window').width * 0.4}
      }>
        <View
            style = {
              {display: 'flex',
              alignItems: 'center'}
            }
        >
            <img  src= {image} 
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
            <Text style={[styles.player , {backgroundColor :colour}]}>{points}</Text>
        </View>
      </View>

    )
}

const em = 16;
const styles = StyleSheet.create({
    player : {
      padding : em,
      backgroundColor : "black",
      borderRadius : em/2,
      color: "#fff",
      textAlign : 'center',
      fontSize : 1.2 * em
    },
    button: {
      backgroundColor: "black" ,
      borderRadius : em/2,
      margin: em,
      color: "#fff",
      fontFamily: "Roboto",
      padding : em,
      position: 'absolute',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '10px',
      height: '10px',
      zIndex: 100
    }
  });