import {
  getFirestore,
  collection,
  query,
  where,
  orderBy,
  limit as fsLimit,
  getDocs,
  type DocumentData,
  type Timestamp,
} from "firebase/firestore";
import { cacheLife, cacheTag } from "next/cache";
import { firebaseApp } from "@/lib/firebase/client";
import type { Restaurant } from "@/lib/types/restaurant";

const db = getFirestore(firebaseApp);
const col = collection(db, "restaurants");

function serialize(id: string, data: DocumentData): Restaurant {
  return {
    ...data,
    id,
    createdAt: (data.createdAt as Timestamp)?.seconds ?? 0,
    updatedAt: (data.updatedAt as Timestamp)?.seconds ?? 0,
  } as Restaurant;
}

export async function getRestaurantBySlug(
  slug: string
): Promise<Restaurant | null> {
  "use cache";
  cacheLife("hours");
  cacheTag("restaurant", `restaurant-${slug}`);

  const q = query(col, where("slug", "==", slug), fsLimit(1));
  const snap = await getDocs(q);
  if (snap.empty) return null;
  const d = snap.docs[0];
  return serialize(d.id, d.data());
}

export async function getFeaturedRestaurants(): Promise<Restaurant[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("featured-restaurants");

  const q = query(
    col,
    where("featured", "==", true),
    orderBy("featuredOrder", "asc")
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => serialize(d.id, d.data()));
}

export async function getLatestRestaurants(limit = 12): Promise<Restaurant[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("latest-restaurants");

  const q = query(col, orderBy("createdAt", "desc"), fsLimit(limit));
  const snap = await getDocs(q);
  return snap.docs.map((d) => serialize(d.id, d.data()));
}

export async function getAdminPickRestaurants(
  limit = 12
): Promise<Restaurant[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("admin-picks");

  const q = query(
    col,
    where("adminPick", "==", true),
    orderBy("createdAt", "desc"),
    fsLimit(limit)
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => serialize(d.id, d.data()));
}

export async function getRestaurantsByColonia(
  coloniaRef: string,
  limit = 12
): Promise<Restaurant[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("restaurants-by-colonia", `colonia-${coloniaRef}`);

  const q = query(
    col,
    where("coloniaRef", "==", coloniaRef),
    orderBy("createdAt", "desc"),
    fsLimit(limit)
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => serialize(d.id, d.data()));
}

export async function getRestaurantsByPlatillo(
  platillo: string,
  limit = 12
): Promise<Restaurant[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("restaurants-by-platillo", `platillo-${platillo}`);

  const q = query(
    col,
    where("platillos", "array-contains", platillo),
    orderBy("createdAt", "desc"),
    fsLimit(limit)
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => serialize(d.id, d.data()));
}

export async function getAllRestaurants(): Promise<Restaurant[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("all-restaurants");

  const q = query(col, orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => serialize(d.id, d.data()));
}

export async function getAllRestaurantSlugs(): Promise<{ slug: string }[]> {
  "use cache";
  cacheLife("days");
  cacheTag("all-slugs");

  const q = query(col, orderBy("createdAt", "asc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ slug: (d.data() as Restaurant).slug }));
}
