import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import {
  SafeAreaProvider,
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

export default function SafeAreaDemo() {
  const [showSafeArea, setShowSafeArea] = useState(true);

  return (
    <SafeAreaProvider>
      {showSafeArea ? (
        <SafeAreaDemoInner showSafeArea={showSafeArea} setShowSafeArea={setShowSafeArea} />
      ) : (
        <SafeAreaDemoInner showSafeArea={showSafeArea} setShowSafeArea={setShowSafeArea} />
      )}
    </SafeAreaProvider>
  );
}

function SafeAreaDemoInner({
  showSafeArea,
  setShowSafeArea,
}: {
  showSafeArea: boolean;
  setShowSafeArea: (v: boolean) => void;
}) {
  const insets = useSafeAreaInsets();
  const [text, setText] = useState("");

  const Container = showSafeArea ? SafeAreaView : View;

  return (
    <Container style={[styles.container, { backgroundColor: "#111" }]}>
      {/* Visual inset indicators */}
      <View
        style={[
          styles.overlayTop,
          { height: insets.top, backgroundColor: "rgba(255,0,0,0.4)" },
        ]}
      />
      <View
        style={[
          styles.overlayBottom,
          { height: insets.bottom, backgroundColor: "rgba(0,255,0,0.4)" },
        ]}
      />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title}>🧭 Safe Area Visualizer</Text>
          <Text style={styles.subtitle}>
            Top inset: {Math.round(insets.top)} | Bottom inset:{" "}
            {Math.round(insets.bottom)}{"\n"}Left: {Math.round(insets.left)} | Right:{" "}
            {Math.round(insets.right)}
          </Text>

          <View style={styles.demoBox}>
            <Text style={styles.boxText}>
              {showSafeArea
                ? "SafeAreaView is ACTIVE ✅"
                : "SafeAreaView is DISABLED ❌"}
            </Text>
          </View>

          <TextInput
            style={styles.input}
            placeholder="Tap here to open keyboard"
            placeholderTextColor="#aaa"
            value={text}
            onChangeText={setText}
          />

          <TouchableOpacity
            onPress={() => setShowSafeArea(!showSafeArea)}
            style={[
              styles.toggleButton,
              {
                backgroundColor: showSafeArea ? "#E74C3C" : "#27AE60",
              },
            ]}
          >
            <Text style={styles.toggleText}>
              {showSafeArea ? "Disable SafeAreaView" : "Enable SafeAreaView"}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { flexGrow: 1, justifyContent: "center", padding: 20 },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    color: "#ccc",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30,
    lineHeight: 22,
  },
  demoBox: {
    height: 120,
    backgroundColor: "#333",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  boxText: { color: "#fff", fontSize: 18, fontWeight: "600", textAlign: "center" },
  input: {
    backgroundColor: "#222",
    color: "#fff",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 30,
  },
  toggleButton: {
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 10,
  },
  toggleText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 16,
  },
  overlayTop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  overlayBottom: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
});
