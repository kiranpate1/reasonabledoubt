"use client";

import React from "react";
import "../globals.css";
import "./style.css";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import IntroSection from "./IntroSection";
import NumberOneSection from "./NumberOneSection";
import PaletteSwipeSection from "./PaletteSwipeSection";

const BreakMySoul: React.FC = () => {
  return (
    <main>
      <Nav />
      <IntroSection />
      <PaletteSwipeSection />
      <NumberOneSection />
      <Footer />
    </main>
  );
};

export default BreakMySoul;
