import React from "react";
import { View, Text, Image, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

type DestinationCardProps = {
  id: string;
  name: string;
  country: string;
  image: string;
  rating: number;
  price: string;
  isFav?: boolean;
  onToggleFav?: () => void;
};

export default function DestinationCard({
  id,
  name,
  country,
  image,
  rating,
  price,
  isFav = false,
  onToggleFav,
}: DestinationCardProps) {
  const router = useRouter();

  return (
    <Pressable
      onPress={() => router.push(`/destination/${id}`)}
      style={({ pressed }) => ({
        backgroundColor: "#fff",
        borderRadius: 16,
        marginBottom: 16,
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 2,
        overflow: "hidden",
        opacity: pressed ? 0.9 : 1, // 🫧 subtle feedback
      })}
    >
      {/* Image with error logging + fallback bg */}
      <Image
        source={{ uri: image }}
        style={{ width: "100%", height: 170, backgroundColor: "#ddd" }}
        resizeMode="cover"
        onError={() => console.warn("Image failed to load:", image)}
      />

      {/* Heart (favorites) button */}
      <View style={{ position: "absolute", top: 10, right: 10 }}>
        <Pressable
          onPress={(e) => {
            e.stopPropagation();
            onToggleFav?.();
          }}
          hitSlop={10}
          style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
        >
          <Ionicons name={isFav ? "heart" : "heart-outline"} size={22} />
        </Pressable>
      </View>

      {/* Text content */}
      <View style={{ padding: 12, gap: 6 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "700" }}>{name}</Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
            <Ionicons name="star" size={16} />
            <Text>{rating.toFixed(1)}</Text>
          </View>
        </View>

        {/* 📍 Location icon beside country + price */}
        <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
          <Ionicons name="location-outline" size={14} />
          <Text style={{ color: "#666" }}>
            {country} · {price}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

