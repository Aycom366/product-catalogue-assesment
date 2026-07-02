import { useQuery } from '@tanstack/react-query';

import { getProducts } from '@/api/products';
import { productKeys } from '@/api/query';

export function useProducts() {
  return useQuery({
    queryKey: productKeys.lists(),
    queryFn: getProducts,
  });
}
