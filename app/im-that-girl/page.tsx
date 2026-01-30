"use client";

import React, { use } from "react";
import "../globals.css";
import "./style.css";
import { useState, useEffect } from "react";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";

declare global {
  interface Window {
    adjacentTimeouts: NodeJS.Timeout[];
  }
}

const Cozy: React.FC = () => {
  const [activeOutfit, setActiveOutfit] = useState<number>(0);

  const outfits = [
    {
      brand: "Marni",
      image: "/images/im-that-girl/1.webp",
    },
    {
      brand: "DUNDAS",
      image: "/images/im-that-girl/2.webp",
    },
    {
      brand: "Mugler",
      image: "/images/im-that-girl/3.webp",
    },
    {
      brand: "Alexander McQueen",
      image: "/images/im-that-girl/4.webp",
    },
    {
      brand: "Gareth Pugh",
      image: "/images/im-that-girl/5.webp",
    },
    {
      brand: "Situationist x Yaspis",
      image: "/images/im-that-girl/6.webp",
    },
    {
      brand: "BOSS",
      image: "/images/im-that-girl/7.webp",
    },
  ];
  useEffect(() => {
    const scrollItemsLines = document.querySelector(
      "#scrollItemsLines",
    ) as HTMLElement;
    const openingP = document.querySelector("#openingP") as HTMLElement;

    setup();
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

      const openingPText = openingP.innerText;
      openingP.innerHTML = "";
      const openingPWords = openingPText.split(" ");
      openingPWords.forEach((word) => {
        const span = document.createElement("span");
        span.innerText = word + " ";
        openingP.appendChild(span);
      });
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
        var scaleImage = document.querySelector("#scaleImage") as HTMLElement;
        var container = document.querySelector("#intro") as HTMLElement;
        var containerHeight = container.getBoundingClientRect().height;
        //const offset = window.innerHeight * 0.4;
        const offset = 0;
        const path = container.getBoundingClientRect().top - offset;
        const end = containerHeight - offset;
        const textBgs = document.querySelectorAll(
          "#textBg h2",
        ) as NodeListOf<HTMLElement>;
        const openingPs = document.querySelectorAll(
          "#openingP span",
        ) as NodeListOf<HTMLElement>;

        if (path >= 0) {
          scaleImage.style.height = "40vh";
        }
        if (path < 0 && path > -end) {
          var progress = path / -end;

          if (progress < 0.2) {
            scaleImage.style.height = `${40 - progress * 200}vh`;
          } else if (progress > 0.2) {
            scaleImage.style.height = `0vh`;
          }

          openingPs.forEach((item, i) => {
            const ratio = Math.max(
              0,
              Math.min(
                1,
                (-path - (end * 0.2 * i) / textBgs.length) / (end * 0.5),
              ),
            );
            openingPs[openingPs.length - 1 - i].style.display =
              ratio > 0.5 ? "inline" : "none";
            openingPs[openingPs.length - 1 - i].style.opacity = `${ratio}`;
          });

          textBgs.forEach((item, i) => {
            const textBgItem = textBgs[textBgs.length - 1 - i] as HTMLElement;
            const ratio = Math.max(
              0,
              Math.min(
                1,
                (-path - (end * 1 * i) / textBgs.length) / (end * 0.5),
              ),
            );
            const adjRatio = easeInOutQuint(ratio);
            if (i > 0 && adjRatio > 0) {
              const textBgItems = textBgItem.querySelectorAll(
                "span",
              ) as NodeListOf<HTMLElement>;
              const randomIndices = Array.from(
                { length: textBgItems.length },
                (_, i) => i,
              ).sort(() => Math.random() - 0.5);
              textBgItems.forEach((item) => {
                if (item.dataset.timeoutId) {
                  clearTimeout(Number(item.dataset.timeoutId));
                }
              });
              randomIndices.forEach((index, i) => {
                const timeoutId = setTimeout(() => {
                  textBgItems[index].style.opacity = "0";
                }, i * 20); // Adjust the delay as needed
                textBgItems[index].dataset.timeoutId = String(timeoutId);
              });
            } else if (i > 0 && adjRatio <= 0) {
              const textBgItems = textBgItem.querySelectorAll(
                "span",
              ) as NodeListOf<HTMLElement>;
              const randomIndices = Array.from(
                { length: textBgItems.length },
                (_, i) => i,
              ).sort(() => Math.random() - 0.5);
              textBgItems.forEach((item) => {
                if (item.dataset.timeoutId) {
                  clearTimeout(Number(item.dataset.timeoutId));
                }
              });
              randomIndices.forEach((index, i) => {
                const timeoutId = setTimeout(() => {
                  textBgItems[index].style.opacity = "1";
                }, i * 10); // Adjust the delay as needed
                textBgItems[index].dataset.timeoutId = String(timeoutId);
              });
            }
          });
        }
        if (path <= -end) {
          scaleImage.style.height = "0vh";
          textBgs.forEach((item) => {
            const textBgItems = item.querySelectorAll(
              "span",
            ) as NodeListOf<HTMLElement>;
            textBgItems.forEach((item) => {
              if (item.dataset.timeoutId) {
                clearTimeout(Number(item.dataset.timeoutId));
              }
            });
            textBgItems.forEach((item) => {
              item.style.opacity = "0";
            });
          });
        }
      }

      section2();
      function section2() {
        const scroll = document.querySelector("#scroll-section") as HTMLElement;
        const scrollContainer = document.querySelector(
          "#scroll-container",
        ) as HTMLElement;
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
          const end = start + 600; //width of item goes here
          const approaching = start - 600; //change on resize
          const leaving = end + 600; //change on resize
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
            var progress = Math.min(
              (scrollProgress - approaching) / (start - approaching),
              1,
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
            var progress = Math.min(
              (scrollProgress - end) / (leaving - end),
              1,
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

      section3();
      function section3() {
        const outro = document.querySelector("#outro") as HTMLElement;
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

        const topHeight = 100 - scrollProgress * 100;
        const bottomHeight = scrollProgress * 100;

        topWindow.style.height = `calc(${topHeight}%`;
        bottomWindow.style.height = `calc(${bottomHeight}%`;
        shades[0].style.opacity = `${scrollProgress}`;
        topFilter.style.opacity = `${scrollProgress}`;
        topFilter.style.filter = `blur(20px) brightness(${1 + scrollProgress})`;
        shades[1].style.opacity = `${1 - scrollProgress}`;
        bottomFilter.style.opacity = `${1 - scrollProgress}`;
        bottomFilter.style.filter = `blur(20px) brightness(${
          2 - scrollProgress
        })`;
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
      <Nav />
      <div className="fixed top-0 left-0 w-screen h-screen flex flex-col justify-start items-stretch overflow-hidden text-white">
        <div
          id="textBg"
          className="h-screen w-screen flex flex-col justify-start items-center text-white opacity-20"
        ></div>
      </div>
      <section id="intro" className="h-[200vh] w-screen relative text-white">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="sticky left-0 top-[30vh] mt-[70vh] mb-[10vh] w-full flex flex-col items-center gap-8 text-center min-h-[300px]">
            <h1 className="">1. I'M THAT GIRL</h1>
            <p
              id="openingP"
              className="sticky top-0 text-[rgba(255,255,255,0.8)] text-center max-w-[400px]"
            >
              I pull up in these clothes, look so good 'Cause I'm in that ho You
              know all these songs sound good 'Cause I'm on that ho Deadass
              Deadass I'm deadass. I pull up in these clothes, look so good
              'Cause I'm in that ho You know all these songs sound good 'Cause
              I'm on that ho Deadass Deadass I'm deadass
            </p>
          </div>
        </div>
        <div
          id="scaleImage"
          className="sticky left-[30vw] top-[30vh] w-[40vw] h-[40vh] grid overflow-hidden"
          style={{ gridTemplateColumns: "1fr 1fr" }}
        >
          <img
            src="/images/im-that-girl/stare.webp"
            alt=""
            className="h-[40vh] w-full object-cover"
          />
          <img
            src="/images/im-that-girl/pose.webp"
            alt=""
            className="h-[40vh] w-full object-cover"
          />
        </div>
      </section>
      <section id="scroll-section" className="h-[400vh]">
        <div className="sticky top-0 h-0">
          <div className="py-4 flex flex-col items-center justify-between h-screen">
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
                <div className="transform">
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
                <div className="transform">
                  <img
                    src={outfit.image}
                    alt={outfit.brand}
                    className="h-[80vh] w-auto object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
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
      <Footer />
    </main>
  );
};

export default Cozy;
