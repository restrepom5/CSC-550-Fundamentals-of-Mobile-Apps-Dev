// app/(tabs)/index.tsx  (or app/index.tsx)
import { useSearchStore } from '@/stores/searchStore';
import React, { useState } from 'react';
import {
  View,
  TextInput,
  FlatList,
  Image,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Keyboard,
  Modal,
  Pressable,
} from 'react-native';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface Card {
  id: string;
  name: string;
  image_uris?: {
    png: string;
    large: string;
    normal: string;
    small: string;
  };
  card_faces?: Array<{ 
    image_uris?: { 
      png: string; 
      large: string; 
      normal: string; 
      small: string
    }
  }>;
}

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const [searchQuery, setSearchQuery] = useState('');
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Modal state — MUST be inside the component
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isBackFace, setIsBackFace] = useState(false); // Track which face is showing

  const { originalPrintingOnly, uniqueCardsOnly } = useSearchStore();

  const performSearch = async (query: string) => {
    const trimmed = query.trim();
    if (trimmed.length < 2) {
      setCards([]);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);
    Keyboard.dismiss();

    try {
      let finalQuery = trimmed;
      if (originalPrintingOnly) {
        finalQuery += ' is:first_printing';
      }

      const uniqueParam = uniqueCardsOnly ? 'cards' : 'prints';
      const url = `https://api.scryfall.com/cards/search?q=${encodeURIComponent(
        finalQuery
      )}&unique=${uniqueParam}&order=name`;

      const response = await fetch(url);
      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.details || 'Search failed');
      }
      const data = await response.json();
      setCards(data.data || []);
    } catch (err: any) {
      setError(
        err.message.includes('Too many')
          ? 'Too many results — try a more specific name'
          : err.message
      );
      setCards([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    performSearch(searchQuery);
  };

  const getCardImage = (card: Card) => {
    if (card.card_faces && card.card_faces[0]?.image_uris?.small) {
      return card.card_faces[0].image_uris.small;
    }
    return card.image_uris?.small || 'https://via.placeholder.com/223x310?text=No+Image';
  };

  const getCurrentImageUri = (): string => {
    if (!selectedCard) return 'https://via.placeholder.com/240x335?text=No+Image';

    // DOUBLE-FACED: always use per-face vertical art
    if (selectedCard.card_faces && selectedCard.card_faces.length > 1) {
      const face = isBackFace ? selectedCard.card_faces[1] : selectedCard.card_faces[0];

      // Prefer png (sharpest), then normal, then small — NEVER use large here!
      return (
        face.image_uris?.png ||
        face.image_uris?.normal ||
        face.image_uris?.small ||
        'https://via.placeholder.com/240x335?text=No+Image'
      );
    }

    // SINGLE-FACED: safe to use large/normal
    return (
      selectedCard.image_uris?.png ||
      selectedCard.image_uris?.large ||
      selectedCard.image_uris?.normal ||
      selectedCard.image_uris?.small ||
      'https://via.placeholder.com/240x335?text=No+Image'
    );
  };

  const openCardModal = (card: Card) => {
    setSelectedCard(card);
    setQuantity(1);
    setIsBackFace(false); // Always start with front face
  };

  const closeModal = () => {
    setSelectedCard(null);
  };

  const renderCard = ({ item }: { item: Card }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.8}
      onPress={() => openCardModal(item)}
    >
      <Image source={{ uri: getCardImage(item) }} style={styles.cardImage} />
      <Text style={[styles.cardName, { color: isDark ? '#fff' : '#000' }]}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#000' : '#fff' }]}>
      <Text style={styles.headerTitle}>Browse</Text>

      <TextInput
        style={[
          styles.searchInput,
          { backgroundColor: isDark ? '#222' : '#f8f8f8', color: isDark ? '#fff' : '#000' },
        ]}
        placeholder="Type card name (e.g. Lightning Bolt) and press Enter"
        placeholderTextColor={isDark ? '#888' : '#666'}
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSubmitEditing={handleSubmit}
        returnKeyType="search"
        autoCorrect={false}
        clearButtonMode="while-editing"
      />

      {loading && <ActivityIndicator size="large" color={isDark ? '#fff' : '#000'} style={{ marginTop: 30 }} />}
      {error && <Text style={styles.errorText}>{error}</Text>}

      <FlatList
        data={cards}
        renderItem={renderCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={cards.length === 0 ? styles.emptyContainer : styles.list}
        ListEmptyComponent={
          !loading && searchQuery.length >= 2 && cards.length === 0 ? (
            <Text style={[styles.emptyText, { color: isDark ? '#888' : '#666' }]}>
              No cards found.
            </Text>
          ) : null
        }
      />

      <Modal
        visible={!!selectedCard}
        transparent={true}
        animationType="fade"
        onRequestClose={closeModal}
      >
        <Pressable style={styles.modalOverlay} onPress={closeModal}>
          <View style={[styles.modalContent, { backgroundColor: isDark ? '#111' : '#fff' }]}>
            {/* Stop propagation so tapping inside doesn't close modal */}
            <Pressable onPress={(e) => e.stopPropagation()}>
              
              {/* Card Name */}
              <Text style={[styles.modalTitle, { color: isDark ? '#fff' : '#000' }]}>
                {selectedCard?.name ?? 'Loading...'}
              </Text>

              {/* Flippable Card Image – no wrapper = no phantom space */}
              <TouchableOpacity
                activeOpacity={0.95}
                onPress={() => selectedCard?.card_faces && setIsBackFace(prev => !prev)}
                disabled={!selectedCard?.card_faces}
              >
                <Image
                  source={{ uri: getCurrentImageUri() }}
                  style={styles.modalCardImage}
                  resizeMode="contain"
                />
              </TouchableOpacity>

              {/* Optional: re-add flip indicator later as an overlay if you want */}

              {/* Show current face name */}
              {/* {selectedCard?.card_faces && (
                <Text style={[styles.faceName, { color: isDark ? '#aaa' : '#666' }]}>
                  {isBackFace
                    ? selectedCard.card_faces[1]?.name ?? 'Back Face'
                    : selectedCard.card_faces[0]?.name ?? 'Front Face'}
                </Text>
              )} */}

              {/* Quantity Controls */}
              <View style={styles.quantityContainer}>
                <TouchableOpacity
                  style={[styles.quantityButton, styles.minusButton]}
                  onPress={() => setQuantity(Math.max(0, quantity - 1))}
                >
                  <Text style={styles.quantityButtonText}>-</Text>
                </TouchableOpacity>

                <Text style={[styles.quantityText, { color: isDark ? '#fff' : '#000' }]}>
                  {quantity}
                </Text>

                <TouchableOpacity
                  style={[styles.quantityButton, styles.plusButton]}
                  onPress={() => setQuantity(quantity + 1)}
                >
                  <Text style={styles.quantityButtonText}>+</Text>
                </TouchableOpacity>
              </View>

            </Pressable>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

// Styles (unchanged — you had them perfect)
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 24,
    marginTop: 30,
    letterSpacing: 0.5,
  },
  searchInput: {
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 17,
    borderWidth: 1,
    borderColor: '#333',
  },
  list: { paddingTop: 10 },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { fontSize: 16, textAlign: 'center', marginTop: 50 },
  errorText: { color: '#ff6b6b', textAlign: 'center', marginTop: 20, fontSize: 15 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#272727ff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  cardImage: { width: 68, height: 95, borderRadius: 6, marginRight: 14 },
  cardName: { fontSize: 17, fontWeight: '600', flex: 1 },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.85)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '88%',
    maxWidth: 400,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalCardImage: {
    width: 240,
    height: 335,
    borderRadius: 12,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  quantityButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  minusButton: { backgroundColor: '#ff4444' },
  plusButton: { backgroundColor: '#44aa44' },
  quantityButtonText: { color: '#fff', fontSize: 28, fontWeight: 'bold' },
  quantityText: { fontSize: 32, fontWeight: 'bold', marginHorizontal: 30 },
  faceName: {
    marginTop: 8,
    fontSize: 16,
    fontStyle: 'italic',
  },
});