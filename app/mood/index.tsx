import React from 'react';
import { View, Text, Pressable, FlatList, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useAppSelector, useAppDispatch } from '../../store';
import { clearMoods } from '../../store/moodSlice';

export default function MoodIndexScreen() {
  const router = useRouter();
  const moods = useAppSelector((state) => state.mood.moods);
  const dispatch = useAppDispatch();

  const handleClear = () => {
    if (moods.length === 0) {
      Alert.alert('No moods to clear', 'You haven’t added any moods yet.');
      return;
    }

    Alert.alert(
      'Clear All Moods',
      'Are you sure you want to delete all saved moods?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Yes, clear all',
          style: 'destructive',
          onPress: () => {
            dispatch(clearMoods());
            Alert.alert('Cleared!', 'All moods have been removed.');
          },
        },
      ]
    );
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Mood Tracker</Text>

      <Text style={{ color: '#666', marginBottom: 10 }}>
        Today: {new Date().toLocaleDateString('en-US', {
          weekday: 'long',
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        })}
      </Text>

      <Pressable
        onPress={() => router.push('/mood/add')}
        style={{
          backgroundColor: '#111',
          padding: 14,
          borderRadius: 12,
          alignItems: 'center',
          marginBottom: 20,
        }}
      >
        <Text style={{ color: '#fff', fontWeight: '600' }}>Add current mood</Text>
      </Pressable>

      <Text style={{ fontWeight: '600', fontSize: 18, marginBottom: 8 }}>
        Previous moods
      </Text>

      {moods.length === 0 ? (
        <Text style={{ color: '#777' }}>No moods yet. Add one above!</Text>
      ) : (
        <FlatList
          data={[...moods].reverse()}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <View
              style={{
                borderWidth: 1,
                borderColor: '#ddd',
                borderRadius: 10,
                padding: 10,
                marginBottom: 10,
              }}
            >
              <Text style={{ fontWeight: '600' }}>{item.mood}</Text>
              <Text style={{ color: '#666', fontSize: 12 }}>
                {new Date(item.timestamp).toLocaleString()}
              </Text>
              {item.note ? (
                <Text style={{ marginTop: 4 }}>{item.note}</Text>
              ) : null}
            </View>
          )}
        />
      )}

      {moods.length > 0 && (
        <Pressable
          onPress={handleClear}
          style={{
            backgroundColor: '#e63946',
            padding: 14,
            borderRadius: 12,
            alignItems: 'center',
            marginTop: 10,
          }}
        >
          <Text style={{ color: '#fff', fontWeight: '600' }}>Clear All Moods</Text>
        </Pressable>
      )}
    </View>
  );
}

