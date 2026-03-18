"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import LoadingBar from "./LoadingBar";
import { projects } from "../app/projects";

const MAX_WIDTH = 20;
const SCROLL_HEIGHT = 400;
const IMAGE_HEIGHT = 200;

export default function ScrollGallery({}: {}) {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  useEffect(() => {
    const syllables = document.querySelectorAll(
      ".syllable",
    ) as NodeListOf<HTMLElement>;
    const syllableWidth = "4vw";
    const scrollImages = document.getElementById("scrollImages") as HTMLElement;
    const images = document.querySelectorAll(
      "#scrollImages > div",
    ) as NodeListOf<HTMLElement>;
    const lines = document.querySelectorAll(
      "#scrollLines > div",
    ) as NodeListOf<HTMLElement>;
    const arrows = document.querySelectorAll(
      ".arrow",
    ) as NodeListOf<HTMLElement>;
    let totalWidth = window.innerWidth;
    let isHovering = false;

    //animate
    function handleImageResize() {
      totalWidth = window.innerWidth;
      handleImageScroll();
    }

    function handleImageScroll() {
      if (typeof handleImageScroll.throttled === "undefined") {
        handleImageScroll.throttled = false;
      }
      if (!handleImageScroll.throttled) {
        handleImageScroll.throttled = true;
        requestAnimationFrame(() => {
          handleScroll();
          handleImageScroll.throttled = false;
        });
      }
    }

    handleImageScroll.throttled = false;

    function handleScroll() {
      if (isHovering) return;

      const scrollTrack = document.getElementById("scrollTrack") as HTMLElement;
      if (!scrollTrack) return;

      //section-1
      if (window.scrollY < scrollTrack.offsetTop) {
        const scrollProgress = Math.min(
          window.scrollY / scrollTrack.offsetTop,
          1,
        );
        for (let i = 0; i < projects.length; i++) {
          const image = images[i] as HTMLElement;
          const imageImg = images[i].querySelector("img") as HTMLElement;
          image.style.transitionDelay = `${
            (projects.length - i + 1) * 0.0125
          }s`;
          imageImg.style.transitionDelay = `${
            (projects.length - i + 1) * 0.0125
          }s`;
        }
        animateImages(-3 + 3 * easeOutQuad(scrollProgress));
        scrollImages.style.transform = `translateY(${
          IMAGE_HEIGHT - easeInQuad(scrollProgress) * IMAGE_HEIGHT
        }px)`;
      }

      //section-2
      else if (
        window.scrollY >= scrollTrack.offsetTop &&
        window.scrollY <
          scrollTrack.offsetTop + scrollTrack.scrollHeight - window.innerHeight
      ) {
        const scrollPercentage =
          (window.scrollY - scrollTrack.offsetTop) /
          (scrollTrack.scrollHeight - window.innerHeight);
        for (let i = 0; i < projects.length; i++) {
          const image = images[i] as HTMLElement;
          const imageImg = images[i].querySelector("img") as HTMLElement;
          image.style.transitionDelay = `${i * 0.0125}s`;
          image.style.backgroundColor = "#000";
          imageImg.style.transitionDelay = `${i * 0.0125}s`;
          imageImg.style.opacity = "1";
          image.style.transform = `translate3d(0,0,0) skewX(0deg)`;
          imageImg.style.transform = `translate3d(0,0,0) skewX(0deg)`;
        }
        animateImages(easeImageScroll(scrollPercentage));
        scrollImages.style.transform = `translateY(0)`;
        scrollImages.style.filter = `brightness(1)`;
        scrollImages.style.opacity = "1";
      }

      //section-3
      else if (
        window.scrollY >=
        scrollTrack.offsetTop + scrollTrack.scrollHeight - window.innerHeight
      ) {
        const scrollProgress = Math.min(
          (window.scrollY -
            (scrollTrack.offsetTop +
              scrollTrack.scrollHeight -
              window.innerHeight)) /
            (document.body.scrollHeight -
              (scrollTrack.offsetTop +
                scrollTrack.scrollHeight -
                window.innerHeight) -
              window.innerHeight * 1.25),
          1,
        );

        for (let i = 0; i < projects.length; i++) {
          const image = images[i] as HTMLElement;
          const imageImg = image.querySelector("img") as HTMLElement;
          image.style.transitionDelay = `${i * 0.0125}s`;
          image.style.backgroundColor = "#000";
          imageImg.style.transitionDelay = `${i * 0.0125}s`;
          imageImg.style.opacity = "1";
        }
        animateImages(1 + scrollProgress);
        scrollImages.style.transform = `translateY(0)`;
        scrollImages.style.filter = `brightness(${1 + scrollProgress * 10})`;
        scrollImages.style.opacity = `${
          1 - easeOutQuad(easeOutQuad(scrollProgress)) * 0.85
        }`;
      }
    }

    function animateImages(input: number) {
      let remainingWidth = totalWidth;
      const widths = generateNumbers(input).finalWeights;
      const maxWeightIndex = generateNumbers(input).maxWeightIndex;

      for (let i = 0; i < projects.length; i++) {
        setActiveIndex(maxWeightIndex);
        const image = images[i] as HTMLElement;
        const imageImg = image.querySelector("img") as HTMLElement;
        const activeImg = images[maxWeightIndex].querySelector(
          "img",
        ) as HTMLElement;
        const activeArrow = arrows[maxWeightIndex] as HTMLElement;
        const scrollLine = lines[i] as HTMLElement;
        const width = widths[i];
        image.style.width = `${width}vw`;
        image.style.height = `${width * 10}px`;
        image.style.zIndex = `${Math.round(width)}`;
        // imageImg.style.transform = `scale(${1 + width / 100}) translate3d(0,0,0)`;
        imageImg.style.filter = `saturate(0.2) brightness(${Math.pow(
          width / MAX_WIDTH,
          0.75,
        )})`;
        activeImg.style.filter = `saturate(1) brightness(1)`;
        arrows[i].style.opacity = "0";
        arrows[i].style.transform = "rotateZ(-90deg)";
        activeArrow.style.opacity = "1";
        activeArrow.style.transform = "rotateZ(0deg)";
        scrollLine.style.width = `${width}vw`;

        remainingWidth -= width;
      }
    }

    function generateNumbers(percentage: number, maxWeight = MAX_WIDTH) {
      const totalSum = 100; // The target total sum
      const numberOfElements = projects.length; // Total elements in the array
      const midPoint = percentage * (numberOfElements - 1); // The "center" based on the percentage

      // Calculate preliminary weights based on proximity to the midpoint
      const rawWeights = Array.from({ length: numberOfElements }, (_, i) => {
        const distance = Math.abs(i - midPoint);
        return 1 / (distance + 1); // Closer indices have higher weights
      });

      // Normalize preliminary weights to get their relative contributions
      const rawWeightSum = rawWeights.reduce((sum, weight) => sum + weight, 0);
      const normalizedWeights = rawWeights.map(
        (weight) => weight / rawWeightSum,
      );

      // Apply the max weight constraint
      const scaledWeights = normalizedWeights.map((weight) =>
        Math.min(weight * totalSum, maxWeight),
      );
      const scaledWeightSum = scaledWeights.reduce(
        (sum, weight) => sum + weight,
        0,
      );

      // Redistribute excess/remaining weight proportionally
      const redistributionFactor =
        (totalSum - scaledWeightSum) / scaledWeightSum;
      const finalWeights = scaledWeights.map(
        (weight) => weight + weight * redistributionFactor,
      );

      const maxWeightIndex = scaledWeights.indexOf(Math.max(...scaledWeights));

      return { finalWeights, maxWeightIndex };
    }

    //easing
    function easeImageScroll(t: number) {
      const p0 = 0.25,
        p1 = 0,
        p2 = 0.75,
        p3 = 1;
      const u = 1 - t;
      return 3 * u * u * t * p0 + 3 * u * t * t * p2 + t * t * t * p3;
    }

    function easeInQuad(t: number) {
      return t * t;
    }

    function easeOutQuad(t: number) {
      return t * (2 - t);
    }

    //listeners
    // Initial scroll handling with delay to ensure scroll position is restored
    const initialScrollTimer = setTimeout(() => {
      handleScroll();
    }, 0);

    window.addEventListener("scroll", handleImageScroll);
    window.addEventListener("resize", handleImageResize, {
      passive: true,
    });

    return () => {
      clearTimeout(initialScrollTimer);
      window.removeEventListener("scroll", handleImageScroll);
      window.removeEventListener("resize", handleImageResize);
    };
  }, []);

  return (
    <section
      id="scrollTrack"
      className="relative w-screen z-1 pointer-events-none"
      style={{ height: `${SCROLL_HEIGHT}vh` }}
    >
      <div className="relative z-10 pointer-events-none flex h-0 w-screen items-start">
        <div
          className="relative w-screen top-[-100vh]"
          style={{ height: `${SCROLL_HEIGHT + 100}vh` }}
        >
          <div className="absolute w-screen bottom-px left-0 h-[199px]"></div>
          <div className="sticky top-0 w-screen min-h-screen flex items-start overflow-hidden">
            <div
              id="scrollImages"
              className="absolute w-screen bottom-0 left-0 flex flex-row items-end gap-[0px] pointer-events-auto origin-bottom"
              style={{ transform: `translateY(${IMAGE_HEIGHT}px)` }}
            >
              {projects.map((track, i) => (
                <div
                  key={i}
                  className="relative origin-left"
                  style={{
                    height: `${IMAGE_HEIGHT}px`,
                    transform: "translate3d(0,0,0)",
                    transition: "background-color 0.6s ease",
                  }}
                >
                  <Image
                    className="relative w-full object-cover h-full origin-[50%_100%]"
                    src={track.src}
                    width={IMAGE_HEIGHT}
                    height={IMAGE_HEIGHT}
                    alt={track.name}
                    style={{
                      transition: "opacity 0.6s ease",
                      transform: "translate3d(0,0,0)",
                    }}
                  />
                  <div className="absolute top-0 -left-[100vw] w-[200vw] h-px bg-white/15"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div
        id="scrollLines"
        className="absolute w-screen h-full left-0 flex flex-row gap-[0px] bg-black pointer-events-auto overflow-hidden border-t border-t-white/15"
        style={{
          bottom: `0px`,
          height: `calc(${SCROLL_HEIGHT - 100}vh + ${IMAGE_HEIGHT}px)`,
        }}
      >
        {projects.map((track, index) => (
          <div
            key={index}
            className="relative h-full"
            style={{
              borderLeft: "0.5px solid rgba(255,255,255,0.15)",
              borderRight: "0.5px solid rgba(255,255,255,0.15)",
            }}
          >
            <div
              className="relative w-full h-[calc(100%-220px)] grid"
              style={{
                gridTemplateRows: `repeat(${projects.length}, 1fr)`,
              }}
            >
              <a
                className="whitespace-nowrap self-center"
                key={index}
                href={`/${track.name
                  .toLowerCase()
                  .replace(/ /g, "-")
                  .replace(/'/g, "")}`}
                style={{ gridArea: `${index + 1} / 1 / span 1 / span 1` }}
              >
                {track.name} <br />{" "}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="arrow opacity-0 duration-200 -rotate-90"
                >
                  <path
                    d="M2 8H14M14 8L9.5 3.5M14 8L9.5 12.5"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </a>
            </div>
          </div>
        ))}
      </div>
      <div
        className="absolute z-100 w-screen h-full left-0"
        style={{
          bottom: `0px`,
          height: `calc(${SCROLL_HEIGHT - 100}vh + ${IMAGE_HEIGHT}px + 180px)`,
        }}
      >
        <div className="sticky top-0 left-0 z-0 flex justify-stretch gap-0">
          <h1
            style={{
              textShadow:
                "1px 1px 0 #fff, -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff",
              color: "black",
            }}
          >
            REASONABLE
            <br />
            DOUBT
          </h1>
        </div>
        <div className="absolute z-1 top-0 left-0 w-full h-[180px] bg-black border-t border-b border-white flex justify-between">
          <h2>Est.</h2>
          <h2>1996</h2>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 h-[1px] w-screen bg-[rgba(255,255,255,0.15)]"></div>
    </section>
  );
}
