"use client";

import {useEffect, useRef, useState} from "react";

type UseInViewOptions = {
  threshold?: number;
  once?: boolean;
};

export default function useInView<T extends HTMLElement>({
  threshold = 0.35,
  once = false,
}: UseInViewOptions = {}) {
  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);

        if (entry.isIntersecting && once) {
          observer.disconnect();
        }
      },
      {
        threshold,
      },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold, once]);

  return {
    ref,
    isVisible,
  };
}