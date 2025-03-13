"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { products } from "@/app/data/products";
import { X } from "lucide-react";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id.toString() === id);
  const { addToCart } = useCart(); // Utilisation du contexte panier

  const defaultImage = product?.images?.[0] || '/images/logo.jpg'
  const [selectedImage, setSelectedImage] = useState<string>(defaultImage);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!product) {
    return <div className="text-center mt-20 text-white">Produit non trouvé</div>;
  }

  return (
    <div className="w-screen bg-[url('/images/bg-bluelight.jpg')] bg-cover bg-center bg-no-repeat md:h-screen">
        <section className="container mx-auto p-6 text-white">
        <motion.div className="flex flex-col md:flex-row gap-10"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            {/* Images du produit */}
            <div className="flex flex-col items-center">
            <div className="relative w-80 md:w-120 h-80 md:h-120 p-4 bg-white rounded-lg shadow-md">
                <Image
                src={selectedImage}
                alt={product.name}
                fill
                className="object-contain rounded-lg cursor-pointer"
                onClick={() => setIsModalOpen(true)}
                />
            </div>
            {/* Miniatures */}
            <div className="flex gap-4 mt-6">
                {product.images.map((img, index) => (
                <button
                    key={index}
                    className={`w-20 h-20 border-2 rounded-md overflow-hidden ${
                    img === selectedImage ? "border-red-500" : "border-gray-700"
                    }`}
                    onClick={() => setSelectedImage(img)}
                >
                    <Image src={img} alt={`Mini ${index}`} width={80} height={80} className="object-cover rounded-sm" />
                </button>
                ))}
            </div>
            </div>

            {/* Détails du produit */}
            <div className="flex-1">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-red-500 font-bold text-2xl mt-2">{product.price} €</p>

            {/* Caractéristiques */}
            <h2 className="text-xl font-semibold mt-4">Caractéristiques :</h2>
            <ul className="list-disc pl-6 mt-2 text-gray-300">
                {product.specs.map((spec, index) => (
                <li key={index}>{spec}</li>
                ))}
            </ul>

            {/* Bouton Ajouter au panier */}
            <button 
                className="mt-6 px-6 py-3 bg-red-500 text-white rounded-lg hover:scale-105 transition"
                onClick={() => addToCart({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.images[0],
                    quantity: 1
                })}
            >
                Ajouter au panier
            </button>
            </div>
        </motion.div>

        {/* Modal d'agrandissement d'image */}
        {isModalOpen && (
            <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
            <button className="absolute top-4 right-4 text-white text-2xl" onClick={() => setIsModalOpen(false)}>
                <X />
            </button>
            <div className="relative w-[90%] md:w-[60%] h-[70vh]">
                <Image src={selectedImage} alt="Image zoomée" fill className="object-contain rounded-lg" />
            </div>
            </div>
        )}
        </section>
    </div>
  );
};

export default ProductDetail;
