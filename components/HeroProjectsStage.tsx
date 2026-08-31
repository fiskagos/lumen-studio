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

type SceneIndex = 0 | 1 | 2;

const LAST_SCENE: SceneIndex = 2;

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

    function handleWheel(
      event: WheelEvent,
    ) {
      if (lockedRef.current) {
        event.preventDefault();
        return;
      }

      /* NEXT SCENE */

      if (
        activeScene < LAST_SCENE &&
        event.deltaY > 25
      ) {
        event.preventDefault();

        goNext();

        return;
      }

      /* PREVIOUS SCENE */

      if (
        activeScene > 0 &&
        event.deltaY < -25 &&
        window.scrollY <= 2
      ) {
        event.preventDefault();

        goPrevious();

        return;
      }

      /*
       * On Capabilities:
       * scroll down remains normal,
       * so the page can continue
       * vertically into Approach.
       */
    }

    stage.addEventListener(
      "wheel",
      handleWheel,
      {
        passive: false,
      },
    );

    return () => {
      stage.removeEventListener(
        "wheel",
        handleWheel,
      );
    };
  }, [
    activeScene,
    goNext,
    goPrevious,
  ]);

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
          activeScene === 2
            ? "is-active"
            : "is-right"
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
          PREVIOUS <
          ===================================== */}

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