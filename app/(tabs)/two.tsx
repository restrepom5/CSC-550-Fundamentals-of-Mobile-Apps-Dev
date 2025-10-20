import { StyleSheet, Button } from 'react-native';
import { useRouter } from 'expo-router';
import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';

// Dynamic Routing

function randomIndex(): number{
    const randIndex = Math.floor(Math.random() * (7 + 1)) + 0;
    console.log(randIndex)
    return randIndex;
}

export default function TabTwoScreen() {
    const router = useRouter();
    
    const handleRandomDestination = () => {
        const index = randomIndex();
        router.push({ pathname: "/trips/[id]", params: { id: index.toString() } });
      };
    
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Travel Buddy</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
          <Button title="Plan a new trip!" onPress={handleRandomDestination}></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
