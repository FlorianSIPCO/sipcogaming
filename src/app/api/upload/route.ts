import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { join } from "path";
import { v4 as uuidv4 } from 'uuid'
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
  }

  const formData = await req.formData();
  const files = formData.getAll("images") as File[];

  if (!files.length) {
    return NextResponse.json({ error: "Aucun fichier reçu" }, { status: 400 });
  }

  try {
    const uploadedPaths: string[] = [];

    for (const file of files) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
  
      const fileName = `${uuidv4()}-${file.name}`;
      const filePath = join(process.cwd(), "public/uploads", fileName);
  
      await writeFile(filePath, buffer);
      uploadedPaths.push(`/uploads/${fileName}`)
    }

    return NextResponse.json({ paths: uploadedPaths }, { status: 201 });
  } catch (error) {
    console.error("Erreur lors de l'upload :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

