/**
 * Centralised React Query key factory, namespaced by domain. Keeping keys
 * in one place (rather than inlined in each hook) avoids typos/duplication
 * and makes targeted cache invalidation straightforward, e.g.
 * `queryClient.invalidateQueries({ queryKey: queryKeys.product.lists() })`.
 */
export const queryKeys = {
  product: {
    all: ['products'] as const,
    lists: () => [...queryKeys.product.all, 'list'] as const,
    details: () => [...queryKeys.product.all, 'detail'] as const,
    detail: (id: number) => [...queryKeys.product.details(), id] as const,
  },
};
