import { View, Text, Image, TouchableOpacity } from "react-native";
import { Link, router } from "expo-router";
import Animated, { FadeInUp } from "react-native-reanimated";
type City = {
  id: string | number;
  name: string;
  image: string;
};

type CityCardProps = {
  city: City;
};

export default function CityCard({ city }: CityCardProps) {
  return (
    <Link href={`/city/${city.id}`} asChild>
      
      <TouchableOpacity
        style={{
          margin: 16,
          backgroundColor: "#fff",
          borderRadius: 12,
          overflow: "hidden",
          elevation: 2,
        }}
      >
        <Image source={{ uri: city.image }} style={{ height: 180 }} />

        <View style={{ padding: 12 }}>
          
          <Text style={{ fontSize: 18, fontWeight: "600" }}>{city.name}</Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
}
