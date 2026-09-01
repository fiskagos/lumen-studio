"use client";

type ProjectSuccessProps = {
  onClose: () => void;
};

export default function ProjectSuccess({
  onClose,
}: ProjectSuccessProps) {
  return (
    <div className="project-success">
      <button
        type="button"
        className="project-success-close"
        onClick={onClose}
      >
        CLOSE
      </button>

      <div className="project-success-stage">
        <div className="project-success-logo">
          <span className="project-success-letter success-letter-l">
            L
            <span className="project-success-dot success-dot-1" />
          </span>

          <span className="project-success-letter success-letter-u">
            U
          </span>

          <span className="project-success-letter success-letter-m">
            M
            <span className="project-success-dot success-dot-2" />
          </span>

          <span className="project-success-letter success-letter-e">
            E
          </span>

          <span className="project-success-letter success-letter-n">
            N
            <span className="project-success-dot success-dot-3" />
          </span>
        </div>

        <div className="project-success-copy">
          <span>PROJECT RECEIVED.</span>
          <span>WE&apos;LL BE IN TOUCH.</span>
        </div>
      </div>
    </div>
  );
}