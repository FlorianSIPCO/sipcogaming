import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Fonction pour envoyer un email de confirmation de commande
 * @param to Email du client
 * @param subject Sujet de l'email
 * @param text Contenu de l'email en texte brut
 * @param html Contenu en HTML (optionnel)
 */
export async function sendMail(to: string, subject: string, text: string, html?: string) {
  try {
    const response = await resend.emails.send({
      from: "SIPCO<noreply@sipcogaming.fr>",
      to: [to],
      subject,
      text,
      ...(html && {html})
    });

    console.log("Email envoyÃ© avec succÃ¨s :", response);
    return response;
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email :", error);
    throw new Error("Echec de l'envoi de l'email")
  }
}
