import { useLocalSearchParams, router } from "expo-router";
import { View, Text, Image, Button, ScrollView } from "react-native";
import { DESTINATIONS } from "../../data/destinations";

export default function DestinationDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const item = DESTINATIONS.find(d => d.id === String(id));

  if (!item) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Destination not found.</Text>
        <Button title="Back" onPress={() => router.back()} />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={{ padding: 16, gap: 16 }}>
      <Image source={{ uri: item.image }} style={{ width: "100%", height: 240, borderRadius: 16 }} />
      <View style={{ gap: 6 }}>
        <Text style={{ fontSize: 24, fontWeight: "800" }}>{item.name}</Text>
        <Text style={{ color: "#666" }}>{item.country} · {item.price} · ⭐ {item.rating.toFixed(1)}</Text>
      </View>

      <Text style={{ lineHeight: 20, color: "#333" }}>{item.description}</Text>

      <Button title="Push another detail" onPress={() => router.push(`/destination/${Number(id) + 1}`)} />
      <Button title="Go back" onPress={() => router.back()} />
    </ScrollView>
  );
}

