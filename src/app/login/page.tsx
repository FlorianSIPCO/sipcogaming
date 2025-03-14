"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import Link from "next/link";
import SpinnerButtons from "../components/SpinnerButtons/SpinnerButtons";

const LoginPage = () => {
  const { register, handleSubmit, watch, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const router = useRouter();
  const [showPasswordCriteria, setShowPasswordCriteria] = useState(false);
  const [DateFormat, setDateFormat] = useState('')

  // Ecoute les valeurs du formulaire
  const password = watch("password", "");
  const confirmPassword = watch("confirmPassword", "");
  const dateOfBirth = watch("dateOfBirth", "");

  // Vérification des critères du mot de passe
  const passwordCriteria = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };

  const allCriteriaMet = Object.values(passwordCriteria).every(Boolean);

  // Ajoute directement le "-" dans l'input date
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "") // Supprime tout ce qui n'est pas un chiffre
    
    if (value.length > 2) {
      value = `${value.slice(0, 2)}-${value.slice(2)}`;
    }
    if (value.length > 5) {
      value = `${value.slice(0, 5)}-${value.slice(5, 9)}`;
    }
    setDateFormat(value);
  }

  const onSubmit = async (data: any) => {
    setLoading(true);

    // Convertir la date de naissance en format YYYY-MM-DD
    const formattedDate = dateOfBirth.split("-").reverse().join("-");

    if (isRegistering) {
      // Vérification du mot de passe et confirmation
      if (password !== confirmPassword) {
        toast.error("Les mots de passe ne correspondent pas")
        setLoading(false);
        return;
      }

      // Inscription
      try {
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...data, dateOfBirth: formattedDate }),
        });

        if (!res.ok) {
          throw new Error("Erreur lors de l'inscription");
        }

        toast.success("Inscription réussie ! Connectez-vous");
        setIsRegistering(false);
      } catch (error) {
        toast.error("Une erreur est survenue");
      }
    } else {
      // Connexion
      const res = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (res?.error) {
        toast.error("Échec de la connexion");
        setLoading(false);
      } else {
        // ✅ Récupérer la session après connexion
        const session = await fetch("/api/auth/session").then((res) => res.json());

        if (session?.user.role === "ADMIN") {
          router.push("/dashboard/admin");
        } else {
          router.push("/dashboard/client");
        }
      }
    }
    setLoading(false);
    reset();
  };

  return (
    <div className="w-screen h-[80vh] bg-[url('/images/bg.jpg')] bg-cover bg-center flex items-center justify-center">
      <motion.div
        className="bg-gray-900 text-white p-10 rounded-lg shadow-lg w-[90%] max-w-lg"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <h2 className="text-2xl font-bold text-center mb-6">
          {isRegistering ? "Créer un compte" : "Connexion"}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {isRegistering && (
            <>
              <div className="flex gap-4">
                <input
                  type="text"
                  {...register("firstname")}
                  placeholder="Prénom"
                  className="border border-gray-500 rounded-md p-2 w-1/2 bg-gray-800"
                  required
                />
                <input
                  type="text"
                  {...register("lastname")}
                  placeholder="Nom"
                  className="border border-gray-500 rounded-md p-2 w-1/2 bg-gray-800"
                  required
                />
              </div>
              <div className="flex gap-4">
                <input
                  type="text"
                  {...register("dateOfBirth")}
                  value={DateFormat}
                  onChange={handleDateChange}
                  placeholder="Date de naissance"
                  pattern="\d{2}-\d{2}-\d{4}"
                  className="border border-gray-500 rounded-md p-2 w-full bg-gray-800"
                  maxLength={10}
                  required
                />
                <input
                  type="text"
                  {...register("phoneNumber")}
                  placeholder="Téléphone"
                  className="border border-gray-500 rounded-md p-2 w-full bg-gray-800"
                  required
                />
              </div>
            </>
          )}

          <input
            type="email"
            {...register("email")}
            placeholder="Email"
            className="border border-gray-500 rounded-md p-2 w-full bg-gray-800"
            required
          />
          <input
            type="password"
            {...register("password")}
            placeholder="Mot de passe"
            className="border border-gray-500 rounded-md p-2 w-full bg-gray-800"
            required
            onFocus={() => setShowPasswordCriteria(true)}
            onBlur={() => setShowPasswordCriteria(false)}
          />

          {isRegistering && (
            <>
              <input
                type="password"
                {...register("confirmPassword")}
                placeholder="Confirmer mot de passe"
                className="border border-gray-500 rounded-md p-2 w-full bg-gray-800"
                required
              />
              <input
                type="text"
                {...register("street")}
                placeholder="Adresse"
                className="border border-gray-500 rounded-md p-2 w-full bg-gray-800"
                required
              />
              <div className="flex gap-4">
                <input
                  type="text"
                  {...register("zipCode")}
                  placeholder="Code postal"
                  className="border border-gray-500 rounded-md p-2 w-1/2 bg-gray-800"
                  required
                />
                <input
                  type="text"
                  {...register("city")}
                  placeholder="Ville"
                  className="border border-gray-500 rounded-md p-2 w-1/2 bg-gray-800"
                  required
                />
              </div>
              <input
                type="text"
                {...register("country")}
                placeholder="Pays"
                className="border border-gray-500 rounded-md p-2 w-full bg-gray-800"
                required
              />
              {/* Vérification des critères du mot de passe */}
              {showPasswordCriteria && (
                <ul className="text-sm text-gray-400 mt-2 space-y-1">
                  <li className={passwordCriteria.length ? "text-green-400" : "text-red-400"}>
                    {passwordCriteria.length ? "✔" : "✖"} 8 caractères minimum
                  </li>
                  <li className={passwordCriteria.uppercase ? "text-green-400" : "text-red-400"}>
                    {passwordCriteria.uppercase ? "✔" : "✖"} Une majuscule
                  </li>
                  <li className={passwordCriteria.lowercase ? "text-green-400" : "text-red-400"}>
                    {passwordCriteria.lowercase ? "✔" : "✖"} Une minuscule
                  </li>
                  <li className={passwordCriteria.number ? "text-green-400" : "text-red-400"}>
                    {passwordCriteria.number ? "✔" : "✖"} Un chiffre
                  </li>
                  <li className={passwordCriteria.special ? "text-green-400" : "text-red-400"}>
                    {passwordCriteria.special ? "✔" : "✖"} Un caractère spécial
                  </li>
                </ul>
              )}
            </>
          )}

          <motion.button
            type="submit"
            disabled={loading || (isRegistering && !allCriteriaMet)}
            className="w-full bg-red-500 py-2 rounded-md font-bold hover:scale-105 transition"
            whileTap={{ scale: 0.95 }}
          >
            {loading ? <SpinnerButtons /> : isRegistering ? "S'inscrire" : "Se connecter"}
          </motion.button>
        </form>

        <div className="text-center mt-4">
          <button
            className="text-gray-400 hover:text-white transition"
            onClick={() => setIsRegistering(!isRegistering)}
          >
            {isRegistering ? "Déjà inscrit ? Connectez-vous" : "Pas encore inscrit ? Créez un compte !"}
          </button>
        </div>

        {!isRegistering && (
          <div className="text-center mt-2">
            <Link href="/resetPassword" className="text-red-500 hover:underline">
              Mot de passe oublié ?
            </Link>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default LoginPage;
