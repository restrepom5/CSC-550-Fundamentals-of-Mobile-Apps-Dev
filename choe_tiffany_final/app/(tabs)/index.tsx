import { Image } from 'expo-image';
import { Dimensions, Modal, Pressable, StyleSheet, View } from 'react-native';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { useApp } from '@/src/context/provider';
import { useCallback, useEffect, useState } from 'react';
import {
  getBookById,
  getBookClubList,
  getBooks,
  getCurrentBook,
} from '@/api/api';
import { BookclubContainer } from '@/components/bookclub-container';
import { BookContainer } from '@/components/book-container';
import { useFocusEffect, useRouter } from 'expo-router';
import { Fonts } from '@/constants/theme';
import { Bookclub, Books, GoogleBook } from '@/src/context/types';
import { books } from '@/mock-data/data';

const { width, height } = Dimensions.get('window');

export default function HomeScreen() {
  const [currentBookDetails, setCurrentBookDetails] = useState<
    GoogleBook | undefined
  >(undefined);
  const [currentBook, setCurrentBook] = useState<Books | null>(null);
  const [bookclubs, setBookclubs] = useState<Bookclub[]>([]);
  const [booksList, setBooks] = useState<Books[]>([]);
  const [visible, setVisible] = useState(false);
  const { user, updateUser } = useApp();

  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      try {
        if (!user?.bookclubId) {
          setCurrentBook(null);
          setCurrentBookDetails(undefined);
          setBooks([]);
          return;
        }

        const book = getCurrentBook(user.bookclubId);
        if (!book) {
          setCurrentBook(null);
          setCurrentBookDetails(undefined);
          setBooks(getBooks(user.bookclubId));
          return;
        }

        setCurrentBook(book);

        const fetchData = async () => {
          const data = await getBookById(book.googleId || '');
          setCurrentBookDetails(data);
        };

        fetchData();
        setBooks(getBooks(user.bookclubId));
      } catch (error) {
        console.error('Error fetching current book:', error);
      }
    }, [user?.bookclubId]),
  );

  useEffect(() => {
    setBookclubs(getBookClubList());
  }, []);

  const handleJoinBookclub = (bookclubId: number) => {
    if (!user) return;
    updateUser({ bookclubId });
  };

  const handleMarkFinished = (rating: number) => {
    if (!currentBook) return;
    const finishedBook: Books = {
      ...currentBook,
      finishedDate: new Date(),
      rating,
    };
    setCurrentBook(null);
    setCurrentBookDetails(undefined);
    setBooks((prev) => {
      const exists = prev.some((b) => b.id === finishedBook.id);
      if (exists) {
        return prev.map((b) => (b.id === finishedBook.id ? finishedBook : b));
      }
      return [...prev, finishedBook];
    });
    books.map((b) => {
      if (b.id === finishedBook.id) {
        b.finishedDate = finishedBook.finishedDate;
        b.rating = finishedBook.rating;
        b.readingStatus = 'finished';
      }
    });
  };

  const renderStars = () => {
    return (
      <View style={{ flexDirection: 'row' }}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Pressable
            key={star}
            onPress={() => {
              handleMarkFinished(star);
              setVisible(false);
            }}
          >
            <ThemedText style={styles.starText}>☆</ThemedText>
          </Pressable>
        ))}
      </View>
    );
  };

  return user?.bookclubId ? (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <View style={styles.headerContainer}>
          {currentBookDetails ? (
            <View style={styles.headerRow}>
              {currentBookDetails.thumbnail && (
                <Image
                  source={{ uri: currentBookDetails.smallThumbnail }}
                  style={styles.coverImage}
                />
              )}
              <View style={styles.headerTextContainer}>
                <ThemedText type="title" style={styles.bookTitle}>
                  {currentBookDetails.title}
                </ThemedText>
                <ThemedText type="subtitle" style={styles.bookAuthor}>
                  by {currentBookDetails.authors?.join(', ')}
                </ThemedText>
                <ThemedText type="subtitle" style={styles.bookAuthor}>
                  Read By:{' '}
                  {currentBook?.finishedDate
                    ? currentBook.finishedDate.toDateString()
                    : 'N/A'}
                </ThemedText>
                <Pressable
                  style={styles.finishedButton}
                  onPress={() => setVisible(true)}
                >
                  <ThemedText
                    type="subtitle"
                    style={[styles.bookAuthor, { color: '#1B1F49' }]}
                  >
                    Finished
                  </ThemedText>
                </Pressable>
                <Modal
                  visible={visible}
                  transparent
                  animationType="fade"
                  onRequestClose={() => setVisible(false)}
                >
                  <View style={styles.overlay}>
                    <View style={styles.modalBox}>
                      <ThemedText type="subtitle">Rate Book</ThemedText>
                      <View
                        style={{ alignItems: 'center', marginVertical: 12 }}
                      >
                        {renderStars()}
                      </View>
                      <Pressable onPress={() => setVisible(false)}>
                        <ThemedText style={{ marginTop: 10 }}>
                          Cancel
                        </ThemedText>
                      </Pressable>
                    </View>
                  </View>
                </Modal>
              </View>
            </View>
          ) : (
            <ThemedText type="title" style={styles.bookTitle}>
              {currentBook ? 'Loading...' : 'No Current Book Assigned'}
            </ThemedText>
          )}
        </View>
      }
    >
      <ThemedText type="title" style={styles.bookTitle}>
        Previous Books:
      </ThemedText>
      <View style={styles.list}>
        {booksList.map((item) => {
          return <BookContainer book={item} key={item.id} />;
        })}
      </View>
      <Pressable
        style={styles.button}
        onPress={() => {
          router.push('/search-books');
        }}
      >
        <ThemedText style={styles.buttonText}>Search Books</ThemedText>
      </Pressable>
    </ParallaxScrollView>
  ) : (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <View style={styles.headerContainer}>
          <ThemedText type="subtitle" style={styles.bookTitle}>
            Join a Book Club to get Started!
          </ThemedText>
        </View>
      }
    >
      <View style={styles.list}>
        {bookclubs.map((item) => {
          return (
            <BookclubContainer
              bookclub={item}
              key={item.id}
              user={user}
              onJoin={handleJoinBookclub}
            />
          );
        })}
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    minHeight: height * 0.3,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
    paddingBottom: 30,
  },
  coverImage: {
    width: 60,
    height: 90,
    borderRadius: 6,
  },
  bookTitle: {
    fontFamily: Fonts.rounded,
    fontWeight: 'bold',
    color: '#1B1F49',
    textAlign: 'center',
  },
  bookAuthor: {
    fontFamily: Fonts.rounded,
    fontSize: 16,
    color: '#255CBA',
    textAlign: 'center',
  },
  list: {
    paddingVertical: 4,
  },
  button: {
    marginTop: 24,
    alignSelf: 'center',
    width: width * 0.3,
    height: width * 0.12,
    backgroundColor: '#F57A2A',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#1B1F49',
  },
  buttonText: {
    fontFamily: Fonts.rounded,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  headerTextContainer: {
    flexShrink: 1,
  },
  finishedButton: {
    alignSelf: 'center',
    paddingVertical: 6,
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
  starText: {
    fontSize: 32,
    lineHeight: 36,
    marginHorizontal: 4,
  },
});
