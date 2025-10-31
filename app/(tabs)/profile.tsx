import { View, Text } from "react-native";

export default function ProfileScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 24, fontWeight: "800" }}>Profile</Text>
      <Text style={{ color: "#666", marginTop: 6 }}>User: Peter Chinedu Chukwu</Text>
    </View>
  );
}
