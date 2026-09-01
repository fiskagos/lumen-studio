"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";


import Hero from "@/components/Hero";
import ProjectsSection from "@/components/ProjectsSection";
import CapabilitiesHeading from "@/components/CapabilitiesHeading";
import CapabilitiesSection from "@/components/CapabilitiesSection";
import ApproachStatement from "@/components/ApproachStatement";
import ProjectStart from "@/components/ProjectStart";
import FounderHeading from "@/components/FounderHeading";

type SceneIndex = 0 | 1 | 2 | 3 | 4;
const LAST_SCENE: SceneIndex = 4;

export default function HeroProjectsStage() {
  const [activeScene, setActiveScene] =
    useState<SceneIndex>(0);

  const stageRef =
    useRef<HTMLDivElement | null>(null);

  const lockedRef = useRef(false);

  const moveTo = useCallback(
    (scene: SceneIndex) => {
      if (
        lockedRef.current ||
        scene === activeScene
      ) {
        return;
      }

      lockedRef.current = true;

      setActiveScene(scene);

      window.setTimeout(() => {
        lockedRef.current = false;
      }, 1000);
    },
    [activeScene],
  );

  const goNext = useCallback(() => {
    if (activeScene >= LAST_SCENE) {
      return;
    }

    moveTo(
      (activeScene + 1) as SceneIndex,
    );
  }, [activeScene, moveTo]);

  const goPrevious = useCallback(() => {
    if (activeScene <= 0) {
      return;
    }

    moveTo(
      (activeScene - 1) as SceneIndex,
    );
  }, [activeScene, moveTo]);

  /* =========================================
     WHEEL / TRACKPAD
     ========================================= */

  useEffect(() => {
  const stage = stageRef.current;

  if (!stage) {
    return;
  }

  function handleWheel(event: WheelEvent) {
    event.preventDefault();

    if (lockedRef.current) {
      return;
    }

    if (event.deltaY > 25) {
      goNext();
      return;
    }

    if (event.deltaY < -25) {
      goPrevious();
    }
  }

  stage.addEventListener("wheel", handleWheel, {
    passive: false,
  });

  return () => {
    stage.removeEventListener("wheel", handleWheel);
  };
}, [goNext, goPrevious]);

  /* =========================================
     KEYBOARD
     ========================================= */

  useEffect(() => {
    function handleKeyDown(
      event: KeyboardEvent,
    ) {
      if (
        activeScene < LAST_SCENE &&
        (
          event.key === "ArrowRight" ||
          event.key === "ArrowDown"
        )
      ) {
        event.preventDefault();

        goNext();

        return;
      }

      if (
        activeScene > 0 &&
        window.scrollY <= 2 &&
        (
          event.key === "ArrowLeft" ||
          event.key === "ArrowUp"
        )
      ) {
        event.preventDefault();

        goPrevious();
      }
    }

    window.addEventListener(
      "keydown",
      handleKeyDown,
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown,
      );
    };
  }, [
    activeScene,
    goNext,
    goPrevious,
  ]);

  return (
    <div
      ref={stageRef}
      className="lumen-hero-projects-stage"
      data-scene={activeScene}
    >
      {/* =====================================
          HERO
          ===================================== */}

      <div
        className={`lumen-hp-scene lumen-hp-hero ${
          activeScene === 0
            ? "is-active"
            : "is-left"
        }`}
      >
        <Hero />
      </div>

      {/* =====================================
          PROJECTS
          ===================================== */}

      <div
        className={`lumen-hp-scene lumen-hp-projects ${
          activeScene === 0
            ? "is-right"
            : activeScene === 1
              ? "is-active"
              : "is-left"
        }`}
      >
       <ProjectsSection
          sceneActive={
            activeScene === 1
          }
        />
      </div>

      {/* =====================================
          CAPABILITIES
          ===================================== */}

      <div
       className={`lumen-hp-scene lumen-hp-capabilities ${
  activeScene < 2
    ? "is-right"
    : activeScene === 2
      ? "is-active"
      : "is-left"
}`}


      >
        <section
          id="capabilities"
          className="capabilities-section"
        >
          <div className="capabilities-intro">
           <CapabilitiesHeading
  firstLine="Thoughtfully designed."
  secondLine="Precisely built."
/>
          </div>

          <CapabilitiesSection />
        </section>
      </div>

{/* =====================================
    FOUNDER / BIO
    ===================================== */}

<div
  className={`lumen-hp-scene lumen-hp-founder ${
    activeScene < 3
      ? "is-right"
      : activeScene === 3
        ? "is-active"
        : "is-left"
  }`}
>
  <section className="founder-section">

    <div className="founder-label">
      THE PERSON BEHIND LUMEN
    </div>

    <div className="founder-content">

      <FounderHeading />

      <div className="founder-bio">
        <p>
          My background is in software engineering, but I&apos;ve
          always been drawn to the space where technology, design
          and human experience meet.
        </p>

        <p>
          Years spent working across digital experience at
          Netcentric and Adobe, and later building complex systems
          in the pharmaceutical world, shaped the way I think about
          technology: not just how things look, but how they work,
          scale and last.
        </p>

        <p>
          But I&apos;ve always been a creator at heart. There&apos;s
          something remarkable about taking an idea that exists only
          in someone&apos;s mind and giving it form, making something
          that didn&apos;t exist before and could only belong to that
          person.
        </p>

        <p>
          I created Lumen to bring those two worlds together: the
          freedom of creating something unique and the discipline of
          engineering it well.
        </p>

      </div>

     <div className="founder-meta">
  <span className="founder-signature">
    P.B.
  </span>

  <span className="founder-role">
    FOUNDER · DESIGNER · ENGINEER
  </span>
</div>

    </div>

  </section>
</div>
{/* =====================================
    APPROACH / CONTACT
    ===================================== */}

<div
  className={`lumen-hp-scene lumen-hp-final ${
    activeScene === 4
      ? "is-active"
      : "is-right"
  }`}
>

  <section className="lumen-final-scene">

    {/* MAIN STATEMENT */}
    <div className="lumen-final-approach">
      <ApproachStatement />
    </div>

    {/* FLIPPING WORDS / ROWS */}
    <div className="lumen-final-motion">
    </div>

    {/* START A PROJECT */}
    <div className="lumen-final-project-start">
      <ProjectStart />
    </div>

    {/* SAY HELLO */}
    <div className="lumen-final-hello">
      <span>OR JUST SAY HELLO</span>

      <a href="mailto:hello@lumenstudio.com">
        HELLO@LUMENSTUDIO.COM
      </a>
    </div>

  </section>
</div>
      {/* =====================================
          PREVIOUS <
          ===================================== */}

      <div
        className="lumen-stage-progress"
        aria-hidden="true"
      >
        {String(activeScene + 1).padStart(2, "0")} /{" "}
        {String(LAST_SCENE + 1).padStart(2, "0")}
      </div>

      {activeScene > 0 && (
        <button
          type="button"
          className="lumen-stage-nav lumen-stage-nav-prev"
          aria-label="Previous scene"
          onClick={goPrevious}
        >
          <span
            className="lumen-stage-chevron"
            aria-hidden="true"
          />
        </button>
      )}

      {/* =====================================
          NEXT >
          ===================================== */}

      {activeScene < LAST_SCENE && (
        <button
          type="button"
          className="lumen-stage-nav lumen-stage-nav-next"
          aria-label="Next scene"
          onClick={goNext}
        >
          <span
            className="lumen-stage-chevron"
            aria-hidden="true"
          />
        </button>
      )}
    </div>
  );
}