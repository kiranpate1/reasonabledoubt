"use client";

import { useRef } from "react";
import HeroSection from "../components/HeroSection";
import TitleHeader from "../components/TitleHeader";
import DefinitionSection from "../components/DefinitionSection";
import ScrollGallery from "../components/ScrollGallery";
import Footer from "../components/Footer";

export default function Home() {
  const typingRef = useRef<HTMLDivElement>(null);
  const pronunciationRef = useRef<HTMLDivElement>(null);

  return (
    <main className="w-screen flex flex-col row-start-2 items-center sm:items-start text-white">
      <HeroSection />
      <TitleHeader />
      <DefinitionSection
        typingRef={typingRef}
        pronunciationRef={pronunciationRef}
      />
      <ScrollGallery
        typingRef={typingRef}
        pronunciationRef={pronunciationRef}
      />
      <Footer />
    </main>
  );
}
