import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Button, Dimensions, FlatList, ImageBackground, StyleSheet, Text, View, } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../store"; //from here I can use it to store the data
const { width, height } = Dimensions.get("window");

export default function MoodTracker() {
  const moods = useSelector((state: RootState) => state.moods.moods);
  const router = useRouter();
  const today = new Date().toLocaleDateString();
  
  return (
    <LinearGradient colors={["#0f0f0f", "#181818", "#111"]} style={styles.gradient}>
      <ImageBackground source={require("../../assets/images/bgphone.jpg")} style={{ flex: 1 }}>
        <View style={styles.container}>
           <Text style={styles.title}>Mood Tracker</Text>
         
      <View style={styles.buttonGroup}>

     

      <FlatList
        data={moods}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View >
            <Text style={styles.datadisplay}>{item.date} — {item.mood}</Text>
            {item.note ? <Text>Note: {item.note}</Text> : null}
          </View>
        )}
        ListEmptyComponent={<Text>No moods has been added </Text>}
      />

      <Button
        title="Add Current Mood"
         color="#FF9500"
        onPress={() => router.push("/moodtrack/addmod")}
      />
      <View style={styles.back}>
       <Button
        title="Go Back"
         color="#3700ffff"
        onPress={() => router.back()}
      />
      </View>
      </View>
      
       <Text style={styles.date}>Today: {today}</Text>
      </View>
      </ImageBackground>
    </LinearGradient>
  );
}

 


const styles = StyleSheet.create({


  container: { flex: 1},
  title: { position: "absolute",
    top: 100,
    left: 110,
    right: 30,
    fontSize: 29,
    fontWeight: "bold",
    color: "#494805ff",
    textShadowColor: "#fff",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,},

  date: { marginBottom: 20,
    fontSize: 29,
    fontWeight: "bold",
    color: "#494805ff",
    textShadowColor: "#fff",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
   },
  
  gradient: {
    flex: 1,
  },
   buttonGroup: {
    position: "absolute",
    top: height * 0.40, 
    alignItems: "center",
    width: "100%",
  },
  back:{
    position: "absolute",
    top: height * 0.40, 
    alignItems: "center",
    width: "100%",
  },

  datadisplay:{
    fontSize: 29,
    fontWeight: "bold",
    color: "#494805ff",
   
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
    
   

  }
});
