"use client";

import {useState} from "react";
import {createPortal} from "react-dom";
import ProjectIntake from "./ProjectIntake";

export default function ProjectStart() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className="project-start-button"
        onClick={() => setIsOpen(true)}
        aria-label="Bring it to life"
      >
        <span className="project-start-line project-start-line-1">
          Bring it
        </span>

        <span className="project-start-line project-start-line-2">
          to life
        </span>
      </button>

      {isOpen &&
        createPortal(
          <ProjectIntake
            onClose={() => setIsOpen(false)}
          />,
          document.body,
        )}
    </>
  );
}