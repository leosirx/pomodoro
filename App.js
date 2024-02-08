import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, SafeAreaView, Platform, TouchableOpacity} from 'react-native';
import { useEffect, useState } from 'react';
import Header from './src/components/Header';
import Timer from './src/components/Timer';
import { Audio } from 'expo-av';

const colors = ["#F7DC6F", "#A2D9CE", "#D7BDE2"]

export default function App() {
  const [isWorking, setIsWorking] = useState(false);
  const [time, setTime] = useState(25 * 60);
  const [currentTime, setCurrentTime] = useState("POMO" | "SHORT" | "BREAK");
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval (() => {
        setTime(time - 1)
      }, 1000)
    } else {
      clearInterval(interval);
    }

    if (time === 0) {
      setIsActive(false);
      setIsWorking(prev => !prev);
      setTime(isWorking ? 300 : 1500);

    }

    return () => clearInterval(interval);

  }, [isActive, time])
  
  function handleStartStop() {
    playSound()
    setIsActive(!isActive);
  }

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      require("./assets/tuki.mp3")
    );

    await sound.playAsync();
  }


  return (
    <SafeAreaView style={{ paddingBottom: "150%", backgroundColor: colors[currentTime]}}>
      <View style={{
        paddingHorizontal: 15, 
        paddingTop: Platform.OS === "android" && 30
        }}>

        <Text style={styles.text}>App Leo</Text>
        
        
        <Header 
          currentTime={currentTime} 
          setCurrentTime={setCurrentTime} 
          setTime={setTime}/>

         <Timer time ={time} />

         <TouchableOpacity onPress={handleStartStop} style={styles.button}>
            <Text style={{ color: "white", fontWeight: "bold"}}>{isActive ? "STOP": "START"}</Text>
         </TouchableOpacity>

        <StatusBar style="dark" />
      </View>
    </SafeAreaView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 32,
    fontWeight: 'bold',
    marginLeft: "32%"
  },
  button: {
    alignItems: "center",
    backgroundColor: "#333333",
    padding: 15,
    marginTop: 15,
    borderRadius: 15
  }
});
