"use client";

import { useSession } from "next-auth/react";

export default function AdminDashboard() {
  const { data: session } = useSession();

  return (
    <div className="text-white">
      <h1 className="text-3xl font-bold">Bienvenue {session?.user?.email} 👋</h1>
      <p className="text-gray-400 mt-2">Vous êtes connecté en tant qu'administrateur.</p>
      {/* Ici on pourra ajouter des stats plus tard */}
    </div>
  );
}
