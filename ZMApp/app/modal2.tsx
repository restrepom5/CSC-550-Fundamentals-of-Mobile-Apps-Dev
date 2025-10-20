import { Link } from 'expo-router';
import { StyleSheet, Image } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function ModalScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">3BR Condo w/ Game Room, Themed Rooms, Top Location</ThemedText>
      <Image
        source={require('@/assets/images/secondPlace.png')}
        style={styles.image}
      ></Image>
      <ThemedText type="title" style={styles.text}>Entire condo in Orlando, Florida</ThemedText>
      <ThemedText type="subtitle" style={styles.text}>Three bedrooms, six beds, two baths</ThemedText>
      <Link href="/explore" dismissTo style={styles.link}>
        <ThemedText type="link">Go back</ThemedText>
      </Link>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  image:{
    width:300,
    height:300,
    marginTop:20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  text:{
    marginTop: 10,
    alignSelf: 'flex-start',
  },
});