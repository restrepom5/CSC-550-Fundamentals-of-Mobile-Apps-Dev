import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useMoods } from './contexts/MoodContext';
import { useAppTheme } from './contexts/ThemeContext';

const moodOptions = ["Happy", "Sad", "Calm", "Tired", "Excited"];

export default function AddMoodScreen() {
  const [selectedMood, setSelectedMood] = useState("");
  const [note, setNote] = useState("");
  const router = useRouter();
  const { addMood } = useMoods();
  const { theme } = useAppTheme();
  const isDark = theme === 'dark';

  const handleSave = () => {
    if (selectedMood) {
      addMood(selectedMood, note);
      router.back();
    }
  };

  // Dynamic styles
  const containerStyle = [styles.container, { backgroundColor: isDark ? '#121212' : '#fff' }];
  const headerStyle = [styles.header, { color: isDark ? '#fff' : '#000' }];
  const moodButton = (mood: string) => [styles.moodButton, { borderColor: isDark ? '#555' : '#ccc' }, selectedMood === mood && styles.selectedMood];
  const moodTextStyle = { color: isDark ? '#fff' : '#000' };
  const textInputStyle = [styles.textInput, { borderColor: isDark ? '#555' : '#ccc', color: isDark ? '#fff' : '#000' }];

  return (
    <View style={containerStyle}>
      <Text style={headerStyle}>How are you feeling?</Text>

      <View style={styles.moodSelector}>
        {moodOptions.map((mood) => (
          <TouchableOpacity
            key={mood}
            style={moodButton(mood)}
            onPress={() => setSelectedMood(mood)}
          >
            <Text style={moodTextStyle}>{mood}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TextInput
        style={textInputStyle}
        placeholder="Add a note for today (optional)"
        placeholderTextColor={isDark ? '#999' : '#aaa'}
        value={note}
        onChangeText={setNote}
        multiline
      />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save Mood</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  moodSelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  moodButton: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 20,
    margin: 5,
  },
  selectedMood: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  moodText: {
    fontSize: 16,
  },
  textInput: {
    height: 100,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    textAlignVertical: 'top',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
