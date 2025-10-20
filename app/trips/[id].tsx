import { Image, StyleSheet, Dimensions, ScrollView, Button } from 'react-native';
import { useEffect } from 'react';
import { useRouter, useLocalSearchParams, useNavigation } from "expo-router";
import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import userData from '@/assets/data/userData.json';
import destinations from '@/assets/data/destinations.json';


export default function HomeScreen() {
  const router = useRouter();
    const { id } = useLocalSearchParams();
    const idx = parseInt(id ,10);
    const trip = destinations[idx];
    const navigation = useNavigation();
    
    useEffect(() => {
        if (trip) {
            navigation.setOptions({ title: trip.name,
                                headerBackTitle: "New Trip",
            });
          
        }
      }, [trip]);
  return (
    <>
    <ScrollView>
    <View style={styles.container}>
      <Text style={styles.title}>Travel Buddy</Text>
      <Image
          source={{ uri:  destinations[idx].image}}
                style={styles.image}
            />
          <Text style={styles.title}>{destinations[idx].name}</Text>
          <Text style={styles.text}>{destinations[idx].description}</Text>
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
      width: "75%",
      height: 300,
      borderRadius: 10,
      marginBottom: 10,
    },
});

