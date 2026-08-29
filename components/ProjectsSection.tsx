"use client";

import Image from "next/image";
import {useEffect, useRef, useState} from "react";

const featuredProject = {
  title: "Alice Salvetz",
  href: "https://alicesalvetz.com",
  frames: [
    {
      id: "home",
      src: "/projects/alice/alice-home.jpg",
      alt: "Alice Salvetz homepage",
    },
    {
      id: "works",
      src: "/projects/alice/alice-works.jpg",
      alt: "Alice Salvetz works page",
    },
    {
      id: "product",
      src: "/projects/alice/alice-product.jpg",
      alt: "Alice Salvetz artwork page",
    },
    {
      id: "mobile",
      src: "/projects/alice/alice-mobile.jpg",
      alt: "Alice Salvetz mobile experience",
    },
  ],
};

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const hasPlayedOnce = useRef(false);
  const isInside = useRef(false);

  const [isActive, setIsActive] = useState(false);
  const [isReturning, setIsReturning] = useState(false);
  const [isSettled, setIsSettled] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (
          entry.isIntersecting &&
          entry.intersectionRatio >= 0.85 &&
          !isInside.current
        ) {
          isInside.current = true;

          if (!hasPlayedOnce.current) {
            hasPlayedOnce.current = true;

            setIsReturning(false);
            setIsSettled(false);
            setIsActive(true);
          } else {
            setIsReturning(true);
            setIsSettled(true);
            setIsActive(true);
          }

          return;
        }

        if (
          entry.intersectionRatio <= 0.1 &&
          isInside.current
        ) {
          isInside.current = false;

          setIsActive(false);
        }
      },
      {
        threshold: [0, 0.1, 0.85],
      },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isActive || isReturning) {
      return;
    }

    /*
     * Reveal the project link only after
     * the first intro sequence has finished.
     */
    const settleTimer = window.setTimeout(() => {
      setIsSettled(true);
    }, 3200);

    return () => {
      window.clearTimeout(settleTimer);
    };
  }, [isActive, isReturning]);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className={`projects-clean-section ${
        isActive ? "is-active" : ""
      } ${
        isReturning ? "is-returning" : ""
      } ${
        isSettled ? "is-settled" : ""
      }`}
    >
      <div className="projects-clean-stage">
        <div className="projects-final-heading">
          <h2>
            <span className="projects-heading-first">
              Give the idea
            </span>

            <span className="projects-heading-second">
              somewhere to
              <br />
              live.
            </span>
          </h2>
        </div>

        <div className="projects-reel">
          <div className="projects-reel-background" />

          <div className="projects-reel-stack">
            {featuredProject.frames.map((frame, index) => (
              <div
                key={frame.id}
                className={`projects-reel-layer projects-reel-layer-${index + 1}`}
              >
                <Image
                  src={frame.src}
                  alt={frame.alt}
                  fill
                  sizes="50vw"
                  className="projects-reel-image"
                  priority={index === 0}
                />
              </div>
            ))}
          </div>
        </div>

        <a
          href={featuredProject.href}
          target="_blank"
          rel="noopener noreferrer"
          className="projects-site-link"
        >
          ALICE SALVETZ ↗
        </a>
      </div>
    </section>
  );
}
