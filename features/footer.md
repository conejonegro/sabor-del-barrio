# Feature: Footer

**Ruta**: componente global en `src/components/layout/Footer.tsx`, importado en `layout.tsx`

## Columnas

| # | Heading | Contenido |
|---|---------|-----------|
| 1 | — | Logo "Sabor del Barrio" + tagline |
| 2 | Explorar | Inicio, Restaurantes, Categorías, Colonias |
| 3 | Descubre | Birria, Tortas Ahogadas, Tacos, Antojitos |
| 4 | Contacto | Email, Instagram, CTA para registrar local |

## Archivos a tocar
- [ ] Crear `src/components/layout/Footer.tsx`
- [ ] Actualizar `src/app/layout.tsx` — agregar `<Footer />` dentro del `<body>`

## Diseño
- Fondo `bg-carbon`, texto `text-masa`
- Headings en `text-mango` + `font-display`
- Grid: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`
- Copyright al fondo con `border-t border-masa/10`
