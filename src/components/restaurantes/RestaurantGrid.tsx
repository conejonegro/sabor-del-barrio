import {
  getLatestRestaurants,
  getFeaturedRestaurants,
  getAdminPickRestaurants,
  getRestaurantsByColonia,
  getRestaurantsByPlatillo,
} from "@/lib/data/restaurants";
import RestaurantCard from "./RestaurantCard";

type Props = {
  filter: string;
  colonia?: string;
  platillo?: string;
};

export default async function RestaurantGrid({ filter, colonia, platillo }: Props) {
  let restaurants;

  if (filter === "colonia" && colonia) {
    restaurants = await getRestaurantsByColonia(colonia);
  } else if (filter === "platillo" && platillo) {
    restaurants = await getRestaurantsByPlatillo(platillo);
  } else if (filter === "adminPick") {
    restaurants = await getAdminPickRestaurants();
  } else if (filter === "featured") {
    restaurants = await getFeaturedRestaurants();
  } else {
    restaurants = await getLatestRestaurants();
  }

  if (restaurants.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="text-adobe text-lg font-sans">
          No encontramos restaurantes con ese filtro todavía.
        </p>
        <p className="text-adobe/60 text-sm mt-1 font-sans">
          Pronto habrá más opciones.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {restaurants.map((r) => (
        <RestaurantCard key={r.id} restaurant={r} />
      ))}
    </div>
  );
}
