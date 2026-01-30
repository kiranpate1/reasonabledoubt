import Image from "next/image";

export default function HeroSection() {
  return (
    <>
      <div className="absolute top-0 left-0 w-screen h-screen">
        <Image
          className="absolute bottom-[18px] right-0 w-[45vw] aspect-[2521/1681] object-cover"
          src="/images/home/ujtina.png"
          alt="Tina Knowles and Uncle Johnny"
          width={1260}
          height={840}
        />
      </div>
      <section className="flex justify-stretch relative w-full h-screen">
        <div className="h-full flex-1">
          <h1>
            <span className="text-[rgba(255,255,255,0)]">Renaissance</span> is
            an album by recording artist Beyoncé
          </h1>
        </div>
        <div className="h-full w-[20vw]"></div>
      </section>
    </>
  );
}
