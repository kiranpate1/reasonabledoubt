"use client";

import Image from "next/image";
import { useEffect } from "react";
import { projects } from "../app/projects";

type Props = {
  status: string;
  message: string;
};

const Nav = () => {
  const maxWidth = 20;
  const imageHeight = 200;
  const targetArea = 48;

  useEffect(() => {
    const navContainer = document.querySelector("nav") as HTMLElement;
    const scrollImages = document.getElementById("scrollImages") as HTMLElement;
    const images = document.querySelectorAll(
      "#scrollImages > a"
    ) as NodeListOf<HTMLElement>;

    let totalWidth = window.innerWidth;
    let isHovering = false;

    function animateImages(input: number) {
      let remainingWidth = totalWidth;
      const widths = generateNumbers(input).finalWeights;
      const maxWeightIndex = generateNumbers(input).maxWeightIndex;

      for (let i = 0; i < projects.length; i++) {
        const image = images[i] as HTMLElement;
        const imageImg = image.querySelector("img") as HTMLElement;
        const activeImg = images[maxWeightIndex].querySelector(
          "img"
        ) as HTMLElement;
        const activeName = images[maxWeightIndex].querySelector(
          "#name"
        ) as HTMLElement;
        const width = widths[i];
        image.style.width = `${width}vw`;
        imageImg.style.filter = `saturate(0.2) brightness(${Math.pow(
          width / maxWidth,
          0.75
        )})`;
        activeImg.style.filter = `saturate(1) brightness(1)`;
        (image.querySelector("#name") as HTMLElement).style.opacity = "0";
        activeName.style.opacity = "1";

        remainingWidth -= width;
      }
    }

    navContainer.addEventListener("mouseenter", () => {
      isHovering = true;
      // for (let i = 0; i < projects.length; i++) {
      //   const image = images[i] as HTMLElement;
      //   image.style.transition = "width 0.3s ease";
      //   image.addEventListener(
      //     "transitionend",
      //     () => {
      //       image.style.transition = "0s";
      //     },
      //     { once: true }
      //   );
      // }

      navContainer.style.transform = `translateY(0px)`;
      navContainer.style.transitionDelay = "0.1s";
      scrollImages.style.transform = `translateY(0px)`;
      scrollImages.style.transitionDelay = "0.1s";
    });
    navContainer.addEventListener("mousemove", (event) => {
      if (!isHovering) return;
      const cursorPercentage = event.clientX / window.innerWidth;

      animateImages(easeTiles(cursorPercentage));
    });
    navContainer.addEventListener("mouseleave", () => {
      isHovering = false;

      // for (let i = 0; i < projects.length; i++) {
      //   const image = images[i] as HTMLElement;
      //   image.style.transition = "width 0.3s ease";
      //   image.addEventListener(
      //     "transitionend",
      //     () => {
      //       image.style.transition = "0s";
      //     },
      //     { once: true }
      //   );
      // }

      navContainer.style.transform = `translateY(${
        imageHeight - targetArea + 24
      }px)`;
      navContainer.style.transitionDelay = "0s";
      scrollImages.style.transform = `translateY(${targetArea}px)`;
      scrollImages.style.transitionDelay = "0s";
    });

    function generateNumbers(percentage: number, maxWeight = maxWidth) {
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
        (weight) => weight / rawWeightSum
      );

      // Apply the max weight constraint
      const scaledWeights = normalizedWeights.map((weight) =>
        Math.min(weight * totalSum, maxWeight)
      );
      const scaledWeightSum = scaledWeights.reduce(
        (sum, weight) => sum + weight,
        0
      );

      // Redistribute excess/remaining weight proportionally
      const redistributionFactor =
        (totalSum - scaledWeightSum) / scaledWeightSum;
      const finalWeights = scaledWeights.map(
        (weight) => weight + weight * redistributionFactor
      );

      const maxWeightIndex = scaledWeights.indexOf(Math.max(...scaledWeights));

      return { finalWeights, maxWeightIndex };
    }

    //easing

    function easeTiles(t: number) {
      t /= 0.5;
      if (t < 1) return 0.5 * Math.pow(t, 3);
      t -= 2;
      return 0.5 * (Math.pow(t, 3) + 1.98);
    }

    function easeInQuad(t: number) {
      return t * t;
    }

    function easeOutQuad(t: number) {
      return t * (2 - t);
    }
  }, []);

  return (
    <nav
      className="fixed w-screen bottom-0 left-0 pointer-events-auto origin-bottom overflow-hidden z-[100] duration-300 ease-in-out"
      style={{ transform: `translateY(${imageHeight - targetArea + 24}px)` }}
    >
      <svg
        className="absolute top-4 left-4"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2 8H14"
          stroke="white"
          strokeLinecap="round"
          strokeWidth="1.5"
        />
        <path
          d="M2 4H14"
          stroke="white"
          strokeLinecap="round"
          strokeWidth="1.5"
        />
        <path
          d="M2 12H14"
          stroke="white"
          strokeLinecap="round"
          strokeWidth="1.5"
        />
      </svg>
      <div
        id="scrollImages"
        className="flex flex-row gap-[0px] bg-black duration-300 ease-in-out"
        style={{ transform: `translateY(${targetArea}px)` }}
      >
        {projects.map((track, i) => (
          <a
            key={i}
            className="relative overflow-hidden origin-left cursor-pointer"
            style={{
              transform: "translate3d(0,0,0)",
              transition: "background-color 0.6s ease",
            }}
            href={track.name.toLowerCase().replace(/ /g, "-").replace(/'/g, "")}
          >
            <div className="detail h-6 w-full text-white whitespace-nowrap">
              <div id="name" className="opacity-0 duration-300">
                {i + 1}. {track.name}
              </div>
            </div>
            <Image
              className="w-full object-cover h-full origin-top"
              src={track.src}
              width={imageHeight}
              height={imageHeight}
              alt={track.name}
              style={{
                height: `${imageHeight}px`,
                transition: "opacity 0.6s ease",
                transform: "translate3d(0,0,0)",
              }}
            />
          </a>
        ))}
      </div>
    </nav>
  );
};

export default Nav;
