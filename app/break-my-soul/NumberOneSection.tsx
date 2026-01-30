"use client";

import { useEffect } from "react";

function hexToRgb(hex: string) {
  const bigint = parseInt(hex.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return { r, g, b };
}

function rgbToHex(r: number, g: number, b: number) {
  return `#${((1 << 24) + (r << 16) + (g << 8) + b)
    .toString(16)
    .slice(1)
    .toUpperCase()}`;
}

function generateIntermediateColors(hex1: string, hex2: string, steps: number) {
  const array = [];
  const color1 = hexToRgb(hex1);
  const color2 = hexToRgb(hex2);

  for (let i = 1; i <= steps; i++) {
    const r = Math.round(color1.r + ((color2.r - color1.r) * i) / (steps + 1));
    const g = Math.round(color1.g + ((color2.g - color1.g) * i) / (steps + 1));
    const b = Math.round(color1.b + ((color2.b - color1.b) * i) / (steps + 1));

    array.push(rgbToHex(r, g, b));
  }

  return array;
}

function easeInQuad(t: number) {
  return t * t;
}

export default function NumberOneSection() {
  useEffect(() => {
    const hex2 = window
      .getComputedStyle(document.body)
      .getPropertyValue("--hex2");
    const section2Colors = generateIntermediateColors(hex2, "#000000", 6);
    const section2 = document.querySelector(".no1") as HTMLElement;
    const bg = document.querySelector(".bg") as HTMLElement;

    if (!section2 || !bg) return;

    section2Colors.forEach((item, i) => {
      const newBg = bg.cloneNode(true) as HTMLElement;
      newBg.innerHTML = "";
      newBg.style.background = item;
      newBg.style.zIndex = `${section2Colors.length - i}`;
      section2.appendChild(newBg);
    });
    bg.style.zIndex = `${section2Colors.length + 1}`;

    function animateSection() {
      const container = document.querySelector(".no1") as HTMLElement;
      if (!container) return;

      const containerHeight = container.getBoundingClientRect().height;
      const offset = 0;
      const path = container.getBoundingClientRect().top - offset;
      const end = containerHeight - offset;
      const bgs = document.querySelectorAll(".bg");
      const angle = window
        .getComputedStyle(document.body)
        .getPropertyValue("--angle");

      if (path >= 0) {
        for (let i = 0; i < bgs.length; i++) {
          (bgs[i] as HTMLElement).style.transform = `translateX(0) ${angle}`;
        }
      }
      if (path < 0 && path > -end) {
        const progress = path / -end;
        const ease = easeInQuad(progress);
        for (let i = 0; i < bgs.length; i++) {
          (bgs[i] as HTMLElement).style.transform = `translateX(${
            ease * (-100 * (bgs.length - i))
          }%) ${angle}`;
        }
      }
    }

    function handleScroll() {
      if (typeof handleScroll.throttled === "undefined") {
        handleScroll.throttled = false;
      }
      if (!handleScroll.throttled) {
        handleScroll.throttled = true;
        requestAnimationFrame(() => {
          animateSection();
          handleScroll.throttled = false;
        });
      }
    }

    handleScroll.throttled = false;

    animateSection();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <section className="no1">
      <div className="bg">
        <div className="dsdsf">
          <div className="dsdsfdfs">
            <p className="text-balance">
              The first single of the album, Break My Soul is the quintessential
              nu-disco earworm to jam to, as evidenced by its #1 peak on the Hot
              100.
            </p>
            <img src="https://www.singmastering.com/wp-content/uploads/2023/08/Beyonce-BREAK-MY-SOULD-Cover.jpg" />
          </div>
        </div>
      </div>
    </section>
  );
}
