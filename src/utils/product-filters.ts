import type { Product } from '@/types/product';

/** Sentinel meaning "no category filter applied" — shown as an "All" tab in the UI. */
export const ALL_CATEGORIES = 'All';

/**
 * Returns the sorted list of distinct categories present in `products`,
 * prefixed with the "All" sentinel so it can drive a filter tab bar directly.
 */
export function getAvailableCategories(products: Product[]): string[] {
  const unique = Array.from(new Set(products.map((product) => product.category))).sort();
  return [ALL_CATEGORIES, ...unique];
}

export interface ProductFilters {
  search: string;
  category: string;
}

/**
 * Applies a case-insensitive title search and an optional category filter
 * to a product list. Pure function so it can be unit tested without
 * rendering any component or hook.
 */
export function filterProducts(products: Product[], { search, category }: ProductFilters): Product[] {
  const normalizedSearch = search.trim().toLowerCase();

  return products.filter((product) => {
    const matchesCategory = category === ALL_CATEGORIES || category === '' || product.category === category;
    const matchesSearch = normalizedSearch === '' || product.title.toLowerCase().includes(normalizedSearch);

    return matchesCategory && matchesSearch;
  });
}
