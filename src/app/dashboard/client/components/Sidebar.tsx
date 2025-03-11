"use client";

import Link from "next/link";
import { LogOut, Home, Users, Package } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const logout = async () => {
    await signOut({ redirect: false });
    router.push("/login");
  };

  const navItems = [
    { name: "Accueil", href: "/dashboard/client", icon: <Home size={20} /> },
    { name: "Produits", href: "/dashboard/client/products", icon: <Package size={20} /> },
    { name: "Facture", href: "/dashboard/client/Facture", icon: <Users size={20} /> },
  ];

  return (
    <aside className="w-64 bg-gray-800 p-6 flex flex-col justify-between">
      <nav>
        <h2 className="text-2xl font-bold text-white mb-6">Client</h2>
        <ul className="space-y-4">
          {navItems.map((item, index) => (
            <li key={index}>
              <Link
                href={item.href}
                className={`flex items-center gap-3 p-3 rounded-lg transition ${
                  pathname === item.href ? "bg-red-500" : "hover:bg-gray-700"
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Bouton Logout */}
      <button
        onClick={logout}
        className="flex items-center gap-3 text-red-400 hover:text-white transition p-3 rounded-lg"
      >
        <LogOut size={20} />
        Déconnexion
      </button>
    </aside>
  );
};

export default Sidebar;
