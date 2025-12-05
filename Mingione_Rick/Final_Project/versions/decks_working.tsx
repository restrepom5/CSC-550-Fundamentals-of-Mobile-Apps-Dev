// app/(tabs)/decks.tsx
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  TextInput,
  Modal,
  Image,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { useDeckStore, Deck } from '@/stores/deckStore';

export default function DecksScreen() {
  const { decks, addDeck, deleteDeck } = useDeckStore();
  const [modalVisible, setModalVisible] = React.useState(false);
  const [deckName, setDeckName] = React.useState('');

  const createDeck = () => {
    if (!deckName.trim()) {
      Alert.alert('Error', 'Please enter a deck name');
      return;
    }
    addDeck(deckName.trim());
    setDeckName('');
    setModalVisible(false);
  };

  const promptDelete = (deck: Deck) => {
    Alert.alert(
      'Delete Deck',
      `Delete "${deck.name}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => deleteDeck(deck.id) },
      ]
    );
  };

  const DeckThumbnail = ({ deck }: { deck: Deck }) => {
    const previewCards = deck.cards.slice(0, 4);
    const emptySlots = 4 - previewCards.length;

    return (
      <TouchableOpacity style={styles.deckCard} onLongPress={() => promptDelete(deck)}>
        <Text style={styles.deckName} numberOfLines={1}>
          {deck.name}
        </Text>
        <View style={styles.previewGrid}>
          {previewCards.map((card) => (
            <Image
              key={card.id}
              source={{ uri: card.imageUri || 'https://via.placeholder.com/60x84/222/666?text=?' }}
              style={styles.previewImage}
            />
          ))}
          {Array(emptySlots)
            .fill(null)
            .map((_, i) => (
              <View key={`empty-${i}`} style={styles.emptySlot} />
            ))}
        </View>
        <Text style={styles.cardCount}>{deck.cards.length} cards</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Decks</Text>

      {decks.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No decks yet</Text>
          <Text style={styles.emptySub}>Tap + to create your first deck</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.grid}>
          {decks.map((deck) => (
            <DeckThumbnail key={deck.id} deck={deck} />
          ))}
        </ScrollView>
      )}

      {/* Floating + Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => setModalVisible(true)}
      >
        <Ionicons name="add" size={32} color="#fff" />
      </TouchableOpacity>

      {/* Create Deck Modal */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>New Deck</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter deck name..."
              placeholderTextColor="#888"
              value={deckName}
              onChangeText={setDeckName}
              autoFocus
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalBtn, styles.cancelBtn]}
                onPress={() => {
                  setModalVisible(false);
                  setDeckName('');
                }}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.modalBtn, styles.createBtn]} onPress={createDeck}>
                <Text style={styles.createText}>Create</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', paddingTop: 20 },
  header: { fontSize: 36, fontWeight: '800', color: '#fff', paddingHorizontal: 20, marginBottom: 20 },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  deckCard: {
    backgroundColor: '#111',
    borderRadius: 16,
    padding: 16,
    width: '48%',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#333',
  },
  deckName: { color: '#fff', fontSize: 18, fontWeight: '700', marginBottom: 10 },
  previewGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  previewImage: { width: 60, height: 84, borderRadius: 6, marginBottom: 6 },
  emptySlot: { width: 60, height: 84, borderRadius: 6, backgroundColor: '#222', marginBottom: 6 },
  cardCount: { color: '#888', fontSize: 12, textAlign: 'center' },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: '#9333ea',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  emptyState: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { color: '#fff', fontSize: 24, fontWeight: '600' },
  emptySub: { color: '#888', marginTop: 10 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { backgroundColor: '#111', padding: 24, borderRadius: 16, width: '85%' },
  modalTitle: { color: '#fff', fontSize: 24, fontWeight: '700', marginBottom: 16, textAlign: 'center' },
  input: { backgroundColor: '#222', color: '#fff', padding: 14, borderRadius: 12, marginBottom: 20 },
  modalButtons: { flexDirection: 'row', justifyContent: 'space-between' },
  modalBtn: { padding: 14, borderRadius: 12, minWidth: 100, alignItems: 'center' },
  cancelBtn: { backgroundColor: '#333' },
  createBtn: { backgroundColor: '#9333ea' },
  cancelText: { color: '#fff' },
  createText: { color: '#fff', fontWeight: '600' },
});