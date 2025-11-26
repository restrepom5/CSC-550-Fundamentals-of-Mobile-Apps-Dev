import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Audio, AVPlaybackSource } from 'expo-av';
import * as Haptics from 'expo-haptics';

type PadConfig = {
  id: string;
  label: string;
  file: AVPlaybackSource;
};

const pads: PadConfig[] = [
  {
    id: 'airhorn',
    label: 'Airhorn',
    file: require('../../assets/sounds/airhorn.mp3'),
  },
  {
    id: 'siren',
    label: 'Siren',
    file: require('../../assets/sounds/siren.mp3'),
  },
  {
    id: 'riser',
    label: 'Riser',
    file: require('../../assets/sounds/riser.mp3'),
  },
  {
    id: 'impact',
    label: 'Impact',
    file: require('../../assets/sounds/impact.mp3'),
  },
];

type SoundMap = { [id: string]: Audio.Sound };

export default function SamplerScreen() {
  const [sounds, setSounds] = useState<SoundMap>({});

  // Clean up sounds when leaving the screen
  useEffect(() => {
    return () => {
      Object.values(sounds).forEach((sound) => {
        sound.unloadAsync().catch(() => {});
      });
    };
  }, [sounds]);

  async function handlePadPress(pad: PadConfig) {
    try {
      // light vibration for feedback
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

      let sound = sounds[pad.id];

      // lazily load sound the first time
      if (!sound) {
        const result = await Audio.Sound.createAsync(pad.file);
        sound = result.sound;
        setSounds((prev) => ({ ...prev, [pad.id]: sound }));
      }

      // restart sound from beginning on every tap
      await sound.replayAsync();
    } catch (err) {
      console.warn('Error playing sound', err);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sampler Pads</Text>
      <Text style={styles.subtitle}>Tap a pad to trigger a sound.</Text>

      <View style={styles.grid}>
        {pads.map((pad) => (
          <TouchableOpacity
            key={pad.id}
            style={styles.pad}
            onPress={() => handlePadPress(pad)}
          >
            <Text style={styles.padText}>{pad.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: 80,
    paddingHorizontal: 16,
  },
  title: {
    color: '#00ffcc',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    color: '#aaa',
    textAlign: 'center',
    marginBottom: 24,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  pad: {
    backgroundColor: '#00ffcc',
    width: '48%',
    aspectRatio: 1,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  padText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

