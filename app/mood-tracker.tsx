import React, { useState } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useSelector } from 'react-redux';
import { RootState } from '../src/store/store';

export default function MoodTrackerScreen() {
  const router = useRouter();
  const moods = useSelector((state: RootState) => state.mood.moods);
  const [showHistory, setShowHistory] = useState(false);

  // Last mood entry
  const lastMood = moods.length > 0 ? moods[moods.length - 1] : null;

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' }}>
        Mood Tracker
      </Text>

      {/* Last Mood */}
      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Your Last Mood</Text>
        {lastMood ? (
          <Text>
            {lastMood.date} - {lastMood.mood}
            {lastMood.note ? `\nNote: ${lastMood.note}` : ''}
          </Text>
        ) : (
          <Text>No moods yet. Add your first one!</Text>
        )}
      </View>

      {/* History Dropdown */}
      <View style={{ marginBottom: 20 }}>
        <TouchableOpacity
          onPress={() => setShowHistory(!showHistory)}
          style={{
            backgroundColor: '#eee',
            padding: 10,
            borderRadius: 8,
            marginBottom: 10,
          }}
        >
          <Text style={{ fontWeight: 'bold', fontSize: 17}}>
            History {showHistory ? '▲' : '▼'}
          </Text>
        </TouchableOpacity>

        {showHistory && (
          <FlatList
            data={moods}
            keyExtractor={(item) => item.id} // accesing a specif index in the array
            renderItem={({ item }) => (
              <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 10 }}>
                {/* Bullet */}
                <View
                  style={{ // As we discussed in class on November 6th, I should not use in line style in the code
                    width: 6,
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: '#333',
                    marginTop: 6,
                    marginRight: 8,
                  }}
                />
                {/* Mood info */}
                <View style={{ flex: 1 }}>
                  <Text>
                    {item.date} - {item.mood}
                  </Text>
                  {item.note && (
                    <Text style={{ fontStyle: 'italic', color: '#555' }}>
                      Note: {item.note}
                    </Text>
                  )}
                </View>
              </View>
            )}
            ListEmptyComponent={<Text>No moods yet.</Text>}
          />
        )}
      </View>

      {/* Button to Add Mood */}
      <Button title="Add Current Mood" onPress={() => router.push('/add-mood')} color="#077BFF" />
    </View>
  );
}
