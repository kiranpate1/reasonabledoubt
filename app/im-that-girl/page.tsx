"use client";

import React, { useState } from "react";
import "../globals.css";
import "./style.css";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import BackgroundText from "./BackgroundText";
import IntroSection from "./IntroSection";
import ScrollGallerySection from "./ScrollGallerySection";
import OutroSection from "./OutroSection";

const ImThatGirl: React.FC = () => {
  const [activeOutfit, setActiveOutfit] = useState<number>(0);

  const outfits = [
    {
      brand: "Marni",
      image: "/images/im-that-girl/1.webp",
    },
    {
      brand: "DUNDAS",
      image: "/images/im-that-girl/2.webp",
    },
    {
      brand: "Mugler",
      image: "/images/im-that-girl/3.webp",
    },
    {
      brand: "Alexander McQueen",
      image: "/images/im-that-girl/4.webp",
    },
    {
      brand: "Gareth Pugh",
      image: "/images/im-that-girl/5.webp",
    },
    {
      brand: "Situationist x Yaspis",
      image: "/images/im-that-girl/6.webp",
    },
    {
      brand: "BOSS",
      image: "/images/im-that-girl/7.webp",
    },
  ];

  return (
    <main>
      <Nav />
      <BackgroundText />
      <IntroSection />
      <ScrollGallerySection
        outfits={outfits}
        activeOutfit={activeOutfit}
        setActiveOutfit={setActiveOutfit}
      />
      <OutroSection />
      <Footer />
    </main>
  );
};

export default ImThatGirl;
