import { useCallback, useEffect, useRef, useState } from "react";

export const useScrollSessions = (
  pauseScroll: boolean = false,
  maxIndex: number = 2,
) => {
  const [index, setIndex] = useState(0);
  const isAnimating = useRef(false);
  const touchStartY = useRef<number | null>(null);

  const scrollToIndex = useCallback(
    (target: number) => {
      const clamped = Math.max(0, Math.min(maxIndex, target));
      if (clamped !== index) {
        isAnimating.current = true;
        setIndex(clamped);
      }
    },
    [index, maxIndex],
  );

  const triggerScroll = useCallback(
    (direction: number) => {
      if (!pauseScroll && !isAnimating.current) {
        scrollToIndex(index + direction);
      }
    },
    [index, pauseScroll, scrollToIndex],
  );

  useEffect(() => {
    if (!isAnimating.current) return;
    const timeout = setTimeout(() => (isAnimating.current = false), 800);
    return () => clearTimeout(timeout);
  }, [index]);

  const handleScroll = useCallback(
    (e: React.WheelEvent<HTMLDivElement>) => {
      triggerScroll(e.deltaY > 0 ? 1 : -1);
    },
    [triggerScroll],
  );

  const handleTouchStart = useCallback(
    (e: TouchEvent) => {
      if (!pauseScroll) {
        touchStartY.current = e.touches[0].clientY;
        e.preventDefault();
      }
    },
    [pauseScroll],
  );

  const handleTouchEnd = useCallback(
    (e: TouchEvent) => {
      if (pauseScroll || isAnimating.current || touchStartY.current === null)
        return;

      e.preventDefault();

      const deltaY = touchStartY.current - e.changedTouches[0].clientY;
      const direction = deltaY > 30 ? 1 : deltaY < -30 ? -1 : 0;

      triggerScroll(direction);
      touchStartY.current = null;
    },
    [pauseScroll, triggerScroll],
  );

  useEffect(() => {
    const opts = { passive: false } as const;
    window.addEventListener("touchstart", handleTouchStart, opts);
    window.addEventListener("touchend", handleTouchEnd, opts);

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [handleTouchStart, handleTouchEnd]);

  return {
    index,
    isAnimating,
    handleScroll,
    getTranslateY: () => `-${index * 100}vh`,
  };
};
