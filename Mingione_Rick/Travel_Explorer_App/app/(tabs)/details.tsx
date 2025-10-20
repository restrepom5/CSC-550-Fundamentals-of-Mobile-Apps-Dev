// import { Image } from 'expo-image';
import { StyleSheet } from 'react-native';

import { Collapsible } from '@/components/ui/collapsible';
import { ExternalLink } from '@/components/external-link';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Fonts } from '@/constants/theme';

export default function TabTwoScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText
          type="title"
          style={{
            fontFamily: Fonts.rounded,
          }}>
          Trip Resources & Planner
        </ThemedText>
      </ThemedView>
      <ThemedText>Plan your trip with us! Find resources here and more.</ThemedText>
      <Collapsible title="Find a Park">
        <ThemedText>
          Looking for a park close to home or on your route? Use the park finder tool to locate parks by state
          or region.
        </ThemedText>
        <ExternalLink href="https://www.nps.gov/findapark/index.htm">
          <ThemedText type="link">Find a Park</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Get your park passes">
        <ThemedText>
          Most of the sites managed by the National Park Service are free to visit, but some require an entrance pass especially for high traffic months.
        </ThemedText>
        <ExternalLink href="https://www.nps.gov/planyourvisit/passes.htm">
          <ThemedText type="link">Get Park Passes</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Plan Your Visit">
        <ThemedText>
          Explore hiking, camping, and sightseeing options to make the most of your park visit with maps from the National Park Service.
        </ThemedText>
        <ExternalLink href="https://www.nps.gov/planyourvisit/maps.htm">
          <ThemedText type="link">Get NPS Maps</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Trip Ideas">
        <ThemedText>
          Need some guidance? Check out trip ideas posted by the National Parks Service.
        </ThemedText>
        <ExternalLink href="https://www.nps.gov/planyourvisit/trip-ideas.htm">
          <ThemedText type="link">Get Trip Ideas</ThemedText>
        </ExternalLink>
      </Collapsible>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
