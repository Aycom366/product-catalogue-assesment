import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import { useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { useTheme } from '@/hooks/use-theme';
import { asyncStoragePersister } from '@/lib/persister';
import { queryClient } from '@/lib/query-client';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const theme = useTheme();

  return (
    <SafeAreaProvider>
      <PersistQueryClientProvider client={queryClient} persistOptions={{ persister: asyncStoragePersister }}>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack
            screenOptions={{
              headerShadowVisible: false,
              headerStyle: { backgroundColor: theme.background },
              headerTintColor: theme.text,
              contentStyle: { backgroundColor: theme.background },
            }}>
            <Stack.Screen name="index" options={{ title: 'Products' }} />
            <Stack.Screen name="product/[id]" options={{ title: 'Product Details' }} />
            <Stack.Screen name="favorites" options={{ title: 'Favourites', presentation: 'modal' }} />
          </Stack>
        </ThemeProvider>
      </PersistQueryClientProvider>
    </SafeAreaProvider>
  );
}
