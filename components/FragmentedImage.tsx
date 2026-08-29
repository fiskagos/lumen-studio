"use client";

import Image from "next/image";

type FragmentedImageProps = {
  src: string;
  alt: string;
  isAssembled: boolean;
  priority?: boolean;
  onReady?: () => void;
};

const fragments = [
  {
    width: 28,
    left: 0,
    className: "fragment-1",
  },
  {
    width: 17,
    left: 28,
    className: "fragment-2",
  },
  {
    width: 33,
    left: 45,
    className: "fragment-3",
  },
  {
    width: 22,
    left: 78,
    className: "fragment-4",
  },
];

export default function FragmentedImage({
  src,
  alt,
  isAssembled,
  priority = false,
  onReady,
}: FragmentedImageProps) {
  return (
    <div
      className="project-fragmented-image"
      data-state={
        isAssembled ? "assembled" : "resting"
      }
    >
      {fragments.map((fragment) => (
        <div
          key={fragment.className}
          className={`project-fragment ${fragment.className}`}
          style={{
            width: `${fragment.width}%`,
            left: `${fragment.left}%`,
          }}
        >
          <div
            className="project-fragment-image"
            style={{
              width: `${100 / (fragment.width / 100)}%`,
              left: `${-(fragment.left / fragment.width) * 100}%`,
            }}
          >
           <Image
  src={src}
  alt={alt}
  fill
  sizes="(min-width: 1200px) 55vw, 100vw"
  priority={priority}
  onLoad={onReady}
  style={{
    objectFit: "cover",
  }}
/>
          </div>
        </div>
      ))}
    </div>
  );
}