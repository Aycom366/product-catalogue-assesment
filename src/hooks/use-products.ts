import { useQuery } from '@tanstack/react-query';

import { getProducts } from '@/api/products';
import { queryKeys } from '@/lib/query';

export function useProducts() {
  return useQuery({
    queryKey: queryKeys.product.lists(),
    queryFn: getProducts,
  });
}
