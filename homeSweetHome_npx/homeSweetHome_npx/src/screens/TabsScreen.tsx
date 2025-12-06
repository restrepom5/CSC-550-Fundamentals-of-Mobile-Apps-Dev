import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Linking } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import { fetchShelters } from '../api/shelters';
import MapView, { Marker } from 'react-native-maps';
import { RootStackParamList, Shelter } from '../types';
import { Button } from 'react-native-paper';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<RootStackParamList>();

// renders HomeScreen
function PetsTab() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
}

// SheltersTab fetches shelters from the server and displays them on a map
function SheltersTab() {
  const [shelters, setShelters] = useState<Shelter[]>([]);

  useEffect(() => {
    const loadShelters = async () => {
      const data = await fetchShelters();
      setShelters(data);
    };
    loadShelters();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 40.7128,
          longitude: -74.0060,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        {shelters.map((shelter) => (
          <Marker
            key={shelter.id}
            coordinate={{
              latitude: shelter.latitude || 0,
              longitude: shelter.longitude || 0,
            }}
            title={shelter.name}
          />
        ))}
      </MapView>
    </View>
  );
}

// thank-you message
function InquiresTab() {
  return (
    <View style={styles.centered}>
      <Text style={styles.inquiryText}>
        Thank you for your Love and Care. Our team appreciates your request and we will reach out soon!
      </Text>
    </View>
  );
}

// Main TabsScreen
export default function TabsScreen() {
  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator>
        <Tab.Screen name="Pets" component={PetsTab} />
        <Tab.Screen name="Shelters" component={SheltersTab} />
        <Tab.Screen name="Inquires" component={InquiresTab} />
      </Tab.Navigator>

      <View style={{ padding: 25 }}>
        <Button
          mode="outlined"
          buttonColor="purple"
          onPress={() => Linking.openURL('https://www.google.com')}
        >
          <Text style={{ color: 'white', fontSize: 16 }}>
            Want to learn more about us?
          </Text>
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
  inquiryText: {
    textAlign: 'center',
    marginBottom: 12,
    color: 'black',
    fontSize: 25,
  },
});
