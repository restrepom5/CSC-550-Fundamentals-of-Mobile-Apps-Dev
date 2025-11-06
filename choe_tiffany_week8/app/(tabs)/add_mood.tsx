import { Button, StyleSheet, TextInput, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Mood, moodColors, moodOptions, useMoods } from '@/src/context/mood_context';

export default function AddMood() {
  const router = useRouter();
  const { addMood } = useMoods();
  const [selectedMood, setSelectedMood] = useState<Mood>('happy');
  const [note, setNote] = useState('');

  const save = () => {
    addMood({
      date: new Date(),
      mood: selectedMood,
      note: note.trim() || '',
      id: 0,
    });
    setSelectedMood('happy');
    setNote('');
    router.back();
  };

  const headerImage = selectedMood ? (
      <IconSymbol
        size={200}
        color={moodColors[selectedMood] ?? "#808080"}
        name={(moodOptions[selectedMood] ?? "face.smiling")}
        style={styles.headerImage}
      />
    ) : (
      <IconSymbol
        size={200}
        color="#F59E0B"
        name="sun.max.fill"         
        style={styles.headerImage}
      />
  );
  
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={headerImage}
    >
    <ThemedView style={styles.container}>
      <ThemedText type="title">Add Current Mood</ThemedText>
      <ThemedText style={styles.subtle}>Date: {new Date().toDateString()}</ThemedText>
      <View style={styles.row}>
        {(['happy','sad','angry','relaxed','stressed','tired','excited'] as Mood[]).map(m => {
          const active = selectedMood === m;
          return (
            <View key={m} style={[styles.pill, active && styles.pillActive]}>
              <ThemedText onPress={() => setSelectedMood(m)} style={[styles.pillText, active && styles.pillTextActive]}>
                {m}
              </ThemedText>
            </View>
          );
        })}
      </View>
      <ThemedText style={{ marginTop: 16, marginBottom: 8 }}>Add a note (optional)</ThemedText>
      <TextInput
        maxLength={50}
        style={styles.input}
        value={note}
        onChangeText={setNote}
        placeholder="How are you feeling today? (50 characters max)"
        multiline
      />
      <View style={{ marginTop: 20 }}>
        <Button title="Save Mood" onPress={save} />
      </View>
    </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    top: 50,
    left: "25%",
    position: "absolute",
  },
  container: { flex: 1, padding: 16, gap: 8 },
  subtle: { opacity: 0.7, marginBottom: 8 },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 8 },
  pill: {
    paddingVertical: 8, paddingHorizontal: 12, borderRadius: 999,
    borderWidth: StyleSheet.hairlineWidth, borderColor: 'rgba(0,0,0,0.15)', backgroundColor: '#fff',
  },
  pillActive: { borderColor: 'rgba(0, 0, 10, 0)', backgroundColor: 'rgba(0, 0, 225, 0.1)' },
  pillText: { fontSize: 14 },
  pillTextActive: { fontWeight: '600' },
  input: {
    borderWidth: StyleSheet.hairlineWidth, borderColor: 'rgba(0,0,0,0.2)',
    borderRadius: 10, padding: 12, minHeight: 80, backgroundColor: '#fff', textAlignVertical: 'top',
  },
});