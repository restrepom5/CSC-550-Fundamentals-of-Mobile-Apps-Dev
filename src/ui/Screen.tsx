// src/ui/Screen.tsx
import { ReactNode } from "react";
import { View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { useSafeAreaInsets, SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "./theme";

export function Screen({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  const insets = useSafeAreaInsets();
  const { palette } = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: palette.bg }}>
      {/* Abstract blobs */}
      <View style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 0 }} pointerEvents="none">
        <LinearGradient
          colors={[`${palette.bg1}33`, `${palette.bg2}33`]}
          start={{ x: 0.1, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ position: "absolute", width: 420, height: 420, borderRadius: 300, top: -80, left: -60 }}
        />
        <LinearGradient
          colors={[`${palette.bg2}33`, `${palette.bg1}22`]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ position: "absolute", width: 520, height: 520, borderRadius: 300, bottom: -140, right: -100 }}
        />
        <BlurView intensity={40} tint="dark" style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 0 }} />
      </View>

      <SafeAreaView edges={["top", "left", "right"]} style={{ flex: 1 }}>
        <View style={{ flex: 1, paddingHorizontal: 18, paddingTop: insets.top + 20 }}>
          <Text style={{ color: palette.text, fontFamily: "PoppinsBold", fontSize: 28, lineHeight: 34 }}>
            {title}
          </Text>

          {subtitle ? (
            <Text
              style={{
                color: palette.text,
                opacity: 0.85,
                marginTop: 6,
                fontFamily: "Poppins",
                fontSize: 14,
              }}
            >
              {subtitle}
            </Text>
          ) : null}

          <View style={{ marginTop: 16, gap: 12, flex: 1 }}>{children}</View>
        </View>
      </SafeAreaView>
    </View>
  );
}
