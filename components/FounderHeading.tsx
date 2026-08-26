"use client";

import useInView from "@/hooks/useInView";

export default function FounderHeading() {
  const {ref, isVisible} = useInView<HTMLDivElement>({
    threshold: 0.35,
  });

  return (
    <div
      ref={ref}
      className={`founder-heading ${isVisible ? "is-visible" : ""}`}
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