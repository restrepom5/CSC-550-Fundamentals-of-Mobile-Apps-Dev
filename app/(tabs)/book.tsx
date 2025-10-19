import { View, Text, StyleSheet } from "react-native";

export default function BookScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>📖 Book a Trip</Text>
      <Text>Find the perfect destination for your next adventure.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center', alignItems: 'center'
  },
  title: {
    fontSize: 20, fontWeight: 'bold', marginBottom: 10
  }
});
