import { Link, useRouter, useLocalSearchParams } from "expo-router";
import React, { useRef, useEffect, useState } from "react";
import {SafeAreaView} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Button,
  Dimensions,
  FlatList,
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
https://devcodelight.com/en/load-a-flatlist-from-the-end-to-display-a-chat-in-react-native/
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
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };

    const { entry } = useLocalSearchParams();
    const [logs, setLogs] = useState<LogItem[]>([]);

    //for updating the log history
    useEffect(() => {
        (async () => {
          try {
            const stored = await AsyncStorage.getItem("moodLogs");
            if (stored) {
                setLogs(JSON.parse(stored));
                }
          } catch (err) {
            console.error("Failed to load mood logs", err);
          }
        })}, []);

    //for getting the new log entry and setting it
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
                            timestamp: new Date().toLocaleString(undefined, options),
                            },
                    ];
                console.log(updated);
                    AsyncStorage.setItem("moodLogs", JSON.stringify(updated)).catch(() => {});
                    return updated;
                    });
                } catch (err) {
                console.warn("Could not parse entry:", err);
                }
            }
    }, [entry]);


    //clean the screen
    const removeValue = async () => {
      try {
        await AsyncStorage.removeItem('moodLogs');
      } catch(err) {
        console.warn("Couldn't remove logs", err);
        setLogs([]);
      }}


    return (
            <SafeAreaView style={styles.container}>
                <Text style={styles.title}>Mood Tracker</Text>
                <Text style={styles.subtext}>Today's Date: {new Date().toLocaleString(undefined,options)}</Text>
                <Text style={styles.text}>This is your mood tracker. Click on "Add Current Mood" to start your log.</Text>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => router.push("/modal")}>
                    <Text style={styles.buttonText}>Add Current Mood</Text>
                </TouchableOpacity>
                    <Text style={styles.text}>Mood History</Text>
                    <FlatList
                    inverted
                    data = {logs}
                    keyExtractor = {(item) => item.id}
                    renderItem = {({item}) => (
                        <View style={styles.entryBox}>
                            <Text style={styles.subtext}>Mood: {item.mood}</Text>
                            <Text style={styles.subtext}>Note: {item.log}</Text>
                            <Text style={styles.subtext}>{item.timestamp}</Text>
                            <Text style={styles.subtext}>=============================================</Text>
                        </View>
                        )}
                    />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={removeValue}>
                        <Text style={styles.buttonText}>Clear All Logs</Text>
                    </TouchableOpacity>
            </SafeAreaView>
        );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    subtext: {
        fontSize: 16,
        color: "#DAD7CD",
        marginBottom: 10,
        textAlign: "left",
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
    });