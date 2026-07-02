import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';

/**
 * Persists the React Query cache to AsyncStorage so the product list and
 * previously viewed product details remain available offline / after a
 * cold start, until they go stale and are refetched.
 */
export const asyncStoragePersister = createAsyncStoragePersister({
  storage: AsyncStorage,
  key: 'product-catalogue-query-cache',
});
