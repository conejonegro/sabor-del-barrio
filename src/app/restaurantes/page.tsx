import type { Metadata } from "next";
import { Suspense } from "react";
import HubPageHeader from "@/components/restaurantes/HubPageHeader";
import RestaurantesContent from "@/components/restaurantes/RestaurantesContent";
import RestaurantGridSkeleton from "@/components/restaurantes/RestaurantGridSkeleton";

export const metadata: Metadata = {
  title: "Restaurantes en Guadalajara",
  description:
    "Explora todos los restaurantes y puestos de comida callejera en Guadalajara. Filtra por colonia, platillo o recomendaciones del chef.",
  alternates: { canonical: "/restaurantes" },
};

type Props = {
  searchParams: Promise<{
    filter?: string;
    colonia?: string;
    platillo?: string;
    q?: string;
  }>;
};

export default function RestaurantesPage({ searchParams }: Props) {
  return (
    <main className="min-h-screen bg-masa">
      <HubPageHeader />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <Suspense fallback={<RestaurantGridSkeleton />}>
          <RestaurantesContent searchParams={searchParams} />
        </Suspense>
      </div>
    </main>
  );
}
