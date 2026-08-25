"use client";

import {useEffect, useRef, useState} from "react";

export default function RevealHeading() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
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
      className={`reveal-heading ${visible ? "is-visible" : ""}`}
    >
      <span className="reveal-line">
        <span>Thoughtfully designed.</span>
      </span>

      <span className="reveal-line reveal-line-delay">
        <span>Seriously engineered.</span>
      </span>
    </div>
  );
}