// app/lazy-search-modal.tsx
import React, { useState, Suspense } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSearchStore } from '@/stores/searchStore';
import LazyImage from '@/components/lazyImage';

interface Card {
  id: string;
  name: string;
  image_uris?: { small?: string };
  card_faces?: { image_uris?: { small?: string } }[];
}

// Lazy load CardDetailModal
const CardDetailModal = React.lazy(() => import('@/components/cardDetailModal'));

// ----- Memoized Card Component -----
const CardItem = React.memo(({ item }: { item: Card }) => {
  const colorScheme = useColorScheme();
  const textColor = colorScheme === 'dark' ? '#fff' : '#000';

  // Use LazyImage instead of Image
  const image =
    (item.card_faces && item.card_faces[0]?.image_uris?.small) ||
    item.image_uris?.small ||
    null;

  return (
    <View style={styles.card}>
      {image && <LazyImage uri={image} style={styles.cardImage} />}
      <Text style={[styles.cardName, { color: textColor }]}>{item.name}</Text>
    </View>
  );
});
CardItem.displayName = 'CardItem';

export default function SearchModal() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const textColor = colorScheme === 'dark' ? '#fff' : '#000';
  const cards = useSearchStore((state) => state.lastResults);

  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const openCard = (card: Card) => {
    setSelectedCard(card);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={{ marginBottom: 20 }} onPress={() => router.back()}>
        <Ionicons name="chevron-down" size={32} color={textColor} />
      </TouchableOpacity>

      {cards.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={[styles.emptyText, { color: textColor }]}>No cards found.</Text>
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

      {/* Lazy-loaded Modal */}
      <Suspense fallback={null}>
        {modalVisible && selectedCard && (
          <CardDetailModal
            card={selectedCard}
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
          />
        )}
      </Suspense>
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
