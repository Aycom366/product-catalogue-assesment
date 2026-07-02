import { useQuery } from '@tanstack/react-query';

import { getProduct } from '@/api/products';
import { queryKeys } from '@/lib/query';

export function useProduct(id: number) {
  return useQuery({
    queryKey: queryKeys.product.detail(id),
    queryFn: () => getProduct(id),
    enabled: Number.isFinite(id),
  });
}
