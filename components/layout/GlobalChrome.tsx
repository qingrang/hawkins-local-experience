"use client";

import { useEffect, useState } from "react";

const CHAPTERS = [
  { id: "chapter-0", label: "加载" },
  { id: "chapter-1", label: "首屏" },
  { id: "chapter-2", label: "Hawkins 小镇" },
  { id: "chapter-3", label: "角色群像" },
  { id: "chapter-4", label: "怪物档案" },
  { id: "chapter-5", label: "实验室与裂缝" },
  { id: "chapter-6", label: "颠倒世界" },
  { id: "chapter-7", label: "最终章" },
];

export default function GlobalChrome() {
  const [activeChapter, setActiveChapter] = useState<string>("chapter-0");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveChapter(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );
    CHAPTERS.forEach((c) => {
      const el = document.getElementById(c.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="chapter-nav" aria-label="章节导航">
      {CHAPTERS.map((c) => (
        <a
          key={c.id}
          href={`#${c.id}`}
          className={activeChapter === c.id ? "active" : ""}
          title={c.label}
          aria-label={c.label}
        />
      ))}
    </nav>
  );
}
