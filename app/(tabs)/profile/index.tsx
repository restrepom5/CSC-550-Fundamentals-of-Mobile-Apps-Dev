import { Image, StyleSheet, Text, View } from "react-native";

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Image source={{ uri: "https://i.pravatar.cc/200?img=10" }} style={styles.avatar} />
      <Text style={styles.name}>Maria Giugno</Text>
      <Text style={styles.caption}>Adventure seeker • Food lover • Sunrise chaser</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", gap: 12, padding: 24 },
  avatar: { width: 100, height: 100, borderRadius: 50 },
  name: { fontSize: 20, fontWeight: "700" },
  caption: { fontSize: 14, opacity: 0.7, textAlign: "center" },
});