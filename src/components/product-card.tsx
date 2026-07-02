import { Image } from 'expo-image';
import { Pressable, StyleSheet, View } from 'react-native';

import { FavoriteButton } from '@/components/favorite-button';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import type { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
  onPress: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export function ProductCard({ product, onPress, isFavorite, onToggleFavorite }: ProductCardProps) {
  const theme = useTheme();

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${product.title}, $${product.price.toFixed(2)}`}
      style={({ pressed }) => [{ opacity: pressed ? 0.85 : 1 }]}
      testID={`product-card-${product.id}`}>
      <ThemedView type="backgroundElement" style={styles.card}>
        <View style={styles.imageWrapper}>
          <Image
            source={{ uri: product.image }}
            style={styles.image}
            contentFit="contain"
            transition={150}
            accessibilityLabel={product.title}
          />
          <View style={styles.favoriteWrapper}>
            <FavoriteButton isFavorite={isFavorite} onToggle={onToggleFavorite} size={18} />
          </View>
        </View>

        <View style={styles.details}>
          <ThemedText type="small" themeColor="tint" style={styles.category}>
            {product.category}
          </ThemedText>
          <ThemedText type="smallBold" numberOfLines={2} style={styles.title}>
            {product.title}
          </ThemedText>
          <ThemedText type="small" themeColor="textSecondary" numberOfLines={2}>
            {product.description}
          </ThemedText>
          <ThemedText type="default" style={[styles.price, { color: theme.text }]}>
            ${product.price.toFixed(2)}
          </ThemedText>
        </View>
      </ThemedView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: Spacing.three,
    overflow: 'hidden',
  },
  imageWrapper: {
    height: 140,
    backgroundColor: '#ffffff',
  },
  image: {
    width: '100%',
    height: '100%',
    padding: Spacing.two,
  },
  favoriteWrapper: {
    position: 'absolute',
    top: Spacing.two,
    right: Spacing.two,
  },
  details: {
    padding: Spacing.three,
    gap: 4,
  },
  category: {
    textTransform: 'capitalize',
  },
  title: {
    minHeight: 36,
  },
  price: {
    marginTop: Spacing.one,
    fontWeight: '700',
  },
});
