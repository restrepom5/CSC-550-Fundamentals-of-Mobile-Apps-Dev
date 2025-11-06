//src/ui/controls.tsx

import { View, Text, Pressable, ViewStyle } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Palette } from "./theme";

export function PrimaryButton({
  label,
  onPress,
  style,
}: {
  label: string;
  onPress?: () => void;
  style?: ViewStyle;
}) {
  return (
    <Pressable onPress={onPress} style={style} android_ripple={{ color: "#ffffff44" }}>
      <LinearGradient
        colors={[Palette.accent, Palette.accent2, Palette.accent3]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ paddingVertical: 14, borderRadius: 14 }}
      >
        <Text style={{ color: "#0a0a0a", textAlign: "center", fontFamily: "PoppinsSemi", fontSize: 16 }}>
          {label}
        </Text>
      </LinearGradient>
    </Pressable>
  );
}

export function Pill({ label }: { label: string }) {
  return (
    <View style={{ backgroundColor: "#ffffff22", paddingVertical: 6, paddingHorizontal: 10, borderRadius: 999 }}>
      <Text style={{ color: "#fff", fontFamily: "Poppins" }}>{label}</Text>
    </View>
  );
}

export function Segmented<T extends string>({
  options,
  value,
  onChange,
}: {
  options: T[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
      {options.map((opt) => {
        const active = opt === value;
        return (
          <Pressable
            key={opt}
            onPress={() => onChange(opt)}
            style={{
              paddingVertical: 8,
              paddingHorizontal: 12,
              borderRadius: 999,
              borderWidth: 1,
              borderColor: active ? "#ffffffcc" : "#ffffff33",
              backgroundColor: active ? "#ffffff22" : "#ffffff0f",
            }}
          >
            <Text style={{ color: "#fff", fontFamily: active ? "PoppinsSemi" : "Poppins" }}>{opt}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}
