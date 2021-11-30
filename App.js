import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState}from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import * as Location from 'expo-location';

import DateTime from './components/DateTime'
import WeatherScroll from './components/WeatherScroll'
const API_KEY ='06e410354074255cadd2ff3bcb4e2dda';
const img = require('./assets/image.png')
export default function App() {
  const [data, setData] = useState({});
  const [locationServiceEnabled, setLocationServiceEnabled] = useState(false);
  const [displayCurrentAddress, setDisplayCurrentAddress] = useState(
    'Wait, we are fetching you location...'
  );
  

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        fetchDataFromApi("40.7128", "-74.0060")
        return;
      }

      let enabled = await Location.hasServicesEnabledAsync();

      if (!enabled) {
        Alert.alert(
        'Location Service not enabled',
        'Please enable your location services to continue',
        [{ text: 'OK' }],
        { cancelable: false }
      );
    } else {
      setLocationServiceEnabled(enabled);
    }

      let location = await Location.getCurrentPositionAsync({});
      let {coords} = location;
      const { latitude, longitude } = coords;
      
      let response = await Location.reverseGeocodeAsync({
        latitude,
        longitude
      });
      console.log(response)

      fetchDataFromApi(location.coords.latitude, location.coords.longitude);
    
  })();
  }, [])

  const fetchDataFromApi = (latitude, longitude) => {
    if(latitude && longitude) {
      fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`).then(res => res.json()).then(data => {

      //console.log(data)
      setData(data)
      })
    }
    
  }

  return (
    <View style={styles.container}>
      <DateTime current={data.current} timezone={data.timezone} lat={data.lat} lon={data.lon}/>
      <WeatherScroll weatherData={data.daily}/>
      <Text>{displayCurrentAddress}</Text>
      {/*<StatusBar style="auto" />*/}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#544179'
  },
  image:{
    flex:1, 
    resizeMode:"cover", 
    justifyContent:"center"
  }
});
