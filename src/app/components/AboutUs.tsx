"use client";

import { useEffect, useRef, useState } from "react";
import Card from "./Card";
import { Lightbulb, Brain, Zap, MonitorSmartphone, Headset, Users } from "lucide-react";
import { useInView } from "framer-motion";
import { motion } from "framer-motion";

const AboutUs = () => {
    const lineRef = useRef<HTMLDivElement | null>(null);
    const [lineHeight, setLineHeight] = useState(0);
    const refSection = useRef(null);
    const isInView = useInView(refSection, { once: true, margin: '-100px' });

    useEffect(() => {
        const handleScroll = () => {
        if (lineRef.current) {
            const rect = lineRef.current.getBoundingClientRect();
            const progress = Math.min(1, Math.max(0, (window.innerHeight - rect.top) / window.innerHeight));
            setLineHeight(progress * 420); // Ajuste la hauteur selon le scroll
        }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
  return (
    <section className="relative flex flex-col items-center justify-center w-full py-10 px-6 sm:px-12 bg-[url('/images/bg.jpg')] bg-cover bg-center bg-no-repeat">
    {/* Ligne verticale */}
    <div ref={lineRef} className="hidden sm:block absolute top-10 left-1/2 transform -translate-x-1/2 w-[2px] bg-dotted-line" style={{ height: `${lineHeight}px` }} />

    {/* Branches latérales */}
    <div className="hidden sm:block absolute top-[25%] left-1/2 w-[300px] h-[2px] bg-dotted-line-horizontal animate-grow-left"></div>
    <div className="hidden sm:block absolute top-[20%] right-1/2 w-[300px] h-[2px] bg-dotted-line-horizontal animate-grow-right"></div>

    {/* Cartes d'info */}
    <div className="hidden sm:flex gap-12 mt-10">
      <div className="bg-none p-6 rounded-lg shadow-lg w-80 text-center mt-40">
        <div className="flex items-center justify-center m-auto mb-5 w-15 h-15 border rounded-full rgb-animation">
            <Brain />
        </div>
        <h3 className="text-xl font-bold mb-2">Expertise</h3>
        <p>Montage et optimisation de configurations gaming haute performance et sur-mesure.</p>
      </div>
      <div className="bg-none p-6 rounded-lg shadow-lg w-80 text-center mt-100">
        <div className="flex items-center justify-center m-auto mb-5 w-15 h-15 border rounded-full rgb-animation">
            <Zap />
        </div>
        <h3 className="text-xl font-bold mb-2">Performance</h3>
        <p>Nous proposons des composants de pointe pour une immersion totale. Toutes les configurations sont montés dans notre atelier.</p>
      </div>
      <div className="bg-none p-6 rounded-lg shadow-lg w-80 text-center mt-50">
        <div className="flex items-center justify-center m-auto mb-5 w-15 h-15 border rounded-full rgb-animation">
            <Lightbulb />
        </div>
        <h3 className="text-xl font-bold mb-2">Conseil Personnalisé</h3>
        <p>Nous vous aidons à choisir le setup parfait selon vos besoins et votre budget.</p>
      </div>
    </div>

    {/* Cartes d'info mobile */}
    <div className="sm:hidden flex flex-col gap-8 mt-10">
        {[
          { icon: <Brain />, title: "Expertise", description: "Montage et optimisation de configurations gaming haute performance et sur-mesure." },
          { icon: <Zap />, title: "Performance", description: "Nous proposons des composants de pointe pour une immersion totale. Toutes les configurations sont montées dans notre atelier." },
          { icon: <Lightbulb />, title: "Conseil Personnalisé", description: "Nous vous aidons à choisir le setup parfait selon vos besoins et votre budget." }
        ].map((item, index) => (
          <motion.div
            key={index}
            className="w-full bg-none p-6 rounded-lg shadow-lg text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center m-auto mb-5 w-16 h-16 border rounded-full rgb-animation">
              {item.icon}
            </div>
            <h3 className="text-xl font-bold mb-2">{item.title}</h3>
            <p>{item.description}</p>
          </motion.div>
        ))}
      </div>

    {/* Pourquoi choisir SIPCO Gaming ? */}
    <motion.div 
      ref={refSection}
      className="w-full text-center mt-20"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <h2 className="text-3xl font-bold mb-20">
        Pourquoi choisir SIPCO GAMING ?
      </h2>
      <div className="flex flex-wrap justify-center gap-16 max-w-[1400px] mx-auto">
        <Card
          icon={<MonitorSmartphone size={40} />}
          title="Matériel haut de gamme"
          description="Nous utilisons uniquement des composants certifiés et testés pour offrir une puissance inégalée."
        />
        <Card
          icon={<Headset size={40} />}
          title="Support technique dédié"
          description="Besoin d’aide ? Nos experts sont à votre disposition pour vous accompagner."
        />
        <Card
          icon={<Users size={40} />}
          title="Expérience personnalisée"
          description="Chaque joueur est unique, nos conseils le sont aussi."
        />
      </div>
    </motion.div>;
  </section>
  );
};

export default AboutUs;
