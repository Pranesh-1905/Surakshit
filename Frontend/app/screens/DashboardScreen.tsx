import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';

const DashboardScreen: React.FC = () => {
  const [weatherData, setWeatherData] = useState({
    temperature: '',
    windSpeed: '',
    humidity: '',
    rainfall: '',
  });

  useEffect(() => {
    // Fetch weather data from your API or service
    // setWeatherData({ temperature: '30°C', windSpeed: '15 km/h', humidity: '60%', rainfall: '20%' });
  }, []);

  return (
    <View style={styles.container}>
      <Image
  source={require('../../assets/images/weather-icon.png')}
  style={styles.weatherIcon}
/>
      <Text style={styles.title}>Current Weather</Text>
      <View style={styles.weatherInfoContainer}>
        
        <Text style={styles.info}>🌡️Temperature: {weatherData.temperature}</Text>
        <Text style={styles.info}>🍃Wind Speed: {weatherData.windSpeed}</Text>
        <Text style={styles.info}>💦Humidity: {weatherData.humidity}</Text>
        <Text style={styles.info}>⛈️Rainfall: {weatherData.rainfall}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "rgb(204 255 204)",
  },
  weatherIcon: {
    width: 64,
    height: 64,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    fontWeight: 'bold', // added bold font weight
    color: '#333', // added text color
  },
  weatherInfoContainer: {
    padding: 16,
    backgroundColor: '#fff', // added background color
    borderRadius: 10, // added border radius
    shadowColor: '#000', // added shadow color
    shadowOpacity: 0.2, // added shadow opacity
    shadowRadius: 10, // added shadow radius
    elevation: 5, // added elevation
  },
  info: {
    fontSize: 18,
    marginVertical: 4,
    color: '#666', // added text color
  },
});

export default DashboardScreen;