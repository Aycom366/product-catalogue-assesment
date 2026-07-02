import { StyleSheet } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Spacing } from "@/constants/theme";

interface EmptyStateProps {
  title: string;
  message?: string;
}

export function EmptyState({ title, message }: EmptyStateProps) {
  return (
    <ThemedView style={styles.container} testID='empty-state'>
      <ThemedText
        testID='empty-state-title'
        type='smallBold'
        style={styles.title}
      >
        {title}
      </ThemedText>
      {message ? (
        <ThemedText
          testID='empty-state-message'
          themeColor='textSecondary'
          style={styles.message}
        >
          {message}
        </ThemedText>
      ) : null}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: Spacing.five,
    paddingTop: Spacing.six,
    gap: Spacing.one,
  },
  icon: {
    fontSize: 32,
    marginBottom: Spacing.two,
  },
  title: {
    textAlign: "center",
  },
  message: {
    textAlign: "center",
  },
});
