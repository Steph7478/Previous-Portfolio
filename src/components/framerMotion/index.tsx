export const clickToOpenAnimation = {
  initial: { scale: 0 },
  animate: {
    opacity: [1, 1, 0, 1, 0, 1, 0, 1],
    rotate: [-360, -720],
    scale: 0,
    transition: {
      opacity: { duration: 0.5, ease: "easeInOut" },
      rotate: { delay: 0.6, duration: 1, ease: "easeOut" },
      scale: { delay: 0.6, duration: 1, ease: "easeOut" },
    },
  },
  idleTransition: {
    rotate: { delay: 2, duration: 1, ease: "easeOut" },
    scale: { delay: 2, duration: 1, ease: "easeOut" },
    opacity: {
      delay: 3,
      duration: 2,
      ease: "easeInOut",
      repeat: Infinity,
    },
  },
  hoverOut: {
    opacity: [1, 1, 0, 1, 0, 1, 0, 1],
    transition: {
      opacity: {
        duration: 2,
        ease: "easeInOut",
        repeat: Infinity,
      },
    },
  },
};

export const spaceshipEnterAnimation = {
  translateX: ["-75%", "25%", "0"],
  translateY: ["-100%", "0%", "5%", "0%", "5%", "0%"],
  opacity: 1,
  transition: {
    duration: 2,
    ease: "easeInOut",
  },
};

export const spaceshipHoverAnimation = {
  translateY: ["0%", "10%"],
  transition: {
    repeat: Infinity,
    duration: 1,
    ease: "easeInOut" as const,
    repeatType: "reverse" as const,
  },
};

export const lightExpandAnimation = {
  width: ["230px", "250px", "0px"],
  transition: {
    duration: 1.5,
    ease: "easeInOut",
  },
};

export const lightFadeOutAnimation = {
  width: 0,
  transition: {
    duration: 1.2,
    ease: "easeInOut",
  },
};

export const spaceshipExitAnimation = {
  translateY: "-100%",
  transition: {
    duration: 1,
    ease: "easeIn",
  },
};
export const spaceshipDoneAnimation = {
  translateY: ["0%", "-100%"],
  translateX: ["0%", "50%"],
  transition: {
    duration: 1,
    ease: "easeInOut",
  },
};

export const lightAnimation = {
  initial: { width: "0px" },
  animate: {
    width: ["230px", "250px", "0px"],
    transition: {
      duration: 1.5,
      ease: "easeInOut",
    },
  },
};

export const iamExitAnimation = {
  translateY: [250, 0, -100, -200],
  scaleY: [1, 1.2, 1.6, 2.5],
  scaleX: [1, 0.5, 0.1, 0],
  filter: ["blur(0px)", "blur(5px)", "blur(15px)", "blur(40px)"],
  opacity: [1, 0.8, 0.4, 0],
  transition: {
    duration: 1.5,
    ease: [0.6, -0.28, 0.735, 0.045],
  },
};

export const iamInfinityPulse = {
  filter: ["drop-shadow(0 0 5px #8668DE)", "drop-shadow(0 0 5px #18cd7f)"],
  transition: {
    duration: 1.5,
    repeat: Infinity,
    repeatType: "reverse" as const,
    ease: "easeInOut",
  },
};

export const openModal = {
  initial: { opacity: 0, translateY: "-600px" },
  animate: {
    opacity: [0, 1, 1, 1],
    transform: [
      "translateY(-600px) scale(0.6)",
      "translateY(0px) scale(0.6)",
      "translateY(0px) scale(1.4, 0.2)",
      "translateY(0px) scale(1.2, 0.4)",
      "translateY(-20px) scale(0.9, 1.1)",
      "translateY(0px) scale(1.05, 0.95)",
      "translateY(-10px) scale(0.95, 1.05)",
      "translateY(0px) scale(1.02, 0.98)",
      "translateY(0px) scale(1, 1)",
    ],
  },
  transition: {
    delay: 0.5,
    duration: 2.2,
    ease: "easeOut",
    times: [0, 0.25, 0.4, 0.45, 0.55, 0.65, 0.75, 0.85, 1],
  },
};

