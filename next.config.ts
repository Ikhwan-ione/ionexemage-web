import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // --- OPTIMASI PERFORMA ---

  images: {
    // Memprioritaskan AVIF, fallback ke WebP jika browser pengunjung jadul
    formats: ['image/avif', 'image/webp'],
    
    // Memperpanjang umur cache gambar menjadi 60 detik (defaultnya lebih singkat)
    minimumCacheTTL: 60, 
    
  },

  experimental: {
    // Memotong beban library berat agar ukuran file web jauh lebih ringan
    optimizePackageImports: ['framer-motion', 'lucide-react', 'react-icons'],
  },

  // --- KEAMANAN ---

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' }
        ],
      },
    ];
  },
};

export default nextConfig;