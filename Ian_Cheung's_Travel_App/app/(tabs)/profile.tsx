import { Image, StyleSheet, Text, View } from "react-native";

export default function Profile() {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://avatars.githubusercontent.com/u/9919?s=200&v=4",
        }}
        style={styles.avatar}
      />
      <Text style={styles.name}>Your Name</Text>
      <Text style={styles.bio}>iamrestrepo</Text>
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
  name: { color: "#fff", fontSize: 24, fontWeight: "bold" },
  bio: { color: "#ccc", fontSize: 16, marginTop: 8 },
});
