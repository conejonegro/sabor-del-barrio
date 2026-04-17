import Link from "next/link";

const EXPLORAR = [
  { label: "Inicio", href: "/" },
  { label: "Restaurantes", href: "/restaurantes" },
  { label: "Categorías", href: "/categorias" },
  { label: "Colonias", href: "/colonias" },
];

const DESCUBRE = [
  { label: "Birria", href: "/categorias/birria" },
  { label: "Tortas Ahogadas", href: "/categorias/tortas-ahogadas" },
  { label: "Tacos", href: "/categorias/tacos" },
  { label: "Antojitos", href: "/categorias/antojitos" },
];

export default function Footer() {
  return (
    <footer className="bg-carbon text-masa">
      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Col 1 — Brand */}
          <div>
            <span
              className="text-2xl font-bold text-mango"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Sabor del Barrio
            </span>
            <p className="mt-3 text-sm text-masa/60 leading-relaxed font-sans max-w-xs">
              El directorio de comida callejera en Guadalajara, Jalisco. Puestos,
              fondas y restaurantes recomendados por locales.
            </p>
          </div>

          {/* Col 2 — Explorar */}
          <div>
            <h3
              className="text-mango text-xs font-semibold uppercase tracking-wider mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Explorar
            </h3>
            <ul className="space-y-1">
              {EXPLORAR.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-masa/70 hover:text-masa transition-colors leading-7"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Descubre */}
          <div>
            <h3
              className="text-mango text-xs font-semibold uppercase tracking-wider mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Descubre
            </h3>
            <ul className="space-y-1">
              {DESCUBRE.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-masa/70 hover:text-masa transition-colors leading-7"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Contacto */}
          <div>
            <h3
              className="text-mango text-xs font-semibold uppercase tracking-wider mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Contacto
            </h3>
            <ul className="space-y-1">
              <li>
                <a
                  href="mailto:hola@sabordelbarrio.mx"
                  className="text-sm text-masa/70 hover:text-masa transition-colors leading-7"
                >
                  hola@sabordelbarrio.mx
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/sabordelbarrio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-masa/70 hover:text-masa transition-colors leading-7"
                >
                  @sabordelbarrio
                </a>
              </li>
            </ul>
            <p className="mt-4 text-xs text-masa/40 leading-relaxed font-sans">
              ¿Tienes un local? Escríbenos para aparecer en el directorio.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-masa/10 pt-6 text-center text-xs text-masa/40 font-sans">
          © 2026 Sabor del Barrio — Guadalajara, Jalisco
        </div>
      </div>
    </footer>
  );
}
