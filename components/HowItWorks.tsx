"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, Variants } from "framer-motion";

// Data 4 Langkah Alur Kerja IONEXEMAGE
const steps = [
  {
    title: "Siapkan File Mentah",
    desc: "Masukkan semua foto (JPG/PNG/HEIC) yang ingin dioptimasi ke dalam folder foto_mentah. Tidak ada batasan jumlah file.",
    img: "/step1.webp",
  },
  {
    title: "Satu Klik Pemrosesan",
    desc: "Aplikasi akan otomatis membaca total file yang ada. Cukup klik tombol 'Mulai Kompresi' dan biarkan mesin bekerja secara paralel di latar belakang.",
    img: "/step2.webp",
  },
  {
    title: "Laporan & Pembersihan",
    desc: "Pantau rasio penghematan ukuran secara langsung. Sebuah pop-up cerdas akan menawarkan opsi untuk menghapus foto mentah (dipindah ke Recycle Bin) guna mengosongkan ruang disk.",
    img: "/step3.webp",
  },
  {
    title: "Akses Hasil Akhir",
    desc: "Klik tombol 'Buka Folder Output' untuk langsung menggunakan file WebP Anda yang ukurannya sudah dipangkas drastis dengan kualitas yang tetap tajam.",
    img: "/step4.webp",
  },
];

// Varian animasi untuk teks dan gambar
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } 
  }
};

function StepItem({ index, step }: { index: number; step: typeof steps[0] }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={{
        visible: { transition: { staggerChildren: 0.1 } }
      }}
      className="group flex gap-5 md:gap-8 items-start relative z-10"
    >
      {/* Timeline Node (Angka) */}
      <motion.div
        initial={{ borderColor: "rgba(160,171,204,0.25)", color: "#A0ABCC", scale: 0.9 }}
        whileInView={{
          borderColor: "#00EEFF",
          color: "#00EEFF",
          scale: 1,
          boxShadow: "0 0 20px rgba(0,238,255,0.4)",
          backgroundColor: "rgba(0, 238, 255, 0.05)"
        }}
        viewport={{ once: false, amount: 0.6 }}
        transition={{ duration: 0.5 }}
        className="shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-mono text-sm md:text-base glass border mt-1"
      >
        {String(index + 1).padStart(2, "0")}
      </motion.div>

      {/* Konten (Teks + Gambar) */}
      <div className="flex-1 pb-12 md:pb-16">
        <motion.h3 variants={itemVariants} className="font-display font-semibold text-lg md:text-xl text-white mb-2">
          {step.title}
        </motion.h3>
        <motion.p variants={itemVariants} className="font-mono text-sm md:text-base text-muted/90 mb-6 leading-relaxed">
          {step.desc}
        </motion.p>
        
        {/* Smart Image Container (Menyesuaikan segala ukuran foto dengan rapi) */}
        <motion.div 
          variants={itemVariants}
          className="relative w-full aspect-video rounded-xl md:rounded-2xl overflow-hidden border border-edge bg-abyss/60 shadow-lg group-hover:border-cyan/30 group-hover:shadow-[0_0_25px_rgba(0,238,255,0.1)] transition-all duration-500 flex items-center justify-center p-2"
        >
          {/* Efek grid tipis di belakang gambar */}
          <div className="absolute inset-0 noise-grid opacity-20 pointer-events-none" />
          
          <Image
            src={step.img}
            alt={step.title}
            fill
            className="object-contain p-2 md:p-4 drop-shadow-2xl" 
            quality={90}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Deteksi scroll untuk mengisi warna garis timeline vertikal
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.5"],
  });
  
  // Transformasi progress scroll menjadi persentase tinggi garis
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="how" className="relative py-28 md:py-36 px-6 md:px-10 overflow-hidden">
      <div className="max-w-4xl mx-auto">
        
        {/* HEADER */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            className="text-xs tracking-[0.25em] font-mono uppercase mb-4 text-cyan drop-shadow-[0_0_8px_rgba(0,238,255,0.4)]"
          >
            Alur Kerja
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: 0.05 }}
            className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl tracking-tight"
          >
            Empat Langkah. <br className="md:hidden" />
            <span className="text-white/80">Beres !</span>
          </motion.h2>
        </div>

        {/* TERMINAL WINDOW UI */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="glass rounded-2xl md:rounded-3xl overflow-hidden border border-edge shadow-2xl shadow-cyan/5"
        >
          {/* MacOS Style Window Header */}
          <div className="flex items-center gap-2 px-5 py-4 border-b border-edge bg-abyss/40">
            <div className="w-3 h-3 rounded-full bg-[#ff5f57] shadow-[0_0_5px_rgba(255,95,87,0.5)]" />
            <div className="w-3 h-3 rounded-full bg-[#febc2e] shadow-[0_0_5px_rgba(254,188,46,0.5)]" />
            <div className="w-3 h-3 rounded-full bg-[#28c840] shadow-[0_0_5px_rgba(40,200,64,0.5)]" />
            <span className="ml-3 text-xs text-muted/70 font-mono tracking-wider">
              ionexemage_v1.0.exe
            </span>
          </div>

          {/* TIMELINE CONTENT */}
          <div className="p-6 md:p-12 relative" ref={containerRef}>
            
            {/* Garis Dasar (Mati) */}
            <div className="absolute left-[43px] md:left-[71px] top-8 bottom-8 w-[2px] bg-cyan/10 rounded-full" />
            
            {/* Garis Progress Scroll (Nyala) */}
            <motion.div
              style={{ height: lineHeight }}
              className="absolute left-[43px] md:left-[71px] top-8 w-[2px] rounded-full bg-gradient-to-b from-cyan via-blue to-transparent shadow-[0_0_10px_rgba(0,238,255,0.6)]"
            />

            {/* List Langkah-langkah */}
            <div className="relative">
              {steps.map((step, i) => (
                <StepItem key={i} index={i} step={step} />
              ))}
            </div>
            
          </div>
        </motion.div>
      </div>
    </section>
  );
}