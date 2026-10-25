"use client";

import { useEffect, useState } from "react";
import styles from "./LoadingSequence.module.css";

export default function LoadingSequence({ onComplete }: { onComplete: () => void }) {
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setFading(true), 1500);
    const t2 = setTimeout(() => onComplete(), 2200);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onComplete]);

  return (
    <div className={`${styles.wrap} ${fading ? styles.fadeOut : ""}`}>
      <p className={styles.text}>STRANGER THINGS</p>
    </div>
  );
}
