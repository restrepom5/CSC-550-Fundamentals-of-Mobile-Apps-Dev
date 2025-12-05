import { Dimensions, Platform, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Image, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useMemo, useState, useContext, memo, useEffect, useCallback } from 'react';
import { GameContext } from '../_layout';
import LottieView from 'lottie-react-native';

export default function Missions() {
  const context = useContext(GameContext);
  if (!context) return null;
  const { score, setScore, taps, setTaps } = context;
  const [mission1Text, setMission1Text] = useState(`In Progress`);
  const [mission2Text, setMission2Text] = useState("In Progress");
  const [mission3Text, setMission3Text] = useState(`In Progress`);
  const [mission1Completed, setMission1Completed] = useState(false);
  const [mission2Completed, setMission2Completed] = useState(false);
  const [mission3Completed, setMission3Completed] = useState(false);

  let missionData = useMemo(() =>[
    { id: 1, text: `Tap the pc 10 times!  ${taps}/10`, image: require('../../assets/images/mouse.png'), completed: mission1Completed, score: 50, tapsRequired: 10, progressText: mission1Text },
    { id: 2, text: `Tap the pc 100 times!  ${taps}/100`, image: require('../../assets/images/ram.png'), completed: mission2Completed, score: 50, tapsRequired: 100, progressText: mission2Text },
    { id: 3, text: `Tap the pc 1000 times!  ${taps}/1000`, image: require('../../assets/images/keyboard.png'), completed: mission3Completed, score: 50, tapsRequired: 1000, progressText: mission3Text },
  ], [mission1Text, mission2Text, mission3Text, taps, mission1Completed, mission2Completed, mission3Completed]); 

  const handlePress = useCallback((id: number, completed: boolean, scoreIncrease: number, progressText: string) => {
    if (completed && progressText !== "Reward Claimed") {
      setScore(score + scoreIncrease);
      if (id === 1) {
        setMission1Text("Reward Claimed");
      } else if (id === 2) {
        setMission2Text("Reward Claimed");
      } else if (id === 3) {
        setMission3Text("Reward Claimed");
      }
    }
    }, [])

  useEffect(() => {
    if (taps >= missionData[0].tapsRequired && !missionData[0].completed) {
      setMission1Completed(true);
      setMission1Text("Completed");
    }
    if (taps >= missionData[1].tapsRequired && !missionData[1].completed) {
    setMission2Completed(true);
    setMission2Text("Completed");
    }
    if (taps >= missionData[2].tapsRequired && !missionData[2].completed) {
      setMission3Completed(true);
      setMission3Text("Completed");
    }
    }, [taps, missionData]);

  return (
    <ThemedView style={{ flex: 1 }}>
      <LottieView
        source={require('../../assets/animations/Gradient Animated Background.json')}
        autoPlay
        loop
        style={styles.background}
      />
      <SafeAreaView style={styles.container}>
        <ThemedView style={styles.container}>
          <ThemedText type="title" style={styles.title}>Missions</ThemedText>
          {missionData.map(item => (
            <ThemedView key={item.id} style={ styles.bar }>
              <Image
                source={item.image}
                style={ styles.missionIcon }
              />
              <ThemedText style={styles.text}>{item.text}</ThemedText>
              <Pressable onPress={() => handlePress(item.id, item.completed, item.score, item.progressText)} style={({ pressed }) => [styles.missionButton, pressed && styles.buttonPressed]}>
                <ThemedText style={styles.buttonText}>{item.progressText}</ThemedText>
              </Pressable>
            </ThemedView>
          ))}
        </ThemedView>
      </SafeAreaView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    
  },
  title: {
    fontSize: 32,
    textAlign: "center",
    padding: 50,
  },
  text: {
    fontSize: 14,
    textAlign: "center",
  },
  missionButton: {
    backgroundColor: "#2644deff",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  buttonPressed: {
		opacity: 0.85,
	},
  buttonText: {
    color: "white",
    fontSize: 14,
  },
  bar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "90%",
    alignSelf: "center",
    marginBottom: 50,
  },
  missionIcon: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    position: 'absolute',
    resizeMode: "stretch",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  }
});
