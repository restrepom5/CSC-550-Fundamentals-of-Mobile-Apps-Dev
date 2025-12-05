import { Pressable, StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { Fonts } from '@/constants/theme';
import { useRouter } from 'expo-router';
import { Books } from '@/src/context/types';

type Props = {
  book: Books;
};

export function BookContainer({ book }: Props) {
  const router = useRouter();
  return (
    <View style={styles.box}>
      <Pressable
        onPress={() =>
          router.push({
            pathname: '/book/[id]',
            params: { id: book.googleId },
          })
        }
      >
        <ThemedText type="subtitle" style={styles.boxText}>
          {book.title}
        </ThemedText>
        <ThemedText type="subtitle" style={styles.boxText2}>
          {book.finishedDate?.toDateString()}
        </ThemedText>
        <View style={styles.starRow}>
          {Array.from({ length: book.rating || 0 }).map((_, i) => (
            <ThemedText key={i} style={styles.star}>
              ⭐
            </ThemedText>
          ))}
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    marginVertical: 6,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: '#fff',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(0,0,0,0.12)',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxPressed: {
    opacity: 0.95,
    transform: [{ scale: 0.99 }],
  },
  boxText: {
    textAlign: 'center',
    fontFamily: Fonts.rounded,
    color: '#1B1F49',
  },
  boxText2: {
    textAlign: 'center',
    fontFamily: Fonts.rounded,
    color: '#255CBA',
  },
  starRow: {
    flexDirection: 'row',
    marginTop: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  star: {
    fontSize: 18,
    marginRight: 2,
  },
});
