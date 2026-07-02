import { Link, Stack, useRouter } from 'expo-router';
import { useCallback } from 'react';
import { FlatList, Pressable, RefreshControl, StyleSheet, View } from 'react-native';

import { CategoryFilter } from '@/components/category-filter';
import { EmptyState } from '@/components/empty-state';
import { ErrorView } from '@/components/error-view';
import { ProductCard } from '@/components/product-card';
import { ProductSkeleton } from '@/components/product-skeleton';
import { SearchBar } from '@/components/search-bar';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { useProductFilters } from '@/hooks/use-product-filters';
import { useProducts } from '@/hooks/use-products';
import { useTheme } from '@/hooks/use-theme';
import { useFavoritesStore } from '@/store/favorites-store';
import { ALL_CATEGORIES } from '@/utils/product-filters';
import type { Product } from '@/types/product';

const SKELETON_COUNT = 6;

export default function ProductListScreen() {
  const theme = useTheme();
  const router = useRouter();
  const { data: products, isLoading, isError, error, refetch, isRefetching } = useProducts();
  const { search, setSearch, category, setCategory, categories, filteredProducts } = useProductFilters(products);
  const favoriteIds = useFavoritesStore((state) => state.favoriteIds);
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);

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
          isFavorite={favoriteIds.includes(item.id)}
          onToggleFavorite={() => toggleFavorite(item.id)}
        />
      </View>
    ),
    [favoriteIds, goToProduct, toggleFavorite],
  );

  const headerRight = useCallback(
    () => (
      <Link href="/favorites" asChild>
        <Pressable accessibilityRole="button" accessibilityLabel="View favourites" hitSlop={10}>
          <ThemedText style={styles.headerIcon}>
            {favoriteIds.length > 0 ? '♥' : '♡'}
          </ThemedText>
        </Pressable>
      </Link>
    ),
    [favoriteIds.length],
  );

  if (isLoading) {
    return (
      <ThemedView style={styles.container}>
        <Stack.Screen options={{ headerRight }} />
        <View style={styles.skeletonGrid}>
          {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
            <View key={index} style={styles.cardWrapper}>
              <ProductSkeleton />
            </View>
          ))}
        </View>
      </ThemedView>
    );
  }

  if (isError && !products) {
    return (
      <ThemedView style={styles.container}>
        <Stack.Screen options={{ headerRight }} />
        <ErrorView message={error instanceof Error ? error.message : undefined} onRetry={refetch} />
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen options={{ headerRight }} />
      <SearchBar value={search} onChangeText={setSearch} />
      <CategoryFilter categories={categories} selected={category} onSelect={setCategory} />
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} tintColor={theme.tint} />
        }
        ListEmptyComponent={
          <EmptyState
            title="No products found"
            message={
              category !== ALL_CATEGORIES
                ? `No results in "${category}"${search ? ` for "${search}"` : ''}.`
                : `No results for "${search}".`
            }
          />
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
    paddingTop: Spacing.two,
    flexGrow: 1,
  },
  skeletonGrid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.three,
    paddingHorizontal: Spacing.three,
    paddingTop: Spacing.three,
  },
  cardWrapper: {
    flex: 1,
    minWidth: '45%',
  },
  headerIcon: {
    fontSize: 22,
  },
});
