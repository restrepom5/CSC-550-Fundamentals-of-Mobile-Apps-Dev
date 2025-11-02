import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import { router } from 'expo-router';
import { useDispatch } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context'; 

import { addMood } from '../../../src/store/moodsSlice';
import { useNavigation } from 'expo-router';

// Define the moods available for selection
const MOOD_OPTIONS = ['Happy', 'Calm', 'Stressed', 'Tired', 'Sad', 'Relaxed', 'Anxious'];
const DISPATCH_VOICES: { [key: string]: string } = {
  'Happy': 'Puck',
  'Calm': 'Leda',
  'Stressed': 'Kore',
  'Tired': 'Charon',
  'Sad': 'Fenrir',
  'Relaxed': 'Aoede',
  'Anxious': 'Orus',
};

interface MoodButtonProps {
  mood: string;
}

export default function AddMoodScreen() {
  const [selectedMood, setSelectedMood] = useState(MOOD_OPTIONS[0]);
  const [note, setNote] = useState('');

  const dispatch = useDispatch();
  const navigation = useNavigation();

// Use a custom header component to match the dark theme and provide back button
useEffect(() => { // <-- START of useEffect hook
  navigation.setOptions({
    headerStyle: {
      backgroundColor: '#000000', 
    },
    headerTintColor: '#90EE90', 
    headerTitleStyle: {
      fontWeight: 'bold',
      color: '#FFFFFF'
    },
    headerTitle: 'Add New Mood',
  });
}, [navigation]); // <-- Dependency array includes 'navigation' (best practice)

  const handleSaveMood = () => {
    // 1. Validate data
    if (!selectedMood) {
      // In a real app, this would show a user-facing error message
      console.error('Mood must be selected.');
      return; 
    }

    // 2. Prepare new entry
    const newMoodEntry = {
      id: Date.now().toString(),
      // Format the date for display on the summary screen
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      mood: selectedMood,
      note: note.trim(),
    };

    // 3. Dispatch to Redux
    dispatch(addMood(newMoodEntry));

    // 4. Navigate back to the summary screen
    router.back();
  };

  // 💡 FIX: Custom mood button component with selection logic
  const MoodButton = ({mood}: MoodButtonProps) => {
    const isSelected = mood === selectedMood;
    return (
      <TouchableOpacity
        style={[
          styles.moodButton,
          // 💡 Conditional styling for selected state
          isSelected ? styles.moodButtonSelected : styles.moodButtonDeselected,
        ]}
        onPress={() => setSelectedMood(mood)}
        activeOpacity={0.7} // Provides press feedback on Android
      >
        <Text style={styles.moodButtonText}>{mood.toUpperCase()}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <View style={styles.container}>
        <Text style={styles.label}>Select your current mood:</Text>
        
        {/* Mood Selection Buttons */}
        <View style={styles.moodButtonsContainer}>
          {MOOD_OPTIONS.map(mood => (
            <MoodButton key={mood} mood={mood} />
          ))}
        </View>

        {/* Note Input */}
        <Text style={styles.label}>Add a note for today (Optional):</Text>
        <TextInput
          style={styles.input}
          onChangeText={setNote}
          value={note}
          placeholder="e.g., Feeling productive..."
          placeholderTextColor="#A0A0A0"
          multiline
          numberOfLines={4}
        />

        {/* Save Button (using TouchableOpacity for press feedback) */}
        <TouchableOpacity 
          style={styles.saveButton}
          onPress={handleSaveMood}
          activeOpacity={0.7} // Provides press feedback on Android
        >
          <Text style={styles.saveButtonText}>💾 SAVE MOOD</Text>
        </TouchableOpacity>
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
    padding: 20,
    backgroundColor: '#000000',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#D4D4D4',
    marginBottom: 10,
  },
  moodButtonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  moodButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3, // Android shadow
  },
  // 💡 NEW STYLE: Deselected (default) state
  moodButtonDeselected: {
    backgroundColor: '#1E1E1E', // Darker background
    borderWidth: 1,
    borderColor: '#333333',
  },
  // 💡 NEW STYLE: Selected state (the visual feedback)
  moodButtonSelected: {
    backgroundColor: '#90EE90', // Light Green when selected
    borderWidth: 1,
    borderColor: '#388E3C', // Dark Green border
  },
  moodButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  input: {
    backgroundColor: '#1E1E1E',
    color: '#FFFFFF',
    padding: 15,
    borderRadius: 8,
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: 'top', // Fixes text alignment for multiline on Android
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#333333',
  },
  saveButton: {
    backgroundColor: '#388E3C',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 6, // Android shadow
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
});
