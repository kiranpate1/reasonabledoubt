"use client";

import Image from "next/image";
import { useEffect } from "react";
import Cd from "../components/Cd/Cd";

const trackList = [
  { name: "I'M THAT GIRL", src: "/images/home/1.png", color: "#fff" },
  { name: "COZY", src: "/images/home/2.png", color: "#F576C3" },
  { name: "ALIEN SUPERSTAR", src: "/images/home/8.png", color: "#67C8FB" },
  { name: "CUFF IT", src: "/images/home/10.png", color: "#713735" },
  { name: "ENERGY", src: "/images/home/4.png", color: "#000" },
  { name: "BREAK MY SOUL", src: "/images/home/18.png", color: "#E80000" },
  { name: "CHURCH GIRL", src: "/images/home/17.png", color: "#F05F04" },
  {
    name: "PLASTIC OFF THE SOFA",
    src: "/images/home/12.png",
    color: "#F9D608",
  },
  { name: "VIRGO'S GROOVE", src: "/images/home/9.png", color: "#0DD431" },
  { name: "MOVE", src: "/images/home/16.png", color: "#0100F4" },
  { name: "HEATED", src: "/images/home/11.png", color: "#7F0C9B" },
  { name: "THIQUE", src: "/images/home/14.png", color: "#EF16AB" },
  { name: "ALL UP IN YOUR MIND", src: "/images/home/13.png", color: "#fff" },
  {
    name: "AMERICA HAS A PROBLEM",
    src: "/images/home/3.png",
    color: "#F576C3",
  },
  { name: "PURE/HONEY", src: "/images/home/20.png", color: "#67C8FB" },
  { name: "SUMMER RENAISSANCE", src: "/images/home/5.png", color: "#713735" },
  { name: "SUNSHINE", src: "/images/home/6.png", color: "#000" },
  { name: "BROKEN", src: "/images/home/7.png", color: "#E80000" },
  { name: "FREAKY", src: "/images/home/19.png", color: "#F05F04" },
  { name: "SWEET", src: "/images/home/15.png", color: "#F9D608" },
];

