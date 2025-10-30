import { Image, Linking, StyleSheet, Text, View } from "react-native";

export default function Profile() {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://avatars.githubusercontent.com/u/45216552?v=4&size=64",
        }}
        style={styles.avatar}
      />
      <Text style={styles.name}>Debs Olivares</Text>
      <Text style={styles.bio}>deb5</Text>
      <Text style={styles.bio} onPress={() => Linking.openURL("https://github.com/deb5")}>Visit profile</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111",
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: { width: 120, height: 120, borderRadius: 60, marginBottom: 20 },
  name: { color: "#A3B18A", fontSize: 24, fontWeight: "bold" },
  bio: { color: "#DAD7CD", fontSize: 16, marginTop: 8 },
});