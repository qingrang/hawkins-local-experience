"use client";

import { useState } from "react";
import styles from "./HeroSection.module.css";

export default function HeroSection({ onEnter }: { onEnter: () => void }) {
  const [leaving, setLeaving] = useState(false);

  const handleEnter = () => {
    if (leaving) return;
    setLeaving(true);
    setTimeout(() => onEnter(), 800);
  };

  return (
    <section id="chapter-1" className={`${styles.scene} ${leaving ? styles.leaving : ""}`}>
      <div className={styles.bg} aria-hidden />
      <div className={styles.vignette} aria-hidden />
      <div className={styles.vhsTop} aria-hidden>
        <span className={styles.tc}>SP 0:00:00:00</span>
        <span className={styles.rec}><i /> REC</span>
      </div>
      <div className={`${styles.lights} ${styles.lightsTL}`} aria-hidden>
        {Array.from({ length: 6 }).map((_, i) => (
          <span key={i} className={styles.bulb} />
        ))}
      </div>
      <div className={`${styles.lights} ${styles.lightsBR}`} aria-hidden>
        {Array.from({ length: 6 }).map((_, i) => (
          <span key={i} className={styles.bulb} />
        ))}
      </div>
      <div className={styles.reelTL} aria-hidden><div className={styles.reelInner} /></div>
      <div className={styles.reelBR} aria-hidden><div className={styles.reelInner} /></div>
      <div className={styles.label}>
        <p className={styles.labelTop}>
          <span>VIDEO CASSETTE</span>
          <span>Hi-Fi STEREO</span>
        </p>
        <h1 className={styles.title}>
          STRANGER<br />THINGS
        </h1>
        <p className={styles.labelBottom}>
          <span>VOL. 1</span>
          <span>1983 · HAWKINS, IN</span>
        </p>
        <p className={styles.tagline}>
          A boy. A girl with a shaved head. A town with secrets.
        </p>
      </div>
      <button type="button" className={styles.playBtn} onClick={handleEnter} aria-label="播放">
        <span className={styles.playIcon} aria-hidden />
        <span>PLAY</span>
      </button>
    </section>
  );
}
