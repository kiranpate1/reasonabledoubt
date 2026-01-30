"use client";

import React from "react";
import "../globals.css";
import "./style.css";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import CircleSection from "./CircleSection";
import HelmutSection from "./HelmutSection";

const AlienSuperstar: React.FC = () => {
  return (
    <main style={{ height: "2000vh" }}>
      <Nav />
      <CircleSection />
      <HelmutSection />
      <Footer />
    </main>
  );
};

export default AlienSuperstar;
