import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import LeadSubmissionEmail from '@/emails/LeadSubmissions';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const data = await req.json();

  try {
    const { firstname, lastname, email, phone, productId } = data;

    const emailRes = await resend.emails.send({
      from: 'Devis simulateur <onboarding@resend.dev>',
      to: 'florian.bouclet@sipco.fr',
      subject: `Nouveau devis de ${firstname} ${lastname}`,
      react: LeadSubmissionEmail({ firstname, lastname, email, phone, productId }),
    });

    return NextResponse.json({ success: true, emailRes });
  } catch (error) {
    console.error("Erreur d'envoi email:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
