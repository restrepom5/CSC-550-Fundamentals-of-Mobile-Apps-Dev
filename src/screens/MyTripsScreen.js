// src/screens/MyTripsScreen.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { Alert, FlatList, StyleSheet, View } from 'react-native';
import { IconButton, List, Text, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MyTripsScreen({ navigation }) {
  const [trips, setTrips] = useState([]);
  const theme = useTheme();

  useEffect(() => {
    const loadTrips = async () => {
      const stored = await AsyncStorage.getItem('pdo_saved_trips');
      setTrips(stored ? JSON.parse(stored) : []);
    };

    const unsubscribe = navigation.addListener('focus', loadTrips);
    return unsubscribe;
  }, [navigation]);

  const handleDeleteTrip = (tripId) => {
    Alert.alert(
      'Delete this trip?',
      'This cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            const updated = trips.filter((t) => t.id !== tripId);
            setTrips(updated);
            await AsyncStorage.setItem('pdo_saved_trips', JSON.stringify(updated));
          },
        },
      ],
    );
  };

  const handleEditDates = (trip) => {
    navigation.navigate('HomeTab', {
      screen: 'TripSetup',
      params: { existingTrip: trip },
    });
  };

  const handleEditPlan = (trip) => {
    navigation.navigate('HomeTab', {
      screen: 'WeekView',
      params: { existingTrip: trip },
    });
  };

  const handleSnapshot = (trip) => {
    navigation.navigate('HomeTab', {
      screen: 'TripSnapshot',
      params: { trip },
    });
  };

  const renderTrip = ({ item: trip }) => {
    const ended = isTripEnded(trip);

    return (
      <View style={styles.tripBlock}>
        <List.Item
          style={[
            styles.tripItem,
            { backgroundColor: theme.colors.surface },
          ]}
          title={formatTripTitle(trip)}
          description={formatTripDescription(trip)}
          titleNumberOfLines={2}
          descriptionNumberOfLines={3}
          titleStyle={[styles.tripTitle, { color: theme.colors.text }]}
          descriptionStyle={[
            styles.tripDescription,
            { color: theme.colors.text, opacity: 0.8 },
          ]}
          left={(props) => (
            <List.Icon
              {...props}
              icon={ended ? 'calendar-remove' : 'calendar'}
            />
          )}
          onPress={() => handleEditPlan(trip)}
          right={(props) => (
            <View style={styles.actionsRow}>
              <IconButton
                {...props}
                icon="image-multiple"
                onPress={() => handleSnapshot(trip)}
                style={styles.iconButton}
              />
              <IconButton
                {...props}
                icon="calendar-edit"
                onPress={() => handleEditDates(trip)}
                style={styles.iconButton}
              />
              <IconButton
                {...props}
                icon="note-edit-outline"
                onPress={() => handleEditPlan(trip)}
                style={styles.iconButton}
              />
              <IconButton
                {...props}
                icon="delete"
                onPress={() => handleDeleteTrip(trip.id)}
                style={styles.iconButton}
              />
            </View>
          )}
        />

        {ended && (
          <View style={styles.endedBadge}>
            <Text style={styles.endedBadgeText}>Ended</Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: theme.colors.background }]}
      edges={['top']}
    >
      <View style={styles.container}>
        <Text style={[styles.title, { color: theme.colors.text }]}>
          My Trips
        </Text>

        {trips.length === 0 ? (
          <Text style={[styles.empty, { color: theme.colors.text, opacity: 0.8 }]}>
            No saved trips yet. Save one from the Your Trip screen.
          </Text>
        ) : (
          <FlatList
            data={trips}
            keyExtractor={(item) => item.id}
            renderItem={renderTrip}
            contentContainerStyle={styles.listContent}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const isTripEnded = (trip) => {
  const start = trip?.config?.startDate;
  const length = trip?.config?.tripLength || 0;
  if (!start || !length) return false;

  const [y, m, d] = start.split('-').map(Number);
  const startDate = new Date(y, m - 1, d);
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + length - 1);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return today > endDate;
};

const formatTripTitle = (trip) => {
  const start = trip?.config?.startDate;
  if (!start) return 'Trip';
  const [y, m, d] = start.split('-');
  return `Trip starting ${m}-${d}-${y}`;
};

const formatTripDescription = (trip) => {
  const length = trip?.config?.tripLength || 0;
  const resort = trip?.config?.resortChoice || '';
  const resortLabel = resort === 'both' ? 'Disney & Universal' : resort;
  return `${length} days • ${resortLabel}`;
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f4f4f5',
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  title: {
    fontFamily: 'PoppinsSemiBold',
    fontSize: 26,
    marginBottom: 16,
  },
  empty: {
    marginTop: 8,
    fontFamily: 'PoppinsRegular',
  },
  listContent: {
    paddingBottom: 24,
  },
  tripBlock: {
    marginBottom: 12,
  },
  tripItem: {
    borderRadius: 12,
    backgroundColor: '#fff',
    paddingRight: 4,
  },
  tripTitle: {
    fontFamily: 'PoppinsSemiBold',
    fontSize: 16,
  },
  tripDescription: {
    fontFamily: 'PoppinsRegular',
    fontSize: 13,
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginHorizontal: -2,
  },
  endedBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#dc2626',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 8,
    marginLeft: 60,
    marginTop: -6,
  },
  endedBadgeText: {
    color: 'white',
    fontSize: 11,
    fontFamily: 'PoppinsSemiBold',
  },
});
