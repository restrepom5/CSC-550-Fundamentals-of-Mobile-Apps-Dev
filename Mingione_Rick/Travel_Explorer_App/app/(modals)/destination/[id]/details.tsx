import { ScrollView, Button, StyleSheet, Image } from 'react-native';
import { useRouter, useLocalSearchParams, Link } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { Collapsible } from '@/components/ui/collapsible';
import ParallaxScrollView from '@/components/parallax-scroll-view';

export default function DestinationDetailsModal() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  console.log('Destination ID:', id);

  // Dummy data for demonstration purposes
  const details: Record<
    string,
    { name: string; location: string; popular_trails: string; best_time_to_visit: string; dog_friendly: string; best_for: string }
  > = {
    "acadia": {
      name: "Acadia National Park",
      location: "Maine",
      popular_trails: "Jordan Pond Path, Precipice Trail, Beehive Trail",
      best_time_to_visit: "September to October",
      dog_friendly: "Yes — dogs on leash (6 ft) are permitted on ~100 miles of trails, carriage roads and in campgrounds; some trails and beaches are restricted.",
      best_for: "Coastal scenery, hiking (dog‑friendly trails), wildlife viewing, fall foliage",
    },
    "arches": {
      name: "Arches National Park",
      location: "Utah",
      popular_trails: "Delicate Arch Trail, Balanced Rock Trail, Fiery Furnace Trail",
      best_time_to_visit: "March to May and September to November",
      dog_friendly: "No — pets are *not* allowed on hiking trails, overlooks, or in visitor buildings; only on roads, campgrounds & parking areas.",
      best_for: "Desert arches & rock formations, scenic drives, stargazing",
    },
    "badlands": {
      name: "Badlands National Park",
      location: "South Dakota",
      popular_trails: "Saddle Pass Trail, Notch Trail, Wildcat Pass Trail",
      best_time_to_visit: "March to May and September to November",
      dog_friendly: "Very limited — pets allowed only on roads, parking lots and vehicle‑accessible corridors; not on trails or in backcountry.",
      best_for: "Striking badland terrain, fossil history, wildlife viewing (bison, prairie dogs)",
    },
    "bigbend": {
      name: "Big Bend National Park",
      location: "Texas",
      popular_trails: "Rio Grande Trail, Chisos Basin Trail, Mariscal Trail",
      best_time_to_visit: "March to May and September to November",
      dog_friendly: "No — pets are not allowed on trails, off roads, or river areas; limited to vehicle‑accessible spots.",
      best_for: "Remote desert & canyon landscapes, Rio Grande vistas, stargazing",
    },
    "black_canyon": {
      name: "Black Canyon of the Gunnison National Park",
      location: "Colorado",
      popular_trails: "Rim Rock Trail, North Rim Chasm View Nature Trail, Cedar Point Nature Trail",
      best_time_to_visit: "September to October",
      dog_friendly: "Limited — leashed dogs allowed only in campgrounds, on roads & overlooks; most hiking trails and inner canyon routes are off‑limits.",
      best_for: "Dramatic canyon views, cliff‑side overlooks, quiet nature",
    },
    "bryce_canyon": {
      name: "Bryce Canyon National Park",
      location: "Utah",
      popular_trails: "Bryce Point Trail, Navajo Loop Trail, Rim Trail",
      best_time_to_visit: "March to May and September to November",
      dog_friendly: "Very limited — dogs allowed only on paved surfaces (roads, parking lots, paved rim trail section) and campgrounds; not allowed on unpaved trails.",
      best_for: "Hoodoos & amphitheater views, sunrise/sunset photography, geology",
    },
    "smokey": {
      name: "Great Smokey Mountains National Park",
      location: "Tennessee, North Carolina",
      popular_trails: "Clingmans Dome Trail, Andrews Bald, Rainbow Falls, Appalachian Trail",
      best_time_to_visit: "April to June and September to November",
      dog_friendly: "Yes, very limited (only two trails allow dogs)",
      best_for: "Biodiversity, Old forests, Hiking, Wildlife Viewing, Scenic Drives",
    },
    "yellowstone": {
      name: "Yellowstone National Park",
      location: "Yellowstone, Wyoming",
      popular_trails: "Fairy Falls Trail, Mount Washburn Trail",
      best_time_to_visit: "April to May and September to November",
      dog_friendly: "Yes, very limited (no trails allow dogs)",
      best_for: "Wide Open Wilderness, Geothermal Features, Wildlife Viewing, Hiking",
    },
    "zion": {
      name: "Zion National Park",
      location: "Springdale, Utah",
      popular_trails: "Angels Landing, The Narrows, Emerald Pools Trail",
      best_time_to_visit: "March to May and September to November",
      dog_friendly: "Yes, Moderate restrictions apply (one trail only + develped areas)",
      best_for: "Dramatic Canyon landscapes, Hiking, Canyoneering, Scenic Views",
    },
  };

  const info = details[String(id)];

  if (!info) {
    return (
      <ScrollView style={{ padding: 20 }}>
        <ThemedText>No details found for Destination ID: {id}</ThemedText>
        <Button title="Close" onPress={() => router.back()} />
      </ScrollView>
    );
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/tent.png')} style={styles.image}
        />
      }>
      <ThemedText style={styles.supertitle}>{info.name}</ThemedText>
      <ThemedText style={styles.title}>Park Details</ThemedText>
      <Collapsible title="Popular Trails">
        <ThemedText style={styles.subtitle}>{info.popular_trails}</ThemedText>
      </Collapsible>
      <Collapsible title="Best Time to Visit">
        <ThemedText style={styles.subtitle}>{info.best_time_to_visit}</ThemedText>
      </Collapsible>
      <Collapsible title="Dog Friendly">
        <ThemedText style={styles.subtitle}>{info.dog_friendly}</ThemedText>
      </Collapsible>
      <Collapsible title="Best For">
        <ThemedText style={styles.subtitle}>{info.best_for}</ThemedText>
      </Collapsible>
      {/* <Button title="Close" onPress={() => router.back()} /> */}
      <Link href="/(tabs)/explore" asChild>
        <Button title="Back to Explore" />
      </Link>
      <ThemedText style={styles.footer}>Pushed Details for Destination ID: {id}</ThemedText>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  supertitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  subtitle: { fontSize: 16, marginBottom: 20, textAlign: 'left' },
  image: { width: '100%', height: "100%", backgroundPosition: 'cover' },
  footer: { fontSize: 16, marginBottom: 20, textAlign: 'center', bottom: 0, left: 0, right: 0 },
});