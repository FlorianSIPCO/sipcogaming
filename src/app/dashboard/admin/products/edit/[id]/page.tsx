"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { X, PlusCircle, Trash2 } from "lucide-react";
import SpinnerButtons from "@/app/components/SpinnerButtons/SpinnerButtons";
import StarSelector from "@/app/components/StarSelector";
import { useParams, useRouter } from "next/navigation";

const EditProductPage = () => {
  const { id } =  useParams();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
    description: "",
  });

  const [ratings, setRatings] = useState({
    bureautique: 0,
    gamer: 0,
    professionnel: 0
  })

  const [specs, setSpecs] = useState<{ key: string; value: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePaths, setImagePaths] = useState<string[]>([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        if (!res.ok) throw new Error('Erreur lors de la récupération du produit');
        const data = await res.json();

        setFormData({
          name: data.name,
          price: data.price.toString(),
          stock: data.stock.toString(),
          description: data.description || "",
        });

        if (data.ratings) {
            setRatings({
                bureautique: data.ratings.bureautique ?? 0,
                gamer: data.ratings.gamer ?? 0,
                professionnel: data.ratings.professionnel ?? 0,
            })
        }

        if (Array.isArray(data.specs)) {
            const formattedSpecs = data.specs.map((entry: string) => {
                const [key, ...rest] = entry.split(":");
                return {
                    key: key.trim(),
                    value: rest.join(":").trim(),
                }
            })
            setSpecs(formattedSpecs)
        }
        setImagePaths(data.images || []);
      } catch (error) {
        console.error("Erreur lors du chargement du produit :", error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSpecChange = (index: number, field: "key" | "value", value: string) => {
    const updated = [...specs];
    updated[index][field] = value;
    setSpecs(updated);
  };

  const addSpec = () => setSpecs([...specs, { key: "", value: "" }]);
  const removeSpec = (index: number) => setSpecs(specs.filter((_, i) => i !== index));

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImageFiles(Array.from(e.target.files));
    }
  };

  const uploadImages = async () => {
    if (!imageFiles.length) return imagePaths;

    const formData = new FormData();
    imageFiles.forEach((file) => formData.append("images", file));

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Erreur upload");
      const data = await res.json();
      return [...imagePaths, ...data.paths];
    } catch (err) {
      console.error("Erreur upload :", err);
      return imagePaths;
    }
  };

  const handleUpdate = async () => {
    setLoading(true);

    try {
      const uploaded = await uploadImages();

      const res = await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
          stock: parseInt(formData.stock, 10),
          images: uploaded,
          ratings: ratings,
          specs: specs
            .filter((s) => s.key && s.value)
            .map((s) => `${s.key}: ${s.value}`),
        }),
      });

      if (!res.ok) throw new Error("Erreur mise à jour");
      router.push('/dashboard/admin/products')
    } catch (err) {
      console.error("Erreur update produit :", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-2">Modifier le produit</h2>
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
            placeholder="Description"
            className="w-full p-2 rounded bg-gray-800 border border-gray-600 mt-2"
        />

        <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className="w-full p-2 rounded bg-gray-800 border border-gray-600 mt-2"
        />
        {/* Images déjà enregistrées */}
        {imagePaths.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
            {imagePaths.map((img, idx) => (
                <div key={img} className="relative group">
                <Image
                    src={img}
                    alt={`Produit image ${idx + 1}`}
                    width={80}
                    height={80}
                    className="rounded border object-cover"
                />
                <button
                    type="button"
                    className="absolute top-0 right-0 bg-black bg-opacity-60 p-1 rounded-full text-white"
                    onClick={() => setImagePaths(prev => prev.filter((_, i) => i !== idx))}
                    title="Supprimer cette image"
                >
                    <X size={16} />
                </button>
                </div>
            ))}
            </div>
        )}

        {/* Images en cours d'ajout */}
        {imageFiles.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
            {imageFiles.map((file, idx) => (
                <div key={file.name + idx} className="relative group">
                <Image
                    src={URL.createObjectURL(file)}
                    alt={`Nouvelle image ${file.name}`}
                    width={80}
                    height={80}
                    className="rounded border object-cover"
                />
                <button
                    type="button"
                    className="absolute top-0 right-0 bg-black bg-opacity-60 p-1 rounded-full text-white"
                    onClick={() => setImageFiles(prev => prev.filter((_, i) => i !== idx))}
                    title="Supprimer cette image"
                >
                    <X size={16} />
                </button>
                </div>
            ))}
            </div>
        )}

        <div className="flex flex-col sm:flex-row sm:sm-items-center sm:gap-6 mt-4">
            <StarSelector label="Usage Bureautique" value={ratings.bureautique} onChange={(val) => setRatings({ ...ratings, bureautique: val })} />
            <StarSelector label="Usage Gamer" value={ratings.gamer} onChange={(val) => setRatings({ ...ratings, gamer: val })} />
            <StarSelector label="Usage Professionnel" value={ratings.professionnel} onChange={(val) => setRatings({ ...ratings, professionnel: val })} />
        </div>

        <h3 className="text-lg font-semibold mt-4">Spécifications :</h3>
        {specs.map((spec, index) => (
            <div key={index} className="flex gap-2 items-center mt-2">
            <input
                type="text"
                placeholder="Clé"
                value={spec.key}
                onChange={(e) => handleSpecChange(index, "key", e.target.value)}
                className="w-1/3 p-2 rounded bg-gray-800 border border-gray-600"
            />
            <input
                type="text"
                placeholder="Valeur"
                value={spec.value}
                onChange={(e) => handleSpecChange(index, "value", e.target.value)}
                className="w-2/3 p-2 rounded bg-gray-800 border border-gray-600"
            />
            <button onClick={() => removeSpec(index)} className="text-red-400 hover:text-red-600">
                <Trash2 size={20} />
            </button>
            </div>
        ))}
        <button onClick={addSpec} className="flex items-center gap-2 mt-3 text-blue-400 hover:text-blue-600">
            <PlusCircle size={20} /> Ajouter une spécification
        </button>

        <div className="flex justify-between mt-6">
            <button onClick={() => router.push("/dashboard/admin/products")} className="bg-gray-600 px-5 py-2 rounded">
            Annuler
            </button>
            <button onClick={handleUpdate} className="bg-blue-500 px-5 py-2 rounded" disabled={loading}>
            {loading ? <SpinnerButtons /> : "Enregistrer"}
            </button>
        </div>
        </div>
  );
};

export default EditProductPage;
