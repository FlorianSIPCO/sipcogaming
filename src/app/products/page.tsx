"use client";

import Image from "next/image";
import Link from "next/link";
import { products } from "../data/products";
import { motion } from "framer-motion";

const formatSpecs = (specs: string[], maxLines: number = 3, charsPerLine: number = 50) => {
    const formattedSpecs = [];
    let line = "";
  
    for (const spec of specs) {
      if ((line + spec).length > charsPerLine) {
        formattedSpecs.push(line);
        line = spec; // Commence une nouvelle ligne
      } else {
        line += (line ? " | " : "") + spec; // Ajoute une séparation
      }
    }
  
    if (line) formattedSpecs.push(line); // Ajoute la dernière ligne
  
    return formattedSpecs.slice(0, maxLines); // Affiche seulement 3 lignes
  };

const ProductsPage = () => {
  return (
    <div className="w-screen bg-[url('/images/bg-bluelight.jpg')] bg-cover bg-center bg-no-repeat">
        <section className="max-w-6xl mx-auto py-12 px-4">

        {/* Animation du titre */}
        <motion.h1 
            className="text-4xl font-bold text-center mb-10"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            Nos Setup sur-mesûre
        </motion.h1>

        {/* Animation de la liste des produits */}
        <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
        >
            {products.map((product, index) => (
            <div
                key={product.id}
                className="bg-gray-900 text-white rounded-lg p-4 shadow-lg text-center"
            >
                {/* Image du produit */}
                <div className="relative w-full h-80 p-4 bg-white rounded-lg shadow-md">
                <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 2300px) 50vw, 33vw"
                    priority={index === 0}
                    className="object-contain rounded-md"
                />
                </div>

                {/* Nom du produit */}
                <h2 className="text-xl font-semibold mt-4">{product.name}</h2>

                {/* Aperçu des specs */}
                <div className="text-gray-300 text-sm mt-2 max-w-[250px] mx-auto">
                {formatSpecs(product.specs).map((line, idx) => (
                    <p key={idx} className="truncate">{line}</p>
                ))}
                </div>

                {/* Prix */}
                <p className="text-red-500 text-2xl font-bold mt-5">{product.price}€</p>

                {/* Lien vers la page de détails */}
                <Link
                href={`/products/${product.id}`}
                className="mt-4 inline-block px-6 py-2 bg-red-500 text-white rounded-lg hover:scale-105 transition"
                >
                Voir Détails
                </Link>
            </div>
            ))}
        </motion.div>
        </section>
    </div>
  );
};

export default ProductsPage;
