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

  return (
    <main>
      <Nav />
      <BackgroundText />
      <IntroSection />
      <ScrollGallerySection
        activeOutfit={activeOutfit}
        setActiveOutfit={setActiveOutfit}
      />
      <OutroSection />
      <Footer />
    </main>
  );
};

export default ImThatGirl;
