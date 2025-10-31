import { View, Text, FlatList, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useAppSelector } from '../../../store';

export default function MoodListScreen() {
  const router = useRouter();
  const moods = useAppSelector((s) => s.mood);

  const today = new Date().toLocaleDateString(undefined, {
    weekday: 'long', year: 'numeric', month: 'short', day: 'numeric'
  });

  return (
    <View style={{ flex: 1, padding: 16, gap: 16 }}>
      <Text style={{ fontSize: 22, fontWeight: '600' }}>Mood Tracker</Text>
      <Text style={{ opacity: 0.7 }}>Today: {today}</Text>

      <Pressable
        onPress={() => router.push('/mood/add')}
        style={{ backgroundColor: '#111', padding: 14, borderRadius: 12, alignItems: 'center' }}
      >
        <Text style={{ color: '#fff', fontWeight: '600' }}>Add current mood</Text>
      </Pressable>

      <Text style={{ fontSize: 18, fontWeight: '600' }}>Previous moods</Text>

      <FlatList
        data={moods}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text style={{ opacity: 0.6 }}>No moods saved yet.</Text>}
        renderItem={({ item }) => (
          <View style={{ padding: 12, borderWidth: 1, borderColor: '#ddd', borderRadius: 10, marginBottom: 10 }}>
            <Text style={{ fontWeight: '700' }}>{item.mood}</Text>
            <Text style={{ opacity: 0.7 }}>{new Date(item.date).toLocaleString()}</Text>
            {item.note ? <Text style={{ marginTop: 4 }}>{item.note}</Text> : null}
          </View>
        )}
      />
    </View>
  );
}

