import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, Alert } from 'react-native';
import { useRouter, useNavigation } from 'expo-router';
import { useAppDispatch } from '../../store';
import { addMood } from '../../store/moodSlice';

type MoodValue = 'Happy' | 'Sad' | 'Stressed' | 'Relaxed' | 'Calm' | 'Tired';
const MOODS: MoodValue[] = ['Happy', 'Sad', 'Stressed', 'Relaxed', 'Calm', 'Tired'];

export default function AddMoodScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const nav = useNavigation();

  // ✅ Set clean header title
  useEffect(() => {
    nav.setOptions({ title: 'Add Mood' });
  }, [nav]);

  const [mood, setMood] = useState<MoodValue>('Happy');
  const [note, setNote] = useState('');

  // ✅ Show alert confirmation after saving mood
  const save = () => {
    dispatch(addMood({ mood, note: note.trim() ? note : undefined }));
    Alert.alert('Mood Saved!', 'Your mood was saved successfully.');
    router.back();
  };

  return (
    <View style={{ flex: 1, padding: 16, gap: 16 }}>
      <Text style={{ fontSize: 22, fontWeight: '600' }}>Add Mood</Text>

      <Text style={{ fontWeight: '600' }}>Select your mood:</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
        {MOODS.map((m) => {
          const selected = m === mood;
          return (
            <Pressable
              key={m}
              onPress={() => setMood(m)}
              style={{
                borderWidth: 1,
                borderColor: selected ? '#111' : '#ccc',
                backgroundColor: selected ? '#111' : '#fff',
                paddingVertical: 8,
                paddingHorizontal: 12,
                borderRadius: 999,
              }}
            >
              <Text style={{ color: selected ? '#fff' : '#111' }}>{m}</Text>
            </Pressable>
          );
        })}
      </View>

      <Text style={{ fontWeight: '600' }}>Add a note (optional):</Text>
      <TextInput
        value={note}
        onChangeText={setNote}
        placeholder="e.g., Busy day but feeling okay"
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 10,
          padding: 12,
        }}
        multiline
      />

      <Pressable
        onPress={save}
        style={{
          backgroundColor: '#111',
          padding: 14,
          borderRadius: 12,
          alignItems: 'center',
        }}
      >
        <Text style={{ color: '#fff', fontWeight: '600' }}>Save Mood</Text>
      </Pressable>
    </View>
  );
}

