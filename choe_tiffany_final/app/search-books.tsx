import { useState } from 'react';
import {
  View,
  TextInput,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { searchGoogleBooks } from '@/api/api';
import { ThemedText } from '@/components/themed-text';
import { GoogleBook } from '@/src/context/provider';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useRouter } from 'expo-router';
import { Fonts } from '@/constants/theme';

export default function SearchBooks() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<GoogleBook[]>([]);

  const router = useRouter();

  const handleSearch = async (text: string) => {
    setQuery(text);
    const books = await searchGoogleBooks(text);
    setResults(books);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Pressable onPress={() => router.back()} style={styles.backButton}>
        <IconSymbol name="chevron.backward" size={28} color="#1B1F49" />
      </Pressable>
      <TextInput
        value={query}
        onChangeText={handleSearch}
        placeholder="Search books..."
        style={styles.input}
      />

      <View style={styles.results}>
        {results.map((item) => {
          return (
            <Pressable
              key={item.id}
              style={styles.resultRow}
              onPress={() =>
                router.push({
                  pathname: '/book/[id]',
                  params: { id: item.id },
                })
              }
            >
              {item.thumbnail ? (
                <Image source={{ uri: item.thumbnail }} style={styles.thumb} />
              ) : (
                <IconSymbol
                  name="nosign"
                  size={40}
                  color="#1B1F49"
                  style={styles.thumbFallback}
                />
              )}

              <View style={styles.resultText}>
                <ThemedText style={styles.titleText}>{item.title}</ThemedText>
                <ThemedText>{item.authors?.join(', ')}</ThemedText>
              </View>
            </Pressable>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 100,
    paddingBottom: 40,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    borderColor: '#255CBA',
    backgroundColor: '#FDFCF7',
    fontFamily: Fonts.rounded,
  },
  button: {
    marginTop: 16,
    backgroundColor: '#F57A2A',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: Fonts.rounded,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  results: {
    marginTop: 24,
  },
  resultRow: {
    flexDirection: 'row',
    marginTop: 16,
    alignItems: 'center',
  },
  thumb: {
    width: 60,
    height: 90,
    borderRadius: 6,
  },
  resultText: {
    fontFamily: Fonts.rounded,
    marginLeft: 12,
    flexShrink: 1,
  },
  titleText: {
    fontWeight: 'bold',
    marginBottom: 2,
  },
  thumbFallback: {
    width: 60,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EEE',
    borderRadius: 6,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 10,
    padding: 8,
  },
});
