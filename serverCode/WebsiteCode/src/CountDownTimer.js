import React from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { StyleSheet, Text, View } from "react-native";
import { useFonts } from "expo-font";

const renderTime = ({ remainingTime }) => {
    if (remainingTime === 0) {
      return <Text className="timer">Too late...</Text>;
    }
  
    return (
      <View className="timer">
        <Text style={styles.text}>{remainingTime}</Text>
      </View>
    );
  };

export default function CountDownTimer({stopTime, completed}){
    //TODO add a prop here for the date and use that to decide the time
    const [loaded] = useFonts({
        Roboto: require("../assets/Roboto/Roboto-Black.ttf"),
      });

      const now = new Date()
      const dif =  Date.parse(stopTime) - now.getTime();
      let duration = dif / 1000;
      if(duration <= 0) {
          duration = 0;
      }

  return (
      <View style={styles.container}>
        <CountdownCircleTimer
          isPlaying
          duration={duration}
          colors={["black"]}
          colorsTime={[duration]}
          onComplete={() => alert(completed)}
        >
          {renderTime}
        </CountdownCircleTimer>
      </View>
  );
}


const em = 16;
const styles = StyleSheet.create({
    container : {
    },
    text: {
        color: "#fff",
        fontFamily: "Roboto",
        fontSize : 1 * em,
        textAlign : "center"
    }
  });