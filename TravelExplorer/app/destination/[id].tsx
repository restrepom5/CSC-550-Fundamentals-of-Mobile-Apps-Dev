import { Stack, useLocalSearchParams } from "expo-router";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { DESTINATIONS } from "../../lib/data/destinations";

export default function DestinationDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const dest = DESTINATIONS.find(d => d.id === id);

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
      <Stack.Screen options={{ title: dest?.name ?? "Destination" }} />

      {dest ? (
        <View>
          <Image source={{ uri: dest.image }} style={styles.image} />
          <View style={styles.content}>
            <Text style={styles.title}>{dest.name}</Text>
            <Text style={styles.subtitle}>{dest.country} • {dest.price}</Text>
            <Text style={styles.body}>{dest.description}</Text>
            <Text style={styles.h2}>Highlights</Text>
            {dest.highlights.map(h => (
              <Text key={h} style={styles.list}>• {h}</Text>
            ))}
          </View>
        </View>
      ) : (
        <View style={{ padding: 16 }}>
          <Text>We couldn't find that destination.</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  image: { width: "100%", height: 260 },
  content: { padding: 16 },
  title: { fontSize: 28, fontWeight: "800" },
  subtitle: { marginTop: 4, fontSize: 14, color: "#090808ff" },
  body: { marginTop: 12, fontSize: 16, lineHeight: 22, color: "#333" },
  h2: { marginTop: 16, fontSize: 18, fontWeight: "700" },
  list: { marginTop: 6, fontSize: 15 }
});
