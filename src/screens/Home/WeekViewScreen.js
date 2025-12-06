// src/screens/Home/WeekViewScreen.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';
import DayCard from '../../components/DayCard';
import TravelDayCard from '../../components/TravelDayCard';

function buildDayPlans(config) {
  if (!config?.startDate || !config?.tripLength) return [];

  const [y, m, d] = config.startDate.split('-').map(Number);
  const start = new Date(y, m - 1, d);

  const days = [];

  for (let i = 0; i < config.tripLength; i++) {
    const dateForDay = new Date(start);
    dateForDay.setDate(start.getDate() + i);

    const iso =
      `${dateForDay.getFullYear()}-` +
      String(dateForDay.getMonth() + 1).padStart(2, '0') +
      '-' +
      String(dateForDay.getDate()).padStart(2, '0');

    const isArrival =
      i === 0 && (config.travelDay === 'arrival' || config.travelDay === 'both');
    const isDeparture =
      i === config.tripLength - 1 &&
      (config.travelDay === 'departure' || config.travelDay === 'both');

    days.push({
      id: iso,
      date: iso,
      travelType: isArrival ? 'arrival' : isDeparture ? 'departure' : null,
      parkId: null,
      attractions: [],
      notes: '',
    });
  }

  return days;
}

export default function WeekViewScreen({ route, navigation }) {
  const theme = useTheme();

  const existingTrip = route.params?.existingTrip || null;
  const configFromTripSetup = route.params?.config || null;
  const config = configFromTripSetup || existingTrip?.config || null;

  const [dayPlans, setDayPlans] = useState([]);


  useEffect(() => {
    if (existingTrip?.days && existingTrip.days.length > 0) {
      setDayPlans(existingTrip.days);
    } else if (config) {
      const built = buildDayPlans(config);
      setDayPlans(built);
    } else {
      setDayPlans([]);
    }
  }, [configFromTripSetup, existingTrip, config]);


  const onSaveTrip = async () => {
    if (!config) {
      Alert.alert('Missing trip info', 'Please go back and set up your trip again.');
      return;
    }

    try {
      const trip = {
        id: existingTrip?.id || Date.now().toString(),
        createdAt: existingTrip?.createdAt || new Date().toISOString(),
        config,
        days: dayPlans,
      };

      const existing = await AsyncStorage.getItem('pdo_saved_trips');
      const parsed = existing ? JSON.parse(existing) : [];

      let updated;
      if (existingTrip) {
        updated = parsed.map((t) => (t.id === existingTrip.id ? trip : t));
      } else {
        updated = [...parsed, trip];
      }

      await AsyncStorage.setItem('pdo_saved_trips', JSON.stringify(updated));
      Alert.alert('Trip saved', 'Your trip has been saved to My Trips.');
    } catch (err) {
      console.error('Error saving trip', err);
      Alert.alert('Error', 'We could not save this trip.');
    }
  };

  const renderDay = (item, index) => {
    const handlePress = () => {
      navigation.navigate('DayDetail', {
        day: item,
        index,
        config,
        onUpdateDay: (updatedDay) => {
          setDayPlans((prev) => {
            const next = [...prev];
            next[index] = { ...next[index], ...updatedDay };
            return next;
          });
        },
      });
    };

    if (item.travelType) {
      return <TravelDayCard key={item.id} day={item} onPress={handlePress} />;
    }

    return <DayCard key={item.id} day={item} onPress={handlePress} />;
  };

  if (!config) {
    return (
      <View
        style={[
          styles.screen,
          {
            backgroundColor: theme.colors.background,
            justifyContent: 'center',
            alignItems: 'center',
          },
        ]}
      >
        <Text style={{ color: theme.colors.text }}>
          We couldn’t load this trip. Please start over from Trip Setup.
        </Text>
      </View>
    );
  }

  return (
    <View
      style={[
        styles.screen,
        { backgroundColor: theme.colors.background },
      ]}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={[styles.title, { color: theme.colors.text }]}>
          Your Trip
        </Text>
        <Text
          style={[
            styles.subtitle,
            { color: theme.colors.text, opacity: 0.8 },
          ]}
        >
          Tap a day to assign a park and plan your must-do attractions.
        </Text>

        {dayPlans.map((item, index) => renderDay(item, index))}

        <Button
          mode="contained"
          style={styles.saveTripButton}
          onPress={onSaveTrip}
        >
          Save Your Trip
        </Button>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  container: { padding: 16, paddingBottom: 32 },
  title: { fontFamily: 'PoppinsSemiBold', fontSize: 22 },
  subtitle: { fontFamily: 'PoppinsRegular', marginBottom: 8 },
  saveTripButton: { marginTop: 12 },
});
