import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";
import { sendMail } from "@/lib/sendMail";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-04-30.basil",
});

export async function POST(req: NextRequest) {
  const payload = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "Signature Stripe absente"}, {status: 400} );
  }

  try {
    const event = stripe.webhooks.constructEvent(
      payload,
      sig as string,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );


    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.metadata?.userId;

      if (!userId) {
        console.error("Erreur: userId absent des métadonnées Stripe.");
        return NextResponse.json({ error: "userId manquant dans Stripe metadata"}, { status: 400 })
      }

      // Vérifier si la commande existe déjà
      const existingOrder = await prisma.order.findUnique({
        where: { stripeSessionId: session.id }
      })

      if (!existingOrder) {
          const newOrder = await prisma.order.create({
            data: {
              userId: userId as string,
              stripeSessionId: session.id,
              total: session.amount_total! / 100,
              status: "PAID",
            },
          });
          // Envoie de l'email de confirmation après création de la commande
          await sendMail(
            session.customer_email!,
            "Confirmation de commande",
            `Merci pour votre commande ! Votre numéro de commande est ${newOrder.id}.`
          );
      } else {
        console.warn("Commande déjà existante pour cette session Stripe")
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Erreur webhook Stripe :", error);
    return NextResponse.json({ error: "Erreur webhook Stripe" }, { status: 400 });
  }
}
