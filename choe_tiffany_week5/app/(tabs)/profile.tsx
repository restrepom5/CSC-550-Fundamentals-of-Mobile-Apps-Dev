import {  StyleSheet } from 'react-native';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Fonts } from '@/constants/theme';
import { MyButton } from '@/components/my-button';
import { useRouter } from 'expo-router';

export default function Profile() {
  const router = useRouter();
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={200}
          color="#808080"
          name="person.circle.fill"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText
          type="title"
          style={{
            fontFamily: Fonts.rounded,
          }}>
          Profile
        </ThemedText>
      </ThemedView>
      <ThemedText>Name: Tiffany Choe</ThemedText>
      <MyButton
        buttonText="My Destinations"
        onLocationPress={() => {
          router.navigate('/');
        }}
      />
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
});
