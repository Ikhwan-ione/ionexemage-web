"use client";

import dynamic from "next/dynamic";
// 1. Tambahkan impor Variant atau TargetAndTransition
import { motion, Variants, TargetAndTransition } from "framer-motion";
import { Download, ChevronRight } from "lucide-react";

// Hero3D uses WebGL / window, so it must only render on the client.
const Hero3D = dynamic(() => import("./Hero3D"), { 
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-abyss animate-pulse" />
});

function GithubIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .5C5.65.5.5 5.67.5 12.03c0 5.1 3.29 9.42 7.86 10.95.58.1.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.55-3.88-1.55-.52-1.34-1.28-1.7-1.28-1.7-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.2 1.77 1.2 1.03 1.78 2.7 1.27 3.36.97.1-.75.4-1.27.73-1.56-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18a10.9 10.9 0 0 1 5.8 0c2.2-1.5 3.17-1.18 3.17-1.18.64 1.6.24 2.77.12 3.06.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.4-5.25 5.68.41.36.78 1.08.78 2.17 0 1.57-.01 2.83-.01 3.22 0 .31.21.67.8.56A10.97 10.97 0 0 0 23.5 12c0-6.35-5.15-11.5-11.5-11.5Z" />
    </svg>
  );
}

// Custom Easing bergaya Apple (Smooth & Snappy)
const customEasing = [0.16, 1, 0.3, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  // 2. Beri tipe ': TargetAndTransition' pada nilai kembalian fungsi dinamis
  show: (i: number): TargetAndTransition => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { 
      duration: 0.8, 
      delay: i * 0.1, 
      ease: customEasing 
    },
  }),
};

export default function Hero() {
  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden selection:bg-cyan/30 selection:text-white">
      {/* 3D Background Layer */}
      <div className="absolute inset-0 z-0 opacity-90 mix-blend-screen">
        <Hero3D />
      </div>

      {/* Noise Texture & Vignette Overlay untuk kedalaman */}
      <div className="absolute inset-0 noise-grid pointer-events-none z-[1]" />
      <div
        className="absolute inset-0 pointer-events-none z-[2]"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(7,10,26,0.3) 0%, rgba(7,10,26,0.95) 80%), linear-gradient(180deg, rgba(7,10,26,0.1) 0%, #070A1A 100%)",
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-10 pt-46 pb-24 text-center">

        {/* Headline */}
        <motion.h1
          custom={1}
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="font-display font-extrabold tracking-tight text-5xl sm:text-6xl md:text-7xl lg:text-[5rem] leading-[1.1] mb-6"
        >
          <span className="text-white drop-shadow-md">Pangkas Ukurannya,</span>
          <br />
          <span className="grad-text filter drop-shadow-[0_0_20px_rgba(0,238,255,0.2)]">Bukan Kualitasnya.</span>
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          custom={2}
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="text-muted text-base md:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed font-light mb-10"
        >
          Kompresor gambar desktop tercepat dan <span className="text-white/80 font-medium">zero-config</span> untuk Windows. Copy, paste, dan optimasi puluhan foto ke WebP dalam hitungan detik.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          custom={3}
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="flex flex-col sm:flex-row items-center justify-center gap-5"
        >
          <motion.a
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href="#download"
            className="w-full sm:w-auto px-8 py-4 rounded-xl btn-primary font-semibold text-sm md:text-base flex items-center justify-center gap-2 group animate-pulse-glow"
          >
            <Download size={20} className="group-hover:-translate-y-0.5 transition-transform duration-300" />
            Unduh untuk Windows
          </motion.a>
          
          <motion.a
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href="https://github.com/Ikhwan-ione/ionexemage"
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto px-8 py-4 rounded-xl btn-ghost font-medium text-sm md:text-base flex items-center justify-center gap-2 group glass"
          >
            <GithubIcon size={20} />
            Lihat di GitHub
            <ChevronRight size={16} className="opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
          </motion.a>
        </motion.div>

        {/* Trust & Security Notes */}
        <motion.div
          custom={4}
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="mt-12 flex items-center justify-center gap-3 text-xs md:text-sm text-muted/60 font-mono"
        >
          <div className="flex items-center gap-1.5">
            <div className="w-1 h-1 rounded-full bg-violet"></div>
            <span>Instalasi Cepat</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-1 h-1 rounded-full bg-violet"></div>
            <span>Tanpa Telemetri</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-1 h-1 rounded-full bg-violet"></div>
            <span>100% Offline</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}