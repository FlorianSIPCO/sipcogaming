"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { Menu, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cart, setIsCartOpen } = useCart();
  const pathname = usePathname();
  const router = useRouter();

  const handleScrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault(); // Empêche le rechargement de la page

    if (pathname === '/') {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth', block: "start"})
      }
    } else {
      router.push('/#contact');
    }
  };

  const navItems = [
    { name: "Produits", href: '/products'},
    { name: "Accueil", href: '/'},
    { name: "Contact", href: '/#contact', onclick: handleScrollToContact},
  ]

  return (
    <nav className="relative top-0 left-0 w-full bg-black-950 backdrop-blur-lg text-white shadow-lg z-50">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        
        {/* Logo */}
        <motion.div
          className="w-24 h-auto"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Link href='/'>
            <Image 
              src='/images/logo.png'
              alt="Logo SIPCO Gaming"
              width={50}
              height={50}
              style={{ width: "auto", height: "auto" }}
              priority
            />
          </Link>
        </motion.div>

        {/* Desktop Nav */}
        <ul className="hidden md:flex space-x-6">
          {navItems.map((item, i) => (
            <motion.li
              key={i}
              className="relative cursor-pointer text-2xl font-bold text-white transition-all duration-300 hover:text-red-500 hover:scale-110"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0, transition: { delay: i * 0.2 } }}
            >
              <Link href={item.href} className="flex items-center">
                {item.name}
              </Link>
              <span className="absolute left-0 bottom-0 w-full h-0.5 bg-red-500 scale-x-0 transition-transform duration-300 hover:scale-x-100" />
            </motion.li>
          ))}
        </ul>

        {/* Icons (Panier & Login) */}
        <div className="flex items-center space-x-4">
          <button onClick={() => setIsCartOpen(true)} className="relative">
            <ShoppingCart className="w-10 h-10 cursor-pointer hover:text-red-500 transition" />
            {cart.length > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {cart.length}
              </span>
            )}
          </button>
          <Link href='/login'>
            <User className="w-10 h-10 cursor-pointer hover:text-red-500 transition" />
          </Link>
          <button
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Menu className="w-10 h-10" />
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <motion.div
          className="md:hidden bg-black p-4 text-center space-y-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {navItems.map((item, i) => (
            <motion.div
              key={i}
              className="cursor-pointer text-lg text-white hover:text-red-500 transition-all duration-300"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0, transition: { delay: i * 0.2 } }}
            >
              <Link
                href={item.href}
                className="text-lg text-white hover:text-red-500 transition-all duration-300"
                onClick={item.onclick || undefined}
              >
                {item.name}
              </Link>
            </motion.div>
          ))}
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
