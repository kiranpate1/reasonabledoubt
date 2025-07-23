import { useEffect } from "react";
import Cd from "../components/Cd";

type Props = {};

const Footer = (props: Props) => {
  useEffect(() => {
    const footerLinks = document.getElementById("footerLinks") as HTMLElement;
    const brighten = document.querySelectorAll(
      ".brighten"
    ) as NodeListOf<HTMLElement>;

    footerLinks.addEventListener("mouseenter", () => {
      for (let i = 0; i < brighten.length; i++) {
        brighten[i].style.filter = "brightness(1.8)";
      }
    });

    footerLinks.addEventListener("mouseleave", () => {
      for (let i = 0; i < brighten.length; i++) {
        brighten[i].style.filter = "brightness(1)";
      }
    });
  }, []);

  return (
    <section className="relative w-full h-screen">
      <h1>Renaissance</h1>
      <div className="absolute top-0 left-0 w-screen h-screen overflow-hidden">
        <Cd size={500} />
      </div>
      <div className="absolute bottom-0 left-0 w-full detail text-[12px] flex flex-row items-start gap-20 z-10 pointer-events-none">
        <div className="max-w-[550px] text-balance">
          <div>
            All rights go to Beyoncé and Parkwood Entertainment Ltd. © 2022
          </div>
          <br />
          Not affiliated with or endorsed by Beyoncé or Parkwood Entertainment
          Ltd.
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
            href="https://www.instagram.com/beyonce/"
            target="_blank"
          >
            Instagram
          </a>
          <a
            className="pointer-events-auto"
            href="https://twitter.com/beyonce"
            target="_blank"
          >
            Twitter
          </a>
          <a
            className="pointer-events-auto"
            href="https://www.facebook.com/beyonce"
            target="_blank"
          >
            Facebook
          </a>
          <a
            className="pointer-events-auto"
            href="https://www.youtube.com/user/beyonce"
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
            href="https://music.apple.com/us/artist/beyonc%C3%A9/1419227"
            target="_blank"
          >
            Apple Music
          </a>
          <a
            className="pointer-events-auto"
            href="https://tidal.com/browse/artist/4443"
            target="_blank"
          >
            Tidal
          </a>
          <a
            className="pointer-events-auto"
            href="https://www.amazon.com/Beyonce/e/B00197R8L8"
            target="_blank"
          >
            Amazon
          </a>
          <a
            className="pointer-events-auto"
            href="https://www.beyonce.com/"
            target="_blank"
          >
            Website
          </a>
          <a
            className="pointer-events-auto"
            href="https://www.beyonce.com/shop/"
            target="_blank"
          >
            Shop
          </a>
          <a
            className="pointer-events-auto"
            href="https://www.beyonce.com/foundation/"
            target="_blank"
          >
            Foundation
          </a>
          <a
            className="pointer-events-auto"
            href="https://www.beyonce.com/ivy-park/"
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
