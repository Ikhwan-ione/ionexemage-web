"use client";

import { motion, Variants } from "framer-motion";
import { ShieldCheck, Download, Trash2, Code2 } from "lucide-react";

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } 
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

export default function TrustAndCta() {
  return (
    <section id="download" className="relative py-24 md:py-32 px-6 md:px-10 text-center overflow-hidden">
      
      {/* Background Glow Effect untuk menarik fokus ke CTA */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[800px] h-[600px] bg-cyan/10 blur-[100px] rounded-full pointer-events-none z-0" />
      
      {/* Grid Overlay untuk tekstur */}
      <div className="absolute inset-0 noise-grid opacity-30 z-0 pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto">
        
        {/* ========================================= */}
        {/* 1. BAGIAN TRUST / KEAMANAN (Level Up!)    */}
        {/* ========================================= */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-20"
        >
          {/* Badge 1 */}
          <motion.div variants={fadeUpVariants} className="glass rounded-2xl px-6 py-5 flex flex-col items-center gap-3 border border-cyan/10 hover:border-cyan/30 transition-colors">
            <div className="w-12 h-12 rounded-full flex items-center justify-center bg-cyan/10 border border-cyan/20 text-cyan shadow-[0_0_15px_rgba(0,238,255,0.15)]">
              <ShieldCheck size={24} />
            </div>
            <h4 className="font-display font-semibold text-white">100% Bebas Malware</h4>
            <p className="text-xs text-muted leading-relaxed">
              Kode transparan dan dapat diaudit. Tidak ada perangkat lunak pihak ketiga yang disisipkan.
            </p>
          </motion.div>

          {/* Badge 2 (Pesan Asli Anda Dipertahankan & Diperbagus) */}
          <motion.div variants={fadeUpVariants} className="glass rounded-2xl px-6 py-5 flex flex-col items-center gap-3 border border-blue/10 hover:border-blue/30 transition-colors">
            <div className="w-12 h-12 rounded-full flex items-center justify-center bg-blue/10 border border-blue/20 text-blue shadow-[0_0_15px_rgba(75,92,255,0.15)]">
              <Trash2 size={24} />
            </div>
            <h4 className="font-display font-semibold text-white">Recycle Bin Aman</h4>
            <p className="text-xs text-muted leading-relaxed">
              File asli tidak dihapus permanen, melainkan dipindahkan otomatis ke Recycle Bin Windows.
            </p>
          </motion.div>

          {/* Badge 3 */}
          <motion.div variants={fadeUpVariants} className="glass rounded-2xl px-6 py-5 flex flex-col items-center gap-3 border border-violet/10 hover:border-violet/30 transition-colors">
            <div className="w-12 h-12 rounded-full flex items-center justify-center bg-violet/10 border border-violet/20 text-violet shadow-[0_0_15px_rgba(139,107,255,0.15)]">
              <Code2 size={24} />
            </div>
            <h4 className="font-display font-semibold text-white">Open Source</h4>
            <p className="text-xs text-muted leading-relaxed">
              Dikembangkan oleh komunitas, untuk komunitas. Bebas digunakan untuk selamanya.
            </p>
          </motion.div>
        </motion.div>


        {/* ========================================= */}
        {/* 2. BAGIAN CALL TO ACTION (CTA) UTAMA      */}
        {/* ========================================= */}
        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          <h2 className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl tracking-tight mb-6">
            Tingkatkan <span className="grad-text filter drop-shadow-[0_0_15px_rgba(0,238,255,0.3)]">Performa Websitemu</span> Hari Ini!
          </h2>
          <p className="text-muted text-base md:text-lg mb-10 max-w-xl mx-auto font-light">
            Ayo join dengan alur kerja modern. Ringan, super cepat, dan sepenuhnya gratis.
          </p>

          <div className="flex flex-col items-center gap-4">
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href="https://github.com/Ikhwan-ione/ionexemage/releases"
              target="_blank"
              rel="noreferrer"
              className="animate-pulse-glow inline-flex items-center justify-center gap-3 px-10 py-5 rounded-2xl font-semibold text-base md:text-lg bg-[#0B1029] border border-cyan text-white shadow-[0_0_30px_rgba(0,238,255,0.25)] hover:shadow-[0_0_40px_rgba(0,238,255,0.4)] transition-shadow duration-300 w-full sm:w-auto"
            >
              <Download size={22} className="text-cyan" />
              Unduh Gratis untuk Windows
            </motion.a>
            
            <div className="flex items-center gap-3 text-xs font-mono text-muted/70 mt-2">
              <span>v1.0.0</span>
              <span className="w-1 h-1 rounded-full bg-cyan/50" />
              <span>Windows 10/11</span>
              <span className="w-1 h-1 rounded-full bg-cyan/50" />
              <span>64-bit Architecture</span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}