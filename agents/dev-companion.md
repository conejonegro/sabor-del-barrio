# Dev Companion — Sabor del Barrio

You are the developer companion for **Sabor del Barrio**. You implement features following the architectural decisions in `agents/architect.md`. Read that file before starting any work session.

## Daily rules

- Read the relevant `node_modules/next/dist/docs/` page before using any Next.js API.
- Never add a library without asking. The stack is Next.js + Firebase + Tailwind + TypeScript — that's it.
- No comments unless the WHY is non-obvious. No docstrings. No TODO comments left in committed code.
- No error handling for impossible scenarios. Trust Server Component guarantees.

## Component conventions

```tsx
// Server Component (default — no directive needed)
export default async function FeaturedGrid() { ... }

// Client Component (only when interactive)
'use client'
export default function MobileMenu() { ... }

// Cached data function
export async function getFeaturedRestaurants() {
  'use cache'
  cacheLife('hours')
  cacheTag('featured-restaurants')
  // ...
}
```

- Props interfaces: inline, not exported unless shared across files.
- Use `next/image` with explicit `width`/`height` or `fill` + `sizes` — never without sizing.
- Use `next/link` for all internal navigation.

## Tailwind conventions

- Use the brand tokens via Tailwind classes: `bg-chili`, `text-mango`, `bg-masa`, etc.
- Mobile-first: base styles for mobile, `sm:` / `lg:` for larger breakpoints.
- Grid layouts: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` for restaurant cards.
- Card hover: `hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200`.
- No inline styles. No arbitrary values unless truly one-off (e.g., `h-[480px]` for hero).

## Firestore patterns

```ts
// Always typed, always server-side
import { getFirestore, collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore'
import { firebaseApp } from '@/lib/firebase/client'
import type { Restaurant } from '@/lib/types/restaurant'

const db = getFirestore(firebaseApp)
```

- Always cast doc data: `{ id: d.id, ...d.data() } as Restaurant`
- Return empty arrays (not null/undefined) when Firestore has no results — UI must handle gracefully.
- Never query Firestore from Client Components on initial load — that's what Server Components + `'use cache'` are for.

## File naming

- Components: `PascalCase.tsx`
- Utilities / data: `camelCase.ts`
- Collocate skeletons next to their real counterpart: `FeaturedGrid.tsx` + `FeaturedGridSkeleton.tsx`

## Suspense pattern (homepage)

```tsx
// In page.tsx — wrap every async server component
<Suspense fallback={<FeaturedGridSkeleton />}>
  <FeaturedGrid />
</Suspense>
```

Skeleton components use `animate-pulse` on gray divs that match the real component's dimensions exactly to prevent layout shift.

## Environment variables

- Firebase config uses `NEXT_PUBLIC_FIREBASE_*` — safe for client bundle.
- Never hardcode config values. Always read from `process.env`.
- If a required env var is missing, throw early with a descriptive message (only in `lib/firebase/client.ts`, not in components).

## Empty state rule

Every component that fetches data must render gracefully with an empty array:
- Featured grid with 0 restaurants: show a "Próximamente" message, not a crash.
- Category tiles with 0 categories: hide the section entirely.

## SEO checklist (for each new page)

- [ ] Export `metadata` with `title`, `description`, `openGraph`
- [ ] Inject JSON-LD `<script>` using helper from `src/lib/seo/structured-data.ts`
- [ ] `alternates.canonical` set to the page's canonical URL
- [ ] All images have descriptive `alt` text in Spanish
