"use client";

import { useEffect } from "react";

function easeInOutQuint(t: number) {
  t /= 0.5;
  if (t < 1) return 0.5 * Math.pow(t, 5);
  t -= 2;
  return 0.5 * (Math.pow(t, 5) + 2);
}

export default function IntroSection() {
  useEffect(() => {
    const openingP = document.querySelector("#openingP") as HTMLElement;
    const scaleImage = document.querySelector("#scaleImage") as HTMLElement;
    const textBgs = document.querySelectorAll(
      "#textBg h2",
    ) as NodeListOf<HTMLElement>;

    if (!openingP) return;

    // Setup opening text spans
    const openingPText = openingP.innerText;
    openingP.innerHTML = "";
    const openingPWords = openingPText.split(" ");
    openingPWords.forEach((word) => {
      const span = document.createElement("span");
      span.innerText = word + " ";
      openingP.appendChild(span);
    });

    function animateIntro() {
      const container = document.querySelector("#intro") as HTMLElement;
      if (!container || !scaleImage) return;

      const containerHeight = container.getBoundingClientRect().height;
      const offset = 0;
      const path = container.getBoundingClientRect().top - offset;
      const end = containerHeight - offset;
      const openingPs = document.querySelectorAll(
        "#openingP span",
      ) as NodeListOf<HTMLElement>;

      if (path >= 0) {
        scaleImage.style.height = "40vh";
      }
      if (path < 0 && path > -end) {
        const progress = path / -end;

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
            Math.min(1, (-path - (end * 1 * i) / textBgs.length) / (end * 0.5)),
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
              }, i * 20);
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
              }, i * 10);
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

    function handleScroll() {
      if (typeof handleScroll.throttled === "undefined") {
        handleScroll.throttled = false;
      }
      if (!handleScroll.throttled) {
        handleScroll.throttled = true;
        requestAnimationFrame(() => {
          animateIntro();
          handleScroll.throttled = false;
        });
      }
    }

    handleScroll.throttled = false;

    animateIntro();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
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
            Deadass I'm deadass. I pull up in these clothes, look so good 'Cause
            I'm in that ho You know all these songs sound good 'Cause I'm on
            that ho Deadass Deadass I'm deadass
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
  );
}
