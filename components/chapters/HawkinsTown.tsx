"use client";

import styles from "./HawkinsTown.module.css";

const LOCATIONS = [
  "Hawkins High School",
  "Starcourt Mall",
  "Castle Byers",
  "Hawkins National Laboratory",
  "Byers House",
  "Wheelers House",
];

export default function HawkinsTown() {
  return (
    <section id="chapter-2" className={styles.section}>
      <div className={styles.bg} aria-hidden />
      <div className={styles.vignette} aria-hidden />
      <div className={styles.content}>
        <p className={styles.label}>02</p>
        <h2 className={styles.title}>Hawkins, Indiana</h2>
        <p className={styles.subtitle}>
          1980 年代的印第安纳小镇。表面上平静无事，
          但森林里、实验室地下、以及那些孩子们的客厅里，有些东西正在发酵。
        </p>
        <ul className={styles.locationList}>
          {LOCATIONS.map((loc) => (
            <li key={loc} className={styles.locationItem}>{loc}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
