"use client";

import Image from "next/image";
import { useEffect } from "react";
import Cd from "../components/Cd";
import LoadingBar from "../components/LoadingBar";
import { i } from "motion/react-client";
import { projects } from "./projects";

export default function Home(props: "props") {
  const maxWidth = 20;
  const scrollHeight = 400;
  const imageHeight = 200;

  useEffect(() => {
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

    // scrollImages.addEventListener("mouseenter", () => {
    //   isHovering = true;
    //   for (let i = 0; i < projects.length; i++) {
    //     const image = images[i] as HTMLElement;
    //     image.style.transition = "width 0.3s ease";
    //     image.addEventListener(
    //       "transitionend",
    //       () => {
    //         image.style.transition = "0s";
    //       },
    //       { once: true }
    //     );
    //   }
    // });
    // scrollImages.addEventListener("mousemove", (event) => {
    //   if (!isHovering) return;
    //   const cursorPercentage = event.clientX / window.innerWidth;

    //   animateImages(easeImageScroll(cursorPercentage));
    // });
    // scrollImages.addEventListener("mouseleave", () => {
    //   isHovering = false;

    //   for (let i = 0; i < projects.length; i++) {
    //     const image = images[i] as HTMLElement;
    //     image.style.transition = "width 0.3s ease";
    //     image.addEventListener(
    //       "transitionend",
    //       () => {
    //         image.style.transition = "0s";
    //       },
    //       { once: true }
    //     );
    //   }
    //   handleScroll();
    // });

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

    const footerLinks = document.getElementById("footerLinks") as HTMLElement;
    const brighten = document.querySelectorAll(
      ".brighten"
    ) as NodeListOf<HTMLElement>;

    footerLinks.addEventListener("mouseenter", () => {
      for (let i = 0; i < brighten.length; i++) {
        brighten[i].style.filter = "brightness(1.8)";
      }
    });

    footerLinks.addEventListener("mouseleave", () => {
      for (let i = 0; i < brighten.length; i++) {
        brighten[i].style.filter = "brightness(1)";
      }
    });
  }, []);

  return (
    <main className="w-screen flex flex-col row-start-2 items-center sm:items-start text-[#fff]">
      <section className="relative w-full h-screen">
        <h1>Renaissance is an album by recording artist Beyoncé</h1>
      </section>
      <section
        id="scrollTrack"
        className="relative w-screen"
        style={{ height: `${scrollHeight}vh` }}
      >
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
          className="absolute w-screen h-full left-0 flex flex-row gap-[0px]"
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
      <section className="relative w-full h-screen">
        <h1>Renaissance</h1>
        <div className="absolute top-0 left-0 w-screen h-screen overflow-hidden">
          <Cd size={500} />
        </div>
        <div className="absolute bottom-0 left-0 w-full detail text-[12px] flex flex-row items-start gap-20 z-10 pointer-events-none">
          <div className="max-w-[550px] text-balance">
            <div>
              All rights go to Beyoncé and Parkwood Entertainment Ltd. © 2022
            </div>
            <br />
            Not affiliated with or endorsed by Beyoncé or Parkwood Entertainment
            Ltd.
            <br />
            All images and music used are the property of their respective
            owners.
            <br />
            No copyright infringement intended.
          </div>
          <div
            id="footerLinks"
            className="flex-1 flex flex-wrap gap-x-20 gap-y-4 justify-end"
          >
            <a
              className="pointer-events-auto"
              href="https://www.instagram.com/beyonce/"
              target="_blank"
            >
              Instagram
            </a>
            <a
              className="pointer-events-auto"
              href="https://twitter.com/beyonce"
              target="_blank"
            >
              Twitter
            </a>
            <a
              className="pointer-events-auto"
              href="https://www.facebook.com/beyonce"
              target="_blank"
            >
              Facebook
            </a>
            <a
              className="pointer-events-auto"
              href="https://www.youtube.com/user/beyonce"
              target="_blank"
            >
              YouTube
            </a>
            <a
              className="pointer-events-auto"
              href="https://open.spotify.com/artist/6vWDO969PvNqNYHIOW5v0m"
              target="_blank"
            >
              Spotify
            </a>
            <a
              className="pointer-events-auto"
              href="https://music.apple.com/us/artist/beyonc%C3%A9/1419227"
              target="_blank"
            >
              Apple Music
            </a>
            <a
              className="pointer-events-auto"
              href="https://tidal.com/browse/artist/4443"
              target="_blank"
            >
              Tidal
            </a>
            <a
              className="pointer-events-auto"
              href="https://www.amazon.com/Beyonce/e/B00197R8L8"
              target="_blank"
            >
              Amazon
            </a>
            <a
              className="pointer-events-auto"
              href="https://www.beyonce.com/"
              target="_blank"
            >
              Website
            </a>
            <a
              className="pointer-events-auto"
              href="https://www.beyonce.com/shop/"
              target="_blank"
            >
              Shop
            </a>
            <a
              className="pointer-events-auto"
              href="https://www.beyonce.com/foundation/"
              target="_blank"
            >
              Foundation
            </a>
            <a
              className="pointer-events-auto"
              href="https://www.beyonce.com/ivy-park/"
              target="_blank"
            >
              Ivy Park
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
