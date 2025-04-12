import {
  AnimationControls,
  motion,
  useAnimationControls,
  useInView,
} from "framer-motion";
import { useScrollSessions } from "../../hooks/useScrollSessions";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Logo from "/src/assets/svg/headerText.svg?react";
import Skills from "/src/assets/svg/skills.svg?react";
import Projects from "/src/assets/svg/projects.svg?react";
import Iam from "/src/assets/svg/iam.svg?react";
import Spaceship from "/src/assets/svg/spaceship.svg?react";
import PressIcon from "/src/assets/svg/press.svg?react";
import scrollIcon from "/src/assets/svg/scroll.svg?react";
import clicktoOpenIcon from "/src/assets/decorations/clickToOpen.svg?react";
import { create } from "framer-motion/client";
import {
  clickToOpenAnimation,
  lightAnimation,
  sectionAnimation,
  iamExitAnimation,
  spaceshipHoverAnimation,
  backgroundAnimation,
  lightFadeOutAnimation,
  lightExpandAnimation,
  spaceshipEnterAnimation,
  spaceshipExitAnimation,
  iamSecondMove,
  iamFinalMove,
  iamFirstMove,
  iamShakeLoop,
  iamThirdMove,
  clickToOpenStartAnimation,
  clickToOpenInitialEntry,
  clickToOpenLoopingPulse,
  scrollIconAnimation,
  pressIconAnimation,
  pressIconTransition,
  scrollIconTransition,
  sectionStyle,
  sectionAnimate,
  sectionTransition,
  getInitialSectionAnimation,
  openModal,
  iamInfinityPulse,
  jelloHorizontalVariants,
  spaceshipDoneAnimation,
  iconsAnimated,
} from "../../components/framerMotion";
import Slider from "../../components/Slider";
import { slidesData } from "../../components/SlidesData";
import { FaGithub } from "react-icons/fa";
import { TbBrandLinkedinFilled } from "react-icons/tb";

const MotionLogo = create(Logo);
const MotionSkills = create(Skills);
const MotionProjects = create(Projects);
const MotionIam = create(Iam);
const MotionSpaceShip = create(Spaceship);
const MotionPress = create(PressIcon);
const MotionScroll = create(scrollIcon);
const MotionClickToOpen = create(clicktoOpenIcon);

