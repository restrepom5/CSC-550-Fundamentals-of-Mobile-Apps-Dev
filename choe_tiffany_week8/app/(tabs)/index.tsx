import { StyleSheet, View } from "react-native";
import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { IconSymbol } from "@/components/ui/icon-symbol";
import {  useEffect, useState } from "react";
import { MoodBox } from "@/components/mood-box";
import { moodColors, MoodEntry, moodOptions, useMoods } from "../mood_context";

export default function HomeScreen() {
  const { moods } = useMoods();

  const [todayMood, setTodayMood] = useState<MoodEntry | undefined>(undefined);

  const isToday = (date: Date) => {
     const today = new Date();
     return (
        date.getFullYear() === today.getFullYear() &&
        date.getMonth() === today.getMonth() &&
        date.getDate() === today.getDate()
      );
  }

  useEffect(() => {
    moods.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    const match = moods.find(m => {
      return isToday(m.date);
    });
    setTodayMood(match);
  }, [moods]);

  const headerImage = todayMood ? (
    <IconSymbol
      size={200}
      color={moodColors[todayMood.mood] ?? "#808080"}
      name={(moodOptions[todayMood.mood] ?? "face.smiling")}
      style={styles.headerImage}
    />
  ) : (
    <IconSymbol
      size={200}
      color="#F59E0B"
      name="sun.max.fill"       
      style={styles.headerImage}
    />
  );

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={headerImage}
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Current Mood</ThemedText>
      </ThemedView>
      {todayMood ? (
        <MoodBox
          buttonText={todayMood.mood}
          key={todayMood.id}
          mood={todayMood}
        />
      ) : (
        <ThemedText type="defaultSemiBold">No moods saved.</ThemedText>
      )}
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Previous Moods</ThemedText>
      </ThemedView>
      <View style={styles.list}>
        {[...moods] 
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .filter(item => item.id !== todayMood?.id)
          .map((item) => {
            return (
              <MoodBox
                buttonText={item.mood}
                key={item.id}
                mood={item}
              />
            );
          })}
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    top: 50,
    left: "25%",
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  list: {
    paddingVertical: 4,
  },
});
