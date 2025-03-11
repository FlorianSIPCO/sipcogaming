import { NextRequest, NextResponse } from "next/server";
import { updateUser } from "@/lib/users/updateService";
import { deleteUser } from "@/lib/users/deleteService";
import { getUserById } from "@/lib/users/getService";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { error } from "console";

export async function GET(req: NextRequest, context: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const { id } = context.params;

  // Seul l'admin ou l'utilisateur lui-même peut voir ses infos
  if (session.user.role !== 'ADMIN' && session.user.id !== id) {
    return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
  }

  try {
    const user = await getUserById(id);
    if (!user) {
      return NextResponse.json({ error: "Utilisateur non trouvé" }, { status: 404 });
    }
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, context : { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const { id } = context.params;
  const body = await req.json();

  // Seul l'admin ou l'utilisateur lui-même peut modifier ses infos
  if (session.user.role !== "ADMIN" && session.user.id !== id) {
    return NextResponse.json({ error: "Accès refusé" }, { status: 403 })
  }

  // Empêcher un utilisateur de se donner le rôle ADMIN
  if (body.role && session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: "Modification du rôle interdite" }, { status: 403 })
  }

  try {
    const userId = context.params.id;
    if (!userId) {
      return NextResponse.json({ error: "ID utilisateur requis."}, { status: 400 })
    }

    const body = await req.json();
    const updatedUser = await Promise.resolve(updateUser(userId, body));

    return NextResponse.json({ user: updatedUser, message: "Utilisateur mis à jour avec succès"}, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json({ error: "Erreur lors de la mise à jour" }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest, context: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if(!session) {
    return NextResponse.json({ error: "Non autorisé "}, { status: 401 });
  }

  const { id } = context.params;

  // Seul l'admin ou l'utilisateur lui-même peut supprimer son compte
  if (session.user.role !== 'ADMIN' && session.user.id !== id) {
    return NextResponse.json({ error: 'Accès refusé' }, { status: 403 });
  }

  try {
    const response = await deleteUser(id);
    return NextResponse.json(response, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json({ error: "Erreur lors de la suppression" }, { status: 400 });
  }
}
