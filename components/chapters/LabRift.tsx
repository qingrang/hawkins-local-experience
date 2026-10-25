"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./LabRift.module.css";

gsap.registerPlugin(ScrollTrigger);

interface Particle { x: number; y: number; vx: number; vy: number; life: number; maxLife: number; size: number; }

export default function LabRift() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

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

    const particles: Particle[] = [];
    const isMobile = window.innerWidth < 768;
    const spawnRate = isMobile ? 2 : 6;

    let raf = 0;
    const W = () => canvas.getBoundingClientRect().width;
    const H = () => canvas.getBoundingClientRect().height;

    const spawn = () => {
      for (let i = 0; i < spawnRate; i++) {
        const cx = W() / 2 + (Math.random() - 0.5) * 20;
        particles.push({
          x: cx, y: Math.random() * H(),
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 0.5 - 0.3,
          life: 0, maxLife: 120 + Math.random() * 80,
          size: 1 + Math.random() * 2.5,
        });
      }
    };

    const tick = () => {
      ctx.clearRect(0, 0, W(), H());
      spawn();
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx; p.y += p.vy; p.vy += 0.01; p.life++;
        const alpha = 1 - p.life / p.maxLife;
        if (alpha <= 0) { particles.splice(i, 1); continue; }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(226,59,46, ${alpha * 0.8})`;
        ctx.shadowColor = "#e23b2e";
        ctx.shadowBlur = 8;
        ctx.fill();
      }
      ctx.shadowBlur = 0;
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!wrapRef.current) return;
      gsap.fromTo(wrapRef.current, { x: 0 }, {
        x: 8, ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "center center",
          onEnter: () => {
            gsap.to(wrapRef.current, {
              keyframes: [
                { x: -6, duration: 0.05 }, { x: 6, duration: 0.05 },
                { x: -4, duration: 0.05 }, { x: 4, duration: 0.05 },
                { x: 0, duration: 0.1 },
              ],
            });
          },
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="chapter-5" ref={sectionRef} className={styles.section}>
      <div ref={wrapRef} className={styles.wrap}>
        <div className={styles.warningBar}>
          <span className={styles.warningText}>⚠ WARNING: UNCLASSIFIED BREACH · LEVEL 5</span>
        </div>
        <div className={styles.content}>
          <p className={styles.label}>05</p>
          <h2 className={styles.title}>实验室与裂缝</h2>
          <p className={styles.subtitle}>
            霍金斯地下实验室的墙壁正在裂开。红色孢子从裂缝中渗出，向现实世界蔓延。
          </p>
        </div>
        <div className={styles.riftWrap}>
          <div className={styles.rift} aria-hidden />
          <canvas ref={canvasRef} className={styles.canvas} />
        </div>
      </div>
    </section>
  );
}
