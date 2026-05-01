import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getRestaurantBySlug, getAllRestaurantSlugs } from "@/lib/data/restaurants";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllRestaurantSlugs();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const restaurant = await getRestaurantBySlug(slug);
  if (!restaurant) return {};
  return {
    title: restaurant.name,
    description: restaurant.description,
    openGraph: {
      title: `${restaurant.name} | Sabor del Barrio`,
      description: restaurant.description,
    },
    alternates: { canonical: `/restaurantes/${slug}` },
  };
}

export default async function RestaurantePage({ params }: Props) {
  const { slug } = await params;
  const restaurant = await getRestaurantBySlug(slug);

  if (!restaurant) notFound();

  return (
    <main className="min-h-screen bg-masa">
      {/* Cover */}
      <div className="relative h-72 sm:h-96 bg-carbon flex items-end">
        {restaurant.coverPhoto ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={restaurant.coverPhoto}
            alt={restaurant.name}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-chili/60 to-carbon" />
        )}
        <div className="relative z-10 w-full px-6 pb-6">
          <Link
            href="/restaurantes?filter=adminPick"
            className="inline-flex items-center gap-2 text-white/70 text-sm hover:text-white transition-colors mb-4"
          >
            ← Todos los restaurantes
          </Link>
          {restaurant.adminPick && (
            <span className="block w-fit bg-mango text-carbon text-xs font-sans font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3">
              ⭐ Recomendado
            </span>
          )}
          <h1
            className="text-white text-4xl sm:text-5xl font-bold leading-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {restaurant.name}
          </h1>
          <p className="text-white/70 text-sm mt-1 font-sans">
            {restaurant.colonia}, Guadalajara
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 py-10 space-y-10">
        {/* Description */}
        <p className="text-carbon text-lg leading-relaxed font-sans">
          {restaurant.description}
        </p>

        {/* Platillos */}
        <section>
          <h2
            className="text-carbon text-2xl font-bold mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Platillos
          </h2>
          <div className="flex flex-wrap gap-2">
            {restaurant.platillos.map((platillo) => (
              <span
                key={platillo}
                className={`px-4 py-2 rounded-full text-sm font-sans font-medium border ${
                  platillo === restaurant.platilloPrimary
                    ? "bg-chili text-white border-chili"
                    : "bg-white text-adobe border-adobe/30"
                }`}
              >
                {platillo}
              </span>
            ))}
          </div>
        </section>

        {/* Gallery */}
        {restaurant.photos.length > 0 && (
          <section>
            <h2
              className="text-carbon text-2xl font-bold mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Galería
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {restaurant.photos.map((photo, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={i}
                  src={photo}
                  alt={`${restaurant.name} foto ${i + 1}`}
                  className="w-full aspect-square object-cover rounded-xl"
                />
              ))}
            </div>
          </section>
        )}

        {/* Details */}
        <section>
          <h2
            className="text-carbon text-2xl font-bold mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Información
          </h2>
          <ul className="space-y-3 font-sans text-base text-carbon">
            {restaurant.address && (
              <li className="flex gap-3">
                <span className="text-adobe">📍</span>
                {restaurant.address}
              </li>
            )}
            {restaurant.hours && (
              <li className="flex gap-3">
                <span className="text-adobe">🕐</span>
                {restaurant.hours}
              </li>
            )}
            {restaurant.phone && (
              <li className="flex gap-3">
                <span className="text-adobe">📞</span>
                <a
                  href={`tel:${restaurant.phone.replace(/\s/g, "")}`}
                  className="hover:text-chili transition-colors"
                >
                  {restaurant.phone}
                </a>
              </li>
            )}
            {restaurant.instagram && (
              <li className="flex gap-3">
                <span className="text-adobe">📷</span>
                <span className="text-chili">{restaurant.instagram}</span>
              </li>
            )}
          </ul>
        </section>
      </div>
    </main>
  );
}
