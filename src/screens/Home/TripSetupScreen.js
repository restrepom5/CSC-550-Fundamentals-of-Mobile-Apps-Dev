// src/screens/Home/TripSetupScreen.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Haptics from 'expo-haptics';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Button,
  SegmentedButtons,
  Text,
  TextInput,
  useTheme,
} from 'react-native-paper';

const formatDisplayDate = (iso) => {
  if (!iso) return '';
  const [year, month, day] = iso.split('-');
  return `${month}-${day}-${year}`;
};

export default function TripSetupScreen({ navigation, route }) {
  const theme = useTheme();
  const isDark = theme.dark === true;

  const existingTrip = route?.params?.existingTrip || null;
  const existingConfig = existingTrip?.config || null;

  const [resortChoice, setResortChoice] = useState(
    existingConfig?.resortChoice ?? 'both',
  );
  const [startDate, setStartDate] = useState(
    existingConfig?.startDate ?? '',
  );
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [tripLength, setTripLength] = useState(
    existingConfig?.tripLength != null
      ? String(existingConfig.tripLength)
      : '7',
  );
  const [travelDay, setTravelDay] = useState(
    existingConfig?.travelDay ?? 'none',
  );

  const onContinue = async () => {
    const parsedLength = parseInt(tripLength, 10);
    const safeLength =
      Number.isFinite(parsedLength) && parsedLength > 0 ? parsedLength : 1;

    const config = {
      resortChoice,
      startDate,
      tripLength: safeLength,
      travelDay,
    };

    navigation.navigate('WeekView', {
      config,
      existingTrip,
    });

    try {
      await AsyncStorage.setItem('pdo_trip_config', JSON.stringify(config));
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    } catch (err) {
      console.error('Error during trip save/haptics:', err);
    }
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (!selectedDate || event?.type === 'dismissed') return;

    const y = selectedDate.getFullYear();
    const m = String(selectedDate.getMonth() + 1).padStart(2, '0');
    const d = String(selectedDate.getDate()).padStart(2, '0');
    setStartDate(`${y}-${m}-${d}`);
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.colors.background },
      ]}
    >
      <Text style={[styles.title, { color: theme.colors.text }]}>
        Plan Your Park Week
      </Text>
      <Text
        style={[
          styles.subtitle,
          { color: theme.colors.text, opacity: 0.8 },
        ]}
      >
        We will help you sketch a simple, shareable itinerary.
      </Text>

      <Text style={[styles.label, { color: theme.colors.text }]}>
        Which resorts are you visiting?
      </Text>
      <SegmentedButtons
        value={resortChoice}
        onValueChange={setResortChoice}
        buttons={[
          { value: 'disney', label: 'Disney' },
          { value: 'universal', label: 'Universal' },
          { value: 'both', label: 'Both' },
        ]}
      />

      <Text style={[styles.label, { color: theme.colors.text }]}>
        Trip Start Date
        <Text
          style={[
            styles.labelHint,
            { color: theme.colors.text, opacity: 0.7 },
          ]}
        >
          {'  '}(Click date below to enter date)
        </Text>
      </Text>

      <Button
        mode="outlined"
        onPress={() => setShowDatePicker(true)}
        textColor={theme.colors.text}
        style={{ borderColor: theme.colors.outline }}
      >
        {startDate ? formatDisplayDate(startDate) : 'Select a date'}
      </Button>

      {showDatePicker && (
        <DateTimePicker
          value={
            startDate
              ? (() => {
                  const [y, m, d] = startDate.split('-').map(Number);
                  return new Date(y, m - 1, d);
                })()
              : new Date()
          }
          mode="date"
          display="default"
          onChange={handleDateChange}
          themeVariant={isDark ? 'dark' : 'light'}
          textColor={theme.colors.text}
        />
      )}

      <Text style={[styles.label, { color: theme.colors.text }]}>
        How many park days?
      </Text>
      <TextInput
        mode="outlined"
        keyboardType="numeric"
        value={tripLength}
        onChangeText={setTripLength}
      />

      <Text style={[styles.label, { color: theme.colors.text }]}>
        Travel day?
      </Text>
      <SegmentedButtons
        value={travelDay}
        onValueChange={setTravelDay}
        buttons={[
          { value: 'none', label: 'None' },
          { value: 'arrival', label: 'Arrival' },
          { value: 'departure', label: 'Departure' },
          { value: 'both', label: 'Both' },
        ]}
      />

      <Button
        mode="contained"
        style={styles.button}
        onPress={onContinue}
        disabled={!startDate || !tripLength.trim()}
      >
        Generate My Trip
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, gap: 16 },
  title: { fontFamily: 'PoppinsSemiBold', fontSize: 24, marginBottom: 8 },
  subtitle: { fontFamily: 'PoppinsRegular', fontSize: 14 },
  label: { marginTop: 12, marginBottom: 4, fontFamily: 'PoppinsSemiBold' },
  labelHint: {
    fontFamily: 'PoppinsRegular',
    fontSize: 12,
  },
  button: { marginTop: 24 },
});
