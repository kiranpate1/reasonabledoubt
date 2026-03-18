"use client";

import HeroSection from "../components/HeroSection";
import TitleHeader from "../components/TitleHeader";
import ScrollGallery from "../components/ScrollGallery";
import Footer from "../components/Footer";
import Cd from "@/components/Cd";

export default function Home() {
  return (
    <main className="relative w-screen flex flex-col row-start-2 items-center sm:items-start text-white">
      <HeroSection />
      <div className="fixed top-0 left-0 w-screen h-screen overflow-hidden">
        <Cd size={500} />
      </div>
      <TitleHeader />
      <ScrollGallery />
      <Footer />
      <div className="absolute left-0 bottom-0 w-full h-screen pointer-events-none -z-[1]">
        <div className="absolute top-1/2 left-0 w-full h-px -translate-y-[300px] bg-white/20"></div>
        <div className="absolute bottom-1/2 left-0 w-full h-px translate-y-[300px] bg-white/20"></div>
        <div className="absolute top-0 left-1/2 w-px h-full translate-x-[300px] bg-white/20"></div>
        <div className="absolute top-0 right-1/2 w-px h-full -translate-x-[300px] bg-white/20"></div>
        {}
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/15"
            style={{
              width: `${600 - i * 10}px`,
              height: `${600 - i * 10}px`,
            }}
          ></div>
        ))}
      </div>
    </main>
  );
}
