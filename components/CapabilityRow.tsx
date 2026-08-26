"use client";

type CapabilityRowProps = {
  title: string;
  description: string;
  isOpen: boolean;
  onActivate: () => void;
};

export default function CapabilityRow({
  title,
  description,
  isOpen,
  onActivate,
}: CapabilityRowProps) {
  return (
    <button
      type="button"
      className={`capability-item ${isOpen ? "is-open" : ""}`}
      onMouseEnter={onActivate}
      onFocus={onActivate}
    >
      <span className="capability-title">
        {title}
      </span>

      <span className="capability-description">
        {description}
      </span>
    </button>
  );
}