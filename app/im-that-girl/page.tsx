"use client";

import React, { use } from "react";
import "../globals.css";
import "./style.css";
import { useEffect } from "react";
import { text } from "stream/consumers";
import { split } from "postcss/lib/list";

declare global {
  interface Window {
    adjacentTimeouts: NodeJS.Timeout[];
  }
}

const Cozy: React.FC = () => {
  useEffect(() => {
    setup();

    const container = document.querySelector("main") as HTMLElement;
    let containerHalf = container.getBoundingClientRect().width / 4;
    const containerItems = document.querySelectorAll(
      "#scrollItems > div"
    ) as NodeListOf<HTMLElement>;
    const containerItemsLines = document.querySelectorAll(
      "#scrollItemsLines > div"
    ) as NodeListOf<HTMLElement>;
    const selectors = document.querySelector(".selectors") as HTMLElement;
    const h1 = document.querySelector("h1") as HTMLElement;

    containerItems.forEach((item, i) => {
      const selector = document.createElement("div") as HTMLElement;
      selector.classList.add("selector");
      selectors.appendChild(selector);
    });
    const selectorsAll = document.querySelectorAll(
      ".selector"
    ) as NodeListOf<HTMLElement>;
    let containerItemsLeft: number[] = [];

    for (let i = 0; i < containerItems.length; i++) {
      var itemLeft = containerItems[i].getBoundingClientRect().left;
      var itemCenter = itemLeft - containerHalf;

      containerItemsLeft.push(itemCenter);
    }

    function setup() {
      const phrases = [
        "please, motherfuckers ain't stop—, please, motherfuckers, ",
        "please, mother—, please, mother—, please, motherfuckers, ",
        "please-please, mother—, please, mother—, please, mother—, please, mother—",
        "please, motherfuckers, please, mother—, please, mother—",
        "please-please, mothеrfuckers ain't stoppin' me, ",
        "please, motherfuckers ain't stoppin' me, ",
      ];
      const textBg = document.querySelector("#textBg") as HTMLElement;
      for (let i = 0; i < 40; i++) {
        const h2 = document.createElement("h2") as HTMLElement;
        h2.classList.add("whitespace-nowrap", "min-w-[200vw]", "text-center");
        const text =
          phrases[Math.floor(Math.random() * phrases.length)] +
          phrases[Math.floor(Math.random() * phrases.length)];
        const textSplit = text.split(" ");

        for (let j = 0; j < textSplit.length; j++) {
          const span = document.createElement("span") as HTMLElement;
          span.innerHTML = " " + textSplit[j];
          h2.appendChild(span);
        }
        textBg.appendChild(h2);
      }

      const scrollItems = document.querySelector("#scrollItems") as HTMLElement;

      for (let i = 1; i < 8; i++) {
        const div = document.createElement("div") as HTMLElement;
        const transform = document.createElement("div") as HTMLElement;
        transform.classList.add("transform");
        const img = document.createElement("img") as HTMLImageElement;
        img.src = `/images/im-that-girl/${i}.webp`;
        transform.appendChild(img);
        div.appendChild(transform);
        scrollItems.appendChild(div);
      }

      const scrollItemsLines = document.querySelector(
        "#scrollItemsLines"
      ) as HTMLElement;

      for (let i = 1; i < 8; i++) {
        const div = document.createElement("div") as HTMLElement;
        const transform = document.createElement("div") as HTMLElement;
        transform.classList.add("transform");
        const lineLeft = document.createElement("div") as HTMLElement;
        lineLeft.classList.add("line-left");
        const lineRight = document.createElement("div") as HTMLElement;
        lineRight.classList.add("line-right");
        const lineTop = document.createElement("div") as HTMLElement;
        lineTop.classList.add("line-top");
        const lineBottom = document.createElement("div") as HTMLElement;
        lineBottom.classList.add("line-bottom");
        transform.appendChild(lineLeft);
        transform.appendChild(lineRight);
        transform.appendChild(lineTop);
        transform.appendChild(lineBottom);
        div.appendChild(transform);
        scrollItemsLines.appendChild(div);
      }
    }

    //animate
    function handleAnimateIntroResize() {
      containerHalf = container.getBoundingClientRect().width / 4;

      handleAnimateIntroScroll();
    }

    function handleAnimateIntroScroll() {
      if (typeof handleAnimateIntroScroll.throttled === "undefined") {
        handleAnimateIntroScroll.throttled = false;
      }
      if (!handleAnimateIntroScroll.throttled) {
        handleAnimateIntroScroll.throttled = true;
        requestAnimationFrame(() => {
          animateIntro();
          handleAnimateIntroScroll.throttled = false;
        });
      }
    }

    handleAnimateIntroScroll.throttled = false;

    function animateIntro() {
      section1();
      function section1() {
        var container = document.querySelector("#intro") as HTMLElement;
        var containerHeight = container.getBoundingClientRect().height;
        //const offset = window.innerHeight * 0.4;
        const offset = 0;
        const path = container.getBoundingClientRect().top - offset;
        const end = containerHeight - offset;
        const textBgs = document.querySelectorAll(
          "#textBg h2"
        ) as NodeListOf<HTMLElement>;

        if (path >= 0) {
        }
        if (path < 0 && path > -end) {
          var progress = path / -end;

          textBgs.forEach((item, i) => {
            const textBgItem = textBgs[textBgs.length - i] as HTMLElement;
            const ratio = Math.max(
              0,
              Math.min(
                1,
                (-path - (end * 1 * i) / textBgs.length) / (end * 0.5)
              )
            );
            const adjRatio = easeInOutQuint(ratio);
            if (i > 0 && adjRatio > 0) {
              const textBgItems = textBgItem.querySelectorAll(
                "span"
              ) as NodeListOf<HTMLElement>;
              const randomIndices = Array.from(
                { length: textBgItems.length },
                (_, i) => i
              ).sort(() => Math.random() - 0.5);
              textBgItems.forEach((item) => {
                if (item.dataset.timeoutId) {
                  clearTimeout(Number(item.dataset.timeoutId));
                }
              });
              randomIndices.forEach((index, i) => {
                const timeoutId = setTimeout(() => {
                  textBgItems[index].style.opacity = "0";
                }, i * 100); // Adjust the delay as needed
                textBgItems[index].dataset.timeoutId = String(timeoutId);
              });
            } else if (i > 0 && adjRatio <= 0) {
              const textBgItems = textBgItem.querySelectorAll(
                "span"
              ) as NodeListOf<HTMLElement>;
              const randomIndices = Array.from(
                { length: textBgItems.length },
                (_, i) => i
              ).sort(() => Math.random() - 0.5);
              textBgItems.forEach((item) => {
                if (item.dataset.timeoutId) {
                  clearTimeout(Number(item.dataset.timeoutId));
                }
              });
              randomIndices.forEach((index, i) => {
                const timeoutId = setTimeout(() => {
                  textBgItems[index].style.opacity = "0.2";
                }, i * 20); // Adjust the delay as needed
                textBgItems[index].dataset.timeoutId = String(timeoutId);
              });
            }
          });
        }
        if (path <= -end) {
        }
      }

      section2();
      function section2() {
        const scroll = document.querySelector("#scroll-section") as HTMLElement;
        const scrollContainer = document.querySelector(
          "#scroll-container"
        ) as HTMLElement;
        const scrollHeight = scroll.getBoundingClientRect().height;
        const scrollTop = window.scrollY;
        const scrollStart = scroll.offsetTop - window.innerHeight;
        const scrollEnd = scrollStart + scrollHeight - window.innerHeight;
        const scrollProgress =
          Math.max(
            0,
            Math.min((scrollTop - scrollStart) / (scrollEnd - scrollStart), 1)
          ) * 5600;

        scrollContainer.scrollLeft = scrollProgress - containerHalf;

        containerItems.forEach((item, i) => {
          const transformElm = item.querySelector(".transform") as HTMLElement;
          const transformLinesElm = containerItemsLines[i].querySelector(
            ".transform"
          ) as HTMLElement;
          const img = transformElm.querySelector(
            ".transform img"
          ) as HTMLImageElement;
          const start = containerItemsLeft[i] + 300;
          const end = start + 600; //width of item goes here
          const approaching = start - 300; //change on resize
          const leaving = end + 300; //change on resize
          const translateZ = 1000;
          const rotateY = 30 * 2;
          const blur = 1;

          //before
          if (scrollProgress < approaching) {
            transformElm.style.transform = `translateX(100%) translateZ(${-translateZ}px) rotateY(0deg)`;
            img.style.filter = `brightness(${1 - blur})`;
            selectorsAll[i].style.opacity = "0.25";
          }
          //approaching
          if (scrollProgress > approaching && scrollProgress <= start) {
            var progress = Math.min(
              (scrollProgress - approaching) / (start - approaching),
              1
            );
            var ease = easeInOutQuint(progress);
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

              img.style.filter = `brightness(${ease * blur})`;
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

              img.style.filter = `brightness(${ease * blur})`;
            }
            selectorsAll[i].style.opacity = "0.25";
          }
          //inside
          if (scrollProgress > start && scrollProgress < end) {
            const toTransform = [transformElm, transformLinesElm];

            toTransform.forEach((elm) => {
              elm.style.transform = `translateX(50%) translateZ(0px) rotateY(0deg)`;
            });

            img.style.filter = "brightness(1)";
            selectorsAll[i].style.opacity = "1";
          }
          //leaving
          if (scrollProgress >= end && scrollProgress < leaving) {
            var progress = Math.min(
              (scrollProgress - end) / (leaving - end),
              1
            );
            var ease = easeInOutQuint(progress);
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

              img.style.filter = `brightness(${blur - ease * blur})`;
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

              img.style.filter = `brightness(${blur - ease * blur})`;
            }
            selectorsAll[i].style.opacity = "0.25";
          }
          //after
          if (scrollProgress > leaving) {
            const toTransform = [transformElm, transformLinesElm];

            toTransform.forEach((elm) => {
              elm.style.transform = `translateX(100%) translateZ(${-translateZ}px) rotateY(0deg)`;
            });

            img.style.filter = `brightness(${1 - blur})`;
            selectorsAll[i].style.opacity = "0.25";
          }
        });
      }
    }

    //easing

    function easeInOutQuint(t: number) {
      t /= 0.5;
      if (t < 1) return 0.5 * Math.pow(t, 5);
      t -= 2;
      return 0.5 * (Math.pow(t, 5) + 2);
    }

    function easeInQuad(t: number) {
      return t * t;
    }

    //listeners
    animateIntro();
    window.addEventListener("scroll", handleAnimateIntroScroll);
    window.addEventListener("resize", handleAnimateIntroResize, {
      passive: true,
    });
  }, []);
  return (
    <main>
      <div className="fixed top-0 left-0 w-screen h-screen flex flex-col justify-start items-stretch overflow-hidden text-white">
        <div
          id="textBg"
          className="h-screen w-screen flex flex-col justify-start items-center text-white"
        ></div>
      </div>
      <section
        id="intro"
        className="h-[300vh] w-screen relative text-white"
      ></section>
      <section id="scroll-section" className="h-[400vh]">
        <div
          id="scroll-container"
          className="sticky top-0 left-0 w-screen h-screen overflow-hidden"
        >
          <div className="selectors"></div>
          <div
            id="scrollItemsLines"
            className="scroll-items absolute h-full flex items-center py-0 px-[100vw]"
          ></div>
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
          </div>
        </div>
      </section>
      <section
        id="outro"
        className="h-[300vh] w-screen relative text-white"
      ></section>
    </main>
  );
};

export default Cozy;
