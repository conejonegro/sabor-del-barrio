/**
 * Sube una foto a Firebase Storage y actualiza coverPhoto + photos[] en Firestore.
 *
 * Uso:
 *   npx tsx scripts/upload-photo.ts <restaurantId> <rutaImagen> [cover]
 *
 * Ejemplos:
 *   # Sube como foto de galería
 *   npx tsx scripts/upload-photo.ts tacos-carlos-fresno ~/Desktop/foto.jpg
 *
 *   # Sube y la pone también como coverPhoto
 *   npx tsx scripts/upload-photo.ts tacos-carlos-fresno ~/Desktop/foto.jpg cover
 */
import { config } from "dotenv";
import { resolve } from "path";
config({ path: resolve(process.cwd(), ".env.local") });

import { readFileSync } from "fs";
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, doc, updateDoc, arrayUnion } from "firebase/firestore";

const app = initializeApp({
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
});

const storage = getStorage(app);
const db = getFirestore(app);

const [, , restaurantId, imagePath, flag] = process.argv;

if (!restaurantId || !imagePath) {
  console.error("Uso: npx tsx scripts/upload-photo.ts <restaurantId> <rutaImagen> [cover]");
  process.exit(1);
}

async function upload() {
  const absPath = imagePath.startsWith("~")
    ? imagePath.replace("~", process.env.HOME!)
    : resolve(imagePath);

  const fileBuffer = readFileSync(absPath);
  const ext = absPath.split(".").pop()?.toLowerCase() ?? "jpg";
  const mimeTypes: Record<string, string> = {
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
    webp: "image/webp",
    avif: "image/avif",
  };
  const contentType = mimeTypes[ext] ?? "image/jpeg";

  const fileName = `${Date.now()}.${ext}`;
  const storageRef = ref(storage, `restaurants/${restaurantId}/${fileName}`);

  console.log(`Subiendo ${absPath} → restaurants/${restaurantId}/${fileName} ...`);
  await uploadBytes(storageRef, fileBuffer, { contentType });
  const url = await getDownloadURL(storageRef);
  console.log(`✓ URL: ${url}`);

  const docRef = doc(db, "restaurants", restaurantId);
  const update: Record<string, unknown> = { photos: arrayUnion(url) };

  if (flag === "cover") {
    update.coverPhoto = url;
    console.log("✓ Actualizado como coverPhoto");
  }

  await updateDoc(docRef, update);
  console.log("✓ Firestore actualizado");
  process.exit(0);
}

upload().catch((err) => {
  console.error(err);
  process.exit(1);
});
