import { useRouter } from 'expo-router';
import { useCallback, useMemo } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import { EmptyState } from '@/components/empty-state';
import { ErrorView } from '@/components/error-view';
import { LoadingView } from '@/components/loading-view';
import { ProductCard } from '@/components/product-card';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { useProducts } from '@/hooks/use-products';
import { useFavoritesStore } from '@/store/favorites-store';
import type { Product } from '@/types/product';

export default function FavoritesScreen() {
  const router = useRouter();
  const { data: products, isLoading, isError, refetch } = useProducts();
  const favoriteIds = useFavoritesStore((state) => state.favoriteIds);
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);

  const favoriteProducts = useMemo(
    () => (products ?? []).filter((product) => favoriteIds.includes(product.id)),
    [products, favoriteIds],
  );

  const goToProduct = useCallback(
    (id: number) => router.push({ pathname: '/product/[id]', params: { id: String(id) } }),
    [router],
  );

  const renderItem = useCallback(
    ({ item }: { item: Product }) => (
      <View style={styles.cardWrapper}>
        <ProductCard
          product={item}
          onPress={() => goToProduct(item.id)}
          isFavorite
          onToggleFavorite={() => toggleFavorite(item.id)}
        />
      </View>
    ),
    [goToProduct, toggleFavorite],
  );

  if (isLoading) {
    return (
      <ThemedView style={styles.container}>
        <LoadingView message="Loading favourites…" />
      </ThemedView>
    );
  }

  if (isError) {
    return (
      <ThemedView style={styles.container}>
        <ErrorView message="Couldn't load your favourites." onRetry={refetch} />
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <FlatList
        data={favoriteProducts}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <EmptyState title="No favourites yet" message="Tap the heart on a product to save it here." />
        }
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    gap: Spacing.three,
    paddingHorizontal: Spacing.three,
  },
  listContent: {
    paddingBottom: Spacing.five,
    paddingTop: Spacing.three,
    flexGrow: 1,
  },
  cardWrapper: {
    flex: 1,
    minWidth: '45%',
  },
});
