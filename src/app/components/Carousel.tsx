"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

const slides = [
  {
    id: 1,
    img: "/images/cpu.jpg",
    author: "Comprendre les bases",
    title: "LE PROCESSEUR (CPU)",
    topic: "LE CERVEAU DU PC",
    description: "Le CPU exécute toutes les tâches et calcule les données en jeu. Plus il est puissant, plus votre PC sera rapide et fluide.",
  },
  {
    id: 2,
    img: "/images/ventirad.jpg",
    author: "Comprendre les bases",
    title: "LA CARTE GRAPHIQUE (GPU)",
    topic: "LE MOTEUR GRAPHIQUE",
    description: "Le GPU gère l'affichage et les graphismes. Un bon GPU permet d'obtenir des FPS élevés et une meilleure qualité d'image.",
  },
  {
    id: 3,
    img: "/images/carte_mere.jpg",
    author: "Comprendre les bases",
    title: "LA CARTE MERE",
    topic: "LE SYSTÈME CENTRAL",
    description: "Elle connecte tous les composants ensemble. Une bonne carte mère garantit stabilité et évolutivité pour l’avenir.",
  },
  {
    id: 4,
    img: "/images/ram.jpg",
    author: "Comprendre les bases",
    title: "LA MEMOIRE VIVE (RAM)",
    topic: "RAPIDITÉ & MULTITÂCHE",
    description: "La RAM stocke temporairement les données en cours d'utilisation. Plus il y en a, plus le PC est réactif.",
  },
  {
    id: 5,
    img: "/images/hdd.jpg",
    author: "Comprendre les bases",
    title: "LE STOCKAGE (SSD / HDD)",
    topic: "VITESSE OU CAPACITÉ",
    description: "Le SSD accélère le chargement des jeux et du système. Le HDD offre plus d’espace pour stocker vos fichiers.",
  },
  {
    id: 6,
    img: "/images/alim.jpg",
    author: "Comprendre les bases",
    title: "L’ALIMENTATION (PSU)",
    topic: "L’ÉNERGIE DU PC",
    description: "L'alimentation fournit l'énergie nécessaire aux composants. Une PSU de qualité garantit la stabilité et protège le PC.",
  },
  {
    id: 7,
    img: "/images/pc2.jpg",
    author: "Comprendre les bases",
    title: "LE SYSTÈME DE REFROIDISSEMENT",
    topic: "ÉVITER LA SURCHAUFFE",
    description: "Ventirad ou watercooling ? Le refroidissement maintient les températures basses pour éviter la perte de performances.",
  },
];

const Carousel = () => {
  const [index, setIndex] = useState(0);
  const [imageOrientations, setImageOrientations] = useState<{ [key: number]: boolean }>({});

  const checkImageOrientation = () => {
    const updatedOrientations: { [key: number]: boolean } = {};
    slides.forEach((slide) => {
      const img = document.createElement("img");
      img.src = slide.img;
      img.onload = () => {
        updatedOrientations[slide.id] = img.width > img.height;
        setImageOrientations((prev) => ({ ...prev, ...updatedOrientations }));
      }
    })
  }

  useEffect(() => {
    checkImageOrientation();
  }, []);

  const nextSlide = () => setIndex((prevIndex) => (prevIndex + 1) % slides.length);

  const prevSlide = () => setIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);

  useEffect(() => {
    const interval = setInterval(nextSlide, 9000);
    return () => clearInterval(interval);
  }, [index]);

  return (
    <section className="relative w-screen h-[90vh] md:h-screen bg-black text-white flex items-center justify-center overflow-hidden">
      {/* Liste des images */}
      <div className="absolute w-full h-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={slides[index].id}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.8 }}
            className="absolute w-full h-full"
          >
            <Image
              src={slides[index].img}
              alt={slides[index].title}
              fill
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Contenu du slider */}
      <div className="relative z-10 max-w-3xl bg-black/50 p-5 md:p-10 rounded-lg shadow-lg text-center">
        <h2 className="text-sm md:text-lg uppercase tracking-widest text-gray-400">
          {slides[index].author}
        </h2>
        <h1 className="text-2xl md:text-4xl font-bold neon-text">{slides[index].title}</h1>
        <h3 className="text-lg md:text-xl text-red-500">{slides[index].topic}</h3>
        <p className="mt-4 text-sm md:text-base">{slides[index].description}</p>
        <div className="mt-6 flex justify-center gap-4">
          <Link href='/products' className="px-4 py-2 md:px-6 pd:py-3 border cursor-pointer border-red-500 text-white rounded-lg hover:scale-105 transition hover:bg-red-500 hover:text-white">
            Consulter nos produits
          </Link>
        </div>
      </div>

      {/* Miniatures */}
      <div className="absolute bottom-5 md:bottom-10 flex gap-2 md:gap-4 overflow-x-auto px-4">
        {slides.map((slide, idx) => (
          <button
            key={slide.id}
            onClick={() => setIndex(idx)}
            className={`w-12 h-16 md:w-16 md:h-24 cursor-pointer rounded-md overflow-hidden border-2 ${
              idx === index ? "border-red-500 scale-100" : "border-white"
            } transition-all`}
          >
            <Image
              src={slide.img}
              alt={`Miniature ${idx + 1}`}
              width={64}
              height={96}
              className={`object-cover transition-transform duration-300 ${imageOrientations[slide.id] ? "rotate-90" : ""}`}
            />
          </button>
        ))}
      </div>

      {/* Flèches de navigation */}
      <button
        className="hidden sm:block absolute left-2 md:left-10 text-white text-3xl md:text-4xl bg-black/50 px-3 md:px-4 py-1 md:py-2 rounded-md hover:bg-black/70 transition"
        onClick={prevSlide}
      >
        <ChevronLeft />
      </button>
      <button
        className="hidden sm:block absolute right-2 md:right-10 text-white text-3xl md:text-4xl bg-black/50 px-3 md:px-4 py-1 md:py-2 rounded-md hover:bg-black/70 transition"
        onClick={nextSlide}
      >
        <ChevronRight />
      </button>
    </section>
  );
};

export default Carousel;
