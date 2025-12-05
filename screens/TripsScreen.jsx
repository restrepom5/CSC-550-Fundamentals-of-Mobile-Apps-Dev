// screens/TripsScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

export default function TripsScreen({ navigation }) {
  const [trips, setTrips] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      const loadTrips = async () => {
        try {
          const stored = await AsyncStorage.getItem('TRIPS');
          if (stored) {
            setTrips(JSON.parse(stored));
          } else {
            setTrips([]);
          }
        } catch (error) {
          console.log('Error loading trips:', error);
        }
      };

      loadTrips();
    }, [])
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.tripItem}
      onPress={() => navigation.navigate('TripDetails', { trip: item })}
    >
      <Text style={styles.tripTitle}>{item.destination}</Text>
      <Text style={styles.tripDates}>
        {item.startDate} → {item.endDate}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Trips</Text>

      {trips.length === 0 ? (
        <Text>No trips yet. Add one from the Home tab.</Text>
      ) : (
        <FlatList
          data={trips}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  tripItem: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#e9f3ff',
    marginBottom: 8,
  },
  tripTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  tripDates: {
    fontSize: 14,
    marginTop: 4,
  },
});
