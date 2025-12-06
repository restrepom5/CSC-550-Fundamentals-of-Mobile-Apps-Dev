// src/screens/Home/TripSnapshotScreen.js
import * as Sharing from 'expo-sharing';
import * as React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { captureRef } from 'react-native-view-shot';

import { getParkById } from '../../data/parks';

function formatDayLabel(iso) {
  if (!iso) return '';
  const [y, m, d] = iso.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  const weekday = date.toLocaleDateString(undefined, { weekday: 'short' });
  return `${weekday} ${String(m).padStart(2, '0')}/${String(d).padStart(2, '0')}`;
}

function formatTripHeader(trip) {
  const start = trip?.config?.startDate;
  const length = trip?.config?.tripLength || 0;
  if (!start) return 'Travel Itinerary';

  const [y, m, d] = start.split('-');
  return `Trip starting ${m}-${d}-${y} • ${length} days`;
}

export default function TripSnapshotScreen({ route, navigation }) {
  const { trip } = route.params;
  const snapshotRef = React.useRef(null);

  const days = Array.isArray(trip?.days) ? trip.days : [];

  const handleShare = async () => {
    if (!snapshotRef.current) return;

    try {
      const uri = await captureRef(snapshotRef, {
        format: 'png',
        quality: 1,
      });

      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri, {
          dialogTitle: 'Share or save your itinerary snapshot',
          mimeType: 'image/png',
          UTI: 'public.png',
        });
      } else {
        alert(
          'The image was created, but sharing is not available on this device. Try on a real device instead of a simulator.',
        );
      }
    } catch (err) {
      console.error('Error capturing snapshot', err);
      alert('We could not create an image for this itinerary.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <View style={styles.container}>
        {/* This whole card is what we capture as an image */}
        <View ref={snapshotRef} collapsable={false} style={styles.snapshotCard}>
          <Text style={styles.mainTitle}>TRAVEL ITINERARY</Text>
          <Text style={styles.subTitle}>{formatTripHeader(trip)}</Text>

          <View style={styles.headerRow}>
            <Text style={[styles.headerCell, styles.headerCellFirst]}>Day</Text>
            <Text style={[styles.headerCell, styles.headerCellWide]}>Park / Travel</Text>
            <Text style={styles.headerCell}>Notes</Text>
          </View>

          {days.map((day, index) => {
            const park = day.parkId ? getParkById(day.parkId) : null;
            const isTravel = !!day.travelType;

            let label = 'Free day';
            if (isTravel && day.travelType === 'arrival') label = 'Arrival day';
            else if (isTravel && day.travelType === 'departure') label = 'Departure day';
            else if (park) label = park.name;

            const shortNotes =
              (day.notes || '').length > 40
                ? day.notes.slice(0, 37) + '...'
                : day.notes || '';

            return (
              <View key={day.id || index} style={styles.row}>
                <Text style={[styles.cell, styles.cellFirst]}>
                  {`Day ${index + 1}\n${formatDayLabel(day.date)}`}
                </Text>

                <View style={[styles.cell, styles.cellWide, styles.parkCell]}>
                  {park && park.image && (
                    <Image source={park.image} style={styles.parkImage} />
                  )}
                  <Text style={styles.parkLabel}>{label}</Text>
                </View>

                <Text style={styles.cell}>{shortNotes}</Text>
              </View>
            );
          })}
        </View>

        <View style={styles.actions}>
          <Button mode="contained" onPress={handleShare}>
            Share / Save Image
          </Button>
          <Button mode="text" onPress={() => navigation.goBack()}>
            Done
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  snapshotCard: {
    backgroundColor: '#fefce8',
    borderRadius: 16,
    padding: 16,
    borderWidth: 2,
    borderColor: '#eab308',
  },
  mainTitle: {
    fontFamily: 'PoppinsSemiBold',
    fontSize: 20,
    textAlign: 'center',
    letterSpacing: 1.5,
    color: '#1d4ed8',
  },
  subTitle: {
    fontFamily: 'PoppinsSemiBold',
    fontSize: 13,
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 12,
    color: '#1f2937',
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#facc15',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 8,
    marginBottom: 8,
  },
  headerCell: {
    flex: 1,
    fontFamily: 'PoppinsSemiBold',
    fontSize: 11,
    textTransform: 'uppercase',
    color: '#111827',
  },
  headerCellFirst: {
    flex: 1.1,
  },
  headerCellWide: {
    flex: 1.4,
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  cell: {
    flex: 1,
    fontFamily: 'PoppinsRegular',
    fontSize: 11,
    color: '#111827',
  },
  cellFirst: {
    flex: 1.1,
  },
  cellWide: {
    flex: 1.4,
  },
  parkCell: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  parkImage: {
    width: 24,
    height: 24,
    borderRadius: 6,
  },
  parkLabel: {
    flexShrink: 1,
    fontFamily: 'PoppinsRegular',
    fontSize: 11,
    color: '#111827',
  },
  actions: {
    marginTop: 16,
    gap: 8,
  },
});
