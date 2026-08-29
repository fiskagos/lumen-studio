"use client";

import {useState} from "react";
import FragmentedImage from "./FragmentedImage";
import {useInViewOnce} from "@/hooks/useInViewOnce";

type ProjectPanelProps = {
  index: number;
  total: number;
  title: string;
  category: string;
  year: string;
  image: string;
  alt: string;
  priority?: boolean;
};

export default function ProjectPanel({
  index,
  total,
  title,
  category,
  year,
  image,
  alt,
  priority = false,
}: ProjectPanelProps) {
  const {ref, isInView} =
    useInViewOnce<HTMLElement>();

  const [imageReady, setImageReady] =
    useState(false);

  /*
   * Assembly begins only when:
   * 1. the project panel is in view
   * 2. the image has finished loading
   */
  const isAssembled =
    isInView && imageReady;

  const formattedIndex =
    String(index).padStart(2, "0");

  const formattedTotal =
    String(total).padStart(2, "0");

  return (
    <article
      ref={ref}
      className="project-panel"
      data-state={
        isAssembled
          ? "assembled"
          : "resting"
      }
    >
      <div className="project-panel-meta">

        <span className="project-panel-index">
          {formattedIndex} / {formattedTotal}
        </span>

        <div className="project-panel-details">
          <h2 className="project-panel-title">
            {title}
          </h2>

          <div className="project-panel-submeta">
            <span>{category}</span>
            <span>{year}</span>
          </div>
        </div>

      </div>

      <div className="project-panel-media">
        <FragmentedImage
          src={image}
          alt={alt}
          isAssembled={isAssembled}
          priority={priority}
          onReady={() => setImageReady(true)}
        />
      </div>
    </article>
  );
}