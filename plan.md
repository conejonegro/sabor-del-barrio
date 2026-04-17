# Sabor del Barrio — Plan

Directorio de restaurantes y puestos de comida callejera en Guadalajara.
Stack: Next.js 16 + Firebase + Tailwind v4 + TypeScript

---

## Fase 1 — Foundation ✅

- [x] `next.config.ts` — cacheComponents, Firebase Storage remotePatterns
- [x] `globals.css` — `@theme` con paleta de marca (chili, mango, avocado, masa, carbon, adobe)
- [x] `layout.tsx` — Inter + Playfair Display, lang="es", metadata SEO global
- [x] `src/lib/firebase/client.ts` — init Firebase con validación de env vars
- [x] `src/lib/types/restaurant.ts` — interfaces Restaurant, Category, Colonia
- [x] `.env.local.example` — template de credenciales

---

## Fase 2 — Data Layer ✅

- [x] `src/lib/data/restaurants.ts` — Firestore real + `use cache` en todas las funciones
- [x] `.env.local` — credenciales Firebase configuradas
- [x] `scripts/seed.ts` — sembrar restaurantes iniciales (`dotenv -e .env.local -- npx tsx scripts/seed.ts`)
- [ ] Crear índices compuestos en Firestore console (ver `features/firebase-firestore-connection.md`)
- [ ] `src/lib/data/categories.ts` — `getCategories()`

---

## Fase 3 — Homepage (parcial)

- [x] `HeroSection` — headline, fondo negro con textura estrella, 2 CTAs, stats
- [x] `src/app/page.tsx` — renderiza HeroSection
- [ ] `CategoryTiles` — grid de platillos (Birria, Tortas Ahogadas, Tacos…)
- [ ] `FeaturedGrid` — grid de restaurantes destacados por el admin
- [ ] Skeletons — `FeaturedGridSkeleton`, `CategoryTilesSkeleton`

---

## Fase 3b — Páginas de Restaurante ✅

- [x] `/restaurantes` — hub con filtros (latest, featured, adminPick, colonia, platillo)
  - `HubPageHeader`, `FilterBar` (client), `RestaurantesContent`, `RestaurantGrid`, `RestaurantCard`
  - Skeletons: `FilterBarSkeleton`, `RestaurantGridSkeleton`
  - Pattern: `searchParams` se awaitea en `RestaurantesContent` dentro de `<Suspense>`
- [x] `/restaurantes/[slug]` — página individual de restaurante
  - `generateStaticParams` para evitar runtime data error con `params`
  - Cover, platillos, información de contacto

---

## Lecciones aprendidas (Next.js 16)

- `@theme inline` NO emite CSS custom properties a `:root` — usar `@theme` sin `inline`
- `params` y `searchParams` son runtime data: deben awaitearse DENTRO de un componente envuelto en `<Suspense>`, nunca en el page component directamente
- `generateStaticParams` convierte `params` en build-time data (solución para rutas dinámicas simples)
- Para `searchParams`: mover el `await` a un componente hijo (`RestaurantesContent`) dentro de `<Suspense>`

---

## Fase 4 — SEO

- [ ] `src/app/opengraph-image.tsx` — OG image generada con ImageResponse
- [ ] `src/app/sitemap.ts` — rutas estáticas + restaurantes dinámicos
- [ ] `src/app/robots.ts`
- [ ] `src/lib/seo/structured-data.ts` — helpers JSON-LD (WebSite, LocalBusiness)

---

## Fase 5 — Layout Chrome

- [ ] `Header` — logo + nav links
- [ ] `MobileMenu` — hamburger (client component)
- [x] `Footer` — 4 columnas: brand, explorar, descubre, contacto

---

## Fase 6 — Calidad

- [ ] Empty states en todos los componentes con fetch
- [ ] Rich Results Test (JSON-LD)
- [ ] Lighthouse mobile > 90

---

## Futuro (no inmediato)

- [ ] Filtro por colonia `/colonias/[slug]`
- [ ] Filtro por platillo `/categorias/[slug]`
- [ ] Mapa (Google Maps o Mapbox)
- [ ] Panel de administrador
- [ ] Seed script para Firestore (`scripts/seed.ts`)
- [ ] Firestore indexes: `createdAt DESC`, `adminPick + createdAt`, `coloniaRef + createdAt`, `platillos array + createdAt`
