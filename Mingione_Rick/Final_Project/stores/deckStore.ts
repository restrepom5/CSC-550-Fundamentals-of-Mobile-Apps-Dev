// stores/deckStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Tiny built-in ID generator — works everywhere
const generateId = () => Math.random().toString(36).substr(2, 9);

export type CardInDeck = {
  id: string;
  name: string;
  imageUri?: string;
  quantity?: number;
  // Add Scryfall data for stats
  mana_cost?: string;
  cmc?: number;
  type_line?: string;
};

export type Deck = {
  id: string;
  name: string;
  cards: CardInDeck[];
  createdAt: number;
};

type DeckStore = {
  decks: Deck[];
  addDeck: (name: string) => void;
  addCardToDeck: (deckId: string, card: CardInDeck, quantity?: number) => void;
  deleteDeck: (deckId: string) => void;
  removeCardFromDeck: (deckId: string, cardId: string) => void;
  updateCardQuantity: (deckId: string, cardId: string, quantity: number) => void;
  getDeck: (deckId: string) => Deck | undefined;
  // IMPORTANT: Add a forceUpdate function
  forceUpdate: () => void;
};

export const useDeckStore = create<DeckStore>()(
  persist(
    (set, get) => ({
      decks: [],
      
      addDeck: (name) =>
        set((state) => ({
          decks: [
            ...state.decks,
            {
              id: generateId(),
              name,
              cards: [],
              createdAt: Date.now(),
            },
          ],
        })),
      
      addCardToDeck: (deckId, card, quantity = 1) =>
        set((state) => ({
          decks: state.decks.map((deck) => {
            if (deck.id !== deckId) return deck;
            
            const existingCardIndex = deck.cards.findIndex(c => c.id === card.id);
            
            if (existingCardIndex > -1) {
              // Update quantity of existing card
              const updatedCards = [...deck.cards];
              const existingCard = updatedCards[existingCardIndex];
              updatedCards[existingCardIndex] = {
                ...existingCard,
                quantity: (existingCard.quantity || 1) + quantity,
              };
              return { ...deck, cards: updatedCards };
            } else {
              // Add new card with quantity
              return { 
                ...deck, 
                cards: [...deck.cards, { ...card, quantity }] 
              };
            }
          }),
        })),
      
      deleteDeck: (deckId) =>
        set((state) => ({
          decks: state.decks.filter((d) => d.id !== deckId),
        })),
      
      removeCardFromDeck: (deckId, cardId) =>
        set((state) => ({
          decks: state.decks.map((deck) => {
            if (deck.id !== deckId) return deck;
            return {
              ...deck,
              cards: deck.cards.filter(card => card.id !== cardId)
            };
          }),
        })),
      
      updateCardQuantity: (deckId, cardId, quantity) =>
        set((state) => ({
          decks: state.decks.map((deck) => {
            if (deck.id !== deckId) return deck;
            
            if (quantity <= 0) {
              // Remove card if quantity is 0 or less
              return {
                ...deck,
                cards: deck.cards.filter(card => card.id !== cardId)
              };
            }
            
            // Update quantity
            return {
              ...deck,
              cards: deck.cards.map(card => 
                card.id === cardId 
                  ? { ...card, quantity } 
                  : card
              )
            };
          }),
        })),
      
      getDeck: (deckId) => {
        return get().decks.find(d => d.id === deckId);
      },
      
      // Force update to trigger re-render
      forceUpdate: () => set((state) => ({ decks: [...state.decks] })),
    }),
    {
      name: 'deck-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ decks: state.decks }),
    }
  )
);