import { useEffect, useState } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

/**
 * Pulsing placeholder shown in the grid while the initial product fetch is
 * in flight, so the layout doesn't jump once real cards arrive.
 */
export function ProductSkeleton() {
  const theme = useTheme();
  const [opacity] = useState(() => new Animated.Value(0.4));

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 1, duration: 600, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0.4, duration: 600, useNativeDriver: true }),
      ]),
    );
    pulse.start();
    return () => pulse.stop();
  }, [opacity]);

  return (
    <Animated.View
      style={[styles.card, { backgroundColor: theme.backgroundElement, opacity }]}
      testID="product-skeleton">
      <View style={[styles.image, { backgroundColor: theme.backgroundSelected }]} />
      <View style={styles.details}>
        <View style={[styles.line, styles.short, { backgroundColor: theme.backgroundSelected }]} />
        <View style={[styles.line, { backgroundColor: theme.backgroundSelected }]} />
        <View style={[styles.line, styles.short, { backgroundColor: theme.backgroundSelected }]} />
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: Spacing.three,
    overflow: 'hidden',
  },
  image: {
    height: 140,
  },
  details: {
    padding: Spacing.three,
    gap: Spacing.two,
  },
  line: {
    height: 10,
    borderRadius: 4,
  },
  short: {
    width: '60%',
  },
});
