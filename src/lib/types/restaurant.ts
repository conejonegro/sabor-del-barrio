import type { Timestamp } from "firebase/firestore";

export interface Restaurant {
  id: string;
  name: string;
  slug: string;
  description: string;
  colonia: string;
  coloniaRef: string;
  platillos: string[];
  platilloPrimary: string;
  photos: string[];
  coverPhoto: string;
  address: string;
  coords: {
    lat: number;
    lng: number;
  };
  adminPick: boolean;
  featured: boolean;
  featuredOrder: number;
  hours?: string;
  phone?: string;
  instagram?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  emoji: string;
  color: string;
  description: string;
  order: number;
}

export interface Colonia {
  id: string;
  slug: string;
  name: string;
  description: string;
  restaurantCount: number;
}
