import React, {
  MutableRefObject,
  useRef,
  useState,
  useEffect,
  useLayoutEffect,
  use,
} from "react";
import {
  motion,
  motionValue,
  animate,
  useSpring,
  useTransform,
  useMotionValue,
} from "framer-motion";

type props = {
  size: number;
};

const Cd = ({ size }: props) => {
  const normal = useRef<HTMLDivElement | null>(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  // useEffect(() => {
  //   setWindowSize({ width: window.innerWidth, height: window.innerHeight });

  //   function handleWindowSizeChange() {
  //     setWindowSize({ width: window.innerWidth, height: window.innerHeight });
  //   }
  //   window.addEventListener("resize", handleWindowSizeChange);
  //   return () => {
  //     window.removeEventListener("resize", handleWindowSizeChange);
  //   };
  // }, []);

  const move = (event: { clientX: number; clientY: number }) => {
    const rect = normal.current?.getBoundingClientRect();

    if (!rect) return; // Add null check

    setCursorPosition({ x: event.clientX, y: event.clientY });

    const width = rect.width;
    const height = rect.height;

    setWindowSize({ width, height });
  };

  const rotateX = useTransform(
    motionValue(cursorPosition.y),
    (latest: number) =>
      ((latest - windowSize.height / 2) / (windowSize.height / 2)) * -40
  );

  const rotateY = useTransform(
    motionValue(cursorPosition.x),
    (latest: number) =>
      ((latest - windowSize.width / 2) / (windowSize.width / 2)) * 40
  );

  const rotateZ = useTransform(
    motionValue(
      Math.atan2(
        cursorPosition.y - windowSize.height / 2,
        cursorPosition.x - windowSize.width / 2
      ) *
        (180 / Math.PI)
    ),
    (latest: number) => latest
  );

  const translateX = useTransform(
    motionValue(cursorPosition.x),
    (latest: number) =>
      ((latest - windowSize.width / 2) / (windowSize.width / 2)) * 2
  );

  const translateY = useTransform(
    motionValue(cursorPosition.y),
    (latest: number) =>
      ((latest - windowSize.height / 2) / (windowSize.height / 2)) * 2
  );

  const opacity1 = useTransform(
    motionValue(cursorPosition.x),
    (latest: number) => {
      const x = latest;
      const y = cursorPosition.y;

      const value = (y / windowSize.height - x / windowSize.width + 1) / 2;

      return value;
    }
  );

  const opacity2 = useTransform(
    motionValue(cursorPosition.x),
    (latest: number) => {
      const x = latest;
      const y = cursorPosition.y;

      const value = (x / windowSize.width - y / windowSize.height + 1) / 2;

      return value;
    }
  );

  return (
    <div className="relative flex justify-center items-center w-full h-full">
      <div
        ref={normal}
        className="absolute w-full h-full z-[1]"
        onMouseMove={move}
      />
      <div
        style={{
          perspective: "1000px",
        }}
      >
        <motion.div
          className="relative flex justify-center items-center transition-transform duration-[900ms] ease-out"
          style={{
            width: size,
            height: size,
            borderRadius: "50%",
            transformStyle: "preserve-3d",
            rotateX: rotateX,
            rotateY: rotateY,
            // backgroundImage: `conic-gradient(#000 0%, #919191 10%, #000 20%, #000 50%, #919191 60%, #000 70%, #000 100%)`,
          }}
        >
          <div className="absolute w-[97.5%] h-[97.5%] flex justify-center items-center z-[2] mix-blend-hard-light">
            <motion.img
              className="absolute w-[102%] h-[102%] z-[4] mix-blend-plus-lighter opacity-70"
              src="/images/cd/sat2.png"
              alt="sat2"
              style={{ objectFit: "cover", rotateZ: rotateZ }}
            />
            <motion.img
              className="absolute w-[102%] h-[102%] z-[3] mix-blend-plus-lighter"
              src="/images/cd/sat.png"
              alt="sat"
              style={{ objectFit: "cover" }}
            />
            <motion.img
              className="absolute w-[102%] h-[102%] z-[2] opacity-100"
              src="/images/cd/mask.png"
              alt="mask"
              style={{
                objectFit: "cover",
                filter: "brightness(1)",
              }}
            />
            <motion.img
              className="absolute w-[99.5%] h-[99.5%] z-[1]"
              src="/images/cd/ren.png"
              alt="bey"
              style={{ objectFit: "cover" }}
              animate={{ rotate: -360 }}
              transition={{
                repeat: Infinity,
                duration: 4,
                ease: "linear",
              }}
            />
          </div>
          <div className="absolute w-full h-full z-[1]">
            <motion.img
              className="absolute w-full h-full z-[1]"
              src="/images/cd/cd1.png"
              alt="cd"
              style={{
                objectFit: "cover",
                rotateZ: rotateZ,
                filter: "brightness(1.2)",
              }}
            />
            <motion.img
              className="absolute w-[99.7%] h-[99.7%] z-[2] transition-transform duration-[900ms] ease-out"
              src="/images/cd/cd2.png"
              alt="cd"
              style={{ objectFit: "cover", x: translateX, y: translateY }}
            />
            <motion.div
              className="absolute w-full h-full"
              style={{ rotateZ: rotateZ }}
              // animate={{ rotate: -360 }}
              // transition={{
              //   repeat: Infinity,
              //   duration: 4,
              //   ease: "linear",
              // }}
            >
              <motion.img
                className="absolute w-[100%] top-0 right-0"
                src="/images/cd/glare.png"
                alt="mask"
                style={{
                  objectFit: "cover",
                  transform: "translate(25%,-25%)",
                  opacity: 0,
                }}
              />
              <motion.img
                className="absolute w-[100%] bottom-0 left-0"
                src="/images/cd/glare.png"
                alt="mask"
                style={{
                  objectFit: "cover",
                  transform: "translate(-50%,0%) scale(-1,-1)",
                  opacity: isNaN(opacity2.get()) ? 0 : opacity2,
                }}
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Cd;
