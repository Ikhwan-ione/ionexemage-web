"use client";

import { useEffect, useRef } from "react";

interface Particle {
  t: number;
  speed: number;
}

interface FlowPath {
  isLeft: boolean;
  startY: number;
  particles: Particle[];
}

interface Explosion {
  x: number;
  y: number;
  radius: number;
  life: number;
}

interface GatewayFlowProps {
  /** Multiplier on number of flow paths. 1 = default, 0.5 = sparser. */
  density?: number;
  /** Let clicks/taps spawn a ripple that pushes nearby particles away. */
  interactive?: boolean;
}

export default function GatewayFlow({
  density = 1,
  interactive = true,
}: GatewayFlowProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isMobile = window.innerWidth < 768;

    let animationFrameId: number | null = null;
    let isVisible = true;
    let width = 0;
    let height = 0;

    const BG_COLOR = "#070A1A";
    const LINE_RGB = "0, 238, 255"; // cyan, faint guide lines
    const PARTICLE_RGB = "0, 238, 255"; // cyan traveling particles

    let paths: FlowPath[] = [];
    let explosions: Explosion[] = [];

    const numPaths = Math.max(
      8,
      Math.round((isMobile ? 36 : 80) * density)
    );

    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.parentElement?.clientWidth ?? window.innerWidth;
      height = canvas.parentElement?.clientHeight ?? window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      initPaths();
    };

    const initPaths = () => {
      paths = [];
      for (let i = 0; i < numPaths; i++) {
        paths.push({
          isLeft: i % 2 === 0,
          startY: (i / numPaths) * height * 1.4 - height * 0.2,
          particles: [
            {
              t: Math.random(),
              speed: 0.0015 + Math.random() * 0.002,
            },
          ],
        });
      }
    };

    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      explosions.push({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        radius: 0,
        life: 1,
      });
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    if (interactive) {
      canvas.addEventListener("click", handleClick);
    }

    function getBezierPoint(
      t: number,
      p0: { x: number; y: number },
      p1: { x: number; y: number },
      p2: { x: number; y: number },
      p3: { x: number; y: number }
    ) {
      const u = 1 - t;
      return {
        x:
          u ** 3 * p0.x +
          3 * u ** 2 * t * p1.x +
          3 * u * t ** 2 * p2.x +
          t ** 3 * p3.x,
        y:
          u ** 3 * p0.y +
          3 * u ** 2 * t * p1.y +
          3 * u * t ** 2 * p2.y +
          t ** 3 * p3.y,
      };
    }

    const drawStaticFrame = () => {
      ctx.fillStyle = BG_COLOR;
      ctx.fillRect(0, 0, width, height);
    };

    const render = () => {
      if (!isVisible) {
        animationFrameId = null;
        return;
      }

      ctx.fillStyle = BG_COLOR;
      ctx.fillRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;

      explosions.forEach((exp) => {
        exp.radius += 15;
        exp.life -= 0.015;
      });
      explosions = explosions.filter((exp) => exp.life > 0);

      paths.forEach((path) => {
        const p0 = { x: path.isLeft ? 0 : width, y: path.startY };
        const p1 = {
          x: path.isLeft ? centerX * 0.5 : width - centerX * 0.5,
          y: path.startY,
        };
        const p2 = {
          x: path.isLeft ? centerX * 0.8 : width - centerX * 0.8,
          y: centerY,
        };
        const p3 = { x: centerX, y: centerY };

        ctx.beginPath();
        ctx.moveTo(p0.x, p0.y);
        ctx.bezierCurveTo(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y);
        ctx.strokeStyle = `rgba(${LINE_RGB}, 0.12)`;
        ctx.lineWidth = 1;
        ctx.setLineDash([1, 4]);
        ctx.stroke();
        ctx.setLineDash([]);

        path.particles.forEach((p) => {
          p.t += p.speed;
          if (p.t > 1) {
            p.t = 0;
            path.startY += (Math.random() - 0.5) * 10;
          }

          const pos = getBezierPoint(p.t, p0, p1, p2, p3);

          let dxTotal = 0;
          let dyTotal = 0;
          explosions.forEach((exp) => {
            const dx = pos.x - exp.x;
            const dy = pos.y - exp.y;
            const dist = Math.hypot(dx, dy);
            if (dist < exp.radius + 120 && dist > exp.radius - 120 && dist > 0) {
              const force =
                (1 - Math.abs(dist - exp.radius) / 120) * exp.life;
              dxTotal += (dx / dist) * force * 80;
              dyTotal += (dy / dist) * force * 80;
            }
          });

          const drawX = pos.x + dxTotal;
          const drawY = pos.y + dyTotal;

          ctx.fillStyle = `rgba(${PARTICLE_RGB}, 0.8)`;
          ctx.shadowColor = `rgba(${PARTICLE_RGB}, 0.6)`;
          ctx.shadowBlur = 4;
          ctx.fillRect(drawX - 1.5, drawY - 1.5, 3, 3);
          ctx.shadowBlur = 0;
        });
      });

      animationFrameId = requestAnimationFrame(render);
    };

    const startLoop = () => {
      if (animationFrameId === null) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && !reduceMotion) startLoop();
      },
      { threshold: 0 }
    );
    observer.observe(canvas);

    if (reduceMotion) {
      drawStaticFrame();
    } else {
      startLoop();
    }

    return () => {
      observer.disconnect();
      if (animationFrameId !== null) cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      if (interactive) canvas.removeEventListener("click", handleClick);
    };
  }, [density, interactive]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full block cursor-pointer"
      aria-hidden="true"
    />
  );
}