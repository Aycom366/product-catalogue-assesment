import { QueryClient } from '@tanstack/react-query';

/**
 * Single QueryClient shared by the app. Default options favour a mobile
 * usage pattern: cached data is shown immediately while a background
 * refresh runs, and failed requests are retried once before surfacing
 * an error state to the user.
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 60 * 24, // 24 hours, so persisted cache stays usable offline
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});
