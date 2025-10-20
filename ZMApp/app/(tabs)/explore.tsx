import { Image } from 'expo-image';
import { Platform, StyleSheet, Pressable } from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Fonts } from '@/constants/theme';
import { Link, useRouter } from 'expo-router';

export default function ExploreScreen() {
  const router= useRouter()
  
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <Image
          source={require('@/assets/images/explore.png')}
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText
          type="title"
          style={{
            fontFamily: Fonts.rounded,
          }}>
          Explore
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.row1}>
        <Pressable onPress={() => router.push('/modal1')}>
          <Image
            source={require('@/assets/images/firstPlace.png')}
            style={styles.image}
          ></Image>
        </Pressable>
        <Link href="/modal2">
          <Link.Trigger>
            <Image
              source={require('@/assets/images/secondPlace.png')}
              style={styles.image}
            ></Image>
          </Link.Trigger>
        </Link>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    height:'100%',
    width:'100%'
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  image:{
    width:150,
    height:150,
  },
  row1: {
    flexDirection: 'row',
    gap: 45,
  },
});
