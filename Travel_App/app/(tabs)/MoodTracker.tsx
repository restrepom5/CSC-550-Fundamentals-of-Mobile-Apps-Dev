import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context'; 

// 💡 Assuming this is the new correct path to your RootState type
import { RootState } from '../../src/store/types'; 

// Define mood icon options for display consistency
const MOOD_ICONS: { [key: string]: string } = {
  'Great': '😀', // Assuming 'Great' maps to a happy emoji
  'Good': '😊', 
  'Neutral': '😌',
  'Bad': '😟',
  'Awful': '😬', 
  // Map moods used in your AddMoodScreen to emojis
  'Happy': '😊',
  'Calm': '😌',
  'Relaxed': '🧘‍♀️',
  'Stressed': '😬',
  'Anxious': '😟',
};

export default function MoodTrackerScreen() {
  const moods = useSelector((state: RootState) => state.moods.moods); 

  const today = useMemo(() => new Date().toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  }), []);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <View style={styles.container}>
        <Text style={styles.header}>Today is: **{today}**</Text>
        
        <TouchableOpacity 
          style={styles.addButton}
          // The router.push here is correct and will navigate to the screen
          // which automatically fetches the location when it mounts.
          onPress={() => router.push('/addMood')} 
          activeOpacity={0.7} 
        >
          <Text style={styles.addButtonText}>➕ Add Current Mood</Text>
        </TouchableOpacity>
        
        <Text style={styles.listTitle}>Past Moods Summary ({moods.length} Entries):</Text>
        
        <FlatList
          data={moods}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.moodItem}>
              <Text style={styles.moodDate}>Logged: {new Date(item.date).toLocaleDateString()} at {new Date(item.date).toLocaleTimeString()}</Text>
              
              <Text style={styles.moodType}>
                {MOOD_ICONS[item.mood] || ''} Mood: **{item.mood}**
              </Text>
              
              {/* 💡 CHANGE: Display the saved location */}
              {item.location && item.location !== 'Not Logged' && (
                  <Text style={styles.moodLocation}>
                      📍 Location: {item.location}
                  </Text>
              )}
              
              {item.note && <Text style={styles.moodNote}>Note: {item.note}</Text>}
            </View>
          )}
          ListEmptyComponent={<Text style={styles.emptyText}>No moods saved yet!</Text>}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000000', 
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#000000',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#D4D4D4', 
    marginBottom: 15,
  },
  addButton: {
    backgroundColor: '#388E3C', 
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  listTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#D4D4D4',
    marginTop: 20,
    marginBottom: 10,
  },
  moodItem: {
    backgroundColor: '#1E1E1E', 
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderLeftColor: '#90EE90',
    borderLeftWidth: 4,
  },
  moodDate: {
    fontSize: 12,
    color: '#A0A0A0', 
    marginBottom: 5,
  },
  moodType: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  // 💡 NEW STYLE for the saved location display
  moodLocation: { 
    fontSize: 13,
    color: '#B0C4DE', 
    marginBottom: 4,
    fontStyle: 'italic',
  },
  moodNote: {
    fontSize: 14,
    color: '#C4C4C4',
    fontStyle: 'italic',
  },
  emptyText: {
    textAlign: 'center',
    color: '#A0A0A0',
    marginTop: 50,
  }
});