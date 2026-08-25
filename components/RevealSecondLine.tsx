"use client";

import {useEffect, useRef, useState} from "react";

type RevealSecondLineProps = {
  children: React.ReactNode;
};

export default function RevealSecondLine({
  children,
}: RevealSecondLineProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.35,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <span
      ref={ref}
      className={`reveal-second-line ${visible ? "is-visible" : ""}`}
    >
      {children}
    </span>
  );
}