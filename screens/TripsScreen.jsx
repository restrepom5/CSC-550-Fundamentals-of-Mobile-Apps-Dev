// screens/TripsScreen.jsx
import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

export default function TripsScreen({ navigation }) {
  const [trips, setTrips] = useState([]);

  useFocusEffect(
    useCallback(() => {
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
      style={styles.tripCard}
      onPress={() => navigation.navigate('TripDetails', { trip: item })}
    >
      <Text style={styles.tripTitle}>{item.destination}</Text>
      <Text style={styles.tripDates}>
        {item.startDate} → {item.endDate}
      </Text>
      {item.notes ? (
        <Text style={styles.tripNotes}>{item.notes}</Text>
      ) : (
        <Text style={styles.tripNotesEmpty}>No notes added</Text>
      )}
    </TouchableOpacity>
  );

  return (
    <LinearGradient colors={['#0b7fab', '#4cd4b0']} style={styles.container}>
      <View style={styles.inner}>
        <Text style={styles.title}>My Trips</Text>

        {trips.length === 0 ? (
          <Text style={styles.emptyText}>
            No trips yet. Add one from the Home tab or the button below.
          </Text>
        ) : (
          <FlatList
            data={trips}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
          />
        )}

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('AddTrip')}
        >
          <Text style={styles.addButtonText}>ADD A NEW TRIP</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
    padding: 16,
    paddingTop: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 16,
    color: '#e6f7ff',
    marginTop: 12,
    marginBottom: 20,
  },
  tripCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 14,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowRadius: 6,
  },
  tripTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#033649',
  },
  tripDates: {
    fontSize: 14,
    color: '#07526d',
    marginTop: 4,
    marginBottom: 4,
  },
  tripNotes: {
    fontSize: 13,
    color: '#033649',
  },
  tripNotesEmpty: {
    fontSize: 13,
    color: '#999',
    fontStyle: 'italic',
  },
  addButton: {
    backgroundColor: '#ffffff',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  addButtonText: {
    color: '#0b7fab',
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
});
