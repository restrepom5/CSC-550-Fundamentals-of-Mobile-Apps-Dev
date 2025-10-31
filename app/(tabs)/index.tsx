import React from "react";
import { View, Text, Image, Button } from "react-native";
import { router, Link } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { DESTINATIONS } from "../../data/destinations";

export default function HomeScreen() {
  const featured = DESTINATIONS[0];

  return (
    <View style={{ flex: 1, padding: 16, gap: 20 }}>
      {/* 🌈 Soft gradient hero */}
      <LinearGradient
        colors={["#e9f1ff", "#ffffff"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={{
          borderRadius: 16,
          padding: 16,
          shadowColor: "#000",
          shadowOpacity: 0.06,
          shadowRadius: 8,
          elevation: 2,
        }}
      >
        <View style={{ alignItems: "center", marginBottom: 12 }}>
          <Text style={{ fontSize: 26, fontWeight: "800" }}>Travel Explorer</Text>
          <Text style={{ color: "#666", marginTop: 6 }}>Find your next adventure</Text>
        </View>

        <View style={{ borderRadius: 12, overflow: "hidden" }}>
          <Image
            source={{ uri: featured.image }}
            style={{ width: "100%", height: 180, backgroundColor: "#ddd" }}
            resizeMode="cover"
          />
        </View>

        <View style={{ gap: 6, marginTop: 12 }}>
          <Text style={{ fontSize: 18, fontWeight: "700" }}>{featured.name}</Text>
          <Text style={{ color: "#666" }}>{featured.country} · {featured.price} · ⭐ {featured.rating.toFixed(1)}</Text>
          <Button title="View Featured" onPress={() => router.push(`/destination/${featured.id}`)} />
        </View>
      </LinearGradient>

      <Link href="/modal" asChild>
        <Button title="Open Filters" />
      </Link>
    </View>
  );
}

