"use client";

import {useEffect, useState} from "react";

type HeroTargetMetrics = {
  rect: DOMRect;
  fontSize: number;
};

const capabilities = [
  "DESIGN",
  "COMMERCE",
  "AI",
  "ENGINEERING",
] as const;

type Props = {
  getTargetMetrics: (
    index: number
  ) => HeroTargetMetrics | null;

  onSettled: (count: number) => void;
  onComplete: () => void;
};

type TargetPosition = {
  left: number;
  top: number;
  fontSize: number;
};

export default function HeroCapabilitiesIntro({
  getTargetMetrics,
  onSettled,
  onComplete,
}: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [moving, setMoving] = useState(false);

  const [target, setTarget] =
    useState<TargetPosition | null>(null);

  useEffect(() => {
    setMoving(false);
    setTarget(null);

    /*
     * Word sits in the centre for a moment.
     */
    const moveTimer = window.setTimeout(() => {
      const metrics = getTargetMetrics(activeIndex);

      if (!metrics) {
        return;
      }

      const {rect, fontSize} = metrics;

      setTarget({
        left: rect.left + rect.width / 2,
        top: rect.top + rect.height / 2,
        fontSize,
      });

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setMoving(true);
        });
      });
    }, 500);

    /*
     * After movement finishes,
     * reveal the real footer word.
     */
    const settleTimer = window.setTimeout(() => {
      onSettled(activeIndex + 1);

      if (activeIndex === capabilities.length - 1) {
        /*
         * All four are home.
         * Now reveal the statement.
         */
        window.setTimeout(() => {
          onComplete();
        }, 350);
      } else {
        setActiveIndex((current) => current + 1);
      }
    }, 1450);

    return () => {
      window.clearTimeout(moveTimer);
      window.clearTimeout(settleTimer);
    };
  }, [
    activeIndex,
    getTargetMetrics,
    onSettled,
    onComplete,
  ]);

  const capability = capabilities[activeIndex];

  return (
    <div className="hero-intro">
      <span
        key={capability}
        className={`hero-intro-word ${
          moving ? "is-moving" : ""
        }`}
        style={
          moving && target
            ? {
                left: `${target.left}px`,
                top: `${target.top}px`,
                fontSize: `${target.fontSize}px`,
              }
            : undefined
        }
      >
        {capability}
      </span>
    </div>
  );
}