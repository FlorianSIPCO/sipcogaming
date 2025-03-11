import { NextRequest, NextResponse } from "next/server";
import { getAllUsers } from "@/lib/users/getService";

export async function GET(req: NextRequest) {
  try {
    const users = await getAllUsers();
    return NextResponse.json(users, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json({ error: "Erreur lors de la récupération des utilisateurs" }, { status: 400 });
  }
}
