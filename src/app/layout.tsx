import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sabordelbarrio.mx"),
  title: {
    default: "Sabor del Barrio — Comida Callejera en Guadalajara",
    template: "%s | Sabor del Barrio",
  },
  description:
    "Descubre los mejores restaurantes y puestos de comida callejera en Guadalajara. Birria, tortas ahogadas, tacos y más.",
  keywords: [
    "comida Guadalajara",
    "street food Guadalajara",
    "birria Guadalajara",
    "tacos Guadalajara",
    "tortas ahogadas",
    "antojitos Guadalajara",
    "restaurantes Guadalajara",
  ],
  openGraph: {
    type: "website",
    locale: "es_MX",
    siteName: "Sabor del Barrio",
  },
  twitter: {
    card: "summary_large_image",
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Footer />
      </body>
    </html>
  );
}
