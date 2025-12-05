// screens/HomeScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, ActivityIndicator } from 'react-native';
import axios from 'axios';
import * as Location from 'expo-location';

export default function HomeScreen({ navigation }) {
  const [tip, setTip] = useState(null);
  const [loadingTip, setLoadingTip] = useState(false);

  const [location, setLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);

  // Network call with Axios
  useEffect(() => {
    const fetchTravelTip = async () => {
      try {
        setLoadingTip(true);
        const response = await axios.get(
            'https://api.adviceslip.com/advice'
        );
        setTip(response.data.slip.advice);
      } catch (error) {
        setTip('Could not load tip. Please try again later.');
      } finally {
        setLoadingTip(false);
      }
    };

    fetchTravelTip();
  }, []);

  // Device capability: Location
  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setLocationError('Permission to access location was denied.');
          return;
        }

        let currentLocation = await Location.getCurrentPositionAsync({});
        setLocation(currentLocation);
      } catch (error) {
        setLocationError('Could not get your location.');
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Travel Planner</Text>
      <Text style={styles.subtitle}>Plan trips and keep simple notes.</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Travel Tip (network call)</Text>
        {loadingTip ? (
          <ActivityIndicator />
        ) : (
          <Text style={styles.cardText}>{tip}</Text>
        )}
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Your Location (device API)</Text>
        {locationError && <Text style={styles.cardText}>{locationError}</Text>}
        {location && (
          <Text style={styles.cardText}>
            Latitude: {location.coords.latitude.toFixed(4)}{'\n'}
            Longitude: {location.coords.longitude.toFixed(4)}
          </Text>
        )}
      </View>

      <Button
        title="Add a New Trip"
        onPress={() => navigation.navigate('AddTrip')}
      />

      <View style={{ height: 12 }} />

      <Button
        title="View All Trips"
        onPress={() => navigation.navigate('Trips')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f3f9ff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 16,
  },
  card: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    elevation: 2,
  },
  cardTitle: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cardText: {
    fontSize: 14,
  },
});
