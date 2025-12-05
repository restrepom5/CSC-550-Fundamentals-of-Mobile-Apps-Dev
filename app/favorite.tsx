import { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, FlatList, Alert, ImageBackground } from "react-native";
import { getFavorites, removeFavorite } from "../src/storage/favorites";

export default function FavoritesScreen() {
  const [favorites, setFavorites] = useState<string[]>([]);

  // Bring the data from storage/favorites to be display in this page
  const loadFavorites = async () => {
    const favs: string[] = await getFavorites();
    setFavorites(favs);
  };

  // option to remove favorite cities( i have integrated this as a form of boomark)
  const handleRemove = async (city: string) => {
    await removeFavorite(city);
    Alert.alert("Removed", `${city} has been removed from favorites.`);
    loadFavorites();
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  if (favorites.length === 0) { // if there is nothing in storage/favorites print the lines bellow. 
    return (
      <View style={styles.container}>
        <Text style={styles.emptyText}>No favorite cities have been added.</Text>
      </View>
    );
  }

  return (
    <ImageBackground
      source={require("../assets/images/favorite.jpg")}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Favorite Cities</Text>
        <FlatList

          data={favorites}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.city}>{item}</Text>
              <Button title="Remove" onPress={() => handleRemove(item)} />
            </View>
          )}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 15 },
  emptyText: { fontSize: 18, color: "#555", textAlign: "center", marginTop: 50 },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderColor: "#ccc",
  },
  city: { fontSize: 18 },
});
