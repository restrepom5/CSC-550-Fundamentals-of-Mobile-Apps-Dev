// app/mood/add.tsx
import { useState, useCallback, Dispatch, SetStateAction } from "react";
import { Stack, useRouter, useFocusEffect } from "expo-router";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Screen } from "../../../src/ui/Screen";                 
import { useMood, MoodEntry } from "../../../src/mood/MoodContext";

function getLocalDateISO(d = new Date()) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}


type PrimaryButtonProps = {
  label: string;
  onPress?: () => void;
  style?: any;
};

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ label, onPress, style }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      style={[
        {
          backgroundColor: "#5A67D8",
          paddingVertical: 12,
          paddingHorizontal: 16,
          borderRadius: 12,
          alignItems: "center",
        },
        style,
      ]}
    >
      <Text style={{ color: "#fff", fontFamily: "PoppinsSemi" }}>{label}</Text>
    </TouchableOpacity>
  );
};

type SegmentedProps<T extends string> = {
  options: T[];
  value: T;
  onChange: Dispatch<SetStateAction<T>>;
};

function Segmented<T extends string>({ options, value, onChange }: SegmentedProps<T>) {
  return (
    <View style={{ flexDirection: "row" }}>
      {options.map((opt, idx) => (
        <TouchableOpacity
          key={opt}
          onPress={() => onChange(opt)}
          activeOpacity={0.8}
          style={{
            paddingVertical: 8,
            paddingHorizontal: 12,
            borderRadius: 12,
            backgroundColor: value === opt ? "#ffffff20" : "transparent",
            borderWidth: 1,
            borderColor: "#ffffff33",
            marginRight: idx === options.length - 1 ? 0 : 8,
          }}
        >
          <Text style={{ color: "#fff", fontFamily: "Poppins" }}>{opt}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const MOODS: MoodEntry["mood"][] = ["Happy", "Sad", "Stressed", "Relaxed", "Calm", "Tired"];

export default function AddMood() {
  const router = useRouter();
  const { addMood } = useMood();
  const [mood, setMood] = useState<MoodEntry["mood"]>("Happy");
  const [note, setNote] = useState("");

  
  useFocusEffect(
    useCallback(() => {
      setMood("Happy");
      setNote("");
    }, [])
  );

  const save = () => {
    const todayISO = getLocalDateISO();
    addMood({ dateISO: todayISO, mood, note: note.trim() || undefined });

    
    setMood("Happy");
    setNote("");

    router.replace("/mood");
  };

  return (
    <Screen title="Add Mood" subtitle="Select a mood and add a note.">
      <Stack.Screen options={{ headerShown: false }} />

      <View style={{ gap: 16 }}>
        <Text style={{ color: "#fff", fontFamily: "PoppinsSemi", fontSize: 16 }}>Select your mood</Text>
        <Segmented options={MOODS} value={mood} onChange={setMood} />

        <Text style={{ color: "#fff", fontFamily: "PoppinsSemi", fontSize: 16, marginTop: 6 }}>Add a note</Text>
        <TextInput
          placeholder="Type something…"
          placeholderTextColor="#ffffff88"
          value={note}
          onChangeText={setNote}
          multiline
          style={{
            borderWidth: 1,
            borderColor: "#ffffff33",
            borderRadius: 14,
            padding: 12,
            minHeight: 96,
            color: "#fff",
            fontFamily: "Poppins",
            backgroundColor: "#ffffff14",
          }}
        />

        <PrimaryButton label="Save Mood" onPress={save} style={{ marginTop: 8 }} />
      </View>
    </Screen>
  );
}
