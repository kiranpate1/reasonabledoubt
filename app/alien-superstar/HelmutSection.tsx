"use client";

import { useEffect } from "react";
import Image from "next/image";

function easeInOut(t: number) {
  t /= 0.5;
  if (t < 1) return 0.5 * Math.pow(t, 5);
  t -= 2;
  return 0.5 * (Math.pow(t, 5) + 2);
}

export default function HelmutSection() {
  useEffect(() => {
    const helmutImage = document.querySelector(
      ".helmut-image",
    ) as HTMLImageElement;

    if (!helmutImage) return;

    function animateHelmut() {
      const container = document.querySelector(".helmut") as HTMLElement;
      if (!container) return;

      const height = container.getBoundingClientRect().height;
      const offset = window.innerHeight * 0.6;
      const path = container.getBoundingClientRect().top - offset;
      const end = height - offset;

      let progress = 0;
      if (path >= 0) {
        progress = 0;
      } else if (path < 0 && path > -end) {
        progress = path / -end;
      } else if (path <= -end) {
        progress = 1;
      }

      const ease = easeInOut(progress);
      helmutImage.style.filter = `brightness(${progress}) contrast(${
        4 - ease * 3
      })`;
    }

    function handleScroll() {
      if (typeof handleScroll.throttled === "undefined") {
        handleScroll.throttled = false;
      }
      if (!handleScroll.throttled) {
        handleScroll.throttled = true;
        requestAnimationFrame(() => {
          animateHelmut();
          handleScroll.throttled = false;
        });
      }
    }

    handleScroll.throttled = false;

    animateHelmut();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <section className="helmut">
      <Image
        className="helmut-image"
        src="/images/alien-superstar/helmut.png"
        alt=""
        width={800}
        height={800}
        priority
      />
      <div className="unique">UNIQUE</div>
    </section>
  );
}
