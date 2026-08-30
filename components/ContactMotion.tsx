"use client";

import {useEffect, useRef} from "react";

const DOT_SIZE = 40;

const ENTRY_DELAY = 550;
const DOT_STAGGER = 540;

const clusterOffsets = [-100, 0, 100];

export default function ContactMotion() {
  const layerRef = useRef<HTMLDivElement | null>(null);

  const dotRefs = useRef<Array<HTMLSpanElement | null>>([]);

  const contactWasReady = useRef(false);
  const dotsAreReady = useRef(false);

  useEffect(() => {
    const layer = layerRef.current;

    const contact =
      document.querySelector<HTMLElement>(
        ".contact-section",
      );

    const finalReveal =
      document.querySelector<HTMLElement>(
        ".final-reveal",
      );

    const finalDots = Array.from(
      document.querySelectorAll<HTMLElement>(
        ".final-reveal-dot",
      ),
    );

    const dots = dotRefs.current.filter(
      (dot): dot is HTMLSpanElement =>
        Boolean(dot),
    );

    if (
      !layer ||
      !contact ||
      !finalReveal ||
      dots.length !== 3 ||
      finalDots.length !== 3
    ) {
      return;
    }

    const reducedMotion =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

    if (reducedMotion) {
      layer.style.display = "none";
      return;
    }

    let animationFrame = 0;

    let targetProgress = 0;
    let currentProgress = 0;

    let lastScrollY = window.scrollY;
    let isScrollingDown = true;

    const entryTimers: number[] = [];

    const clamp = (value: number) =>
      Math.min(1, Math.max(0, value));

    const clearEntryTimers = () => {
      entryTimers.forEach((timer) => {
        window.clearTimeout(timer);
      });

      entryTimers.length = 0;
    };

    const setDotPosition = (
      dot: HTMLSpanElement,
      x: number,
      y: number,
      scale = 1,
    ) => {
      dot.style.transform = `
        translate3d(
          ${x - DOT_SIZE / 2}px,
          ${y - DOT_SIZE / 2}px,
          0
        )
        scale(${scale})
      `;
    };

    const getClusterPosition = (
      index: number,
    ) => ({
      x:
        window.innerWidth / 2 +
        clusterOffsets[index],

      y: window.innerHeight * 0.47,
    });

    const hideContactDots = () => {
      dotsAreReady.current = false;

      layer.style.opacity = "0";

      dots.forEach((dot) => {
        dot.style.transition = "none";
        dot.style.opacity = "0";
      });
    };

    /*
     * Contact entrance.
     *
     * The dots appear sharply one by one,
     * like three deliberate inputs.
     */
    const runDotSequence = () => {
      clearEntryTimers();

      dotsAreReady.current = false;

      dots.forEach((dot, index) => {
        const position =
          getClusterPosition(index);

        dot.style.transition = "none";
        dot.style.opacity = "0";

        setDotPosition(
          dot,
          position.x,
          position.y,
        );
      });

      layer.style.opacity = "1";

      dots.forEach((dot, index) => {
        const timer =
          window.setTimeout(() => {
            /*
             * Do not continue the sequence
             * if Contact has already been left.
             */
            if (!contactWasReady.current) {
              return;
            }

            dot.style.transition = "none";
            dot.style.opacity = "1";

            if (index === dots.length - 1) {
              dotsAreReady.current = true;
            }
          }, ENTRY_DELAY + index * DOT_STAGGER);

        entryTimers.push(timer);
      });
    };

    /*
     * Exact resting position of each dot
     * underneath L, M and N.
     */
    const getFinalPosition = (
      index: number,
    ) => {
      const finalRect =
        finalReveal.getBoundingClientRect();

      const dotRect =
        finalDots[index].getBoundingClientRect();

      return {
        x:
          dotRect.left +
          dotRect.width / 2,

        y:
          dotRect.top -
          finalRect.top +
          dotRect.height / 2,

        scale:
          Math.max(
            dotRect.width,
            6,
          ) / DOT_SIZE,
      };
    };

    const calculateState = () => {
      const viewportHeight =
        window.innerHeight;

      const scrollY =
        window.scrollY;

      isScrollingDown =
        scrollY >= lastScrollY;

      lastScrollY = scrollY;

      const contactTop =
        contact.getBoundingClientRect().top +
        scrollY;

      const finalTop =
        finalReveal.getBoundingClientRect().top +
        scrollY;

      const contactRect =
        contact.getBoundingClientRect();

      /*
       * Contact is considered landed only
       * once scroll snap has almost completely
       * settled the section.
       */
      const contactReady =
        contactRect.top <=
          viewportHeight * 0.08 &&
        contactRect.top >=
          -viewportHeight * 0.08 &&
        contactRect.bottom >=
          viewportHeight * 0.92;

      /*
       * Every fresh landing on Contact
       * restarts the three-dot sequence.
       */
      if (
        contactReady &&
        !contactWasReady.current
      ) {
        contactWasReady.current = true;

        targetProgress = 0;
        currentProgress = 0;

        hideContactDots();
        runDotSequence();
      }

      /*
       * Contact has been left.
       */
      if (
        !contactReady &&
        contactWasReady.current
      ) {
        contactWasReady.current = false;

        clearEntryTimers();
      }

      const journeyStart =
        contactTop +
        viewportHeight * 0.04;

      const journeyEnd =
        finalTop -
        viewportHeight * 0.04;

      targetProgress = clamp(
        (scrollY - journeyStart) /
          (journeyEnd - journeyStart),
      );

      /*
       * Important:
       *
       * Travelling only happens downward.
       * Once the dots reach FinalReveal,
       * they never travel backwards.
       */
      if (!isScrollingDown) {
        document.body.classList.remove(
          "contact-dot-journey",
        );

        if (!contactReady) {
          layer.style.opacity = "0";
        }
      }
    };

    const render = () => {
      /*
       * Contact itself owns the dots while
       * the section is fully landed.
       */
      if (contactWasReady.current) {
        animationFrame =
          window.requestAnimationFrame(render);

        return;
      }

      /*
       * Never reverse the journey.
       *
       * When leaving FinalReveal upwards,
       * the real LUMEN dots stay exactly
       * where they belong.
       */
      if (!isScrollingDown) {
        layer.style.opacity = "0";

        document.body.classList.remove(
          "contact-dot-journey",
        );

        animationFrame =
          window.requestAnimationFrame(render);

        return;
      }

      /*
       * Do not start travelling until all
       * three Contact dots have appeared.
       */
      if (!dotsAreReady.current) {
        animationFrame =
          window.requestAnimationFrame(render);

        return;
      }

      currentProgress +=
        (targetProgress -
          currentProgress) *
        0.045;

      if (
        Math.abs(
          targetProgress -
            currentProgress,
        ) < 0.0005
      ) {
        currentProgress =
          targetProgress;
      }

      const progress =
        clamp(currentProgress);

      const easedProgress =
        progress *
        progress *
        (3 - 2 * progress);

      const arc =
        Math.sin(
          Math.PI *
            easedProgress,
        );

      dots.forEach((dot, index) => {
        const start =
          getClusterPosition(index);

        const destination =
          getFinalPosition(index);

        const x =
          start.x +
          (
            destination.x -
            start.x
          ) *
            easedProgress;

        const individualLift = [
          -38,
          -70,
          -46,
        ][index];

        const y =
          start.y +
          (
            destination.y -
            start.y
          ) *
            easedProgress +
          arc *
            individualLift;

        const scale =
          1 +
          (
            destination.scale -
            1
          ) *
            easedProgress;

        dot.style.transition = "none";
        dot.style.opacity = "1";

        setDotPosition(
          dot,
          x,
          y,
          scale,
        );
      });

      /*
       * Hide FinalReveal's own dots only
       * while the travelling dots are visibly
       * approaching them.
       */
      if (
        progress > 0.015 &&
        progress < 0.985
      ) {
        document.body.classList.add(
          "contact-dot-journey",
        );

        layer.style.opacity = "1";
      }

      /*
       * Final handoff.
       *
       * From this moment on the real LUMEN
       * dots remain in FinalReveal.
       */
      if (
        progress >= 0.985 &&
        targetProgress >= 0.985
      ) {
        layer.style.opacity = "0";

        dotsAreReady.current = false;

        document.body.classList.remove(
          "contact-dot-journey",
        );
      }

      animationFrame =
        window.requestAnimationFrame(render);
    };

    const handleScroll = () => {
      calculateState();
    };

    const handleResize = () => {
      calculateState();
    };

    hideContactDots();

    calculateState();

    animationFrame =
      window.requestAnimationFrame(render);

    window.addEventListener(
      "scroll",
      handleScroll,
      {
        passive: true,
      },
    );

    window.addEventListener(
      "resize",
      handleResize,
    );

    return () => {
      clearEntryTimers();

      window.removeEventListener(
        "scroll",
        handleScroll,
      );

      window.removeEventListener(
        "resize",
        handleResize,
      );

      window.cancelAnimationFrame(
        animationFrame,
      );

      document.body.classList.remove(
        "contact-dot-journey",
      );
    };
  }, []);

  return (
    <div
      ref={layerRef}
      className="contact-motion-layer"
      aria-hidden="true"
    >
      {[0, 1, 2].map((index) => (
        <span
          key={index}
          ref={(element) => {
            dotRefs.current[index] =
              element;
          }}
          className="contact-motion-dot"
        />
      ))}
    </div>
  );
}