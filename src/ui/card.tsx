//src/ui/card.tsx

import { ReactNode } from "react";
import { View } from "react-native";

export function Card({ children }: { children: ReactNode }) {
  return (
    <View
      style={{
        backgroundColor: "#ffffff14",
        borderColor: "#ffffff22",
        borderWidth: 1,
        padding: 14,
        borderRadius: 16,
        gap: 6,
      }}
    >
      {children}
    </View>
  );
}
