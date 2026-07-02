import { Pressable, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/hooks/use-theme';

interface FavoriteButtonProps {
  isFavorite: boolean;
  onToggle: () => void;
  size?: number;
}

export function FavoriteButton({ isFavorite, onToggle, size = 22 }: FavoriteButtonProps) {
  const theme = useTheme();

  return (
    <Pressable
      onPress={onToggle}
      hitSlop={10}
      style={[styles.button, { backgroundColor: theme.background }]}
      accessibilityRole="button"
      accessibilityLabel={isFavorite ? 'Remove from favourites' : 'Add to favourites'}
      accessibilityState={{ selected: isFavorite }}>
      <ThemedText themeColor={isFavorite ? 'danger' : 'textSecondary'} style={{ fontSize: size }}>
        {isFavorite ? '♥' : '♡'}
      </ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
});
