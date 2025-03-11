"use client";

import Image from "next/image";
import Link from "next/link";
import CTA from "./CTA";

const bonPlan = {
  id: 1,
  name: "PC Gamer",
  img: "/images/pc1.jpg",
  description: [
    "Processeur AMD Ryzen 7 5800X",
    "Carte graphique NVIDIA RTX 3070",
    "16 Go de RAM DDR4 3200MHz",
    "SSD NVMe 1 To pour un stockage ultra-rapide",
    "Refroidissement liquide RGB",
  ],
  price: "1299€",
  link: "/products/1",
};

const BonPlan = () => {
  return (
    <section className="relative w-screen h-screen bg-gray-900 text-white">
      <h2 className="absolute top-10 left-1/2 transform -translate-x-1/2 text-4xl font-bold neon-text">
        Nos Configurations Gaming
      </h2>

      {/* Conteneur du carrousel avec effet scroll */}
      <div className="relative w-full h-full">
        <div className="flex w-screen h-full">
            {/* Image du PC */}
            <div className="w-1/2 h-full relative">
              <Image 
                src={bonPlan.img} alt={bonPlan.name} fill className="object-cover" />
            </div>

            {/* Bannière de description */}
            <div className="w-1/2 h-full flex flex-col justify-center items-center bg-gray-900 p-10">
              <h2 className="text-4xl font-bold neon-text">{bonPlan.name}</h2>
              {/* Liste des spécifications */}
              <ul className="mt-4 space-y-2 text-lg">
                {bonPlan.description.map((desc, index) => (
                  <li key={index} className="flex items-center gap-2">
                    ✅ {desc}
                  </li>
                ))}
              </ul>
              <p className="text-3xl font-semibold mt-4 neon-text">{bonPlan.price}</p>
              <div className="mt-6 flex gap-4">
                <button className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:scale-105 transition">
                  Icon panier
                </button>
                <Link href={bonPlan.link} className="px-6 py-3 bg-red-500 text-white rounded-lg hover:scale-105 transition shadow-neon">
                  Voir plus
                </Link>
              </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default BonPlan;
