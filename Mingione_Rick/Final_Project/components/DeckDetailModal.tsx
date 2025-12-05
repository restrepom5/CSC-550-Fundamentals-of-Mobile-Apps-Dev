// components/DeckDetailModal.tsx
import React, { useState, useEffect, useCallback } from 'react';
import {
  Modal,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDeckStore, Deck, CardInDeck } from '@/stores/deckStore';

interface DeckDetailModalProps {
  visible: boolean;
  onClose: () => void;
  deckId: string | null;
}

export default function DeckDetailModal({ visible, onClose, deckId }: DeckDetailModalProps) {
  // Subscribe to the entire decks array to get updates
  const decks = useDeckStore((state) => state.decks);
  const removeCardFromDeck = useDeckStore((state) => state.removeCardFromDeck);
  const updateCardQuantity = useDeckStore((state) => state.updateCardQuantity);
  const deleteDeck = useDeckStore((state) => state.deleteDeck);
  const forceUpdate = useDeckStore((state) => state.forceUpdate);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCards, setFilteredCards] = useState<CardInDeck[]>([]);
  const [deck, setDeck] = useState<Deck | null>(null);
  
  // Create handlers using useCallback - moved to top level
  const handleRemoveCard = useCallback((cardId: string) => {
    if (!deckId) return;
    removeCardFromDeck(deckId, cardId);
    // Force update to ensure re-render
    setTimeout(() => forceUpdate(), 0);
  }, [deckId, removeCardFromDeck, forceUpdate]);

  const handleUpdateQuantity = useCallback((cardId: string, quantity: number) => {
    if (!deckId) return;
    updateCardQuantity(deckId, cardId, quantity);
    // Force update to ensure re-render
    setTimeout(() => forceUpdate(), 0);
  }, [deckId, updateCardQuantity, forceUpdate]);

  // Update deck when decks array changes or deckId changes
  useEffect(() => {
    if (!deckId) {
      setDeck(null);
      setFilteredCards([]);
      return;
    }
    
    const currentDeck = decks.find(d => d.id === deckId);
    setDeck(currentDeck || null);
    
    if (currentDeck) {
      const filtered = currentDeck.cards.filter(card =>
        card.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCards(filtered);
    } else {
      setFilteredCards([]);
    }
  }, [deckId, decks, searchQuery]);

  if (!deck) return null;

  // Calculate deck statistics
  const calculateStats = () => {
    const totalCards = deck.cards.reduce((sum, card) => sum + (card.quantity || 1), 0);
    const uniqueCards = deck.cards.length;
    
    const totalCMC = deck.cards.reduce((sum, card) => {
      return sum + ((card.cmc || 0) * (card.quantity || 1));
    }, 0);
    
    const avgCMC = totalCards > 0 ? (totalCMC / totalCards).toFixed(1) : '0.0';
    
    const creatureCount = deck.cards.filter(card => 
      card.type_line?.toLowerCase().includes('creature')
    ).reduce((sum, card) => sum + (card.quantity || 1), 0);
    
    const landCount = deck.cards.filter(card => 
      card.type_line?.toLowerCase().includes('land')
    ).reduce((sum, card) => sum + (card.quantity || 1), 0);
    
    const spellCount = deck.cards.filter(card => 
      !card.type_line?.toLowerCase().includes('creature') && 
      !card.type_line?.toLowerCase().includes('land')
    ).reduce((sum, card) => sum + (card.quantity || 1), 0);

    return {
      totalCards,
      uniqueCards,
      avgCMC,
      creatureCount,
      landCount,
      spellCount,
    };
  };

  const stats = calculateStats();

  const handleDeleteDeck = () => {
    if (!deckId) return;
    
    Alert.alert(
      'Delete Deck',
      `Are you sure you want to delete "${deck.name}" permanently? This cannot be undone.`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => {
            deleteDeck(deckId);
            onClose();
          }
        },
      ]
    );
  };

  // issue with ESLint. App breaks if I try to disable.
  const renderCardItem = useCallback(({ item }: { item: CardInDeck }) => {
    const quantity = item.quantity || 1;
    
    return (
      <View style={styles.cardItem}>
        <Image
          source={{ uri: item.imageUri || 'https://via.placeholder.com/50x70/222/666?text=?' }}
          style={styles.cardImage}
        />
        <View style={styles.cardInfo}>
          <Text style={styles.cardName} numberOfLines={1}>{item.name}</Text>
          {item.type_line && (
            <Text style={styles.cardType}>{item.type_line}</Text>
          )}
          {item.mana_cost && (
            <Text style={styles.cardMana}>{item.mana_cost}</Text>
          )}
        </View>
        <View style={styles.quantityControls}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => {
              if (quantity <= 1) {
                handleRemoveCard(item.id);
              } else {
                handleUpdateQuantity(item.id, quantity - 1);
              }
            }}
          >
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          
          <Text style={styles.quantityText}>{quantity}</Text>
          
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => handleUpdateQuantity(item.id, quantity + 1)}
          >
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.removeButton}
            onPress={() => handleRemoveCard(item.id)}
          >
            <Ionicons name="trash-outline" size={20} color="#ff4444" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }, [handleRemoveCard, handleUpdateQuantity]);

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose} style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>
            <View style={styles.headerCenter}>
              <Text style={styles.deckTitle} numberOfLines={1}>{deck.name}</Text>
              <Text style={styles.deckSubtitle}>
                {stats.totalCards} cards ({stats.uniqueCards} unique)
              </Text>
            </View>
            <TouchableOpacity onPress={handleDeleteDeck} style={styles.deleteButton}>
              <Ionicons name="trash-outline" size={22} color="#ff4444" />
            </TouchableOpacity>
          </View>

          {/* Stats Section */}
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{stats.avgCMC}</Text>
              <Text style={styles.statLabel}>Avg CMC</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{stats.creatureCount}</Text>
              <Text style={styles.statLabel}>Creatures</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{stats.landCount}</Text>
              <Text style={styles.statLabel}>Lands</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{stats.spellCount}</Text>
              <Text style={styles.statLabel}>Spells</Text>
            </View>
          </View>

          {/* Search */}
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search cards in deck..."
              placeholderTextColor="#888"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Ionicons name="close-circle" size={20} color="#888" />
              </TouchableOpacity>
            )}
          </View>

          {/* Cards List */}
          {filteredCards.length === 0 ? (
            <View style={styles.emptyState}>
              {searchQuery ? (
                <>
                  <Ionicons name="search-outline" size={48} color="#666" />
                  <Text style={styles.emptyText}>No cards found</Text>
                  <Text style={styles.emptySubtext}>
                    {`No cards match "${searchQuery}"`}
                  </Text>
                </>
              ) : (
                <>
                  <Ionicons name="layers-outline" size={48} color="#666" />
                  <Text style={styles.emptyText}>Deck is empty</Text>
                  <Text style={styles.emptySubtext}>
                    Add cards from search results
                  </Text>
                </>
              )}
            </View>
          ) : (
            <FlatList
              data={filteredCards}
              renderItem={renderCardItem}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.listContent}
              showsVerticalScrollIndicator={false}
              extraData={decks} // This forces re-render when decks changes
            />
          )}

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Changes saved automatically
            </Text>
            <TouchableOpacity style={styles.closeFooterButton} onPress={onClose}>
              <Text style={styles.closeFooterButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

// Keep the same styles...

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.95)',
  },
  modal: {
    flex: 1,
    backgroundColor: '#000',
    marginTop: 50,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  backButton: {
    padding: 4,
    marginRight: 12,
  },
  deleteButton: {
    padding: 8,
    marginLeft: 12,
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  deckTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  deckSubtitle: {
    fontSize: 14,
    color: '#888',
    marginTop: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#888',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111',
    margin: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  cardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
  },
  cardImage: {
    width: 50,
    height: 70,
    borderRadius: 6,
    marginRight: 12,
  },
  cardInfo: {
    flex: 1,
  },
  cardName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  cardType: {
    fontSize: 12,
    color: '#aaa',
    marginBottom: 2,
  },
  cardMana: {
    fontSize: 12,
    color: '#9333ea',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#222',
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  quantityButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantityText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginHorizontal: 10,
    minWidth: 20,
    textAlign: 'center',
  },
  removeButton: {
    marginLeft: 10,
    padding: 4,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 100,
  },
  emptyText: {
    fontSize: 18,
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
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#111',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#333',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#888',
    flex: 1,
  },
  closeFooterButton: {
    backgroundColor: '#9333ea',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
  },
  closeFooterButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});