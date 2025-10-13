import { FlatList, StyleSheet, Text, View } from "react-native";

const items = Array.from({ length: 10 }, (_, i) => `Item ${i + 1}`);

export default function Explore() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Explore Screen</Text>
      <FlatList
        data={items}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardText}>{item}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#111", padding: 20 },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 16,
  },
  card: {
    backgroundColor: "#1c1c1e",
    borderRadius: 10,
    padding: 20,
    marginVertical: 6,
  },
  cardText: { color: "#fff", fontSize: 18 },
});
