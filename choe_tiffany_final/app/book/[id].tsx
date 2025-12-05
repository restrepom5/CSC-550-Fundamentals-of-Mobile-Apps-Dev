import { getBookById } from '@/api/api';
import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Fonts } from '@/constants/theme';
import { books } from '@/mock-data/data';
import { GoogleBook, Books } from '@/src/context/types';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {
  View,
  Image,
  Pressable,
  StyleSheet,
  Dimensions,
  ScrollView,
  Modal,
} from 'react-native';
import RenderHtml from 'react-native-render-html';
import DatePicker from '../date-picker';

const { width } = Dimensions.get('window');

function stripHtml(html: string = '') {
  return html.replace(/<[^>]*>/g, '');
}

export default function Book() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [book, setBook] = useState<GoogleBook | null>(null);
  const readBook = useRef<Books | null>(null);
  const [showMore, setShowMore] = useState(false);
  const [visible, setVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getBookById(id);
      readBook.current = books.find((b) => b.googleId === id) || null;

      setBook(data);
    };

    fetchData();
  }, [id]);

  const handleStartReading = () => {
    if (books.find((b) => b.readingStatus === 'reading')) {
      alert(
        'You are already reading a book. Please finish it before starting a new one.',
      );
      return;
    }
    setVisible(true);
  };

  const plainText = stripHtml(book?.description || 'No description available.');

  return book ? (
    <ScrollView>
      <View style={styles.container}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <IconSymbol name="chevron.backward" size={28} color="#1B1F49" />
        </Pressable>
        <View style={styles.topRow}>
          <Image source={{ uri: book.thumbnail }} style={styles.coverImage} />
          <View style={styles.infoColumn}>
            <ThemedText type="title" style={styles.title}>
              {book.title}
            </ThemedText>

            <ThemedText type="subtitle" style={styles.author}>
              {book.authors?.join(', ') || 'Unknown author'}
            </ThemedText>
            {readBook.current?.rating && (
              <View style={styles.ratingRow}>
                {Array.from({ length: readBook.current.rating }).map((_, i) => (
                  <ThemedText key={i} style={styles.star}>
                    ⭐
                  </ThemedText>
                ))}
              </View>
            )}
            {!books.some((b) => b.googleId === id) && (
              <Pressable onPress={handleStartReading}>
                <ThemedText style={styles.author}>Start Reading</ThemedText>
              </Pressable>
            )}
          </View>
        </View>
        {showMore ? (
          <RenderHtml
            contentWidth={width}
            baseStyle={styles.description}
            source={{ html: book?.description || 'No description available.' }}
          />
        ) : (
          <ThemedText style={styles.description}>
            {plainText.slice(0, 250)}...
          </ThemedText>
        )}
        {plainText.length > 250 && (
          <Pressable
            onPress={() => setShowMore((prev) => !prev)}
            style={styles.showMoreButton}
          >
            <ThemedText style={styles.showMoreText}>
              {showMore ? 'Show less' : 'Show more'}
            </ThemedText>
          </Pressable>
        )}
        <Modal
          visible={visible}
          transparent
          animationType="fade"
          onRequestClose={() => setVisible(false)}
        >
          <View style={styles.overlay}>
            <View style={styles.modalBox}>
              <ThemedText type="subtitle">Select Finish Date</ThemedText>
              <View style={{ alignItems: 'center', marginVertical: 12 }}>
                <DatePicker book={book} setVisible={setVisible} />
              </View>
              <Pressable onPress={() => setVisible(false)}>
                <ThemedText style={{ marginTop: 10 }}>Cancel</ThemedText>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  ) : (
    <ThemedText>Loading...</ThemedText>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 10,
    padding: 8,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 80,
    gap: 16,
  },
  coverImage: {
    width: 100,
    height: 150,
    borderRadius: 8,
  },
  infoColumn: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  title: {
    fontFamily: Fonts.rounded,
    fontWeight: 'bold',
    fontSize: 20,
    color: '#1B1F49',
    marginBottom: 4,
  },
  author: {
    fontFamily: Fonts.rounded,
    fontSize: 16,
    color: '#255CBA',
    marginBottom: 8,
  },
  ratingRow: {
    flexDirection: 'row',
    marginTop: 4,
  },
  star: {
    fontSize: 20,
    marginRight: 4,
  },
  description: {
    fontFamily: Fonts.rounded,
    marginTop: 25,
    fontSize: 16,
    lineHeight: 22,
    color: '#333',
  },
  showMoreButton: {
    marginTop: 6,
    alignSelf: 'flex-start',
    paddingVertical: 4,
  },
  showMoreText: {
    fontFamily: Fonts.rounded,
    fontSize: 14,
    fontWeight: '600',
    color: '#255CBA',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalBox: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 5,
  },
});
