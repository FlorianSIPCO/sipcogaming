export default function MentionsLegalesPage() {
    return (
      <main className="w-screen bg-[url('/images/bg-computer-left.jpg')] bg-cover bg-center bg-fixed flex items-center justify-center">
        <div className="max-w-4xl mx-auto p-6 text-white">
          <h1 className="text-3xl font-bold text-red-500 mb-4">Mentions légales</h1>
          <p className="text-gray-300">Dernière mise à jour : 04-2025</p>
          <section className="mt-6 space-y-4">
            <h2 className="text-2xl font-semibold text-red-300">Editeur</h2>
            <ul>
              <li>Le site est édité par <strong>SIPCO</strong>,</li>
              <li>dont le siège social est situé au <strong>12 rue des artisans, 35500 Vitré</strong></li>
              <li>N° SIRET : <strong>32409458000051</strong>, N° TVA INTRACOMMUNAUTAIRE : <strong>FR81324094580</strong></li>
              <li>Tél. : <strong>02 99 76 16 16</strong></li>
              <li>Email : <strong>contact@sipco.fr</strong></li>
            </ul>

            <h2 className="text-2xl font-semibold text-red-300">Conception / Réalisation / Hébergement</h2>
            <ul>
              <li>Réalisé par <strong>SIPCO</strong>,</li>
              <li>Hébergé par <strong>SIPCO</strong>,</li>
              <li>Siège social : <strong>12 rue des artisans, 35500 Vitré</strong></li>
            </ul>

            <h2 className="text-2xl font-semibold text-red-300">Propriété intellectuelle</h2>
            <p className="space-y-2 text-gray-200 px-1 py-2 text-justify">
              La structure générale du site, ainsi que les textes, graphiques, images, sons et vidéos la
              composant, sont la propriété de SIPCO.<br />
              Toute représentation et/ou reproduction et/ou
              exploitation partielle ou totale de ce site, par quelque procédé que ce soit, sans l'autorisation
              préalable et par écrit de SIPCO est strictement interdite et serait susceptible de constituer une
              contrefaçon au sens des articles L 335-2 et suivants du Code de la propriété intellectuelle.
            </p>
          </section>
        </div>
      </main>
    );
  }
  