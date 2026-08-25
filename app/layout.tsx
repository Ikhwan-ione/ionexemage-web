import type { Metadata } from "next";
import { Sora, Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "IONEXEMAGE | Pangkas Ukuran Gambar, Bukan Kualitasnya.",
  description:
    "Kompresor gambar desktop tercepat dan zero-config untuk Windows. Drag, drop, dan optimasi puluhan foto ke WebP dalam hitungan detik. 100% berjalan lokal tanpa internet.",
  applicationName: "IONEXEMAGE",
  authors: [{ name: "Ikhwan ione", url: "https://github.com/Ikhwan-ione/ionexemage" }],
  keywords: [
    "image compressor",
    "kompresor gambar windows",
    "webp converter",
    "heic to webp",
    "offline image optimizer",
    "bulk image compression",
    "zero-config tool",
    "ionexemage",
  ],
  openGraph: {
    title: "IONEXEMAGE | Pangkas Ukuran Gambar, Bukan Kualitasnya.",
    description:
      "Kompresor gambar desktop tercepat untuk Windows. Optimasi puluhan foto ke WebP secara instan dan 100% offline.",
    url: "https://ionexemage.vercel.app", // Ganti dengan domain asli jika sudah di-deploy
    siteName: "IONEXEMAGE",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "/og-image.webp", // Pastikan file ini ada di folder public
        width: 1200,
        height: 630,
        alt: "Tampilan Aplikasi IONEXEMAGE",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "IONEXEMAGE | Kompresor Gambar Desktop Tercepat",
    description:
      "Optimasi puluhan foto ke WebP dalam hitungan detik. 100% offline, gratis, dan open-source.",
    images: ["/og-image.webp"],
  },
};

// FIX: Menggunakan Readonly dan React.ReactNode standar Next.js
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${sora.variable} ${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-body bg-abyss text-white overflow-x-hidden selection:bg-cyan/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}