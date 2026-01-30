"use client";

import { useEffect } from "react";

export default function BackgroundText() {
  useEffect(() => {
    const phrases = [
      "please, motherfuckers ain't stop—, please, motherfuckers, ",
      "please, mother—, please, mother—, please, motherfuckers, ",
      "please-please, mother—, please, mother—, please, mother—, please, mother—",
      "please, motherfuckers, please, mother—, please, mother—",
      "please-please, mothеrfuckers ain't stoppin' me, ",
      "please, motherfuckers ain't stoppin' me, ",
    ];
    const textBg = document.querySelector("#textBg") as HTMLElement;
    
    if (!textBg) return;

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
  }, []);

  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex flex-col justify-start items-stretch overflow-hidden text-white">
      <div
        id="textBg"
        className="h-screen w-screen flex flex-col justify-start items-center text-white opacity-20"
      ></div>
    </div>
  );
}
