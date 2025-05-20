"use client";

import { useState } from "react";
import ProductDetailsModal from "./ProductDetailsModal";
import { Trash2, Eye, Edit } from "lucide-react";
import ReactDOM from "react-dom";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import { useRouter } from "next/navigation";

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  description: string;
  images: string[];
  specs: { key: string; value: string }[];
  ratings?: Record<string, number>;
}


const ProductRow: React.FC<{ product: Product }> = ({ product }) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteProduct = async () => {
    try {
    await fetch(`/api/products/${product.id}`, { method: "DELETE" });
    window.location.reload();
    } catch (error) {
    console.error("Erreur lors de la suppression:", error);
    }
  };

  return (
    <>
      <tr className="border-b border-gray-600">
        <td className="p-3">{product.name}</td>
        <td className="p-3">{product.price} €</td>
        <td className="p-3 text-center">{product.stock}</td>
        <td className="p-3 flex gap-2">
          <button onClick={() => setIsModalOpen(true)} className="text-blue-400 hover:text-blue-600">
            <Eye size={18} />
          </button>
          <button onClick={() => router.push(`/dashboard/admin/products/edit/${product.id}`)} className="text-blue-400 hover:text-blue-600">
            <Edit size={18} />
          </button>
          <button onClick={() => setIsDeleting(true)} className="text-red-400 hover:text-red-600">
            <Trash2 size={18} />
          </button>
        </td>
      </tr>

      {/* Affichage de la modal au clic */}
      {isModalOpen && ReactDOM.createPortal(<ProductDetailsModal productId={product.id} onClose={() => setIsModalOpen(false)} />, document.body)}
      {isDeleting && ReactDOM.createPortal(<DeleteConfirmationModal onConfirm={deleteProduct} onCancel={() => setIsDeleting(false)} />, document.body)}
    </>
  );
};

export default ProductRow;
