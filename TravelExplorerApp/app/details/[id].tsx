import { useLocalSearchParams, useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {SafeAreaView} from 'react-native-safe-area-context';
import museumAddresses from "../../assets/museumAddresses.json";

export default function Details() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const matchThis = Number(Object.values({id}).join(''));

    const match = museumAddresses.filter(museum => museum.id === matchThis);
    const museumName = match.map(item => item.original_Name);
    const address = match.map(item => item.formatted)

    const listName = [];

    for (let i=0; i < match.length; i++) {
        listName.push(
            <View key={i} style={styles.card}>
                <Text style={styles.text}>{museumName[i]}</Text>
                <Text style={styles.idText}>{address[i]}</Text>
            </View>
            )
        };
    listName.push(
        <SafeAreaView>
              <View key={"back"} >
                  <TouchableOpacity style={styles.button} onPress={() => router.back()}>
                    <Text style={styles.buttonText}>⬅ Go Back</Text>
                  </TouchableOpacity>
              </View>
        </SafeAreaView>
        )


    return (
        <View style={styles.container}>
            <ScrollView>
                {listName}
            </ScrollView>
        </View>
    );

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#111",
        padding: 20,
        },
    card: {
        backgroundColor: "#1c1c1e",
        borderRadius: 10,
        padding: 20,
        marginVertical: 6,
      },
    text: {
        color: "#dad7cd",
        fontSize: 22,
        marginBottom: 10
        },
    idText: {
        color: "#a3b18a",
        fontSize: 18,
        marginBottom: 20
        },
    button: {
        backgroundColor: "#3a5a40",
        paddingVertical: 14,
        paddingHorizontal: 24,
        borderRadius: 10,
    },
    buttonText: {
        color: "#dad7cd",
        fontSize: 18,
        fontWeight: "600",
        },
    });