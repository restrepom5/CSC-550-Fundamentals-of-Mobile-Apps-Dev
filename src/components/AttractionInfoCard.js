// src/components/AttractionInfoCard.js
import { Image, Linking, StyleSheet, View } from 'react-native';
import { Button, Chip, Text, useTheme } from 'react-native-paper';
import WaitTimeBadge from './WaitTimeBadge';

export default function AttractionInfoCard({ attraction, waitTime }) {
  const theme = useTheme();
  if (!attraction) return null;

  const {
    name,
    icon,
    type,
    category,
    kidFriendly,
    childSwap,
    singleRider,
    heightRequirement,
    shortDescription,
    longDescription,
    image,
    waitTimeUrl,
    waitTimeFallback,
  } = attraction;

  const urlForWait = waitTimeUrl || waitTimeFallback;

  const openWaitSite = () => {
    if (urlForWait) {
      Linking.openURL(urlForWait);
    }
  };

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: theme.colors.surface },
      ]}
    >
      {image && <Image source={image} style={styles.image} />}

      <View style={styles.headerRow}>
        <View style={{ flex: 1 }}>
          <Text
            style={[
              styles.title,
              { color: theme.colors.text },
            ]}
          >
            {icon} {name}
          </Text>
          <Text
            style={[
              styles.subtitle,
              { color: theme.colors.text, opacity: 0.8 },
            ]}
          >
            {type.toUpperCase()} • {category}
          </Text>
        </View>

        <WaitTimeBadge
          minutes={waitTime}
          onPress={urlForWait ? openWaitSite : undefined}
        />
      </View>

      <View style={styles.chipsRow}>
        {kidFriendly && <Chip compact style={styles.chip}>Kid-friendly</Chip>}
        {childSwap && <Chip compact style={styles.chip}>Child swap</Chip>}
        {singleRider && <Chip compact style={styles.chip}>Single rider</Chip>}
        {heightRequirement > 0 && (
          <Chip compact style={styles.chip}>
            {heightRequirement}" min height
          </Chip>
        )}
      </View>

      <Text
        style={[
          styles.body,
          { color: theme.colors.text, opacity: 0.9 },
        ]}
      >
        {shortDescription}
      </Text>
      <Text
        style={[
          styles.body,
          { color: theme.colors.text, opacity: 0.9 },
        ]}
      >
        {longDescription}
      </Text>

      {urlForWait && (
        <View style={styles.buttonRow}>
          <Button mode="outlined" onPress={openWaitSite}>
            Open Wait Times
          </Button>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    marginBottom: 12,
    padding: 12,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 160,
    borderRadius: 12,
    marginBottom: 8,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  title: {
    fontSize: 18,
    fontFamily: 'PoppinsSemiBold',
  },
  subtitle: {
    fontSize: 13,
    fontFamily: 'PoppinsRegular',
  },
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 6,
  },
  chip: {
    marginRight: 4,
    marginBottom: 4,
  },
  body: {
    fontSize: 13,
    fontFamily: 'PoppinsRegular',
    marginBottom: 4,
  },
  buttonRow: {
    marginTop: 8,
  },
});
