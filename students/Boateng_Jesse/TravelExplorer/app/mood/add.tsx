import React, {useState} from "react"
import { View, Text, Pressable, TextInput, Button } from "react-native";
import { router } from "expo-router"
import { useMood, type Mood } from "../../lib/data/mood";


const MOODS: Mood[] = ["Happy", "Sad", "Stressed", "Relaxed", "Calm", "Tired"];

export default function AddMood() {
    const { addMood } = useMood();
    const [selected, setSelected] = useState<Mood>("Happy");
    const [note, setNote] = useState("");

    return (
        <View style={{ flex:1, padding: 16, gap: 16}}>
            <Text style={{ fontSize: 22, fontWeight: "700"}}>Add mood for today</Text>

            <Text style={{ fontWeight: "600"}}>Select a mood:</Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
                {MOODS.map((m) => (
                    <Pressable
                    key={m}
                    onPress={() => setSelected(m)}
                    style={{
                        paddingVertical: 8,
                        paddingHorizontal: 12,
                        borderRadius: 20,
                        borderWidth: 1,
                        borderColor: selected === m ? "#000" : "#ccc",
                        backgroundColor: selected === m ? "#eee" : "#fff"
                    }}
                    >
                        <Text>{m}</Text>
                    </Pressable>
                )
            )}
            </View>
            <Text style={{ fontWeight: '600'}}>Add a note (optional):</Text>
            <TextInput
            placeholder="How are you feeling today?"
            value={note}
            onChangeText={setNote}
            style={{ borderWidth: 1, borderColor: "#ddd", borderRadius: 8, padding: 10}}
            />

            <Button
            title="Save Mood"
            onPress={() => {
                addMood(selected, note);
                router.back();

            }}
            />
        </View>
    );
}