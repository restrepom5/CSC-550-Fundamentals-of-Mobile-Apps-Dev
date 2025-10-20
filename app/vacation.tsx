import { useRouter } from "expo-router";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const vacationPackages = [
  {id: '1',title: 'Two Bedroom Suite',perks: 'Breakfast included',price: '$799', },
  {id: '2',title: 'One Bedroom Deluxe',perks: 'Ocean view, breakfast & dinner',price: '$899',},
  {id: '3',title: 'Family Package',perks: 'All meals included, water park access',price: '$1099',},
  { id: '4', title: 'Luxury Villa', perks: 'Private pool, all meals included', price: '$1499' },
  { id: '5', title: 'Mountain Cabin', perks: 'Hiking tours, breakfast included', price: '$699' },
  { id: '6', title: 'Beach Bungalow', perks: 'Oceanfront, complimentary cocktails', price: '$999' },
  { id: '7', title: 'City Escape', perks: 'Downtown hotel, museum passes', price: '$599' },
  { id: '8', title: 'Adventure Package', perks: 'Zip-lining, rafting, all meals', price: '$1299' },

];


export default function Modal() {
  const router = useRouter();
  return (
      

    <View style={styles.container}>
      


      <Text style={styles.text}>Explore Our Vacation Packages</Text>

            <FlatList
               data={vacationPackages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardPerks}>{item.perks}</Text>
            <Text style={styles.cardPrice}>{item.price}</Text>
                </View>
              )}
            />
      <TouchableOpacity style={styles.button} onPress={() => router.back()}>
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>

    </View>
   
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#08e5f5ff",
    justifyContent: "center",
    alignItems: "center",
  },
  text: { color: "#fff", fontSize: 26, fontWeight: "bold", marginBottom: 8 },
  subtext: { color: "#ccc", fontSize: 16, marginBottom: 24 },
  button: {
    backgroundColor: "#072fe4ff",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    left: -100,
    right: 20,

  },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "600" },

   title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#f2f2f2',
    marginBottom: 15,
    width:300
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  cardPerks: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
  cardPrice: {
    fontSize: 16,
    color: '#008000',
    marginTop: 8,
    fontWeight: 'bold',
  },

});