export const backgroundAnimation = (
  rotateValue: number,
  animationState: string,
  index: number,
) => ({
  rotate: rotateValue,
  y: `${index * 100}vh`,
  transition: {
    rotate:
      animationState === "pressing"
        ? { duration: 1.5, ease: "easeInOut" as const }
        : { type: "spring" as const, stiffness: 25, damping: 6 },
    y: { duration: 0.7, ease: "easeInOut" as const },
  },
});

export const clickToOpenStartAnimation = {
  opacity: [1, 0, 1, 0, 1],
  rotate: [-360, -720],
  scale: 0,
  transition: {
    opacity: { duration: 0.5, ease: "easeInOut" },
    rotate: { delay: 0.6, duration: 1, ease: "easeOut" },
    scale: { delay: 0.6, duration: 1, ease: "easeOut" },
  },
};

export const iamFirstMove = {
  rotateZ: 20,
  translateY: 20,
  transformOrigin: "top center",
  transition: {
    duration: 0.3,
    ease: "easeInOut",
  },
};

export const iamSecondMove = {
  rotateZ: -20,
  translateY: 40,
  transition: {
    duration: 0.3,
    ease: "easeInOut",
  },
};

export const iamThirdMove = {
  rotateZ: 10,
  translateY: 60,
  transition: {
    duration: 0.3,
    ease: "easeIn",
  },
};

export const iamFinalMove = {
  rotateZ: 10,
  translateY: 225,
  transition: {
    duration: 1,
    ease: [0.6, 0.01, -0.05, 0.95],
  },
};

export const iamShakeLoop = {
  rotateZ: [10, -10, 10],
  transition: {
    repeat: Infinity,
    duration: 1.2,
    ease: "easeInOut",
  },
};

export const clickToOpenInitialEntry = {
  rotate: [-540, 0],
  scale: [0, 1],
  transition: {
    rotate: { delay: 2, duration: 1, ease: "easeOut" },
    scale: { delay: 2, duration: 1, ease: "easeOut" },
  },
};

export const clickToOpenLoopingPulse = {
  opacity: [1, 1, 0, 1, 0, 1, 0, 1],
  transition: {
    delay: 0,
    duration: 2,
    ease: "easeInOut",
    repeat: Infinity,
  },
};

export const pressIconAnimation = {
  scale: [1, 1.1],
};

export const scrollIconAnimation = {
  translateY: ["10%", "0%"],
};

export const pressIconTransition = {
  duration: 0.8,
  ease: "easeInOut",
  repeat: Infinity,
  repeatType: "reverse",
} as const;

export const scrollIconTransition = {
  duration: 0.8,
  ease: "easeInOut",
  repeat: Infinity,
  repeatType: "reverse",
} as const;

export const sectionAnimate = (index: number) => ({
  y: `-${isNaN(index) ? 0 : index * 100}vh`,
});

export const sectionTransition = {
  scale: { duration: 2, ease: "easeInOut" },
  y: { duration: 0.7, ease: "easeInOut" },
} as const;

export const sectionStyle = {
  transformOrigin: "top",
} as const;

export const getInitialSectionAnimation = (direction: "left" | "right") => ({
  x: direction === "left" ? "-100%" : "100%",
  opacity: 0,
});

export const sectionAnimation = {
  inView: {
    x: "0%",
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
  outOfView: (direction: string) => ({
    x: direction === "left" ? "-100%" : "100%",
    opacity: 0,
    transition: { duration: 0.5 },
  }),
};

export const jelloHorizontalVariants = {
  initial: { scaleX: 1, scaleY: 1 },
  animate: {
    scaleX: [1, 1.25, 0.75, 1.15, 0.95, 1.05, 1],
    scaleY: [1, 0.75, 1.25, 0.85, 1.05, 0.95, 1],
    transition: {
      duration: 0.8,
      ease: "easeInOut",
      times: [0, 0.3, 0.4, 0.5, 0.65, 0.75, 1],
    },
  },
};

export const iconsAnimated = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.5,
      delayChildren: 1,
    },
  },
};
