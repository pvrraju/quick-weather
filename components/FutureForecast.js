import React from 'react'
import {View, Text, Image, StyleSheet} from 'react-native'
import moment from 'moment-timezone'
const FutureForecast = ({data}) => {
    return (
        <View style={{flexDirection: 'row'}}>

            {
                data && data.length > 0 ? 

                data.map((data, idx) => (

                    idx !== 0 &&  <FutureForecastItem key={idx} forecastItem={data}/>
                ))

                :

                <View/>
            }
          
            

        </View>
    )
}

const FutureForecastItem = ({forecastItem}) => {
    const img = {uri: "http://openweathermap.org/img/wn/"+forecastItem.weather[0].icon+"@2x.png"}
   
    
    return (
        <View  style={styles.futureForecastItemContainer}>
            <Text  style={styles.day}>{moment(forecastItem.dt * 1000).format('ddd')}</Text>
            <Image source={img} style={styles.image} />
            <Text  style={styles.temp}>Night - {forecastItem.temp.night}&#176;C</Text>
            <Text  style={styles.temp}>Day - {forecastItem.temp.day}&#176;C</Text>

        </View>
    )
}

export default FutureForecast


const styles = StyleSheet.create({
    image: {
        width: 75,
        height:75
    }, 
    futureForecastItemContainer: {
        flex:1,
        justifyContent: 'center',
        backgroundColor: '#18181b99',
        padding: 30,
        marginLeft: 10,
        borderRadius: 10
    }, 
    day: {
        fontSize: 20,
        color:"white",
        padding: 10,
        textAlign:"center",
        fontWeight: "200",
    },   
    temp: {
        fontSize: 14,
        color:"white",
        fontWeight:"100",
        textAlign:"center"
    },
})