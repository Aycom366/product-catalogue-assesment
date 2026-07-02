import { useFavoritesStore } from '@/store/favorites-store';

describe('favorites store', () => {
  beforeEach(() => {
    useFavoritesStore.setState({ favoriteIds: [] });
  });

  it('starts with no favourites', () => {
    expect(useFavoritesStore.getState().favoriteIds).toEqual([]);
    expect(useFavoritesStore.getState().isFavorite(1)).toBe(false);
  });

  it('adds a product to favourites when toggled on', () => {
    useFavoritesStore.getState().toggleFavorite(1);

    expect(useFavoritesStore.getState().favoriteIds).toEqual([1]);
    expect(useFavoritesStore.getState().isFavorite(1)).toBe(true);
  });

  it('removes a product from favourites when toggled again', () => {
    useFavoritesStore.getState().toggleFavorite(1);
    useFavoritesStore.getState().toggleFavorite(1);

    expect(useFavoritesStore.getState().favoriteIds).toEqual([]);
    expect(useFavoritesStore.getState().isFavorite(1)).toBe(false);
  });

  it('tracks multiple favourites independently', () => {
    useFavoritesStore.getState().toggleFavorite(1);
    useFavoritesStore.getState().toggleFavorite(2);
    useFavoritesStore.getState().toggleFavorite(1);

    expect(useFavoritesStore.getState().favoriteIds).toEqual([2]);
  });
});
