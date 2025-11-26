// app/library.tsx

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TextInput,
  Pressable,
  Alert,
} from 'react-native';
import axios from 'axios';
import * as Haptics from 'expo-haptics';
import * as FileSystem from 'expo-file-system/legacy'; // ✅ use legacy API
import AsyncStorage from '@react-native-async-storage/async-storage';

type Track = {
  id: number;
  title: string;
  body: string;
  category: 'Hype' | 'Transition';
};

type CategoryFilter = 'All' | 'Hype' | 'Transition';

const FAV_KEY = 'djnedu_favorites';

export default function LibraryScreen() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [category, setCategory] = useState<CategoryFilter>('All');
  const [favorites, setFavorites] = useState<number[]>([]);
  const [search, setSearch] = useState('');
  const [downloadingId, setDownloadingId] = useState<number | null>(null);

  // Load data + favorites
  useEffect(() => {
    const init = async () => {
      try {
        setLoading(true);
        setError(null);

        // Simple demo API – treat as remote "sample list"
        const response = await axios.get(
          'https://jsonplaceholder.typicode.com/posts?_limit=12'
        );

        const data: Track[] = response.data.map((item: any, index: number) => ({
          id: item.id,
          title: item.title,
          body: item.body,
          // alternate categories just for demo UI
          category: index % 2 === 0 ? 'Hype' : 'Transition',
        }));

        setTracks(data);

        // load favorites from storage
        const stored = await AsyncStorage.getItem(FAV_KEY);
        if (stored) {
          setFavorites(JSON.parse(stored));
        }
      } catch (err) {
        console.error('Library fetch error', err);
        setError('Could not load sample list. Check your network.');
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  const toggleCategory = (value: CategoryFilter) => {
    setCategory(value);
    Haptics.selectionAsync();
  };

  const isFavorite = (id: number) => favorites.includes(id);

  const toggleFavorite = async (trackId: number) => {
    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      setFavorites((prev) => {
        const exists = prev.includes(trackId);
        const updated = exists ? prev.filter((id) => id !== trackId) : [...prev, trackId];
        AsyncStorage.setItem(FAV_KEY, JSON.stringify(updated));
        return updated;
      });
    } catch (err) {
      console.error('Favorite toggle error', err);
    }
  };

  const handleDownload = async (track: Track) => {
    try {
      setDownloadingId(track.id);
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

      // We create a simple text file for the sample – this proves FileSystem use
      const fileName = `sample-${track.id}.txt`;
      const fileUri = FileSystem.documentDirectory + fileName;

      await FileSystem.writeAsStringAsync(
        fileUri,
        `Sample: ${track.title}\nCategory: ${track.category}\n\nDescription:\n${track.body}`,
        { encoding: FileSystem.EncodingType.UTF8 }
      );

      console.log('Saved to:', fileUri);
      Alert.alert('Download complete', `Saved as ${fileName} in app storage.`);
    } catch (err) {
      console.error('Download error', err);
      Alert.alert('Download failed', 'Please try again.');
    } finally {
      setDownloadingId(null);
    }
  };

  // Filter tracks by category + search text
  const filteredTracks = tracks.filter((track) => {
    const matchesCategory =
      category === 'All' ? true : track.category === category;

    const query = search.trim().toLowerCase();
    const matchesSearch =
      query.length === 0 ||
      track.title.toLowerCase().includes(query) ||
      track.body.toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  });

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#00ffcc" />
        <Text style={styles.loadingText}>Loading sample library…</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <Text style={styles.title}>Sound Library (from API)</Text>
      <Text style={styles.subtitle}>
        This list is fetched over the network with Axios. Tap a card to stream it,
        or download for offline use.
      </Text>

      {/* Search bar – controlled component */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search samples..."
        placeholderTextColor="#777"
        value={search}
        onChangeText={setSearch}
      />

      {/* Category filters */}
      <View style={styles.chipRow}>
        {(['All', 'Hype', 'Transition'] as CategoryFilter[]).map((cat) => {
          const active = category === cat;
          return (
            <Pressable
              key={cat}
              onPress={() => toggleCategory(cat)}
              style={[
                styles.chip,
                active && styles.chipActive,
              ]}
            >
              <Text style={[styles.chipText, active && styles.chipTextActive]}>
                {cat}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {/* Cards */}
      {filteredTracks.map((track, index) => {
        const favorite = isFavorite(track.id);
        const isDownloading = downloadingId === track.id;

        return (
          <View key={track.id} style={styles.card}>
            <Text style={styles.cardTitle}>{`Sample #${index + 1}`}</Text>
            <Text style={styles.cardMeta}>
              Category: {track.category} • {track.id}
            </Text>
            <Text numberOfLines={4} style={styles.cardBody}>
              {track.body}
            </Text>

            <View style={styles.cardButtons}>
              <Pressable
                onPress={() => toggleFavorite(track.id)}
                style={[
                  styles.button,
                  favorite && styles.buttonSecondaryActive,
                ]}
              >
                <Text
                  style={[
                    styles.buttonText,
                    favorite && styles.buttonTextSecondaryActive,
                  ]}
                >
                  {favorite ? '★ Faved' : '☆ Fav'}
                </Text>
              </Pressable>

              <Pressable
                onPress={() => handleDownload(track)}
                style={[
                  styles.button,
                  styles.buttonPrimary,
                  isDownloading && styles.buttonDisabled,
                ]}
                disabled={isDownloading}
              >
                <Text style={styles.buttonText}>
                  {isDownloading ? 'Downloading…' : 'Download'}
                </Text>
              </Pressable>
            </View>
          </View>
        );
      })}

      {filteredTracks.length === 0 && (
        <View style={styles.center}>
          <Text style={styles.emptyText}>No samples match your search.</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  center: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#4BFFD2',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#aaa',
    marginBottom: 16,
  },
  loadingText: {
    marginTop: 12,
    color: '#ccc',
  },
  errorText: {
    color: '#ff6b6b',
    fontSize: 16,
    textAlign: 'center',
  },
  searchInput: {
    backgroundColor: '#111',
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 10,
    color: '#fff',
    borderWidth: 1,
    borderColor: '#222',
    marginBottom: 12,
  },
  chipRow: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 10,
  },
  chip: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#333',
    backgroundColor: '#000',
  },
  chipActive: {
    backgroundColor: '#00ffcc',
    borderColor: '#00ffcc',
  },
  chipText: {
    color: '#ccc',
    fontWeight: '600',
  },
  chipTextActive: {
    color: '#000',
  },
  card: {
    backgroundColor: '#101010',
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#1f1f1f',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 4,
  },
  cardMeta: {
    fontSize: 13,
    color: '#888',
    marginBottom: 8,
  },
  cardBody: {
    fontSize: 14,
    color: '#ddd',
    marginBottom: 14,
  },
  cardButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#111',
    borderWidth: 1,
    borderColor: '#00ffcc',
  },
  buttonPrimary: {
    backgroundColor: '#00ffcc',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    fontWeight: '700',
    color: '#000',
  },
  buttonSecondaryActive: {
    backgroundColor: '#111',
    borderColor: '#FFD54F',
  },
  buttonTextSecondaryActive: {
    color: '#FFD54F',
  },
  emptyText: {
    color: '#777',
    marginTop: 20,
  },
});

