import { Html, Head, Preview, Container, Section, Text, Img, Tailwind } from '@react-email/components'

type Props = {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  productId: string;
};

export default function LeadSubmissionEmail(data: Props) {
  const { firstname, lastname, email, phone, productId } = data;

  return (
    <Html lang="fr">
      <Head />
      <Preview>Nouveau devis de {firstname} {lastname}</Preview>
      <Tailwind>
        <Container style={{ backgroundColor: "#ffffff" }} className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 max-w-xl mx-auto">
          {/* Logo */}
          <Section style={{ textAlign: "center", marginBottom: "24px" }}>
            <Img
              src="https://configurateur-khaki.vercel.app/images/logo-black.png"
              width="140"
              alt="Logo entreprise"
              style={{ margin: "0 auto" }}
            />
          </Section>

          {/* Titre principal */}
          <Section style={{ backgroundColor: "#b91c1c", padding: "20px", borderRadius: "8px", marginBottom: "20px", marginTop: "20px", textAlign: "center" }}>
            <Text className="text-2xl font-bold text-white">Nouvelle demande de devis</Text>
            <Text className="text-gray-300 text-sm">Envoyée depuis le simulateur en ligne</Text>
          </Section>

          {/* Infos client */}
          <Section style={{ backgroundColor: "#f3f4f6", padding: "20px", textAlign: "center", borderRadius: "8px", marginBottom: "20px" }}>
            <Text className="font-semibold text-black mb-2 text-xl text-center">Informations client</Text>
            <Text><strong>Nom :</strong> {firstname} {lastname}</Text>
            <Text><strong>Email :</strong> {email}</Text>
            <Text><strong>Téléphone :</strong> {phone || "Non renseigné"}</Text>
          </Section>


          {/* Détails du projet */}
          <Section style={{ backgroundColor: "#f3f4f6", padding: "20px", textAlign: "center", borderRadius: "8px", marginBottom: "20px" }}>
            <Text className="font-semibold text-black mb-1 text-xl">Détails du projet</Text>
            <Text><strong>Produit :</strong> {productId}</Text>
          </Section>

          {/* Footer */}
          <Section className="mt-6 text-center text-xs text-gray-500">
            <Text>Ce message a été généré automatiquement depuis le configurateur de devis en ligne.</Text>
          </Section>
        </Container>
      </Tailwind>
    </Html>
  );
}
