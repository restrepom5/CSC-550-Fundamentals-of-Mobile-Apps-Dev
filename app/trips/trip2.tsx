import { Image, StyleSheet, Dimensions, ScrollView, Button } from 'react-native';

import { useRouter } from "expo-router";
import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import userData from '@/assets/data/userData.json';


export default function HomeScreen() {
  const router = useRouter();
  return (
    <>
    <ScrollView>
    <View style={styles.container}>
      <Text style={styles.title}>Travel Buddy</Text>
      <Image
          source={{ uri:  userData[1].image}}
                style={styles.image}
            />
          <Text style={styles.title}>My Trip to {userData[1].destination}</Text>
          <Text style={styles.text}>{userData[1].date}</Text>
          <Text style={styles.text}>My favorite places were {userData[1].favorite}</Text>
          <Button title="Go back"
            onPress = {() => router.back()}> </Button>
    </View>
    </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'top',
    padding: 20
      },
    subcontainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'top',
        padding: 20
    },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
    text: {
      fontSize: 15,
        paddingTop: 10
    },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
    imageGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      padding: 10,
    },
    image: {
      width: "48%",
      height: 150,
      borderRadius: 10,
      marginBottom: 10,
    },
});
