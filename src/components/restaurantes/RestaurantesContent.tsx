import { Suspense } from "react";
import FilterBar from "./FilterBar";
import RestaurantGrid from "./RestaurantGrid";
import RestaurantGridSkeleton from "./RestaurantGridSkeleton";
import SearchBar from "./SearchBar";
import RestaurantCard from "./RestaurantCard";
import { getAllRestaurants } from "@/lib/data/restaurants";
import type { Restaurant } from "@/lib/types/restaurant";

type Props = {
  searchParams: Promise<{
    filter?: string;
    colonia?: string;
    platillo?: string;
    q?: string;
  }>;
};

function filterRestaurants(restaurants: Restaurant[], q: string): Restaurant[] {
  const term = q.toLowerCase();
  return restaurants.filter(
    (r) =>
      r.name.toLowerCase().includes(term) ||
      r.colonia.toLowerCase().includes(term) ||
      r.description.toLowerCase().includes(term) ||
      r.platillos.some((p) => p.toLowerCase().includes(term))
  );
}

export default async function RestaurantesContent({ searchParams }: Props) {
  const { filter = "latest", colonia, platillo, q } = await searchParams;

  if (q) {
    const all = await getAllRestaurants();
    const results = filterRestaurants(all, q);

    return (
      <div className="space-y-6">
        <SearchBar defaultValue={q} />
        <p className="text-adobe text-sm font-sans">
          {results.length === 0
            ? "Sin resultados para esa búsqueda."
            : `${results.length} resultado${results.length !== 1 ? "s" : ""} para "${q}"`}
        </p>
        {results.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((r) => (
              <RestaurantCard key={r.id} restaurant={r} />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <SearchBar />
      <FilterBar
        activeFilter={
          filter as "latest" | "featured" | "adminPick" | "colonia" | "platillo"
        }
        activeColonia={colonia}
        activePlatillo={platillo}
      />

      <Suspense fallback={<RestaurantGridSkeleton />}>
        <RestaurantGrid filter={filter} colonia={colonia} platillo={platillo} />
      </Suspense>
    </div>
  );
}
