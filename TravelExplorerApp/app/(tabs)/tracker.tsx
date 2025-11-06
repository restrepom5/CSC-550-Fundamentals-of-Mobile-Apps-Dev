import { LinearGradient } from "expo-linear-gradient";
import { Link, useRouter, useLocalSearchParams } from "expo-router";
import React, { useRef, useEffect, useState } from "react";
import {SafeAreaView} from 'react-native-safe-area-context';
import { useNavigation, StackActions, useRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import {state} from "../modal";
import {
  Animated,
  Button,
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

/*
Used the following for help:
https://reactnavigation.org/docs/params/#passing-params-to-a-previous-screen
https://react-native-async-storage.github.io/async-storage/docs/usage
*/
const { width } = Dimensions.get("window");
type LogItem = {
      id: string;
      mood: string;
      log: string;
      timestamp: string;
    };

export default function Tracker() {

    const router = useRouter();
    //const route = useRoute();

    const { entry } = useLocalSearchParams();
    const [logs, setLogs] = useState<LogItem[]>([]);

    useEffect(() => {
        (async () => {
          try {
            const stored = await AsyncStorage.getItem("moodLogs");
            if (stored) {
                setLogs(JSON.parse(stored));
                }
          } catch (e) {
            console.error("Failed to load mood logs", e);
          }
        })}, []);

    useEffect(() => {
        if (entry) {
            try {
                const parsed = JSON.parse(String(entry)) as { mood?: string; log?: string };
                setLogs((last) => {
                    const updated: LogItem[] = [
                        ...last,
                            {
                            id: Date.now().toString(),
                            mood: parsed.mood,
                            log: parsed.log,
                            timestamp: new Date().toLocaleString(),
                            },
                    ];
                    AsyncStorage.setItem("moodLogs", JSON.stringify(updated)).catch(() => {});
                    return updated;
                    });
                } catch (err) {
                console.warn("Could not parse entry:", err);
                }
            }
    }, [entry]);

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Mood Tracker</Text>
            <Text style={styles.text}>This is your mood tracker. Click on "Add Current Mood" to start your log.</Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => router.push("/modal")}>
                <Text style={styles.buttonText}>Add Current Mood</Text>
            </TouchableOpacity>
                <Text style={styles.text}>Mood History</Text>
                {log && (
                <View style={styles.entryBox}>
                    <Text style={styles.entryMood}>Mood: {item.mood}</Text>
                    <Text style={styles.entryText}>Note: {item.log}</Text>}
                    <Text style={styles.entryDate}>{item.timestamp}</Text>
                </View>
                )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
        },
    container: {
        flex: 1,
        //justifyContent: "center",
        //alignItems: "center",
        padding: 20,
        backgroundColor:"#111",
        },
    title: {
        fontSize: 28,
        fontWeight: "700",
        color: "#fff",
        textAlign: "center",
        marginBottom: 8,
        textShadowColor: "#fff",
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 10,
        },
    text: {
        color: "#a3b18a",
        fontSize: 18,
        marginBottom: 20,
        marginTop: 20,
        },
    subtitle: {
        fontSize: 16,
        color: "#aaa",
        marginBottom: 35,
        textAlign: "center",
        },
    button: {
        backgroundColor: "#3a5a40",
        width: width * 0.85,
        paddingVertical: 15,
        borderRadius: 10,
        marginVertical: 8,
        },
    buttonText: {
        color: "#DAD7CD",
        fontSize: 18,
        fontWeight: "600",
        textAlign: "center",
        },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        },
    });