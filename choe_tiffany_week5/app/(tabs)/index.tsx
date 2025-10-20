import { StyleSheet, View } from "react-native";
import { useFocusEffect, useRouter } from "expo-router";
import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useCallback, useState } from "react";
import { MyButton } from "@/components/my-button";

export const myLocations = [
  { id: "NY", label: "New York" },
  { id: "CA", label: "California" },
  { id: "TX", label: "Texas" },
];

export default function HomeScreen() {
  const [locations, setMyLocations] = useState<{
    id: string;
    label: string;
  }[]>(myLocations);
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      setMyLocations([...myLocations]);
    }, [setMyLocations])
  );

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <IconSymbol
          size={200}
          color="#808080"
          name="airplane.departure"
          style={styles.headerImage}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">My Travel Destinations</ThemedText>
      </ThemedView>
      <View style={styles.list}>
        {[...locations] 
          .sort((a, b) => a.label.localeCompare(b.label))
          .map((item) => {
            const added = myLocations.some((loc) => loc.id === item.id) ? "yes" : "no";
            return (
              <MyButton
                buttonText={item.label}
                key={item.id}
                location={item}
                onLocationPress={() =>
                  router.push({
                    pathname: "/details/[id]",
                    params: { id: String(item.id), added },
                  })
                }
              />
            );
          })}
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    top: 50,
    left: "25%",
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  list: {
    paddingVertical: 4,
  },
});
