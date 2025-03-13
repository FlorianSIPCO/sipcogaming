"use client"

import GamingPCs from "./components/GamingPCs";
import CTA from "./components/CTA";
import AboutUs from "./components/AboutUs";
import Contact from './components/Contact'
import Carousel from "./components/Carousel";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <>
      <main className="flex flex-col flex-grow justify-center items-center text-white relative">
        {/* Hero Section */}
        <motion.div
          className="bg-[url('/images/bg-bluelight.jpg')] bg-cover bg-center bg-no-repeat w-screen flex justify-center flex-col items-center md:px-12 text-center md:h-screen"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.h1
            className="text-3xl md:text-5xl font-bold text-center mt-20 md:mt-40 mb-6 leading-tight"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              delay: 0.8,
              duration: 1.2,
              type: "spring",
              stiffness: 150,
              damping: 10,
            }}
          >
            Libérez toute la puissance du gaming !
          </motion.h1>
          <GamingPCs />
        </motion.div>
        
        {/* CTA */}
        <motion.div 
          className="mt-8 md:mt-0"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <CTA text="Votre setup commence ici" href="/products" />
        </motion.div>

        <motion.div 
          className="mt-8 md:mt-0"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <AboutUs />
        </motion.div>

        <motion.div 
          className="mt-8 md:mt-10"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <Carousel /> 
        </motion.div>

        <motion.div 
          className="mt-8 md:mt-10"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <Contact />
        </motion.div>
      </main>
    </>
  );
}
