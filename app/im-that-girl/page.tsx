"use client";

import React, { use } from "react";
import "../globals.css";
import "./style.css";
import { useEffect } from "react";

declare global {
  interface Window {
    adjacentTimeouts: NodeJS.Timeout[];
  }
}

const Cozy: React.FC = () => {
  useEffect(() => {
    const container = document.querySelector(
      ".scroll-container"
    ) as HTMLElement;
    const containerItems = document.querySelectorAll(
      ".scroll-container > div"
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
    let containerHalf = 0;
    let containerItemsLeft: number[] = [];

    function calculateWidth() {
      containerHalf = container.getBoundingClientRect().width / 2;
    }

    for (let i = 0; i < containerItems.length; i++) {
      var itemLeft = containerItems[i].getBoundingClientRect().left;
      var itemCenter = itemLeft - containerHalf;

      containerItemsLeft.push(itemCenter);
    }

    window.addEventListener("wheel", function (event) {
      event.preventDefault();
      container.scrollLeft += event.deltaY;

      animate();
    });

    function animate() {
      const scrollProgress = container.scrollLeft + containerHalf;

      containerItems.forEach((item, i) => {
        const img = item.querySelector("img") as HTMLImageElement;
        const start = containerItemsLeft[i] + 100;
        const end = start + 400; //width of item goes here
        const approaching = start - 500;
        const leaving = end + 500;
        const translateZ = 400;
        const rotateY = 30 * 2;
        const blur = 20;

        //before
        if (scrollProgress < approaching) {
          img.style.transform = `translateX(100%) translateZ(${-translateZ}px) rotateY(0deg)`;
          img.style.filter = `blur(${blur}px)`;
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
            img.style.transformOrigin = `${100 - ease * 100}% center`;
            img.style.transform = `translateX(${100 - ease * 50}%) translateZ(${
              -translateZ + ease * translateZ
            }px) rotateY(${progress * rotateY}deg)`;
            img.style.filter = `blur(${blur - ease * blur}px)`;
          } else if (progress > 0.5) {
            img.style.transformOrigin = `${100 - ease * 100}% center`;
            img.style.transform = `translateX(${100 - ease * 50}%) translateZ(${
              -translateZ + ease * translateZ
            }px) rotateY(${rotateY - progress * rotateY}deg)`;
            img.style.filter = `blur(${blur - ease * blur}px)`;
          }
          selectorsAll[i].style.opacity = "0.25";
        }
        //inside
        if (scrollProgress > start && scrollProgress < end) {
          img.style.transform = "translateX(50%) translateZ(0px) rotateY(0deg)";
          img.style.filter = "blur(0px)";
          selectorsAll[i].style.opacity = "1";
          h1.innerHTML = img.alt;
        }
        //leaving
        if (scrollProgress >= end && scrollProgress < leaving) {
          var progress = Math.min((scrollProgress - end) / (leaving - end), 1);
          var ease = easeInOutQuint(progress);
          if (progress < 0.5) {
            img.style.transformOrigin = `${100 - ease * 100}% center`;
            img.style.transform = `translateX(${50 - ease * 50}%) translateZ(${
              0 - ease * translateZ
            }px) rotateY(${-progress * rotateY}deg)`;
            img.style.filter = `blur(${ease * blur}px)`;
          } else if (progress > 0.5) {
            img.style.transformOrigin = `${100 - ease * 100}% center`;
            img.style.transform = `translateX(${50 - ease * 50}%) translateZ(${
              0 - ease * translateZ
            }px) rotateY(${-rotateY + progress * rotateY}deg)`;
            img.style.filter = `blur(${ease * blur}px)`;
          }
          selectorsAll[i].style.opacity = "0.25";
        }
        //after
        if (scrollProgress > leaving) {
          img.style.transform = `translateX(0%) translateZ(${-translateZ}px) rotateY(0deg)`;
          img.style.filter = `blur(${blur}px)`;
          selectorsAll[i].style.opacity = "0.25";
        }
      });

      function easeInOutQuint(t: number) {
        t /= 0.5;
        if (t < 1) return 0.5 * Math.pow(t, 5);
        t -= 2;
        return 0.5 * (Math.pow(t, 5) + 2);
      }
    }

    calculateWidth();
    animate();
    window.addEventListener("resize", calculateWidth);
  }, []);
  return (
    <section>
      <div className="selectors"></div>
      <div className="scroll-container">
        <div>
          <img
            src="https://assets.vogue.com/photos/64efa2113e89acbbb62489f4/master/w_1600%2Cc_limit/beyonce-marni-parkwood.jpg"
            alt="Marni"
          />
        </div>
        <div>
          <img
            src="https://assets.vogue.com/photos/64cbcf9934738028f805d911/master/w_1600%2Cc_limit/beyonce-dundas-parkwood%2520entertainment.jpeg"
            alt="DUNDAS"
          />
        </div>
        <div>
          <img
            src="https://www.redcarpet-fashionawards.com/wp-content/uploads/2023/09/Beyonce-Mugler.jpg"
            alt="Mugler"
          />
        </div>
        <div>
          <img
            src="https://hips.hearstapps.com/hmg-prod/images/362385712-1701964706892614-564253150938300928-n-64bd49b082932.jpg"
            alt="Alexander McQueen"
          />
        </div>
        <div>
          <img
            src="https://www.thesun.co.uk/wp-content/uploads/2023/08/beyonce_370593320_18431232178008035_5937122429800621287_njpg-JS840516919.jpg?strip=all&w=768"
            alt="Gareth Pugh"
          />
        </div>
        <div>
          <img
            src="https://www.thesun.co.uk/wp-content/uploads/2023/08/beyonce_370232065_18431230537008035_5756532687445147372_njpg-JS840516988.jpg?strip=all&w=768"
            alt="Situationist x Yaspis"
          />
        </div>
        <div>
          <img
            src="https://www.vibe.com/wp-content/uploads/2023/09/Screen-Shot-2023-09-25-at-9.39.40-AM.png?w=800"
            alt="BOSS"
          />
        </div>
      </div>
      <h1></h1>
    </section>
  );
};

export default Cozy;
