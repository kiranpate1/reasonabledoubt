"use client";

import Image from "next/image";
import { useEffect } from "react";

export default function Home() {
  const numberOfImages = 20;
  const maxWidth = 17;

  useEffect(() => {
    //animate
    function handleImageResize() {
      handleImageScroll();
    }

    function handleImageScroll() {
      if (typeof handleImageScroll.throttled === "undefined") {
        handleImageScroll.throttled = false;
      }
      if (!handleImageScroll.throttled) {
        handleImageScroll.throttled = true;
        requestAnimationFrame(() => {
          imagesScroll();
          handleImageScroll.throttled = false;
        });
      }
    }

    handleImageScroll.throttled = false;

    function imagesScroll() {
      const images = document.querySelectorAll("#scrollImages > div");
      const totalWidth = window.innerWidth;
      const totalImages = images.length;
      let remainingWidth = totalWidth;

      // Example usage
      const scrollPercentage =
        window.scrollY /
        (document.documentElement.scrollHeight - window.innerHeight);
      const widths = generateNumbers(scrollPercentage);

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
        const rotateFactor =
          i > scrollPercentage * numberOfImages
            ? (maxWidth - width) * 1
            : (-maxWidth + width) * 1;
        image.style.transform = `translate3d(0,0,0) rotate(${rotateFactor}deg)`;
        // imageImg.style.transform = `rotate(${-rotateFactor}deg)`;

        remainingWidth -= width;
      }
    }

    function generateNumbers(percentage: number, maxWeight = maxWidth) {
      const totalSum = 100; // The target total sum
      const numberOfElements = 20; // Total elements in the array
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
    imagesScroll();
    window.addEventListener("scroll", handleImageScroll);
    window.addEventListener("resize", handleImageResize, {
      passive: true,
    });
  }, []);

  return (
    <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start text-[#fff] h-[400vh]">
      <a href="/cozy">1</a>
      <a href="/alien-superstar">2</a>
      <a href="/break-my-soul">3</a>
      <div
        id="scrollImages"
        className="fixed bottom-0 left-0 w-screen flex flex-row gap-[0px] overflow-hidden"
      >
        {Array.from({ length: numberOfImages }, (_, i) => (
          <div
            key={i}
            className="h-[200px] relative overflow-hidden"
            style={{
              transition: "width 0.1s, transform 0.1s",
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
                transition: "transform 0.1s",
                transform: "translate3d(0,0,0)",
              }}
            />
          </div>
        ))}
      </div>
    </main>
  );
}
