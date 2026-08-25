"use client";

import {useState} from "react";
import ProjectIntake from "./ProjectIntake";

export default function ProjectStart() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className="project-start-button"
        onClick={() => setIsOpen(true)}
      >
        START A PROJECT
      </button>

      {isOpen && (
        <ProjectIntake
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
}