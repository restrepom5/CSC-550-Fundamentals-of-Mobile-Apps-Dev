//src/components/TravelDayCard.js
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';

export default function TravelDayCard({ day, onPress }) {
  const theme = useTheme();

  const [year, month, dayNum] = day.date.split('-').map(Number);
  const dateObj = new Date(year, month - 1, dayNum);
  const weekday = dateObj.toLocaleDateString('en-US', { weekday: 'short' });
  const label = `${weekday} ${day.date}`;
  const travelLabel = day.travelType === 'arrival' ? 'Arrival Day' : 'Departure Day';

  const noteText =
    day?.notes && day.notes.trim().length > 0
      ? day.notes
      : 'Keep this day light. Leave room for flights, check-in, and a relaxed dinner.';

  const buttonLabel =
    day?.notes && day.notes.trim().length > 0 ? 'Edit Notes' : 'Add Notes';

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.colors.surface,
          borderLeftColor: theme.colors.primary,
        },
        styles.travel,
      ]}
    >
      <View style={styles.row}>
        <MaterialCommunityIcons
          name="airplane-takeoff"
          size={24}
          color={theme.colors.primary}
        />
        <View style={{ marginLeft: 8 }}>
          <Text
            style={[
              styles.date,
              { color: theme.colors.onSurface },
            ]}
          >
            {label}
          </Text>
          <Text
            style={[
              styles.travelLabel,
              { color: theme.colors.primary },
            ]}
          >
            {travelLabel}
          </Text>
        </View>
      </View>

      <Text
        style={[
          styles.note,
          { color: theme.colors.onSurfaceVariant ?? theme.colors.onSurface },
        ]}
      >
        {noteText}
      </Text>

      <Button mode="text" onPress={onPress}>
        {buttonLabel}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    marginBottom: 12,
    padding: 12,
    elevation: 1,
  },
  travel: { borderLeftWidth: 4 },
  row: { flexDirection: 'row', alignItems: 'center' },
  date: { fontFamily: 'PoppinsSemiBold' },
  travelLabel: { fontFamily: 'PoppinsRegular' },
  note: {
    marginTop: 8,
    marginBottom: 4,
    fontFamily: 'PoppinsRegular',
  },
});
