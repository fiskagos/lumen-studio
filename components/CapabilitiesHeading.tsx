"use client";

import useInView from "@/hooks/useInView";

type CapabilitiesHeadingProps = {
  firstLine: string;
  secondLine: string;
};

export default function CapabilitiesHeading({
  firstLine,
  secondLine,
}: CapabilitiesHeadingProps) {
  const {ref, isVisible} = useInView<HTMLHeadingElement>({
    threshold: 0.5,
  });

  return (
    <h2
      ref={ref}
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