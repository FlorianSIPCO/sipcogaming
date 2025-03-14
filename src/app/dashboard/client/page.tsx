"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import GamingLoader from "@/app/components/GamingSpinner/GamingLoader";

interface User {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  role: string;
  orders: string[];
  adresses: string[];
}

export default function ClientDashboard() {
  const { data: session } = useSession();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Récupération des données de l'utilisateur
  useEffect(() => {
    if (session?.user?.id) {
      setLoading(true);
      fetch(`/api/user/${session.user.id}`)
        .then((res) => {
          if (!res.ok) throw new Error("Utilisateur non trouvé");
          return res.json();
        })
        .then((data) => {
          setUser(data);
        })
        .catch((error) => console.error("Erreur de récupération: ", error))
        .finally(() => setLoading(false));
    }
  }, [session]);

  return (
    <div className="text-white">
      {loading ? (
        <div className="flex justify-center"><GamingLoader/></div>
      ) : (
        <>
          <h1 className="text-3xl font-bold">Bienvenue {user?.firstname} 👋</h1>
          <p className="text-gray-400 mt-2">Vous êtes connecté en tant que client.</p>
        </>
      )}
    </div>
  );
}
