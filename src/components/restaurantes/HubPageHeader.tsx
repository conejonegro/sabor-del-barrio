import Link from "next/link";

export default function HubPageHeader() {
  return (
    <div className="bg-carbon py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <p className="text-white/40 text-sm font-sans mb-2">
          <Link href="/" className="hover:text-white/70 transition-colors">
            Inicio
          </Link>
          {" → "}
          <span className="text-white/70">Restaurantes</span>
        </p>
        <h1
          className="text-white text-4xl sm:text-5xl font-bold mb-3"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Todos los Restaurantes
        </h1>
        <p className="text-white/60 font-sans text-lg max-w-xl">
          Explora lo mejor de la escena gastronómica de Guadalajara — desde
          puestos callejeros hasta restaurantes de barrio.
        </p>
      </div>
    </div>
  );
}
