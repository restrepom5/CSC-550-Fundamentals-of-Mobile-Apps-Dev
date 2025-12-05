// app/search-modal.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  useColorScheme,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSearchStore } from '@/stores/searchStore';
import CardDetailModal from '@/components/cardDetailModal';

interface Card {
  id: string;
  name: string;
  image_uris?: { small?: string };
  card_faces?: {
    name?: string;
    image_uris?: {
      png: string; 
      large: string; 
      normal: string; 
      small: string;
      };
  }[];
}

// ----- Memoized Card Component -----
const CardItem = React.memo(({ item }: { item: Card }) => {
  const colorScheme = useColorScheme();
  const textColor = colorScheme === 'dark' ? '#fff' : '#000';

  const image =
    (item.card_faces && item.card_faces[0]?.image_uris?.small) ||
    item.image_uris?.small ||
    null;

  return (
    <View style={styles.card}>
      {image ? (
        <Image
          source={{ uri: image }}
          style={styles.cardImage}
          resizeMode="contain"
        />
      ) : null}
      <Text style={[styles.cardName, { color: textColor }]}>{item.name}</Text>
    </View>
  );
});
CardItem.displayName = 'CardItem';

export default function SearchModal() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const textColor = colorScheme === 'dark' ? '#fff' : '#000';

  // Get cards directly from Zustand store
  const cards = useSearchStore((state) => state.lastResults);

  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Optional: pagination can still work if you save next_page too
  // But for now, keeping it simple — most searches don't need it

  const openCard = (card: Card) => {
    setSelectedCard(card);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      {/* Close button */}
      <TouchableOpacity style={{ marginBottom: 20 }} onPress={() => router.back()}>
        <Ionicons name="chevron-down" size={32} color={textColor} />
      </TouchableOpacity>

      {cards.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={[styles.emptyText, { color: textColor }]}>
            No cards found.
          </Text>
        </View>
      ) : (
        <FlatList
          data={cards}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => openCard(item)}>
              <CardItem item={item} />
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          initialNumToRender={15}
          maxToRenderPerBatch={10}
          windowSize={10}
          removeClippedSubviews
        />
      )}

      {/* Card Detail Modal */}
      <CardDetailModal
        card={selectedCard}
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#000' },
  list: { paddingTop: 10 },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { fontSize: 18, textAlign: 'center', color: '#aaa' },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#272727',
    borderRadius: 10,
    padding: 10,
    marginBottom: 12,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  cardImage: { width: 68, height: 95, borderRadius: 6, marginRight: 14 },
  cardName: { fontSize: 17, fontWeight: '600', flex: 1 },
});