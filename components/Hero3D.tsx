"use client";

import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Edges } from "@react-three/drei";
import * as THREE from "three";

/**
 * Komponen Garis Scanner yang bergerak maju mundur
 */
function ScannerLine() {
  const lineRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!lineRef.current) return;
    lineRef.current.position.y = Math.sin(state.clock.elapsedTime * 3) * 1.5;
  });

  return (
    <mesh ref={lineRef} position={[0, 0, 0]}>
      <boxGeometry args={[4.5, 0.08, 0.08]} />
      {/* toneMapped={false} membuat warna menolak menjadi redup */}
      <meshBasicMaterial color="#00EEFF" toneMapped={false} />
    </mesh>
  );
}

/**
 * Komponen Utama: Tumpukan Layer Kompresi
 */
function CompressionStack({ isMobile }: { isMobile: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const scale = isMobile ? 0.7 : 1.1; // Ukuran diperbesar sedikit

  // Referensi untuk menyimpan posisi mouse global
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Membaca pergerakan mouse dari SELURUH JENDELA, bukan cuma dari kanvas
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame(() => {
    if (!groupRef.current) return;
    
    // Mouse Parallax Effect dari mouse global
    const targetRotX = (mouse.current.y * Math.PI) / 8;
    const targetRotY = (mouse.current.x * Math.PI) / 8;
    
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX + 0.6, 0.05);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY - 0.4, 0.05);
    
    // Rotasi idle (melayang santai)
    groupRef.current.rotation.z += 0.0005;
  });

  return (
    <group ref={groupRef} scale={scale} position={[isMobile ? 0 : 2, 0, 0]}>
      
      {/* 1. LAYER ATAS: RAW IMAGE (Besar & Berat) */}
      <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.8} position={[0, 2, 0]}>
        <mesh>
          <planeGeometry args={[5, 3.5]} />
          {/* AdditiveBlending membuat warna saling bertambah terang saat menumpuk */}
          <meshBasicMaterial color="#4B5CFF" wireframe transparent opacity={0.6} toneMapped={false} blending={THREE.AdditiveBlending} />
        </mesh>
        <mesh>
          <planeGeometry args={[5, 3.5]} />
          <meshBasicMaterial color="#070A1A" transparent opacity={0.8} />
          <Edges color="#4B5CFF" opacity={0.8} transparent />
        </mesh>
      </Float>

      {/* 2. LAYER TENGAH: PROCESSING CORE */}
      <Float speed={2} rotationIntensity={0.15} floatIntensity={1.2} position={[0, 0, 0]}>
        <mesh>
          <planeGeometry args={[4, 2.8]} />
          <meshBasicMaterial color="#0b1029" transparent opacity={0.9} />
          {/* Garis pinggir Neon Cyan yang jauh lebih tebal dan terang */}
          <Edges color="#00EEFF" scale={1.0} threshold={15} />
        </mesh>
        <ScannerLine />
      </Float>

      {/* 3. LAYER BAWAH: OPTIMIZED WEBP (Kecil, Padat, Terang benderang) */}
      <Float speed={2.5} rotationIntensity={0.2} floatIntensity={1.5} position={[0, -2, 0]}>
        {/* Inti layer solid */}
        <mesh>
          <planeGeometry args={[3, 2.1]} />
          <meshBasicMaterial color="#00EEFF" transparent opacity={0.4} toneMapped={false} blending={THREE.AdditiveBlending} />
          <Edges color="#00EEFF" scale={1.05} />
        </mesh>
        {/* Glow tambahan di belakangnya */}
        <mesh position={[0, 0, -0.05]}>
          <planeGeometry args={[3.2, 2.3]} />
          <meshBasicMaterial color="#00EEFF" transparent opacity={0.15} toneMapped={false} blending={THREE.AdditiveBlending} />
        </mesh>
      </Float>

    </group>
  );
}

function Scene() {
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQueryMobile = window.matchMedia("(max-width: 767px)");
    setIsMobile(mediaQueryMobile.matches);

    const mediaQueryMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQueryMotion.matches);

    const handleMobileChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    const handleMotionChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);

    mediaQueryMobile.addEventListener("change", handleMobileChange);
    mediaQueryMotion.addEventListener("change", handleMotionChange);

    return () => {
      mediaQueryMobile.removeEventListener("change", handleMobileChange);
      mediaQueryMotion.removeEventListener("change", handleMotionChange);
    };
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0, 8.5], fov: 60 }} 
      dpr={isMobile ? 1 : [1, 2]}
      gl={{ alpha: true, antialias: true }}
      frameloop={prefersReducedMotion ? "demand" : "always"}
    >
      <CompressionStack isMobile={isMobile} />
    </Canvas>
  );
}

export default function Hero3D() {
  return (
    <div className="w-full h-full opacity-100">
      <Scene />
    </div>
  );
}