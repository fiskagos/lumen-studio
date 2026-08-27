"use client";

import {useEffect, useRef, useState} from "react";

const fragments = [
  "THE VERSION THAT DOESN'T EXIST YET.",
  "TOO WEIRD?",
  "TOO EARLY?",
  "TOO AMBITIOUS?",
  "PERFECT.",
  "LET'S SEE WHERE IT GOES.",
];

type FlipPhase = "rest" | "out" | "in";

export default function ApproachStatement() {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  const [isVisible, setIsVisible] = useState(false);
  const [activeFragment, setActiveFragment] = useState(0);
  const [flipPhase, setFlipPhase] =
    useState<FlipPhase>("rest");

  useEffect(() => {
    const element = sectionRef.current;

    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
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

          // Reset the sequence when leaving the section.
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
    if (!isVisible) {
      return;
    }

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion) {
      setActiveFragment(fragments.length - 1);
      setFlipPhase("rest");
      return;
    }

    if (activeFragment === fragments.length - 1) {
      setFlipPhase("rest");
      return;
    }

    let startFlipTimer: number | undefined;
    let changeTextTimer: number | undefined;
    let finishFlipTimer: number | undefined;

    startFlipTimer = window.setTimeout(() => {
      setFlipPhase("out");

      changeTextTimer = window.setTimeout(() => {
        setActiveFragment((current) =>
          Math.min(
            current + 1,
            fragments.length - 1,
          ),
        );

        setFlipPhase("in");

        finishFlipTimer = window.setTimeout(() => {
          setFlipPhase("rest");
        }, 180);
      }, 140);
    }, 900);

    return () => {
      if (startFlipTimer !== undefined) {
        window.clearTimeout(startFlipTimer);
      }

      if (changeTextTimer !== undefined) {
        window.clearTimeout(changeTextTimer);
      }

      if (finishFlipTimer !== undefined) {
        window.clearTimeout(finishFlipTimer);
      }
    };
  }, [isVisible, activeFragment]);

  return (
    <div
      ref={sectionRef}
      className="approach-statement"
    >
      <div className="approach-flip-stage">
        <div
          className={`approach-flip-text ${
            flipPhase === "out"
              ? "is-flipping-out"
              : ""
          } ${
            flipPhase === "in"
              ? "is-flipping-in"
              : ""
          }`}
        >
          {fragments[activeFragment]}
        </div>
      </div>
    </div>
  );
}