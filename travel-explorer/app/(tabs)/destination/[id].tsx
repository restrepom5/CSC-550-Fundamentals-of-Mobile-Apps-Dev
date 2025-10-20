import { useLocalSearchParams } from "expo-router";
import { View, Text, Image, StyleSheet } from "react-native";

export default function DestinationDetail() {
  const { id, name, desc } = useLocalSearchParams();

  let imageSource;

  switch (id) {
    case "1":
      imageSource = require("../../../assets/images/greece.jpg");
      break;
    case "2":
      imageSource = require("../../../assets/images/kyoto.jpg");
      break;
    case "3":
      imageSource = require("../../../assets/images/machu.webp");
      break;
    case "4":
      imageSource = require("../../../assets/images/venice.jpg");
      break;
    default:
      imageSource = require("../../../assets/images/art.jpg");
      break;
  }

  return (
    <View style={styles.container}>
      <Image source={imageSource} style={styles.image} resizeMode="cover" />
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.description}>{desc}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: "transparent",
  },
  image: {
    width: "100%",
    height: 250,
    borderRadius: 12,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#blue",
    textAlign: "center",
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
  },
  description: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
    marginTop: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 15,
    borderRadius: 8,
  },
});
