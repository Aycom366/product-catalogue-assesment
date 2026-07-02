import { useQuery } from '@tanstack/react-query';

import { getProduct } from '@/api/products';
import { productKeys } from '@/api/query';

export function useProduct(id: number) {
  return useQuery({
    queryKey: productKeys.detail(id),
    queryFn: () => getProduct(id),
    enabled: Number.isFinite(id),
  });
}
