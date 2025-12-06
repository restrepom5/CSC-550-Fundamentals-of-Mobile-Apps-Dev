import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';
import { FlatList, Image, ScrollView, StyleSheet, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

import AttractionInfoCard from '../../components/AttractionInfoCard';
import { getAttractionsForPark } from '../../data/attractions';

const QUEUE_TIMES_PARK_IDS = {
  // Universal Orlando
  'universal-studios-florida': 65,
  'islands-of-adventure': 64,
  'epic-universe': 334,
  'volcano-bay': 67,
  // Disney World
  'magic-kingdom': 6,
  epcot: 5,
  'hollywood-studios': 7,
  'animal-kingdom': 8,
};

function normalizeName(name) {
  return name
    ?.toLowerCase()
    .replace(/[^a-z0-9]/g, '')
    .trim();
}

export default function ParkDetailScreen({ route }) {
  const theme = useTheme();
  const { park } = route.params;

  const attractionsForPark = useMemo(
    () => getAttractionsForPark(park.id),
    [park.id],
  );

  const [waitByAttractionId, setWaitByAttractionId] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  useEffect(() => {
    const qtParkId = QUEUE_TIMES_PARK_IDS[park.id];

    if (!qtParkId) {
      setIsLoading(false);
      return;
    }

    let isMounted = true;

    async function loadWaitTimes() {
      try {
        setIsLoading(true);
        setLoadError(null);

        const res = await axios.get(
          `https://queue-times.com/parks/${qtParkId}/queue_times.json`,
        );

        const data = res.data || {};
        const rideMap = {};
        const lands = data.lands || [];

        lands.forEach((land) => {
          (land.rides || []).forEach((ride) => {
            const key = normalizeName(ride.name);
            if (key && !rideMap[key]) {
              rideMap[key] = ride;
            }
          });
        });

        const nextWaits = {};
        attractionsForPark.forEach((attr) => {
          const key = normalizeName(attr.name);
          const ride = rideMap[key];

          if (ride && typeof ride.wait_time === 'number') {
            nextWaits[attr.id] = ride.wait_time;
          } else {
            nextWaits[attr.id] = null;
          }
        });

        if (isMounted) {
          setWaitByAttractionId(nextWaits);
          setIsLoading(false);
        }
      } catch (err) {
        console.log('Error loading Queue-Times data', err);
        if (isMounted) {
          setLoadError('Unable to load live wait times right now.');
          setIsLoading(false);
        }
      }
    }

    loadWaitTimes();

    return () => {
      isMounted = false;
    };
  }, [park.id, attractionsForPark]);

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      style={{ backgroundColor: theme.colors.background }}
    >
      {park.image && (
        <Image
          source={park.image}
          style={styles.banner}
          resizeMode="cover"
        />
      )}

      <Text style={[styles.title, { color: theme.colors.text }]}>
        {park.name}
      </Text>
      {park.blurb ? (
        <Text
          style={[
            styles.blurb,
            { color: theme.colors.text, opacity: 0.85 },
          ]}
        >
          {park.blurb}
        </Text>
      ) : null}

      <View style={{ marginBottom: 8 }}>
        {QUEUE_TIMES_PARK_IDS[park.id] ? (
          <>
            {isLoading && (
              <Text style={[styles.metaText, { color: theme.colors.text, opacity: 0.7 }]}>
                Loading live wait times from Queue-Times.com…
              </Text>
            )}
            {loadError && (
              <Text style={[styles.errorText]}>{loadError}</Text>
            )}
            {!isLoading && !loadError && (
              <Text style={[styles.metaText, { color: theme.colors.text, opacity: 0.7 }]}>
                Live waits shown below. Tap the pill or button on a ride to open
                the full wait-time table.
              </Text>
            )}
          </>
        ) : (
          <Text style={[styles.metaText, { color: theme.colors.text, opacity: 0.7 }]}>
            Live waits are not available for this location yet. You can still
            tap a ride to open the official wait-time site.
          </Text>
        )}
      </View>

      <FlatList
        data={attractionsForPark}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <AttractionInfoCard
            attraction={item}
            waitTime={waitByAttractionId[item.id]}
          />
        )}
        ListEmptyComponent={
          <Text style={[styles.metaText, { color: theme.colors.text, opacity: 0.7 }]}>
            No attractions configured for this park yet.
          </Text>
        }
      />

      {QUEUE_TIMES_PARK_IDS[park.id] && (
        <Text
          style={[
            styles.attribution,
            { color: theme.colors.text, opacity: 0.6 },
          ]}
        >
          Wait time data: Powered by Queue-Times.com
        </Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    paddingBottom: 24,
  },
  banner: {
    width: '100%',
    height: 160,
    borderRadius: 12,
    marginBottom: 12,
  },
  title: {
    fontFamily: 'PoppinsSemiBold',
    fontSize: 22,
    marginBottom: 4,
  },
  blurb: {
    fontFamily: 'PoppinsRegular',
    fontSize: 14,
    marginBottom: 8,
  },
  metaText: {
    fontFamily: 'PoppinsRegular',
    fontSize: 12,
  },
  errorText: {
    fontFamily: 'PoppinsRegular',
    fontSize: 12,
    color: '#b91c1c',
  },
  attribution: {
    marginTop: 16,
    fontFamily: 'PoppinsRegular',
    fontSize: 11,
    textAlign: 'center',
  },
});
