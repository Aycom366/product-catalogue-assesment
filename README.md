# Product Catalogue

A React Native (Expo) app that lists products from the [Fake Store API](https://fakestoreapi.com/products), with search, category filtering, product details, favourites, dark mode, and offline caching.

Built as a technical assessment. See [Assumptions and Limitations](#assumptions-and-limitations) for scope notes.

## Overview

The app has three screens:

- **Product List** — a searchable, filterable grid of products with pull-to-refresh.
- **Product Details** — full title, image, description, price, category, and rating.
- **Favourites** — products the user has hearted, persisted across app restarts.

## Features

- Product grid with image, title, price, category, and a two-line description preview
- Product details screen with rating (stars + review count)
- Search by title (case-insensitive)
- Category filter as horizontal pill tabs, derived from the loaded product list
- Loading, error (with retry), and empty-search-result states, all as dedicated components
- Pull-to-refresh on the product list
- **Favourites** (bonus): tap the heart on any card or the details screen; persisted to `AsyncStorage` via Zustand
- **Offline caching** (bonus): the React Query cache is persisted to `AsyncStorage`, so previously loaded products and details are visible immediately (and usable offline) on a cold start
- **Dark mode** (bonus): follows the system color scheme
- **Skeleton loaders** (bonus): pulsing placeholder cards during the initial fetch, instead of a bare spinner
- **Accessibility labels** (bonus): interactive elements (cards, favourite buttons, search, category tabs, retry) have `accessibilityLabel`/`accessibilityRole`
- **CI** (bonus): GitHub Actions runs lint, typecheck, and tests (with coverage) on every push/PR
- **Coverage report** (bonus): `npm run test:coverage`

Not implemented (see [Assumptions and Limitations](#assumptions-and-limitations)): pagination/infinite scroll — the API returns the full catalogue (20 items) in one call, so there was nothing to paginate.

## Tech Stack

| Concern | Choice | Why |
|---|---|---|
| Framework | Expo (React Native 0.86, SDK 57) | Fast setup, OTA-friendly, works on iOS/Android/web from one codebase |
| Navigation | Expo Router (file-based, on React Navigation) | Was already bootstrapped in the starter; type-safe routes; a plain `Stack` is enough for 3 screens — no tab bar needed |
| Language | TypeScript (`strict: true`) | Type safety for API responses, props, and store state |
| Server state | TanStack Query | Owns fetching/caching/retries/refetch for the product list and detail queries; built-in loading/error states map directly onto the UI states the brief asks for; persisted via `@tanstack/react-query-persist-client` + `AsyncStorage` for offline support |
| Client state | Zustand | The only *client* (non-server) state is favourites, which needs to persist across restarts — a single small persisted store is simpler than wiring up Context + a reducer + manual `AsyncStorage` read/write |
| Search/filter state | Plain `useState` in a dedicated hook (`useProductFilters`) | Screen-local UI state; no need for a global store. Kept in its own hook (backed by pure functions in `utils/product-filters.ts`) purely so it's unit-testable in isolation |
| Images | `expo-image` | Caching, `contentFit`, and better performance than `Image` from `react-native` |
| Testing | Jest (via `jest-expo`) + React Native Testing Library | Standard, well-supported RN testing stack |
| Linting | ESLint (`eslint-config-expo`, flat config) | Matches Expo's own recommended rules, including React Compiler safety rules |

**State management rationale, in one sentence:** server data (product list/detail) is owned by React Query because it *is* server state with well-defined caching/loading/error semantics; favourites are owned by a tiny persisted Zustand store because they're local, need to survive restarts, and don't warrant Context/Redux ceremony; search and category filters are local `useState` because they're purely UI-transient and scoped to one screen.

## Installation

Requires Node 20+ and npm.

```bash
git clone <this-repo-url>
cd product-catalogue
npm install --legacy-peer-deps
```

`--legacy-peer-deps` is required — see [Assumptions and Limitations](#assumptions-and-limitations) for why.

## Running the App

```bash
npm start        # opens Expo Dev Tools / QR code — scan with Expo Go, or press i/a
npm run ios      # iOS simulator (macOS only)
npm run android  # Android emulator
npm run web      # browser
```

## Running Tests

```bash
npm test              # run once
npm run test:watch    # watch mode
npm run test:coverage # with a coverage report (text summary + coverage/ output)
```

Other scripts:

```bash
npm run lint       # eslint .
npm run typecheck  # tsc --noEmit
```

All four (lint, typecheck, test, and coverage) also run in CI on every push/PR — see `.github/workflows/ci.yml`.

## Architecture

```
src/
  api/            fetch wrapper (ApiError) + Fake Store API endpoints
  app/            expo-router screens (file-based routing)
    _layout.tsx   Stack navigator + React Query provider + theme
    index.tsx     Product List screen
    product/[id].tsx  Product Details screen
    favorites.tsx Favourites screen
  components/     presentational, reusable UI (ProductCard, SearchBar,
                   CategoryFilter, RatingStars, FavoriteButton,
                   LoadingView, ErrorView, EmptyState, ProductSkeleton,
                   ThemedText/ThemedView)
  constants/      theme (colors, spacing, fonts)
  hooks/          useProducts/useProduct (React Query), useProductFilters
                   (search/category logic), useTheme, useColorScheme
  lib/            QueryClient instance + AsyncStorage persister
  store/          favorites-store (Zustand, persisted)
  types/          Product/ProductRating types
  utils/          pure, unit-tested filtering logic
```

The guiding separation: `api/` talks to the network and knows nothing about React; `hooks/` adapts that into React-friendly state; `components/` are pure presentation driven entirely by props; `app/` screens wire hooks to components and own navigation. `utils/product-filters.ts` holds the actual search/filter algorithm as plain functions so it can be tested without rendering anything.

## Screenshots

_Add screenshots or a short screen recording here before submitting (e.g. `docs/screenshot-list.png`, `docs/screenshot-details.png`, `docs/demo.gif`)._

## Assumptions and Limitations

- **Categories** are derived from the fetched product list (`getAvailableCategories`) rather than calling the separate `/products/categories` endpoint, to avoid a second network round-trip for data already present in the first response. The endpoint wrapper (`getCategories`) still exists in `src/api/products.ts` for completeness/future use.
- **No pagination** — the Fake Store API's `/products` endpoint returns all ~20 products in a single response, so there was nothing meaningful to paginate. If the catalogue were larger, `useInfiniteQuery` would be a drop-in replacement for `useQuery` in `use-products.ts`.
- **Search** is a simple case-insensitive substring match on title, computed client-side over the already-fetched list (the API has no search parameter). No debounce was added since filtering an in-memory array of ~20 items is effectively instant.
- **Icons are text glyphs** (★ ♥ ♡ ✕) rather than an icon font library, to avoid an extra dependency and the native asset linking that can come with it.
- **`npm install` requires `--legacy-peer-deps`.** This SDK 57 / React Native 0.86 stack is very new; a few packages (`jest-expo`'s bundled `jest-environment-jsdom`, `react-test-renderer` vs. the new `test-renderer` peer package used by React Native Testing Library v14) have peer ranges that lag slightly behind the exact versions in use. This is a resolution-time warning only — it doesn't affect app or test behaviour, and CI installs the same way.
- **Tests are scoped to logic and presentation, not full screens.** `app/*` screens wire together navigation, React Query, and Zustand; testing them meaningfully would mean mocking all three, which felt like more test-infrastructure than the assignment's "at least two meaningful tests" called for. Instead, the tests target the actual logic: filtering, API error handling, the favourites store, and a component's render + interaction behaviour (18 tests across 4 suites).
- **No visual regression / E2E tests** (e.g. Detox, Maestro) — out of scope for the time budget.
- The screenshots section above is a placeholder — real screenshots/recording should be captured from a simulator or device run before final submission.
