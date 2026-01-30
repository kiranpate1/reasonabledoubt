"use client";

import { useEffect } from "react";

function easeInOut(t: number) {
  t /= 0.5;
  if (t < 1) return 0.5 * Math.pow(t, 5);
  t -= 2;
  return 0.5 * (Math.pow(t, 5) + 2);
}

function easeInQuad(t: number) {
  return t * t;
}

export default function CircleSection() {
  useEffect(() => {
    const images = document.querySelectorAll(
      ".images > div",
    ) as NodeListOf<HTMLElement>;
    const gradientBlur = document.querySelector(
      ".gradient-blur",
    ) as HTMLElement;
    const gradientBlurs = document.querySelectorAll(
      ".gradient-blur > div",
    ) as NodeListOf<HTMLElement>;
    const gradient = document.querySelector(".gradient") as HTMLElement;
    const gridSvg = document.querySelector(".hud svg") as SVGSVGElement;
    const gridPath = gridSvg.querySelector("path") as SVGPathElement;
    const labels = document.querySelectorAll(
      ".labels > div",
    ) as NodeListOf<HTMLElement>;

    if (!images.length || !gradientBlur || !gradient || !gridSvg || !gridPath)
      return;

    function animateCircle() {
      const container = document.querySelector(".circle") as HTMLElement;
      if (!container) return;

      const height = container.getBoundingClientRect().height;
      const offset = window.innerHeight * 0.4;
      const path = container.getBoundingClientRect().top - offset;
      const end = height - offset;

      let progress = 0;
      if (path >= 0) {
        progress = 0;
      } else if (path < 0 && path > -end) {
        progress = path / -end;

        labels.forEach((label, i) => {
          const ratio = Math.max(
            0,
            Math.min(
              1,
              (-path - (end * 0.4 * i) / labels.length) / (end * 0.3),
            ),
          );
          const adjRatio = easeInOut(ratio);

          labels[i].style.opacity = `${adjRatio}`;
          labels[i].style.filter = `blur(${5 - 5 * adjRatio}px)`;
        });
      } else if (path <= -end) {
        progress = 1;
      }

      applyPhase1(progress);
    }

    function applyPhase1(progress: number) {
      const progressInOut = easeInOut(progress);
      const progressIn = easeInQuad(progress);
      const amplitude = Math.sin(Math.PI * progressInOut);

      const imageDistance = 0.1 * Math.sin(Math.PI * easeInOut(progressIn));
      const filterDistance = 0.75 * Math.sin(Math.PI * progressInOut);
      images[0].style.filter = `contrast(${1.5 + filterDistance}) brightness(${
        1.5 + filterDistance
      })`;
      for (let i = 0; i < images.length; i++) {
        images[i].style.scale = `${1 + imageDistance}`;
        images[i].style.transform = `translate3d(0, 0, 0) translate(${
          Math.sin(2 - progressIn * 2) * (-6 + progressIn * 6)
        }%,${Math.cos(2 - progressIn * 2) * (6 - progressIn * 6)}%) rotateZ(${
          7 * Math.cos((progressInOut * Math.PI) / 2)
        }deg)`;
      }

      gradientBlur.style.width =
        progressIn < 3 / 5 ? `${progressIn * 100}%` : "50%";

      const bgDistance = 5 * amplitude;
      const bgDifference = progressIn * 100;
      const background = `radial-gradient(circle, rgba(255, 0, 0, 0) ${
        (bgDifference * 2) / 3 - bgDistance
      }%, rgba(255, 0, 255, 0.5) ${
        (bgDifference * 2) / 3 - bgDistance * 0.33
      }%, rgba(130, 52, 255, 0.67) ${
        (bgDifference * 2) / 3 - bgDistance * 0.67
      }%, rgba(0, 0, 0, 1) ${(bgDifference * 2) / 3}%)`;

      gradient.style.background = background;

      gridSvg.style.transform = `translate3d(0, 0, 0) translate(-50%,-50%) scale(${
        1 + imageDistance * 2
      })`;
      gridSvg.style.opacity = `${progressIn}`;

      for (let i = 0; i < gradientBlurs.length; i++) {
        const distance =
          (100 / gradientBlurs.length) *
          Math.sin(Math.PI * ((progressIn * 5) / 3));
        const difference = distance * (gradientBlurs.length - 1 - i);
        const start = 100 - difference - distance;
        const end = 100 - difference;
        const mask =
          progressIn < 3 / 5
            ? `radial-gradient(circle, rgba(0, 0, 0, 0) ${start}%, rgba(0, 0, 0, 1) ${end}%)`
            : `radial-gradient(circle, rgba(0, 0, 0, 0) 100%, rgba(0, 0, 0, 1) 100%)`;

        gradientBlurs[i].style.mask = mask;
        gradientBlurs[i].style.webkitMask = mask;
      }

      images[1].style.opacity = `${-1 + easeInOut(progress * 2)}`;
      images[1].style.filter = `contrast(1.5) brightness(1.5) hue-rotate(${
        50 - 125 * progress
      }deg)`;

      if (progressIn > 0.01) {
        gridPath.style.strokeDasharray = `${3000 - progressInOut * 2000}`;
        gridPath.style.strokeDashoffset = `${-2000 + progressInOut * 2000}`;
      }
    }

    function handleScroll() {
      if (typeof handleScroll.throttled === "undefined") {
        handleScroll.throttled = false;
      }
      if (!handleScroll.throttled) {
        handleScroll.throttled = true;
        requestAnimationFrame(() => {
          animateCircle();
          handleScroll.throttled = false;
        });
      }
    }

    handleScroll.throttled = false;

    animateCircle();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <section className="circle">
      <div className="phase1"></div>
      <div className="phase2"></div>
      <div className="sticky-img">
        <div className="images">
          <div className="image"></div>
          <div className="image-2"></div>
        </div>
        <div className="mask">
          <div className="gradient-blur">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
        <div className="mask darken">
          <div className="gradient"></div>
        </div>
        <div className="hud">
          <svg
            className="grid"
            viewBox="0 0 1002 1002"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M101 1V1001M201 1V1001M301 1V1001M401 1V1001M501 1V1001M601 1V1001M701 1V1001M801 1V1001M901 1V1001M1 901H1001M1 801H1001M1 701H1001M1 601H1001M1 501H1001M1 401H1001M1 301H1001M1 201H1001M1 101H1001M1 1V1001L1001 1001V1H1Z"
              stroke="rgba(132,198,255,0.5)"
              strokeWidth="1.5"
            />
          </svg>
        </div>
        <div className="detail">
          <div className="textbox"></div>
          <div className="textbox"></div>
          <div className="textbox"></div>
          <div className="labels">
            <div style={{ gridArea: "1 / 4 / 2 / 5" }}>150</div>
            <div style={{ gridArea: "1 / 5 / 2 / 6" }}>200</div>
            <div style={{ gridArea: "1 / 6 / 2 / 7" }}>250</div>
            <div style={{ gridArea: "1 / 7 / 2 / 8" }}>300</div>
            <div style={{ gridArea: "1 / 8 / 2 / 9" }}>350</div>
            <div
              style={{
                gridArea: "4 / 10 / 5 / 10",
                justifySelf: "end",
                transform: "translate(50%,-50%)",
              }}
            >
              50
            </div>
            <div
              style={{
                gridArea: "5 / 10 / 6 / 10",
                justifySelf: "end",
                transform: "translate(50%,-50%)",
              }}
            >
              100
            </div>
            <div
              style={{
                gridArea: "6 / 10 / 7 / 10",
                justifySelf: "end",
                transform: "translate(50%,-50%)",
              }}
            >
              150
            </div>
            <div
              style={{
                gridArea: "7 / 10 / 8 / 10",
                justifySelf: "end",
                transform: "translate(50%,-50%)",
              }}
            >
              200
            </div>
            <div
              style={{
                gridArea: "8 / 10 / 9 / 10",
                justifySelf: "end",
                transform: "translate(50%,-50%)",
              }}
            >
              250
            </div>
            <div
              style={{
                gridArea: "10 / 8 / 10 / 9",
                alignSelf: "end",
                transform: "translate(-50%,50%)",
              }}
            >
              350
            </div>
            <div
              style={{
                gridArea: "10 / 7 / 10 / 8",
                alignSelf: "end",
                transform: "translate(-50%,50%)",
              }}
            >
              300
            </div>
            <div
              style={{
                gridArea: "10 / 6 / 10 / 7",
                alignSelf: "end",
                transform: "translate(-50%,50%)",
              }}
            >
              250
            </div>
            <div
              style={{
                gridArea: "10 / 5 / 10 / 6",
                alignSelf: "end",
                transform: "translate(-50%,50%)",
              }}
            >
              200
            </div>
            <div
              style={{
                gridArea: "10 / 4 / 10 / 5",
                alignSelf: "end",
                transform: "translate(-50%,50%)",
              }}
            >
              150
            </div>
            <div style={{ gridArea: "8 / 1 / 9 / 2" }}>250</div>
            <div style={{ gridArea: "7 / 1 / 8 / 2" }}>200</div>
            <div style={{ gridArea: "6 / 1 / 7 / 2" }}>150</div>
            <div style={{ gridArea: "5 / 1 / 6 / 2" }}>100</div>
            <div style={{ gridArea: "4 / 1 / 5 / 2" }}>50</div>
          </div>
        </div>
      </div>
      <h1 className="title">3.ALIEN SUPERSTAR</h1>
    </section>
  );
}
