import React, { useState, useEffect } from "react";
import { motion, motionValue, useTransform } from "framer-motion";

type props = {
  size: number;
};

const Cd = ({ size }: props) => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });

    const handleMouseMove = (event: MouseEvent) => {
      setCursorPosition({ x: event.clientX, y: event.clientY });
    };

    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const rotateX = useTransform(
    motionValue(cursorPosition.y),
    (latest: number) =>
      ((latest - windowSize.height / 2) / (windowSize.height / 2)) * -40,
  );

  const rotateY = useTransform(
    motionValue(cursorPosition.x),
    (latest: number) =>
      ((latest - windowSize.width / 2) / (windowSize.width / 2)) * 40,
  );

  const rotateZ = useTransform(
    motionValue(cursorPosition.x),
    [0, windowSize.width],
    [0, 360],
  );

  const translateX = useTransform(
    motionValue(cursorPosition.x),
    (latest: number) =>
      ((latest - windowSize.width / 2) / (windowSize.width / 2)) * 1,
  );

  const translateY = useTransform(
    motionValue(cursorPosition.y),
    (latest: number) =>
      ((latest - windowSize.height / 2) / (windowSize.height / 2)) * 1,
  );

  return (
    <div className="relative flex justify-center items-center w-full h-full">
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
          <div className="absolute w-[97.5%] h-[97.5%] flex justify-center items-center z-[2] mix-blend-color-dodge duration-[900ms] ease-out">
            <motion.img
              className="brighten absolute w-[102%] h-[102%] z-[5] rounded-full"
              src="/images/cd/cap.png"
              alt="cap"
              style={{
                objectFit: "cover",
              }}
            />
            <motion.img
              className="brighten absolute w-[102%] h-[102%] z-[4] mix-blend-plus-lighter opacity-50 duration-[900ms] ease-out rounded-full"
              src="/images/cd/sat2.png"
              alt="sat2"
              style={{
                objectFit: "cover",
                rotateZ: rotateZ,
                transition: "filter 0.2s ease",
              }}
            />
            <motion.img
              className="brighten absolute w-[102%] h-[102%] z-[3] mix-blend-plus-lighter"
              src="/images/cd/sat.png"
              alt="sat"
              style={{ objectFit: "cover", transition: "filter 0.2s ease" }}
            />
            <motion.img
              className="brighten absolute w-[102%] h-[102%] z-[2] opacity-100 duration-[900ms] ease-out"
              src="/images/cd/mask.png"
              alt="mask"
              style={{
                objectFit: "cover",
                rotateZ: rotateZ,
                transition: "filter 0.2s ease",
              }}
            />
            <motion.img
              className="brighten absolute w-[99.5%] h-[99.5%] z-[1]"
              src="/images/cd/ren.png"
              alt="bey"
              style={{ objectFit: "cover", transition: "filter 0.2s ease" }}
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
              className="absolute w-full h-full z-[1] duration-[900ms] ease-out"
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
            {/* <motion.div
              className="brighten absolute w-full h-full z-[100] duration-[900ms] ease-out"
              style={{ rotateZ: rotateZ, transition: "filter 0.2s ease" }}
              // animate={{ rotate: -360 }}
              // transition={{
              //   repeat: Infinity,
              //   duration: 4,
              //   ease: "linear",
              // }}
            >
              <motion.img
                className="absolute w-[100%] top-[50%] left-0"
                src="/images/cd/glare.png"
                alt="mask"
                style={{
                  objectFit: "cover",
                  transform: "translate(-50%,-50%)",
                  opacity: isNaN(opacity2.get()) ? 0 : opacity2,
                }}
              />
              <motion.img
                className="absolute w-[100%] bottom-[50%] right-0"
                src="/images/cd/glare.png"
                alt="mask"
                style={{
                  objectFit: "cover",
                  transform: "translate(50%,50%) scale(-1,-1)",
                  opacity: isNaN(opacity1.get()) ? 0 : opacity1,
                }}
              />
            </motion.div> */}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Cd;
