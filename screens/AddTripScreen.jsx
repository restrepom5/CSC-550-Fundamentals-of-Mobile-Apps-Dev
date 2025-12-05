// screens/AddTripScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Haptics from 'expo-haptics';

export default function AddTripScreen({ navigation }) {
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [notes, setNotes] = useState('');

  const saveTrip = async () => {
    if (!destination || !startDate || !endDate) {
      Alert.alert('Missing fields', 'Please fill in destination and dates.');
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
      trips.push(newTrip);
      await AsyncStorage.setItem('TRIPS', JSON.stringify(trips));

      await Haptics.notificationAsync(
        Haptics.NotificationFeedbackType.Success
      );

      Alert.alert('Trip saved!', 'Your trip was added successfully.');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Could not save trip.');
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add a New Trip</Text>

      <Text style={styles.label}>Destination</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. Paris"
        value={destination}
        onChangeText={setDestination}
      />

      <Text style={styles.label}>Start Date</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. 2025-06-10"
        value={startDate}
        onChangeText={setStartDate}
      />

      <Text style={styles.label}>End Date</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. 2025-06-20"
        value={endDate}
        onChangeText={setEndDate}
      />

      <Text style={styles.label}>Notes</Text>
      <TextInput
        style={[styles.input, { height: 80 }]}
        placeholder="Packing list, places to visit..."
        value={notes}
        onChangeText={setNotes}
        multiline
      />

      <Button title="Save Trip" onPress={saveTrip} />
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
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    marginTop: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 8,
    marginTop: 4,
    backgroundColor: 'white',
  },
});
