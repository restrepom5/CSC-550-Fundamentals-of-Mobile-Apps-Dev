// screens/TripDetailsScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function TripDetailsScreen({ route }) {
  const { trip } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{trip.destination}</Text>
      <Text style={styles.text}>
        Dates: {trip.startDate} → {trip.endDate}
      </Text>

      {trip.notes ? (
        <>
          <Text style={styles.subtitle}>Notes:</Text>
          <Text style={styles.text}>{trip.notes}</Text>
        </>
      ) : (
        <Text style={styles.text}>No notes for this trip.</Text>
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
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 12,
  },
  text: {
    fontSize: 14,
    marginTop: 4,
  },
});
