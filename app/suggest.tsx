// app/suggest.tsx
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import { useTheme } from "../theme/ThemeProvider";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xldpvgdj";

export default function SuggestScreen() {
  const { colors } = useTheme();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [stateRegion, setStateRegion] = useState("");
  const [country, setCountry] = useState("");
  const [favorite, setFavorite] = useState("");
  const [loading, setLoading] = useState(false);

  const emailOk =
    email.trim().length === 0 ||
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const canSubmit =
    !loading &&
    city.trim() &&
    country.trim() &&
    favorite.trim() &&
    emailOk;

  const submit = async () => {
    if (!canSubmit) {
      Alert.alert("One sec!", "Please complete the required fields.");
      return;
    }
    try {
      setLoading(true);

      // Send JSON to Formspree
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name || "(not provided)",
          reply_to: email || "(not provided)",
          city,
          state_or_province: stateRegion || "(not provided)",
          country,
          favorite_thing: favorite,
          _subject: "New destination suggestion from Travel Explorer",
          _honeypot: "", // spam guard
        }),
      });

      if (res.ok) {
        Alert.alert(
          "Thank you for sharing with us! Your suggestion has been received and we will respond to you as soon as possible. 🛵✨",
          undefined,
          [{ text: "OK", onPress: () => router.back() }]
        );
        // Optionally clear local state (not strictly needed if we navigate back)
        setName(""); setEmail(""); setCity(""); setStateRegion(""); setCountry(""); setFavorite("");
      } else {
        const text = await res.text().catch(() => "");
        Alert.alert("Something went wrong", text || "Please try again.");
      }
    } catch (e: any) {
      Alert.alert("Network error", e?.message || "Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.bg }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={[styles.container, { backgroundColor: colors.bg }]}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={[styles.h1, { color: colors.text }]}>Suggest a Destination</Text>
        <Text style={[styles.helper, { color: colors.muted }]}>
          Share a place you love! Fields marked * are required.
        </Text>

        {/* Name */}
        <Field
          label="Your Name"
          value={name}
          onChangeText={setName}
          placeholder="e.g., Maria Giugno"
        />

        {/* Email */}
        <Field
          label="Your Email"
          value={email}
          onChangeText={setEmail}
          placeholder="e.g., you@example.com"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          errorText={email && !emailOk ? "Please enter a valid email." : undefined}
        />

        {/* City (required) */}
        <Field
          label="City *"
          value={city}
          onChangeText={setCity}
          placeholder="e.g., Kyoto"
          required
        />

        {/* State / Province (optional) */}
        <Field
          label="State / Province"
          value={stateRegion}
          onChangeText={setStateRegion}
          placeholder="e.g., Kyoto Prefecture"
        />

        {/* Country (required) */}
        <Field
          label="Country *"
          value={country}
          onChangeText={setCountry}
          placeholder="e.g., Japan"
          required
        />

        {/* Favorite thing (required) */}
        <Field
          label="Your favorite thing to do *"
          value={favorite}
          onChangeText={setFavorite}
          placeholder="e.g., Hike Fushimi Inari and its torii gates"
          multiline
          required
        />

        <View style={{ height: 12 }} />

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Submit destination suggestion"
          onPress={submit}
          disabled={!canSubmit}
          style={({ pressed }) => [
            styles.submit,
            {
              backgroundColor: canSubmit ? colors.tint : "#A0A0A0",
              opacity: pressed ? 0.9 : 1,
            },
          ]}
        >
          <Text style={styles.submitText}>{loading ? "Submitting…" : "Submit"}</Text>
        </Pressable>

        <View style={{ height: 20 }} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

/* ---------- Small Field component ---------- */
type FieldProps = React.ComponentProps<typeof TextInput> & {
  label: string;
  required?: boolean;
  errorText?: string;
};

function Field({ label, required, errorText, style, ...props }: FieldProps) {
  const { colors } = useTheme();
  return (
    <View style={{ marginBottom: 14 }}>
      <Text style={[styles.label, { color: colors.text }]}>
        {label} {required ? <Text style={{ color: "#E11D48" }}>*</Text> : null}
      </Text>
      <TextInput
        placeholderTextColor={colors.muted}
        style={[
          styles.input,
          {
            backgroundColor: colors.card,
            color: colors.text,
            borderColor: "rgba(0,0,0,0.08)",
          },
          style,
        ]}
        {...props}
      />
      {!!errorText && <Text style={[styles.error, { color: "#E11D48" }]}>{errorText}</Text>}
    </View>
  );
}

/* ---------- Styles ---------- */
const styles = StyleSheet.create({
  container: { padding: 18 },
  h1: { fontSize: 22, fontWeight: "800", marginBottom: 6 },
  helper: { fontSize: 13, opacity: 0.9, marginBottom: 16 },
  label: { fontSize: 14, fontWeight: "700", marginBottom: 6 },
  input: {
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
  },
  error: {
    fontSize: 13,
    marginTop: 4,
    fontWeight: "500",
  },
  submit: {
    borderRadius: 14,
    alignItems: "center",
    paddingVertical: 14,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  submitText: { color: "white", fontSize: 16, fontWeight: "800" },
});
