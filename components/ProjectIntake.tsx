"use client";

import {useState} from "react";

type ProjectIntakeProps = {
  onClose: () => void;
};

export default function ProjectIntake({
  onClose,
}: ProjectIntakeProps) {
  const [step, setStep] = useState(1);

  const [projectType, setProjectType] = useState("");
  const [projectIdea, setProjectIdea] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [budget, setBudget] = useState("");

  const projectTypes = [
    "A WEBSITE",
    "AN ONLINE STORE",
    "A BRAND",
    "SOMETHING ELSE",
  ];

  function selectProjectType(type: string) {
    setProjectType(type);
    setStep(2);
  }

  return (
    <div className="project-intake">

      <div className="intake-top">
        <span>LUMEN</span>

        <button
          type="button"
          className="intake-close"
          onClick={onClose}
        >
          CLOSE
        </button>
      </div>

      <div className="intake-content">

        {/* STEP 01 */}
        {step === 1 && (
          <>
            <div className="intake-step">
              01 / 04
            </div>

            <h2>
              Let's start
              <br />
              with the idea.
            </h2>

            <p className="intake-question">
              What are you creating?
            </p>

            <div className="intake-options">
              {projectTypes.map((type) => (
                <button
                  key={type}
                  type="button"
                  className="intake-option"
                  onClick={() => selectProjectType(type)}
                >
                  {type}
                </button>
              ))}
            </div>
          </>
        )}


        {/* STEP 02 */}
        {step === 2 && (
          <>
            <div className="intake-step">
              02 / 04
            </div>

            <h2>
              Tell us
              <br />
              about it.
            </h2>

            <p className="intake-question">
              It can be rough. That's usually where good things start.
            </p>

            <textarea
              className="intake-textarea"
              value={projectIdea}
              onChange={(event) => setProjectIdea(event.target.value)}
              placeholder="START WRITING HERE..."
            />

            <div className="intake-navigation">

              <button
                type="button"
                className="intake-nav-button"
                onClick={() => setStep(1)}
              >
                BACK
              </button>

              <button
                type="button"
                className="intake-nav-button"
                onClick={() => setStep(3)}
                disabled={!projectIdea.trim()}
              >
                CONTINUE
              </button>

            </div>
          </>
        )}


        {/* STEP 03 */}
        {step === 3 && (
          <>
            <div className="intake-step">
              03 / 04
            </div>

            <h2>
              A few practical
              <br />
              things.
            </h2>

            <div className="intake-fields">

              <input
                className="intake-field"
                type="text"
                placeholder="YOUR NAME"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />

              <input
                className="intake-field"
                type="email"
                placeholder="EMAIL"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />

              <input
                className="intake-field"
                type="url"
                placeholder="EXISTING WEBSITE — OPTIONAL"
                value={website}
                onChange={(event) => setWebsite(event.target.value)}
              />

              <input
                className="intake-field"
                type="text"
                placeholder="BUDGET RANGE — OPTIONAL"
                value={budget}
                onChange={(event) => setBudget(event.target.value)}
              />

            </div>

            <div className="intake-navigation">

              <button
                type="button"
                className="intake-nav-button"
                onClick={() => setStep(2)}
              >
                BACK
              </button>

              <button
                type="button"
                className="intake-nav-button"
                onClick={() => setStep(4)}
                disabled={!name.trim() || !email.trim()}
              >
                CONTINUE
              </button>

            </div>
          </>
        )}


        {/* STEP 04 */}
        {step === 4 && (
          <>
            <div className="intake-step">
              04 / 04
            </div>

            <h2>
              Ready when
              <br />
              you are.
            </h2>

            <div className="intake-summary">

              <div className="intake-summary-row">
                <span>PROJECT</span>
                <span>{projectType}</span>
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
                BACK
              </button>

              <button
                type="button"
                className="intake-submit"
              >
                SEND PROJECT
              </button>

            </div>
          </>
        )}

      </div>

    </div>
  );
}