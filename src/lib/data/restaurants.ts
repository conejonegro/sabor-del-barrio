import type { Restaurant } from "@/lib/types/restaurant";
import { Timestamp } from "firebase/firestore";

// Mock data — replace with Firestore queries once Firebase is configured
const mockRestaurants: Restaurant[] = [
  {
    id: "1",
    name: "La Birriería de Don Beto",
    slug: "la-birreria-de-don-beto",
    description:
      "Más de 30 años sirviendo la mejor birria de res en Guadalajara. Caldo rojo oscuro, carne suave y tortillas de maíz recién hechas. Un clásico del barrio que no falla.",
    colonia: "Analco",
    coloniaRef: "analco",
    platillos: ["Birria de res", "Consomé", "Quesabirria", "Tostadas de birria"],
    platilloPrimary: "Birria de res",
    photos: [],
    coverPhoto: "",
    address: "Calle Moctezuma 234, Analco, Guadalajara, Jalisco",
    coords: { lat: 20.6597, lng: -103.3496 },
    adminPick: true,
    featured: true,
    featuredOrder: 1,
    hours: "Sáb–Dom 8:00am – 2:00pm",
    phone: "33 1234 5678",
    instagram: "@birreria_don_beto",
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  },
  {
    id: "2",
    name: "Las Tortas de la Barda",
    slug: "las-tortas-de-la-barda",
    description:
      "El puesto favorito de los tapatíos para la torta ahogada auténtica. Birote salado bañado en salsa de chile de árbol, con carnitas o lomo.",
    colonia: "Santa Tere",
    coloniaRef: "santa-tere",
    platillos: ["Torta ahogada", "Torta media ahogada", "Agua de horchata"],
    platilloPrimary: "Torta ahogada",
    photos: [],
    coverPhoto: "",
    address: "Av. Federalismo Norte 456, Santa Tere, Guadalajara, Jalisco",
    coords: { lat: 20.6845, lng: -103.3501 },
    adminPick: false,
    featured: true,
    featuredOrder: 2,
    hours: "Lun–Sáb 9:00am – 4:00pm",
    phone: "33 9876 5432",
    instagram: "@tortasdelabarda",
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  },
  {
    id: "3",
    name: "Tacos El Güero",
    slug: "tacos-el-guero",
    description:
      "Tacos de canasta, de guisado y al pastor en el corazón de Chapultepec. El favorito de la noche para los que salen del trabajo.",
    colonia: "Chapultepec",
    coloniaRef: "chapultepec",
    platillos: ["Tacos al pastor", "Tacos de canasta", "Quesadilla", "Agua fresca"],
    platilloPrimary: "Tacos al pastor",
    photos: [],
    coverPhoto: "",
    address: "Av. Chapultepec 789, Guadalajara, Jalisco",
    coords: { lat: 20.6736, lng: -103.3741 },
    adminPick: true,
    featured: true,
    featuredOrder: 3,
    hours: "Lun–Dom 7:00pm – 2:00am",
    phone: "33 5555 1234",
    instagram: "@tacosElGuero",
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  },
];

export async function getRestaurantBySlug(
  slug: string
): Promise<Restaurant | null> {
  return mockRestaurants.find((r) => r.slug === slug) ?? null;
}

export async function getFeaturedRestaurants(): Promise<Restaurant[]> {
  return [...mockRestaurants]
    .filter((r) => r.featured)
    .sort((a, b) => a.featuredOrder - b.featuredOrder);
}

export async function getLatestRestaurants(limit = 12): Promise<Restaurant[]> {
  return mockRestaurants.slice(0, limit);
}

export async function getAdminPickRestaurants(limit = 12): Promise<Restaurant[]> {
  return mockRestaurants.filter((r) => r.adminPick).slice(0, limit);
}

export async function getRestaurantsByColonia(
  coloniaRef: string,
  limit = 12
): Promise<Restaurant[]> {
  return mockRestaurants
    .filter((r) => r.coloniaRef === coloniaRef)
    .slice(0, limit);
}

export async function getRestaurantsByPlatillo(
  platillo: string,
  limit = 12
): Promise<Restaurant[]> {
  return mockRestaurants
    .filter((r) =>
      r.platillos.some((p) =>
        p.toLowerCase().includes(platillo.toLowerCase())
      )
    )
    .slice(0, limit);
}

export async function getAllRestaurantSlugs(): Promise<{ slug: string }[]> {
  return mockRestaurants.map((r) => ({ slug: r.slug }));
}
