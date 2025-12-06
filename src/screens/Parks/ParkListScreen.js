// src/screens//Parks/ParkListScreen.js
import { useMemo, useState } from 'react';
import { FlatList, Image, StyleSheet, View } from 'react-native';
import { List, SegmentedButtons, Text, useTheme } from 'react-native-paper';
import { parks } from '../../data/parks';

export default function ParkListScreen({ navigation }) {
  const [resortFilter, setResortFilter] = useState('all');
  const theme = useTheme();

  const filteredParks = useMemo(() => {
    if (resortFilter === 'all') return parks;
    return parks.filter((p) => p.resort === resortFilter);
  }, [resortFilter]);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.colors.background },
      ]}
    >
      <Text style={[styles.header, { color: theme.colors.text }]}>
        Browse Parks
      </Text>

      <SegmentedButtons
        style={styles.segmented}
        value={resortFilter}
        onValueChange={setResortFilter}
        buttons={[
          { value: 'disney', label: 'Disney' },
          { value: 'universal', label: 'Universal' },
          { value: 'all', label: 'All' },
        ]}
      />

      <FlatList
        data={filteredParks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <List.Item
            title={item.name}
            description={
              item.resort === 'disney'
                ? 'Walt Disney World'
                : 'Universal Orlando'
            }
            titleStyle={{ color: theme.colors.text }}
            descriptionStyle={{ color: theme.colors.text, opacity: 0.8 }}
            style={{
              backgroundColor: theme.colors.elevation?.level2 ?? theme.colors.surface,
              borderRadius: 10,
              marginBottom: 6,
            }}
            left={(props) =>
              item.image ? (
                <Image
                  source={item.image}
                  style={styles.image}
                  resizeMode="cover"
                />
              ) : (
                <List.Icon {...props} icon="map" />
              )
            }
            onPress={() => navigation.navigate('ParkDetail', { park: item })}
          />
        )}
        contentContainerStyle={{ paddingBottom: 24 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
  header: {
    fontFamily: 'PoppinsSemiBold',
    fontSize: 22,
    marginBottom: 8,
  },
  segmented: {
    marginBottom: 8,
  },
  image: {
    width: 56,
    height: 40,
    borderRadius: 6,
    marginRight: 8,
  },
});
