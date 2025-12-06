import { Pressable, StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { Fonts } from '@/constants/theme';
import { Bookclub, User } from '@/src/context/types';

type Props = {
  bookclub: Bookclub;
  user: User | null;
  onJoin: (bookclubId: number) => void;
};

export function BookclubContainer({ bookclub, user, onJoin }: Props) {
  return (
    <View style={styles.box}>
      <Pressable
        onPress={() => {
          onJoin(bookclub.id);
        }}
      >
        <ThemedText type="subtitle" style={styles.boxText}>
          {bookclub.name}
        </ThemedText>
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
    backgroundColor: '#F9A85A',
    borderWidth: 2,
    borderColor: '#F57A2A',
    shadowColor: '#1B1F49',
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
    color: '#FDFCF7',
  },
});
