import { Image, StyleSheet, ScrollView, Button } from 'react-native';

import { Text, View } from '@/components/Themed';
import { useLocalSearchParams, useRouter } from "expo-router";
import userData from "@/assets/data/userData.json";



export default function ProfileScreen() {
  const router = useRouter();
    
  return (
    <>
    <ScrollView>
    <View style={styles.container}>
      <Text style={styles.title}>Happy Travels!</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
          
          <Image
          source={require("../../assets/images/travelphoto.avif")}
                  style={{ width: 300, height: 300, borderRadius: 10 }}
                  resizeMode="cover"
            />
          <Text style={styles.subtitle}>My Trips</Text>
          
          <View>
                    <Text style = {styles.subtitle}>{userData[0].destination}</Text>
                    <Text style = {styles.text}>{userData[0].date}</Text>
                    <Text style = {styles.text}>{userData[0].favorite}</Text>
                    <Button title="Trip Recap"
          onPress = {() => router.push("/trips/trip1")}> </Button>
                    
                    <Text style = {styles.subtitle}>{userData[1].destination}</Text>
                    <Text style = {styles.text}>{userData[1].date}</Text>
                    <Text style = {styles.text}>{userData[1].favorite}</Text>
                    <Button title="Trip Recap"
          onPress = {() => router.push("/trips/trip2")}> </Button>
                    
                    <Text style = {styles.subtitle}>{userData[2].destination}</Text>
                    <Text style = {styles.text}>{userData[2].date}</Text>
                    <Text style = {styles.text}>{userData[2].favorite}</Text>
                    <Button title="Trip Recap"
        onPress = {() => router.push("/trips/trip3")}> </Button>
          
          </View>
        </View>
    </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
    button: {
        alignItems: "left"
    },
    subtitle: {
        fontSize: 20,
        paddingTop: 10
    },
    text: {
        fontSize: 12
    },
    subcontainer: {
        paddingBottom: 30
    },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});

