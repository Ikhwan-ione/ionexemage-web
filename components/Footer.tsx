"use client";

import { motion, Variants } from "framer-motion"; // 1. FIX: Import Variants
import { Briefcase, Mail } from "lucide-react"; // Hapus import Github dari sini

// 2. FIX: Gunakan SVG kustom yang 100% aman dan konsisten dengan Hero.tsx
function GithubIcon({ size = 19 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .5C5.65.5.5 5.67.5 12.03c0 5.1 3.29 9.42 7.86 10.95.58.1.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.55-3.88-1.55-.52-1.34-1.28-1.7-1.28-1.7-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.2 1.77 1.2 1.03 1.78 2.7 1.27 3.36.97.1-.75.4-1.27.73-1.56-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18a10.9 10.9 0 0 1 5.8 0c2.2-1.5 3.17-1.18 3.17-1.18.64 1.6.24 2.77.12 3.06.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.4-5.25 5.68.41.36.78 1.08.78 2.17 0 1.57-.01 2.83-.01 3.22 0 .31.21.67.8.56A10.97 10.97 0 0 0 23.5 12c0-6.35-5.15-11.5-11.5-11.5Z" />
    </svg>
  );
}

const footerNav = [
  { name: "Fitur", href: "#features" },
  { name: "Cara Kerja", href: "#how" },
  { name: "Kompresi", href: "#compare" },
];

// 3. FIX: Tambahkan tipe : Variants pada objek animasi
const containerVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.8, 
      ease: [0.16, 1, 0.3, 1], 
      staggerChildren: 0.1 
    } 
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } 
  },
};

export default function Footer() {
  const handleEmailClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const user = "hello";
    const domain = "ionexe.my.id";
    window.location.href = `mailto:${user}@${domain}`;
  };
  return (
    <motion.footer 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
      className="relative z-10 bg-abyss/80 backdrop-blur-xl border-t border-cyan/10 pt-16 pb-10 px-6 md:px-10 overflow-hidden"
    >
      <div className="absolute inset-0 noise-grid opacity-10 z-[-1]" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-x-12 gap-y-10 items-start">
        
        {/* KOLOM 1: BRAND & DESKRIPSI */}
        <motion.div variants={itemVariants} className="flex flex-col gap-4">
          <div className="flex items-center gap-2.5 group cursor-default">
            <img 
              src="/app_logo.webp" 
              alt="IONEXEMAGE Logo" 
              className="w-7 h-7 object-contain drop-shadow-[0_0_8px_rgba(0,238,255,0.3)]"
            />
            <span className="font-display font-semibold tracking-tight text-[15px] text-white">
              IONEX<span className="text-cyan drop-shadow-[0_0_8px_rgba(0,238,255,0.4)]">E</span>MAGE
            </span>
          </div>
          <p className="text-sm text-muted/80 max-w-sm leading-relaxed font-light">
            Kompresor Gambar Desktop Tercepat. <span className="text-white/80 font-medium">Murni Secara Lokal</span>, 100% Offline, Tanpa Telemetri.
          </p>
        </motion.div>

        {/* KOLOM 2: NAVIGASI CEPAT */}
        <motion.div variants={itemVariants} className="md:border-l md:border-edge/50 md:pl-12 flex flex-col gap-4">
          <h4 className="text-sm font-semibold tracking-wide text-white/90 uppercase font-mono">Navigasi</h4>
          <nav aria-label="Footer Quick Links" className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm text-muted">
            {footerNav.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="relative block hover:text-cyan transition-all duration-300 group"
              >
                {link.name}
                <span className="absolute bottom-[-2px] left-0 w-0 h-[1px] bg-cyan/80 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>
        </motion.div>

        {/* KOLOM 3: CONNECT */}
        <motion.div variants={itemVariants} className="flex flex-col gap-5 items-start md:items-end md:text-right">
          <h4 className="text-sm font-semibold tracking-wide text-white/90 uppercase font-mono">Hubungkan</h4>
          <div className="flex items-center gap-5 text-muted">
            {/* FIX: Panggil GithubIcon di sini */}
            <a href="https://github.com/Ikhwan-ione/ionexemage" target="_blank" rel="noreferrer" aria-label="GitHub Repository" className="hover:text-cyan hover:drop-shadow-[0_0_8px_rgba(0,238,255,0.6)] transition-all duration-300">
              <GithubIcon size={19} />
            </a>
            <a href="https://ionexe.my.id" aria-label="Developer Portfolio" className="hover:text-cyan hover:drop-shadow-[0_0_8px_rgba(0,238,255,0.6)] transition-all duration-300">
              <Briefcase size={19} />
            </a>
            <a href="#" onClick={handleEmailClick} aria-label="Email Developer" className="hover:text-cyan hover:drop-shadow-[0_0_8px_rgba(0,238,255,0.6)] transition-all duration-300">
              <Mail size={19} />
            </a>
          </div>
        </motion.div>
      </div>

      {/* FOOTER BOTTOM BAR */}
      <motion.div variants={itemVariants} className="max-w-7xl mx-auto mt-12 pt-6 border-t border-edge/30 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-muted/60">
        <p>&copy; 2026 IONEXEMAGE. <span className="text-violet/60">MIT License.</span> Developed by Ikhwan.</p>
        
        <div className="flex items-center gap-2 border border-cyan/20 bg-surface/30 px-3 py-1 rounded-full">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan/60 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan"></span>
          </span>
          <span className="text-cyan/80">System Status: Online</span>
        </div>
      </motion.div>
    </motion.footer>
  );
}