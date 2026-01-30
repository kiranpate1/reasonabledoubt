"use client";

import React from "react";
import "../globals.css";
import "./style.css";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import IntroSection from "./IntroSection";
import NumberOneSection from "./NumberOneSection";

const BreakMySoul: React.FC = () => {
  return (
    <main>
      <Nav />
      <IntroSection />
      <NumberOneSection />
      <Footer />
    </main>
  );
};

export default BreakMySoul;
