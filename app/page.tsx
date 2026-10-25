"use client";

import { useState } from "react";
import LoadingSequence from "@/components/chapters/LoadingSequence";
import HeroSection from "@/components/chapters/HeroSection";
import HawkinsTown from "@/components/chapters/HawkinsTown";
import CharacterGallery from "@/components/chapters/CharacterGallery";
import MonstersArchive from "@/components/chapters/MonstersArchive";
import LabRift from "@/components/chapters/LabRift";
import UpsideDown from "@/components/chapters/UpsideDown";
import EndingChapter from "@/components/chapters/EndingChapter";

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && <LoadingSequence onComplete={() => setLoaded(true)} />}
      <main>
        <HeroSection onEnter={() => {}} />
        <HawkinsTown />
        <CharacterGallery />
        <MonstersArchive />
        <LabRift />
        <UpsideDown />
        <EndingChapter />
      </main>
    </>
  );
}
