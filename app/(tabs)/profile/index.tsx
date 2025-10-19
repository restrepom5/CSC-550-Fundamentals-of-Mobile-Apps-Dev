// app/(tabs)/profile/index.tsx
import { Image as ExpoImage } from "expo-image";
import React, { useMemo } from "react";
import { FlatList, ListRenderItemInfo, StyleSheet, Text, View } from "react-native";
import destinations, { Destination } from "../../../data/destinations";
import { useFavorites } from "../../../favorites/FavoritesProvider";
import { useTheme } from "../../../theme/ThemeProvider";

export default function ProfileScreen() {
  const { colors } = useTheme();
  const { favorites } = useFavorites();

  // Header + favorites
  const favItems = useMemo(
    () =>
      Array.from(favorites)
        .map((id) => destinations.find((d) => d.id === id))
        .filter(Boolean) as Destination[],
    [favorites]
  );

  const renderItem = ({ item }: ListRenderItemInfo<Destination>) => {
    return (
      <View
        style={[
          styles.favCard,
          { backgroundColor: colors.card, borderColor: "rgba(0,0,0,0.06)" },
        ]}
      >
        <ExpoImage
          source={item.image}
          style={styles.favImage}
          contentFit="cover"
          cachePolicy="disk"
          transition={150}
        />
        <View style={styles.favContent}>
          <Text style={[styles.favName, { color: colors.text }]} numberOfLines={2}>
            {item.name}
          </Text>
          <Text style={{ color: colors.muted }} numberOfLines={1}>
            {item.country}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <FlatList
      style={{ flex: 1, backgroundColor: colors.bg }}
      contentContainerStyle={{ padding: 20, paddingBottom: 32 }}
      data={favItems}
      keyExtractor={(d) => d.id}
      renderItem={renderItem}
      numColumns={2}
      columnWrapperStyle={{ justifyContent: "space-between", marginBottom: 14 }}
      ListHeaderComponent={
        <View>
          {/* Header */}
          <View style={styles.header}>
            <ExpoImage
              source={require("../../../assets/images/me.png")}
              style={styles.avatar}
              contentFit="cover"
              cachePolicy="disk"
              accessibilityLabel="Profile photo of user"
            />
            <Text style={[styles.name, { color: colors.text }]}>Maria Giugno</Text>
            <Text style={[styles.subtitle, { color: colors.muted }]}>
              Adventure seeker • Food lover • Sunrise chaser
            </Text>
          </View>

          <Text style={[styles.sectionTitle, { color: colors.text }]}>Favorites</Text>
          {favItems.length === 0 && (
            <Text style={{ color: colors.muted, marginBottom: 12 }}>
              No favorites yet — tap the ♥ on a destination.
            </Text>
          )}
        </View>
      }
      ListFooterComponent={<View style={{ height: 8 }} />}
      showsVerticalScrollIndicator={false}
    />
  );
}

const AVATAR_SIZE = 110;

const styles = StyleSheet.create({
  header: { alignItems: "center", marginTop: 8, marginBottom: 20 },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    backgroundColor: "#ddd",
  },
  name: { marginTop: 14, fontSize: 22, fontWeight: "900" },
  subtitle: { marginTop: 6, fontSize: 14 },
  sectionTitle: { fontSize: 18, fontWeight: "800", marginBottom: 10 },

  favCard: {
    width: "48%", 
    borderRadius: 14,
    overflow: "hidden",
    borderWidth: 1,
  },
  favImage: { width: "100%", height: 120, backgroundColor: "#e5e7eb" },
  favContent: { paddingHorizontal: 10, paddingVertical: 8 },
  favName: {
    fontSize: 14,
    fontWeight: "800",
    lineHeight: 18,
    includeFontPadding: false,
  },
});
