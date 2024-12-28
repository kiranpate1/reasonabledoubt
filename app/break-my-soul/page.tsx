"use client";

import React, { use } from "react";
import "../globals.css";
import "./style.css";
import { useEffect } from "react";

declare global {
  interface Window {
    adjacentTimeouts: NodeJS.Timeout[];
  }
}

const BreakMySoul: React.FC = () => {
  useEffect(() => {
    //setup
    function setup() {
      const hex1 = window
        .getComputedStyle(document.body)
        .getPropertyValue("--hex1");
      const hex2 = window
        .getComputedStyle(document.body)
        .getPropertyValue("--hex2");
      const section1Colors = generateIntermediateColors(hex1, hex2, 6);

      const images = document.querySelector(".images") as HTMLElement;
      const image1 = document.getElementById("image-1") as HTMLElement;
      const image2 = document.getElementById("image-2") as HTMLElement;

      images.innerHTML = "";
      const newImage1 = image1.cloneNode(true) as HTMLElement;
      newImage1.style.width = "100%";
      (newImage1.querySelector(".info") as HTMLElement).style.opacity = "1";
      images.appendChild(newImage1);

      section1Colors.forEach((item, i) => {
        const halfwayPoint = section1Colors.length / 2;

        if (i < halfwayPoint) {
          const newImage = image1.cloneNode(true) as HTMLElement;
          const mask = document.createElement("div") as HTMLElement;
          mask.classList.add("overlay");
          mask.style.background = item;
          newImage.appendChild(mask);
          newImage.style.width = `0%`;
          newImage.style.background = item;
          (newImage.querySelector("img") as HTMLElement).style.mixBlendMode =
            "overlay";
          images.appendChild(newImage);
        } else {
          const newImage = image2.cloneNode(true) as HTMLElement;
          const mask = document.createElement("div") as HTMLElement;
          mask.classList.add("overlay");
          mask.style.background = item;
          newImage.appendChild(mask);
          newImage.style.width = "0%";
          newImage.style.background = item;
          (newImage.querySelector("img") as HTMLElement).style.mixBlendMode =
            "overlay";
          images.appendChild(newImage);
        }
      });

      const newImage2 = image2.cloneNode(true) as HTMLElement;
      newImage2.style.width = "0%";
      (newImage2.querySelector(".info") as HTMLElement).style.opacity = "1";
      images.appendChild(newImage2);

      const section2Colors = generateIntermediateColors(hex2, "#000000", 6);
      const section2 = document.querySelector(".no1") as HTMLElement;
      const bg = document.querySelector(".bg") as HTMLElement;

      section2Colors.forEach((item, i) => {
        const newBg = bg.cloneNode(true) as HTMLElement;
        newBg.innerHTML = "";
        newBg.style.background = item;
        newBg.style.zIndex = `${section2Colors.length - i}`;
        section2.appendChild(newBg);
      });
      bg.style.zIndex = `${section2Colors.length + 1}`;
    }

    //color stuff

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

    function generateIntermediateColors(
      hex1: string,
      hex2: string,
      steps: number
    ) {
      const array = [];
      const color1 = hexToRgb(hex1);
      const color2 = hexToRgb(hex2);

      for (let i = 1; i <= steps; i++) {
        const r = Math.round(
          color1.r + ((color2.r - color1.r) * i) / (steps + 1)
        );
        const g = Math.round(
          color1.g + ((color2.g - color1.g) * i) / (steps + 1)
        );
        const b = Math.round(
          color1.b + ((color2.b - color1.b) * i) / (steps + 1)
        );

        array.push(rgbToHex(r, g, b));
      }

      return array;
    }

    //animate
    function handleAnimateIntroResize() {
      handleAnimateIntroScroll();
    }

    function handleAnimateIntroScroll() {
      if (typeof handleAnimateIntroScroll.throttled === "undefined") {
        handleAnimateIntroScroll.throttled = false;
      }
      if (!handleAnimateIntroScroll.throttled) {
        handleAnimateIntroScroll.throttled = true;
        requestAnimationFrame(() => {
          animateIntro();
          handleAnimateIntroScroll.throttled = false;
        });
      }
    }

    handleAnimateIntroScroll.throttled = false;

    function animateIntro() {
      section1();
      function section1() {
        var container = document.querySelector(".intro") as HTMLElement;
        var containerHeight = container.getBoundingClientRect().height;
        const path =
          container.getBoundingClientRect().top - containerHeight * 0.1;
        const limit = containerHeight * 0.6;
        const progress = Math.max(0, Math.min(-path / limit, 1));
        // const ease = easeOutQuad(progress)
        const buttons = document.querySelectorAll("button");
        const allImages = document.querySelectorAll(".images > *");

        allImages.forEach((item, i) => {
          const image = item as HTMLElement;
          const ratio = Math.max(
            0,
            Math.min(
              1,
              (-path - (limit * 1 * i) / allImages.length) / (limit * 0.5)
            )
          );
          const adjRatio = easeTiles(ratio);
          image.style.zIndex = `${i}`;

          if (i > 0) {
            if (progress <= 0.2) {
              image.style.width = `0%`;
            } else {
              image.style.width = `${adjRatio * 100}%`;
            }
          }
        });
      }

      section2();
      function section2() {
        var container = document.querySelector(".no1") as HTMLElement;
        var containerHeight = container.getBoundingClientRect().height;
        //const offset = window.innerHeight * 0.4;
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
          var progress = path / -end;
          var ease = easeInQuad(progress);
          for (let i = 0; i < bgs.length; i++) {
            (bgs[i] as HTMLElement).style.transform = `translateX(${
              ease * (-100 * (bgs.length - i))
            }%) ${angle}`;
          }
        }
        if (path <= -end) {
        }
      }
    }

    //easing
    function easeTiles(t: number) {
      t /= 0.5;
      if (t < 1) return 0.5 * Math.pow(t, 5);
      t -= 2;
      return 0.5 * (Math.pow(t, 5) + 2);
    }

    function easeInQuad(t: number) {
      return t * t;
    }

    //listeners
    setup();
    animateIntro();
    window.addEventListener("scroll", handleAnimateIntroScroll);
    window.addEventListener("resize", handleAnimateIntroResize, {
      passive: true,
    });
  }, []);
  return (
    <main>
      <section className="intro">
        <div className="images">
          <div id="image-1">
            <div className="info">
              <h1>6.BREAK MY SOUL</h1>
            </div>
            <img src="https://beyonceonline.org/gallery/albums/photoshoots/2022/Renaissance/hq08.jpg" />
          </div>
          <div id="image-2">
            <div className="info">
              <h1>Welcome to the disco</h1>
            </div>
            <img src="https://beyonceonline.org/gallery/albums/photoshoots/2022/Renaissance/hq09.jpg" />
          </div>
        </div>
      </section>
      <section className="no1">
        <div className="bg">
          <div className="dsdsf">
            <div className="dsdsfdfs">
              <p>
                The first single of the album, Break My Soul is the
                quintessential nu-disco earworm to jam to, as evidenced by its
                #1 peak on the Hot 100.
              </p>
              <img src="https://www.singmastering.com/wp-content/uploads/2023/08/Beyonce-BREAK-MY-SOULD-Cover.jpg" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default BreakMySoul;
