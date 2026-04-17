import { initializeApp, getApps } from "firebase/app";

const required = (key: string): string => {
  const value = process.env[key];
  if (!value) throw new Error(`Missing environment variable: ${key}`);
  return value;
};

const firebaseConfig = {
  apiKey: required("NEXT_PUBLIC_FIREBASE_API_KEY"),
  authDomain: required("NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN"),
  projectId: required("NEXT_PUBLIC_FIREBASE_PROJECT_ID"),
  storageBucket: required("NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET"),
  messagingSenderId: required("NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID"),
  appId: required("NEXT_PUBLIC_FIREBASE_APP_ID"),
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

export const firebaseApp =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
