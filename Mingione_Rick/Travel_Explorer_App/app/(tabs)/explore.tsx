import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';

const destinations = [
  { id: 'acadia', name: 'Acadia National Park', image: require('@/assets/images/parks/acadia.jpg') },
  { id: 'arches', name: 'Arches National Park', image: require('@/assets/images/parks/arches.jpg') },
  { id: 'badlands', name: 'Badlands National Park', image: require('@/assets/images/parks/badlands.jpg') },
  { id: 'bigbend', name: 'Big Bend National Park', image: require('@/assets/images/parks/bigbend.jpg') },
  { id: 'black_canyon_of_the_gunnison', name: 'Black Canyon of the Gunnison National Park', image: require('@/assets/images/parks/black_canyon.jpg') },
  { id: 'bryce_canyon', name: 'Bryce Canyon National Park', image: require('@/assets/images/parks/bryce_canyon.jpg') },
  // { id: 'canyonlands', name: 'Canyonlands National Park', image: require('@/assets/images/parks/canyonlands.jpg') },
  // { id: 'capitol_reef', name: 'Capitol Reef National Park', image: require('@/assets/images/parks/capitol_reef.jpg') },
  // { id: 'carlsbad_caverns', name: 'Carlsbad Caverns National Park', image: require('@/assets/images/parks/carlsbad_caverns.jpg') },
  // { id: 'channel_islands', name: 'Channel Islands National Park', image: require('@/assets/images/parks/channel_islands.jpg') },
  // { id: 'congaree', name: 'Congaree National Park', image: require('@/assets/images/parks/congaree.jpg') },
  // { id: 'crater_lake', name: 'Crater Lake National Park', image: require('@/assets/images/parks/crater_lake.jpg') },
  // { id: 'cuyahoga_valley', name: 'Cuyahoga Valley National Park', image: require('@/assets/images/parks/cuyahoga_valley.jpg') },
  // { id: 'death_valley', name: 'Death Valley National Park', image: require('@/assets/images/parks/death_valley.jpg') },
  // { id: 'denali', name: 'Denali National Park & Preserve', image: require('@/assets/images/parks/denali.jpg') },
  // { id: 'dry_tortugas', name: 'Dry Tortugas National Park', image: require('@/assets/images/parks/dry_tortugas.jpg') },
  // { id: 'everglades', name: 'Everglades National Park', image: require('@/assets/images/parks/everglades.jpg') },
  // { id: 'gates_of_the_arctic', name: 'Gates of the Arctic National Park & Preserve', image: require('@/assets/images/parks/gates_of_the_arctic.jpg') },
  // { id: 'glacier_bay', name: 'Glacier Bay National Park & Preserve', image: require('@/assets/images/parks/glacier_bay.jpg') },
  // { id: 'glacier', name: 'Glacier National Park', image: require('@/assets/images/parks/glacier.jpg') },
  // { id: 'grand_canyon', name: 'Grand Canyon National Park', image: require('@/assets/images/parks/grand_canyon.jpg') },
  // { id: 'grand_teton', name: 'Grand Teton National Park', image: require('@/assets/images/parks/grand_teton.jpg') },
  // { id: 'great_basin', name: 'Great Basin National Park', image: require('@/assets/images/parks/great_basin.jpg') },
  // { id: 'great_sand_dunes', name: 'Great Sand Dunes National Park & Preserve', image: require('@/assets/images/parks/great_sand_dunes.jpg') },
  { id: 'smokey', name: 'Great Smokey Mountains National Park', image: require('@/assets/images/parks/smokey.jpg') },
  // { id: 'guadalupe_mountains', name: 'Guadalupe Mountains National Park', image: require('@/assets/images/parks/guadalupe_mountains.jpg') },
  // { id: 'haleakala', name: 'Haleakalā National Park', image: require('@/assets/images/parks/haleakala.jpg') },
  // { id: 'hawaii_volcanoes', name: 'Hawaiʻi Volcanoes National Park', image: require('@/assets/images/parks/hawaii_volcanoes.jpg') },
  // { id: 'hot_springs', name: 'Hot Springs National Park', image: require('@/assets/images/parks/hot_springs.jpg') },
  // { id: 'indiana_dunes', name: 'Indiana Dunes National Park', image: require('@/assets/images/parks/indiana_dunes.jpg') },
  // { id: 'isle_royale', name: 'Isle Royale National Park', image: require('@/assets/images/parks/isle_royale.jpg') },
  // { id: 'katmai', name: 'Katmai National Park & Preserve', image: require('@/assets/images/parks/katmai.jpg') },
  // { id: 'kenai_fjords', name: 'Kenai Fjords National Park', image: require('@/assets/images/parks/kenai_fjords.jpg') },
  // { id: 'kings_canyon', name: 'Kings Canyon National Park', image: require('@/assets/images/parks/kings_canyon.jpg') },
  // { id: 'kobuk_valley', name: 'Kobuk Valley National Park', image: require('@/assets/images/parks/kobuk_valley.jpg') },
  // { id: 'lake_clark', name: 'Lake Clark National Park & Preserve', image: require('@/assets/images/parks/lake_clark.jpg') },
  // { id: 'lassen_volcanic', name: 'Lassen Volcanic National Park', image: require('@/assets/images/parks/lassen_volcanic.jpg') },
  // { id: 'mammoth_cave', name: 'Mammoth Cave National Park', image: require('@/assets/images/parks/mammoth_cave.jpg') },
  // { id: 'mesa_verde', name: 'Mesa Verde National Park', image: require('@/assets/images/parks/mesa_verde.jpg') },
  // { id: 'mount_rainier', name: 'Mount Rainier National Park', image: require('@/assets/images/parks/mount_rainier.jpg') },
  // { id: 'north_cascades', name: 'North Cascades National Park', image: require('@/assets/images/parks/north_cascades.jpg') },
  // { id: 'olympic', name: 'Olympic National Park', image: require('@/assets/images/parks/olympic.jpg') },
  // { id: 'petrified_forest', name: 'Petrified Forest National Park', image: require('@/assets/images/parks/petrified_forest.jpg') },
  // { id: 'redwood', name: 'Redwood National Park', image: require('@/assets/images/parks/redwood.jpg') },
  // { id: 'rocky_mountain', name: 'Rocky Mountain National Park', image: require('@/assets/images/parks/rocky_mountain.jpg') },
  // { id: 'saguaro', name: 'Saguaro National Park', image: require('@/assets/images/parks/saguaro.jpg') },
  // { id: 'sequoia', name: 'Sequoia National Park', image: require('@/assets/images/parks/sequoia.jpg') },
  // { id: 'shenandoah', name: 'Shenandoah National Park', image: require('@/assets/images/parks/shenandoah.jpg') },
  // { id: 'theodore_roosevelt', name: 'Theodore Roosevelt National Park', image: require('@/assets/images/parks/theodore_roosevelt.jpg') },
  // { id: 'voyageurs', name: 'Voyageurs National Park', image: require('@/assets/images/parks/voyageurs.jpg') },
  // { id: 'white_sands', name: 'White Sands National Park', image: require('@/assets/images/parks/white_sands.jpg') },
  // { id: 'wind_cave', name: 'Wind Cave National Park', image: require('@/assets/images/parks/wind_cave.jpg') },
  // { id: 'wrangell_st_elas', name: 'Wrangell – St. Elias National Park & Preserve', image: require('@/assets/images/parks/wrangell_st_elas.jpg') },
  { id: 'yellowstone', name: 'Yellowstone National Park', image: require('@/assets/images/parks/yellowstone.jpg') },
  { id: 'zion', name: 'Zion National Park', image: require('@/assets/images/parks/zion.jpg') }
];


export default function ExploreScreen() {
  const router = useRouter();

  return (
    <FlatList
      data={destinations}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.container}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push(`../(modals)/destination/${item.id}`)} // ✅ Push modal
        >
          <Image source={item.image} style={styles.image} />
          <Text style={styles.name}>{item.name}</Text>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  card: { marginBottom: 16, borderRadius: 12, overflow: 'hidden', backgroundColor: '#fff' },
  image: { width: '100%', height: 160 },
  name: { padding: 12, fontSize: 18, fontWeight: '600' },
});
