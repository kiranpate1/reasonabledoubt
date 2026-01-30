"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    adjacentTimeouts: NodeJS.Timeout[];
  }
}

const PANEL_SIZE = 50;

export default function InteractivePanels() {
  useEffect(() => {
    const panels = document.querySelector(".panels") as HTMLElement;
    let panelsAll: any[] | NodeListOf<Element> = [];
    let panelsCutout: Iterable<any> | ArrayLike<any> = [];
    let sortedPanels: any[] = [];

    const content = document.querySelector(".content") as HTMLElement;
    const cutout = document.querySelector(".bey-cutout") as HTMLElement;
    const svgPath = document.querySelector(
      ".bey-cutout path",
    ) as SVGPathElement;

    if (!panels || !content || !cutout || !svgPath) return;

    //setup
    function setup() {
      render();
      function render() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        const translateDown =
          window.innerHeight - cutout.getBoundingClientRect().height;

        const cols = Math.ceil(width / PANEL_SIZE);
        const rows = Math.ceil(height / PANEL_SIZE);
        const remainderWidth = (PANEL_SIZE - (width % PANEL_SIZE)) / 2;
        const remainderHeight = (PANEL_SIZE - (height % PANEL_SIZE)) / 2;

        panels.style.gridTemplateColumns = `repeat(${cols}, ${PANEL_SIZE}px)`;
        panels.style.gridTemplateRows = `repeat(${rows}, ${PANEL_SIZE}px)`;

        panels.innerHTML = "";
        const panelCount = cols * rows;
        for (let i = 0; i < panelCount; i++) {
          const newPanel = document.createElement("div");
          newPanel.classList.add("panel");
          newPanel.style.width = `${PANEL_SIZE}px`;
          newPanel.style.height = `${PANEL_SIZE}px`;
          const col = i % cols;
          const row = Math.floor(i / cols);
          newPanel.style.backgroundPosition = `${
            -col * PANEL_SIZE + remainderWidth
          }px ${-row * PANEL_SIZE + remainderHeight + translateDown}px`;
          panels.appendChild(newPanel);
        }
        panelsAll = document.querySelectorAll(".panel");

        content.style.transform = `translateY(${translateDown}px)`;
      }

      detectPathIntersection();
      function detectPathIntersection() {
        const svgElement = svgPath.ownerSVGElement as SVGSVGElement;

        // Function to convert screen coordinates to SVG coordinates
        function convertToSVGCoordinates(x: number, y: number) {
          const point = svgElement.createSVGPoint();
          point.x = x;
          point.y = y;
          const svgPoint = point.matrixTransform(
            svgElement.getScreenCTM()?.inverse() ??
              svgElement.createSVGMatrix(),
          );
          return { x: svgPoint.x, y: svgPoint.y };
        }

        // Function to check if a point is within the path's fill
        function isPointInPathFill(x: number, y: number): boolean {
          const { x: svgX, y: svgY } = convertToSVGCoordinates(x, y);
          const point = svgElement.createSVGPoint();
          point.x = svgX;
          point.y = svgY;
          return svgPath.isPointInFill(point);
        }

        // Function to recalculate intersections
        panelsAll.forEach((panel) => {
          const rect = panel.getBoundingClientRect();

          // Sample points within the panel
          const samplePoints = [
            { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }, // Center
            { x: rect.left, y: rect.top }, // Top-left
            { x: rect.right, y: rect.top }, // Top-right
            { x: rect.left, y: rect.bottom }, // Bottom-left
            { x: rect.right, y: rect.bottom }, // Bottom-right
          ];

          // Check if any sampled point is inside the fill
          const intersects = samplePoints.some((point) =>
            isPointInPathFill(point.x, point.y),
          );

          if (intersects) {
            panel.classList.add("intersecting");
          } else {
            panel.classList.remove("intersecting");
          }
        });
        panelsCutout = document.querySelectorAll(".intersecting");
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      for (let panel of panelsAll) {
        panel.style.opacity = "0";
      }
      const x = e.clientX;
      const y = e.clientY;
      const width = window.innerWidth;
      const cols = Math.ceil(width / PANEL_SIZE);
      const row = Math.floor(y / PANEL_SIZE);

      const adjacentRadius = 100;
      const adjacentPanels = [];

      // Clear any previous timeouts
      if (window.adjacentTimeouts) {
        window.adjacentTimeouts.forEach((timeout) => clearTimeout(timeout));
      }
      window.adjacentTimeouts = [];

      adjacentPanels.length = 0; // Clear the array

      for (let i = 0; i < panelsAll.length; i++) {
        const panel = panelsAll[i];
        const panelRect = panel.getBoundingClientRect();
        const panelX = panelRect.left + PANEL_SIZE / 2;
        const panelY = panelRect.top + PANEL_SIZE / 2;

        const distance = Math.sqrt((panelX - x) ** 2 + (panelY - y) ** 2);
        if (distance <= adjacentRadius) {
          adjacentPanels.push({ panel, distance });
        }
      }

      // Sort panels by distance to the cursor
      adjacentPanels.sort((a, b) => a.distance - b.distance);

      adjacentPanels.forEach((item, index) => {
        if (isHoveringOnPath) return;
        item.panel.style.opacity = "1";
      });

      // Sort panelsCutout by distance to the cursor
      sortedPanels = Array.from(panelsCutout).sort((a, b) => {
        const rectA = a.getBoundingClientRect();
        const rectB = b.getBoundingClientRect();
        const distanceA = Math.sqrt(
          (rectA.left + rectA.width / 2 - x) ** 2 +
            (rectA.top + rectA.height / 2 - y) ** 2,
        );
        const distanceB = Math.sqrt(
          (rectB.left + rectB.width / 2 - x) ** 2 +
            (rectB.top + rectB.height / 2 - y) ** 2,
        );
        return distanceA - distanceB;
      });
    };

    let timeouts: NodeJS.Timeout[] = []; // Array to store timeout IDs
    let isHoveringOnPath = false;

    svgPath.onmouseenter = (event) => {
      isHoveringOnPath = true;
      // Clear any existing timeouts before starting new ones
      timeouts.forEach((timeout) => clearTimeout(timeout));
      timeouts = []; // Reset the array

      sortedPanels.forEach((item, index) => {
        const minDelay = 10 - (index * 3) / sortedPanels.length;
        const maxDelay = 10 + (2 * index) / sortedPanels.length;
        const randomDelay =
          Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;
        const timeout = setTimeout(() => {
          item.classList.add("highlight");
        }, index * randomDelay);
        timeouts.push(timeout); // Store the timeout ID
      });
    };

    svgPath.onmouseleave = (event) => {
      isHoveringOnPath = false;
      // Clear any existing timeouts before starting new ones
      timeouts.forEach((timeout) => clearTimeout(timeout));
      timeouts = []; // Reset the array
      const isHighlighted = document.querySelectorAll(".highlight");

      sortedPanels.forEach((item, index) => {
        if (item.classList.contains("highlight")) {
          const randomDelay = Math.floor(Math.random() * 3) + 4;
          const timeout = setTimeout(
            () => {
              item.classList.remove("highlight");
            },
            (isHighlighted.length - index) * randomDelay,
          );
          timeouts.push(timeout); // Store the timeout ID
        }
      });
    };

    const handleMouseLeave = () => {
      for (let panel of panelsAll) {
        panel.style.opacity = "0";
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("resize", setup);
    setup();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", setup);
      timeouts.forEach((timeout) => clearTimeout(timeout));
      if (window.adjacentTimeouts) {
        window.adjacentTimeouts.forEach((timeout) => clearTimeout(timeout));
      }
    };
  }, []);

  return (
    <section className="intro">
      <div className="content">
        <div className="panels"></div>
        <svg
          className="bey-cutout"
          width="100%"
          viewBox="0 0 1999 1124"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            opacity="0.5"
            d="M319.5 898.5L303 966V1124H1740.5V1031.5L1713.5 994L1653.5 976.5L1590 970.5L1226.5 976.5L1068 849H958L878 834.5H827.5L738.5 744L663 703L569 699L445.5 752L348 832L319.5 898.5Z"
            fill="#D9D9D9"
          />
        </svg>
      </div>
      <div className="title">
        <h1>2.COZY</h1>
      </div>
    </section>
  );
}
