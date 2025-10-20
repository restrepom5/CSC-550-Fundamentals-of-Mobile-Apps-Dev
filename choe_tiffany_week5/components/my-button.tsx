import { Pressable, StyleSheet } from "react-native";
import { ThemedText } from "@/components/themed-text";
import { Fonts } from "@/constants/theme";

type Location = {
  id: string;
  label: string;
}

type Props = {
  location?: Location;
  onLocationPress: (item?:Location) => void;
  buttonText: string;
};

export function MyButton({ location, onLocationPress, buttonText }: Props) {
  return (
    <Pressable
      onPress={() => onLocationPress(location)}
      style={({ pressed }) => [styles.box, pressed && styles.boxPressed]}
    >
      <ThemedText
        type="subtitle"
        style={[styles.boxText, { fontFamily: Fonts.rounded }]}
      >
        {buttonText}
      </ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  box: {
    marginVertical: 6,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: "#fff",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(0,0,0,0.12)",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    alignItems: "center",
    justifyContent: "center",
  },
  boxPressed: {
    opacity: 0.95,
    transform: [{ scale: 0.99 }],
  },
  boxText: {
    textAlign: "center",
  },
});
