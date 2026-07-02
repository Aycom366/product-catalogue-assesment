import { useMemo, useState } from 'react';

import type { Product } from '@/types/product';
import { ALL_CATEGORIES, filterProducts, getAvailableCategories } from '@/utils/product-filters';

/**
 * Owns the search text + category selection UI state for the product list
 * screen, and derives the filtered list and available categories from it.
 * Kept as a hook (rather than inline component state) so the filtering
 * behaviour can be unit tested independently of any screen.
 */
export function useProductFilters(products: Product[] | undefined) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<string>(ALL_CATEGORIES);

  const categories = useMemo(() => getAvailableCategories(products ?? []), [products]);

  const filteredProducts = useMemo(
    () => filterProducts(products ?? [], { search, category }),
    [products, search, category],
  );

  return { search, setSearch, category, setCategory, categories, filteredProducts };
}
