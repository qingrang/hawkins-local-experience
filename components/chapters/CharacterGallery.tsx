"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./CharacterGallery.module.css";
import castData from "../../public/cache/data/cast.json";

gsap.registerPlugin(ScrollTrigger);

const IDENTITY_MAP: Record<string, string> = {
  "Eleven / Jane Hopper": "拥有超能力的女孩",
  "Mike Wheeler": "小组的智囊",
  "Dustin Henderson": "好奇心旺盛的话痨",
  "Lucas Sinclair": "团队的射手",
  "Will Byers": "颠倒世界的幸存者",
  "Max Mayfield": "滑板女孩",
  "Joyce Byers": "威尔的母亲",
  "Jim Hopper": "霍金斯警长",
  "Nancy Wheeler": "迈克的姐姐",
  "Jonathan Byers": "威尔的哥哥",
  "Steve Harrington": "冰淇淋店伙计",
  "Robin Buckley": "史蒂夫的同事",
};

interface CastMember {
  id: number;
  name: string;
  original_name: string;
  character: string;
  local_image: string | null;
}

const CHARACTERS = (castData as CastMember[]).slice(0, 8);

export default function CharacterGallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      if (!cardListRef.current) return;
      const list = cardListRef.current;
      const tween = gsap.to(list, {
        x: () => -(list.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${list.scrollWidth - window.innerWidth}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });
      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });
    return () => mm.revert();
  }, []);

  return (
    <section id="chapter-3" ref={sectionRef} className={styles.section}>
      <div className={styles.header}>
        <p className={styles.label}>03</p>
        <h2 className={styles.title}>The Kids</h2>
      </div>
      <div ref={cardListRef} className={styles.cardList}>
        {CHARACTERS.map((c) => (
          <div key={c.id} className={styles.card}>
            {c.local_image && (
              <img src={c.local_image} alt={c.character} className={styles.photo} loading="lazy" />
            )}
            <div className={styles.info}>
              <p className={styles.charName}>{c.character}</p>
              <p className={styles.charActor}>{c.name} · {c.original_name}</p>
              <p className={styles.charIdentity}>{IDENTITY_MAP[c.character] || ""}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
