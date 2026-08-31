"use client";

import {
  useEffect,
  useState,
} from "react";

const words = [
  "DESIGN",
  "COMMERCE",
  "AI",
  "ENGINEERING",
] as const;

const capabilityTargets = [
  "design",
  "commerce",
  "ai",
  "engineering",
] as const;

export default function Hero() {
  const [openingFinished, setOpeningFinished] =
    useState(false);

  /* =========================================
     WAIT FOR LUMEN OPENING
     ========================================= */

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setOpeningFinished(true);
    }, 5200);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  /* =========================================
     CAPABILITY CLICK
     ========================================= */

  function handleCapabilityClick(
    event: React.MouseEvent<HTMLAnchorElement>,
    capability: string,
  ) {
    event.preventDefault();

    window.dispatchEvent(
      new CustomEvent("lumen:capability", {
        detail: capability,
      }),
    );

    document
      .getElementById("capabilities")
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  }

  return (
    <section
      id="hero"
      className={`lumen-intro-hero ${
        openingFinished ? "is-ready" : ""
      }`}
    >
      {/* =====================================
          BRAND
          ===================================== */}

      <a
        href="#hero"
        aria-label="Back to top"
        className={`lumen-hero-brand ${
          openingFinished ? "dots-visible" : ""
        }`}
      >
        <span className="lumen-brand-letter">
          L

          <span
            className="lumen-brand-dot lumen-brand-dot-1"
            aria-hidden="true"
          />
        </span>

        <span>U</span>

        <span className="lumen-brand-letter">
          M

          <span
            className="lumen-brand-dot lumen-brand-dot-2"
            aria-hidden="true"
          />
        </span>

        <span>E</span>

        <span className="lumen-brand-letter">
          N

          <span
            className="lumen-brand-dot lumen-brand-dot-3"
            aria-hidden="true"
          />
        </span>
      </a>

      {/* =====================================
          HERO STATEMENT
          ===================================== */}

      {openingFinished && (
        <div className="lumen-final-statement">
          <h1>
            <span>Ideas deserve</span>
            <span>more than</span>
            <span>a template.</span>
          </h1>
        </div>
      )}

      {/* =====================================
          FIXED CAPABILITIES
          ===================================== */}

      <div className="lumen-hero-footer-capabilities">
        {words.map((word, index) => (
          <span
            key={word}
            className="lumen-hero-capability-group"
          >
            {index > 0 && (
              <span
                className={`lumen-hero-separator ${
                  openingFinished
                    ? "is-visible"
                    : ""
                }`}
              >
                ·
              </span>
            )}

            <a
              href="#capabilities"
              onClick={(event) =>
                handleCapabilityClick(
                  event,
                  capabilityTargets[index],
                )
              }
              className={`lumen-hero-capability ${
                openingFinished
                  ? "is-visible"
                  : ""
              }`}
            >
              {word}
            </a>
          </span>
        ))}
      </div>

      {/* =====================================
          NEXT SCENE
          ===================================== */}

      <button
  type="button"
  className="lumen-scene-nav lumen-scene-nav-next"
  aria-label="Next"
>
 <span
  className="lumen-scene-nav-arrow"
  aria-hidden="true"
/>
</button>
    </section>
  );
}