export default function Home() {
  const [pauseScroll, setPauseScroll] = useState(false);
  const { isAnimating, index, handleScroll } = useScrollSessions(pauseScroll);
  const [rotation, setRotation] = useState(index * -90);

  const [openBox, setOpenBox] = useState(false);
  const [animationState, setAnimationState] = useState<"normal" | "pressing">(
    "normal",
  );
  const [hasAnimated, setHasAnimated] = useState([false, false, false]);
  const [iamGone, setIamGone] = useState(false);
  const [textCompleted, setTextCompleted] = useState(false);
  const [hasLight, setHasLight] = useState(false);
  const [isFlying, setIsFlying] = useState(false);
  const [startExitAnim, setStartExitAnim] = useState(false);

  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);

  const inView1 = useInView(ref1, { once: true });
  const inView2 = useInView(ref2, { once: true });
  const inView3 = useInView(ref3, { once: true });

  const clickToOpenControl = useAnimationControls();
  const clickToOpenControl2 = useAnimationControls();
  const control1 = useAnimationControls();
  const control2 = useAnimationControls();
  const control3 = useAnimationControls();
  const lightControl = useAnimationControls();
  const letterControl = useAnimationControls();
  const textBoxControl = useAnimationControls();
  const projectBox = useAnimationControls();
  const iamControls = useAnimationControls();
  const spaceshipControl = useAnimationControls();
  const skillsText = useAnimationControls();
  const projectsText = useAnimationControls();

  const sectionControls = useMemo(
    () => [control1, control2, control3],
    [control1, control2, control3],
  );

  const sectionData = useMemo(
    () => [
      {
        Component: MotionLogo,
        background: "bg-start",
        ref: ref1,
        inView: inView1,
        direction: "left",
      },
      {
        Component: MotionSkills,
        background: "bg-skills",
        ref: ref2,
        inView: inView2,
        direction: "right",
      },
      {
        Component: MotionProjects,
        background: "bg-projects",
        ref: ref3,
        inView: inView3,
        direction: "left",
      },
    ],
    [inView1, inView2, inView3],
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        setAnimationState("pressing");
        setRotation(500);
        setTimeout(() => {
          setAnimationState("normal");
          setRotation(index * -90);
        }, 1500);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [index]);

  const runClickAnimation = useCallback(
    async (clickControl: AnimationControls) => {
      clickControl.set({ pointerEvents: "none" });

      await clickControl.start(clickToOpenInitialEntry);

      clickControl.set({ pointerEvents: "auto" });

      clickControl.start(clickToOpenLoopingPulse);
    },
    [],
  );

  const directions = useCallback(
    (control: AnimationControls, inView: unknown) => {
      if (inView) {
        control.start(sectionAnimation.inView);
      } else {
        control.start(sectionAnimation.outOfView);
      }
    },
    [],
  );

  useEffect(() => {
    if (inView1) {
      if (!iamGone) {
        iamControls.start(sectionAnimation.inView);
        iamControls.start(iamInfinityPulse);

        runClickAnimation(clickToOpenControl);
      } else {
        iamControls.start(iamExitAnimation);
        setStartExitAnim(true);
      }
    }
  }, [iamControls, inView1, iamGone, runClickAnimation, clickToOpenControl]);

  useEffect(() => {
    if (inView2) {
      directions(skillsText, inView2);
      if (textCompleted) {
        letterControl.start("visible").then(() => {
          letterControl.start("flicker");
        });
      }
    }
  }, [textCompleted, letterControl, inView2, directions, skillsText]);

  useEffect(() => {
    if (inView3) {
      directions(projectsText, inView3);
      runClickAnimation(clickToOpenControl2);
      projectBox.set(openModal.initial);
      projectBox.start({
        ...openModal.animate,
        transition: openModal.transition,
      });
    }
  }, [
    clickToOpenControl,
    clickToOpenControl2,
    directions,
    inView1,
    inView3,
    projectBox,
    projectsText,
    runClickAnimation,
    textBoxControl,
  ]);

  useEffect(() => {
    setRotation(index * -90);
  }, [index]);

  useEffect(() => {
    sectionData.forEach(({ inView, direction }, i) => {
      if (inView && !hasAnimated[i]) {
        sectionControls[i].start(sectionAnimation.inView);
        sectionControls[i].start(iamInfinityPulse);

        setHasAnimated((prev) => {
          const updated = [...prev];
          updated[i] = true;
          return updated;
        });
      } else if (!inView && !hasAnimated[i]) {
        sectionControls[i].start(sectionAnimation.outOfView(direction));
      }
    });
  }, [sectionData, sectionControls, hasAnimated]);

  useEffect(() => {
    const runSpaceshipAnimation = async () => {
      if (isFlying) {
        await spaceshipControl.start(spaceshipEnterAnimation);

        spaceshipControl.start(spaceshipHoverAnimation);

        setIamGone(true);
        setHasLight(true);

        await lightControl.start(lightExpandAnimation);

        await lightControl.start(lightFadeOutAnimation).then(() => {
          setHasLight(false);
        });

        await spaceshipControl.start(spaceshipDoneAnimation);

        setOpenBox(true);

        textBoxControl.set(openModal.initial);
        await textBoxControl.start({
          ...openModal.animate,
          transition: openModal.transition,
        });
      }
    };

    runSpaceshipAnimation();
  }, [isFlying, spaceshipControl, lightControl, textBoxControl]);

  const SkillBox = useMemo(() => {
    const skills = [
      "Javascript",
      "Typescript",
      "CSS",
      "HTML",
      "ReactJS",
      "TailwindCSS",
      "Framer Motion",
      "Vite",
      "REST APIs",
      "React Query",
      "Git",
      "GitHub",
    ];

    return (
      <>
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            initial="initial"
            whileHover="animate"
            variants={jelloHorizontalVariants}
            className="flex items-center justify-center rounded-md border-2 border-[#CEB7FF] bg-black/30 font-montserrat text-sm font-semibold text-[#ddc7fa] will-change-auto xs:h-[25px] xs:w-[130px] md:h-[70px] md:w-[120px]"
            style={{ textShadow: "1px 1px 1px black" }}
          >
            {skill}
          </motion.div>
        ))}
      </>
    );
  }, []);

  const textBox = useMemo(
    () => (
      <div
        className={`top-0 z-30 mb-auto max-h-[70vh] py-10 xs:w-[85%] sm:w-2/4 ${openBox ? "block" : "hidden"}`}
      >
        <motion.div
          className={`scrollbar-custom text-bold z-20 flex h-full w-full items-center justify-center overflow-hidden bg-textBox bg-[length:100%_100%] py-10 font-montserrat text-base md:text-base ${!openBox ? "hidden" : "block"}`}
          animate={textBoxControl}
          onMouseEnter={(e) => {
            const el = e.currentTarget.querySelector(".scrollbar-custom");
            if (el && el.scrollHeight > el.clientHeight) {
              setPauseScroll(true);
            }
          }}
          onTouchStart={(e) => {
            const el = e.currentTarget!.querySelector(".scrollbar-custom");
            if (el && el.scrollHeight > el.clientHeight) {
              setPauseScroll(true);
            }
          }}
          onTouchEnd={() => setPauseScroll(false)}
          onMouseLeave={() => setPauseScroll(false)}
        >
          <p className="scrollbar-custom h-full w-full overflow-y-auto overflow-x-hidden px-10 py-2 font-semibold">
            Hello, my name is Stephanie, and I'm a Junior Front-end Developer
            with a strong passion for technology and continuous learning.
            <br /> I thrive on exploring the world of programming and
            continuously push myself to gain in-depth knowledge, so I can
            approach challenges with confidence and versatility.
            <br />
            My long-term goal is to become a Full Stack Developer and build a
            solid career in tech, a field that truly inspires me. I'm grateful
            for every opportunity to learn, grow, and connect with others in the
            industry. Any guidance, advice, or feedback is always deeply
            appreciated.
          </p>
        </motion.div>
      </div>
    ),
    [openBox, textBoxControl],
  );

  const clickToOpen = useMemo(
    () => (
      <MotionClickToOpen
        className={`z-30 mt-auto w-full cursor-pointer justify-self-end hover:brightness-150 xs:mb-20 xs:h-[15%] md:mb-0 md:h-[25%] ${openBox ? "hidden" : "block"}`}
        initial={clickToOpenAnimation.initial}
        animate={clickToOpenControl}
        transition={clickToOpenAnimation.idleTransition}
        onMouseEnter={() => {
          clickToOpenControl.stop();
          clickToOpenControl.set({ scale: 1, opacity: 1 });
        }}
        onMouseLeave={() => {
          clickToOpenControl.start(clickToOpenAnimation.hoverOut);
        }}
        onClick={async () => {
          clickToOpenControl.start(clickToOpenStartAnimation);
          await iamControls.start(iamFirstMove);
          await iamControls.start(iamSecondMove);
          await iamControls.start(iamThirdMove);
          await iamControls.start(iamFinalMove);

          iamControls.start(iamShakeLoop);

          setIsFlying(true);
        }}
        onTouchStart={async () => {
          clickToOpenControl.start(clickToOpenStartAnimation);
          await iamControls.start(iamFirstMove);
          await iamControls.start(iamSecondMove);
          await iamControls.start(iamThirdMove);
          await iamControls.start(iamFinalMove);

          iamControls.start(iamShakeLoop);

          setIsFlying(true);
        }}
      />
    ),
    [clickToOpenControl, iamControls, openBox],
  );

  return (
    <>
      <motion.div
        onWheel={handleScroll}
        animate={sectionAnimate(index)}
        transition={sectionTransition}
        style={sectionStyle}
        onAnimationComplete={() => (isAnimating.current = false)}
        className="max-w-screen fixed inset-0 max-h-screen will-change-transform"
      >
        {sectionData.map(({ Component, background, ref, direction }, idx) => (
          <div
            key={idx}
            className={`flex h-screen w-screen flex-col items-center justify-center bg-blue-900 ${background} bg-cover bg-center bg-no-repeat px-5 pb-16 pt-12 text-4xl text-white ${idx === 0 ? "justify-start" : ""}`}
          >
            <motion.div
              ref={ref}
              className={` ${idx === 0 ? "xs:h-[10%] md:h-[10%]" : "xs:h-[10%] md:h-[15%]"} w-full will-change-transform`}
              initial={getInitialSectionAnimation(
                direction as "left" | "right",
              )}
              animate={sectionControls[idx]}
            >
              <Component
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </motion.div>
            {idx === 0 && (
              <>
                {!openBox && (
                  <motion.div
                    initial={getInitialSectionAnimation("right")}
                    animate={iamControls}
                    className="z-20 flex h-[96px] w-[388px] will-change-transform"
                    onAnimationComplete={() => {
                      if (startExitAnim) {
                        setStartExitAnim(false);
                      }
                    }}
                  >
                    <MotionIam className="my-10 w-full xs:h-3/4 md:h-full" />
                  </motion.div>
                )}

                {textBox}
                {clickToOpen}
              </>
            )}
            {idx === 1 && (
              <>
                <motion.span
                  initial={getInitialSectionAnimation("left")}
                  animate={skillsText}
                  className="flex select-none items-center justify-center text-nowrap py-5 text-center font-bebas drop-shadow-[0_0_4px_#B377FF] will-change-auto xs:text-[75%] md:text-[100%]"
                >
                  Here is some of my skills
                </motion.span>

                <motion.div
                  className="scrollbar-customw-fit z-20 self-center justify-self-center overflow-y-auto overflow-x-hidden"
                  animate={inView2 && openModal.animate}
                  transition={openModal.transition}
                  onAnimationComplete={() => setTextCompleted(true)}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget;
                    if (el.scrollHeight > el.clientHeight) {
                      setPauseScroll(true);
                    }
                  }}
                  onMouseLeave={() => setPauseScroll(false)}
                  onTouchStart={(e) => {
                    const el = e.currentTarget;
                    if (el.scrollHeight > el.clientHeight) {
                      setPauseScroll(true);
                    }
                  }}
                  onTouchEnd={() => setPauseScroll(false)}
                >
                  <div className="scrollbar-custom grid h-auto w-auto origin-center select-none items-center justify-center self-center justify-self-center overflow-y-auto overflow-x-hidden p-2 xs:grid-cols-2 xs:grid-rows-5 xs:gap-1 xs:text-sm sm:grid-cols-3 sm:grid-rows-4 md:grid-cols-4 md:grid-rows-3 md:gap-5 md:text-base">
                    {SkillBox}
                  </div>
                </motion.div>
              </>
            )}

            {idx === 2 && (
              <Slider
                data={{
                  slides: slidesData.slides.map(
                    ({ title, link, description }) => (
                      <>
                        <motion.span
                          className="flex items-center justify-center text-center font-bebas text-white drop-shadow-[0_0_4px_#B377FF] xs:text-[75%] md:text-4xl"
                          initial={getInitialSectionAnimation("right")}
                          animate={projectsText}
                        >
                          {title}
                        </motion.span>

                        <motion.div
                          animate={projectBox}
                          className="scrollbar-custom text-bold flex touch-auto items-center justify-center overflow-hidden bg-textBox bg-[length:100%_100%] py-10 font-montserrat text-base xs:h-1/2 xs:w-[80%] xs:text-sm md:h-auto md:w-1/3 md:text-base"
                          onMouseEnter={(e) => {
                            const el =
                              e.currentTarget.querySelector(
                                ".scrollbar-custom",
                              );
                            if (el && el.scrollHeight > el.clientHeight) {
                              setPauseScroll(true);
                            }
                          }}
                          onMouseLeave={() => setPauseScroll(false)}
                          onTouchStart={(e) => {
                            const el =
                              e.currentTarget!.querySelector(
                                ".scrollbar-custom",
                              );
                            if (el && el.scrollHeight > el.clientHeight) {
                              setPauseScroll(true);
                            }
                          }}
                          onTouchEnd={() => setPauseScroll(false)}
                        >
                          <p className="scrollbar-custom h-full w-full overflow-y-auto overflow-x-hidden px-10 font-semibold">
                            {description}
                          </p>
                        </motion.div>

                        <a
                          href={link}
                          target="_blank"
                          onTouchStart={(e) => {
                            e.preventDefault();
                            window.open(link, "_blank");
                          }}
                        >
                          <MotionClickToOpen
                            className="h-[120px] w-auto touch-auto"
                            initial={clickToOpenAnimation.initial}
                            transition={clickToOpenAnimation.idleTransition}
                            onMouseEnter={() => {
                              clickToOpenControl2.stop();
                              clickToOpenControl2.set({
                                scale: 1,
                                opacity: 1,
                              });
                            }}
                            onMouseLeave={() => {
                              clickToOpenControl2.start(
                                clickToOpenAnimation.hoverOut,
                              );
                            }}
                            animate={clickToOpenControl2}
                            onClick={() =>
                              clickToOpenControl.start(
                                clickToOpenStartAnimation,
                              )
                            }
                          />
                        </a>
                      </>
                    ),
                  ),
                }}
              />
            )}
            <div className="pointer-event-none absolute top-0 z-20 flex flex-col items-center justify-center">
              <MotionSpaceShip
                className="h-[100px] w-auto"
                initial={spaceshipExitAnimation}
                animate={spaceshipControl}
              />
              <motion.div
                initial={lightAnimation.initial}
                animate={lightControl}
                className="will-change-tranform pointer-events-none h-screen w-[320px] origin-top"
                style={{
                  clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
                  background:
                    "linear-gradient(to bottom, rgba(74, 222, 128, 0.4), rgba(74, 222, 128, 0))",
                  filter: "blur(12px)",
                  boxShadow: "0 0 80px 30px rgba(74, 222, 128, 0.3)",
                  visibility: hasLight ? "visible" : "hidden",
                }}
              />
            </div>
          </div>
        ))}

        <motion.div
          className="pointer-events-none absolute left-0 right-0 top-[60%] z-10 flex h-screen w-screen origin-center items-start justify-center will-change-transform"
          animate={backgroundAnimation(rotation, animationState, index)}
        >
          <div className="h-screen w-screen scale-110 self-center justify-self-center overflow-hidden bg-earth bg-contain bg-center bg-no-repeat drop-shadow-[0_0_50px_#00aaff]" />
        </motion.div>
      </motion.div>

      <MotionPress
        className="fixed bottom-5 left-5 xs:hidden xs:h-10 xs:w-10 md:block md:h-20 md:w-20"
        animate={pressIconAnimation}
        transition={pressIconTransition}
      />

      <MotionScroll
        className="fixed bottom-5 right-5 xs:hidden xs:h-10 xs:w-10 md:block md:h-20 md:w-20"
        animate={scrollIconAnimation}
        transition={scrollIconTransition}
      />

      <motion.div
        className="fixed z-30 flex gap-y-2 opacity-75 invert xs:left-1 xs:top-1 xs:flex-row sm:flex-col md:left-5 md:top-5"
        variants={iconsAnimated}
        initial="initial"
        animate="animate"
      >
        <motion.a
          href="https://github.com/Steph7478"
          onTouchStart={(e) => {
            e.preventDefault();
            window.open("https://github.com/Steph7478", "_blank");
          }}
          target="_blank"
          variants={openModal}
        >
          <motion.div
            initial="initial"
            variants={jelloHorizontalVariants}
            whileHover="animate"
            animate="initial"
          >
            <FaGithub className="p-2 xs:h-10 xs:w-10 md:h-12 md:w-12" />
          </motion.div>
        </motion.a>

        <motion.a
          href="https://linkedin.com/in/stephanie-gurgel-7998aa35b"
          onTouchStart={(e) => {
            e.preventDefault();
            window.open(
              "https://linkedin.com/in/stephanie-gurgel-7998aa35b",
              "_blank",
            );
          }}
          target="_blank"
          variants={openModal}
        >
          <motion.div
            initial="initial"
            variants={jelloHorizontalVariants}
            whileHover="animate"
            animate="initial"
          >
            <TbBrandLinkedinFilled className="p-2 xs:h-10 xs:w-10 md:h-12 md:w-12" />
          </motion.div>
        </motion.a>
      </motion.div>
    </>
  );
}
