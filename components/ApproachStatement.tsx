"use client";

import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";

const fragments = [
  "THE VERSION THAT DOESN'T EXIST YET.",
  "TOO WEIRD?",
  "TOO EARLY?",
  "TOO AMBITIOUS?",
  "PERFECT.",
  "LET'S SEE WHERE IT GOES.",
];

type FlipPhase = "rest" | "out" | "in";

function subscribeToReducedMotion(
  callback: () => void,
) {
  const mediaQuery = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  );

  mediaQuery.addEventListener(
    "change",
    callback,
  );

  return () => {
    mediaQuery.removeEventListener(
      "change",
      callback,
    );
  };
}

function getReducedMotionSnapshot() {
  return window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

export default function ApproachStatement() {
  const sectionRef =
    useRef<HTMLDivElement | null>(null);

  const [isVisible, setIsVisible] =
    useState(false);

  const [
    activeFragment,
    setActiveFragment,
  ] = useState(0);

  const [flipPhase, setFlipPhase] =
    useState<FlipPhase>("rest");

  const reducedMotion =
    useSyncExternalStore(
      subscribeToReducedMotion,
      getReducedMotionSnapshot,
      getReducedMotionServerSnapshot,
    );

  useEffect(() => {
    const element = sectionRef.current;

    if (!element) {
      return;
    }

    const observer =
      new IntersectionObserver(
        ([entry]) => {
          if (
            entry.isIntersecting &&
            entry.intersectionRatio >= 0.35
          ) {
            setIsVisible(true);
            return;
          }

          if (!entry.isIntersecting) {
            setIsVisible(false);

            /*
             * Reset the sequence when leaving
             * the section so it can replay
             * on the next visit.
             */
            setActiveFragment(0);
            setFlipPhase("rest");
          }
        },
        {
          threshold: [0, 0.35],
        },
      );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (
      !isVisible ||
      reducedMotion ||
      activeFragment ===
        fragments.length - 1
    ) {
      return;
    }

    let changeTextTimer:
      | number
      | undefined;

    let finishFlipTimer:
      | number
      | undefined;

    const holdDuration =
      activeFragment === 0
        ? 2200
        : 900;

    const startFlipTimer =
      window.setTimeout(() => {
        setFlipPhase("out");

        changeTextTimer =
          window.setTimeout(() => {
            setActiveFragment(
              (current) =>
                Math.min(
                  current + 1,
                  fragments.length - 1,
                ),
            );

            setFlipPhase("in");

            finishFlipTimer =
              window.setTimeout(
                () => {
                  setFlipPhase("rest");
                },
                180,
              );
          }, 140);
      }, holdDuration);

    return () => {
      window.clearTimeout(
        startFlipTimer,
      );

      if (
        changeTextTimer !== undefined
      ) {
        window.clearTimeout(
          changeTextTimer,
        );
      }

      if (
        finishFlipTimer !== undefined
      ) {
        window.clearTimeout(
          finishFlipTimer,
        );
      }
    };
  }, [
    isVisible,
    reducedMotion,
    activeFragment,
  ]);

  const displayedFragment =
    reducedMotion
      ? fragments.length - 1
      : activeFragment;

  const displayedFlipPhase =
    reducedMotion
      ? "rest"
      : flipPhase;

  return (
    <div
      ref={sectionRef}
      className="approach-statement"
    >
      <div className="approach-flip-stage">
        <div
          className={`approach-flip-text ${
            displayedFlipPhase === "out"
              ? "is-flipping-out"
              : ""
          } ${
            displayedFlipPhase === "in"
              ? "is-flipping-in"
              : ""
          }`}
        >
          {
            fragments[
              displayedFragment
            ]
          }
        </div>
      </div>
    </div>
  );
}