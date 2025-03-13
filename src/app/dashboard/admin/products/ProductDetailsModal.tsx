"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  images: string[];
  specs: string[];
  description: string;
}

const ProductDetailsModal: React.FC<{ productId: string; onClose: () => void }> = ({ productId, onClose }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${productId}`);
        if (!res.ok) throw new Error("Erreur lors du chargement du produit");
        const data = await res.json();
        setProduct(data);
        setSelectedImage(data.images?.[0] || null);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProduct();
  }, [productId]);

  if (!product) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-[90%] max-w-lg text-white">
        <button className="absolute top-4 right-4 text-white text-2xl" onClick={onClose}>
          <X />
        </button>
        <h2 className="text-xl font-bold">{product.name}</h2>
        <p className="text-red-500 text-lg font-semibold">{product.price} €</p>
        <p className="text-gray-300 text-sm">Stock : {product.stock}</p>

        {/* Image principale */}
        <div className="relative w-full h-64 mt-4 bg-white p-4 rounded-lg">
          {selectedImage && (
            <Image src={selectedImage} alt={product.name} fill className="object-contain rounded-md" />
          )}
        </div>

        {/* Miniatures */}
        <div className="flex gap-4 mt-4">
          {product.images.map((img, index) => (
            <button
              key={index}
              className={`w-16 h-16 border-2 rounded-md overflow-hidden ${
                img === selectedImage ? "border-red-500" : "border-gray-700"
              }`}
              onClick={() => setSelectedImage(img)}
            >
              <Image src={img} alt={`Miniature ${index}`} width={64} height={64} className="object-cover rounded-sm" />
            </button>
          ))}
        </div>

        {/* Description */}
        <p className="mt-4 text-gray-300">{product.description}</p>

        {/* Caractéristiques */}
        <h3 className="text-lg font-semibold mt-4">Caractéristiques :</h3>
        <ul className="list-disc pl-6 text-gray-400">
          {product.specs.map((spec, index) => (
            <li key={index}>{spec}</li>
          ))}
        </ul>

        {/* Bouton fermer */}
        <button onClick={onClose} className="mt-6 px-4 py-2 bg-red-500 text-white rounded-lg w-full">
          Fermer
        </button>
      </div>
    </div>
  );
};

export default ProductDetailsModal;
