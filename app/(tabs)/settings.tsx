import { router } from "expo-router";
import React from "react";
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type SettingOption = {
  id: string;
  title: string;
  onPress: () => void;
};

const settingsOptions = [
  { id: "1", title: "Change Username & Password", onPress: () => Alert.alert("Change credentials") },
  { id: "2", title: "Enable Two-Factor Authentication (2FA)", onPress: () => Alert.alert("2FA settings") },
  { id: "3", title: "Delete Account", onPress: () => Alert.alert("Delete account action") },
  { id: "4", title: "Change Appearance", onPress: () => Alert.alert("Appearance settings") },
  { id: "5", title: "Notifications", onPress: () => Alert.alert("Notification preferences") },
  { id: "6", title: "About This App", onPress: () => Alert.alert("App info") },
  { id: "7", title: "Notice of Privacy", onPress: () => Alert.alert("Privacy notice") },
  // I have added this two links to push back to the hoem tab anf user profile
  {id: "8", title: "Go to Profile", onPress: () => router.push("/profile")},
  {id: "9", title: "Return Home", onPress: () => router.push("/(tabs)")}
];

export default function SettingsScreen() {
  const renderItem = ({ item }: { item: SettingOption }) => (
    <TouchableOpacity style={styles.item} onPress={item.onPress}>
      <Text style={styles.title}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={settingsOptions}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={styles.separator} />}


      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f7", 
    paddingTop: 60,
  },
  item: {
    backgroundColor: "#fff",
    paddingVertical: 18,
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 16,
    color: "#000",
  },
  separator: {
    height: 1,
    backgroundColor: "#e0e0e0",
    marginLeft: 20,
  },
});
