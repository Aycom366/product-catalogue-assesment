import { ApiError } from '@/api/client';
import { getProduct, getProducts } from '@/api/products';

describe('products API', () => {
  const originalFetch = globalThis.fetch;

  afterEach(() => {
    globalThis.fetch = originalFetch;
    jest.restoreAllMocks();
  });

  it('getProducts resolves with the parsed JSON body on success', async () => {
    const mockProducts = [{ id: 1, title: 'Test product' }];
    globalThis.fetch = jest.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: () => Promise.resolve(mockProducts),
    }) as unknown as typeof fetch;

    const result = await getProducts();

    expect(globalThis.fetch).toHaveBeenCalledWith('https://fakestoreapi.com/products');
    expect(result).toEqual(mockProducts);
  });

  it('getProduct requests the correct endpoint for a given id', async () => {
    const mockProduct = { id: 42, title: 'Specific product' };
    globalThis.fetch = jest.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: () => Promise.resolve(mockProduct),
    }) as unknown as typeof fetch;

    const result = await getProduct(42);

    expect(globalThis.fetch).toHaveBeenCalledWith('https://fakestoreapi.com/products/42');
    expect(result).toEqual(mockProduct);
  });

  it('throws an ApiError with the response status when the request fails', async () => {
    globalThis.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 404,
      json: () => Promise.resolve({}),
    }) as unknown as typeof fetch;

    await expect(getProducts()).rejects.toMatchObject(new ApiError('Request failed with status 404', 404));
  });

  it('throws a friendly ApiError when the network request itself fails', async () => {
    globalThis.fetch = jest.fn().mockRejectedValue(new Error('Network request failed')) as unknown as typeof fetch;

    await expect(getProducts()).rejects.toThrow(/Unable to reach the server/);
  });
});
