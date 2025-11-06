import { StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/themed-text";
import { Fonts } from "@/constants/theme";
import { MoodEntry } from "@/src/context/mood_context";

type Props = {
  mood?: MoodEntry;
  buttonText: string;
};  

export function MoodBox({ mood, buttonText }: Props) {
  return (
    <View
      style={styles.box}
    >
      <ThemedText
        type="subtitle"
        style={[styles.boxText, { fontFamily: Fonts.rounded }]}
      >
        {`Mood: ${buttonText}`}
      </ThemedText>
        <ThemedText
        type="subtitle"
        style={[styles.boxText, { fontFamily: Fonts.rounded }]}
      >
        {`Date: ${mood?.date.toDateString()}`}
      </ThemedText>
      <ThemedText
        type="subtitle"
        style={[styles.boxText, { fontFamily: Fonts.rounded }]}
      >
        {`Note: ${mood?.note ?? "No additional notes."}`}
      </ThemedText>
    </View>
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
