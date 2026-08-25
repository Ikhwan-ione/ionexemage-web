"use client";

import { useState, useEffect } from "react";
import Image from "next/image"; // Tambahkan import Image Next.js
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "Kompresi", href: "#compare" },
  { name: "Fitur", href: "#features" },
  { name: "Cara Kerja", href: "#how" },
  { name: "GitHub", href: "https://github.com/Ikhwan-ione/ionexemage", external: true },
];

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const menuVariants: Variants = {
    hidden: { opacity: 0, y: -20, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } 
    },
    exit: { 
      opacity: 0, 
      y: -10, 
      transition: { duration: 0.2, ease: "easeInOut" } 
    }
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-abyss/80 backdrop-blur-xl border-b border-cyan/10 selection:bg-cyan/30">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-3 flex items-center justify-between">
        
        {/* LOGO AREA - Direvisi menggunakan app_logo.webp */}
        <div className="flex items-center gap-2.5 group cursor-default">
          <Image 
            src="/app_logo.webp" 
            alt="IONEXEMAGE Logo" 
            width={28} 
            height={28} 
            className="object-contain drop-shadow-[0_0_8px_rgba(0,238,255,0.3)] transition-transform duration-300 group-hover:scale-105"
            priority // Memastikan logo dimuat paling pertama tanpa lazy loading
          />
          <span className="font-display font-semibold tracking-tight text-[15px] text-white">
            IONEX<span className="text-cyan drop-shadow-[0_0_8px_rgba(0,238,255,0.4)]">E</span>MAGE
          </span>
        </div>

        {/* DESKTOP NAVIGATION */}
        <nav aria-label="Main Navigation" className="hidden md:flex items-center gap-8 text-sm text-muted">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noreferrer" : undefined}
              className="relative block hover:text-white transition-colors duration-300 group"
            >
              {link.name}
              <span className="absolute bottom-[-4px] left-0 w-0 h-[1.5px] bg-cyan transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* CTA & MOBILE MENU TOGGLE */}
        <div className="flex items-center gap-4">
          <a
            href="#download"
            className="text-sm px-5 py-2.5 rounded-lg btn-primary font-medium group animate-pulse-glow"
          >
            Unduh
          </a>

          {/* Hamburger/Close Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Tutup Menu" : "Buka Menu"}
            aria-expanded={isMenuOpen}
            className="md:hidden text-muted hover:text-white transition-colors p-1 relative z-50"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU DRAWER & BACKDROP */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 top-[60px] h-[100dvh] bg-abyss/80 backdrop-blur-lg md:hidden"
            />
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={menuVariants}
              className="absolute top-full inset-x-0 bg-surface/95 border-b border-cyan/20 md:hidden overflow-hidden shadow-cyan-glow"
            >
              <nav className="flex flex-col p-6 gap-6 text-base font-medium">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noreferrer" : undefined}
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-muted hover:text-cyan hover:drop-shadow-[0_0_12px_rgba(0,238,255,0.8)] transition-all duration-300"
                  >
                    {link.name}
                  </a>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}