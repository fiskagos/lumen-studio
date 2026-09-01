"use client";

import {useEffect, useState} from "react";

const capabilities = [
  {
    title: "DESIGN",
    tags: [
      "IDENTITY",
      "ART DIRECTION",
      "DIGITAL PRESENCE",
      "VISUAL SYSTEMS",
    ],
    body:
      "We shape clear, distinctive digital identities built around how a company wants to be seen, understood and remembered.",
  },
  {
    title: "COMMERCE",
    tags: [
      "SHOPIFY",
      "PRODUCT STRUCTURE",
      "COLLECTION ARCHITECTURE",
      "COMMERCE UX",
    ],
    body:
      "We design commerce around how people discover, understand and buy, making the path from interest to purchase feel clear and natural.",
  },
  {
    title: "AI",
    tags: [
      "AI FLOWS",
      "AUTOMATION",
      "SMART SYSTEMS",
      "CONTENT SUPPORT",
    ],
    body:
      "We apply AI where it genuinely improves the work, supporting better systems, workflows and customer experiences without unnecessary noise.",
  },
  {
    title: "ENGINEERING",
    tags: [
      "ARCHITECTURE",
      "PERFORMANCE",
      "SCALABILITY",
      "MAINTAINABILITY",
    ],
    body:
      "We build systems with technical discipline, designed to perform well, scale sensibly and remain maintainable over time.",
  },
] as const;

export default function CapabilitiesSection() {
  const [activeIndex, setActiveIndex] =
    useState<number | null>(null);

  const active =
    activeIndex !== null
      ? capabilities[activeIndex]
      : null;

  useEffect(() => {
    function handleCapabilitySelection(
      event: Event,
    ) {
      const capability = (
        event as CustomEvent<string>
      ).detail;

      const index = capabilities.findIndex(
        (item) =>
          item.title.toLowerCase() ===
          capability.toLowerCase(),
      );

      if (index >= 0) {
        setActiveIndex(index);
      }
    }

    window.addEventListener(
      "lumen:capability",
      handleCapabilitySelection,
    );

    return () => {
      window.removeEventListener(
        "lumen:capability",
        handleCapabilitySelection,
      );
    };
  }, []);

  return (
    <div className="capabilities-experience">

      {/* HOVER NOTE */}
      <div
        className={`capability-hover-note ${
          active ? "is-visible" : ""
        }`}
      >
        {active && (
          <>
            <div className="capability-hover-tags">
              {active.tags.map((tag) => (
                <span key={tag}>
                  {tag}
                </span>
              ))}
            </div>

            <p>
              {active.body}
            </p>
          </>
        )}
      </div>

      {/* CAPABILITIES */}
      <div className="capabilities-horizontal">
        {capabilities.map((item, index) => (
          <button
            key={item.title}
            type="button"
            className="capabilities-horizontal-item"
            onMouseEnter={() =>
              setActiveIndex(index)
            }
            onMouseLeave={() =>
              setActiveIndex(null)
            }
            onFocus={() =>
              setActiveIndex(index)
            }
            onBlur={() =>
              setActiveIndex(null)
            }
          >
            {item.title}
          </button>
        ))}
      </div>

    </div>
  );
}