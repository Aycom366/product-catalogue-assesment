import { StyleSheet, View } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { useMemo } from "react";

interface RatingStarsProps {
  rate: number;
  count?: number;
}

const STAR_COUNT = 5;

/**
 * Renders a 0-5 star rating using text glyphs, so it needs no icon font
 * dependency. `rate` is rounded to the nearest half star.
 */
export function RatingStars({ rate, count }: RatingStarsProps) {
  const rounded = Math.round(rate * 2) / 2;

  const stars = useMemo(
    () =>
      Array.from({ length: STAR_COUNT }, (_, index) => {
        const position = index + 1;
        if (rounded >= position) return "★";
        if (rounded >= position - 0.5) return "⯨";
        return "☆";
      }),
    [rounded],
  );

  return (
    <View
      style={styles.container}
      accessibilityLabel={`Rated ${rate} out of 5${count ? ` from ${count} reviews` : ""}`}
    >
      <ThemedText themeColor='tint' style={styles.stars}>
        {stars.join("")}
      </ThemedText>
      <ThemedText type='small' themeColor='textSecondary'>
        {rate.toFixed(1)}
        {count !== undefined ? ` (${count})` : ""}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  stars: {
    fontSize: 15,
    letterSpacing: 1,
  },
});
