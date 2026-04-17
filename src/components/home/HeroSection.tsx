import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative flex items-center justify-center min-h-screen bg-black overflow-hidden">
      {/* Star/grid texture */}
      <div
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <p className="text-mango text-sm font-sans font-semibold uppercase tracking-widest mb-4">
          Guadalajara, México
        </p>

        <h1
          className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6"
          style={{ fontFamily: "var(--font-display)" }}
        >
          El Verdadero{" "}
          <span className="text-mango italic">Sabor</span>{" "}
          del Barrio
        </h1>

        <p className="font-sans text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed">
          Encuentra los mejores tacos, birria, tortas ahogadas y antojitos —
          recomendados por locales y pensados para que los turistas no se
          pierdan nada.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/restaurantes"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-chili text-white font-sans font-semibold text-base hover:bg-chili-light transition-colors duration-200 shadow-lg"
          >
            Explorar Restaurantes
          </Link>
          <Link
            href="/restaurantes?filter=colonia"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full border-2 border-white/40 text-white font-sans font-semibold text-base hover:bg-white/10 transition-colors duration-200"
          >
            Ver por Colonia
          </Link>
        </div>

        {/* Quick stats */}
        <div className="mt-16 flex flex-col sm:flex-row gap-8 justify-center text-center">
          {[
            { value: "200+", label: "Restaurantes" },
            { value: "30+", label: "Colonias" },
            { value: "50+", label: "Platillos" },
          ].map(({ value, label }) => (
            <div key={label}>
              <p
                className="font-display text-4xl font-bold text-mango"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {value}
              </p>
              <p className="font-sans text-white/60 text-sm mt-1">{label}</p>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
