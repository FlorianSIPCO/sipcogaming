"use client";

import { useState } from "react";
import ProductTable from "./ProductTable";
import ReactDOM from "react-dom";
import CreateProductModal from "./CreateProductModal";

const ProductsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="text-white">
      <h1 className="text-center lg:text-left text-2xl lg:text-3xl font-bold mb-6">Gestion des Produits</h1>
      <button 
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-500 px-4 py-2 mb-5 cursor-pointer rounded-md text-white hover:bg-blue-600"
      >
        Ajouter un produit
      </button>
      <ProductTable />

      {isModalOpen &&
        ReactDOM.createPortal(
          <CreateProductModal onClose={() => setIsModalOpen(false)} />,
          document.body
        )}
    </div>
  );
};

export default ProductsPage;
