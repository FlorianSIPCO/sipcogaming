"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const gamingPCs = [
  { id: 1, name: "Ultra Gaming", desc: "FPS élevés, graphismes max, réactivité sans faille. Conçu pour les gamers exigeants.", img: "/images/gaming.jpg" },
  { id: 2, name: "Streamer & Gamer", desc: "Jouez et streamez en 1080p/4K sans perte de fluidité. Performance multitâche garantie.", img: "/images/streaming.jpg" },
  { id: 3, name: "Créateurs & Pros", desc: "Rendu vidéo rapide, multitâche fluide et puissance adaptée aux logiciels pro.", img: "/images/video.jpg" },
];

const GamingPCs = () => {
  return (
    <motion.div
      className="flex flex-wrap justify-center gap-8 mt-10 md:mt-16 bg-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 1.5 }}
    >
      {gamingPCs.map((pc, index) => (
        <motion.div
          key={pc.id}
          className="relative w-72 md:64 h-80 bg-gray-900 rounded-xl shadow-lg p-4 text-white text-center neon-border flex flex-col justify-between"
          initial={{ y: -50, opacity: 1 }}
          animate={{ y: [0, -20, 0], opacity: 1 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
            delay: index * 0.2,
          }}
        >
          <motion.div
            className="absolute inset-0 rounded-xl border-2 shadow-neon"
            animate={{
              borderColor: ["#00FFFF", "#9400D3", "#FF00FF"],
              boxShadow: [
                "0 0 10px #00FFFF, 0 0 10px #9400D3",
                "0 0 10px #9400D3, 0 0 10px #FF00FF",
                "0 0 10px #FF00FF, 0 0 10px #00FFFF",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />

          <div className="relative w-full h-48">
            <Image
              src={pc.img}
              alt={pc.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="rounded-lg object-cover"
            />
          </div>
          <h3 className="mt-4 text-lg font-bold neon-text">{pc.name}</h3>
          <p>{pc.desc}</p>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default GamingPCs;
