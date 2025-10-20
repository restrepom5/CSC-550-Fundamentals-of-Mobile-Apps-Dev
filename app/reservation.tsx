import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Pushed() {
  const router = useRouter();

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [destination, setDestination] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [adults, setAdults] = useState("");
  const [kids, setKids] = useState("");
  const [beds, setBeds] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [roomType, setRoomType] = useState("standard");
  const [smoking, setSmoking] = useState(false);
  const [specialRequest, setSpecialRequest] = useState("");

  const handleSubmit = () => {
    if (
      !name ||
      !email ||
      !phone ||
      !destination ||
      !fromDate ||
      !toDate ||
      !adults ||
      !beds ||
      !bathrooms
    ) {
      Alert.alert("Error", "Missing a  required fields.");
      return;
    }

    Alert.alert("Success", "Congratulations! Your reservation has been booked.");
    // Reset
    setName("");
    setEmail("");
    setPhone("");
    setDestination("");
    setFromDate("");
    setToDate("");
    setAdults("");
    setKids("");
    setBeds("1");
    setBathrooms("1");
    setRoomType("standard");
    setSmoking(false);
    setSpecialRequest("");
  };

  return (
    <ImageBackground
      source={{
        uri: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e", 
      }}
      style={styles.background}
      resizeMode="cover"
    >
      
      <TouchableOpacity style={styles.goBackButton} onPress={() => router.back()}>
        <Text style={styles.goBackText}>⬅ Go Back</Text>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.text}>Travel Reservation Form</Text>

        <TextInput
          style={styles.input}
          placeholder="Full Name"
          placeholderTextColor="#ccc"
          value={name}
          onChangeText={setName}
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#ccc"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          placeholderTextColor="#ccc"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
        />

        <TextInput
          style={styles.input}
          placeholder="Destination"
          placeholderTextColor="#ccc"
          value={destination}
          onChangeText={setDestination}
        />

        <TextInput
          style={styles.input}
          placeholder="From Date (MM-DD-YYYY)"
          placeholderTextColor="#ccc"
          value={fromDate}
          onChangeText={setFromDate}
        />

        <TextInput
          style={styles.input}
          placeholder="To Date (MM-DD-YYYY)"
          placeholderTextColor="#ccc"
          value={toDate}
          onChangeText={setToDate}
        />

        <TextInput
          style={styles.input}
          placeholder="Number of Adults"
          placeholderTextColor="#ccc"
          value={adults}
          onChangeText={setAdults}
          keyboardType="numeric"
        />

        <TextInput
          style={styles.input}
          placeholder="Number of Kids"
          placeholderTextColor="#ccc"
          value={kids}
          onChangeText={setKids}
          keyboardType="numeric"
        />

        <TextInput
          style={styles.input}
          placeholder="Number of Beds"
          placeholderTextColor="#ccc"
          value={beds}
          onChangeText={setBeds}
          keyboardType="numeric"
        />

        <TextInput
          style={styles.input}
          placeholder="Number of Bathrooms"
          placeholderTextColor="#ccc"
          value={bathrooms}
          onChangeText={setBathrooms}
          keyboardType="numeric"
        />

        <View style={styles.pickerWrapper}>
          <Text style={styles.pickerLabel}>Room Preference:</Text>
          <Picker
            selectedValue={roomType}
            style={styles.picker}
            dropdownIconColor="#fff"
            onValueChange={(itemValue) => setRoomType(itemValue)}
          >
            <Picker.Item label="Suite" value="suite" />
            <Picker.Item label="Deluxe" value="deluxe" />
            <Picker.Item label="Standard" value="standard" />
          </Picker>
        </View>

        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Smoking Room?</Text>
          <Switch
            value={smoking}
            onValueChange={setSmoking}
            thumbColor={smoking ? "#34C759" : "#ccc"}
          />
        </View>

        <TextInput
          style={[styles.input, { height: 100 }]}
          placeholder="Special Requests"
          placeholderTextColor="#ccc"
          value={specialRequest}
          onChangeText={setSpecialRequest}
          multiline
        />

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit Reservation</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  goBackButton: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 10,
    backgroundColor: "#072fe4ff",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  goBackText: {
    color: "#fff",
    fontSize: 16,
  },
  container: {
    flexGrow: 1,
    
    padding: 20,
    paddingTop: 100, 
  },
  text: {
    color: "#fff",
    fontSize: 24,
    marginBottom: 25,
    textAlign: "center",
    fontWeight: "600",
  },
  input: {
    backgroundColor: "#2c2c2e",
    color: "#fff",
    width: "100%",
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: "#34C759",
    padding: 14,
    borderRadius: 10,
    width: "100%",
    marginBottom: 40,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "500",
    textAlign: "center",
  },
  pickerWrapper: {
    marginBottom: 15,
  },
  pickerLabel: {
    color: "#ccc",
    marginBottom: 5,
    fontSize: 16,
  },
  picker: {
    backgroundColor: "#2c2c2e",
    color: "#fff",
    borderRadius: 8,
  },
  switchRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    justifyContent: "space-between",
  },
  switchLabel: {
    color: "#fff",
    fontSize: 16,
  },
});
