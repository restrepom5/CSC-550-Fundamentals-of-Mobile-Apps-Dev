import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome5 } from '@expo/vector-icons'; // Import icons for a modern look

// 1. ActivityLog Interface (Option B from earlier plan)
interface ActivityLog {
  id: number;
  type: 'Run' | 'Walk' | 'Hike' | 'Bike' | 'Workout';
  durationMinutes: number;
  distanceKm: number;
  caloriesBurned: number;
  status: 'Completed' | 'Upcoming';
}

// 2. Mock Fitness Data
const recentActivities: ActivityLog[] = [
  { id: 201, type: 'Run', durationMinutes: 45, distanceKm: 6.2, caloriesBurned: 550, status: 'Completed' },
  { id: 202, type: 'Walk', durationMinutes: 30, distanceKm: 2.5, caloriesBurned: 180, status: 'Completed' },
  { id: 203, type: 'Workout', durationMinutes: 60, distanceKm: 0, caloriesBurned: 400, status: 'Completed' },
  { id: 204, type: 'Bike', durationMinutes: 90, distanceKm: 35.0, caloriesBurned: 900, status: 'Upcoming' },
  { id: 205, type: 'Walk', durationMinutes: 60, distanceKm: 5.0, caloriesBurned: 300, status: 'Upcoming' },
];

// Helper function to get an icon based on activity type
const getActivityIcon = (type: string) => {
  switch (type) {
    case 'Run':
      return 'running';
    case 'Bike':
      return 'bicycle';
    case 'Hike':
      return 'hiking';
    case 'Workout':
      return 'dumbbell';
    default:
      return 'walking';
  }
};

export default function Home() {
  const renderItem = ({ item }: { item: ActivityLog }) => (
    <TouchableOpacity style={styles.card} activeOpacity={0.8}>
      <View style={styles.cardHeader}>
        <FontAwesome5 name={getActivityIcon(item.type)} size={24} color="#4CAF50" style={styles.icon} />
        <Text style={styles.cardTitle}>{item.type}</Text>
        <Text style={[
          styles.statusText, 
          item.status === 'Completed' ? styles.statusCompleted : styles.statusUpcoming
        ]}>
          {item.status}
        </Text>
      </View>
      
      <View style={styles.cardBody}>
        {item.distanceKm > 0 && (
          <Text style={styles.metricText}>
            Distance: <Text style={styles.metricValue}>{item.distanceKm.toFixed(1)} km</Text>
          </Text>
        )}
        <Text style={styles.metricText}>
          Duration: <Text style={styles.metricValue}>{item.durationMinutes} min</Text>
        </Text>
        <Text style={styles.metricText}>
          Calories: <Text style={styles.metricValue}>{item.caloriesBurned} kcal</Text>
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Your Activity Log</Text>
      <Text style={styles.subtitle}>Recent workouts and movement.</Text>

      <FlatList
        data={recentActivities}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1c1e', // Dark background
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#8e8e93', // Gray subtitle
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: '#2e2e30', // Slightly lighter card background
    borderRadius: 12,
    padding: 18,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#3a3a3c',
    paddingBottom: 8,
  },
  icon: {
    marginRight: 10,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    flex: 1, // Take up remaining space
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    overflow: 'hidden',
  },
  statusCompleted: {
    color: '#fff',
    backgroundColor: '#4CAF50', // Completed: Green
  },
  statusUpcoming: {
    color: '#fff',
    backgroundColor: '#FF9500', // Upcoming: Orange
  },
  cardBody: {
    marginTop: 10,
  },
  metricText: {
    fontSize: 16,
    color: '#ccc',
    marginVertical: 2,
  },
  metricValue: {
    fontWeight: 'bold',
    color: '#fff',
  }
});