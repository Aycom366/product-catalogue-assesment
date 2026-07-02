import { ALL_CATEGORIES, filterProducts, getAvailableCategories } from '@/utils/product-filters';
import type { Product } from '@/types/product';

function makeProduct(overrides: Partial<Product>): Product {
  return {
    id: 1,
    title: 'Sample product',
    price: 10,
    description: 'A sample description',
    category: 'electronics',
    image: 'https://example.com/image.png',
    rating: { rate: 4, count: 10 },
    ...overrides,
  };
}

const products: Product[] = [
  makeProduct({ id: 1, title: 'Wireless Mouse', category: 'electronics' }),
  makeProduct({ id: 2, title: 'Leather Wallet', category: 'accessories' }),
  makeProduct({ id: 3, title: 'Wireless Keyboard', category: 'electronics' }),
];

describe('getAvailableCategories', () => {
  it('returns unique, sorted categories prefixed with "All"', () => {
    expect(getAvailableCategories(products)).toEqual([ALL_CATEGORIES, 'accessories', 'electronics']);
  });

  it('returns just "All" for an empty product list', () => {
    expect(getAvailableCategories([])).toEqual([ALL_CATEGORIES]);
  });
});

describe('filterProducts', () => {
  it('returns every product when search is empty and category is "All"', () => {
    const result = filterProducts(products, { search: '', category: ALL_CATEGORIES });
    expect(result).toHaveLength(3);
  });

  it('filters by title, case-insensitively', () => {
    const result = filterProducts(products, { search: 'wireless', category: ALL_CATEGORIES });
    expect(result.map((p) => p.id)).toEqual([1, 3]);
  });

  it('filters by category', () => {
    const result = filterProducts(products, { search: '', category: 'accessories' });
    expect(result.map((p) => p.id)).toEqual([2]);
  });

  it('combines search and category filters', () => {
    const result = filterProducts(products, { search: 'keyboard', category: 'electronics' });
    expect(result.map((p) => p.id)).toEqual([3]);
  });

  it('returns an empty array when nothing matches', () => {
    const result = filterProducts(products, { search: 'nonexistent', category: ALL_CATEGORIES });
    expect(result).toEqual([]);
  });
});
