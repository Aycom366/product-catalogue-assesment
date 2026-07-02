/**
 * Centralised React Query key factory. Keeping keys in one place (rather
 * than inlined in each hook) avoids typos/duplication and makes targeted
 * cache invalidation straightforward, e.g. `queryClient.invalidateQueries({
 * queryKey: productKeys.lists() })`.
 */
export const productKeys = {
  all: ['products'] as const,
  lists: () => [...productKeys.all, 'list'] as const,
  details: () => [...productKeys.all, 'detail'] as const,
  detail: (id: number) => [...productKeys.details(), id] as const,
};
