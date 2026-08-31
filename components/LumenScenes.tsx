"use client";

import {
  Children,
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type LumenScenesProps = {
  children: ReactNode;
};

const WHEEL_THRESHOLD = 40;
const TRANSITION_LOCK = 900;

export default function LumenScenes({
  children,
}: LumenScenesProps) {
  const scenes = useMemo(
    () => Children.toArray(children),
    [children],
  );

  const [activeScene, setActiveScene] = useState(0);
  const [showDirectionHint, setShowDirectionHint] =
    useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const transitionLocked = useRef(false);

  const lastScene = scenes.length - 1;

  /* =========================================
     CHANGE SCENE
     ========================================= */

  const moveScene = useCallback(
    (direction: -1 | 1) => {
      if (transitionLocked.current) {
        return;
      }

      setActiveScene((current) => {
        const next = Math.min(
          Math.max(current + direction, 0),
          lastScene,
        );

        if (next === current) {
          return current;
        }

        transitionLocked.current = true;

        window.setTimeout(() => {
          transitionLocked.current = false;
        }, TRANSITION_LOCK);

        return next;
      });
    },
    [lastScene],
  );

  /* =========================================
     MOUSE WHEEL / TRACKPAD
     vertical gesture → horizontal scene
     ========================================= */

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    function handleWheel(event: WheelEvent) {
      const movement =
        Math.abs(event.deltaY) >= Math.abs(event.deltaX)
          ? event.deltaY
          : event.deltaX;

      if (Math.abs(movement) < WHEEL_THRESHOLD) {
        return;
      }

      event.preventDefault();

      if (movement > 0) {
        moveScene(1);
      } else {
        moveScene(-1);
      }
    }

    container.addEventListener(
      "wheel",
      handleWheel,
      {
        passive: false,
      },
    );

    return () => {
      container.removeEventListener(
        "wheel",
        handleWheel,
      );
    };
  }, [moveScene]);

  /* =========================================
     KEYBOARD
     ========================================= */

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (
        event.key === "ArrowRight" ||
        event.key === "ArrowDown"
      ) {
        event.preventDefault();
        moveScene(1);
      }

      if (
        event.key === "ArrowLeft" ||
        event.key === "ArrowUp"
      ) {
        event.preventDefault();
        moveScene(-1);
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
  }, [moveScene]);

  /* =========================================
     FIRST-VISIT DIRECTION HINT

     Opening = ~5 seconds.
     After Hero appears, briefly reveal
     the right chevron once.
     ========================================= */

  useEffect(() => {
  const revealTimer = window.setTimeout(() => {
    setShowDirectionHint(true);
  }, 5700);

  const hideTimer = window.setTimeout(() => {
    setShowDirectionHint(false);
  }, 7000);

  return () => {
    window.clearTimeout(revealTimer);
    window.clearTimeout(hideTimer);
  };
}, []);

  return (
    <div
      ref={containerRef}
      className="lumen-scenes"
      data-active-scene={activeScene}
    >
      {/* =====================================
          SCENE TRACK
          ===================================== */}

      <div
        className="lumen-scenes-track"
        style={{
          transform: `translate3d(-${
            activeScene * 100
          }vw, 0, 0)`,
        }}
      >
        {scenes.map((scene, index) => (
          <div
            key={index}
            className={`lumen-scene ${
              activeScene === index
                ? "is-active"
                : ""
            }`}
            aria-hidden={
              activeScene !== index
            }
          >
            {scene}
          </div>
        ))}
      </div>

      {/* =====================================
          PREVIOUS
          ===================================== */}

      {activeScene > 0 && (
        <button
          type="button"
          className="lumen-scene-nav lumen-scene-nav-prev"
          aria-label="Previous scene"
          onClick={() => moveScene(-1)}
        >
          <span
            className="lumen-scene-nav-arrow"
            aria-hidden="true"
          />
        </button>
      )}

      {/* =====================================
          NEXT
          ===================================== */}

      {activeScene < lastScene && (
        <button
          type="button"
          className={`lumen-scene-nav lumen-scene-nav-next ${
  activeScene === 0 && showDirectionHint
    ? "is-hinting"
    : ""
}`}
          aria-label="Next scene"
          onClick={() => moveScene(1)}
        >
          <span
            className="lumen-scene-nav-arrow"
            aria-hidden="true"
          />
        </button>
      )}
    </div>
  );
}