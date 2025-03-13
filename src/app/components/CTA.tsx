"use client";
import { motion } from "framer-motion";

interface CTAProps {
  text: string;
  href?: string;
}

const CTA = ({ text, href = "/" }: CTAProps) => {
  return (
    <motion.div
      className=""
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <motion.a
        href={href}
        className="relative px-8 py-4 text-xl font-bold text-white uppercase transition-all duration-300 rounded-lg neon-button border-none z-50"
        animate={{
          background: [
            "linear-gradient(90deg, #00FFFF, #9400D3, #FF00FF)",
            "linear-gradient(90deg, #9400D3, #FF00FF, #00FFFF)",
            "linear-gradient(90deg, #FF00FF, #00FFFF, #9400D3)",
          ],
          boxShadow: [
            "0 0 10px #00FFFF, 0 0 20px #9400D3",
            "0 0 20px #9400D3, 0 0 30px #FF00FF",
            "0 0 10px #FF00FF, 0 0 20px #00FFFF",
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      >
        {text}
      </motion.a>
    </motion.div>
  );
};

export default CTA;