export default function Home(props: typeof trackList) {
  const maxWidth = 17;
  const scrollHeight = 400;

  useEffect(() => {
    const scrollImages = document.getElementById("scrollImages") as HTMLElement;
    const images = document.querySelectorAll(
      "#scrollImages > div"
    ) as NodeListOf<HTMLElement>;
    const lines = document.querySelectorAll(
      "#scrollLines > div"
    ) as NodeListOf<HTMLElement>;
    const status1 = document.getElementById("status-1") as HTMLElement;
    const status2 = document.getElementById("status-2") as HTMLElement;
    const loadingBars = document.querySelectorAll(
      "#loadingBar > div"
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
        for (let i = 0; i < trackList.length; i++) {
          const image = images[i] as HTMLElement;
          const imageImg = images[i].querySelector("img") as HTMLElement;
          image.style.transitionDelay = `${
            (trackList.length - i + 1) * 0.0125
          }s`;
          image.style.backgroundColor = trackList[i].color;
          imageImg.style.transitionDelay = `${
            (trackList.length - i + 1) * 0.0125
          }s`;
          imageImg.style.opacity = "0";
          imageImg.style.transform = `translate3d(0,0,0) scaleY(${
            3 - 2 * easeInQuad(scrollProgress)
          })`;
        }
        animateImages(-3 + 3 * easeOutQuad(scrollProgress));
        scrollImages.style.transform = `scaleY(${easeInQuad(scrollProgress)})`;

        status1.style.transform = `translateY(${
          0 - 200 * easeInQuad(scrollProgress)
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
        for (let i = 0; i < trackList.length; i++) {
          const image = images[i] as HTMLElement;
          const imageImg = images[i].querySelector("img") as HTMLElement;
          image.style.transitionDelay = `${i * 0.0125}s`;
          image.style.backgroundColor = "#000";
          imageImg.style.transitionDelay = `${i * 0.0125}s`;
          imageImg.style.opacity = "1";
          imageImg.style.transform = `translate3d(0,0,0) scaleY(1)`;
          image.style.transform = `translate3d(0,0,0) skewX(0deg)`;
          imageImg.style.transform = `translate3d(0,0,0) skewX(0deg)`;
        }
        animateImages(easeImageScroll(scrollPercentage));
        scrollImages.style.transform = `scaleY(1)`;
        scrollImages.style.filter = `brightness(1)`;
        // scrollImages.style.opacity = "1";

        status1.style.transform = `translateY(-200px)`;
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

        for (let i = 0; i < trackList.length; i++) {
          const image = images[i] as HTMLElement;
          const imageImg = image.querySelector("img") as HTMLElement;
          image.style.transform = `translate3d(0,0,0) skewX(${
            scrollProgress * 89.5
          }deg)`;
          imageImg.style.transform = `translate3d(0,0,0) skewX(${
            -scrollProgress * 89.5
          }deg)`;
        }
        animateImages(1 + scrollProgress);
        scrollImages.style.filter = `brightness(${1 + scrollProgress * 3})`;
        // scrollImages.style.opacity = `${1 - scrollProgress}`;
      }
    }

    function animateImages(input: number) {
      let remainingWidth = totalWidth;
      const widths = generateNumbers(input).finalWeights;
      const maxWeightIndex = generateNumbers(input).maxWeightIndex;

      for (let i = 0; i < trackList.length; i++) {
        const image = images[i] as HTMLElement;
        const imageImg = image.querySelector("img") as HTMLElement;
        const maxImg = images[maxWeightIndex].querySelector(
          "img"
        ) as HTMLElement;
        const scrollLine = lines[i] as HTMLElement;
        const maxScrollLine = lines[maxWeightIndex] as HTMLElement;
        const width = widths[i];
        image.style.width = `${width}vw`;
        imageImg.style.filter = `saturate(0.2) brightness(${Math.pow(
          width / maxWidth,
          0.5
        )})`;
        maxImg.style.filter = `saturate(1) brightness(1)`;
        scrollLine.style.width = `${width}vw`;
        // scrollLine.style.backgroundColor = "rgba(255,255,255,0)";
        // maxScrollLine.style.backgroundColor = "rgba(255,255,255,0.025)";

        remainingWidth -= width;
      }
    }

    // scrollImages.addEventListener("mouseenter", () => {
    //   isHovering = true;
    //   for (let i = 0; i < trackList.length; i++) {
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

    //   for (let i = 0; i < trackList.length; i++) {
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
      const numberOfElements = trackList.length; // Total elements in the array
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
    <main className="w-screen flex flex-col row-start-2 items-center sm:items-start text-[#fff]">
      <section className="relative w-full h-screen">
        {/* <div
          className="absolute top-0 left-0 w-screen"
          style={{ height: "calc(200vh - 200px)" }}
        >
          <img
            className="w-full h-full object-cover"
            src="/images/image_57.webp"
            width={200}
            height={300}
            alt=""
          />
        </div> */}
        <h1>Renaissance</h1>
      </section>
      <section
        id="scrollTrack"
        className="relative w-screen"
        style={{ height: `${scrollHeight}vh` }}
      >
        <div className="relative pointer-events-none flex h-0 w-screen items-start z-11">
          <div className="relative w-screen h-[200vh] top-[-100vh]">
            <div className="sticky top-0 w-screen min-h-screen flex items-start">
              <div
                className="absolute w-screen bottom-0 left-0 detail text-[12px] flex gap-20 pointer-events-auto"
                id="status-1"
              >
                <div>Error 404</div>
                <div className="flex flex-row gap-2 items-center">
                  <div
                    id="loadingBar"
                    className="flex flex-row h-2 gap-[1px] py-0.5 px-[1.5px] border-white border-solid border-[0.5px]"
                  >
                    <div className="w-1 h-full bg-white"></div>
                    <div className="w-1 h-full bg-white"></div>
                    <div className="w-1 h-full bg-white"></div>
                    <div className="w-1 h-full bg-white"></div>
                    <div className="w-1 h-full bg-white"></div>
                    <div className="w-1 h-full bg-white"></div>
                    <div className="w-1 h-full bg-white"></div>
                    <div className="w-1 h-full bg-white"></div>
                    <div className="w-1 h-full bg-white"></div>
                    <div className="w-1 h-full bg-white"></div>
                  </div>
                  <div id="loadingMessage">Retrieving songs...</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="absolute pointer-events-none w-screen left-0 z-10"
          style={{
            top: "calc(100vh - 200px - 18px)",
            height: `calc(${scrollHeight - 100}vh + 18px)`,
          }}
        >
          <div
            className="sticky w-screen top-0 left-0 detail text-[12px] flex gap-20 bg-black pointer-events-auto"
            style={{
              borderBottom: "1px solid rgba(255,255,255,0.15)",
            }}
            id="status-2"
          >
            <div>Success!!</div>
            <div className="flex flex-row gap-2 items-center">
              <div
                id=""
                className="flex flex-row h-2 gap-[1px] py-0.5 px-[1.5px] border-white border-solid border-[0.5px]"
              >
                <div className="w-1 h-full bg-white"></div>
                <div className="w-1 h-full bg-white"></div>
                <div className="w-1 h-full bg-white"></div>
                <div className="w-1 h-full bg-white"></div>
                <div className="w-1 h-full bg-white"></div>
                <div className="w-1 h-full bg-white"></div>
                <div className="w-1 h-full bg-white"></div>
                <div className="w-1 h-full bg-white"></div>
                <div className="w-1 h-full bg-white"></div>
                <div className="w-1 h-full bg-white"></div>
              </div>
              <div id="loadingMessage">Found 16 songs.</div>
            </div>
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
                {trackList.map((track, i) => (
                  <div
                    key={i}
                    className="h-[200px] relative overflow-hidden origin-top"
                    style={{
                      transform: "translate3d(0,0,0)",
                      transition: "background-color 0.6s ease",
                    }}
                  >
                    <Image
                      className="w-full object-cover h-full origin-top"
                      src={track.src}
                      width={200}
                      height={300}
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
          className="absolute w-screen h-full bottom-[200px] left-0 flex flex-row gap-[0px]"
          style={{
            height: `${scrollHeight - 100}vh`,
          }}
        >
          {trackList.map((track, index) => (
            <div
              key={index}
              className="relative h-full grid"
              style={{
                borderLeft: "0.5px solid rgba(255,255,255,0.15)",
                borderRight: "0.5px solid rgba(255,255,255,0.15)",
                gridTemplateRows: `repeat(${trackList.length}, 1fr)`,
              }}
            >
              <a
                className="whitespace-nowrap self-center"
                key={index}
                href={`/${track.name.toLowerCase().replace(/ /g, "-")}`}
                style={{ gridArea: `${index + 1} / 1 / span 1 / span 1` }}
              >
                {index + 1}.{track.name}
              </a>
            </div>
          ))}
        </div>
        <div className="absolute bottom-0 left-0 h-[1px] w-screen bg-[rgba(255,255,255,0.15)]"></div>
      </section>
      <section className="relative w-full h-screen">
        <h1>Renaissance</h1>
        <div className="absolute top-0 left-0 w-full h-full">
          <Cd size={500} />
        </div>
      </section>
    </main>
  );
}
