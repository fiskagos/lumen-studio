"use client";

import Image from "next/image";
import Link from "next/link";
import {useEffect, useRef, useState} from "react";

type AnimationMode = "idle" | "first" | "return";

const projects = [
  {
    id: "01",
    title: "Alice Salvetz",
    image: "/projects/alice-salvetz-01.jpg",
    href: "/projects/alice-salvetz",
  },
  {
    id: "02",
    title: "Northbound",
    image: "/projects/alice-salvetz-02.jpg",
    href: "/projects/northbound",
  },
  {
    id: "03",
    title: "Halden Press",
    image: "/projects/alice-salvetz-03.jpg",
    href: "/projects/halden-press",
  },
];

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const hasPlayedOnce = useRef(false);
  const isInside = useRef(false);

  const [mode, setMode] = useState<AnimationMode>("idle");

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
            setMode("first");
          } else {
            setMode("return");
          }

          return;
        }

        if (
          entry.intersectionRatio <= 0.1 &&
          isInside.current
        ) {
          isInside.current = false;
          setMode("idle");
        }
      },
      {
        threshold: [0, 0.1, 0.85],
      },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className={`projects-work-section projects-work-${mode}`}
    >
      <div className="projects-work-inner">

        <div className="projects-work-label">
          SELECTED WORK
        </div>

        <div className="projects-work-heading">
          <h2>
            Different ideas deserve
            <br />
            different forms.
          </h2>
        </div>

        {/* First landing reel */}
        <div
          className="projects-work-reel"
          aria-hidden="true"
        >
         <div className="projects-work-reel-frame">
  {projects.map((project, index) => (
    <div
      key={project.id}
      className={`projects-work-reel-item projects-work-reel-item-${index + 1}`}
    >
      <Image
        src={project.image}
        alt=""
        fill
        priority={index === 0}
        sizes="40vw"
        className="projects-work-reel-image"
      />
    </div>
  ))}
</div>
        </div>

        {/* Final scattered projects */}
        <div className="projects-work-scatter">
          {projects.map((project, index) => (
            <article
              key={project.id}
              className={`projects-work-card projects-work-card-${index + 1}`}
            >
              <Link
                href={project.href}
                className="projects-work-link"
                aria-label={`View ${project.title}`}
              >
                <div className="projects-work-image">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="30vw"
                    style={{objectFit: "cover"}}
                  />
                </div>

                <div className="projects-work-name">
                  {project.title}
                </div>
              </Link>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}