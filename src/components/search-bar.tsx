import { Pressable, StyleSheet, TextInput } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";

interface SearchBarProps {
  value: string;
  onChangeText: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({
  value,
  onChangeText,
  placeholder = "Search products",
}: SearchBarProps) {
  const theme = useTheme();

  return (
    <ThemedView type='backgroundElement' style={styles.container}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.textSecondary}
        style={[styles.input, { color: theme.text }]}
        autoCorrect={false}
        autoCapitalize='none'
        returnKeyType='search'
        accessibilityLabel='Search products by title'
        testID='search-input'
      />
      {value.length > 0 && (
        <Pressable
          onPress={() => onChangeText("")}
          hitSlop={10}
          accessibilityRole='button'
          accessibilityLabel='Clear search'
        >
          <ThemedText themeColor='textSecondary' style={styles.clear}>
            ✕
          </ThemedText>
        </Pressable>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: Spacing.three,
    marginHorizontal: Spacing.three,
    paddingHorizontal: Spacing.three,
  },
  input: {
    flex: 1,
    paddingVertical: Spacing.two + 2,
    fontSize: 16,
  },
  clear: {
    fontSize: 16,
    paddingLeft: Spacing.two,
  },
});
