"use client";

import { useEffect } from "react";

export default function OutroSection() {
  useEffect(() => {
    function animateOutro() {
      const outro = document.querySelector("#outro") as HTMLElement;
      if (!outro) return;

      const outroHeight = outro.getBoundingClientRect().height;
      const scrollTop = window.scrollY;
      const scrollStart = outro.offsetTop;
      const scrollEnd = scrollStart + outroHeight - window.innerHeight;
      const scrollProgress = Math.max(
        0,
        Math.min((scrollTop - scrollStart) / (scrollEnd - scrollStart), 1),
      );

      const topWindow = document.querySelector(".window.top") as HTMLElement;
      const bottomWindow = document.querySelector(
        ".window.bottom",
      ) as HTMLElement;
      const topFilter = document.querySelector(".top .filter") as HTMLElement;
      const bottomFilter = document.querySelector(
        ".bottom .filter",
      ) as HTMLElement;
      const shades = document.querySelectorAll(
        ".shade",
      ) as NodeListOf<HTMLElement>;

      if (!topWindow || !bottomWindow) return;

      const topHeight = 100 - scrollProgress * 100;
      const bottomHeight = scrollProgress * 100;

      topWindow.style.height = `calc(${topHeight}%`;
      bottomWindow.style.height = `calc(${bottomHeight}%`;
      shades[0].style.opacity = `${scrollProgress}`;
      topFilter.style.opacity = `${scrollProgress}`;
      topFilter.style.filter = `blur(20px) brightness(${1 + scrollProgress})`;
      shades[1].style.opacity = `${1 - scrollProgress}`;
      bottomFilter.style.opacity = `${1 - scrollProgress}`;
      bottomFilter.style.filter = `blur(20px) brightness(${2 - scrollProgress})`;
    }

    function handleScroll() {
      if (typeof handleScroll.throttled === "undefined") {
        handleScroll.throttled = false;
      }
      if (!handleScroll.throttled) {
        handleScroll.throttled = true;
        requestAnimationFrame(() => {
          animateOutro();
          handleScroll.throttled = false;
        });
      }
    }

    handleScroll.throttled = false;

    animateOutro();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section
      id="outro"
      className="relative h-[200vh] w-screen text-white bg-black"
    >
      <div className="scroll-window sticky top-0 w-full h-[100vh] overflow-hidden flex flex-col items-stretch justify-center">
        <div className="relative w-full bg-[#E30404] h-[7vw]">
          <div className="shade absolute inset-0 bg-black"></div>
          <h1 className="relative">Test 1</h1>
        </div>
        <div className="relative flex-1 w-full">
          <div className="window top absolute flex flex-col items-stretch w-full overflow-hidden top-0 justify-start h-full">
            <img
              className="absolute w-full min-h-screen max-h-screen object-cover top-0"
              src="/images/im-that-girl/first.jpg"
            />
            <img
              className="filter absolute flex flex-col items-stretch w-full overflow-hidden top-0 justify-start h-full min-h-screen max-h-screen object-cover saturate-[4] mix-blend-color-dodge blur-lg opacity-0"
              style={{
                WebkitMaskImage:
                  "linear-gradient(to bottom, black 0%, transparent 100%)",
                maskImage:
                  "linear-gradient(to bottom, black 0%, transparent 100%)",
              }}
              src="/images/im-that-girl/first.jpg"
            />
          </div>
          <div className="window bottom absolute flex flex-col items-stretch w-full overflow-hidden bottom-0 justify-end h-0">
            <img
              className="absolute w-full min-h-[calc(100vh-14vw)] max-h-[calc(100vh-14vw)] object-cover bottom-0"
              src="/images/im-that-girl/second.jpg"
            />
            <img
              className="filter absolute flex flex-col items-stretch w-full overflow-hidden bottom-0 justify-end h-0 min-h-[calc(100vh-14vw)] max-h-[calc(100vh-14vw)] object-cover saturate-[4] mix-blend-color-dodge blur-lg opacity-100"
              style={{
                WebkitMaskImage:
                  "linear-gradient(to top, black 0%, transparent 100%)",
                maskImage:
                  "linear-gradient(to top, black 0%, transparent 100%)",
              }}
              src="/images/im-that-girl/second.jpg"
            />
          </div>
        </div>
        <div className="relative w-full bg-[#0EAA51] h-[7vw]">
          <div className="shade absolute inset-0 bg-black"></div>
          <h1 className="relative">Test 1</h1>
        </div>
      </div>
    </section>
  );
}
