import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Pushed() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={styles.text}>This is a Pushed Screen!</Text>
      <TouchableOpacity style={styles.button} onPress={() => router.back()}>
        <Text style={styles.buttonText}>⬅ Go Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1c1c1e",
  },
  text: { color: "#fff", fontSize: 24, marginBottom: 20 },
  button: {
    backgroundColor: "#007AFF",
    padding: 14,
    borderRadius: 10,
  },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "500" },
});
