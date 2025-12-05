import { StyleSheet } from 'react-native';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Fonts } from '@/constants/theme';
import { useApp } from '@/src/context/provider';
import { bookclubs } from '@/mock-data/data';

export default function Profile() {
  const { user } = useApp();
  const bookclub = bookclubs.find((bc) => bc.id === user?.bookclubId);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        // TODO pressable to open camera or photo library
        <IconSymbol
          size={200}
          color="#1B1F49"
          name="camera.circle.fill"
          style={styles.headerImage}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText
          type="title"
          style={{
            fontFamily: Fonts.rounded,
          }}
        >
          Profile
        </ThemedText>
      </ThemedView>
      <ThemedText style={styles.textStyle}>Name: {user?.name}</ThemedText>
      <ThemedText style={styles.textStyle}>
        Username: {user?.username}
      </ThemedText>
      <ThemedText style={styles.textStyle}>
        Book Club: {bookclub?.name || 'No bookclub assigned'}
      </ThemedText>
      {/* TODO Logout button */}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    top: 50,
    left: '25%',
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  textStyle: {
    fontFamily: Fonts.rounded,
    fontSize: 16,
    marginBottom: 8,
    color: '#1B1F49',
  },
});
