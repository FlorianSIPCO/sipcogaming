"use client";

import { useState } from "react";
import { X } from "lucide-react";

interface CreateProductModalProps {
  onClose: () => void;
}

const CreateProductModal: React.FC<CreateProductModalProps> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
    specs: "",
    description: "",
  });

  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePaths, setImagePaths] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Logique d'upload d'image
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
        setImageFiles(Array.from(e.target.files));
    }
  };

  const uploadImages = async () => {
    if (!imageFiles.length) return;

    const formData = new FormData();
    imageFiles.forEach((file) => formData.append('images', file));

    try {
        const res = await fetch("/api/upload", {
            method: "POST",
            body: formData,
        });

        if (!res.ok) throw new Error("Erreur lors de l'upload");

        const data = await res.json();
        setImagePaths(data.paths);
        return data.paths;
      } catch (error) {
        console.error('Erreur upload image: ', error)
        return [];
    }
  }

  const createProduct = async () => {
    setLoading(true);
    try {
      const uploadedPaths = await uploadImages();
      if (!uploadedPaths.length) throw new Error("Aucune image n'a été uploadée")

      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
          stock: parseInt(formData.stock, 10),
          images: uploadedPaths,
          specs: formData.specs.split(","), // Séparer les specs
        }),
      });

      if (!res.ok) throw new Error("Erreur lors de la création");

      window.location.reload();
    } catch (error) {
      console.error("Erreur lors de la création :", error);
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-[90%] max-w-lg text-white">
        <button className="absolute top-4 right-4 text-white text-2xl" onClick={onClose}>
          <X />
        </button>
        <h2 className="text-xl font-bold">Ajouter un produit</h2>

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Nom du produit"
          className="w-full p-2 rounded bg-gray-800 border border-gray-600 mt-2"
        />

        <input
          type="text"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Prix (€)"
          className="w-full p-2 rounded bg-gray-800 border border-gray-600 mt-2"
        />

        <input
          type="text"
          name="stock"
          value={formData.stock}
          onChange={handleChange}
          placeholder="Stock disponible"
          className="w-full p-2 rounded bg-gray-800 border border-gray-600 mt-2"
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description du produit"
          className="w-full p-2 rounded bg-gray-800 border border-gray-600 mt-2"
        />

        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          className="w-full p-2 rounded bg-gray-800 border border-gray-600 mt-2"
        />
         {imageFiles.length > 0 && (<p className="text-green-400">Image sélectionnée : {imageFiles.map(file => file.name).join(", ")}</p>)}

        <input
          type="text"
          name="specs"
          value={formData.specs}
          onChange={handleChange}
          placeholder="Spécifications (séparées par des virgules)"
          className="w-full p-2 rounded bg-gray-800 border border-gray-600 mt-2"
        />

        <div className="flex justify-between mt-4">
          <button onClick={onClose} className="bg-red-500 px-4 py-2 rounded">
            Annuler
          </button>
          <button onClick={createProduct} className="bg-blue-500 px-4 py-2 rounded" disabled={loading}>
            {loading ? "Ajout..." : "Créer"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateProductModal;
