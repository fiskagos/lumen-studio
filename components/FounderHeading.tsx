"use client";

import {useEffect, useRef, useState} from "react";

export default function FounderHeading() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      {
        threshold: 0.35,
      },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`founder-heading ${visible ? "is-visible" : ""}`}
    >
      <h2>
        <span>I SHAPE IDEAS.</span>

        <span className="founder-reveal-line">
          I ENGINEER THEM
        </span>

        <span className="founder-reveal-line">
          TO LAST.
        </span>
      </h2>
    </div>
  );
}