// app/(tabs)/index.tsx
import { View, Text, Pressable } from "react-native";
import { Link } from "expo-router";
import { Screen } from "../../src/ui/Screen";
import { PrimaryButton } from "../../src/ui/controls";
import { useTheme } from "../../src/ui/theme";

function ThemeToggle() {
  const { mode, setMode, palette } = useTheme();
  const isLight = mode === "light";

  return (
    <View
      style={{
        alignSelf: "flex-end",
        flexDirection: "row",
        borderRadius: 999,
        borderWidth: 1,
        borderColor: "#ffffff22",
        backgroundColor: "#ffffff14",
        overflow: "hidden",
        marginBottom: 8,
      }}
    >
      <Pressable
        onPress={() => setMode("light")}
        style={{
          paddingVertical: 8,
          paddingHorizontal: 12,
          backgroundColor: isLight ? palette.card : "transparent",
        }}
      >
        <Text style={{ color: isLight ? palette.text : "#D8DEE9", fontFamily: "PoppinsSemi" }}>☀️ Light</Text>
      </Pressable>
      <Pressable
        onPress={() => setMode("dark")}
        style={{
          paddingVertical: 8,
          paddingHorizontal: 12,
          backgroundColor: !isLight ? palette.card : "transparent",
        }}
      >
        <Text style={{ color: !isLight ? palette.text : "#D8DEE9", fontFamily: "PoppinsSemi" }}>🌙 Dark</Text>
      </Pressable>
    </View>
  );
}

export default function Home() {
  const todayPretty = new Date().toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Screen title="Mood Tracker" subtitle="Track how you feel, every day.">
      {/* Theme switcher */}
      <ThemeToggle />

      {/* How are you today, date, and rainbow add button */}
      <Text
        style={{
          color: "#fff",
          fontFamily: "PoppinsBold",
          fontSize: 24,
          marginTop: 8,
          marginBottom: 4,
        }}
      >
        How are you today?
      </Text>
      <Text style={{ color: "#D8DEE9", fontFamily: "Poppins", marginBottom: 12 }}>
        Today • {todayPretty}
      </Text>

      <Link href="/mood/add" asChild>
        <PrimaryButton label="Add Current Mood" />
      </Link>
    </Screen>
  );
}
