"use client";

import {useEffect, useRef, useState} from "react";

export default function FinalReveal() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.5,
      },
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`final-reveal ${
        isVisible ? "is-visible" : ""
      }`}
    >
      <div className="final-reveal-brand">
        <span className="final-reveal-letter">
          L
          <span
            className="final-reveal-dot"
            aria-hidden="true"
          />
        </span>

        <span>U</span>

        <span className="final-reveal-letter">
          M
          <span
            className="final-reveal-dot"
            aria-hidden="true"
          />
        </span>

        <span>E</span>

        <span className="final-reveal-letter">
          N
          <span
            className="final-reveal-dot"
            aria-hidden="true"
          />
        </span>
      </div>
    </section>
  );
}