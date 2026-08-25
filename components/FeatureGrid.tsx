"use client";

import dynamic from "next/dynamic";
import { motion, Variants } from "framer-motion";
import { Zap, Maximize2, Layers, ShieldCheck } from "lucide-react";

// ==========================================
// OPTIMASI PERFORMA: Lazy Load Library 3D
// ==========================================
// Kita memuat SVG3D secara dinamis dan mematikan Server-Side Rendering (ssr: false)
// Ini akan membuat skor Lighthouse Anda tetap hijau (95-100) karena file JS 3D
// tidak akan memblokir proses rendering awal (First Contentful Paint).
const SVG3D = dynamic(
  () => import("3dsvg").then((mod) => mod.SVG3D),
  { ssr: false, loading: () => <div className="w-full h-full flex items-center justify-center text-cyan/50 text-xs animate-pulse font-mono">Memuat Modul 3D...</div> }
);

// ==========================================
// RAW SVG STRING (Aman dari kegagalan load file)
// ==========================================
const mySvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg"
     width="1124" height="1303"
     viewBox="0 0 1124 1303">
  <title>App Logo Vector</title>
  <desc>White vector glyph traced from the supplied logo image, with a transparent background.</desc>
  <g fill="#FFFFFF" fill-rule="evenodd" clip-rule="evenodd">
    <path d="M 364 1072 L 364 1074 L 404 1111 L 437 1137 L 454 1148 L 438 1124 L 419 1091 L 404 1060 Z"/> <path d="M 415 1055 L 414 1057 L 427 1081 L 420 1055 Z"/> <path d="M 141 1016 L 141 1031 L 156 1032 L 157 1017 Z"/> <path d="M 40 1001 L 40 1031 L 71 1030 L 70 1001 Z"/> <path d="M 161 961 L 161 1007 L 208 1006 L 208 961 Z"/> <path d="M 79 937 L 77 939 L 77 988 L 129 989 L 130 939 L 125 937 Z"/> <path d="M 208 913 L 208 937 L 232 937 L 232 913 Z"/> <path d="M 95 910 L 95 923 L 107 923 L 107 910 Z"/> <path d="M 132 868 L 133 921 L 188 920 L 187 867 Z"/> <path d="M 965 741 L 895 796 L 816 848 L 739 890 L 667 926 L 575 967 L 505 995 L 386 1038 L 316 1059 L 271 1069 L 245 1073 L 214 1073 L 202 1068 L 198 1063 L 198 1054 L 208 1038 L 228 1019 L 275 987 L 249 998 L 217 1015 L 194 1030 L 179 1042 L 165 1056 L 157 1067 L 152 1080 L 153 1089 L 156 1094 L 162 1099 L 179 1104 L 218 1103 L 284 1090 L 372 1064 L 514 1016 L 632 972 L 684 950 L 702 944 L 799 901 L 846 877 L 899 846 L 910 819 L 918 791 L 949 761 Z"/> <path d="M 490 717 L 456 760 L 434 794 L 417 827 L 400 873 L 392 912 L 390 934 L 390 959 L 394 991 L 402 1025 L 413 1022 L 411 1000 L 411 973 L 413 947 L 420 905 L 430 866 L 455 796 Z"/> <path d="M 1080 689 L 1072 684 L 1061 681 L 1028 682 L 1013 685 L 984 694 L 967 701 L 938 717 L 973 705 L 1001 699 L 1019 699 L 1028 702 L 1035 709 L 1037 721 L 1035 729 L 1029 741 L 1011 765 L 976 798 L 928 834 L 877 866 L 829 893 L 796 910 L 745 933 L 729 960 L 697 1003 L 669 1034 L 622 1082 L 596 1115 L 585 1132 L 584 1129 L 592 1109 L 614 1067 L 644 1020 L 676 974 L 685 958 L 623 983 L 541 1013 L 537 1016 L 528 1040 L 520 1068 L 514 1100 L 512 1125 L 512 1149 L 516 1189 L 522 1219 L 530 1248 L 533 1254 L 559 1221 L 602 1179 L 629 1156 L 737 1072 L 793 1021 L 828 982 L 847 957 L 873 916 L 889 883 L 892 880 L 948 848 L 993 818 L 1038 782 L 1058 762 L 1077 737 L 1086 718 L 1087 700 L 1084 693 Z"/> <path d="M 988 658 L 988 674 L 1005 674 L 1005 658 Z"/> <path d="M 937 640 L 937 665 L 961 665 L 962 640 Z"/> <path d="M 1035 622 L 1034 633 L 1036 635 L 1047 635 L 1047 622 Z"/> <path d="M 918 598 L 918 615 L 936 616 L 936 598 Z"/> <path d="M 972 593 L 972 637 L 1017 637 L 1017 592 Z"/> <path d="M 1068 589 L 1068 605 L 1083 606 L 1084 589 Z"/> <path d="M 1013 552 L 1014 582 L 1044 581 L 1044 551 Z"/> <path d="M 914 514 L 914 565 L 965 566 L 967 526 L 966 514 Z"/> <path d="M 829 495 L 828 496 L 833 506 L 843 537 L 852 583 L 855 631 L 852 677 L 848 704 L 839 739 L 831 763 L 811 810 L 789 851 L 831 827 L 887 791 L 919 767 L 923 762 L 926 730 L 924 691 L 919 662 L 910 629 L 897 597 L 876 558 L 860 534 Z"/> <path d="M 532 418 L 503 449 L 473 474 L 446 494 L 356 554 L 304 595 L 270 629 L 246 659 L 235 676 L 223 699 L 215 721 L 210 747 L 210 776 L 212 788 L 219 810 L 231 831 L 229 817 L 229 791 L 234 762 L 240 744 L 248 727 L 270 693 L 293 665 L 321 636 L 385 580 L 414 558 L 451 527 L 479 500 L 494 483 L 511 460 L 522 441 Z"/> <path d="M 711 364 L 723 405 L 731 453 L 733 479 L 733 516 L 729 561 L 717 621 L 700 671 L 675 721 L 647 762 L 648 765 L 669 791 L 684 816 L 688 828 L 686 828 L 673 806 L 650 779 L 629 751 L 615 724 L 607 703 L 599 672 L 595 638 L 596 600 L 603 560 L 521 655 L 513 666 L 508 680 L 502 713 L 502 742 L 506 766 L 513 787 L 527 814 L 549 842 L 568 859 L 591 874 L 590 878 L 576 899 L 562 926 L 550 955 L 546 969 L 631 933 L 726 888 L 742 863 L 769 810 L 782 780 L 798 732 L 808 683 L 811 652 L 810 584 L 806 552 L 798 515 L 786 478 L 766 435 L 749 408 L 733 387 Z"/> <path d="M 513 35 L 514 39 L 527 61 L 535 81 L 542 104 L 545 126 L 545 148 L 542 173 L 528 216 L 509 252 L 498 269 L 474 300 L 432 346 L 329 449 L 305 475 L 270 518 L 247 551 L 220 600 L 210 624 L 199 663 L 195 691 L 195 726 L 198 749 L 201 757 L 202 737 L 206 715 L 218 677 L 238 637 L 263 600 L 286 573 L 325 535 L 369 499 L 465 429 L 490 408 L 515 384 L 541 352 L 555 329 L 567 305 L 579 275 L 580 280 L 568 318 L 561 331 L 563 350 L 563 383 L 559 414 L 551 442 L 544 460 L 528 491 L 504 524 L 465 564 L 371 645 L 335 682 L 307 717 L 290 743 L 272 778 L 262 805 L 257 823 L 252 853 L 252 891 L 258 924 L 266 946 L 284 979 L 304 1007 L 339 1046 L 387 1031 L 386 1024 L 376 994 L 369 961 L 367 942 L 367 903 L 370 877 L 376 849 L 389 809 L 400 784 L 422 745 L 452 705 L 483 672 L 531 628 L 575 584 L 599 553 L 614 528 L 631 492 L 643 458 L 654 412 L 659 374 L 660 349 L 658 308 L 651 264 L 644 237 L 633 204 L 610 154 L 586 115 L 557 78 L 530 50 Z"/>
  </g>
