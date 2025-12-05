// components/AddToDeckModal.tsx
import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDeckStore, CardInDeck } from '@/stores/deckStore';

// interface AddToDeckModalProps {
//   visible: boolean;
//   onClose: () => void;
//   card: {
//     id: string;
//     name: string;
//     image_uris?: { small?: string; normal?: string };
//     card_faces?: Array<{ image_uris?: { small?: string } }>;
//   } | null;
//   quantity?: number;
// }

// In AddToDeckModal.tsx, update the AddToDeckModalProps interface:
interface AddToDeckModalProps {
  visible: boolean;
  onClose: () => void;
  card: {
    id: string;
    name: string;
    mana_cost?: string;
    cmc?: number;
    type_line?: string;
    image_uris?: { small?: string; normal?: string };
      // ESLint doesn't like this Array syntax
      // card_faces?: Array<{ 
      //   image_uris?: {
      //     png: string; 
      //     large: string; 
      //     normal: string; 
      //     small: string;
      //   };
      // }>;
    card_faces?: {
    image_uris?: {
      png: string; 
      large: string; 
      normal: string; 
      small: string;
      };
    }[];
  } | null;
  quantity?: number;
}

export default function AddToDeckModal({ 
  visible, 
  onClose, 
  card,
  quantity = 1 
}: AddToDeckModalProps) {
  const { decks, addCardToDeck } = useDeckStore();
  const [selectedDeckId, setSelectedDeckId] = useState<string | null>(null);

  if (!card) return null;

  // const handleAddToDeck = () => {
  //   if (!selectedDeckId) {
  //     Alert.alert('Error', 'Please select a deck');
  //     return;
  //   }

  //   // Convert Scryfall card to our CardInDeck format
  //   const getCardImage = () => {
  //     if (card.card_faces && card.card_faces[0]?.image_uris?.small) {
  //       return card.card_faces[0].image_uris.small;
  //     }
  //     return card.image_uris?.small || card.image_uris?.normal;
  //   };

  //   const cardInDeck: CardInDeck = {
  //     id: card.id,
  //     name: card.name,
  //     imageUri: getCardImage(),
  //   };

  //   addCardToDeck(selectedDeckId, cardInDeck, quantity);
    
  //   Alert.alert(
  //     'Success',
  //     `Added ${quantity}x ${card.name} to deck`,
  //     [{ text: 'OK', onPress: onClose }]
  //   );
  // };

  // Update the handleAddToDeck function in AddToDeckModal.tsx
  const handleAddToDeck = () => {
    if (!selectedDeckId) {
      Alert.alert('Error', 'Please select a deck');
      return;
    }

    // Convert Scryfall card to our CardInDeck format with more data
    const getCardImage = () => {
      if (card.card_faces && card.card_faces[0]?.image_uris?.small) {
        return card.card_faces[0].image_uris.small;
      }
      return card.image_uris?.small || card.image_uris?.normal;
    };

    const cardInDeck: CardInDeck = {
      id: card.id,
      name: card.name,
      imageUri: getCardImage(),
      mana_cost: card.mana_cost, // Add mana cost
      cmc: card.cmc, // Add converted mana cost if available
      type_line: card.type_line, // Add type line
    };

    addCardToDeck(selectedDeckId, cardInDeck, quantity);
    
    Alert.alert(
      'Success',
      `Added ${quantity}x ${card.name} to deck`,
      [{ text: 'OK', onPress: onClose }]
    );
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <View style={styles.header}>
            <Text style={styles.title}>Add to Deck</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="#fff" />
            </TouchableOpacity>
          </View>

          <View style={styles.cardPreview}>
            <Text style={styles.cardName}>{card.name}</Text>
            <Text style={styles.quantityText}>Quantity: {quantity}</Text>
          </View>

          {decks.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons name="folder-outline" size={48} color="#666" />
              <Text style={styles.emptyText}>No decks yet</Text>
              <Text style={styles.emptySubtext}>
                Create a deck first from the Decks tab
              </Text>
            </View>
          ) : (
            <>
              <Text style={styles.sectionTitle}>Select a Deck:</Text>
              <FlatList
                data={decks}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={[
                      styles.deckOption,
                      selectedDeckId === item.id && styles.deckOptionSelected,
                    ]}
                    onPress={() => setSelectedDeckId(item.id)}
                  >
                    <View style={styles.deckInfo}>
                      <Text style={styles.deckName}>{item.name}</Text>
                      <Text style={styles.deckStats}>
                        {item.cards.length} cards
                      </Text>
                    </View>
                    {selectedDeckId === item.id && (
                      <Ionicons name="checkmark-circle" size={24} color="#9333ea" />
                    )}
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id}
                style={styles.deckList}
              />
            </>
          )}

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={onClose}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            
            {decks.length > 0 && (
              <TouchableOpacity
                style={[
                  styles.button, 
                  styles.addButton,
                  !selectedDeckId && styles.disabledButton,
                ]}
                onPress={handleAddToDeck}
                disabled={!selectedDeckId}
              >
                <Text style={styles.buttonText}>
                  Add to Deck
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#111',
    borderRadius: 16,
    padding: 20,
    width: '90%',
    maxWidth: 400,
    maxHeight: '80%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  cardPreview: {
    backgroundColor: '#222',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    alignItems: 'center',
  },
  cardName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
  },
  quantityText: {
    fontSize: 14,
    color: '#aaa',
  },
  emptyState: {
    alignItems: 'center',
    padding: 30,
  },
  emptyText: {
    fontSize: 16,
    color: '#fff',
    marginTop: 16,
    fontWeight: '600',
  },
  emptySubtext: {
    fontSize: 14,
    color: '#888',
    marginTop: 8,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 12,
  },
  deckList: {
    maxHeight: 300,
    marginBottom: 20,
  },
  deckOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#222',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
  },
  deckOptionSelected: {
    backgroundColor: '#1a0b2e',
    borderWidth: 2,
    borderColor: '#9333ea',
  },
  deckInfo: {
    flex: 1,
  },
  deckName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  deckStats: {
    fontSize: 14,
    color: '#888',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#333',
  },
  addButton: {
    backgroundColor: '#9333ea',
  },
  disabledButton: {
    backgroundColor: '#555',
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});