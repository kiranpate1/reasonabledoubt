"use client";

import Image from "next/image";
import { useEffect } from "react";
import { projects } from "../app/projects";

type Props = {
  status: string;
  message: string;
};

const Nav = () => {
  const maxWidth = 17;
  const imageHeight = 200;

  useEffect(() => {
    const scrollImages = document.getElementById("scrollImages") as HTMLElement;
    const images = document.querySelectorAll(
      "#scrollImages > div"
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
        const width = widths[i];
        image.style.width = `${width}vw`;
        imageImg.style.filter = `saturate(0.2) brightness(${Math.pow(
          width / maxWidth,
          0.75
        )})`;
        activeImg.style.filter = `saturate(1) brightness(1)`;

        remainingWidth -= width;
      }
    }

    scrollImages.addEventListener("mouseenter", () => {
      isHovering = true;
      for (let i = 0; i < projects.length; i++) {
        const image = images[i] as HTMLElement;
        image.style.transition = "width 0.3s ease";
        image.addEventListener(
          "transitionend",
          () => {
            image.style.transition = "0s";
          },
          { once: true }
        );
      }
    });
    scrollImages.addEventListener("mousemove", (event) => {
      if (!isHovering) return;
      const cursorPercentage = event.clientX / window.innerWidth;

      animateImages(easeImageScroll(cursorPercentage));
    });
    scrollImages.addEventListener("mouseleave", () => {
      isHovering = false;

      for (let i = 0; i < projects.length; i++) {
        const image = images[i] as HTMLElement;
        image.style.transition = "width 0.3s ease";
        image.addEventListener(
          "transitionend",
          () => {
            image.style.transition = "0s";
          },
          { once: true }
        );
      }
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
    function easeImageScroll(t: number) {
      const p0 = 0.25,
        p1 = 0,
        p2 = 0.75,
        p3 = 1;
      const u = 1 - t;
      return 1 * u * u * t * p0 + 3 * u * t * t * p2 + t * t * t * p3;
    }
    function easeGeneric(t: number) {
      t /= 0.5;
      if (t < 1) return 0.5 * Math.pow(t, 5);
      t -= 2;
      return 0.5 * (Math.pow(t, 5) + 2);
    }

    function easeInQuad(t: number) {
      return t * t;
    }

    function easeOutQuad(t: number) {
      return t * (2 - t);
    }
  }, []);

  return (
    <div
      id="scrollImages"
      className="fixed w-screen bottom-0 left-0 flex flex-row gap-[0px] pointer-events-auto origin-bottom overflow-hidden z-[100]"
    >
      {projects.map((track, i) => (
        <div
          key={i}
          className="relative overflow-hidden origin-left"
          style={{
            height: `${imageHeight}px`,
            transform: "translate3d(0,0,0)",
            transition: "background-color 0.6s ease",
          }}
        >
          <Image
            className="w-full object-cover h-full origin-top"
            src={track.src}
            width={imageHeight}
            height={imageHeight}
            alt={track.name}
            style={{
              transition: "opacity 0.6s ease",
              transform: "translate3d(0,0,0)",
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default Nav;
