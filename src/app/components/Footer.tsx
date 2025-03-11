"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

const Footer = () => {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScroll(true);
      } else {
        setShowScroll(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <footer className="w-full bg-black text-gray-400 text-sm py-6 relative">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between px-6 text-center md:text-left">
          
          {/* Logo & Copyright */}
          <div className="flex flex-col md:flex-row items-center gap-4">
            <Link href='/'>
              <Image 
                src="/images/logo.png" 
                alt="Logo SIPCO Gaming" 
                width={50} 
                height={50}
                style={{ width: "auto", height: "auto" }}
                priority
              />
            </Link>
            <p className="text-gray-500 mt-2 md:mt-0">
              © {new Date().getFullYear()} SIPCO Gaming. Tous droits réservés.
            </p>
          </div>

          {/* Liens légaux */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mt-4 md:mt-0">
            <Link href="/cgu" className="hover:text-white transition">CGU</Link>
            <Link href="/cgv" className="hover:text-white transition">CGV</Link>
            <Link href="/mentions-legales" className="hover:text-white transition">Mentions légales</Link>
            <Link href="/politique-de-confidentialite" className="hover:text-white transition">Politique de confidentialité</Link>
          </div>

        </div>

        {/* Mention de développement */}
        <div className="text-center text-gray-500 mt-4">
          <p>
            Site conçu par{" "}
            <a href="https://sipco.fr/" target="_blank" className="text-red-500 hover:underline">
              SIPCO
            </a>
          </p>
        </div>
      </footer>

      {/* Bouton "Retour en haut" animé */}
      <AnimatePresence>
        {showScroll && (
          <motion.button
            onClick={scrollToTop}
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 bg-red-500 text-white p-3 rounded-full shadow-lg hover:scale-110 transition-all"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <ArrowUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};

export default Footer;
