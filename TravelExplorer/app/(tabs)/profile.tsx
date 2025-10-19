import { View, Text, StyleSheet, Image } from "react-native";

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Image source={{ uri: "https://i.pravatar.cc/200" }} style={styles.avatar} />
      <Text style={styles.name}>Traveler</Text>
      <Text style={styles.meta}>Loves city breaks & beaches</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 12
  },
  name: {
    fontSize: 20,
    fontWeight: "700"
  },
  meta: {
    marginTop: 4,
    color: "#666"
  }
});
