"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

interface ResetFormData {
  email: string;
}

export default function ResetPasswordPage() {
  const { register, handleSubmit, reset } = useForm<ResetFormData>();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: ResetFormData) => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.email }),
      });

      if (!res.ok) throw new Error("Erreur lors de la demande");

      toast.success("Un lien de réinitialisation a été envoyé par email.");
      reset();
    } catch (err) {
      console.error("Erreur reset password:", err);
      toast.error("Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen bg-[url('/images/bg.jpg')] bg-cover bg-center flex items-center justify-center">
      <motion.div
        className="bg-gray-900 text-white p-10 rounded-lg shadow-lg w-[90%] max-w-md"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <h2 className="text-2xl font-bold text-center mb-6">Réinitialiser votre mot de passe</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            type="email"
            {...register("email", { required: true })}
            placeholder="Votre adresse email"
            className="border border-gray-500 rounded-md p-2 w-full bg-gray-800"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-500 py-2 rounded-md font-bold hover:scale-105 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Envoi en cours..." : "Envoyer le lien de réinitialisation"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
