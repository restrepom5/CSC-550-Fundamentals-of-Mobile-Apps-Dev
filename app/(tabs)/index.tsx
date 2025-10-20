import { Image, StyleSheet, Dimensions, ScrollView } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';


export default function HomeScreen() {
  return (
    <>
    <ScrollView>
    <View style={styles.container}>
      <Text style={styles.title}>Travel Buddy</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
    </View>
          
    <View style={styles.imageGrid}>
        <Image
            source={{ uri: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34" }}
                  style={styles.image}
        />
        <Image
            source={{ uri: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e" }}
                  style={styles.image}
        />
        <Image
            source={{ uri: "https://images.unsplash.com/photo-1588963940468-9e6e4d202209?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dHJhdmVsJTIwa2Vycnl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=900" }}
                  style={styles.image}
        />
        <Image
            source={{ uri: "https://images.unsplash.com/photo-1506744038136-46273834b3fb" }}
                  style={styles.image}
        />
    </View>
    <View style={styles.subcontainer}>
          <Text style={styles.text}>Looking to plan a trip? Let us generate some trip plans for you! Head over to the "New Trip" tab to get started.</Text>
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
