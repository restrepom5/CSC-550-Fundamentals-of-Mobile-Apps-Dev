import { View, Text, Switch } from "react-native";
import { useState } from "react";

export default function SettingScreen() {
  const [notifications, setNotifications] = useState(true);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text
        style={{
          fontSize: 28,
          fontWeight: "800",
          marginBottom: 20,
        }}
      >
        ⚙️ Settings
      </Text>

      <View
        style={{
          backgroundColor: "#fff",
          padding: 16,
          borderRadius: 12,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          elevation: 2,
        }}
      >
        <Text style={{ fontSize: 18 }}>Enable Notifications</Text>
        <Switch
          value={notifications}
          onValueChange={setNotifications}
        />
      </View>
    </View>
  );
}
