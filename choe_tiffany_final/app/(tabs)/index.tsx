import { Image } from 'expo-image';
import { Dimensions, Pressable, StyleSheet, View } from 'react-native';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { Bookclub, Books, GoogleBook, useApp } from '@/src/context/provider';
import { useEffect, useRef, useState } from 'react';
import {
  getBookById,
  getBookClubList,
  getBooks,
  getCurrentBook,
} from '@/api/api';
import { BookclubContainer } from '@/components/bookclub-container';
import { BookContainer } from '@/components/book-container';
import { useRouter } from 'expo-router';
import { Fonts } from '@/constants/theme';
import { IconSymbol } from '@/components/ui/icon-symbol';

const { width, height } = Dimensions.get('window');

export default function HomeScreen() {
  const [currentBookDetails, setCurrentBookDetails] = useState<
    GoogleBook | undefined
  >(undefined);
  const currentBook = useRef<Books | null>(null);
  const [bookclubs, setBookclubs] = useState<Bookclub[]>([]);
  const [books, setBooks] = useState<Books[]>([]);
  const { user, updateUser } = useApp();

  const router = useRouter();

  useEffect(() => {
    try {
      if (!user?.bookclubId) {
        return;
      }
      const book = getCurrentBook(user.bookclubId);
      if (!book) {
        return;
      }
      currentBook.current = book;
      const fetchData = async () => {
        const data = await getBookById(book?.googleId || '');
        setCurrentBookDetails(data);
      };
      fetchData();
      setBooks(getBooks(user.bookclubId));
    } catch (error) {
      console.error('Error fetching current book:', error);
    }
  }, [user?.bookclubId]);

  useEffect(() => {
    setBookclubs(getBookClubList());
  }, []);

  const handleJoinBookclub = (bookclubId: number) => {
    if (!user) return;
    updateUser({ bookclubId });
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
                  {currentBook.current?.finishedDate
                    ? currentBook.current.finishedDate.toDateString()
                    : 'N/A'}
                </ThemedText>
                {/* Finished button */}
              </View>
            </View>
          ) : (
            <ThemedText type="title" style={styles.bookTitle}>
              Loading...
            </ThemedText>
          )}
          <Pressable style={styles.giftIcon}>
            <IconSymbol name="gift" size={32} color="#F57A2A" />
            {/*TODO if have time do bookclub wrapped page with animations*/}
          </Pressable>
        </View>
      }
    >
      <ThemedText type="title" style={styles.bookTitle}>
        Previous Books:
      </ThemedText>
      <View style={styles.list}>
        {books.map((item) => {
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
  giftIcon: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    padding: 6,
  },
});
