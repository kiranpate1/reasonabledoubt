"use client";

import { useEffect } from "react";

type Props = {
  typingRef: React.RefObject<HTMLDivElement | null>;
  pronunciationRef: React.RefObject<HTMLDivElement | null>;
};

export default function DefinitionSection({
  typingRef,
  pronunciationRef,
}: Props) {
  useEffect(() => {
    if (typingRef.current) {
      const typingPs = typingRef.current.querySelectorAll(
        "p",
      ) as NodeListOf<HTMLElement>;
      typingPs.forEach((p) => {
        const fullText = p.innerText;
        p.style.display = "flex";
        p.style.flexWrap = "wrap";
        p.innerText = "";
        const words = fullText.split(" ");
        words.forEach((word) => {
          const span = document.createElement("span");
          const letters = word.split("");
          letters.forEach((letter, letterIndex) => {
            const letterSpan = document.createElement("span");
            letterSpan.style.opacity = "0";
            letterSpan.innerText =
              letter +
              (letterIndex < letters.length - 1
                ? ""
                : String.fromCharCode(160));
            span.appendChild(letterSpan);
          });
          p.appendChild(span);
        });
      });
    }
  }, []);

  return (
    <section className="w-screen h-[80vh] absolute top-[30vw] left-0">
      <div className="sticky top-[10vw] left-0 right-0 flex flex-col items-start pl-12 h-0">
        <div className="w-full max-w-96 flex flex-col gap-4" ref={typingRef}>
          <div className="flex flex-row gap-2 items-center">
            <p>noun</p>
            <div
              className="px-2 py-1 border border-white/40 rounded-full text-[10px] flex flex-row gap-1 items-center hover:bg-white/10 cursor-pointer opacity-0"
              ref={pronunciationRef}
            >
              <p>ˈre-nə-ˌsän(t)s</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="13"
                viewBox="0 0 15 13"
                fill="none"
                data-inject-url="https://www.merriam-webster.com/dist-cross-dungarees/2025-09-25--21-30-28-njg60i/images/svg/audio-pron-redesign.svg"
              >
                <title>How to pronounce renaissance (audio)</title>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M13.513 6.34363C13.513 4.21463 12.623 2.33405 10.7864 0.687267L11.4026 0C13.406 1.79629 14.436 3.91633 14.436 6.34363C14.436 8.77387 13.3787 10.9297 11.3318 12.7981L10.7095 12.1163C12.6005 10.3902 13.513 8.4697 13.513 6.34363ZM10.8305 6.33811C10.8305 5.19038 10.2301 3.91597 8.89573 2.50719L9.5659 1.87241C10.9804 3.36579 11.7536 4.85692 11.7536 6.33811C11.7536 8.50095 10.6077 9.83479 9.56034 10.9028L8.90129 10.2565C9.91606 9.22174 10.8305 8.11681 10.8305 6.33811ZM0 8.6107V4.0387H3.23077L6.46154 1.75408V10.959L3.11169 8.6107H0Z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
          </div>
          <p className="body-large">
            the revival of art and literature under the influence of classical
            models in the 14th–16th centuries.
          </p>
          <ul className="space-y-2 pl-4">
            <li className="pl-0">
              <p>
                the culture and style of art and architecture developed during
                the Renaissance.
              </p>
              <p>noun: Renaissance</p>
            </li>
            <li className="pl-0">
              <p>a revival of or renewed interest in something.</p>
              <p>noun: renaissance; plural noun: renaissances</p>
              <p>"Welcome to the Renaissance"</p>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
