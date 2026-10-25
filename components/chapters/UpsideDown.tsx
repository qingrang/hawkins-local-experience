"use client";

import { useEffect, useRef } from "react";
import styles from "./UpsideDown.module.css";

interface Spore { x: number; y: number; vx: number; vy: number; size: number; opacity: number; pulse: number; }

export default function UpsideDown() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    const W = () => canvas.getBoundingClientRect().width;
    const H = () => canvas.getBoundingClientRect().height;

    const isMobile = window.innerWidth < 768;
    const count = isMobile ? 80 : 300;
    const spores: Spore[] = [];
    for (let i = 0; i < count; i++) {
      spores.push({
        x: Math.random() * W(), y: Math.random() * H(),
        vx: (Math.random() - 0.5) * 0.2,
        vy: -0.1 - Math.random() * 0.3,
        size: 0.5 + Math.random() * 1.8,
        opacity: 0.2 + Math.random() * 0.5,
        pulse: Math.random() * Math.PI * 2,
      });
    }

    let raf = 0;
    const tick = () => {
      ctx.clearRect(0, 0, W(), H());
      for (const s of spores) {
        s.x += s.vx; s.y += s.vy; s.pulse += 0.02;
        if (s.y < -5) { s.y = H() + 5; s.x = Math.random() * W(); }
        if (s.x < -5) s.x = W() + 5;
        if (s.x > W() + 5) s.x = -5;
        const a = s.opacity * (0.7 + Math.sin(s.pulse) * 0.3);
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(180,220,200, ${a})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section id="chapter-6" className={styles.section}>
      <canvas ref={canvasRef} className={styles.canvas} />
      <div className={styles.treeline} aria-hidden>
        <svg viewBox="0 0 1200 300" preserveAspectRatio="none">
          <path d="M0,300 L0,200 Q100,180 150,200 L180,150 L200,200 Q250,190 300,210 L350,140 L370,210 Q420,200 480,220 L520,180 L540,220 Q600,210 660,230 L700,160 L720,230 Q780,220 840,240 L880,190 L900,240 Q960,230 1020,250 L1060,170 L1080,250 Q1140,240 1200,260 L1200,300 Z" fill="#0a1a12" />
        </svg>
      </div>
      <div className={styles.content}>
        <p className={styles.label}>06</p>
        <h2 className={`${styles.title} ${styles.upsideDown}`}>颠倒世界</h2>
        <p className={styles.subtitle}>
          另一个维度。空气潮湿，孢子漂浮，树木枯萎。声音从四面八方传来，却听不清方向。
        </p>
      </div>
    </section>
  );
}
