import { ReactNode, useRef, useState } from "react";
import { motion } from "framer-motion";

interface SliderProps {
  data: {
    slides: ReactNode[];
  };
}

const Slider = ({ data }: SliderProps) => {
  const { slides } = data;
  const [index, setIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const next = () => setIndex((prev) => (prev + 1) % slides.length);
  const prev = () =>
    setIndex((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div
      ref={containerRef}
      className="relative z-20 flex w-full overflow-hidden"
    >
      <motion.div
        className="flex h-full w-full pt-10"
        animate={{ x: `-${index * 100}%` }}
        transition={{ type: "spring", stiffness: 40, damping: 7 }}
      >
        {slides.map((slide, i) => (
          <div
            key={i}
            className="flex min-h-full min-w-full flex-col items-center justify-center overflow-hidden"
          >
            {slide}
          </div>
        ))}
      </motion.div>

      <button
        onClick={prev}
        onTouchStart={prev}
        className="absolute left-0 z-30 bg-prevArrow bg-contain bg-no-repeat p-2 xs:bottom-20 xs:h-8 xs:w-8 md:top-1/3 md:h-16 md:w-16"
      ></button>
      <button
        onClick={next}
        onTouchStart={next}
        className="absolute right-0 z-30 bg-nextArrow bg-contain bg-no-repeat p-2 xs:bottom-20 xs:h-8 xs:w-8 md:top-1/3 md:h-16 md:w-16"
      ></button>
    </div>
  );
};

export default Slider;
