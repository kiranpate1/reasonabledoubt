"use client";

import Image from "next/image";
import { useEffect } from "react";

const trackList = [
  { name: "I'M THAT GIRL", src: "/images/home/1.png", color: "#fff" },
  { name: "COZY", src: "/images/home/2.png", color: "#F576C3" },
  { name: "ALIEN SUPERSTAR", src: "/images/home/8.png", color: "#67C8FB" },
  { name: "CUFF IT", src: "/images/home/10.png", color: "#713735" },
  { name: "ENERGY", src: "/images/home/4.png", color: "#000" },
  { name: "BREAK MY SOUL", src: "/images/home/17.png", color: "#E80000" },
  { name: "CHURCH GIRL", src: "/images/home/7.png", color: "#F05F04" },
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
  { name: "BROKEN", src: "/images/home/18.png", color: "#E80000" },
  { name: "FREAKY", src: "/images/home/19.png", color: "#F05F04" },
  { name: "SWEET", src: "/images/home/15.png", color: "#F9D608" },
];

export default function Home(props: typeof trackList) {
  const maxWidth = 17;

  useEffect(() => {
    const scrollImages = document.getElementById("scrollImages") as HTMLElement;
    const images = document.querySelectorAll(
      "#scrollImages > div"
    ) as NodeListOf<HTMLElement>;
    const lines = document.querySelectorAll(
      "#scrollLines > div"
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

      if (window.scrollY < scrollTrack.offsetTop) {
        const scrollProgress = Math.min(
          window.scrollY / scrollTrack.offsetTop,
          1
        );
        scrollImages.style.transform = `scaleY(${easeInQuad(scrollProgress)})`;
        animateImages(-3 + 3 * scrollProgress);
        for (let i = 0; i < trackList.length; i++) {
          const image = images[i] as HTMLElement;
          const imageImg = images[i].querySelector("img") as HTMLElement;
          image.style.transitionDelay = `${(trackList.length - i + 1) * 0.01}s`;
          image.style.backgroundColor = trackList[i].color;
          imageImg.style.transitionDelay = `${
            (trackList.length - i + 1) * 0.01
          }s`;
          imageImg.style.opacity = "0";
          imageImg.style.transform = `translate3d(0,0,0) scaleY(${
            3 - 2 * easeInQuad(scrollProgress)
          })`;
        }
      }
      if (
        window.scrollY > scrollTrack.offsetTop &&
        window.scrollY <
          scrollTrack.offsetTop + scrollTrack.scrollHeight - window.innerHeight
      ) {
        scrollImages.style.transform = `scaleY(1)`;
        for (let i = 0; i < trackList.length; i++) {
          const image = images[i] as HTMLElement;
          const imageImg = images[i].querySelector("img") as HTMLElement;
          image.style.transitionDelay = `${i * 0.01}s`;
          image.style.backgroundColor = "#000";
          imageImg.style.transitionDelay = `${i * 0.01}s`;
          imageImg.style.opacity = "1";
          imageImg.style.transform = `translate3d(0,0,0) scaleY(1)`;
          image.style.transform = `translate3d(0,0,0) skewX(0deg)`;
          imageImg.style.transform = `translate3d(0,0,0) skewX(0deg)`;
        }
        const scrollPercentage =
          (window.scrollY - scrollTrack.offsetTop) /
          (scrollTrack.scrollHeight - window.innerHeight);
        animateImages(scrollPercentage);
      }
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
              window.innerHeight -
              100),
          1
        );
        animateImages(1 + scrollProgress);
        for (let i = 0; i < trackList.length; i++) {
          const image = images[i] as HTMLElement;
          const imageImg = image.querySelector("img") as HTMLElement;
          image.style.transform = `translate3d(0,0,0) skewX(${
            scrollProgress * 90
          }deg)`;
          imageImg.style.transform = `translate3d(0,0,0) skewX(${
            -scrollProgress * 90
          }deg)`;
        }
        //animateImages(10);
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

    //   animateImages(easeInOut(cursorPercentage));
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
    <main className="w-screen flex flex-col row-start-2 items-center sm:items-start text-[#fff]">
      <section className="relative w-full h-screen">
        <h1>Renaissance</h1>
      </section>
      <section id="scrollTrack" className="relative w-screen h-[400vh]">
        <div className="relative z-10 pointer-events-none flex h-0 w-screen items-start">
          <div className="relative w-screen h-[500vh] top-[-100vh]">
            <div className="sticky top-0 w-screen min-h-screen flex items-start">
              <div
                id="scrollImages"
                className="absolute w-screen bottom-0 left-0 flex flex-row gap-[0px] pointer-events-auto origin-bottom"
              >
                {trackList.map((track, i) => (
                  <div
                    key={i}
                    className="h-[200px] relative overflow-hidden cursor-pointer"
                    style={{
                      transform: "translate3d(0,0,0)",
                      transition: "background-color 0.6s ease",
                    }}
                  >
                    <Image
                      className="w-full object-cover h-full"
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
            height: "calc(100% - 100vh)",
            borderTop: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          {trackList.map((track, index) => (
            <div
              key={index}
              className="relative h-full grid"
              style={{
                borderLeft: "0.5px solid rgba(255,255,255,0.1)",
                borderRight: "0.5px solid rgba(255,255,255,0.1)",
                gridTemplateRows: `repeat(${trackList.length}, 1fr)`,
              }}
            >
              <a
                className="overflow-hidden whitespace-nowrap"
                key={index}
                href={`/${track.name.toLowerCase().replace(/ /g, "-")}`}
                style={{ gridArea: `${index + 1} / 1 / span 1 / span 1` }}
              >
                {index + 1}.
                <br />
                {track.name}
              </a>
            </div>
          ))}
        </div>
      </section>
      <section className="relative w-full h-screen">
        <h1>Renaissance</h1>
      </section>
    </main>
  );
}
