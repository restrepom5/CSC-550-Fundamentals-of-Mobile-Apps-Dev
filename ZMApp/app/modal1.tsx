import { useRouter } from 'expo-router';
import { StyleSheet, Image, Pressable } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function ModalScreen() {
  const router = useRouter()
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Poolside Suite</ThemedText>
      <Image
        source={require('@/assets/images/firstPlace.png')}
        style={styles.image}
      ></Image>
      <ThemedText type="title" style={styles.text}>Room in Orlando, Florida</ThemedText>
      <ThemedText type="subtitle" style={styles.text}>One bedroom, private attached bathroom</ThemedText>
      <Pressable onPress={()=> router.back()}>
        <ThemedText type="link">Go back</ThemedText>
      </Pressable>
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
