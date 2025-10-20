import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from 'react';
import { Button, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Details() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = () => {
    if (!name || !email) return alert('Please fill in all fields');

    router.back()

    
  };

  return (
     <LinearGradient
          colors={["#690707ff", "#7a1313ff", "#c91313ff"]}
          style={styles.gradient}
           >

       <ImageBackground
          source={require('../../assets/images/field.jpg')}
          style={{ flex: 1 }}
            >
    <Text style={styles.title}>   Please Suscribe to get Deals </Text> 
    <View style={styles.container}>

       
      <Text style={styles.label}>Name:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter your name"
      />

      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Enter your email"
        keyboardType="email-address"
      />

      <Button title="Submit" onPress={handleSubmit} />

      
      <TouchableOpacity style={styles.button} onPress={() => router.back()}>
        <Text style={styles.buttonText}>⬅ Go Back</Text>
      </TouchableOpacity>
      
    </View>
    </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  title: {
    position: 'absolute',
  top: 40, 
  left: 20,
  right: 20,
  fontSize: 28,
  fontWeight: "bold",
  color: "#fff",
    marginBottom: 8,
    textShadowColor: "#fff",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    
  },
  label: { fontSize: 20, marginBottom: 5 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 15,
    padding: 10,
    borderRadius: 5,
    width: 260
  },

  text: { color: "#fff", fontSize: 22, marginBottom: 10 },
  idText: { color: "#0f0", fontSize: 18, marginBottom: 10 },
  button: {
    position: 'absolute',
    top: 700, 
    left: 20,
    right: 20,
    width:140,
    backgroundColor: "#007AFF",
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "500" },
});
