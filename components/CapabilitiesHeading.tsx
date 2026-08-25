"use client";

import {useEffect, useRef, useState} from "react";

type CapabilitiesHeadingProps = {
  firstLine: string;
  secondLine: string;
};

export default function CapabilitiesHeading({
  firstLine,
  secondLine,
}: CapabilitiesHeadingProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const heading = headingRef.current;

    if (!heading) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.5,
      }
    );

    observer.observe(heading);

    return () => observer.disconnect();
  }, []);

  return (
    <h2
      ref={headingRef}
      className={`capabilities-heading ${
        isVisible ? "is-visible" : ""
      }`}
    >
      <span className="headline-static">
        {firstLine}
      </span>

      <span className="headline-reveal">
        {secondLine}
      </span>
    </h2>
  );
}