import { Suspense } from "react";
import FilterBar from "./FilterBar";
import RestaurantGrid from "./RestaurantGrid";
import RestaurantGridSkeleton from "./RestaurantGridSkeleton";

type Props = {
  searchParams: Promise<{
    filter?: string;
    colonia?: string;
    platillo?: string;
  }>;
};

export default async function RestaurantesContent({ searchParams }: Props) {
  const { filter = "latest", colonia, platillo } = await searchParams;

  return (
    <div className="space-y-8">
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
