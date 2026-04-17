# Feature: Conectar Firestore

**Objetivo**: Migrar de mock data a queries reales de Firestore.

## Archivos a tocar
- [ ] Reemplazar `src/lib/data/restaurants.ts` — queries Firestore + `use cache`
- [ ] Crear `scripts/seed.ts` — sembrar los 3 restaurantes mock en Firestore
- [ ] Actualizar `src/app/restaurantes/[slug]/page.tsx` — `generateStaticParams` usa `getAllRestaurantSlugs`

## Índices compuestos a crear en Firestore Console
- `featured ASC` + `featuredOrder ASC`
- `adminPick ASC` + `createdAt DESC`
- `coloniaRef ASC` + `createdAt DESC`
- `platillos ARRAY` + `createdAt DESC`

## Notas
- Eliminar mock array completamente (sin fallback silencioso)
- Seed: `dotenv -e .env.local -- npx tsx scripts/seed.ts`
- `array-contains` en Firestore es exact match — los platillos deben coincidir exactamente
