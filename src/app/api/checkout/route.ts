import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-04-30.basil"
});

export async function POST(req: NextRequest) {
  try {
    const { cartItems, userId, userEmail } = await req.json();

    if (!cartItems || cartItems.length === 0) {
      return NextResponse.json({ error: "Le panier est vide" }, { status: 400 });
    }

    if (!userId) {
        return NextResponse.json({ error: "Utilisateur non identifié" }, { status: 400 })
    }

    // Récupérer les produits depuis la BDD pour éviter toute manipulation
    const productIds = cartItems.map((item: { id: string }) => item.id);
    const products = await prisma.product.findMany({
        where: { id: { in: productIds } },
        select: { id: true, name: true, price: true },
    })

    // Vérifier et recalculer le total
    const lineItems = cartItems.map((item: {id: string; quantity: number}) => {
        const product = products.find((p) => p.id === item.id);
        if (!product) {
            throw new Error('Produit non trouvé');
        }
        return {
            price_data: {
              currency: "eur",
              product_data: {name: product.name},
              unit_amount: Math.round(parseFloat(String(product.price)) * 100), // Stripe prend le prix en centimes
            },
            quantity: item.quantity,
          }
        });

    // URL de redirection après paiement
    const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"

    // Création de la session de paiement Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: lineItems,
      success_url: `${APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${APP_URL}/cart`,
      metadata: { userId },
      customer_email: userEmail || undefined,
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error("Erreur Stripe :", error);
    return NextResponse.json({ error: "Erreur lors de la création de la session Stripe" }, { status: 500 });
  }
}
