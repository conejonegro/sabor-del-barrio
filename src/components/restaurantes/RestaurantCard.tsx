import Link from "next/link";
import type { Restaurant } from "@/lib/types/restaurant";

export default function RestaurantCard({ restaurant }: { restaurant: Restaurant }) {
  return (
    <Link
      href={`/restaurantes/${restaurant.slug}`}
      className="group block rounded-2xl overflow-hidden bg-white shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200"
    >
      {/* Cover */}
      <div className="aspect-video bg-carbon relative overflow-hidden">
        {restaurant.coverPhoto ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={restaurant.coverPhoto}
            alt={restaurant.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-chili/50 to-carbon flex items-center justify-center">
            <span className="text-4xl">🍽️</span>
          </div>
        )}
        {restaurant.adminPick && (
          <span className="absolute top-3 left-3 bg-mango text-carbon text-xs font-sans font-bold px-2.5 py-1 rounded-full">
            ⭐ Recomendado
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <h3
          className="text-carbon text-lg font-bold leading-tight mb-1 group-hover:text-chili transition-colors"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {restaurant.name}
        </h3>
        <p className="text-adobe text-sm font-sans mb-3">
          {restaurant.colonia}, Guadalajara
        </p>
        <span className="inline-block bg-chili/10 text-chili text-xs font-sans font-medium px-3 py-1 rounded-full">
          {restaurant.platilloPrimary}
        </span>
      </div>
    </Link>
  );
}
