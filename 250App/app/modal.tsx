import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Modal() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={styles.text}>🪟 This is a Modal!</Text>
      <Text style={styles.subtext}>Slide up animation on iOS</Text>
      <TouchableOpacity style={styles.button} onPress={() => router.back()}>
        <Text style={styles.buttonText}>Close Modal</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222",
    justifyContent: "center",
    alignItems: "center",
  },
  text: { color: "#fff", fontSize: 26, fontWeight: "bold", marginBottom: 8 },
  subtext: { color: "#ccc", fontSize: 16, marginBottom: 24 },
  button: {
    backgroundColor: "#FF9500",
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 10,
  },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "600" },
});
