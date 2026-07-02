import { apiGet } from '@/api/client';
import type { Product } from '@/types/product';

export function getProducts(): Promise<Product[]> {
  return apiGet<Product[]>('/products');
}

export function getProduct(id: number): Promise<Product> {
  return apiGet<Product>(`/products/${id}`);
}

export function getCategories(): Promise<string[]> {
  return apiGet<string[]>('/products/categories');
}
