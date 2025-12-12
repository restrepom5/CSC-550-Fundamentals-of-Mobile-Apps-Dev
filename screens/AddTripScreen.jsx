// screens/AddTripScreen.jsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Haptics from 'expo-haptics';
import * as Notifications from 'expo-notifications';

export default function AddTripScreen({ navigation }) {
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [notes, setNotes] = useState('');

  const handleSave = async () => {
    if (!destination || !startDate || !endDate) {
      Alert.alert('Missing info', 'Please fill in destination and dates.');
      return;
    }

    const newTrip = {
      id: Date.now().toString(),
      destination,
      startDate,
      endDate,
      notes,
    };

    try {
      const stored = await AsyncStorage.getItem('TRIPS');
      const trips = stored ? JSON.parse(stored) : [];
      const updatedTrips = [...trips, newTrip];

      await AsyncStorage.setItem('TRIPS', JSON.stringify(updatedTrips));

      // Haptics 
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

      // Notification 
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Trip Saved! 🌍',
          body: `Your trip to ${destination} was added successfully.`,
        },
        trigger: null, // send immediately
      });

      Alert.alert('Trip saved', `Your trip to ${destination} was added.`);

      // Reset form and go back
      setDestination('');
      setStartDate('');
      setEndDate('');
      setNotes('');
      navigation.goBack();
    } catch (error) {
      console.log('Error saving trip:', error);
      Alert.alert('Error', 'Could not save the trip. Please try again.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Add a New Trip</Text>

      <Text style={styles.label}>Destination</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. Paris"
        value={destination}
        onChangeText={setDestination}
      />

      <Text style={styles.label}>Start Date (MM/DD/YYYY)</Text>
      <TextInput
        style={styles.input}
        placeholder="MM/DD/YYYY"
        value={startDate}
        onChangeText={setStartDate}
      />

      <Text style={styles.label}>End Date (MM/DD/YYYY)</Text>
      <TextInput
        style={styles.input}
        placeholder="MM/DD/YYYY"
        value={endDate}
        onChangeText={setEndDate}
      />

      <Text style={styles.label}>Notes (optional)</Text>
      <TextInput
        style={[styles.input, styles.multilineInput]}
        placeholder="Add any notes or plans for this trip."
        value={notes}
        onChangeText={setNotes}
        multiline
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>SAVE TRIP</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 32,
    backgroundColor: '#f3f9ff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#033649',
  },
  label: {
    fontSize: 14,
    marginBottom: 4,
    color: '#033649',
  },
  input: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#d0e6ff',
  },
  multilineInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: '#0b7fab',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  saveButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
});
