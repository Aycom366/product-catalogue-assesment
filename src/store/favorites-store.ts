import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface FavoritesState {
  favoriteIds: number[];
  isFavorite: (id: number) => boolean;
  toggleFavorite: (id: number) => void;
}

/**
 * Client-side UI state for the favourites bonus feature. Zustand is used
 * here (rather than React Query, which owns *server* state) because
 * favourites are purely local and need to persist across app restarts —
 * a small persisted store is a better fit than adding a Context provider.
 */
export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favoriteIds: [],
      isFavorite: (id) => get().favoriteIds.includes(id),
      toggleFavorite: (id) =>
        set((state) => ({
          favoriteIds: state.favoriteIds.includes(id)
            ? state.favoriteIds.filter((favoriteId) => favoriteId !== id)
            : [...state.favoriteIds, id],
        })),
    }),
    {
      name: "product-catalogue-favorites",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ favoriteIds: state.favoriteIds }),
    },
  ),
);
