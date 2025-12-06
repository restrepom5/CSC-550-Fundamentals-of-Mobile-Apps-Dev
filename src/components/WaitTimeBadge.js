// src/components/WaitTimeBadge.js
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function WaitTimeBadge({ minutes, onPress }) {
  let label = 'See waits';
  let bg = '#6b7280'; // gray
  let textColor = '#ffffff';

  if (typeof minutes === 'number') {
    label = `${minutes} min`;

    if (minutes <= 15) {
      bg = '#16a34a'; // green (short wait)
    } else if (minutes <= 30) {
      bg = '#22c55e'; // light green
    } else if (minutes <= 45) {
      bg = '#f97316'; // orange
    } else {
      bg = '#dc2626'; // red (long wait)
    }
  }

  const content = (
    <View style={[styles.badge, { backgroundColor: bg }]}>
      <Text style={[styles.text, { color: textColor }]}>{label}</Text>
    </View>
  );

  if (onPress) {
    return (
      <Pressable onPress={onPress} style={styles.pressable}>
        {content}
      </Pressable>
    );
  }

  return content;
}

const styles = StyleSheet.create({
  pressable: { alignSelf: 'flex-start' },
  badge: {
    minWidth: 56,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    alignItems: 'center',
  },
  text: {
    fontSize: 12,
    fontWeight: '600',
  },
});
