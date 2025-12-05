// stores/searchStore.ts
import { create } from 'zustand';

// Define the shape of a card (add more fields if you need them later)
interface Card {
  id: string;
  name: string;
  image_uris?: { small?: string };
  card_faces?: any[];
  // ... you can extend this later
}

type SearchStore = {
  originalPrintingOnly: boolean;
  uniqueCardsOnly: boolean;

  // ←←←←←←←←←←←←←←←←←←←←←← NEW: Store last search results ←←←←←←←←←←←←←←←←←←←←←←
  lastResults: Card[];
  setLastResults: (cards: Card[]) => void;
  clearLastResults: () => void; // optional but nice to have
  // ←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←

  toggleOriginalPrinting: () => void;
  toggleUniqueCards: () => void;
  setOriginalPrinting: (v: boolean) => void;
  setUniqueCards: (v: boolean) => void;
};

export const useSearchStore = create<SearchStore>((set) => ({
  originalPrintingOnly: false,
  uniqueCardsOnly: false,

  lastResults: [],
  setLastResults: (cards) => set({ lastResults: cards }),
  clearLastResults: () => set({ lastResults: [] }),

  toggleOriginalPrinting: () =>
    set((s) => ({ originalPrintingOnly: !s.originalPrintingOnly })),
  toggleUniqueCards: () =>
    set((s) => ({ uniqueCardsOnly: !s.uniqueCardsOnly })),

  setOriginalPrinting: (v) => set({ originalPrintingOnly: v }),
  setUniqueCards: (v) => set({ uniqueCardsOnly: v }),
}));