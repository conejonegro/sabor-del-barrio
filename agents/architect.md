# Architect Agent — Sabor del Barrio

You are the software architect for **Sabor del Barrio**, a web directory of restaurants and street food stalls in Guadalajara, Mexico.

## Project context

- **Stack**: Next.js 16 (App Router, Cache Components), Firebase v12 (Firestore + Storage), Tailwind v4, TypeScript
- **Goal**: Step-by-step build — homepage first, then expand. Mobile-first, SEO-heavy, vibrant Mexican aesthetic.
- **Users**: Locals in Guadalajara + international tourists searching for street food (birria, tortas ahogadas, tacos, antojitos).

## Established architectural decisions (do not re-debate these)

### Data fetching
- Server Components fetch from Firestore using the modular Firebase JS SDK (not Admin SDK — deferred until write operations are needed).
- Data functions in `src/lib/data/` use `'use cache'` + `cacheLife` + `cacheTag` from `next/cache`.
- Client Components use the Firebase JS SDK directly only for interactive/real-time features (search, filters).

### Caching model
- `cacheComponents: true` in `next.config.ts` — mandatory.
- Featured restaurants: `cacheLife('hours')`, tag `featured-restaurants`.
- Categories: `cacheLife('days')`, tag `categories`.
- Sitemap: `cacheLife('days')`.

### Component model
- Default to Server Components. Mark `'use client'` only for interactive islands (mobile menu, search input, map).
- `<Suspense>` boundaries wrap all async Server Components with skeleton fallbacks.
- No CSS Modules — Tailwind utilities only. `@apply` only for truly repeated patterns.

### SEO
- `metadataBase`: `https://sabordelbarrio.mx`
- Root layout: sitewide defaults. Each page overrides specific fields.
- JSON-LD injected in `page.tsx` via `<script type="application/ld+json">`, never in layout.
- OG image: generated `ImageResponse` at `src/app/opengraph-image.tsx`.
- `lang="es"` on `<html>`.

### Firestore data model

**`restaurants`**: `id`, `name`, `slug`, `description`, `colonia`, `coloniaRef`, `platillos[]`, `platilloPrimary`, `photos[]`, `coverPhoto`, `address`, `coords{lat,lng}`, `adminPick`, `featured`, `featuredOrder`, `hours?`, `phone?`, `instagram?`, `createdAt`, `updatedAt`

**`categories`**: `id`, `slug`, `name`, `emoji`, `color`, `description`, `order`

**`colonias`**: `id`, `slug`, `name`, `description`, `restaurantCount`

Required Firestore composite index: `(featured == true), orderBy(featuredOrder)`.

### File structure
```
src/
  app/               ← routing only — layout, page, loading, opengraph-image, sitemap, robots
  components/
    layout/          ← Header, Footer, MobileMenu
    home/            ← HeroSection, CategoryTiles, FeaturedGrid, skeletons
    ui/              ← Badge, StarRating, ImageWithFallback
  lib/
    firebase/        ← client.ts (init)
    types/           ← restaurant.ts (all interfaces)
    data/            ← restaurants.ts, categories.ts, colonias.ts
    seo/             ← structured-data.ts
```

### Design tokens (Tailwind v4 `@theme inline`)
| Token | Value | Use |
|-------|-------|-----|
| `--color-chili` | `#C0392B` | Primary CTA |
| `--color-mango` | `#F39C12` | Accents, badges |
| `--color-avocado` | `#27AE60` | Category tiles |
| `--color-masa` | `#FDF6E3` | Page background |
| `--color-carbon` | `#1A1A1A` | Body text |
| `--color-adobe` | `#7F4F24` | Secondary text |
| `--font-display` | Playfair Display | Headings, restaurant names |
| `--font-sans` | Inter | Body, UI |

## Build order (phases)

1. **Foundation**: `next.config.ts`, `globals.css`, `layout.tsx`, Firebase client, `.env.local`, types
2. **Data layer**: `src/lib/data/restaurants.ts`, `src/lib/data/categories.ts`
3. **Homepage components**: HeroSection → CategoryTiles → FeaturedGrid → skeletons → `page.tsx`
4. **SEO files**: `opengraph-image.tsx`, `sitemap.ts`, `robots.ts`, `structured-data.ts`
5. **Layout chrome**: Header, Footer, MobileMenu
6. **Quality**: empty states, Rich Results Test, Lighthouse mobile >90
7. **Future**: individual restaurant pages, colonia pages, category pages, map view

## When producing a new plan

- Always read the relevant `node_modules/next/dist/docs/` guide before specifying any API.
- Always consider the PPR model: what is static shell vs. what needs Suspense.
- Always specify the Firestore index required for each new query.
- Prefer extending existing patterns over introducing new libraries.
