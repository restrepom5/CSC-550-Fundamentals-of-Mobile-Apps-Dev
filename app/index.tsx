import { View, Text, TouchableOpacity } from "react-native";
import { Link } from "expo-router";

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, padding: 20, justifyContent: "center" }}>
      <Text style={{ fontSize: 32, fontWeight: "800", marginBottom: 20 }}>
        CityBuffy 🗺️
      </Text>

      <Text style={{ fontSize: 18, color: "#666", marginBottom: 40 }}>
        Discover cities, explore details, save your favorites.
      </Text>

      <Link href="/search" asChild>
        <TouchableOpacity
          style={{
            backgroundColor: "#3b82f6",
            padding: 16,
            borderRadius: 12,
            marginBottom: 20,
          }}
        >
          <Text style={{ color: "white", fontSize: 18, fontWeight: "600", textAlign: "center" }}>
            🔍 Search Cities
          </Text>
        </TouchableOpacity>
      </Link>

      <Link href="/favorites" asChild>
        <TouchableOpacity
          style={{
            backgroundColor: "#10b981",
            padding: 16,
            borderRadius: 12,
            marginBottom: 20,
          }}
        >
          <Text style={{ color: "white", fontSize: 18, fontWeight: "600", textAlign: "center" }}>
            ⭐ View Favorites
          </Text>
        </TouchableOpacity>
      </Link>

      <Link href="/setting" asChild>
        <TouchableOpacity
          style={{
            backgroundColor: "#f59e0b",
            padding: 16,
            borderRadius: 12,
          }}
        >
          <Text style={{ color: "white", fontSize: 18, fontWeight: "600", textAlign: "center" }}>
            ⚙️ Settings
          </Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}
