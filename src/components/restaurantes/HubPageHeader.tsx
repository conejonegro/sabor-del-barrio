import Link from "next/link";
import Image from "next/image";

export default function HubPageHeader() {
  return (
    <div className="relative py-12 px-6 overflow-hidden">
      <Image
        src="/images/sabor-del-barrio-dark-banner.png"
        alt=""
        fill
        className="object-cover object-center"
        priority
      />
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative max-w-7xl mx-auto">
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
