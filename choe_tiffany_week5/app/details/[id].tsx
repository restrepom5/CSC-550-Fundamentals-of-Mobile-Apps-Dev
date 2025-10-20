import { useLocalSearchParams, useRouter } from "expo-router";
import { StyleSheet } from 'react-native';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Fonts } from '@/constants/theme';
import React from "react";
import { states } from "../(tabs)/explore";
import { myLocations } from "../(tabs)";
import { MyButton } from "@/components/my-button";


export default function Destination() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const label = states.find(state => state.id === id)?.label;
  const router = useRouter();
  const added = myLocations.find((loc) => loc.id === id);
  const buttonText = added ? "Remove from My Destinations" : "Add to My Destinations";
  const onButtonPress = (loc: { id: string; label: string } | undefined) => {
    if (loc) {
      if (added) {
        const index = myLocations.findIndex((val) => val.id === loc.id);
        if (index !== -1) {
          myLocations.splice(index, 1);
        }
      } else {
          myLocations.push(loc);
      }
    }
    router.navigate("/");
  };


  return (
      <ParallaxScrollView
        headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
           headerImage={
              <IconSymbol
                size={200}
                color="#808080"
                name="map.fill"
                style={styles.headerImage}
              />
            }>
        <ThemedView style={styles.titleContainer}>
          <ThemedText
            type="title"
            style={{
              fontFamily: Fonts.rounded,
            }}>
            Location: {label}
          </ThemedText>
          <ThemedText
            type="subtitle"
            style={{
              fontFamily: Fonts.rounded,
            }}>
            Here is some detailed information about {label}.
          </ThemedText>
          {id && label &&( 
             <MyButton
              buttonText={buttonText}
              location={{ id: id, label: label }}
              onLocationPress={onButtonPress}
            />
          )}

        </ThemedView>
      </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    top: 50,                     
    left: '25%',
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'column',
    gap: 8,
  },
});
