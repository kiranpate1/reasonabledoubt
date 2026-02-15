import { useEffect, useRef } from "react";
import Image from "next/image";

export default function PaletteSwipeSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollContainer = useRef<HTMLDivElement>(null);
  const paletteNumber = 6;

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

    palettesTop?.forEach((palette) => {
      const paletteColor = window.getComputedStyle(palette).backgroundColor;

      for (let i = 0; i < paletteNumber; i++) {
        const newPalette = document.createElement("div");
        const paletteRGB = paletteColor
          .match(/\d+/g)
          ?.map((num) => parseInt(num, 10)) as [number, number, number];
        const blendFactor = (i + 2) / paletteNumber;
        const paletteBlend = `rgb(${Math.round(paletteRGB[0] * blendFactor)}, ${Math.round(paletteRGB[1] * blendFactor)}, ${Math.round(paletteRGB[2] * blendFactor)})`;
        newPalette.style.backgroundColor = paletteBlend;
        newPalette.style.zIndex = `${paletteNumber - i}`;
        newPalette.classList.add(
          "palette-card",
          "absolute",
          "top-0",
          "left-0",
          "w-[200%]",
          "h-[200%]",
          "origin-top-left",
          "mix-blend-multiply",
        );
        // newPalette.textContent =
        //   "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
        palette.appendChild(newPalette);
      }
      palette.style.backgroundColor = "#000000";
    });

    palettesBottom?.forEach((palette) => {
      const paletteColor = window.getComputedStyle(palette).backgroundColor;

      for (let i = 0; i < paletteNumber; i++) {
        const newPalette = document.createElement("div");
        const paletteRGB = paletteColor
          .match(/\d+/g)
          ?.map((num) => parseInt(num, 10)) as [number, number, number];
        const blendFactor = (i + 2) / paletteNumber;
        const paletteBlend = `rgb(${Math.round(paletteRGB[0] * blendFactor)}, ${Math.round(paletteRGB[1] * blendFactor)}, ${Math.round(paletteRGB[2] * blendFactor)})`;
        newPalette.style.backgroundColor = paletteBlend;
        newPalette.style.zIndex = `${paletteNumber - i}`;
        newPalette.classList.add(
          "palette-card",
          "absolute",
          "bottom-0",
          "right-0",
          "w-[200%]",
          "h-[200%]",
          "origin-bottom-right",
          "mix-blend-multiply",
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

      const allPaletteCards =
        scrollRef.current?.querySelectorAll(".palette-card");

      allPaletteCards?.forEach((card, index) => {
        const segmentSize = 2 / paletteNumber;
        const maxOffset = 1 - segmentSize;
        const normalizedIndex = (index % paletteNumber) / (paletteNumber - 1);
        const easedOffset = 1 - Math.pow(1 - normalizedIndex, 1.5);
        const offset = easedOffset * maxOffset;
        const segmentProgress = (progress - offset) / segmentSize;
        let rotation = segmentProgress * -90;
        rotation = Math.max(-90, Math.min(0, rotation));
        (card as HTMLElement).style.transform = `rotateZ(${rotation}deg)`;
      });

      if (palettesTopElm instanceof HTMLElement)
        palettesTopElm.style.transform = `skewX(${90 - easeOut(progress) * 90}deg)`;
      if (palettesBottomElm instanceof HTMLElement)
        palettesBottomElm.style.transform = `skewX(${90 - easeOut(progress) * 90}deg)`;

      paletteImages.forEach((img) => {
        img.style.transform = `skewX(${-90 + easeOut(progress) * 90}deg)`;
      });
    }

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <section
      className="relative h-[300vh] w-screen flex bg-black"
      ref={scrollContainer}
    >
      <div className="sticky top-0 h-screen w-screen" ref={scrollRef}>
        <div className="absolute left-0 top-0 w-full h-[40vh] grid grid-cols-6">
          <div className="relative bg-[#0033FF] overflow-hidden">
            <Image
              src="/images/im-that-girl/palettes/1.webp"
              alt=""
              fill
              className="absolute inset-0 object-cover "
            />
          </div>
          <div className="relative bg-[#773DFF] overflow-hidden">
            <Image
              src="/images/im-that-girl/palettes/2.webp"
              alt=""
              fill
              className="absolute inset-0 object-cover "
            />
          </div>
          <div className="relative bg-[#B739E1] overflow-hidden">
            <Image
              src="/images/im-that-girl/palettes/3.webp"
              alt=""
              fill
              className="absolute inset-0 object-cover "
            />
          </div>
          <div className="relative bg-[#D93278] overflow-hidden">
            <Image
              src="/images/im-that-girl/palettes/4.webp"
              alt=""
              fill
              className="absolute inset-0 object-cover "
            />
          </div>
          <div className="relative bg-[#DF1C33] overflow-hidden">
            <Image
              src="/images/im-that-girl/palettes/5.webp"
              alt=""
              fill
              className="absolute inset-0 object-cover "
            />
          </div>
          <div className="relative bg-[#E14533] overflow-hidden">
            <Image
              src="/images/im-that-girl/palettes/6.webp"
              alt=""
              fill
              className="absolute inset-0 object-cover "
            />
          </div>
        </div>
        <div className="absolute left-0 bottom-0 w-full h-[40vh] grid grid-cols-6">
          <div className="relative bg-[#14A9EE] overflow-hidden">
            <Image
              src="/images/im-that-girl/palettes/12.webp"
              alt=""
              fill
              className="absolute inset-0 object-cover"
            />
          </div>
          <div className="relative bg-[#57D4B9] overflow-hidden">
            <Image
              src="/images/im-that-girl/palettes/11.webp"
              alt=""
              fill
              className="absolute inset-0 object-cover "
            />
          </div>
          <div className="relative bg-[#73D914] overflow-hidden">
            <Image
              src="/images/im-that-girl/palettes/10.webp"
              alt=""
              fill
              className="absolute inset-0 object-cover "
            />
          </div>
          <div className="relative bg-[#F1E131] overflow-hidden">
            <Image
              src="/images/im-that-girl/palettes/9.webp"
              alt=""
              fill
              className="absolute inset-0 object-cover "
            />
          </div>
          <div className="relative bg-[#F1C831] overflow-hidden">
            <Image
              src="/images/im-that-girl/palettes/8.webp"
              alt=""
              fill
              className="absolute inset-0 object-cover "
            />
          </div>
          <div className="relative bg-[#F16831] overflow-hidden">
            <Image
              src="/images/im-that-girl/palettes/7.webp"
              alt=""
              fill
              className="absolute inset-0 object-cover "
            />
          </div>
        </div>
      </div>
    </section>
  );
}
