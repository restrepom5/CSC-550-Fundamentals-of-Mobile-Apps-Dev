import { Picker } from "@react-native-picker/picker";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Button, Dimensions, ImageBackground, StyleSheet, Text, TextInput, View } from "react-native";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { addMood } from "../store/moodslice";
const { width, height } = Dimensions.get("window");
export default function AddMood() {
  const [mood, setMood] = useState("");
  const [note, setNote] = useState("");
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const saveMood = () => {
    dispatch(
      addMood({
        mood,
        note,
        date: new Date().toLocaleDateString(),    //This is put the date on my screen
      })
    );
    router.back(); // once the mood has been saved i can go back to the collection of mooods.
  };

  return (
    <LinearGradient colors={["#0f0f0f", "#181818", "#111"]} style={styles.gradient}>
       <ImageBackground source={require("../../assets/images/bgphone3.jpg")} style={{ flex: 1 }}>
    <View style={styles.container}>
      <Text style={styles.title}>Add Mood</Text>
      
      
      <View style={styles.options}>
      <Text style={styles.label}>Select your mood:</Text>
      <Picker selectedValue={mood} onValueChange={(value) => setMood(value)}>
        <Picker.Item label="😃 Happy" value="😃 Happy" />
        <Picker.Item label="😔 Sad" value="Sad" />
        <Picker.Item label="🙂 Calm" value="Calm" />
        <Picker.Item label="🫩 Tired" value="Tired" />
        <Picker.Item label="😡 Angry" value="Angry" />
        <Picker.Item label="🥱 Sleepy" value="Sleepy" />
         <Picker.Item label="🤒 Sick" value="Sick" />
      </Picker>

      <Text style={styles.label}>Add a note (optional):</Text>
      <TextInput
        style={styles.input}
        value={note}
        onChangeText={setNote}
        placeholder="How is your mood today?"
      />
      </View>
     
      <View style={styles.back}>
             <Button
              title="Click to save Mood"
               color="#FF9500"
              onPress={saveMood}
            />
            </View>

    </View>
    </ImageBackground>
  </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, },
  title: { top: 5,
    left: 125,
    right: 30,
    fontSize: 29,
    fontWeight: "bold",
    color: "#494805ff",
    textShadowColor: "#fff",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10, },
  label: { marginTop: 10,
    alignItems: "center", position:"relative",
   fontSize: 18,
  fontWeight: "bold",
  
  },
  input: {
    borderWidth: 1,
    borderColor: "#180404ff",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  gradient: {
    flex: 1,
  },
   back:{
    position: "absolute",
    top: height * 0.40, 
    alignItems: "center",
    width: "100%",
  },
  options:{
    
top: height * 0.08, 
    
  }
});
