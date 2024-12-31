"use client";

import Image from "next/image";
import { useEffect } from "react";

const trackList = [
  { name: "I'M THAT GIRL", src: "/images/home/1.png" },
  { name: "COZY", src: "/images/home/2.png" },
  { name: "ALIEN SUPERSTAR", src: "/images/home/3.png" },
  { name: "CUFF IT", src: "/images/home/4.png" },
  { name: "ENERGY", src: "/images/home/5.png" },
  { name: "BREAK MY SOUL", src: "/images/home/6.png" },
  { name: "CHURCH GIRL", src: "/images/home/7.png" },
  { name: "PLASTIC OFF THE SOFA", src: "/images/home/8.png" },
  { name: "VIRGO'S GROOVE", src: "/images/home/9.png" },
  { name: "MOVE", src: "/images/home/10.png" },
  { name: "HEATED", src: "/images/home/11.png" },
  { name: "THIQUE", src: "/images/home/12.png" },
  { name: "ALL UP IN YOUR MIND", src: "/images/home/13.png" },
  { name: "AMERICA HAS A PROBLEM", src: "/images/home/14.png" },
  { name: "PURE/HONEY", src: "/images/home/15.png" },
  { name: "SUMMER RENAISSANCE", src: "/images/home/16.png" },
];

export default function Home(props: typeof trackList) {
  const numberofTracks = trackList.length;
  const numberOfImages = 20;
  const maxWidth = 17;

  useEffect(() => {
    const images = document.querySelectorAll("#scrollImages > div");
    const totalImages = images.length;
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
      const scrollPercentage =
        (window.scrollY - scrollTrack.offsetTop) /
        (scrollTrack.scrollHeight - window.innerHeight);

      animateImages(scrollPercentage);
    }

    function animateImages(input: number) {
      let remainingWidth = totalWidth;
      const widths = generateNumbers(input);

      for (let i = 0; i < totalImages; i++) {
        const image = images[i] as HTMLElement;
        const imageImg = image.querySelector("img") as HTMLElement;
        const width = widths[i];
        image.style.width = `${width}vw`;
        image.style.filter = `saturate(${
          width / maxWidth
        }) brightness(${Math.pow(width / maxWidth, 0.5)})`;
        // const skewFactor =
        //   i > scrollPercentage * numberOfImages
        //     ? (maxWidth - width) * 1
        //     : (-maxWidth + width) * 1;
        // image.style.transform = `translate3d(0,0,0) skew(${skewFactor}deg,${-skewFactor}deg)`;
        // imageImg.style.transform = `skewY(${-skewFactor}deg,${skewFactor}deg)`;
        // const rotateFactor =
        //   i > input * numberOfImages
        //     ? (maxWidth - width) * 1
        //     : (-maxWidth + width) * 1;
        //image.style.transform = `translate3d(0,0,0) rotate(${rotateFactor}deg)`;
        // imageImg.style.transform = `rotate(${-rotateFactor}deg)`;

        remainingWidth -= width;
      }
    }

    const scrollImages = document.getElementById("scrollImages") as HTMLElement;

    scrollImages.addEventListener("mouseenter", () => {
      isHovering = true;
      for (let i = 0; i < totalImages; i++) {
        const image = images[i] as HTMLElement;
        image.style.transition = "0.3s ease";
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

      animateImages(easeInOut(cursorPercentage));
    });
    scrollImages.addEventListener("mouseleave", () => {
      isHovering = false;

      handleScroll();
      for (let i = 0; i < totalImages; i++) {
        const image = images[i] as HTMLElement;
        image.style.transition = "0.3s ease";
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
      const numberOfElements = numberOfImages; // Total elements in the array
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

      return finalWeights;
    }

    //easing
    function easeInOut(t: number) {
      t /= 0.5;
      if (t < 1) return 0.5 * Math.pow(t, 5);
      t -= 2;
      return 0.5 * (Math.pow(t, 5) + 2);
    }

    function easeInQuad(t: number) {
      return t * t;
    }

    //listeners
    handleScroll();
    window.addEventListener("scroll", handleImageScroll);
    window.addEventListener("resize", handleImageResize, {
      passive: true,
    });
  }, []);

  return (
    <main className="w-screen flex flex-col gap-8 row-start-2 items-center sm:items-start text-[#fff]">
      <section className="relative w-full h-screen"></section>
      <section id="scrollTrack" className="relative w-full h-[400vh]">
        <div
          id=""
          className="absolute top-0 left-0 w-full grid"
          style={{
            height: "calc(100% - 100vh + 200px)",
            gridTemplateRows: `repeat(${trackList.length}, 1fr)`,
          }}
        >
          {trackList.map((track, index) => (
            <a
              key={index}
              href={`/${track.name.toLowerCase().replace(/ /g, "-")}`}
            >
              {index + 1}.{track.name}
            </a>
          ))}
        </div>
        <div className="sticky w-screen h-screen top-0 left-0">
          <div
            id="scrollImages"
            className="absolute w-screen bottom-0 left-0 flex flex-row gap-[0px] overflow-hidden"
          >
            {Array.from({ length: numberOfImages }, (_, i) => (
              <div
                key={i}
                className="h-[200px] relative overflow-hidden"
                style={{
                  // transition: "0.1s",
                  transform: "translate3d(0,0,0)",
                }}
              >
                <Image
                  className="w-full object-cover h-full"
                  src={`/images/home/${i + 1}.png`}
                  width={200}
                  height={300}
                  alt="random"
                  style={{
                    // transition: "0.1s",
                    transform: "translate3d(0,0,0)",
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
