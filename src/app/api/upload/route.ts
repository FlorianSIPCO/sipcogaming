import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from 'cloudinary'
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
  }

  try {
    const formData = await req.formData();
    const files = formData.getAll("images") as File[];

    if (!files.length) {
      return NextResponse.json({ error: "Aucun fichier reçu" }, { status: 400 });
    }

    const uploadedPaths: string[] = [];

    for (const file of files) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
  
      // Convertir buffer en base64 pour cloudinary
      const base64Image = `data:${file.type};base64,${buffer.toString("base64")}`;

      // upload vers Cloudinary
      const result = await cloudinary.uploader.upload(base64Image, {
        folder: "uploads"
      })

      uploadedPaths.push(result.secure_url);
    }

    return NextResponse.json({ paths: uploadedPaths }, { status: 201 });
  } catch (error) {
    console.error("Erreur lors de l'upload :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

