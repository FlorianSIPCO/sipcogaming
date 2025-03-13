"use client";

import { usePathname } from "next/navigation";
import Layout from "./Layout";

const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  // Vérifier si on est sur un dashboard
  const isDashboard = pathname.startsWith("/dashboard/admin") || pathname.startsWith("/dashboard/client");

  return isDashboard ? <>{children}</> : <Layout>{children}</Layout>
};

export default LayoutWrapper;
