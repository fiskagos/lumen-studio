"use client";

import {
  type CSSProperties,
  useLayoutEffect,
  useRef,
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

type MotionStyle = CSSProperties & {
  "--target-x": string;
  "--target-y": string;
  "--target-scale": number;
};

export default function Hero() {
  const [step, setStep] = useState(0);
  const [settledCount, setSettledCount] = useState(0);

  const [motionStyle, setMotionStyle] =
    useState<MotionStyle>({
      "--target-x": "0px",
      "--target-y": "0px",
      "--target-scale": 0.1,
    });

  const heroRef = useRef<HTMLElement | null>(null);
  const wordRef = useRef<HTMLDivElement | null>(null);

  const targetRefs =
    useRef<(HTMLAnchorElement | null)[]>([]);

  const introFinished = step >= words.length;

  useLayoutEffect(() => {
    if (introFinished) {
      return;
    }

    const hero = heroRef.current;
    const word = wordRef.current;
    const target = targetRefs.current[step];

    if (!hero || !word || !target) {
      return;
    }

    const heroRect = hero.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();

    const heroCenterX =
      heroRect.left + heroRect.width / 2;

    const heroCenterY =
      heroRect.top + heroRect.height / 2;

    const targetCenterX =
      targetRect.left + targetRect.width / 2;

    const targetCenterY =
      targetRect.top + targetRect.height / 2;

    const wordFontSize = parseFloat(
      window.getComputedStyle(word).fontSize
    );

    const targetFontSize = parseFloat(
      window.getComputedStyle(target).fontSize
    );

    setMotionStyle({
      "--target-x": `${
        targetCenterX - heroCenterX
      }px`,

      "--target-y": `${
        targetCenterY - heroCenterY
      }px`,

      "--target-scale":
        targetFontSize / wordFontSize,
    });
  }, [step, introFinished]);

  function handleWordFinished() {
    setSettledCount(step + 1);
    setStep((current) => current + 1);
  }
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
      ref={heroRef}
      className="lumen-intro-hero"
    >
      {/* =====================================
          BRAND
          ===================================== */}

      <a
        href="#hero"
        aria-label="Back to top"
        className={`lumen-hero-brand ${
          introFinished ? "dots-visible" : ""
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
          INTRO WORD
          ===================================== */}

      {!introFinished && (
        <div
          key={words[step]}
          className="lumen-intro-stage"
        >
          <div
            ref={wordRef}
            className="lumen-intro-word lumen-intro-trackingOversize"
            style={motionStyle}
            onAnimationEnd={handleWordFinished}
          >
            {words[step]}
          </div>
        </div>
      )}


      {/* =====================================
          FINAL STATEMENT
          ===================================== */}

      {introFinished && (
        <div className="lumen-final-statement">
          <h1>
            <span>Ideas deserve</span>
            <span>more than</span>
            <span>a template.</span>
          </h1>
        </div>
      )}


      {/* =====================================
          FOOTER CAPABILITIES
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
                  settledCount > index
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
  ref={(element) => {
    targetRefs.current[index] = element;
  }}
  className={`lumen-hero-capability ${
    settledCount > index
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
          LINKEDIN
          ===================================== */}

      <a
        className="lumen-hero-linkedin"
        href="https://www.linkedin.com/company/lumen-studio-design/"
        target="_blank"
        rel="noopener noreferrer"
      >
        LINKEDIN
      </a>
    </section>
  );
}