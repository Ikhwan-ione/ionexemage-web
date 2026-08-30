"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronsLeftRight } from "lucide-react";
import dynamic from "next/dynamic";

const GatewayFlow = dynamic(() => import("./GatewayFlow"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-abyss" />,
});

export default function CompareSlider() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [pct, setPct] = useState(50); // Mulai persis di tengah
  const dragging = useRef(false);

  function updateFromClientX(clientX: number) {
    const el = wrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPct(Math.max(0, Math.min(100, next))); // Batas mentok kiri-kanan
  }

  return (
    <section id="compare" className="relative py-28 md:py-36 px-6 md:px-10">
      <div className="absolute inset-0 z-0 opacity-100">
        <GatewayFlow density={0.5} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center mb-16">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="text-xs tracking-[0.25em] font-mono uppercase mb-4 text-cyan"
        >
          Kompresi Ekstrem
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl tracking-tight mb-6"
        >
          Kualitas gambar sama. <br className="hidden md:block" />
          <span className="text-white/80">Lebih kecil ukurannya.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-4 text-muted max-w-xl mx-auto text-base md:text-lg"
        >
          Geser garis pembatas di bawah untuk melihat bagaimana IONEXEMAGE
          mengompresi foto RAW JPG berat hanya dalam hitungan detik.
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-w-4xl mx-auto"
      >
        <div
          ref={wrapRef}
          className="relative w-full aspect-[4/3] md:aspect-[16/9] rounded-2xl md:rounded-3xl overflow-hidden border border-edge cursor-ew-resize select-none touch-none shadow-2xl shadow-cyan/5"
          onPointerDown={(e) => {
            dragging.current = true;
            updateFromClientX(e.clientX);
            (e.target as HTMLElement).setPointerCapture(e.pointerId);
          }}
          onPointerMove={(e) => {
            if (dragging.current) updateFromClientX(e.clientX);
          }}
          onPointerUp={() => (dragging.current = false)}
          onPointerCancel={() => (dragging.current = false)}
        >
          {/* =============================== */}
          {/* 1. BEFORE LAYER (Bawah / Kanan) */}
          {/* =============================== */}
          <div className="absolute inset-0">
            <Image
              src="/city.webp"
              alt="Gambar sebelum dikompresi (JPG)"
              fill
              className="object-cover"
              quality={100}
              priority
            />

            <div className="absolute top-4 right-4 md:top-6 md:right-6 px-4 py-2 rounded-xl text-xs md:text-sm font-mono glass backdrop-blur-xl border border-white/10 shadow-lg z-10">
              <span className="text-muted">Sebelum · </span>
              <span className="text-white font-semibold">15.0 MB (JPG)</span>
            </div>
          </div>

          {/* =============================== */}
          {/* 2. AFTER LAYER (Atas / Kiri) */}
          {/* =============================== */}
          <div
            className="absolute inset-0 z-10 border-r border-cyan/50"
            style={{
              clipPath: `inset(0 ${100 - pct}% 0 0)`,
            }}
          >
            <Image
              src="/city.webp"
              alt="Gambar setelah dikompresi (WebP)"
              fill
              className="object-cover"
              quality={100}
              priority
            />

            <div className="absolute top-4 left-4 md:top-6 md:left-6 px-4 py-2 rounded-xl text-xs md:text-sm font-mono glass backdrop-blur-xl border border-cyan/30 shadow-[0_0_15px_rgba(0,238,255,0.2)] z-10">
              <span className="text-muted">Sesudah · </span>
              <span className="text-cyan font-semibold drop-shadow-[0_0_5px_rgba(0,238,255,0.8)]">
                1.2 MB (WebP)
              </span>
            </div>
          </div>

          {/* =============================== */}
          {/* 3. SLIDER HANDLE (Pemisah Tengah) */}
          {/* =============================== */}
          <div
            className="absolute top-0 bottom-0 w-[2px] bg-cyan shadow-[0_0_15px_rgba(0,238,255,0.8)] z-20 transition-transform duration-75"
            style={{ left: `${pct}%`, transform: "translateX(-50%)" }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center bg-abyss/80 backdrop-blur-md border-2 border-cyan shadow-[0_0_20px_rgba(0,238,255,0.6)]">
              <ChevronsLeftRight size={20} className="text-cyan" />
            </div>
          </div>
        </div>

        {/* Data Poin Akhir */}
        <div className="mt-10 md:mt-14 text-center">
          <span className="font-display font-extrabold text-5xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan to-blue drop-shadow-[0_0_25px_rgba(0,238,255,0.2)]">
            Lebih Kecil 92%
          </span>
          <p className="text-muted mt-3 text-base md:text-lg font-light">
            tanpa penurunan kualitas visual yang kasatmata.
          </p>
        </div>
      </motion.div>
    </section>
  );
}