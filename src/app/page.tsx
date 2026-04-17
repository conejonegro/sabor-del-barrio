import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";

export const metadata: Metadata = {
  title: "Comida Callejera en Guadalajara | Restaurantes y Puestos",
  description:
    "Guía completa de street food en Guadalajara. Encuentra birria, tacos, tortas ahogadas y antojitos recomendados por locales y turistas.",
  openGraph: {
    title: "Sabor del Barrio — Street Food Guadalajara",
    description:
      "Los mejores sabores de Guadalajara en un solo lugar.",
  },
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  return (
    <main>
      <HeroSection />
    </main>
  );
}
