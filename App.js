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
  const [addr, setAddr] = useState({});
 
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        fetchDataFromApi("40.7128", "-74.0060")
        return;
      }
      let location = await Location.getCurrentPositionAsync({});

      fetchDataFromApi(location.coords.latitude, location.coords.longitude);
      fetchAddr(location.coords.latitude, location.coords.longitude);
    
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

  const fetchAddr = (lat, long) => {
    fetch(`https://trueway-geocoding.p.rapidapi.com/ReverseGeocode?location=${lat}%2C%20${long}&language=en`, {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "trueway-geocoding.p.rapidapi.com",
		"x-rapidapi-key": "29c2d7eab6msh43713a5dd579724p13ecadjsn044fd101db72"
	}
})
.then((response) => response.json()).then((json) => {
  console.log(json.results[1].address)
  setAddr(json.results[1])
  return data.names;
}).catch((error) => {
  console.error(error);
});
    
  }

  
  

  return (
    <View style={styles.container}>
      <DateTime current={data.current} timezone={data.timezone} lat={data.lat} lon={data.lon} addr={addr.address}/>
      <WeatherScroll weatherData={data.daily}/>
     
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
