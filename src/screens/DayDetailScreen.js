//src/screens/DayDetailScreen.js
import { useMemo, useState } from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import {
  Button,
  List,
  RadioButton,
  SegmentedButtons,
  Text,
  TextInput,
  useTheme,
} from 'react-native-paper';

import { getParkById, getParksForResort } from '../data/parks';

export default function DayDetailScreen({ route, navigation }) {
  const theme = useTheme();
  const { day, onUpdateDay, config } = route.params;

  const isTravelDay = !!day?.travelType;
  const [notes, setNotes] = useState(day?.notes || '');
  const [selectedParkId, setSelectedParkId] = useState(day?.parkId || null);

  const tripResortChoice = config?.resortChoice || 'disney';
  const isBothTrip = tripResortChoice === 'both';

  const initialResortForDay = useMemo(() => {
    if (isBothTrip && day?.parkId) {
      const existing = getParkById(day.parkId);
      if (existing?.resort) return existing.resort;
    }
    if (isBothTrip) return 'disney';
    return tripResortChoice;
  }, [isBothTrip, tripResortChoice, day?.parkId]);

  const [dayResortChoice, setDayResortChoice] = useState(initialResortForDay);

  const availableParks = useMemo(
    () => getParksForResort(isBothTrip ? dayResortChoice : tripResortChoice),
    [isBothTrip, dayResortChoice, tripResortChoice],
  );

  const handleSave = () => {
    const updated = {
      ...day,
      notes,
    };

    if (!isTravelDay) {
      updated.parkId = selectedParkId || null;
    }

    if (onUpdateDay) {
      onUpdateDay(updated);
    }
    navigation.goBack();
  };

  const prettyDate = day?.date ?? '';
  const selectedPark =
    !isTravelDay && selectedParkId ? getParkById(selectedParkId) : null;

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      style={{ backgroundColor: theme.colors.background }}
    >
      <Text style={[styles.title, { color: theme.colors.text }]}>
        Plan Your Day
      </Text>
      <Text style={[styles.date, { color: theme.colors.text, opacity: 0.9 }]}>
        {prettyDate}
      </Text>

      {isTravelDay && day.travelType === 'arrival' && (
        <Text style={[styles.badge, { color: theme.colors.primary }]}>
          Arrival Day – keep this day light.
        </Text>
      )}
      {isTravelDay && day.travelType === 'departure' && (
        <Text style={[styles.badge, { color: theme.colors.primary }]}>
          Departure Day – plan around travel.
        </Text>
      )}

      {!isTravelDay && (
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Choose your park
          </Text>

          {isBothTrip && (
            <View style={{ marginBottom: 8 }}>
              <Text style={[styles.label, { color: theme.colors.text }]}>
                Resort for this day
              </Text>
              <SegmentedButtons
                value={dayResortChoice}
                onValueChange={(value) => {
                  setDayResortChoice(value);
                  if (selectedParkId) {
                    const p = getParkById(selectedParkId);
                    if (p && p.resort !== value) {
                      setSelectedParkId(null);
                    }
                  }
                }}
                buttons={[
                  { value: 'disney', label: 'Disney' },
                  { value: 'universal', label: 'Universal' },
                ]}
              />
            </View>
          )}

          <RadioButton.Group
            onValueChange={setSelectedParkId}
            value={selectedParkId}
          >
            {availableParks.map((park) => (
              <List.Item
                key={park.id}
                title={park.name}
                description={park.blurb}
                onPress={() => setSelectedParkId(park.id)}
                titleStyle={{ color: theme.colors.text }}
                descriptionNumberOfLines={3}
                descriptionStyle={{ color: theme.colors.text, opacity: 0.8 }}
                style={{ backgroundColor: theme.colors.surface, borderRadius: 10, marginBottom: 6 }}
                left={(props) =>
                  park.image ? (
                    <Image
                      source={park.image}
                      style={styles.parkImage}
                      resizeMode="cover"
                    />
                  ) : (
                    <List.Icon {...props} icon="theme-light-dark" />
                  )
                }
                right={(props) => (
                  <RadioButton
                    {...props}
                    value={park.id}
                    status={selectedParkId === park.id ? 'checked' : 'unchecked'}
                    onPress={() => setSelectedParkId(park.id)}
                  />
                )}
              />
            ))}
          </RadioButton.Group>

          {selectedPark && (
            <Text style={[styles.helper, { color: theme.colors.text, opacity: 0.8 }]}>
              You selected:{' '}
              <Text style={styles.helperBold}>{selectedPark.name}</Text>
            </Text>
          )}
        </View>
      )}

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Notes for this {isTravelDay ? 'travel day' : 'park day'}
        </Text>
        <TextInput
          mode="outlined"
          multiline
          numberOfLines={4}
          value={notes}
          onChangeText={setNotes}
          placeholder={
            isTravelDay
              ? 'e.g., Be at airport by 9 AM, Uber pickup window, dinner near hotel...'
              : 'e.g., Resort/Pool, Rental Car, Grab groceries...'
          }
        />
      </View>

      <Button mode="contained" style={styles.button} onPress={handleSave}>
        Save Day
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 16,
  },
  title: {
    fontFamily: 'PoppinsSemiBold',
    fontSize: 22,
    marginBottom: 4,
  },
  date: {
    fontFamily: 'PoppinsRegular',
    fontSize: 16,
    marginBottom: 8,
  },
  badge: {
    fontFamily: 'PoppinsRegular',
    fontSize: 14,
    marginBottom: 12,
  },
  section: {
    marginTop: 8,
    marginBottom: 8,
  },
  sectionTitle: {
    fontFamily: 'PoppinsSemiBold',
    fontSize: 16,
    marginBottom: 4,
  },
  label: {
    fontFamily: 'PoppinsSemiBold',
    marginBottom: 4,
  },
  parkImage: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginRight: 8,
  },
  helper: {
    marginTop: 4,
    fontFamily: 'PoppinsRegular',
    fontSize: 13,
  },
  helperBold: {
    fontFamily: 'PoppinsSemiBold',
  },
  button: {
    marginTop: 16,
  },
});
