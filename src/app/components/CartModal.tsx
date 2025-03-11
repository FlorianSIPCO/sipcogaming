"use client";

import { useCart } from "@/context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, Plus, Minus, Trash } from "lucide-react";

const CartModal = () => {
  const { cart, removeFromCart, updateQuantity, total, isCartOpen, setIsCartOpen } = useCart();

  if (!isCartOpen) return null;
  
  return (
    <AnimatePresence>
      {isCartOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          onClick={() => setIsCartOpen(false)} // Ferme la modal en cliquant en dehors
        >
          {/* Overlay flouté */}
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-xs z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal centrée */}
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <div
              className="bg-gray-900 text-white p-6 rounded-lg w-[90%] max-w-3xl shadow-xl relative "
              onClick={(e) => e.stopPropagation()} // Empêche la fermeture en cliquant sur la modal
            >
              {/* Bouton Fermer */}
              <button className="absolute top-4 right-4 text-white" onClick={() => setIsCartOpen(false)}>
                <X size={24} />
              </button>

              <h2 className="text-2xl font-bold text-center mb-4">Votre Panier</h2>

              {cart.length === 0 ? (
                <p className="text-center text-gray-400">Votre panier est vide.</p>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 bg-gray-800 p-3 rounded-lg">
                      {/* Image */}
                      <div className="w-16 h-16 md:w-30 md:h-30 relative">
                        <Image src={item.image} alt={item.name} fill className="object-contain rounded-md" />
                      </div>

                      {/* Infos du produit */}
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold">{item.name}</h3>
                        <p className="text-red-400 font-bold">{item.price}€</p>
                        <div className="flex items-center gap-3 mt-2">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>
                            <Minus size={18} className="text-gray-400 hover:text-white transition" />
                          </button>
                          <span className="font-bold">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                            <Plus size={18} className="text-gray-400 hover:text-white transition" />
                          </button>
                        </div>
                      </div>

                      {/* Supprimer */}
                      <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700 transition">
                        <Trash size={20} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Total */}
              {cart.length > 0 && (
                <div className="mt-6 text-center">
                  <p className="text-lg font-bold">Total : <span className="text-red-500">{total.toFixed(2)}€</span></p>
                  <button className="mt-4 px-6 py-3 bg-red-500 text-white rounded-lg hover:scale-105 transition">
                    Passer la commande
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CartModal;
