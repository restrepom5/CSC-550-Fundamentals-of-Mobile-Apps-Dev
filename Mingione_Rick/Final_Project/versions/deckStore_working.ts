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
  addCardToDeck: (deckId: string, card: CardInDeck) => void;
  deleteDeck: (deckId: string) => void;
};

export const useDeckStore = create<DeckStore>()(
  persist(
    (set) => ({
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
      addCardToDeck: (deckId, card) =>
        set((state) => ({
          decks: state.decks.map((d) =>
            d.id === deckId ? { ...d, cards: [...d.cards, card] } : d
          ),
        })),
      deleteDeck: (deckId) =>
        set((state) => ({
          decks: state.decks.filter((d) => d.id !== deckId),
        })),
    }),
//     {
//       name: 'deck-storage',
//       storage: createJSONStorage(() =>
//         typeof window !== 'undefined' ? localStorage : AsyncStorage
//       ),
//       partialize: (state) => ({ decks: state.decks }),
//     }
    {
      name: 'deck-storage',
      storage: createJSONStorage(() => AsyncStorage), // ← This removes import.meta
      partialize: (state) => ({ decks: state.decks }),
    }
  )
);