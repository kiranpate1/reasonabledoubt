"use client";

import { useState, useEffect } from "react";

type Outfit = {
  brand: string;
  image: string;
};

type Props = {
  outfits: Outfit[];
  activeOutfit: number;
  setActiveOutfit: (index: number) => void;
};

function easeInOutQuint(t: number) {
  t /= 0.5;
  if (t < 1) return 0.5 * Math.pow(t, 5);
  t -= 2;
  return 0.5 * (Math.pow(t, 5) + 2);
}

export default function ScrollGallerySection({
  outfits,
  activeOutfit,
  setActiveOutfit,
}: Props) {
  useEffect(() => {
    const container = document.querySelector("main") as HTMLElement;
    let containerHalf = container.getBoundingClientRect().width / 4;
    const containerItems = document.querySelectorAll(
      "#scrollItems > div",
    ) as NodeListOf<HTMLElement>;
    const containerItemsLines = document.querySelectorAll(
      "#scrollItemsLines > div",
    ) as NodeListOf<HTMLElement>;
    const selectorsAll = document.querySelectorAll(
      ".selector",
    ) as NodeListOf<HTMLElement>;
    const scrollItemsLines = document.querySelector(
      "#scrollItemsLines",
    ) as HTMLElement;

    let containerItemsLeft: number[] = [];

    for (let i = 0; i < containerItems.length; i++) {
      const itemLeft = containerItems[i].getBoundingClientRect().left;
      const itemCenter = itemLeft - containerHalf;
      containerItemsLeft.push(itemCenter);
    }

    function handleResize() {
      containerHalf = container.getBoundingClientRect().width / 4;
      handleScroll();
    }

    function handleScroll() {
      if (typeof handleScroll.throttled === "undefined") {
        handleScroll.throttled = false;
      }
      if (!handleScroll.throttled) {
        handleScroll.throttled = true;
        requestAnimationFrame(() => {
          animateScroll();
          handleScroll.throttled = false;
        });
      }
    }

    handleScroll.throttled = false;

    function animateScroll() {
      const scroll = document.querySelector("#scroll-section") as HTMLElement;
      const scrollContainer = document.querySelector(
        "#scroll-container",
      ) as HTMLElement;

      if (!scroll || !scrollContainer || !scrollItemsLines) return;

      const scrollHeight = scroll.getBoundingClientRect().height;
      const scrollTop = window.scrollY;
      const scrollStart = scroll.offsetTop - window.innerHeight;
      const scrollEnd = scrollStart + scrollHeight + window.innerHeight;
      const scrollProgress =
        Math.max(
          0,
          Math.min((scrollTop - scrollStart) / (scrollEnd - scrollStart), 1),
        ) * scrollItemsLines.getBoundingClientRect().width;

      scrollContainer.scrollLeft = scrollProgress - containerHalf;

      containerItems.forEach((item, i) => {
        const transformElm = item.querySelector(".transform") as HTMLElement;
        const transformLinesElm = containerItemsLines[i].querySelector(
          ".transform",
        ) as HTMLElement;
        const img = transformElm.querySelector(
          ".transform img",
        ) as HTMLImageElement;
        const start = containerItemsLeft[i] + 300;
        const end = start + 600;
        const approaching = start - 600;
        const leaving = end + 600;
        const translateZ = 1000;
        const rotateY = 30 * 2;
        const saturate = 1;

        //before
        if (scrollProgress < approaching) {
          const toTransform = [transformElm, transformLinesElm];

          toTransform.forEach((elm) => {
            elm.style.transform = `translateX(100%) translateZ(${-translateZ}px) rotateY(0deg)`;
          });

          img.style.filter = `saturate(${1 - saturate})`;
          selectorsAll[i].style.backgroundColor = "black";
        }
        //approaching
        if (scrollProgress > approaching && scrollProgress <= start) {
          const progress = Math.min(
            (scrollProgress - approaching) / (start - approaching),
            1,
          );
          const ease = easeInOutQuint(progress);
          if (progress < 0.5) {
            const toTransform = [transformElm, transformLinesElm];

            toTransform.forEach((elm) => {
              elm.style.transformOrigin = `${100 - ease * 100}% center`;
              elm.style.transform = `translateX(${
                100 - ease * 50
              }%) translateZ(${-translateZ + ease * translateZ}px) rotateY(${
                progress * rotateY
              }deg)`;
            });

            img.style.filter = `saturate(${ease * saturate})`;
          } else if (progress > 0.5) {
            const toTransform = [transformElm, transformLinesElm];

            toTransform.forEach((elm) => {
              elm.style.transformOrigin = `${100 - ease * 100}% center`;
              elm.style.transform = `translateX(${
                100 - ease * 50
              }%) translateZ(${-translateZ + ease * translateZ}px) rotateY(${
                rotateY - progress * rotateY
              }deg)`;
            });

            img.style.filter = `saturate(${ease * saturate})`;
          }
          selectorsAll[i].style.backgroundColor = "black";
        }
        //inside
        if (scrollProgress > start && scrollProgress < end) {
          setActiveOutfit(i);
          const toTransform = [transformElm, transformLinesElm];

          toTransform.forEach((elm) => {
            elm.style.transform = `translateX(50%) translateZ(0px) rotateY(0deg)`;
          });

          img.style.filter = "saturate(1)";
          selectorsAll[i].style.backgroundColor = "white";
        }
        //leaving
        if (scrollProgress >= end && scrollProgress < leaving) {
          const progress = Math.min(
            (scrollProgress - end) / (leaving - end),
            1,
          );
          const ease = easeInOutQuint(progress);
          if (progress < 0.5) {
            const toTransform = [transformElm, transformLinesElm];

            toTransform.forEach((elm) => {
              elm.style.transformOrigin = `${100 - ease * 100}% center`;
              elm.style.transform = `translateX(${
                50 + ease * 50
              }%) translateZ(${0 - ease * translateZ}px) rotateY(${
                -progress * rotateY
              }deg)`;
            });

            img.style.filter = `saturate(${saturate - ease * saturate})`;
          } else if (progress > 0.5) {
            const toTransform = [transformElm, transformLinesElm];

            toTransform.forEach((elm) => {
              elm.style.transformOrigin = `${100 - ease * 100}% center`;
              elm.style.transform = `translateX(${
                50 + ease * 50
              }%) translateZ(${0 - ease * translateZ}px) rotateY(${
                -rotateY + progress * rotateY
              }deg)`;
            });

            img.style.filter = `saturate(${saturate - ease * saturate})`;
          }
          selectorsAll[i].style.backgroundColor = "black";
        }
        //after
        if (scrollProgress > leaving) {
          const toTransform = [transformElm, transformLinesElm];

          toTransform.forEach((elm) => {
            elm.style.transform = `translateX(100%) translateZ(${-translateZ}px) rotateY(0deg)`;
          });

          img.style.filter = `saturate(${1 - saturate})`;
          selectorsAll[i].style.backgroundColor = "black";
        }
      });
    }

    animateScroll();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [setActiveOutfit]);

  return (
    <section id="scroll-section" className="h-[400vh]">
      <div className="sticky top-0 h-0">
        <div className="pt-4 pb-6 flex flex-col items-center justify-between h-screen">
          <div className="selectors flex gap-0 items-start w-max mx-auto mb-4 border-[0.5px] border-[#787878]">
            {outfits.map((outfit, i) => (
              <div
                key={i}
                className="selector w-1.5 h-1.5 border-[0.5px] border-[#787878] bg-black"
              ></div>
            ))}
          </div>
          <div className="detail text-center text-white">
            {outfits[activeOutfit]?.brand.toUpperCase()}
          </div>
        </div>
      </div>
      <div
        id="scroll-container"
        className="sticky top-0 left-0 w-screen h-screen overflow-hidden"
      >
        <div
          id="scrollItemsLines"
          className="scroll-items absolute h-full flex items-center py-0 px-[100vw] overflow-hidden"
        >
          {outfits.map((outfit, i) => (
            <div key={i} className="relative">
              <div className="transform max-h-[80vh]">
                <div className="line-left"></div>
                <div className="line-right"></div>
                <div className="line-top"></div>
                <div className="line-bottom"></div>
              </div>
            </div>
          ))}
        </div>
        <div
          id="scrollItems"
          className="scroll-items absolute h-full flex items-center py-0 px-[100vw]"
        >
          <h1 className="absolute z-10 top-0 left-0 w-screen h-screen text-right text-white">
            It's not the
            <br />
            diamonds,
          </h1>
          <h1 className="absolute z-10 top-0 right-0 w-screen h-screen text-left text-white">
            It's not the
            <br />
            pearls.
          </h1>
          {outfits.map((outfit, i) => (
            <div key={i} className="relative">
              <div className="transform flex items-center justify-center">
                <img
                  src={outfit.image}
                  alt={outfit.brand}
                  className="max-h-[calc(80vh-2px)] w-auto object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
