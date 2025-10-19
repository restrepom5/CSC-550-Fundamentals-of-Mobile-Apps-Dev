// app/(tabs)/myTrips/index.tsx

import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

const trips = ["Spain", "Portugal", "Brazil"];

export default function MyTrips() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Trips</Text>
      {trips.map((trip) => (
        <TouchableOpacity
          key={trip}
          style={styles.card}
          onPress={() => router.push(`/myTrips/${trip}`)}
        >
          <Text style={styles.cardText}>{trip.charAt(0).toUpperCase() + trip.slice(1)}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  card: {
    padding: 20,
    marginVertical: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    alignItems: "center",
  },
  cardText: { fontSize: 18 },
});
