"use client";

import Card from "./Card";
import { useRef } from "react";
import { Users, Phone, Mail } from "lucide-react";
import { motion, useInView } from "framer-motion";

const Contact = () => {
  const refSection = useRef(null);
  const isInView = useInView(refSection, { once: true, margin: '-100px' });
  return (
    <section className="relative flex flex-col items-center justify-center w-full py-10" id='contact'>
    <motion.div 
      ref={refSection}
      className="w-full text-center mt-20"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <h2 className="text-3xl font-bold mb-20">Nous contacter</h2>
      <div className="flex flex-wrap justify-center gap-16 max-w-[1400px] mx-auto">
        <Card
          icon={<Phone size={40} />}
          description="Besoin d'informations ? Contactez-nous directement de 8:30 à 18:00"
          action={{
            label: "Nous appeler",
            href: 'tel:+33299761616'
          }}
        />
        <Card
          icon={<Users size={40} />}
          description="Venez nous rendre visite dans notre boutique."
          action={{
            label: "Nous rendre visite",
            href: 'https://maps.app.goo.gl/Qie8k5s5oLrUE9xx5'
          }}
        />
        <Card
          icon={<Mail size={40} />}
          description="Envoyez-nous un message, nous vous répondrons rapidement."
          action={{
            label: "Nous écrire",
            href: 'mailto:contact@sipco.fr'
          }}
        />
      </div>
    </motion.div>;
  </section>
  );
};

export default Contact;
