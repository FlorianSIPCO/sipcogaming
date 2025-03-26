"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { X, Star } from "lucide-react";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import GamingLoader from "@/app/components/GamingSpinner/GamingLoader";

interface Product {
    id: string;
    name: string;
    price: number;
    images: string[];
    specs: string[];
    description: string;
    ratings?: Record<string, number>;
    stock: number;
}

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart(); // Utilisation du contexte panier

  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        if (!res.ok) throw new Error("Produit introuvable");
        const data = await res.json();
        setProduct(data);
        setSelectedImage(data.images?.[0] || null);
      } catch (error) {
        console.error("Erreur :", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (loading) {
    return <div className="flex justify-center"><GamingLoader /></div>;
  }

  if (error || !product) {
    return <div className="text-center mt-20 text-red-500">Produit non trouvé</div>;
  }

  const getImageUrl = (imagePath: string) => {
    return imagePath.startsWith("/uploads") ? `${window.location.origin}${imagePath}` : imagePath;
  };

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
                {selectedImage && (
                    <Image
                    src={getImageUrl(selectedImage)}
                    alt={product.name}
                    fill
                    className="object-contain rounded-lg cursor-pointer"
                    onClick={() => setIsModalOpen(true)}
                    />
                )}
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
                    <Image src={getImageUrl(img)} alt={`Mini ${index}`} width={80} height={80} className="object-cover rounded-sm" />
                </button>
                ))}
            </div>
            </div>

            {/* Détails du produit */}
            <div className="flex-1">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-red-500 font-bold text-2xl mt-2">{product.price} €</p>

            {/* Notations par usage */}
            {product.ratings && (
              <div className="mt-4">
                <h3 className="text-xl font-semibold mb-2">Usage recommandé :</h3>
                <ul className="space-y-2 text-gray-300">
                  {Object.entries(product.ratings).map(([usage, stars]) => (
                    <li key={usage} className="flex items-center gap-2">
                      <span className="capitalize">{usage} :</span>
                      <div className="flex gap-1 text-yellow-400">
                        {Array.from({ length: 3 }).map((_, i) => (
                          <Star 
                            key={i}
                            size={18}
                            fill={i < Number(stars) ? "#facc15" : "none"}
                            stroke="#facc15"
                          />
                        ))}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Caractéristiques */}
            <h2 className="text-xl font-semibold mt-4">Caractéristiques :</h2>
            <ul className="list-disc pl-6 mt-2 text-gray-300">
                {product.specs.map((spec, index) => (
                <li key={index}>{spec}</li>
                ))}
            </ul>

            <div className="flex flex-col-reverse lg:items-center lg:flex-row">
              {/* Bouton Ajouter au panier */}
              <button 
                  className="mt-6 px-6 py-3 bg-red-500 cursor-pointer text-white rounded-lg hover:scale-105 transition"
                  onClick={() => addToCart({
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      image: product.images[0] || "images/logo.jpg",
                      quantity: 1
                  })}
              >
                  Ajouter au panier
              </button>

              {/* Stock disponible */}
              <p className="mt-6 ml-6 text-lg font-bold text-white">
                Stock disponible : 
                <span className="text-white font-semibold ml-1.5">{product.stock}</span>
              </p>

            </div>
            </div>
        </motion.div>

        {/* Modal d'agrandissement d'image */}
        {isModalOpen && (
            <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
            <button className="absolute top-4 right-4 text-white text-2xl cursor-pointer" onClick={() => setIsModalOpen(false)}>
                <X />
            </button>
            <div className="relative w-[90%] md:w-[60%] h-[70vh]">
                <Image src={getImageUrl(selectedImage!)} alt="Image zoomée" fill className="object-contain rounded-lg" />
            </div>
            </div>
        )}
        </section>
    </div>
  );
};

export default ProductDetail;