</svg>`;

// ==========================================
// KONFIGURASI ANIMASI BENTO GRID
// ==========================================
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  show: { 
    opacity: 1, y: 0, scale: 1, 
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } 
  },
};

const barVariants: Variants = {
  hidden: { height: "0%" },
  show: (h: number) => ({
    height: `${h}%`,
    transition: { duration: 0.8, ease: "easeOut", delay: 0.3 },
  }),
};

// ==========================================
// MAIN COMPONENT
// ==========================================
export default function FeatureGrid() {
  return (
    <section id="features" className="relative py-20 md:py-32 px-6 md:px-10 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        
        {/* HEADER SECTION */}
        <div className="mb-16 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            className="text-xs tracking-[0.25em] font-mono uppercase mb-4 text-cyan drop-shadow-[0_0_8px_rgba(0,238,255,0.4)]"
          >
            Kemampuan Utama
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: 0.05 }}
            className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl tracking-tight max-w-3xl mx-auto"
          >
            Diciptakan untuk Anda yang menangani <span className="text-white/80">ribuan gambar</span> setiap hari.
          </motion.h2>
        </div>

        {/* BENTO GRID SECTION */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 md:gap-5"
        >
          {/* 1. KOTAK UTAMA (Besar Kiri) */}
          <motion.div
            variants={cardVariants}
            className="glass rounded-3xl p-8 md:col-span-2 md:row-span-2 flex flex-col justify-between group hover:bg-surface/60 hover:border-cyan/30 transition-all duration-500 overflow-hidden relative"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-cyan/10 transition-colors duration-500" />
            
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 bg-cyan/10 border border-cyan/20 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 shadow-[0_0_15px_rgba(0,238,255,0.15)]">
                <Zap size={24} className="text-cyan drop-shadow-[0_0_5px_rgba(0,238,255,0.8)]" />
              </div>
              <h3 className="font-display font-semibold text-2xl mb-3 text-white">
                Pemrosesan Massal Tanpa Batas
              </h3>
              <p className="text-muted text-sm md:text-base leading-relaxed font-light">
                Kompres puluhan foto dalam satu klik tanpa limit. Tarik seluruh isi folder foto ke dalam folder foto_mentah dan biarkan mesin bekerja secara paralel di latar belakang tanpa memberatkan RAM Anda.
              </p>
            </div>
            
            <div className="relative z-10 mt-10 h-28 rounded-2xl border border-edge bg-abyss/40 flex items-end gap-1.5 md:gap-2 p-4">
              {[35, 55, 80, 45, 95, 60, 75].map((h, i) => (
                <motion.div
                  key={i}
                  custom={h}
                  variants={barVariants}
                  className="w-full rounded-t-sm md:rounded-t-md relative group-hover:brightness-125 transition-all duration-300"
                  style={{
                    background: `linear-gradient(180deg, ${h > 65 ? "#00EEFF" : "#4B5CFF"}, transparent)`,
                  }}
                >
                  <div className="absolute top-0 inset-x-0 h-[2px] bg-white/50 rounded-t-md" />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* 2. KOTAK MENENGAH (Kanan Atas) DENGAN LAZY LOADED 3D SVG */}
          <motion.div
            variants={cardVariants}
            className="glass rounded-3xl p-7 md:col-span-2 group hover:bg-surface/60 hover:border-blue/30 transition-all duration-500 relative overflow-hidden flex flex-col md:flex-row items-center gap-4"
          >
            <div className="flex-1 relative z-10">
              <div className="w-11 h-11 rounded-2xl flex items-center justify-center mb-5 bg-blue/10 border border-blue/20 group-hover:-translate-y-1 transition-transform duration-300 shadow-[0_0_15px_rgba(75,92,255,0.15)]">
                <Maximize2 size={22} className="text-blue drop-shadow-[0_0_5px_rgba(75,92,255,0.8)]" />
              </div>
              <h3 className="font-display font-semibold text-xl mb-2 text-white">
                Kecerdasan Auto-Resize
              </h3>
              <p className="text-muted text-sm leading-relaxed font-light">
                Secara otomatis mendeteksi dan meratakan dimensi gambar mentok di lebar maksimal 1920px. Standar emas untuk optimasi web modern.
              </p>
            </div>
            
            {/* WADAH SVG 3D DARI LIBRARY */}
            <div className="w-full md:w-[160px] h-[150px] md:h-[180px] relative z-0 flex-shrink-0 flex items-center justify-center">
              <SVG3D
                svg={mySvg}
                smoothness={0.6}
                color="#00EEFF"
                material="glass"
                metalness={0.1}
                roughness={0.05}
                opacity={0.35}
                animate="spinFloat"
              />
            </div>
          </motion.div>

          {/* 3. KOTAK KECIL 1 (Bawah Tengah) */}
          <motion.div
            variants={cardVariants}
            className="glass rounded-3xl p-7 group hover:bg-surface/60 hover:border-violet/30 transition-all duration-500"
          >
            <div className="w-11 h-11 rounded-2xl flex items-center justify-center mb-5 bg-violet/10 border border-violet/20 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_15px_rgba(139,107,255,0.15)]">
              <Layers size={22} className="text-violet drop-shadow-[0_0_5px_rgba(139,107,255,0.8)]" />
            </div>
            <h3 className="font-display font-semibold text-lg mb-2 text-white">
              Dukungan HEIC
            </h3>
            <p className="text-muted text-sm leading-relaxed font-light">
              Sistem deteksi cerdas yang mampu membaca dan mengonversi format foto eksklusif dari perangkat iOS & Apple.
            </p>
          </motion.div>

          {/* 4. KOTAK KECIL 2 (Bawah Kanan) */}
          <motion.div
            variants={cardVariants}
            className="glass rounded-3xl p-7 group hover:bg-surface/60 hover:border-cyan/30 transition-all duration-500"
          >
            <div className="w-11 h-11 rounded-2xl flex items-center justify-center mb-5 bg-cyan/10 border border-cyan/20 group-hover:-translate-y-1 transition-transform duration-300 shadow-[0_0_15px_rgba(0,238,255,0.15)]">
              <ShieldCheck size={22} className="text-cyan drop-shadow-[0_0_5px_rgba(0,238,255,0.8)]" />
            </div>
            <h3 className="font-display font-semibold text-lg mb-2 text-white">
              100% Offline & Privat
            </h3>
            <p className="text-muted text-sm leading-relaxed font-light">
              Berjalan murni secara lokal di CPU komputermu. Tidak ada peladen awan, tidak ada data yang diunggah.
            </p>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}