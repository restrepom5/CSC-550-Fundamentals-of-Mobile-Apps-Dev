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
  const { id, added } = useLocalSearchParams<{ id: string; added?: string }>();
  const label = states.find(state => state.id === id)?.label;
  const router = useRouter();

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
          {added === "no" && id && label &&(
             <MyButton
              buttonText="Add to My Destinations"
              location={{ id: id, label: label }}
              onLocationPress={(loc) => {
                if (loc && !myLocations.some((val) => val.id === loc.id)) {
                  myLocations.push(loc);
                }
                router.push("/");
              }}
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
