"use client";

import { useState } from "react";
import styles from "./EndingChapter.module.css";

export default function EndingChapter() {
  const [showArcade, setShowArcade] = useState(false);
  const [showArchive, setShowArchive] = useState(false);

  return (
    <section id="chapter-7" className={styles.section}>
      <div className={styles.content}>
        <p className={styles.label}>07</p>
        <h2 className={styles.title}>Hawkins 恢复信号</h2>
        <p className={styles.subtitle}>
          扭曲世界的裂缝正在闭合。小镇灯光重新亮起，孩子们回到了餐桌旁。
          但有些东西，永远不一样了。
        </p>
        <div className={styles.entryGrid}>
          <button className={styles.entryCard} onClick={() => setShowArcade(true)}>
            <p className={styles.entryTitle}>街机厅</p>
            <p className={styles.entryHint}>Beat the Demogorgon</p>
          </button>
          <button className={styles.entryCard} onClick={() => setShowArchive(true)}>
            <p className={styles.entryTitle}>档案库</p>
            <p className={styles.entryHint}>完整剧集百科</p>
          </button>
        </div>
        <p className={styles.easterEggs}>
          已发现彩蛋 <span className={styles.eggCount}>0</span> / 6
        </p>
      </div>
      {showArcade && (
        <div className={styles.overlay} onClick={() => setShowArcade(false)}>
          <div className={styles.overlayContent} onClick={(e) => e.stopPropagation()}>
            <p className={styles.overlayTitle}>ARCADE</p>
            <p className={styles.overlayBody}>极简打 Demogorgon 小游戏将在后续版本接入。</p>
            <button className={styles.overlayClose} onClick={() => setShowArcade(false)}>返回</button>
          </div>
        </div>
      )}
      {showArchive && (
        <div className={styles.overlay} onClick={() => setShowArchive(false)}>
          <div className={styles.overlayContent} onClick={(e) => e.stopPropagation()}>
            <p className={styles.overlayTitle}>档案库</p>
            <p className={styles.overlayBody}>完整剧集百科将在后续版本开放。</p>
            <button className={styles.overlayClose} onClick={() => setShowArchive(false)}>返回</button>
          </div>
        </div>
      )}
    </section>
  );
}
