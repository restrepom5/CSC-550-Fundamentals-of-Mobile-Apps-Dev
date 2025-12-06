// src/components/DayCard.js
import React from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import { Button, Chip, Text, useTheme } from 'react-native-paper';
import { parks } from '../data/parks';

export default React.memo(function DayCard({ day, onPress }) {
  const theme = useTheme();                  
  const isDark = theme.dark === true;        

  const park = parks.find((p) => p.id === day.parkId);

  const [year, month, dayNum] = day.date.split('-').map(Number);
  const dateObj = new Date(year, month - 1, dayNum);
  const weekday = dateObj.toLocaleDateString('en-US', { weekday: 'short' });
  const label = `${weekday} ${day.date}`;

  const imageSource = park?.image ?? null;

  const notePreview =
    day.notes && day.notes.trim().length > 0
      ? day.notes.trim().length > 80
        ? day.notes.trim().slice(0, 77) + '...'
        : day.notes.trim()
      : null;

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.colors.surface,        
          borderLeftWidth: 4,
          borderLeftColor: theme.colors.primary,        
        },
      ]}
    >
      {imageSource && (
        <ImageBackground
          source={imageSource}
          style={styles.image}
          imageStyle={{
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
          }}
        >
          <View style={styles.overlay} />
        </ImageBackground>
      )}

      <View style={styles.content}>
        <Text style={[styles.date, { color: theme.colors.text }]}>
          {label}
        </Text>

        <View style={styles.row}>
          <Text style={[styles.parkName, { color: theme.colors.text }]}>
            {park ? park.name : 'No park selected yet'}
          </Text>
        </View>

        {notePreview && (
          <Text
            style={[
              styles.notes,
              { color: theme.colors.onSurfaceVariant ?? theme.colors.text },
            ]}
            numberOfLines={2}
          >
            {notePreview}
          </Text>
        )}

        <View style={styles.chips}>
          {day.attractions.slice(0, 3).map((attrId) => (
            <Chip
              key={attrId}
              style={styles.chip}
              compact
              textStyle={{ color: theme.colors.text }}
            >
              {attrId}
            </Chip>
          ))}
        </View>

        <Button mode="contained" onPress={onPress}>
          Plan This Day
        </Button>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    marginBottom: 12,
    overflow: 'hidden',
    elevation: 2,
  },
  image: { height: 120, justifyContent: 'flex-end' },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.25)',
  },
  content: { padding: 12, gap: 8 },
  date: { fontFamily: 'PoppinsSemiBold', fontSize: 14 },
  parkName: { fontFamily: 'PoppinsSemiBold', fontSize: 18 },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  notes: {
    fontFamily: 'PoppinsRegular',
    fontSize: 13,
  },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 4 },
  chip: { marginRight: 4, marginTop: 4 },
});
