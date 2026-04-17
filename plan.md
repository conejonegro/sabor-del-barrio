# Sabor del Barrio — Plan

Directorio de restaurantes y puestos de comida callejera en Guadalajara.
Stack: Next.js 16 + Firebase + Tailwind v4 + TypeScript

---

## Fase 1 — Foundation ✅

- [x] `next.config.ts` — cacheComponents, Firebase Storage remotePatterns
- [x] `globals.css` — paleta de marca (chili, mango, avocado, masa, carbon, adobe)
- [x] `layout.tsx` — Inter + Playfair Display, lang="es", metadata SEO global
- [x] `src/lib/firebase/client.ts` — init Firebase
- [x] `src/lib/types/restaurant.ts` — interfaces Restaurant, Category, Colonia
- [x] `.env.local.example` — template de credenciales

---

## Fase 2 — Data Layer

- [ ] `src/lib/data/restaurants.ts` — `getFeaturedRestaurants()` con `use cache`
- [ ] `src/lib/data/categories.ts` — `getCategories()` con `use cache`

---

## Fase 3 — Homepage

- [ ] `HeroSection` — headline, subheadline, 2 CTAs, imagen de fondo
- [ ] `CategoryTiles` — grid de platillos (Birria, Tortas Ahogadas, Tacos…)
- [ ] `FeaturedGrid` — grid de restaurantes destacados por el admin
- [ ] `FeaturedCard` — card individual (foto, nombre, colonia, platillos)
- [ ] Skeletons — `FeaturedGridSkeleton`, `CategoryTilesSkeleton`
- [ ] `src/app/page.tsx` — ensambla todo con Suspense + JSON-LD

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
- [ ] `Footer` — links, colonias, copyright

---

## Fase 6 — Calidad

- [ ] Empty states en todos los componentes con fetch
- [ ] Rich Results Test (JSON-LD)
- [ ] Lighthouse mobile > 90

---

## Futuro (no inmediato)

- [ ] Página individual de restaurante `/restaurantes/[slug]`
- [ ] Filtro por colonia `/colonias/[slug]`
- [ ] Filtro por platillo `/categorias/[slug]`
- [ ] Mapa (Google Maps o Mapbox)
- [ ] Panel de administrador
- [ ] Seed script para Firestore (`scripts/seed.ts`)
