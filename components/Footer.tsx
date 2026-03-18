import { useEffect } from "react";
import Cd from "../components/Cd";

type Props = {};

const Footer = (props: Props) => {
  useEffect(() => {
    const footerLinks = document.getElementById(
      "footerLinks",
    ) as HTMLElement | null;
    const brighten = document.querySelectorAll(
      ".brighten",
    ) as NodeListOf<HTMLElement>;

    if (footerLinks) {
      const handleMouseEnter = () => {
        for (let i = 0; i < brighten.length; i++) {
          brighten[i].style.filter = "brightness(1.8)";
        }
      };

      const handleMouseLeave = () => {
        for (let i = 0; i < brighten.length; i++) {
          brighten[i].style.filter = "brightness(1)";
        }
      };

      footerLinks.addEventListener("mouseenter", handleMouseEnter);
      footerLinks.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        footerLinks.removeEventListener("mouseenter", handleMouseEnter);
        footerLinks.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, []);

  return (
    <section className="relative w-full h-screen text-white">
      <div className="w-full flex items-start justify-between">
        <h1></h1>
        <h1>JAY-Z</h1>
      </div>
      <div className="absolute bottom-0 left-0 w-full detail text-[12px] flex flex-row items-end lg:items-start gap-20 z-10 pointer-events-none">
        <div className="max-w-[550px] text-balance">
          <div>All rights go to Jaÿ-Z and Roc Nation Ltd. © 2026</div>
          <br />
          Not affiliated with or endorsed by Jaÿ-Z or Roc Nation Ltd.
          <br />
          All images and music used are the property of their respective owners.
          <br />
          No copyright infringement intended.
        </div>
        <div
          id="footerLinks"
          className="flex-1 flex flex-wrap gap-x-20 gap-y-4 justify-end"
        >
          <a
            className="pointer-events-auto"
            href="https://www.instagram.com/jayz/"
            target="_blank"
          >
            Instagram
          </a>
          <a
            className="pointer-events-auto"
            href="https://twitter.com/jayz"
            target="_blank"
          >
            Twitter
          </a>
          <a
            className="pointer-events-auto"
            href="https://www.facebook.com/jayz"
            target="_blank"
          >
            Facebook
          </a>
          <a
            className="pointer-events-auto"
            href="https://www.youtube.com/user/jayz"
            target="_blank"
          >
            YouTube
          </a>
          <a
            className="pointer-events-auto"
            href="https://open.spotify.com/artist/6vWDO969PvNqNYHIOW5v0m"
            target="_blank"
          >
            Spotify
          </a>
          <a
            className="pointer-events-auto"
            href="https://music.apple.com/ca/artist/ja%C3%BF-z/1352449404"
            target="_blank"
          >
            Apple Music
          </a>
          <a
            className="pointer-events-auto"
            href="https://tidal.com/browse/artist/7804"
            target="_blank"
          >
            Tidal
          </a>
          <a
            className="pointer-events-auto"
            href="https://www.amazon.com/Jay-Z/e/B00197R8L8"
            target="_blank"
          >
            Amazon
          </a>
          <a
            className="pointer-events-auto"
            href="https://www.jayz.com/"
            target="_blank"
          >
            Website
          </a>
          <a
            className="pointer-events-auto"
            href="https://www.jayz.com/shop/"
            target="_blank"
          >
            Shop
          </a>
          <a
            className="pointer-events-auto"
            href="https://www.jayz.com/foundation/"
            target="_blank"
          >
            Foundation
          </a>
          <a
            className="pointer-events-auto"
            href="https://www.jayz.com/ivy-park/"
            target="_blank"
          >
            Ivy Park
          </a>
        </div>
      </div>
    </section>
  );
};

export default Footer;
