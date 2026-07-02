import { Image } from "expo-image";
import { Stack, useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";

import { ErrorView } from "@/components/error-view";
import { FavoriteButton } from "@/components/favorite-button";
import { LoadingView } from "@/components/loading-view";
import { RatingStars } from "@/components/rating-stars";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Spacing } from "@/constants/theme";
import { useProduct } from "@/hooks/use-product";
import { useFavoritesStore } from "@/store/favorites-store";

export default function ProductDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const productId = Number(id);
  const {
    data: product,
    isLoading,
    isError,
    error,
    refetch,
  } = useProduct(productId);
  const isFavorite = useFavoritesStore((state) =>
    Number.isFinite(productId) ? state.isFavorite(productId) : false,
  );
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);

  if (isLoading) {
    return (
      <ThemedView style={styles.container}>
        <LoadingView message='Loading product…' />
      </ThemedView>
    );
  }

  if (isError || !product) {
    return (
      <ThemedView style={styles.container}>
        <ErrorView
          message={error instanceof Error ? error.message : undefined}
          onRetry={refetch}
        />
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen
        options={{
          title: product.title,
        }}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.imageWrapper}>
          <Image
            source={{ uri: product.image }}
            style={styles.image}
            contentFit='contain'
            transition={150}
            accessibilityLabel={product.title}
          />
          <View style={styles.favoriteWrapper}>
            <FavoriteButton
              isFavorite={isFavorite}
              onToggle={() => toggleFavorite(product.id)}
            />
          </View>
        </View>

        <View style={styles.body}>
          <ThemedText type='small' themeColor='tint' style={styles.category}>
            {product.category}
          </ThemedText>
          <ThemedText type='title' style={styles.title}>
            {product.title}
          </ThemedText>

          <RatingStars
            rate={product.rating?.rate ?? 0}
            count={product.rating?.count}
          />

          <ThemedText type='subtitle' style={styles.price}>
            ${product.price.toFixed(2)}
          </ThemedText>

          <ThemedText type='smallBold' style={styles.sectionLabel}>
            Description
          </ThemedText>
          <ThemedText themeColor='textSecondary' style={styles.description}>
            {product.description}
          </ThemedText>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingBottom: Spacing.six,
  },
  imageWrapper: {
    height: 320,
    backgroundColor: "#ffffff",
  },
  image: {
    width: "100%",
    height: "100%",
    padding: Spacing.four,
  },
  favoriteWrapper: {
    position: "absolute",
    top: Spacing.three,
    right: Spacing.three,
  },
  body: {
    padding: Spacing.four,
    gap: Spacing.two,
  },
  category: {
    textTransform: "capitalize",
  },
  title: {
    fontSize: 24,
    lineHeight: 30,
  },
  price: {
    fontSize: 22,
    marginTop: Spacing.one,
  },
  sectionLabel: {
    marginTop: Spacing.three,
  },
  description: {
    lineHeight: 22,
  },
});
