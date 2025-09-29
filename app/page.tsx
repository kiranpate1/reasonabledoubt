"use client";

import Image from "next/image";
import { use, useEffect, useRef } from "react";
import LoadingBar from "../components/LoadingBar";
import Footer from "../components/Footer";
import { projects } from "./projects";

export default function Home(props: "props") {
  const maxWidth = 20;
  const scrollHeight = 400;
  const imageHeight = 200;
  const typingRef = useRef<HTMLDivElement>(null);
  const pronuniciationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typingRef.current) {
      const typingPs = typingRef.current.querySelectorAll(
        "p"
      ) as NodeListOf<HTMLElement>;
      typingPs.forEach((p) => {
        const fullText = p.innerText;
        p.style.display = "flex";
        p.style.flexWrap = "wrap";
        p.innerText = "";
        const words = fullText.split(" ");
        words.forEach((word, index) => {
          const span = document.createElement("span");
          const letters = word.split("");
          letters.forEach((letter, letterIndex) => {
            const letterSpan = document.createElement("span");
            letterSpan.style.opacity = "0";
            letterSpan.innerText =
              letter +
              (letterIndex < letters.length - 1
                ? ""
                : String.fromCharCode(160));
            span.appendChild(letterSpan);
          });
          p.appendChild(span);
        });
      });
    }
  }, []);

  useEffect(() => {
    const scrollTitle = document.querySelector(
      ".scroll-element"
    ) as HTMLElement;
    const syllables = document.querySelectorAll(
      ".syllable"
    ) as NodeListOf<HTMLElement>;
    const syllableWidth = syllables[0].getBoundingClientRect().width;
    const scrollImages = document.getElementById("scrollImages") as HTMLElement;
    const images = document.querySelectorAll(
      "#scrollImages > div"
    ) as NodeListOf<HTMLElement>;
    const lines = document.querySelectorAll(
      "#scrollLines > div"
    ) as NodeListOf<HTMLElement>;
    const arrows = document.querySelectorAll(
      ".arrow"
    ) as NodeListOf<HTMLElement>;
    const status1 = document.getElementById("status-1") as HTMLElement;
    const status2 = document.getElementById("status-2") as HTMLElement;
    const loadingBars = document.querySelectorAll(
      "#status-1 #loadingBar > div"
    ) as NodeListOf<HTMLElement>;
    const loadingMessage = document.getElementById(
      "loadingMessage"
    ) as HTMLElement;
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

      if (
        window.scrollY > window.innerHeight * 0.5 &&
        window.scrollY <= window.innerHeight
      ) {
        for (let i = 0; i < syllables.length; i++) {
          syllables[i].style.width = `${syllableWidth}px`;
        }
        //type text out

        if (typingRef.current) {
          const typingSpans = typingRef.current.querySelectorAll(
            "span span"
          ) as NodeListOf<HTMLElement>;
          typingSpans.forEach((span, index) => {
            const el = span as HTMLElement;
            el.style.transition = `opacity 0s ${index * 0.01}s`;
            el.style.opacity = "1";
          });
        }
      } else if (
        window.scrollY <= window.innerHeight * 0.5 ||
        window.scrollY > window.innerHeight
      ) {
        for (let i = 0; i < syllables.length; i++) {
          syllables[i].style.width = "0px";
        }
      }

      //section-1
      if (window.scrollY < scrollTrack.offsetTop) {
        const scrollProgress = Math.min(
          window.scrollY / scrollTrack.offsetTop,
          1
        );
        for (let i = 0; i < projects.length; i++) {
          const image = images[i] as HTMLElement;
          const imageImg = images[i].querySelector("img") as HTMLElement;
          image.style.transitionDelay = `${
            (projects.length - i + 1) * 0.0125
          }s`;
          image.style.backgroundColor = projects[i].color;
          imageImg.style.transitionDelay = `${
            (projects.length - i + 1) * 0.0125
          }s`;
          imageImg.style.opacity = "0";
        }
        animateImages(-3 + 3 * easeOutQuad(scrollProgress));
        scrollImages.style.transform = `translateY(${
          imageHeight - easeInQuad(scrollProgress) * imageHeight
        }px)`;

        status1.style.transform = `translateY(${
          0 - imageHeight * easeInQuad(scrollProgress)
        }px)`;
        status1.style.opacity = "1";
        status2.style.opacity = "0";

        loadingBars.forEach((loadingBar, index) => {
          loadingBar.style.opacity =
            index < Math.round(loadingBars.length * scrollProgress) ? "1" : "0";
        });
      }

      //section-2
      if (
        window.scrollY > scrollTrack.offsetTop &&
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

        status1.style.transform = `translateY(-${imageHeight}px)`;
        status1.style.opacity = "0";
        status2.style.opacity = "1";
      }

      //section-3
      if (
        window.scrollY >
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
          1
        );

        for (let i = 0; i < projects.length; i++) {
          const image = images[i] as HTMLElement;
          const imageImg = image.querySelector("img") as HTMLElement;
          image.style.transform = `translate3d(0,0,0) scaleX(${
            1 - easeOutQuad(scrollProgress) * 0.99
          })`;
          imageImg.style.transform = `translate3d(0,0,0) scaleX(${
            1 + easeOutQuad(scrollProgress)
          })`;
        }
        animateImages(1 + scrollProgress);
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
        const image = images[i] as HTMLElement;
        const imageImg = image.querySelector("img") as HTMLElement;
        const activeImg = images[maxWeightIndex].querySelector(
          "img"
        ) as HTMLElement;
        const activeArrow = arrows[maxWeightIndex] as HTMLElement;
        const scrollLine = lines[i] as HTMLElement;
        const activeScrollLine = lines[maxWeightIndex] as HTMLElement;
        const width = widths[i];
        image.style.width = `${width}vw`;
        imageImg.style.filter = `saturate(0.2) brightness(${Math.pow(
          width / maxWidth,
          0.75
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
      return 3 * u * u * t * p0 + 3 * u * t * t * p2 + t * t * t * p3;
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

    //listeners
    handleScroll();
    window.addEventListener("scroll", handleImageScroll);
    window.addEventListener("resize", handleImageResize, {
      passive: true,
    });
  }, []);

  return (
    <main className="w-screen flex flex-col row-start-2 items-center sm:items-start text-white">
      <div
        className="fixed top-0 left-0 z-0 flex justify-stretch gap-0"
        id="scrollTitle"
      >
        <h1>Ren</h1>
        <h1 className="syllable overflow-hidden duration-200 ease-in-out">·</h1>
        <h1>ais</h1>
        <h1 className="syllable overflow-hidden duration-200 ease-in-out">·</h1>
        <h1>sance</h1>
      </div>
      <section className="flex justify-stretch relative w-full h-screen">
        <div className="h-full flex-1">
          <h1>
            <span className="text-[rgba(255,255,255,0)]">Renaissance</span> is
            an album by recording artist Beyoncé
          </h1>
        </div>
        <div className="h-full w-[20vw]"></div>
      </section>
      <section
        id="scrollTrack"
        className="relative w-screen z-1"
        style={{ height: `${scrollHeight}vh` }}
      >
        <div className="absolute top-0 left-0 right-0 flex flex-col items-start pl-12">
          <div className="w-full max-w-96 flex flex-col gap-4" ref={typingRef}>
            <div className="flex flex-row gap-2 items-center">
              <p>noun</p>
              <div
                className="px-2 py-1 border border-white/40 rounded-full text-[10px] flex flex-row gap-1 items-center"
                ref={pronuniciationRef}
              >
                <p>ˈre-nə-ˌsän(t)s</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="13"
                  viewBox="0 0 15 13"
                  fill="none"
                  data-inject-url="https://www.merriam-webster.com/dist-cross-dungarees/2025-09-25--21-30-28-njg60i/images/svg/audio-pron-redesign.svg"
                >
                  <title>How to pronounce renaissance (audio)</title>
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M13.513 6.34363C13.513 4.21463 12.623 2.33405 10.7864 0.687267L11.4026 0C13.406 1.79629 14.436 3.91633 14.436 6.34363C14.436 8.77387 13.3787 10.9297 11.3318 12.7981L10.7095 12.1163C12.6005 10.3902 13.513 8.4697 13.513 6.34363ZM10.8305 6.33811C10.8305 5.19038 10.2301 3.91597 8.89573 2.50719L9.5659 1.87241C10.9804 3.36579 11.7536 4.85692 11.7536 6.33811C11.7536 8.50095 10.6077 9.83479 9.56034 10.9028L8.90129 10.2565C9.91606 9.22174 10.8305 8.11681 10.8305 6.33811ZM0 8.6107V4.0387H3.23077L6.46154 1.75408V10.959L3.11169 8.6107H0Z"
                    fill="white"
                  ></path>
                </svg>
              </div>
            </div>
            <p className="body-large">
              the revival of art and literature under the influence of classical
              models in the 14th–16th centuries.
            </p>
            <p>
              the culture and style of art and architecture developed during the
              Renaissance. noun: Renaissance
            </p>
            <p>
              a revival of or renewed interest in something. noun: renaissance;
              plural noun: renaissances
            </p>
          </div>
        </div>
        <div className="relative pointer-events-none flex h-0 w-screen items-start z-[12]">
          <div className="relative w-screen h-[200vh] top-[-100vh]">
            <div className="sticky top-0 w-screen min-h-screen flex items-start">
              <div
                className="absolute bottom-0 left-0 pointer-events-auto"
                id="status-1"
              >
                <LoadingBar status="Error 404" message="Retrieving songs..." />
              </div>
            </div>
          </div>
        </div>
        <div
          className="absolute pointer-events-none w-screen left-0 z-[11]"
          style={{
            top: `calc(100vh - ${imageHeight}px - 18px)`,
            height: `calc(${scrollHeight - 100}vh + ${imageHeight}px + 18px)`,
          }}
        >
          <div
            className="sticky top-0 left-0 bg-black pointer-events-auto"
            style={{
              borderBottom: "1px solid rgba(255,255,255,0.15)",
            }}
            id="status-2"
          >
            <LoadingBar status="Success!!" message="Found 16 songs." />
          </div>
        </div>
        <div className="relative z-10 pointer-events-none flex h-0 w-screen items-start">
          <div
            className="relative w-screen top-[-100vh]"
            style={{ height: `${scrollHeight + 100}vh` }}
          >
            <div className="sticky top-0 w-screen min-h-screen flex items-start">
              <div
                id="scrollImages"
                className="absolute w-screen bottom-0 left-0 flex flex-row gap-[0px] pointer-events-auto origin-bottom overflow-hidden"
                style={{ transform: `translateY(${imageHeight}px)` }}
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
            </div>
          </div>
        </div>
        <div
          id="scrollLines"
          className="absolute w-screen h-full left-0 flex flex-row gap-[0px] bg-black"
          style={{
            bottom: `${imageHeight}px`,
            height: `${scrollHeight - 100}vh`,
          }}
        >
          {projects.map((track, index) => (
            <div
              key={index}
              className="relative h-full grid"
              style={{
                borderLeft: "0.5px solid rgba(255,255,255,0.15)",
                borderRight: "0.5px solid rgba(255,255,255,0.15)",
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
                {index + 1}.{track.name} <br />{" "}
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
          ))}
        </div>
        <div className="absolute bottom-0 left-0 h-[1px] w-screen bg-[rgba(255,255,255,0.15)]"></div>
      </section>
      <Footer />
    </main>
  );
}
