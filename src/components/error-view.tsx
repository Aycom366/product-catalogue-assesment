import { Pressable, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';

interface ErrorViewProps {
  message?: string;
  onRetry: () => void;
}

export function ErrorView({ message = 'Something went wrong. Please try again.', onRetry }: ErrorViewProps) {
  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.icon}>⚠️</ThemedText>
      <ThemedText type="subtitle" style={styles.title}>
        Couldn&apos;t load products
      </ThemedText>
      <ThemedText themeColor="textSecondary" style={styles.message}>
        {message}
      </ThemedText>
      <Pressable
        onPress={onRetry}
        accessibilityRole="button"
        accessibilityLabel="Retry"
        testID="retry-button"
        style={styles.button}>
        <ThemedText style={styles.buttonLabel}>Retry</ThemedText>
      </Pressable>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.five,
    gap: Spacing.one,
  },
  icon: {
    fontSize: 36,
    marginBottom: Spacing.two,
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
  },
  message: {
    textAlign: 'center',
  },
  button: {
    marginTop: Spacing.four,
    backgroundColor: '#208AEF',
    paddingHorizontal: Spacing.five,
    paddingVertical: Spacing.two,
    borderRadius: Spacing.three,
  },
  buttonLabel: {
    color: '#ffffff',
    fontWeight: '700',
  },
});
