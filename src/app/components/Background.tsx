"use client";
import { motion } from "framer-motion";

const Ripples = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
      {[...Array(5)].map((_, i) => {
          const randomScale = Math.random() * 0.5 + 8.5; // Taille de l'expansion aléatoire
          const randomDuration = Math.random() * 0.8 +2.5; // Variation de la durée
          const randomBlur = Math.random() * 6 + 0.5; // Flou aléatoire

        return (
            <motion.div
            key={i}
            className="absolute w-32 h-32 rounded-full border border-red-800"
            initial={{ scale: 0, opacity: 1, filter: `blur(${randomBlur}px)` }}
            animate={{
              scale: [0, randomScale],
              opacity: [1, 0],
              filter: [`blur(${randomBlur}px)`, "blur(0px)"],
            }}
            transition={{
              duration: randomDuration,
              repeat: Infinity,
              repeatDelay: 2,
              delay: i * 0.5,
              ease: "easeOut",
            }}
          />
      )})}
    </div>
  );
};

export default Ripples;
