import { Image } from 'expo-image';
import { Platform, StyleSheet } from 'react-native';

import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link } from 'expo-router';
import { View, Text, ScrollView,FlatList } from "react-native";
import CityCard from "../../components/CityCard";
import featuredCities from "../../lib/cities";
import type { City } from "../../lib/cities";

export default function HomeScreen() {
  return (
    <View style={{ padding: 16, flex: 1 }}>
      <Text style={{ fontSize: 26, fontWeight: "700", marginBottom: 12 }}>
        Featured Cities
      </Text>

      <FlatList
        data={featuredCities}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <CityCard city={item} />}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
