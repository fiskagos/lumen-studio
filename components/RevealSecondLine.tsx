"use client";

import useInView from "@/hooks/useInView";

type RevealSecondLineProps = {
  children: React.ReactNode;
};

export default function RevealSecondLine({
  children,
}: RevealSecondLineProps) {
  const {ref, isVisible} = useInView<HTMLSpanElement>({
    threshold: 0.35,
    once: true,
  });

  return (
    <span
      ref={ref}
      className={`reveal-second-line ${
        isVisible ? "is-visible" : ""
      }`}
    >
      {children}
    </span>
  );
}