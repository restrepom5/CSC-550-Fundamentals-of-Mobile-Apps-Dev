import { View, Text, FlatList } from "react-native";
import useFavorites from "../../hooks/use-favorites";
import FavoriteCard from "../../components/FavoriteCard";


export default function FavoritesScreen() {
  const { favorites } = useFavorites();

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: "700" }}>
      Your Favorites
      </Text>

      <FlatList
      data={favorites}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <FavoriteCard 
          city={item}
        />
      )}
      />
    </View>
  );
}
