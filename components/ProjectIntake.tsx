"use client";

import {useState} from "react";
import ProjectSuccess from "./ProjectSuccess";

type ProjectIntakeProps = {
  onClose: () => void;
};

const services = [
  "DESIGN",
  "COMMERCE",
  "AI",
  "ENGINEERING",
] as const;

type Service = (typeof services)[number];
type IntakeStep = 1 | 2 | 3 | 4;

export default function ProjectIntake({
  onClose,
}: ProjectIntakeProps) {
  const [step, setStep] = useState<IntakeStep>(1);

  const [selectedServices, setSelectedServices] =
    useState<Service[]>([]);

  const [projectIdea, setProjectIdea] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [budget, setBudget] = useState("");

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [isSubmitted, setIsSubmitted] =
    useState(false);

  function toggleService(service: Service) {
    setSelectedServices((current) =>
      current.includes(service)
        ? current.filter((item) => item !== service)
        : [...current, service],
    );
  }

  function handleSubmit() {
    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    /*
     * For now this only triggers the visual
     * success experience.
     *
     * Actual form submission / email handling
     * will be connected later.
     */
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    window.setTimeout(
      () => {
        setIsSubmitted(true);
      },
      reducedMotion ? 0 : 650,
    );
  }

  if (isSubmitted) {
    return (
      <ProjectSuccess
        onClose={onClose}
      />
    );
  }

  return (
    <div
      className={`project-intake ${
        isSubmitting ? "is-submitting" : ""
      }`}
      role="dialog"
      aria-modal="true"
      aria-label="Start a project"
    >
      <div className="project-intake-sheet">

        {/* =====================================
            HEADER
            ===================================== */}

        <div className="intake-top">
          <div className="intake-brand">
            <span className="intake-brand-letter">
              L
              <span
                className="intake-brand-dot"
                aria-hidden="true"
              />
            </span>

            <span>U</span>

            <span className="intake-brand-letter">
              M
              <span
                className="intake-brand-dot"
                aria-hidden="true"
              />
            </span>

            <span>E</span>

            <span className="intake-brand-letter">
              N
              <span
                className="intake-brand-dot"
                aria-hidden="true"
              />
            </span>
          </div>

          <div className="intake-top-right">
            <span className="intake-progress">
              0{step} / 04
            </span>

            <button
              type="button"
              className="intake-close"
              onClick={onClose}
            >
              CLOSE
            </button>
          </div>
        </div>

        {/* =====================================
            CONTENT
            ===================================== */}

        <div
          key={step}
          className="intake-content"
        >

          {/* =====================================
              STEP 01 — SERVICES
              ===================================== */}

          {step === 1 && (
            <>
              <div className="intake-copy">
                <span className="intake-kicker">
                  START A PROJECT
                </span>

                <h2>
                  What do you
                  <br />
                  need?
                </h2>

                <p className="intake-question">
                  Choose everything that feels relevant.
                  We can figure out the rest together.
                </p>
              </div>

              <div className="intake-services">
                {services.map((service) => {
                  const selected =
                    selectedServices.includes(service);

                  return (
                    <button
                      key={service}
                      type="button"
                      className={`intake-service ${
                        selected
                          ? "is-selected"
                          : ""
                      }`}
                      aria-pressed={selected}
                      onClick={() =>
                        toggleService(service)
                      }
                    >
                      <span>
                        {service}
                      </span>

                      <span
                        className="intake-service-mark"
                        aria-hidden="true"
                      >
                        {selected ? "●" : "○"}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="intake-navigation intake-navigation-end">
                <button
                  type="button"
                  className="intake-nav-button"
                  disabled={
                    selectedServices.length === 0
                  }
                  onClick={() => setStep(2)}
                >
                  CONTINUE →
                </button>
              </div>
            </>
          )}

          {/* =====================================
              STEP 02 — IDEA
              ===================================== */}

          {step === 2 && (
            <>
              <div className="intake-copy">
                <span className="intake-kicker">
                  THE IDEA
                </span>

                <h2>
                  Tell us
                  <br />
                  about it.
                </h2>

                <p className="intake-question">
                  It can be rough. That&apos;s usually
                  where good things start.
                </p>
              </div>

              <textarea
                className="intake-textarea"
                value={projectIdea}
                onChange={(event) =>
                  setProjectIdea(event.target.value)
                }
                placeholder="START WRITING HERE..."
              />

              <div className="intake-navigation">
                <button
                  type="button"
                  className="intake-nav-button"
                  onClick={() => setStep(1)}
                >
                  ← BACK
                </button>

                <button
                  type="button"
                  className="intake-nav-button"
                  disabled={!projectIdea.trim()}
                  onClick={() => setStep(3)}
                >
                  CONTINUE →
                </button>
              </div>
            </>
          )}

          {/* =====================================
              STEP 03 — DETAILS
              ===================================== */}

          {step === 3 && (
            <>
              <div className="intake-copy">
                <span className="intake-kicker">
                  THE PRACTICAL PART
                </span>

                <h2>
                  A few useful
                  <br />
                  details.
                </h2>
              </div>

              <div className="intake-fields">
                <label className="intake-field-group">
                  <span className="intake-field-label">
                    YOUR NAME
                  </span>

                  <input
                    className="intake-field"
                    type="text"
                    autoComplete="name"
                    value={name}
                    onChange={(event) =>
                      setName(event.target.value)
                    }
                  />
                </label>

                <label className="intake-field-group">
                  <span className="intake-field-label">
                    EMAIL
                  </span>

                  <input
                    className="intake-field"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(event) =>
                      setEmail(event.target.value)
                    }
                  />
                </label>

                <label className="intake-field-group">
                  <span className="intake-field-label">
                    EXISTING WEBSITE
                    <span className="intake-field-optional">
                      OPTIONAL
                    </span>
                  </span>

                  <input
                    className="intake-field"
                    type="url"
                    inputMode="url"
                    value={website}
                    onChange={(event) =>
                      setWebsite(event.target.value)
                    }
                  />
                </label>

                <label className="intake-field-group">
                  <span className="intake-field-label">
                    BUDGET RANGE
                    <span className="intake-field-optional">
                      OPTIONAL
                    </span>
                  </span>

                  <input
                    className="intake-field"
                    type="text"
                    value={budget}
                    onChange={(event) =>
                      setBudget(event.target.value)
                    }
                  />
                </label>
              </div>

              <div className="intake-navigation">
                <button
                  type="button"
                  className="intake-nav-button"
                  onClick={() => setStep(2)}
                >
                  ← BACK
                </button>

                <button
                  type="button"
                  className="intake-nav-button"
                  disabled={
                    !name.trim() ||
                    !email.trim()
                  }
                  onClick={() => setStep(4)}
                >
                  CONTINUE →
                </button>
              </div>
            </>
          )}

          {/* =====================================
              STEP 04 — SUMMARY
              ===================================== */}

          {step === 4 && (
            <>
              <div className="intake-copy">
                <span className="intake-kicker">
                  READY WHEN YOU ARE
                </span>

                <h2>
                  Let&apos;s give
                  <br />
                  it form.
                </h2>
              </div>

              <div className="intake-summary">
                <div className="intake-summary-row">
                  <span>SERVICES</span>

                  <span>
                    {selectedServices.join(" · ")}
                  </span>
                </div>

                <div className="intake-summary-row">
                  <span>NAME</span>
                  <span>{name}</span>
                </div>

                <div className="intake-summary-row">
                  <span>CONTACT</span>
                  <span>{email}</span>
                </div>

                {website && (
                  <div className="intake-summary-row">
                    <span>WEBSITE</span>
                    <span>{website}</span>
                  </div>
                )}

                {budget && (
                  <div className="intake-summary-row">
                    <span>BUDGET</span>
                    <span>{budget}</span>
                  </div>
                )}
              </div>

              <div className="intake-navigation">
                <button
                  type="button"
                  className="intake-nav-button"
                  onClick={() => setStep(3)}
                >
                  ← BACK
                </button>

                <button
                  type="button"
                  className="intake-submit"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                >
                  {isSubmitting
                    ? "SENDING..."
                    : "SEND PROJECT →"}
                </button>
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
}