"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./MonstersArchive.module.css";

gsap.registerPlugin(ScrollTrigger);

const MONSTERS = [
  { id: "demogorgon", nameEn: "DEMOGORGON", nameZh: "德莫高根", danger: 5, firstSeen: "S1E1", feature: "人面花形怪物，以血液为猎食信号。在颠倒世界与现实之间穿梭，偏好猎食儿童。" },
  { id: "mind-flayer", nameEn: "MIND FLAYER", nameZh: "夺心魔", danger: 5, firstSeen: "S2", feature: "巨型蜘蛛形影子生物，颠倒世界的主宰。通过寄生与意识渗透控制人类。" },
  { id: "demodogs", nameEn: "DEMODOGS", nameZh: "魔王犬", danger: 3, firstSeen: "S2", feature: "犬形群居生物，嗅觉灵敏，成群行动。是夺心魔的地面猎手。" },
  { id: "vecna", nameEn: "VECNA", nameZh: "维克纳", danger: 5, firstSeen: "S4", feature: "人形怪物，通过心理创伤制造幻觉并取走受害者。与霍金斯实验室有深层渊源。" },
];

export default function MonstersArchive() {
  const sectionRef = useRef<HTMLElement>(null);
  const [now, setNow] = useState("");
  const [selected, setSelected] = useState<typeof MONSTERS[number] | null>(null);

  useEffect(() => {
    setNow(new Date().toLocaleTimeString("zh-CN", { hour12: false }));
    const t = setInterval(() => {
      setNow(new Date().toLocaleTimeString("zh-CN", { hour12: false }));
    }, 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const blocks = sectionRef.current?.querySelectorAll(`.${styles.monsterBlock}`);
      blocks?.forEach((block) => {
        gsap.fromTo(block, { opacity: 0.4 }, {
          opacity: 1, duration: 0.3,
          scrollTrigger: { trigger: block, start: "top 60%", toggleActions: "play none none reverse" },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="chapter-4" ref={sectionRef} className={styles.section}>
      <div className={styles.hud}>
        <div className={styles.hudLeft}>
          <span className={styles.recDot} />
          <span className={styles.recText}>REC</span>
          <span className={styles.timestamp}>{now}</span>
        </div>
        <div className={styles.hudRight}>
          <span className={styles.signal}>SIGNAL 87%</span>
          <span className={styles.camId}>CAM-04</span>
        </div>
      </div>
      <div className={styles.header}>
        <p className={styles.label}>04</p>
        <h2 className={styles.title}>怪物档案</h2>
        <p className={styles.subtitle}>霍金斯实验室监控录像归档。浏览需授权。</p>
      </div>
      {MONSTERS.map((m) => (
        <article key={m.id} className={styles.monsterBlock} onClick={() => setSelected(m)}>
          <div className={styles.monsterInfo}>
            <p className={styles.monsterEn}>{m.nameEn}</p>
            <h3 className={styles.monsterZh}>{m.nameZh}</h3>
            <div className={styles.metaRow}>
              <span className={styles.firstSeen}>首次出现：{m.firstSeen}</span>
              <span className={styles.danger}>
                危险等级
                <span className={styles.dangerMeter}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className={`${styles.dangerBar} ${i < m.danger ? styles.dangerBarOn : ""}`} />
                  ))}
                </span>
              </span>
            </div>
            <p className={styles.feature}>{m.feature}</p>
            <p className={styles.viewFile}>查看档案</p>
          </div>
          <div className={styles.monsterSilhouette} aria-hidden>
            <div className={styles.silhouetteShape} />
          </div>
        </article>
      ))}
      {selected && (
        <div className={styles.overlay} onClick={() => setSelected(null)}>
          <div className={styles.overlayContent} onClick={(e) => e.stopPropagation()}>
            <p className={styles.overlayTitle}>{selected.nameEn} / {selected.nameZh}</p>
            <p className={styles.overlayBody}>完整档案将在后续版本开放。</p>
            <button className={styles.overlayClose} onClick={() => setSelected(null)}>关闭</button>
          </div>
        </div>
      )}
    </section>
  );
}
