<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

## Critical breaking changes in Next.js 16 / Cache Components

- **Caching**: `'use cache'` directive (string literal inside function body, like `'use server'`). Requires `cacheComponents: true` in `next.config.ts`. Old `fetch` cache options are deprecated.
- **`params` is a Promise** in dynamic routes: always `const { slug } = await params`, never `params.slug` directly.
- **Tailwind v4**: uses `@import "tailwindcss"` + `@theme inline {}` in CSS. No `tailwind.config.js`. Custom tokens are CSS custom properties.
- **PPR (Partial Prerendering)** is the default when Cache Components is enabled. Static shell + streamed Suspense boundaries.
- **`cacheLife` / `cacheTag`** come from `next/cache`, not any external library.
- **`unstable_instant`** export on routes enables instant client-side navigation (new export, not a hook).
<!-- END:nextjs-agent-rules -->
