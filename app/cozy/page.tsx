"use client";

import React from "react";
import "../globals.css";
import "./style.css";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import InteractivePanels from "./InteractivePanels";

const Cozy: React.FC = () => {
  return (
    <main>
      <Nav />
      <InteractivePanels />
      <Footer />
    </main>
  );
};

export default Cozy;
