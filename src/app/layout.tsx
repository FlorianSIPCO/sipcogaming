import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import CartModal from "./components/CartModal";
import { Toaster } from "react-hot-toast";
import SessionProviderWrapper from "@/context/SessionProviderWrapper";
import LayoutWrapper from "./components/LayoutWrapper";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SIPCO Gaming | PC Gamer sur-mesure & Performances optimisées",
  description: "SIPCO Gaming vous propose des PC Gamer assemblés sur-mesure avec des composants de dernière génération pour une performance inégalée.",
  metadataBase: new URL('https://sipcogaming.vercel.app/'),
  keywords: "PC Gamer, PC sur-mesure, Montage PC, Composants gaming, SIPCO Gaming, Performance PC, Ordinateur de jeu, SIPCO, Informatique, Vitré, Bretagne, Ile-et-Vilaine, Ile et Vilaine, ",
  robots: "index, follow", // Google
  openGraph: { // Facebook, LinkedIn, Discord
    type: "website",
    title: "SIPCO Gaming | PC Gamer sur-mesure & Performances optimisées",
    description: "Découvrez nos PC Gamer performants montés sur-mesure avec des composants haut de gamme.",
    url: "https://sipcogaming.vercel.app/", // Confirmer URL
    images: [
      {
        url: "/images/logo.jpg", // Image de prévisualisation pour les réseaux sociaux
        width: 1200,
        height: 630,
        alt: "SIPCO Gaming - PC Gamer haut de gamme",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SIPCO Gaming | PC Gamer sur-mesure & Performances optimisées",
    description: "Découvrez nos PC Gamer performants montés sur-mesure avec des composants haut de gamme.",
    images: ["/images/logo.jpg"],
  },
};


export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <SessionProviderWrapper>
          <CartProvider>
            <LayoutWrapper>
              <Toaster position="top-right" reverseOrder={false} />
              {children}
            </LayoutWrapper>
            <CartModal />
          </CartProvider>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}