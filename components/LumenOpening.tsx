"use client";

import { useEffect, useState } from "react";

export default function LumenOpening() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const timer = window.setTimeout(
      () => {
        setIsVisible(false);
      },
      reducedMotion ? 450 : 5000,
    );

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <section
      className="lumen-opening"
      aria-hidden="true"
    >
      <div className="lumen-opening-stage">
        <div className="lumen-opening-group">

          <div className="lumen-opening-wordmark">

            {/* L */}
            <span className="lumen-opening-slot">
              <span
                className="lumen-opening-letter lumen-opening-letter-l"
                data-letter="L"
              >
                L
              </span>

              <span
                className="lumen-opening-dot lumen-opening-dot-1"
                aria-hidden="true"
              />
            </span>

            {/* U */}
            <span className="lumen-opening-slot">
              <span
                className="lumen-opening-letter lumen-opening-letter-u"
                data-letter="U"
              >
                U
              </span>
            </span>

            {/* M */}
            <span className="lumen-opening-slot">
              <span
                className="lumen-opening-letter lumen-opening-letter-m"
                data-letter="M"
              >
                M
              </span>

              <span
                className="lumen-opening-dot lumen-opening-dot-2"
                aria-hidden="true"
              />
            </span>

            {/* E */}
            <span className="lumen-opening-slot">
              <span
                className="lumen-opening-letter lumen-opening-letter-e"
                data-letter="E"
              >
                E
              </span>
            </span>

            {/* N */}
            <span className="lumen-opening-slot">
              <span
                className="lumen-opening-letter lumen-opening-letter-n"
                data-letter="N"
              >
                N
              </span>

              <span
                className="lumen-opening-dot lumen-opening-dot-3"
                aria-hidden="true"
              />
            </span>

          </div>

        </div>
      </div>
    </section>
  );
}