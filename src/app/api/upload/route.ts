import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { join } from "path";
import { randomUUID } from "crypto";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
  }

  const formData = await req.formData();
  const file = formData.get("image") as File | null;

  if (!file) {
    return NextResponse.json({ error: "Aucun fichier reçu" }, { status: 400 });
  }

  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const fileName = `${randomUUID()}-${file.name.replace(/\s/g, "_")}`;
    const filePath = join(process.cwd(), "public/uploads", fileName);

    await writeFile(filePath, buffer);

    return NextResponse.json({ path: `/uploads/${fileName}` }, { status: 201 });
  } catch (error) {
    console.error("Erreur lors de l'upload :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
