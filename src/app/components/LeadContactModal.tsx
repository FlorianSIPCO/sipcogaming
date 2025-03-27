"use client";

import { useState } from "react";
import { X } from "lucide-react";
import SpinnerButtons from "@/app/components/SpinnerButtons/SpinnerButtons";

interface Props {
  productName: string;
  onClose: () => void;
}

const ContactLeadModal: React.FC<Props> = ({ productName, onClose }) => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/sendEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, productId: productName }),
      });

      if (!res.ok) throw new Error("Erreur lors de l'envoi de l'email");
      window.alert("Votre message a bien été envoyé !");
      onClose();
    } catch (err) {
      console.error("Erreur envoi email:", err);
      window.alert("Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center overflow-y-auto">
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-[90%] max-w-lg text-white relative">
        <button className="absolute top-4 right-4 text-white text-2xl" onClick={onClose}>
          <X />
        </button>
        <h2 className="text-xl font-bold mb-4">Contacter l'équipe commerciale</h2>

        <input
          type="text"
          name="firstname"
          value={formData.firstname}
          onChange={handleChange}
          placeholder="Prénom"
          className="w-full p-2 rounded bg-gray-800 border border-gray-600 mt-2"
        />
        <input
          type="text"
          name="lastname"
          value={formData.lastname}
          onChange={handleChange}
          placeholder="Nom"
          className="w-full p-2 rounded bg-gray-800 border border-gray-600 mt-2"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full p-2 rounded bg-gray-800 border border-gray-600 mt-2"
        />
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Téléphone (facultatif)"
          className="w-full p-2 rounded bg-gray-800 border border-gray-600 mt-2"
        />
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Votre message"
          className="w-full p-2 rounded bg-gray-800 border border-gray-600 mt-2"
        />

        <div className="flex justify-between mt-6">
          <button onClick={onClose} className="bg-red-500 px-4 py-2 rounded">
            Annuler
          </button>
          <button onClick={handleSubmit} className="bg-blue-500 px-5 py-2 rounded" disabled={loading}>
            {loading ? <SpinnerButtons /> : "Envoyer"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactLeadModal;
