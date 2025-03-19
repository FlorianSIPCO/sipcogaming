import { NextRequest, NextResponse } from "next/server";
import { getAllProducts } from "@/lib/products/getService";
import { createProduct } from "@/lib/products/createService";

export async function GET() {
  try {
    const products = await getAllProducts();
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error('Erreur lors de la récupération des produits', error)
    return NextResponse.json({ error: "Erreur lors de la récupération des produits" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Vérification des images
    if (!body.images || !Array.isArray(body.images) || body.images.length === 0) {
      return NextResponse.json({ error: "Les images sont obligatoires" }, { status: 400 });
    }
    
    const newProduct = await createProduct(body);
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error('Erreur lors de la création du produit', error)
    return NextResponse.json({ error: "Erreur lors de la création du produit" }, { status: 400 });
  }
}
