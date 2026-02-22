import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function PaletteSwipeSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollContainer = useRef<HTMLDivElement>(null);
  const paletteNumber = 7;
  const [gridProgress, setGridProgress] = useState(0);
  const [splitProgress, setSplitProgress] = useState(0);
  const colours = [
    "#0033FF",
    "#773DFF",
    "#B739E1",
    "#D93278",
    "#DF1C33",
    "#E14533",
    "#F16831",
    "#F1C831",
    "#F1E131",
    "#73D914",
    "#57D4B9",
    "#14A9EE",
    "#0033FF",
  ];

  useEffect(() => {
    const palettesTopElm = scrollRef.current?.querySelector(
      ":scope > div:nth-child(1)",
    ) as HTMLElement | null;
    const palettesBottomElm = scrollRef.current?.querySelector(
      ":scope > div:nth-child(2)",
    ) as HTMLElement | null;
    const palettesTop = scrollRef.current?.querySelectorAll(
      ":scope > div:nth-child(1) > div",
    ) as NodeListOf<HTMLElement>;
    const palettesBottom = scrollRef.current?.querySelectorAll(
      ":scope > div:nth-child(2) > div",
    ) as NodeListOf<HTMLElement>;
    const paletteImages = scrollRef.current?.querySelectorAll(
      "img",
    ) as NodeListOf<HTMLImageElement>;
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
    const easeInOut = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    palettesTop?.forEach((palette, paletteIndex) => {
      const paletteColor = window.getComputedStyle(palette).backgroundColor;

      for (let i = 0; i < paletteNumber; i++) {
        const newPalette = document.createElement("div");

        if (i === 0) {
          newPalette.style.backgroundColor = paletteColor;
          newPalette.style.zIndex = `${paletteNumber}`;
        } else {
          const paletteRGB = paletteColor
            .match(/\d+/g)
            ?.map((num) => parseInt(num, 10)) as [number, number, number];
          const blendFactor = (paletteNumber - i + 1) / paletteNumber;
          const paletteBlend = `rgb(${Math.round(paletteRGB[0] * blendFactor)}, ${Math.round(paletteRGB[1] * blendFactor)}, ${Math.round(paletteRGB[2] * blendFactor)})`;
          newPalette.style.backgroundColor = paletteBlend;
          newPalette.style.zIndex = `${paletteNumber - i}`;
          newPalette.classList.add("mix-blend-lighten");
        }
        newPalette.classList.add(
          "palette-card",
          "absolute",
          "top-0",
          "left-0",
          "w-[200%]",
          "h-[200%]",
          "origin-top-left",
        );
        palette.appendChild(newPalette);
      }
      palette.style.backgroundColor = "#000000";
    });

    palettesBottom?.forEach((palette, paletteIndex) => {
      const paletteColor = window.getComputedStyle(palette).backgroundColor;

      for (let i = 0; i < paletteNumber; i++) {
        const newPalette = document.createElement("div");

        if (i === 0) {
          newPalette.style.backgroundColor = paletteColor;
          newPalette.style.zIndex = `${paletteNumber}`;
        } else {
          const paletteRGB = paletteColor
            .match(/\d+/g)
            ?.map((num) => parseInt(num, 10)) as [number, number, number];
          const blendFactor = (paletteNumber - i + 1) / paletteNumber;
          const paletteBlend = `rgb(${Math.round(paletteRGB[0] * blendFactor)}, ${Math.round(paletteRGB[1] * blendFactor)}, ${Math.round(paletteRGB[2] * blendFactor)})`;
          newPalette.style.backgroundColor = paletteBlend;
          newPalette.style.zIndex = `${paletteNumber - i}`;
          newPalette.classList.add("mix-blend-lighten");
        }
        newPalette.classList.add(
          "palette-card",
          "absolute",
          "bottom-0",
          "right-0",
          "w-[200%]",
          "h-[200%]",
          "origin-bottom-right",
        );
        palette.appendChild(newPalette);
      }
      palette.style.backgroundColor = "#000000";
    });

    function handleScroll() {
      if (!scrollContainer.current) return;

      const scrollTop = window.scrollY;
      const sectionTop = scrollContainer.current.offsetTop;
      const sectionHeight =
        scrollContainer.current.getBoundingClientRect().height;
      const viewportHeight = window.innerHeight;

      const scrollStart = sectionTop;
      const scrollEnd = sectionTop + sectionHeight - viewportHeight;

      const progress = Math.max(
        0,
        Math.min((scrollTop - scrollStart) / (scrollEnd - scrollStart), 1),
      );

      const allPaletteCards = scrollRef.current?.querySelectorAll(
        ".palette-card",
      ) as NodeListOf<HTMLElement> | null;

      if (progress >= 0.5) {
        const excessProgress = (progress - 0.5) * 2;
        const easedExcess = easeOut(excessProgress);
        allPaletteCards?.forEach((card, index) => {
          const segmentSize = 2 / paletteNumber;
          const maxOffset = 1 - segmentSize;
          const normalizedIndex = (index % paletteNumber) / (paletteNumber - 1);
          const easedOffset = 1 - Math.pow(1 - normalizedIndex, 1.5);
          const offset = easedOffset * maxOffset;
          const segmentProgress = (easedExcess - offset) / segmentSize;
          let rotation = segmentProgress * -90;
          rotation = Math.max(-90, Math.min(0, rotation));
          (card as HTMLElement).style.transform = `rotateZ(${rotation}deg)`;
        });
      } else {
        allPaletteCards?.forEach((card) => {
          (card as HTMLElement).style.transform = `rotateZ(0deg)`;
        });
      }

      if (palettesTopElm instanceof HTMLElement)
        palettesTopElm.style.transform = `skewX(${-40 + easeOut(progress) * 40}deg)`;
      if (palettesBottomElm instanceof HTMLElement)
        palettesBottomElm.style.transform = `skewX(${-40 + easeOut(progress) * 40}deg)`;

      paletteImages.forEach((img) => {
        img.style.transform = `skewX(${40 - easeOut(progress) * 40}deg)`;
      });

      if (progress > 0 && progress < 0.25) {
        setGridProgress(easeOut(progress * 4));
      } else if (progress >= 0.25) {
        setGridProgress(1);
      } else {
        setGridProgress(0);
      }

      if (progress > 0.25 && progress < 0.5) {
        setSplitProgress(easeInOut((progress - 0.25) * 4));
      } else if (progress >= 0.5) {
        setSplitProgress(1);
      } else {
        setSplitProgress(0);
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <section
      className="relative -mt-[200vh] h-[300vh] w-screen flex bg-black"
      ref={scrollContainer}
    >
      <div className="sticky top-0 h-screen w-screen" ref={scrollRef}>
        <div
          className="absolute left-0 top-0 h-[40vh] grid grid-cols-6 p-4 gap-4"
          style={{
            width: `${gridProgress * 100}%`,
            padding: `${splitProgress * 16}px`,
            gap: `${splitProgress * 16}px`,
          }}
        >
          {colours.slice(0, 6).map((color, index) => (
            <div
              key={index}
              className="relative overflow-hidden"
              style={{ backgroundColor: color }}
            >
              <Image
                src={`/images/im-that-girl/palettes/${index + 1}.webp`}
                alt=""
                fill
                className="absolute inset-0 object-cover "
              />
              <div
                className="absolute inset-0 z-10"
                style={{
                  background: `linear-gradient(to right, ${colours[index]}, ${colours[index + 1]})`,
                  opacity: 1 - splitProgress,
                }}
              ></div>
            </div>
          ))}
        </div>

        <div
          className="absolute right-0 bottom-0 h-[40vh] grid grid-cols-6 p-4 gap-4"
          style={{
            width: `${gridProgress * 100}%`,
            padding: `${splitProgress * 16}px`,
            gap: `${splitProgress * 16}px`,
          }}
        >
          {colours.slice(6, 12).map((color, index) => (
            <div
              key={index}
              className="relative overflow-hidden"
              style={{ backgroundColor: colours[11 - index] }}
            >
              <Image
                src={`/images/im-that-girl/palettes/${12 - index}.webp`}
                alt=""
                fill
                className="absolute inset-0 object-cover"
              />
              <div
                className="absolute inset-0 z-10"
                style={{
                  background: `linear-gradient(to left, ${colours[11 - index]}, ${colours[12 - index]})`,
                  opacity: 1 - splitProgress,
                }}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
