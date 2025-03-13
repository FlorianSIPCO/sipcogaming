import { NextRequest, NextResponse } from "next/server";
import { getProductById } from "@/lib/products/getService";
import { updateProduct } from "@/lib/products/updateService";
import { deleteProduct } from "@/lib/products/deleteService";

export async function GET(req: NextRequest, context: { params: { id: string } }) {
  try {
    const product = await getProductById(context.params.id);
    if (!product) return NextResponse.json({ error: "Produit introuvable" }, { status: 404 });

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Erreur lors de la récupération du produit" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, context: { params: { id: string } }) {
  try {
    const body = await req.json();
    const updatedProduct = await updateProduct(context.params.id, body);
    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Erreur lors de la mise à jour du produit" }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest, context: { params: { id: string } }) {
  try {
    await deleteProduct(context.params.id);
    return NextResponse.json({ message: "Produit supprimé avec succès" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Erreur lors de la suppression du produit" }, { status: 400 });
  }
}
