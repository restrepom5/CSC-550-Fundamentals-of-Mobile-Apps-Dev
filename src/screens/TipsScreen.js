//src/screens/TipsScreen.js
import { useState } from 'react';
import { Linking, ScrollView, StyleSheet, View } from 'react-native';
import { List, SegmentedButtons, Text, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { disneyTips, glossaryTips, universalTips } from '../data/tips';

function Section({ title, tips, icon }) {
  const theme = useTheme();

  if (!tips || tips.length === 0) return null;

  return (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
        {title}
      </Text>
      {tips.map((t) => (
        <TipCard key={t.id} tip={t} icon={icon} />
      ))}
    </View>
  );
}

function getEmojiForTip(tip, icon) {
  const text = `${tip.title ?? ''} ${tip.body ?? ''}`.toLowerCase();

  if (tip.title.toLowerCase().includes('use free ice water')) {
    return '🥤';
  }

  if (
    text.includes('midday break') ||
    (text.includes('break') && !text.includes('breakfast')) ||
    text.includes('take a break') ||
    text.includes('afternoon break') ||
    text.includes('rest')
  ) {
    return '⏰';
  }

  if (text.includes('mobile order') || text.includes('mobile ordering')) return '📱';
  if (text.includes('single rider')) return '🏎️';
  if (text.includes('express pass') || text.includes('express lane')) return '🎟️';
  if (text.includes('locker')) return '🔒';

  if (
    text.includes('snack') ||
    text.includes('food') ||
    text.includes('meal') ||
    text.includes('dining') ||
    text.includes('restaurant')
  ) {
    return '🍔';
  }

  if (
    text.includes('hydrate') ||
    text.includes('hydration') ||
    text.includes('drink water') ||
    text.includes('water bottle') ||
    text.includes('electrolyte') ||
    text.includes('stay hydrated')
  ) {
    return '💧';
  }

  if (text.includes('shoe') || text.includes('sneaker') || text.includes('feet')) return '👟';
  if (text.includes('souvenir') || text.includes('refill') || text.includes('cup')) return '🥤';

  if (icon === 'castle') return '🏰';
  if (icon === 'roller-skate') return '🎢';

  return '💡';
}

function TipCard({ tip, icon }) {
  const theme = useTheme();
  const emoji = getEmojiForTip(tip, icon);

  return (
    <View style={[styles.card, { backgroundColor: theme.colors.surface }]}>
      <List.Item
        title={tip.title}
        description={tip.body}
        titleStyle={{ color: theme.colors.text }}
        descriptionStyle={{ color: theme.colors.text, opacity: 0.85 }}
        left={(props) =>
          icon === 'book-open-variant' ? (
            <List.Icon {...props} icon="book-open-variant" />
          ) : (
            <View style={styles.emojiIcon}>
              <Text style={styles.emojiText}>{emoji}</Text>
            </View>
          )
        }
        titleNumberOfLines={2}
        descriptionNumberOfLines={10}
      />
    </View>
  );
}

function LinkItem({ title, body, icon, url }) {
  const theme = useTheme();

  let emoji = '🔗';
  if (icon === 'map-search') emoji = '🗺️';
  else if (icon === 'account-child') emoji = '👨‍👩‍👧';
  else if (icon === 'airplane') emoji = '✈️';
  else if (icon === 'theme-light-dark') emoji = '🎢';
  else if (icon === 'wand') emoji = '🪄';
  else if (icon === 'account-heart') emoji = '💖';
  else if (icon === 'account-voice') emoji = '🎤';
  else if (icon === 'account-tie') emoji = '🧳';
  else if (icon === 'newspaper-variant') emoji = '📰';
  else if (icon === 'facebook') emoji = '📘';

  return (
    <View style={[styles.card, { backgroundColor: theme.colors.surface }]}>
      <List.Item
        title={title}
        description={body}
        titleStyle={{ color: theme.colors.text }}
        descriptionStyle={{ color: theme.colors.text, opacity: 0.85 }}
        onPress={() => Linking.openURL(url)}
        left={() => (
          <View style={styles.emojiIcon}>
            <Text style={styles.emojiText}>{emoji}</Text>
          </View>
        )}
        right={(props) => <List.Icon {...props} icon="open-in-new" />}
      />
    </View>
  );
}


const communityDisneyBasics = [
  {
    id: 'community-disney-planning',
    title: 'Set Realistic Daily Goals (Community Tip)',
    body:
      'Crowd advice for first-timers is to pick a few must-do rides or shows per day instead of trying to do everything. Build your days around those anchors and treat everything else as a bonus.',
  },
  {
    id: 'community-disney-food',
    title: 'Use Mobile Ordering & Simple Snacks',
    body:
      'People love using mobile order to skip food lines and bringing light snacks from home. It keeps everyone from getting hangry while you wait for rides or shows.',
  },
];

const communityUniversalBasics = [
  {
    id: 'community-uni-hydration',
    title: 'Hydration Hacks at Universal (Community Tip)',
    body:
      'Frequent guests suggest bringing a collapsible bottle and filling it with free ice water at Coke Freestyle stations or quick-service locations.',
  },
  {
    id: 'community-uni-budget',
    title: 'Save on Food & Drinks',
    body:
      'Common budget tips include sharing larger meals, bringing your own snacks, and sticking to free water instead of buying bottled drinks all day.',
  },
  {
    id: 'community-uni-express',
    title: 'Express Pass & Hotel Strategy',
    body:
      'Community advice often recommends pricing out Premier hotels that include Unlimited Express. One night at a Premier hotel can give you two days of Express access.',
  },
];


const tripResources = [
  {
    id: 'four-flights-disney',
    tags: ['disney'],
    title: '16 Disney World Tips You’ll Actually Use – Four Flights Travel',
    body:
      'Realistic Disney touring tips: park layout, Lightning Lane strategy, packing, and what first-timers actually use.',
    icon: 'map-search',
    url: 'https://fourflightstravel.com/639/16-disney-world-tips-youll-actually-use/',
  },
  {
    id: 'marisa-brahney-disney',
    tags: ['disney'],
    title: 'First Time Disney World Tips – Marisa Brahney',
    body:
      'Family-focused first-trip guide with expectations for long days, kid-friendly priorities, and planning that still feels fun.',
    icon: 'account-child',
    url: 'https://marisabrahney.com/first-time-disney-world-tips/',
  },
  {
    id: 'stuff-with-svet-both',
    tags: ['disney', 'universal', 'both'],
    title: 'My Guide to Universal Studios & Disney World – Stuff with Svet',
    body:
      'Honest review of doing both resorts in one trip with notes on what’s worth your time at each and how to avoid burnout.',
    icon: 'airplane',
    url: 'https://stuffwithsvet.com/travel/my-guide-to-universal-studios-disney-world/',
  },
  {
    id: 'orlando-informer',
    tags: ['universal'],
    title: 'Universal Orlando Resort Tips: What I Wish I Knew – Orlando Informer',
    body:
      'Deep-dive Universal planning: early entry, Express, staying on-site, and structuring days so you’re not stuck in lines.',
    icon: 'theme-light-dark',
    url: 'https://orlandoinformer.com/blog/universal-orlando-resort-tips-what-i-wish-i-knew/',
  },
  {
    id: 'kelly-prince-wwohp',
    tags: ['universal'],
    title: 'Wizarding World of Harry Potter Guide – Kelly Prince Writes',
    body:
      'Focused itinerary for the Wizarding World: Diagon Alley + Hogsmeade, key rides, shops, and Butterbeer stops.',
    icon: 'wand',
    url: 'https://www.kellyprincewrites.com/wizarding-world-of-harry-potter-universal-studios-florida/',
  },
];

const followResources = [
  {
    id: 'four-flights-follow',
    tags: ['disney'],
    title: 'Four Flights Travel',
    body:
      'Disney planning, packing lists, and real-world itineraries—especially helpful for Lightning Lane and realistic park days.',
    icon: 'account-heart',
    url: 'https://fourflightstravel.com/category/travel-blog-posts/disney/',
  },
  {
    id: 'marisa-brahney-follow',
    tags: ['disney'],
    title: 'Marisa Brahney',
    body:
      'Lifestyle & travel creator with approachable first-time Disney tips from a mom-with-kids perspective.',
    icon: 'account-voice',
    url: 'https://marisabrahney.com/first-time-disney-world-tips/',
  },
  {
    id: 'stuff-with-svet-follow',
    tags: ['disney', 'universal', 'both'],
    title: 'Stuff with Svet (Jenna Swetlikoff)',
    body:
      'Travel blogger with detailed posts on doing Universal and Disney together and maximizing short trips.',
    icon: 'account-tie',
    url: 'https://stuffwithsvet.com/category/travel/international/',
  },
  {
    id: 'orlando-informer-follow',
    tags: ['universal'],
    title: 'Orlando Informer',
    body:
      'Universal-focused site with in-depth guides, crowd tips, and meetup info.',
    icon: 'newspaper-variant',
    url: 'https://orlandoinformer.com/',
  },
  {
    id: 'fb-disney-tips-group',
    tags: ['disney'],
    title: 'Facebook Group: Disney Tips and Tricks',
    body:
      'Large community sharing real-time questions, packing ideas, and money-saving hacks for Disney trips.',
    icon: 'facebook',
    url: 'https://www.facebook.com/groups/disneytipsandtricks/',
  },
];


function matchesFilter(item, filter) {
  if (filter === 'both') return true;
  if (!item.tags) return true;
  return item.tags.includes(filter) || item.tags.includes('both');
}

export default function TipsScreen() {
  const theme = useTheme();
  const [filter, setFilter] = useState('disney');

  const combinedDisneyTips = [...disneyTips, ...communityDisneyBasics];
  const combinedUniversalTips = [...universalTips, ...communityUniversalBasics];

  const showDisney = filter === 'disney' || filter === 'both';
  const showUniversal = filter === 'universal' || filter === 'both';

  const filteredTripResources = tripResources.filter((r) =>
    matchesFilter(r, filter),
  );
  const filteredFollowResources = followResources.filter((r) =>
    matchesFilter(r, filter),
  );

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: theme.colors.background }]}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <Text style={[styles.title, { color: theme.colors.text }]}>
          ParkDay Tips
        </Text>
        <Text
          style={[
            styles.subtitle,
            { color: theme.colors.text, opacity: 0.8 },
          ]}
        >
          Common advice, planning guides, and people to follow for your trip.
        </Text>

        <View style={styles.filterWrapper}>
          <SegmentedButtons
            value={filter}
            onValueChange={setFilter}
            density="small"
            buttons={[
              { value: 'disney', label: 'Disney' },
              { value: 'universal', label: 'Universal' },
              { value: 'both', label: 'Both' },
            ]}
          />
        </View>

        <Section title="Glossary" tips={glossaryTips} icon="book-open-variant" />

        {showDisney && (
          <Section
            title="Disney Basics"
            tips={combinedDisneyTips}
            icon="castle"
          />
        )}

        {showUniversal && (
          <Section
            title="Universal Basics"
            tips={combinedUniversalTips}
            icon="roller-skate"
          />
        )}

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            More Trip-Planning Guides
          </Text>
          {filteredTripResources.map((r) => (
            <LinkItem
              key={r.id}
              title={r.title}
              body={r.body}
              icon={r.icon}
              url={r.url}
            />
          ))}
        </View>

        <View style={styles.sectionLast}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            People & Communities to Follow
          </Text>
          {filteredFollowResources.map((r) => (
            <LinkItem
              key={r.id}
              title={r.title}
              body={r.body}
              icon={r.icon}
              url={r.url}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/* ---------- Styles ---------- */

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  title: {
    fontFamily: 'PoppinsSemiBold',
    fontSize: 28,
    marginBottom: 4,
  },
  subtitle: {
    fontFamily: 'PoppinsRegular',
    marginBottom: 12,
  },
  filterWrapper: {
    marginBottom: 16,
  },
  section: {
    marginTop: 8,
  },
  sectionLast: {
    marginTop: 8,
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'PoppinsSemiBold',
    marginTop: 16,
    marginBottom: 8,
    fontSize: 18,
  },
  card: {
    borderRadius: 12,
    marginBottom: 8,
    elevation: 1,
    overflow: 'hidden',
  },
  emojiIcon: {
    width: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emojiText: {
    fontSize: 22,
  },
});
