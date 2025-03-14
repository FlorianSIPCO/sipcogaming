import { NextRequest, NextResponse } from "next/server";
import { getOrdersByUserId } from "@/lib/orders/getService";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/route";

export async function GET(req: NextRequest, context: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const { id } = context.params;

  // Seul l'utilisateur connecté peut voir ses propres commandes
  if (session.user.id !== id) {
    return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
  }

  try {
    const orders = await getOrdersByUserId(id);
    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la récupération des commandes :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
