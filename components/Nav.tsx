"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "Kompresi", href: "#compare" },
  { name: "Fitur", href: "#features" },
  { name: "Cara Kerja", href: "#how" },
  {
    name: "GitHub",
    href: "https://github.com/Ikhwan-ione/ionexemage",
    external: true,
  },
];

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [pillStyle, setPillStyle] = useState<{
    left: number;
    width: number;
  } | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Array<HTMLAnchorElement | null>>([]);

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

  const handlePillEnter = (i: number) => {
    const el = itemRefs.current[i];
    const container = containerRef.current;
    if (!el || !container) return;
    const elRect = el.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    setPillStyle({
      left: elRect.left - containerRect.left,
      width: elRect.width,
    });
  };

  const handlePillLeave = () => setPillStyle(null);

  const menuVariants: Variants = {
    hidden: { opacity: 0, y: -20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: { duration: 0.2, ease: "easeInOut" },
    },
  };

  return (
    <header className="fixed top-4 md:top-5 inset-x-0 z-50 px-4 md:px-6">
      <div className="relative max-w-5xl mx-auto">
        {/* Decorative top notch, meniru highlight di referensi */}
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-10 h-1 rounded-full bg-cyan/80 blur-[2px]" />

        <div className="flex items-center justify-between gap-4 rounded-full bg-abyss/85 backdrop-blur-xl border border-cyan/10 shadow-[0_8px_30px_rgba(0,0,0,0.55)] px-4 md:px-5 py-2.5">
          {/* LOGO */}
          <div className="flex items-center gap-2.5 group cursor-default shrink-0">
            <Image
              src="/app_logo.webp"
              alt="IONEXEMAGE Logo"
              width={26}
              height={26}
              className="object-contain drop-shadow-[0_0_8px_rgba(0,238,255,0.3)] transition-transform duration-300 group-hover:scale-105"
              priority
            />
            <span className="font-display font-semibold tracking-tight text-[14px] text-white">
              IONEX
              <span className="text-cyan drop-shadow-[0_0_8px_rgba(0,238,255,0.4)]">
                E
              </span>
              MAGE
            </span>
          </div>

          {/* DESKTOP NAV — sliding pill highlight */}
          <nav
            aria-label="Main Navigation"
            ref={containerRef}
            onMouseLeave={handlePillLeave}
            className="hidden md:flex items-center gap-1 relative"
          >
            <AnimatePresence>
              {pillStyle && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    x: pillStyle.left,
                    width: pillStyle.width,
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  className="absolute top-0 bottom-0 rounded-full bg-white/8 border border-cyan/20 shadow-[0_0_18px_rgba(0,238,255,0.15)]"
                />
              )}
            </AnimatePresence>

            {navLinks.map((link, i) => (
              <a
                key={link.name}
                ref={(el) => {
                  itemRefs.current[i] = el;
                }}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noreferrer" : undefined}
                onMouseEnter={() => handlePillEnter(i)}
                className="relative z-10 px-4 py-2 rounded-full text-sm font-medium text-muted hover:text-white transition-colors duration-300"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* CTA & MOBILE TOGGLE */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="#download"
              className="hidden sm:inline-flex text-sm px-5 py-2 rounded-full btn-primary font-medium animate-pulse-glow"
            >
              Unduh
            </a>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Tutup Menu" : "Buka Menu"}
              aria-expanded={isMenuOpen}
              className="md:hidden text-muted hover:text-white transition-colors p-1 relative z-50"
            >
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU DRAWER — muncul di bawah pill, bukan edge-to-edge */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMenuOpen(false)}
                className="fixed inset-0 top-[70px] bg-abyss/80 backdrop-blur-lg md:hidden"
              />
              <motion.div
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={menuVariants}
                className="absolute top-full mt-3 inset-x-0 rounded-2xl bg-surface/95 border border-cyan/20 md:hidden overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.55)]"
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
                  <a
                    href="#download"
                    onClick={() => setIsMenuOpen(false)}
                    className="sm:hidden text-center text-sm px-5 py-2.5 rounded-full btn-primary font-medium"
                  >
                    Unduh
                  </a>
                </nav>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}