import { Link } from "expo-router";
import { View, Text, Image, TouchableOpacity } from "react-native";
type City = {
  id: string | number;
  name: string;
  image: string;
};

type CityCardProps = {
  city: City;
};
export default function FavoriteCard({ city }: CityCardProps) {
  return (
    <View
      style={{
        flexDirection: "row",
        padding: 12,
        backgroundColor: "#fff",
        borderRadius: 10,
        marginVertical: 10,
      }}
    >
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
             <Image
        source={{ uri: city.image }}
        style={{ height: 80, width: 80, borderRadius: 10 }}
      />
      
              <View style={{ padding: 12 }}>
                
                <Text style={{ fontSize: 18, fontWeight: "600" }}>{city.name}</Text>
              </View>
            </TouchableOpacity>
          </Link>
      

      
    </View>
  );
}
