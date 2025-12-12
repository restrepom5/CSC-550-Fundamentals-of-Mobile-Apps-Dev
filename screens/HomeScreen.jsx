// screens/HomeScreen.jsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';

export default function HomeScreen({ navigation }) {
  const [tip, setTip] = useState(null);
  const [loadingTip, setLoadingTip] = useState(false);

  // Network call with Axios (custom JSON on GitHub)
  useEffect(() => {
    const fetchTravelTip = async () => {
      try {
        setLoadingTip(true);

        const response = await axios.get(
          'https://raw.githubusercontent.com/restrepom5/CSC-550-Fundamentals-of-Mobile-Apps-Dev/refs/heads/kobra_khadijatul_final/travelTip.json'
        );

        setTip(response.data.tip);
      } catch (error) {
        console.log('Error fetching custom travel tip:', error);
        setTip('Could not load travel tip.');
      } finally {
        setLoadingTip(false);
      }
    };

    fetchTravelTip();
  }, []);

  return (
    <LinearGradient
      colors={['#0b7fab', '#4cd4b0']}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.headerBox}>
          <Text style={styles.title}>Welcome to Travel Planner</Text>
          <Text style={styles.subtitle}>
            Plan trips, save ideas, and track your adventures.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>🌍 Travel Tip</Text>
          {loadingTip ? (
            <ActivityIndicator color="#0b7fab" />
          ) : (
            <Text style={styles.cardText}>{tip}</Text>
          )}
        </View>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.navigate('AddTrip')}
        >
          <Text style={styles.primaryButtonText}>ADD A NEW TRIP</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => navigation.navigate('Trips')}
        >
          <Text style={styles.secondaryButtonText}>VIEW ALL TRIPS</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  headerBox: {
    marginTop: 24,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 15,
    color: '#e6f7ff',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 14,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowRadius: 6,
    elevation: 4,
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#033649',
    marginBottom: 8,
  },
  cardText: {
    fontSize: 14,
    color: '#033649',
  },
  primaryButton: {
    backgroundColor: '#0b7fab',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 10,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  secondaryButton: {
    backgroundColor: '#ffffff',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ffffff',
    opacity: 0.95,
  },
  secondaryButtonText: {
    color: '#0b7fab',
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
});
