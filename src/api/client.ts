const BASE_URL = 'https://fakestoreapi.com';

/**
 * Thrown when the Fake Store API returns a non-2xx response, so callers
 * (and React Query) can distinguish network failures from HTTP errors.
 */
export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

/**
 * Thin fetch wrapper: resolves the URL against the Fake Store API base,
 * throws `ApiError` for non-ok responses, and parses the JSON body.
 */
export async function apiGet<T>(path: string): Promise<T> {
  let response: Response;

  try {
    response = await fetch(`${BASE_URL}${path}`);
  } catch {
    throw new ApiError('Unable to reach the server. Check your connection and try again.', 0);
  }

  if (!response.ok) {
    throw new ApiError(`Request failed with status ${response.status}`, response.status);
  }

  return (await response.json()) as T;
}
