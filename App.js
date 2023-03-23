import { StyleSheet, View } from 'react-native';
import {useEffect, useState} from "react";
import * as Location from 'expo-location';
import RNSpeedometer from 'react-native-speedometer';
import {LocationAccuracy} from "expo-location";

const convertMphToKmh = (speed) => {
  return speed * 3.6
}

export default function App() {
  const [speed, setSpeed] = useState(0);

  useEffect(() => {
    const fetchSpeed = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }
      await Location.watchPositionAsync({accuracy: LocationAccuracy.BestForNavigation, distanceInterval: 5}, (location) => {
        setSpeed(convertMphToKmh(location.coords.speed));
      });
    }
    void fetchSpeed();
  }, [])

  return (
    <View style={styles.container}>
      <RNSpeedometer value={speed} size={200} maxValue={200} labelNoteStyle={{color: 'white'}}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
