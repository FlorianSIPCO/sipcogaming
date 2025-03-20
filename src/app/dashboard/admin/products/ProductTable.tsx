"use client";

import { useEffect, useState } from "react";
import ProductRow from "./ProductRow";

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
}

const ProductTable = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        if (!res.ok) throw new Error("Erreur lors de la récupération des produits");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="w-full bg-gray-800 p-6 rounded-lg">
      <table className="w-full text-white">
        <thead>
          <tr className="border-b border-gray-600">
            <th className="text-left p-3">Nom</th>
            <th className="text-left p-3">Prix</th>
            <th className="text-left p-3">Stock</th>
            <th className="text-left p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <ProductRow key={product.id} product={product} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
